const h=500;class f{static async perform(s,a,r){const t=await crs.process.getValue(s.args.source,a,r);if(t==null)throw new Error(`object on path ${s.args.source} was not set`);const l=s.args.target;if(t.length<=500)await g(s,t,l,a,r,0,t.length);else for(let o=0;o<t.length;o+=500){const n=o;let e=o+500;e>t.length&&(e=t.length);let c=new Promise(w=>{let u=setTimeout(async()=>{await g(s,t,l,a,r,n,e),clearTimeout(u),u=null,w()},0)});await c,c=null}}}async function g(i,s,a,r,t,l,o){for(let n=l;n<o;n++){const e=s[n];a!=null&&await crs.process.setValue(a,e,r,t,e),await crs.process.runStep(i.args.steps.start,r,t,e,i.args.steps)}}crs.intent.loop=f;export{f as LoopActions};