import data from '../design/prototype.json';

export type PrototypeAction={type:string;destinationId?:string|null;navigation?:string;transition?:{type:string;duration?:number;easing?:{type:string}}|null;overlayRelativePosition?:{x:number;y:number}};
export type PrototypeInteraction={id:string;name:string;b:{x:number;y:number;width:number;height:number}|null;reactions:{trigger:{type:string;timeout?:number};actions:PrototypeAction[]}[]};
export type PrototypePointer={pageX:number;pageY:number;locationX:number;locationY:number};
export type PrototypeFrame={id:string;name:string;width:number;height:number;overflowDirection:string;numberOfFixedChildren:number;overlayPositionType:string;overlayBackground:{type:string;color?:{r:number;g:number;b:number;a:number}};overlayBackgroundInteraction:string;interactions:PrototypeInteraction[]};
export type PrototypeState={history:string[];overlays:{id:string;position?:{x:number;y:number}}[];revision:number};
export const prototypeFrames=Object.fromEntries((data.frames as PrototypeFrame[]).map(f=>[f.id,f]));
export const prototypeStart=data.flowStartingPoints[0].nodeId;
export function hasClickAction(i:PrototypeInteraction){return i.reactions.some(r=>r.trigger.type==='ON_CLICK'&&r.actions.some(a=>a.type==='BACK'||a.type==='CLOSE'||a.type==='NODE'&&!!a.destinationId));}
export function activeFrame(s:PrototypeState){return s.overlays.at(-1)?.id??s.history.at(-1)!;}
export function initialPrototype(id=prototypeStart):PrototypeState{return {history:[id],overlays:[],revision:0};}
export function applyPrototypeAction(s:PrototypeState,a:PrototypeAction):PrototypeState{
 const revision=s.revision+1;
 if(a.type==='CLOSE')return s.overlays.length?{...s,overlays:s.overlays.slice(0,-1),revision}:s;
 if(a.type==='BACK')return s.overlays.length?{...s,overlays:s.overlays.slice(0,-1),revision}:s.history.length>1?{...s,history:s.history.slice(0,-1),revision}:s;
 if(a.type!=='NODE'||!a.destinationId||!prototypeFrames[a.destinationId])return s;
 if(a.navigation==='OVERLAY')return {...s,overlays:[...s.overlays,{id:a.destinationId,position:a.overlayRelativePosition}],revision};
 if(a.navigation==='NAVIGATE')return {history:[...s.history,a.destinationId],overlays:[],revision};
 return s;
}
export function applyPrototypeInteraction(s:PrototypeState,i:PrototypeInteraction,trigger='ON_CLICK'){
 return i.reactions.filter(r=>r.trigger.type===trigger).flatMap(r=>r.actions).map(a=>a.overlayRelativePosition&&i.b?{...a,overlayRelativePosition:{x:a.overlayRelativePosition.x+i.b.x,y:a.overlayRelativePosition.y+i.b.y}}:a).reduce(applyPrototypeAction,s);
}
export function overlayPlacement(frame:PrototypeFrame,manual?:{x:number;y:number}){
 const p=frame.overlayPositionType;
 return {left:p==='MANUAL'?(manual?.x??0):p.endsWith('LEFT')?0:p.endsWith('RIGHT')?428-frame.width:(428-frame.width)/2,
 top:p==='MANUAL'?(manual?.y??0):p.startsWith('TOP')?0:p.startsWith('BOTTOM')?926-frame.height:(926-frame.height)/2};
}
