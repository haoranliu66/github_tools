export function validateCliOptions(argv,{values=[],booleans=[]}={}){
  const valueSet=new Set(values),booleanSet=new Set(booleans);
  for(let i=0;i<argv.length;i++){
    const token=argv[i];if(!token.startsWith('--'))continue;
    if(booleanSet.has(token))continue;
    if(!valueSet.has(token))throw new Error('Unsupported option: '+token);
    if(!argv[i+1]||argv[i+1].startsWith('--'))throw new Error('Missing value for '+token);i++;
  }
}
