import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('../public/theme.js', import.meta.url), 'utf8');
function boot({ saved, systemDark = false, blocked = false, reduced = false, paused = false } = {}) {
  const events = {}, windowEvents = {}, attributes = {}, timers = new Map(), values = new Map([['lordlabs-theme', saved], ['lordlabs-motion', paused ? 'paused' : 'on']]);
  const root = { dataset: {}, lang: 'en', setAttribute: (k,v) => attributes[k]=v, removeAttribute: k => delete attributes[k], toggleAttribute: (k,v) => v ? attributes[k]='' : delete attributes[k] };
  const controls = [0,1].map(() => ({ attributes:{}, text:{}, setAttribute(k,v){this.attributes[k]=v;}, querySelector(){return this.text;} }));
  const system = {matches:systemDark,addEventListener:(_,fn)=>events.system=fn};
  let mutation;
  runInNewContext(source, {
    document: { documentElement:root, hidden:false, addEventListener:(k,fn)=>events[k]=fn, querySelectorAll:s=>s==='[data-theme-toggle]'?controls:[], querySelector:()=>null },
    window: {addEventListener:(k,fn)=>windowEvents[k]=fn},
    matchMedia:q=>q.includes('color-scheme')?system:{matches:reduced},
    localStorage:{getItem:k=>{if(blocked)throw Error('denied');return values.get(k);},setItem:(k,v)=>{if(blocked)throw Error('denied');values.set(k,v);}},
    MutationObserver:class{constructor(fn){mutation=fn;}observe(){}},
    setTimeout:fn=>{const id=Symbol();timers.set(id,fn);return id;},clearTimeout:id=>timers.delete(id)
  });
  return {root,events,windowEvents,attributes,controls,values,system,timers,ready:()=>events.DOMContentLoaded(),language:lang=>{root.lang=lang;mutation();},click:()=>events.click({target:{closest:()=>controls[0]}})};
}
test('the saved theme is applied before DOM readiness, with system and blocked-storage fallbacks', () => {
  assert.equal(boot({saved:'light',systemDark:true}).root.dataset.theme,'light');
  assert.equal(boot({saved:'dark'}).root.dataset.theme,'dark');
  assert.equal(boot({saved:'invalid',systemDark:true}).root.dataset.theme,'dark');
  assert.equal(boot({blocked:true,systemDark:true}).root.dataset.theme,'dark');
});
test('both controls stay synchronized, persist the choice and follow the page language', () => {
  const app=boot();app.ready();app.click();
  assert.equal(app.root.dataset.theme,'dark');assert.equal(app.values.get('lordlabs-theme'),'dark');
  for(const control of app.controls){assert.equal(control.attributes['aria-pressed'],'true');assert.match(control.attributes['aria-label'],/daylight/);}
  app.language('ar');assert.equal(app.controls[1].text.textContent,'ضوء النهار');
  app.click();assert.equal(app.root.dataset.theme,'light');assert.equal(app.controls[0].attributes['aria-pressed'],'false');
  assert.equal(app.controls[0].text.textContent,'سماء الليل');
});
test('system changes apply until explicitly overridden and storage events sync other tabs', () => {
  const app=boot();app.ready();app.system.matches=true;app.events.system();assert.equal(app.root.dataset.theme,'dark');
  app.click();app.events.system();assert.equal(app.root.dataset.theme,'light');
  app.windowEvents.storage({key:'lordlabs-theme',newValue:'dark'});assert.equal(app.root.dataset.theme,'dark');
  app.system.matches=false;app.windowEvents.storage({key:'lordlabs-theme',newValue:null});assert.equal(app.root.dataset.theme,'light');
});
test('rapid toggles settle to the last choice and reduced motion avoids transition state', () => {
  const app=boot();app.ready();app.events.animationend({animationName:'sky-arrive'});assert.equal(app.root.dataset.entered,'');app.click();app.click();app.click();
  assert.equal(app.root.dataset.theme,'dark');assert.equal(app.timers.size,1);
  [...app.timers.values()][0]();assert.equal(app.attributes['data-theme-changing'],undefined);
  for(const options of [{reduced:true},{paused:true},{blocked:true}]){
    const other=boot(options);other.ready();other.click();assert.equal(other.root.dataset.theme,'dark');
    if(!options.blocked)assert.equal(other.attributes['data-theme-changing'],undefined);
  }
});

test('night text, controls and project captions retain readable contrast', async () => {
  const css=await readFile(new URL('../public/sky.css',import.meta.url),'utf8');
  const night=css.match(/:root\[data-theme=dark\]\s*\{([^}]+)\}/)[1];
  const token=name=>night.match(new RegExp(`--${name}:#([0-9a-f]{6})`))[1];
  const luminance=hex=>hex.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
  for(const [foreground,background,minimum] of [
    [token('ink'),token('canvas'),7],[token('muted'),token('canvas'),7],
    [token('accent-text'),token('canvas'),7],[token('on-accent'),token('accent'),7],
    [token('dawn-ink'),'243959',7],[token('dawn-muted'),'243959',4.5],
    [token('dawn-accent'),'243959',4.5],[token('control-border'),token('canvas'),3],
    ['bce3dc','1b3336',7],['c6d5f3','243047',7],
  ]){
    const values=[luminance(foreground),luminance(background)];
    const ratio=(Math.max(...values)+.05)/(Math.min(...values)+.05);
    assert.ok(ratio>=minimum,`${foreground} on ${background}: ${ratio}`);
  }
});
