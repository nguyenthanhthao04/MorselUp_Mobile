export type NativeNode = {
 tag:string; id?:string; slot?:string; name?:string; style:Record<string,any>;
 textStyle:Record<string,any>; contents?:boolean; interactive?:boolean;
 nowrap?:boolean; line?:string; gradient?:boolean; scroll?:boolean; backdropBlur?:number; fit?:'cover'|'contain';
 asset?:string; children:(NativeNode|string)[];
};
export type DesignScreen = {id:string;name:string;width:number;height:number;root:NativeNode};
