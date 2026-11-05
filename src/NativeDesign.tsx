import React, { useEffect, useRef, useState } from 'react';
import { Image, View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Asset } from 'expo-asset';
import { SvgUri } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { assets } from './assets';
import { svgCache } from './svg-cache';
import { NativeNode } from './types';
import type { PrototypeInteraction, PrototypePointer } from './prototype';
import { LocationPermissionAlert } from './components/LocationPermissionAlert';

export function plainText(n:NativeNode|string):string {
 return typeof n==='string'?n:n.children.map(plainText).join(' ');
}
const inheritedKeys=['fontFamily','fontSize','color','textAlign','letterSpacing','textDecorationLine','fontStyle','textTransform'];
const clickableCaptions=['Quản lý tài khoản','Ngôn ngữ','Âm thanh thông báo','Giờ yên lặng','Cỡ chữ và khả năng đọc','Thiết bị đăng nhập','Tài khoản liên kết','Dung lượng và dữ liệu đệm','Đổi mật khẩu','Tài khoản đã chặn','Vô hiệu hóa tài khoản','Xóa tài khoản','Người theo dõi','Đang theo dõi','Thêm tiểu sử','Thống kê','Tất cả bài đăng','Miễn Phí','Bán Rẻ','Trao Đổi','Hỏi đáp','Công thức nấu ăn'];
const editorScreens=['16:18655','16:18735','16:18850','16:19031','16:19150','16:19278','16:19300','16:19367','16:22279','16:17601','16:18402','16:18435','16:18535'];
const editableValues=['Tặng bánh mì, nước lọc','Mình muốn đổi 1 ít đồ','Xả hàng cuối ngày','Vui lòng không nhấn chuông cửa, điện cho tôi khi đến nơi','Bánh mì','Rau cải','20.000 / 1 sp','Số khác','Rau củ nên bảo quản thế nào?','Súp bí đỏ từ phần bí thừa','Bí đỏ','300'];
type Props={node:NativeNode;inherited?:Record<string,any>;onAction:(node:NativeNode)=>void;onCatalog:()=>void;parentSize?:{width:number;height:number};inText?:boolean;inheritedAction?:NativeNode;screenId:string;prototypeMode?:boolean;nestedHotspots?:Record<string,{interaction:PrototypeInteraction;left:number;top:number}[]>;onPrototypeAction?:(i:PrototypeInteraction,p?:PrototypePointer)=>void};
const inputIds:Record<string,{type?:'email-address'|'phone-pad'|'number-pad';secure?:boolean;placeholder?:string}>={
 '16:13993':{type:'phone-pad'},'16:14648':{type:'email-address'},
};
export function NativeDesign({node:n,inherited={},onAction,onCatalog,parentSize,inText=false,inheritedAction,screenId,prototypeMode=false,nestedHotspots,onPrototypeAction}:Props){
 const [layout,setLayout]=useState({width:0,height:0});
 const [inputValue,setInputValue]=useState('');
 const assetRef=useRef<any>(null);
 const scrollRef=useRef<React.ComponentRef<typeof ScrollView>>(null);
 useEffect(()=>{if(__DEV__&&n.scroll&&n.id){const g=globalThis as any;g.__morselupNestedScroll??={};g.__morselupNestedScroll[n.id]=(y:number)=>scrollRef.current?.scrollTo({y,animated:false});return()=>{delete g.__morselupNestedScroll[n.id!];};}},[n.id,n.scroll]);
 const text={...inherited,...n.textStyle};
 const style={...n.style};
 if(style.borderRadius==='inherit')style.borderRadius=inherited.__radius??0;
 const isText=n.tag==='p'||n.tag==='span';
 if(typeof style.width==='string'&&style.width.endsWith('cqh'))style.width=parentSize?.height??0;
 if(typeof style.height==='string'&&style.height.endsWith('cqw'))style.height=parentSize?.width??0;
 const fontSize=text.fontSize??14;
 const line=n.line??inherited.__line??'normal';
 const textStyle:Record<string,any>={...text,lineHeight:Math.round(line==='normal'?fontSize*1.21:line.endsWith('px')?parseFloat(line):fontSize*Number(line)),includeFontPadding:false};
 delete textStyle.__line;
 delete textStyle.__nowrap;
 delete textStyle.__radius;
 const nowrap=n.nowrap||inherited.__nowrap;
 // Android text measurement can exceed a Figma single-line box by a fraction
 // of a pixel. Keep the anchor, with a small ink allowance, to avoid ellipses.
 if(isText&&nowrap&&typeof style.width==='number'){
  style.width+=2;
  const shift=text.textAlign==='center'?1:text.textAlign==='right'?2:0;
  if(style.position==='absolute'&&typeof style.left==='number')style.left-=shift;
 }
 if(isText&&nowrap&&style.height===undefined)style.height=textStyle.lineHeight;
 if(isText&&style.position==='absolute'&&typeof style.height==='number'&&style.height<textStyle.lineHeight)style.height=textStyle.lineHeight;
 if(isText&&inherited.__nowrap&&style.width===undefined&&parentSize?.width){
  style.width=parentSize.width+2;
  if(text.textAlign==='center')style.marginLeft=(style.marginLeft??0)-1;
  if(text.textAlign==='right')style.marginLeft=(style.marginLeft??0)-2;
 }
 const inheritance:Record<string,any>={};for(const k of inheritedKeys)if(text[k]!==undefined)inheritance[k]=text[k];
 inheritance.__line=line;
 inheritance.__nowrap=nowrap;
 inheritance.__radius=style.borderRadius??inherited.__radius;
 const semantic=!!n.name&&['Trang chủ','Tin Nhắn','Tin nhắn','Thông báo','Hồ sơ','Thêm','settings','bar-chart-2','fa-solid:map-marked-alt','fa-solid:users','heart','bookmark','more-horizontal','camera','sliders-horizontal'].includes(n.name);
 const action=prototypeMode?undefined:n.interactive||semantic||(isText&&clickableCaptions.includes(plainText(n).trim()))?n:inheritedAction;
 const content=n.children.map((c,i)=>typeof c==='string'?c:<NativeDesign key={c.id??i} node={c} inherited={inheritance} onAction={onAction} onCatalog={onCatalog} parentSize={layout.width?layout:parentSize} inText={isText||inText} inheritedAction={n.contents?action:undefined} screenId={screenId} prototypeMode={prototypeMode} nestedHotspots={nestedHotspots} onPrototypeAction={onPrototypeAction}/>);
 if(n.contents)return <>{content}</>;
 if(n.tag==='CodeConnectSnippet')return <LocationPermissionAlert onChoose={choice=>onAction({...n,name:choice})}/>;
 if(['16:13999','16:14018','16:14827'].includes(screenId)&&n.tag==='div'&&n.children.length===0&&style.height===55&&Math.abs((style.width??0)-47.959)<.01){
  return <TextInput testID={n.id} accessibilityLabel="Chữ số mã xác thực" keyboardType="number-pad" textContentType="oneTimeCode" maxLength={1} value={inputValue} onChangeText={v=>setInputValue(v.replace(/\D/g,''))} style={[style,{padding:0,textAlign:'center',color:'#203c30',fontFamily:'Inter_600SemiBold',fontSize:22}]}/>;
 }
 const handle=action?()=>onAction(action):undefined;
 const label=plainText(n).trim()||n.name||'Ouvrir';
 if(n.tag==='img'){
  const asset=n.asset?assets[n.asset]:undefined;
  if(!asset)return null;
  const source=Asset.fromModule(asset.source);
  const record=()=>{if(__DEV__)assetRef.current?.measureInWindow((x:number,y:number,width:number,height:number)=>{const g=globalThis as any;g.__morselupGeometry??={};g.__morselupGeometry[screenId+':'+n.slot]={screenId,layer:n.id,slot:n.slot,asset:n.asset,x,y,width,height,svg:asset.svg,svgWidth:asset.width,svgHeight:asset.height};});};
  const svgEvent=(error?:Error)=>{if(__DEV__){const g=globalThis as any;g.__morselupSvgStatus??={};g.__morselupSvgStatus[screenId+':'+n.slot]={loaded:!error,error:error?.message};}};
  if(asset.svg&&n.asset&&svgCache[n.asset])return <View ref={assetRef} collapsable={false} onLayout={record} pointerEvents="none" style={style} testID={n.id}><Image source={svgCache[n.asset]} style={{width:asset.width,height:asset.height}} resizeMode="stretch" fadeDuration={0} onLoad={()=>svgEvent()} onError={e=>svgEvent(new Error(e.nativeEvent.error))}/></View>;
  if(asset.svg)return <View ref={assetRef} collapsable={false} onLayout={record} pointerEvents="none" style={style} testID={n.id}><SvgUri uri={source.localUri??source.uri} width={asset.width} height={asset.height} onLoad={()=>svgEvent()} onError={svgEvent}/></View>;
  return <Image ref={assetRef} onLayout={record} source={asset.source} resizeMode={n.fit??'stretch'} resizeMethod="resize" resizeMultiplier={2} fadeDuration={0} style={style} testID={n.id}/>;
 }
 if(isText){
  const contentText=plainText(n).trim();
  const formText=(screenId.startsWith('16:14')&&(/@|123 456 789|Nguyễn Cao C|Nhập số điện thoại\/ Email|^Nhập (lại )?mật khẩu|^Tối thiểu 8 ký tự$/.test(contentText)))||/^[•●*]{3,}$/.test(contentText)||(editorScreens.includes(screenId)&&(editableValues.includes(contentText)||/^Mình mua hơi nhiều|^Món súp đơn giản|^Sơ chế bí đỏ|^Xào hành tây/.test(contentText)))||inputIds[n.id??''];
  const search=/^Tìm kiếm/.test(contentText);
  const compose=/^Nhắn tin|^Nhập tin nhắn|^Hãy viết bình luận/.test(contentText);
  if((formText||search||compose)&&n.children.every(c=>typeof c==='string')){
   const config=inputIds[n.id??'']??{};
   return <TextInput accessibilityLabel={search?'Tìm kiếm':contentText} value={inputValue} onChangeText={setInputValue} onFocus={search&&['16:15184','16:17045'].includes(screenId)?()=>onAction({...n,name:'open-search'}):undefined} onSubmitEditing={search?()=>onAction({...n,name:'search-submit'}):undefined} returnKeyType={search?'search':'next'} multiline={contentText.length>65} placeholder={contentText} placeholderTextColor={textStyle.color??'#717c73'} keyboardType={config.type??(contentText.includes('@')?'email-address':'default')} secureTextEntry={config.secure??/mật khẩu|^[•●*]{3,}/i.test(contentText)} style={[style,textStyle,{padding:0,margin:0}]} autoCapitalize="none" testID={n.id}/>;
  }
  return <Text testID={n.id} onPress={handle} onLongPress={contentText==='MorselUp'?onCatalog:undefined} accessibilityRole={handle?'button':undefined} allowFontScaling={false} style={[style,textStyle]} numberOfLines={nowrap?1:undefined}>{content}</Text>;
 }
 if(inText)return <Text style={textStyle}>{content}</Text>;
 const common={testID:n.id,onLayout:(e:any)=>{const {width,height}=e.nativeEvent.layout;if(Math.abs(layout.width-width)>.1||Math.abs(layout.height-height)>.1)setLayout({width,height});}};
 const nativeStyle={flexShrink:0,...style};
 // Figma inside strokes do not consume auto-layout space. Yoga borders do.
 // Draw the stroke separately so padding and absolute child origins stay exact.
 const stroke:Record<string,any>={};
 if(n.children.length&&['borderWidth','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'].some(k=>style[k])){
  for(const k of Object.keys(style))if(k.startsWith('border'))stroke[k]=style[k];
  for(const k of ['borderWidth','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth'])delete (nativeStyle as Record<string,any>)[k];
 }
 const children=content.map((c,i)=>typeof c==='string'?<Text key={i} style={textStyle}>{c}</Text>:c);
 const surface=n.gradient?<LinearGradient colors={['#7bbf9e','#257955','#203c30']} locations={[.14904,.55769,1]} style={{position:'absolute',inset:0}}/>:n.backdropBlur?<BlurView intensity={n.backdropBlur*2} style={{position:'absolute',inset:0,borderRadius:style.borderRadius,overflow:'hidden'}}/>:null;
 const outline=Object.keys(stroke).length?<View pointerEvents="none" style={{position:'absolute',inset:0,...stroke}}/>:null;
 if(n.scroll&&typeof style.height==='number'){
  const contentHeight=Math.max(style.height,...n.children.filter((c):c is NativeNode=>typeof c==='object').map(c=>(typeof c.style.top==='number'?c.style.top:0)+(typeof c.style.height==='number'?c.style.height:0)));
  if(contentHeight>style.height+1){
   const scrollStyle:Record<string,any>={...nativeStyle};
   for(const key of ['flexDirection','alignItems','justifyContent','gap','rowGap','columnGap'])delete scrollStyle[key];
   const hotspots=n.id?nestedHotspots?.[n.id]:undefined;
   return <ScrollView {...common} ref={scrollRef} nestedScrollEnabled showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={scrollStyle} contentContainerStyle={{minHeight:contentHeight,flexDirection:style.flexDirection,alignItems:style.alignItems,justifyContent:style.justifyContent,gap:style.gap,rowGap:style.rowGap,columnGap:style.columnGap}}>{surface}{children}{outline}{hotspots?.length?<View pointerEvents="box-none" style={{position:'absolute',left:0,top:0,width:'100%',height:contentHeight}}>{hotspots.map(h=><Pressable key={h.interaction.id} testID={'prototype:'+h.interaction.id} accessibilityRole="button" accessibilityLabel={h.interaction.name} onPress={e=>{const {pageX,pageY,locationX,locationY}=e.nativeEvent;onPrototypeAction?.(h.interaction,{pageX,pageY,locationX,locationY});}} style={{position:'absolute',left:h.left,top:h.top,width:h.interaction.b!.width,height:h.interaction.b!.height}}/>)}</View>:null}</ScrollView>;
  }
 }
 if(handle)return <Pressable {...common} accessibilityRole="button" accessibilityLabel={label} onPress={handle} onLongPress={onCatalog} style={nativeStyle}>{surface}{children}{outline}</Pressable>;
 return <View {...common} style={nativeStyle}>{surface}{children}{outline}</View>;
}
