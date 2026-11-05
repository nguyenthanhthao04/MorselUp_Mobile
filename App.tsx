import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, FlatList, Linking, Modal, PixelRatio, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SourGummy_400Regular, SourGummy_700Bold } from '@expo-google-fonts/sour-gummy';
import { NavigationBar } from 'expo-navigation-bar';
import screensData from './src/generated/screens.json';
import framesData from './design/frames.json';
import nestedData from './src/generated/nested-hotspots.json';
import { NativeDesign } from './src/NativeDesign';
import { DesignScreen, NativeNode } from './src/types';
import { theme } from './src/theme';
import { activeFrame, applyPrototypeAction, applyPrototypeInteraction, hasClickAction, initialPrototype, overlayPlacement, prototypeFrames, PrototypeInteraction, PrototypePointer } from './src/prototype';

const screens=screensData as DesignScreen[];
const byId=Object.fromEntries(screens.map(s=>[s.id,s]));
const interFonts={
 Inter_200ExtraLight:require('./assets/fonts/inter-3.19/Inter-ExtraLight.otf'),
 Inter_300Light:require('./assets/fonts/inter-3.19/Inter-Light.otf'),
 Inter_400Regular:require('./assets/fonts/inter-3.19/Inter-Regular.otf'),
 Inter_500Medium:require('./assets/fonts/inter-3.19/Inter-Medium.otf'),
 Inter_600SemiBold:require('./assets/fonts/inter-3.19/Inter-SemiBold.otf'),
 Inter_700Bold:require('./assets/fonts/inter-3.19/Inter-Bold.otf'),
 Inter_800ExtraBold:require('./assets/fonts/inter-3.19/Inter-ExtraBold.otf'),
 Inter_900Black:require('./assets/fonts/inter-3.19/Inter-Black.otf'),
 Inter_400Regular_Italic:require('./assets/fonts/inter-3.19/Inter-Italic.otf'),
};
const titleOverrides:Record<string,string>={
 '16:13885':'Khởi động','16:13942':'Chào mừng','16:13981':'Số điện thoại','16:13999':'Xác thực OTP','16:14642':'Đăng ký Email','16:14770':'Đăng nhập','16:14806':'Quên mật khẩu',
 '16:15184':'Bảng tin','16:17298':'Hồ sơ của tôi','16:17671':'Hồ sơ · Danh sách bài đăng','16:18018':'Hồ sơ · Danh sách bài đăng','16:15929':'Thống kê chia sẻ',
 '16:15450':'Bình luận bài đăng','16:15600':'Danh sách bài đăng','16:15772':'Danh sách bài đăng','16:16061':'Người theo dõi','16:16194':'Đang theo dõi','16:17045':'Thực phẩm xung quanh','16:16291':'Tìm kiếm thực phẩm','16:16357':'Kết quả tìm kiếm','16:16535':'Kết quả đã lọc','16:16998':'Bộ lọc nâng cao','16:16691':'Yêu cầu nhận miễn phí','16:16873':'Yêu cầu mua giá rẻ','16:16766':'Đề nghị tặng thực phẩm','16:17621':'Chọn loại bài đăng',
 '16:14037':'Cài đặt','16:14363':'Thông báo đẩy','16:14412':'Giao diện','16:14901':'Mẹo bảo quản','16:14994':'Chi tiết mẹo bảo quản','16:15074':'Công thức theo nguyên liệu',
};

function startScreen(){if(Platform.OS==='web'){const id=new URLSearchParams(window.location.search).get('screen');if(id&&byId[id])return id;}return '16:13885';}

