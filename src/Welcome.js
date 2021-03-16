import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,BackHandler,TouchableOpacity,StatusBar} from 'react-native';
import Colors from './Colors';
import { config } from './providers/configProvider';
import { localStorage }  from './providers/localStorageProvider';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Welcome extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false, player_id:'' }
      
    }
   
  
  
    
  
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
         <StatusBar 
           hidden = {true}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
          <View style={{paddingTop:60,width:'100%',height:100}}>
            <Image source={require('./icons/logo.png')} style={{alignSelf:'center',width:screenWidth*51/100,height:50,resizeMode:'contain'}}/>
        </View>
        <View style={{alignItems:'center',alignContent:'center',justifyContent:'center',flex:0.8}}>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Userlogin')}}  activeOpacity={0.8} style={{marginBottom:13,alignSelf:'center',borderRadius:6,paddingVertical:8,width:screenWidth*80/100,backgroundColor:'#FFFFFF'}}>
               <View style={{flexDirection:'row',paddingHorizontal:10,width:'100%'}}>
                   <View style={{width:'18%'}}>
                   <Image source={require('./icons/name.png')} style={{width:25,alignSelf:'center',height:25,borderRadius:15}}/>
                   </View>
                   <Text style={{fontFamily:'Ubuntu-Bold',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor,textAlign:'center',width:'62%'}}>GO TO USER</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf:'center',borderRadius:6,paddingVertical:8,width:screenWidth*80/100,backgroundColor:'#FFFFFF'}} onPress={()=>{this.props.navigation.navigate('Vendorlogin')}}>
               <View style={{flexDirection:'row',paddingHorizontal:10,width:'100%'}}>
                   <View style={{width:'18%'}}>
                   <Image source={require('./icons/name.png')} style={{width:25,alignSelf:'center',height:25,borderRadius:15,}}/>
                   </View>
                   <Text style={{fontFamily:'Ubuntu-Bold',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor,textAlign:'center',width:'62%'}}>GO TO VENDOR</Text>
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
        backgroundColor:Colors.buttoncolor,
       
    },
   
})