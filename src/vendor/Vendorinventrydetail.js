import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,ImageBackground,TouchableOpacity,BackHandler,FlatList,StatusBar, ScrollView} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { TextInput } from 'react-native-gesture-handler';
import Venderfooter from './Venderfooter'
import Icon from 'react-native-vector-icons/AntDesign'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Vendorinventrydetail extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
           player_id:'' ,
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
     <ImageBackground source={require('../icons/nokia3.png')} style={{width:screenWidth,height:screenHeight*30/100,paddingVertical:10,backgroundColor:Colors.imagebackcolor}}>
      <View style={{paddingTop:15,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
           <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
           <Image source={require('../icons/back.png')} style={{width:15,height:15,alignSelf:'center'}}/>
           </TouchableOpacity>
       {/* <View style={{flexDirection:'row'}}>
           <Image source={require('../icons/w-share.png')} style={{width:15,height:15,alignSelf:'center',marginRight:15}}/>
            <Image source={require('../icons/w-heart.png')} style={{width:15,height:15,alignSelf:'center',}}/>
       </View> */}
      </View>
     </ImageBackground> 
     <ScrollView >  
     <View style={{paddingBottom:20,elevation:2,shadowOpacity:2,backgroundColor:'#FFFFFF', shadowOffset:{height: 0.6 * 2,}}}>
     <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:14,width:'90%',alignSelf:'center',paddingVerticalL:12}}>
        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12}}>Mobile</Text> 
        <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:14}}>$125.00</Text>         
     </View>
        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15,paddingLeft:19,paddingTop:5}}>Nokia 2.2 For Sale</Text>         
     <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignSelf:'center',marginVertical:13}}>
         <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',borderRadius:15,elevation:2,paddingVertical:3,marginRight:10,paddingHorizontal:10}}>
             <Image source={require('../icons/fire.png')} style={{width:10,height:10,alignSelf:'center',marginRight:3}}/>
            <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:10}}>50m</Text> 
         </View>
         <View style={{flexDirection:'row'}}>
         <View style={{backgroundColor:'#f0f0f0',flexDirection:'row',paddingVertical:3,marginRight:10,paddingHorizontal:10,borderRadius:15,elevation:2}}>
             <Image source={require('../icons/g-eye.png')} style={{width:10,height:10,alignSelf:'center',marginRight:3}}/>
            <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:10}}>26</Text> 
         </View> 
         <View style={{backgroundColor:'#f0f0f0',flexDirection:'row',paddingVertical:3,paddingHorizontal:10,borderRadius:15,elevation:2}}>
             <Image source={require('../icons/g-heart.png')} style={{width:10,height:10,alignSelf:'center',marginRight:3}}/>
            <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:10}}>0</Text> 
         </View>
         </View>
         
     </View>
     </View>
     <View style={{paddingBottom:20,elevation:2,paddingVertical:13,marginTop:0.5,shadowOpacity:2,backgroundColor:'#FFFFFF', shadowOffset:{height: 0.6 * 2,},paddingHorizontal:15}}>
       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Details</Text> 
         <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12,lineHeight:20}}>Nokia 2.2 Mobile for sale, Condition is almost new{"\n"}and used only a month,{"\n"}it has 3 GB Ram,10/10 Condition.{"\n"}Please contact only serios buyers.{"\n"}Thanks</Text> 
     </View>
     {/* <View style={{paddingBottom:20,elevation:2,paddingVertical:13,marginTop:0.5,shadowOpacity:2,backgroundColor:'#FFFFFF', shadowOffset:{height: 0.6 * 2,},paddingHorizontal:15}}>
       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Sold by</Text> 
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Profile')}}>
        <View style={{width:'100%',flexDirection:'row',paddingVertical:8,alignSelf:'center'}}>
           <View style={{width:'15%',alignSelf:'center'}}>
           <Image source={require('../icons/boy.jpg')} style={{width:26,height:30,borderRadius:13,backgroundColor:'gray'}}/>
           </View>
         <View style={{width:'75%'}}>
              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Octasia Mushiro</Text>  
              <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13}}>4.5</Text>    
            </View> 
            <View style={{width:'15%',alignSelf:'center'}}>
              <Icon name='right' size={15} color='black' style={{alignSelf:'center'}}/>  
            </View>
        </View>
        </TouchableOpacity>
     </View> */}
     <View style={{paddingBottom:20,elevation:2,paddingVertical:13,marginTop:0.5,shadowOpacity:2,backgroundColor:'#FFFFFF', shadowOffset:{height: 0.6 * 2,},paddingHorizontal:15}}>
       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Location</Text> 
         <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12,lineHeight:20}}>Johar Town, Street 12,Ny,USA</Text> 
      {/* <View style={{width:'100%',alignSelf:'center',paddingVertical:10}}>
          <Image source={require('../icons/map.jpg')} style={{width:'100%',height:130}}/>
      </View> */}
      {/* <View style={{width:'100%',flexDirection:'row'}}>
         <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Messagedetaile')}} style={{width:'48%',paddingVertical:13,backgroundColor:'#FFFFFF',alignSelf:'center',borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
         <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center',width:'100%'}}>Send Message</Text> 
         </TouchableOpacity>  
         <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Productmakeoffer')}} style={{width:'48%',paddingVertical:13,alignSelf:'center',marginLeft:'2%',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
         <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center',width:'100%'}}>Make offer</Text> 
         </TouchableOpacity>  
      </View> */}
     </View>
     </ScrollView>
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
        paddingVertical:15,
        width:'90%',
    }
   
})