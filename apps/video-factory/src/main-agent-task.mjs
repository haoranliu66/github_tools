import {createHash} from 'node:crypto';
import {existsSync,mkdirSync,readFileSync,writeFileSync,renameSync,rmSync,realpathSync} from 'node:fs';
import {join,dirname,resolve,sep} from 'node:path';
const hash=value=>createHash('sha256').update(value).digest('hex');
const read=path=>JSON.parse(readFileSync(path,'utf8'));
const atomic=(path,value)=>{writeFileSync(path+'.tmp',JSON.stringify(value,null,2)+'\n');renameSync(path+'.tmp',path);};

export class AgentTaskPending extends Error {
  constructor(taskPath,task){super('Agent task awaits '+task.owner+': '+taskPath);this.name='AgentTaskPending';this.agentTaskStatus='pending';this.taskPath=taskPath;this.task=task;}
}
export function reportAgentTask(error) {
  if(error.agentTaskStatus!=='pending')return false;
  console.log(JSON.stringify({status:'awaiting-'+error.task.owner,stage:error.task.kind,taskPath:error.taskPath,responseFormat:{taskId:error.task.taskId,value:'task-specific response'},context:error.task.context,...(error.task.validationError?{validationError:error.task.validationError}:{})}));
  return true;
}
export function activeAgentTask(directory){const file=join(directory,'active.json');return existsSync(file)?read(file):null;}
export function completeDelegatedTask(directory,binding,files){
  const task=activeAgentTask(directory);
  if(!task||task.owner!=='audio-subagent'||JSON.stringify(task.binding)!==JSON.stringify(binding))return;
  task.verifiedOutputs=files.map(file=>({file,sha256:hash(readFileSync(file))}));task.status='completed';
  atomic(task.responsePath,{taskId:task.taskId,value:{status:'audio-ready',verifiedOutputs:task.verifiedOutputs}});
  atomic(task.taskPath,task);atomic(join(directory,'active.json'),task);
}

// This host boundary never launches a model. The current main Agent reads the task,
// writes the requested files, then supplies a task-bound JSON response.
export async function requestAgentTask(prompt,{directory,kind,binding,context={},schemaPath=null,images=[],responsePath=null,owner='main-agent'}={}) {
  mkdirSync(directory,{recursive:true});
  const evidence=images.map(file=>({file,sha256:hash(readFileSync(file))}));
  const taskId=hash(JSON.stringify({kind,binding,context,prompt,evidence,schemaDigest:schemaPath?hash(readFileSync(schemaPath)):null,owner}));
  const taskPath=join(directory,taskId+'.json');
  const old=existsSync(taskPath)?read(taskPath):null;
  const outputsValid=(old?.verifiedOutputs??[]).every(item=>existsSync(item.file)&&hash(readFileSync(item.file))===item.sha256);
  const task={taskId,kind,owner,status:outputsValid?(old?.status??'pending'):'pending',binding,context,promptPath:join(directory,taskId+'.md'),schemaPath,evidence,responsePath:join(directory,taskId+'.response.json'),...(old?.validationError?{validationError:old.validationError}:{}),...(old?.verifiedOutputs?{verifiedOutputs:old.verifiedOutputs}:{})};
  writeFileSync(task.promptPath,prompt,'utf8');
  if(responsePath){
    const response=read(responsePath);
    if(response.taskId===taskId){
      if(!Object.hasOwn(response,'value'))throw new Error('Agent response needs {taskId,value}.');
      atomic(task.responsePath,response);task.status='completed';delete task.validationError;
    }else{
      // A consumed response may be replayed while this stage advances to its next task.
      const consumed=/^[a-f0-9]{64}$/u.test(response.taskId??'')?join(directory,response.taskId+'.json'):null;
      if(!consumed||!existsSync(consumed)||read(consumed).status!=='completed'||JSON.stringify(read(consumed).binding)!==JSON.stringify(binding)||hash(readFileSync(read(consumed).responsePath))!==hash(JSON.stringify(response,null,2)+'\n'))throw new Error('Agent response belongs to another or stale task.');
    }
  }
  atomic(taskPath,task);atomic(join(directory,'active.json'),{...task,taskPath});
  if(task.status==='completed')return {value:read(task.responsePath).value,taskId,taskPath,sessionId:null};
  throw new AgentTaskPending(taskPath,task);
}
export function rejectAgentTask(result,message){
  const task=read(result.taskPath);task.status='pending';task.validationError=message;
  atomic(result.taskPath,task);atomic(join(result.taskPath,'../active.json'),{...task,taskPath:result.taskPath});
  throw new AgentTaskPending(result.taskPath,task);
}

export function discardAgentTask(taskPath){
  const directory=realpathSync(dirname(taskPath)),task=read(taskPath);
  for(const path of [taskPath,task.promptPath,task.responsePath]){
    const target=resolve(path);if(!target.startsWith(directory+sep)||existsSync(target)&&!realpathSync(target).startsWith(directory+sep))throw new Error('Transient task cleanup escapes its directory.');
    rmSync(target,{force:true});
  }
  const active=join(directory,'active.json');if(existsSync(active)&&read(active).taskId===task.taskId)rmSync(active,{force:true});
}