function FrameView({id,onInteraction,onCatalog,standalone=false}:{id:string;onInteraction:(id:string,i:PrototypeInteraction,p?:PrototypePointer)=>void;onCatalog:()=>void;standalone?:boolean}){
 const scrollRef=useRef<React.ComponentRef<typeof ScrollView>>(null);
 useEffect(()=>{if(__DEV__){const g=globalThis as any;g.__morselupScroll??={};g.__morselupScroll[id]=(y:number)=>scrollRef.current?.scrollTo({y,animated:false});return()=>{delete g.__morselupScroll[id];};}},[id]);
 const screen=byId[id], prototype=prototypeFrames[id];
 const nav=screen.root.children.find(n=>typeof n!=='string'&&n.name==='bottom nav') as NativeNode|undefined;
 const contentRoot={...screen.root,children:screen.root.children.filter(n=>n!==nav),style:{...screen.root.style,width:screen.width,height:screen.height}};
 const nested=(nestedData as Record<string,Record<string,{origin:{x:number;y:number};interactionIds:string[]}>>)[id]??{};
 const nestedIds=new Set(Object.values(nested).flatMap(s=>s.interactionIds));
 const nestedHotspots=Object.fromEntries(Object.entries(nested).map(([key,s])=>[key,prototype.interactions.filter(i=>s.interactionIds.includes(i.id)&&hasClickAction(i)&&i.b).map(i=>({interaction:i,left:i.b!.x-s.origin.x,top:i.b!.y-s.origin.y}))]));
 const nativeProps={onAction:()=>{},onCatalog,screenId:id,prototypeMode:true,nestedHotspots,onPrototypeAction:(i:PrototypeInteraction,p?:PrototypePointer)=>onInteraction(id,i,p)};
 const navTop=screen.height-80;
 const fixed=(i:PrototypeInteraction)=>!!nav&&!!i.b&&i.b.y>=navTop;
 const hotspot=(i:PrototypeInteraction,pinned=false)=>i.b&&hasClickAction(i)?<Pressable
  key={i.id} testID={'prototype:'+i.id} accessibilityRole="button" accessibilityLabel={i.name}
  onPress={e=>{const {pageX,pageY,locationX,locationY}=e.nativeEvent;onInteraction(id,i,{pageX,pageY,locationX,locationY});}}
  style={{position:'absolute',left:i.b.x,top:pinned?i.b.y-navTop+846:i.b.y,width:i.b.width,height:i.b.height}}
 />:null;
 const content=<View style={{width:screen.width,height:screen.height}}>
  <NativeDesign {...nativeProps} node={contentRoot}/>
  <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>{prototype.interactions.filter(i=>!fixed(i)&&!nestedIds.has(i.id)).map(i=>hotspot(i))}</View>
 </View>;
 const small=screen.width<428||screen.height<926;
 return <View style={{width:small?screen.width:428,height:small?screen.height:926}}>
  {small?content:<ScrollView ref={scrollRef} key={id} style={{width:428,height:926}} contentContainerStyle={{minHeight:926}} showsVerticalScrollIndicator={false} bounces={false} keyboardShouldPersistTaps="handled">{content}</ScrollView>}
  {nav?<View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
   <NativeDesign {...nativeProps} node={{...nav,style:{...nav.style,position:'absolute',top:846,bottom:undefined,left:0,width:428,height:80,transform:undefined}}}/>
   {prototype.interactions.filter(fixed).map(i=>hotspot(i,true))}
  </View>:null}
 </View>;
}
export default function App(){
 const [loaded,fontError]=useFonts({...interFonts,SourGummy_400Regular,SourGummy_700Bold});
 const [state,setState]=useState(()=>initialPrototype(startScreen()));
 const [catalog,setCatalog]=useState(false),[search,setSearch]=useState('');
 const {width,height}=useWindowDimensions(),scale=Math.min(width/428,height/926);
 const current=activeFrame(state);
 const go=useCallback((id:string,previous?:string)=>{if(byId[id])setState(previous&&byId[previous]?{history:[previous,id],overlays:[],revision:0}:initialPrototype(id));},[]);
 const back=useCallback(()=>{setState(s=>applyPrototypeAction(s,{type:'BACK'}));return true;},[]);
 const interact=useCallback((id:string,i:PrototypeInteraction,p?:PrototypePointer)=>{
  if(__DEV__)(globalThis as any).__morselupLastInteraction={frame:id,node:i.id};
  const positioned=p&&i.b?{...i,b:{...i.b,x:(p.pageX-(width-428*scale)/2)/scale-p.locationX,y:(p.pageY-(height-926*scale)/2)/scale-p.locationY}}:i;
  setState(s=>activeFrame(s)===id?applyPrototypeInteraction(s,positioned):s);
 },[width,height,scale]);
 useEffect(()=>{if(Platform.OS==='android')NavigationBar.setHidden(true);},[current,catalog]);
 useEffect(()=>{if(__DEV__)(globalThis as any).__morselupReview={selectScreen:go,current,scale,width,height,pixelRatio:PixelRatio.get(),state,
  fireInteraction:(nodeId:string)=>{const i=prototypeFrames[current].interactions.find(i=>i.id===nodeId);if(i)interact(current,i);},
  screens:screens.map(s=>({id:s.id,name:s.name}))};},[go,interact,current,scale,width,height,state]);
 useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(catalog){setCatalog(false);return true;}return back();});return()=>sub.remove();},[back,catalog]);
 useEffect(()=>{const receive=(url:string|null|undefined)=>{if(!url)return;const match=url.match(/[?&]screen=([^&]+)/);if(match)go(decodeURIComponent(match[1]));};Linking.getInitialURL().then(receive);const sub=Linking.addEventListener('url',e=>receive(e.url));return()=>sub.remove();},[go]);
 useEffect(()=>{if(Platform.OS!=='web')return;const listener=(e:KeyboardEvent)=>{if(e.key==='Escape'){setCatalog(false);back();}if(e.key==='g'&&!(e.target instanceof HTMLInputElement))setCatalog(true);};window.addEventListener('keydown',listener);return()=>window.removeEventListener('keydown',listener);},[back]);
 const data=useMemo(()=>framesData.filter(f=>(titleOverrides[f.id]??f.name).toLowerCase().includes(search.toLowerCase())),[search]);
 if(!loaded&&!fontError)return <View style={{flex:1,backgroundColor:theme.green}}/>;
 const baseId=state.history.at(-1)!,base=prototypeFrames[baseId];
 const basePosition=overlayPlacement({...base,overlayPositionType:'CENTER'});
 return <View style={styles.app}>
  <StatusBar hidden/>
  <View style={{width:428*scale,height:926*scale,overflow:'hidden',backgroundColor:theme.background}}>
   <View style={{width:428,height:926,transform:[{scale}],transformOrigin:'top left'}}>
    <View style={{position:'absolute',left:base.width<428?basePosition.left:0,top:base.height<926?basePosition.top:0}}>
     <FrameView key={baseId} id={baseId} onInteraction={interact} onCatalog={()=>setCatalog(true)}/>
    </View>
    {state.overlays.map((o,index)=>{
     const frame=prototypeFrames[o.id],c=frame.overlayBackground.color;
     const color=c?`rgba(${Math.round(c.r*255)},${Math.round(c.g*255)},${Math.round(c.b*255)},${c.a})`:'transparent';
     return <View key={index+':'+o.id} style={StyleSheet.absoluteFill}>
      <Pressable accessibilityLabel="Đóng lớp phủ" style={[StyleSheet.absoluteFill,{backgroundColor:color}]} onPress={frame.overlayBackgroundInteraction==='CLOSE_ON_CLICK_OUTSIDE'?()=>setState(s=>applyPrototypeAction(s,{type:'CLOSE'})):undefined}/>
      <View style={{position:'absolute',...overlayPlacement(frame,o.position)}}><FrameView id={o.id} onInteraction={interact} onCatalog={()=>setCatalog(true)}/></View>
     </View>;
    })}
   </View>
  </View>
  <Modal visible={catalog} animationType="slide" onRequestClose={()=>setCatalog(false)}>
   <View style={styles.catalog}>
    <View style={styles.catalogHeader}><Text style={styles.catalogTitle}>MorselUp · Màn hình</Text><Pressable onPress={()=>setCatalog(false)} accessibilityLabel="Đóng danh sách"><Text style={styles.close}>Đóng</Text></Pressable></View>
    <Text style={styles.caption}>{screens.length}/{framesData.length} frame. Nhấn giữ logo để mở lại danh sách.</Text>
    <TextInput style={styles.search} value={search} onChangeText={setSearch} placeholder="Tìm màn hình…" placeholderTextColor={theme.text}/>
    <FlatList data={data} keyExtractor={s=>s.id} renderItem={({item})=><Pressable disabled={!byId[item.id]} onPress={()=>{go(item.id);setCatalog(false);}} style={[styles.catalogRow,!byId[item.id]&&{opacity:.45}]}><Text style={styles.rowTitle}>{titleOverrides[item.id]??item.name}</Text><Text style={styles.caption}>{item.name} · {item.width}×{item.height}{!byId[item.id]?' · Chưa lấy được do giới hạn Figma':''}</Text></Pressable>}/>
   </View>
  </Modal>
 </View>;
}
const styles=StyleSheet.create({
 app:{flex:1,backgroundColor:'#e5e9e4',alignItems:'center',justifyContent:'center'},
 dialogBackdrop:{width:428,height:926,backgroundColor:'rgba(32,60,48,0.22)',alignItems:'center',justifyContent:'center'},
 catalog:{flex:1,backgroundColor:theme.background,paddingTop:45,paddingHorizontal:24},catalogHeader:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:12},
 catalogTitle:{fontFamily:'Inter_700Bold',fontSize:21,color:theme.title},close:{fontFamily:'Inter_600SemiBold',color:theme.green,fontSize:16,padding:8},
 caption:{fontFamily:'Inter_400Regular',fontSize:12,lineHeight:18,color:theme.text},search:{fontFamily:'Inter_400Regular',fontSize:15,borderWidth:1,borderColor:theme.border,borderRadius:10,padding:14,marginVertical:16},
 catalogRow:{paddingVertical:15,borderBottomWidth:1,borderColor:theme.border},rowTitle:{fontFamily:'Inter_600SemiBold',fontSize:15,color:theme.title,marginBottom:4},
});


