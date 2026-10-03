import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {searchMaterials} from './material-search.mjs';

export const STYLE_SECTIONS={color:'配色与层级',typography:'字体与文字',composition:'构图与空间',materials:'材质与图形',motion:'运动与转场',captions:'字幕',adaptation:'画幅适配'};
export function validateTextStyle(style) {
 if(!/^[a-z][a-z0-9-]+$/u.test(style.id)||!style.name?.trim()||!style.description?.trim()||!/(适合|适用|用于)/u.test(style.description))throw new Error('Style needs an ID, name, visible-character description and suitable scenarios.');
 for(const key of Object.keys(STYLE_SECTIONS))if(typeof style.visualDescription?.[key]!=='string'||!style.visualDescription[key].trim())throw new Error('Style needs text section: '+key);
 for(const key of ['ink','muted','accent','panel','line'])if(!/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/iu.test(style.palette?.[key]??''))throw new Error('Style needs a CSS palette color: '+key);
 if(!style.background||!style.typography?.heading||!style.typography?.body||!style.typography?.code||!style.layout?.composition||!style.motion?.cadence||!style.illustration?.texture||!style.captions?.color)throw new Error('Style needs complete rendering tokens.');
 if(['image','images','preview','thumbnail','moodboard','source','origin','quality','review'].some(k=>k in style)||/!\[[^\]]*\]\(|data:image|url\s*\(/iu.test(JSON.stringify(style)))throw new Error('Styles use text descriptions and rendering tokens; images and source reviews stay outside the production catalog.');
 if(style.descriptionFile!==`assets/style-library/${style.id}/description.md`)throw new Error('Style text card must use its canonical local path.');
 return style;
}
export function validateStyleCatalog(catalog) {
 if(catalog.schemaVersion!==1||!Array.isArray(catalog.styles))throw new Error('Current style catalog required.');
 const ids=new Set();for(const style of catalog.styles){validateTextStyle(style);if(ids.has(style.id))throw new Error('Duplicate style ID.');ids.add(style.id);}return catalog;
}
export function readStyleCatalog(root){return validateStyleCatalog(JSON.parse(readFileSync(join(root,'config/style-library.json'),'utf8'))).styles;}
export function findStyle(root,id){const style=readStyleCatalog(root).find(s=>s.id===id);if(!style)throw new Error('Unknown style ID.');return style;}
export function styleRenderingTokens(style) {
 return Object.fromEntries(['id','palette','background','typography','geometry','layout','illustration','motion','transitions','captions'].map(key=>[key,style[key]]));
}
export function styleMarkdown(style,{section=null}={}) {
 const header=`# ${style.name}\n\nID：${style.id}\n`;
 if(section==='purpose')return header+'\n## 风格概述\n\n'+style.description+'\n';
 if(section==='tokens')return JSON.stringify(styleRenderingTokens(style),null,2);
 if(section&&!Object.hasOwn(STYLE_SECTIONS,section))throw new Error('Style section must be purpose|'+Object.keys(STYLE_SECTIONS).join('|')+'|tokens.');
 const keys=section?[section]:Object.keys(STYLE_SECTIONS);
 return header+(section?'':'\n## 风格概述\n\n'+style.description+'\n')+keys.map(key=>'\n## '+STYLE_SECTIONS[key]+'\n\n'+style.visualDescription[key]+'\n').join('');
}
export function searchStyles(root,options={}) {
 const styles=readStyleCatalog(root);return searchMaterials(styles,options).map(match=>({...match,name:styles.find(s=>s.id===match.id).name}));
}
