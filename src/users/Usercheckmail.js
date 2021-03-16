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
export default class Usercheckmail extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
            
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*30/100,height:30,resizeMode:'contain'}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30,flex:0.8,alignItems:'center',justifyContent:'center',alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/check-mail.png')} style={{alignSelf:'center',resizeMode:'contain',width:200,height:200,}}/>
             </View>
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:20,paddingVertical:20}}>Check your email</Text>
<Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,alignSelf:'center',lineHeight:20}}>We've sent instructions on how to reset{"\n"}The password (also check the Spam folder).</Text>
        </View>  
       {/* ........................................Container finish............................... */}
     
       <View style={{position:"absolute",bottom:20,alignSelf:'center',width:'100%',}}>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.props.navigation.navigate('Userrecoverpassword')}}>
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