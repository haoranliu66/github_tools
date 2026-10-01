// Persistent tool-enabled turns. Last-message JSON and tool events are retained separately.
export function toolAgentArguments({outputPath,schemaPath,images=[],sessionId,sandbox='read-only',windowsSandbox}) {
  if(!outputPath) throw new Error('Tool agent needs a retained output path.');
  if(!['read-only','workspace-write'].includes(sandbox)) throw new Error('Unsupported agent sandbox.');
  const args=['exec','--ignore-user-config','--ignore-rules','-c','project_doc_max_bytes=0',
    '--sandbox',sandbox,'--skip-git-repo-check','--color','never'];
  if(windowsSandbox)args.push('-c',`windows.sandbox="${windowsSandbox}"`);
  if(sessionId)args.push('resume',sessionId);
  args.push('--json','-o',outputPath);
  if(schemaPath)args.push('--output-schema',schemaPath);
  for(const path of images)args.push('-i',path);
  args.push('-');return args;
}
export async function runToolAgent(prompt,{workingDirectory,outputPath,schemaPath,images=[],sessionId,
  sandbox='read-only',timeout=25*60*1000}={}) {
  const {spawn}=await import('node:child_process');
  const {mkdirSync,readFileSync,writeFileSync,appendFileSync,existsSync}=await import('node:fs');
  const {dirname}=await import('node:path');
  mkdirSync(dirname(outputPath),{recursive:true});
  const eventsPath=outputPath+'.events.jsonl',errorsPath=outputPath+'.stderr.txt';
  writeFileSync(outputPath+'.prompt.txt',prompt);
  const configured=process.env.CODEX_WINDOWS_SANDBOX??'auto';
  const sandboxes=process.platform==='win32'?(configured==='auto'?['elevated','unelevated']:[configured]):[null];
  for(const [index,windowsSandbox] of sandboxes.entries()) {
    writeFileSync(eventsPath,'');writeFileSync(errorsPath,'');
    const result=await new Promise(resolve=>{
      const child=spawn('codex',toolAgentArguments({outputPath,schemaPath,images,sessionId,sandbox,windowsSandbox}),
        {cwd:workingDirectory,windowsHide:true,stdio:['pipe','pipe','pipe']});
      const timer=setTimeout(()=>{child.kill();resolve({error:'Agent deadline exceeded.'});},timeout);
      child.stdout.on('data',chunk=>appendFileSync(eventsPath,chunk));
      child.stderr.on('data',chunk=>appendFileSync(errorsPath,chunk));
      child.on('error',e=>{clearTimeout(timer);resolve({error:e.message});});
      child.on('close',code=>{clearTimeout(timer);resolve({code});});child.stdin.end(prompt);
    });
    const stderr=readFileSync(errorsPath,'utf8');
    if(result.error||result.code!==0) {
      if(index<sandboxes.length-1&&/orchestrator_helper_launch_canceled|setup helper[^\n]*1223/iu.test(stderr))continue;
      const error=new Error(`Tool agent failed: ${result.error??(stderr.trim()?stderr.slice(-1800):'exit '+result.code)}. Events: ${eventsPath}`);
      error.toolAgentStatus='error';error.eventsPath=eventsPath;throw error;
    }
    if(!existsSync(outputPath))throw new Error('Agent did not retain its final response.');
    const events=readFileSync(eventsPath,'utf8').split(/\r?\n/u).filter(Boolean).flatMap(line=>{try{return [JSON.parse(line)];}catch{return [];}});
    const id=events.find(e=>e.type==='thread.started')?.thread_id??sessionId;
    if(!id)throw new Error('Agent did not return a persistent session ID.');
    const response=readFileSync(outputPath,'utf8').trim().replace(/^```(?:json)?\s*/iu,'').replace(/\s*```$/u,'');
    return {value:JSON.parse(response),sessionId:id,eventsPath,outputPath};
  }
}
