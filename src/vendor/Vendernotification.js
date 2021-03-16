import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,FlatList,BackHandler,SafeAreaView ,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Venderfooter from './Venderfooter'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon2 from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/AntDesign';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const data=[
    {
       
        'images':require('../icons/noti1.png'),
         'message':"You've beem followed by Nylah Kelly",
         'time':'20 mins ago'
     },
     {
         'images':require('../icons/noti2.png'),
        'message':"You have a new message from Catherine Jordan",
        'time':'Yesturday'
     },
     {
        
        'images':require('../icons/noti3.png'),
        'message':"John Deo Provided a feedback",
        'time':'12-03-2020'
     },
     {
        
        'images':require('../icons/noti4.png'),
        'message':"Congratulation you've a new offer request",
        'time':'05-02-2020'
     },
     {
        
        'images':require('../icons/noti5.png'),
        'message':"Congratulation your delivery is receive by the user",
        'time':'04-02-2020'
     },
    
]
export default class Vendernotification extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             data:data,
           
              }
      
    }

 
   
    render(){
        console.log('cikasd')
return(
   <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
    <View style={styles.container}>
     
         {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:25,height:screenHeight*10/100,}}>
         <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{width:'65%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Notification</Text>
          </View>
          <TouchableOpacity style={{width:'20%',alignSelf:'center'}}> 
          <View style={{width:'100%',alignSelf:'center'}}>
          <Text style={{color:Colors.buttoncolor,textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Clear All</Text>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor,width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
      
        <View style={{width:'95%',alignSelf:'center'}}>
          <FlatList
               data={this.state.data}
               showsVerticalScrollIndicator={false}
               renderItem={({item,index})=>{
                  return(
                    <TouchableOpacity>
                    <View style={{flexDirection:'row',paddingVertical:14}}>
                          <View style={{width:'15%',}}>
                              <Image source={item.images} style={{width:25,height:25,borderRadius:5,alignSelf:'center'}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.time}</Text>
                   </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deletenotification('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
                   
      
  
       {/* ........................................Container finish............................... */}
      
      
       <Venderfooter navigation={this.props.navigation} color={this.state.page}/>
        
    </View>
    </SafeAreaView>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
      },
    textfiledinput:{
      paddingVertical:5,
      color:'black',
      fontFamily:'Ubuntu-Medium',
      fontSize:14,
      paddingLeft:12,
    width:'100%'
    },
    inputcontainer:{
        flexDirection:'row',     
        backgroundColor:'#f5f5f5',
         height:47,
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:15,width:'83%'
    },
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:12,
        width:'100%',
    },
    textfont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:13.5,
        color:'gray',
        paddingLeft:10,
        lineHeight:30,
        paddingLeft:15
    }
   
})