// Retrieval reads text only. Code and playable demos are opened after selection, when useful.
const concepts=[
  ['transfer','flow','packet','信息传递','进入存储','数据流','消息流转','传送','搬运','流动','流转'],
  ['anchor','match','continuity','锚点','连续','保持位置','对象延续','周围状态','环境变化'],
  ['reveal','出现','揭示','显现','入场','呈现结果','展现'],
  ['focus','camera','zoom','pan','注意力','焦点','视角','整体到局部','放大','平移'],
  ['parallel','grid','cascade','多路','并行','汇集','列表','多项','网格'],
  ['typewriter','input','typing','输入','打字','提问','搜索'],
  ['path','relationship','graph','关系','连接','路径','轨迹','连线'],
  ['diff','change','compare','修改','新增','删除','前后差异','对比','版本变化'],
  ['browser','ui','panel','界面','浏览器','网站','面板'],
  ['title','headline','text','typography','文字','标题','词组','短语'],
  ['count','numeric','number','数值','数字','计数','统计'],
  ['brush','paint','illustration','画笔','手绘','插画'],
  ['flip','rotation','perspective','翻转','旋转','透视','背面'],
];
const normalize=s=>s.normalize('NFKC').toLowerCase();
export function searchTokens(text) {
  const tokens=[];
  for(const m of normalize(text).matchAll(/[a-z0-9]+|[\p{Script=Han}]+/gu)) {
    const word=m[0];if(/^[a-z0-9]+$/u.test(word))tokens.push(word);
    else {if(word.length===1)tokens.push(word);for(let i=0;i<word.length-1;i++)tokens.push(word.slice(i,i+2));}
  }
  return tokens;
}
export function expandConcepts(query) {
  const q=normalize(query),words=new Set(q.match(/[a-z0-9]+/gu)??[]);return concepts.filter(group=>group.some(term=>/^[a-z0-9]+$/u.test(term)?words.has(term):q.includes(term))).flat();
}
function rankLexical(query,documents) {
  const terms=[...new Set(searchTokens(query))];if(!terms.length)return [];
  const average=documents.reduce((n,d)=>n+d.tokens.length,0)/Math.max(documents.length,1);
  const scored=documents.map(doc=>{
    let score=0;for(const term of terms){const tf=doc.counts.get(term)??0;if(!tf)continue;
      const df=documents.filter(d=>d.counts.has(term)).length;
      const idf=Math.log(1+(documents.length-df+.5)/(df+.5));
      score+=idf*tf*2.2/(tf+1.2*(.25+.75*doc.tokens.length/(average||1)));
    }return {id:doc.id,score};
  });return scored.filter(d=>d.score>0).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
}
export function searchMaterials(motions,{query='',queries=[],limit=5,fullName=null}={}) {
  if(!Number.isInteger(limit)||limit<1||limit>50)throw new Error('Search limit must be from 1 to 50.');
  const requests=[query,...queries].filter(q=>typeof q==='string'&&q.trim());
  if(!requests.length)throw new Error('Describe a visual expression to search.');
  const eligible=motions.filter(m=>m.reuseScope!=='project'||m.sourceProject===fullName);
  const documents=eligible.map(m=>{if(!m.description?.trim())throw new Error('Material needs a retrieval description: '+m.id);
    const tokens=searchTokens(m.id+' '+m.description);return {id:m.id,tokens,counts:new Map(tokens.map(t=>[t,tokens.filter(x=>x===t).length]))};});
  const routes=[];
  for(const request of requests){routes.push({name:'keyword',query:request});
    const expanded=expandConcepts(request);if(expanded.length)routes.push({name:'concept-expansion',query:expanded.join(' ')});
    const parts=request.split(/[，。；;\n]+/u).map(s=>s.trim()).filter(Boolean);
    if(parts.length>1)for(const part of parts)routes.push({name:'expression-query',query:part});
  }
  const scores=new Map(),seen=new Set();
  for(const route of routes){const key=route.name+':'+route.query;if(seen.has(key))continue;seen.add(key);
    for(const [i,r] of rankLexical(route.query,documents).entries()){
      const entry=scores.get(r.id)??{id:r.id,score:0,routes:new Set()};entry.score+=1/(60+i+1);entry.routes.add(route.name);scores.set(r.id,entry);
    }
  }
  return [...scores.values()].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id)).slice(0,limit).map(r=>{
    const m=eligible.find(m=>m.id===r.id);return {id:m.id,description:m.description,score:Number(r.score.toFixed(6)),routes:[...r.routes]};
  });
}
