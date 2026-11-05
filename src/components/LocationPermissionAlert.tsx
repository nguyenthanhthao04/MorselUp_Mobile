import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

/** Native adapter for the mapped iOS/iPadOS Alert in node 16:22656.
 * Figma provides the Alert composition but no importable React Native module.
 * Header and map layers remain separate original Figma layers in the parent.
 */
export function LocationPermissionAlert({onChoose}:{onChoose:(choice:string)=>void}){
 const buttons=[{text:'Cho phép một lần',top:265},{text:'Cho phép khi dùng ứng dụng',top:323},{text:'Từ chối',top:381}];
 return <View style={styles.alert}>
  {buttons.map((button,index)=><Pressable key={button.text} accessibilityRole="button" onPress={()=>onChoose(button.text)} style={[styles.button,{top:button.top,height:48,backgroundColor:index===2?'#faf9f3':'#245e45'}]}><Text allowFontScaling={false} style={[styles.label,index===2&&{color:'#000000'}]}>{button.text}</Text></Pressable>)}
  <View pointerEvents="none" style={{position:'absolute',inset:0,borderRadius:34,borderWidth:0.5,borderColor:'rgba(255,255,255,0.85)'}}/>
 </View>;
}
const styles=StyleSheet.create({alert:{position:'absolute',top:0,left:0,width:300,height:443,borderRadius:34,backgroundColor:'#f7f7f4',boxShadow:'0px 8px 40px rgba(0,0,0,0.12)'},button:{position:'absolute',left:14,width:272,borderRadius:100,alignItems:'center',justifyContent:'center'},label:{fontFamily:'Inter_500Medium',fontSize:17,lineHeight:22,letterSpacing:-0.43,color:'#ffffff',includeFontPadding:false}});
