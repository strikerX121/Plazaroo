import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Itemadded extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false
            }
      
    }
   
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
         <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
 
        {/* //=----------------------header part---------=000------ */}
        {/* <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
      </View> */}
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30,flex:0.8,alignItems:'center',justifyContent:'center',alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/added.png')} style={{alignSelf:'center',resizeMode:'contain',width:screenWidth*90/100,height:200,}}/>
             </View>
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:20,paddingVertical:20}}>Item Added</Text>
<Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,alignSelf:'center',lineHeight:20}}>Thank you for submitting.{"\n"}we will notify you when your listing{"\n"}is live.</Text>
        </View>  
       {/* ........................................Container finish............................... */}
     
       <View style={{position:"absolute",bottom:20,alignSelf:'center',width:'100%',}}>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.props.navigation.navigate('Userhome')}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Continue</Text>
               </View>
            </TouchableOpacity>      
                      
             </View>
         
        
    </View>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
       
    },
   
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:14,
        width:'90%',
    }
   
})