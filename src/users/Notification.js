import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,ActivityIndicator,Alert,TextInput,RefreshControl,FlatList,BackHandler,SafeAreaView ,ScrollView,ToastAndroid,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import UserFooter from './UserFooter'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon2 from 'react-native-vector-icons/Feather'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
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
global.last_id=0;
export default class Notification extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             data:data,
             page:0,
             notification_arr:[],
             isConnected:true,
            loadMoreloading:false,
             refresh:false
              }
      
    }
    componentDidMount(){
      console.log(this.state.signal_id)
          NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state => {
              this.setState({isConnected:state.isConnected})
            });
          this.getnotificationdata()

    }
   


    getnotificationdata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
         var url = config.baseURL+'get_notification.php?user_id='+userdata.user_id+'&user_type=1';
        console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:userdata.user_id,loading:true,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
            notification_count_value=0
             if(obj.notification_arr!='NA')
             {
                console.log('obj.notification_arr[obj.notification_arr.length-1].notification_message_id',obj.notification_arr[obj.notification_arr.length-1].notification_message_id)
                last_id=obj.notification_arr[obj.notification_arr.length-1].notification_message_id
             }
           
             this.setState({notification_arr:obj.notification_arr})
            } 
            else{
              if(obj.msg[config.language]=='User not exists!')
              {
                this.props.navigation.navigate('Logout')
              }
              if(obj.account_active_status=="deactivate")
              {
                this.props.navigation.navigate('Logout')
             }
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
           this.setState({loading: false,refresh:false});
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }  
    }
    getnotificationdata1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
       var url = config.baseURL+'get_notification.php?user_id='+userdata.user_id+'&user_type=1&last_id='+last_id;
            
      console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:userdata.user_id,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,loadMoreloading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
            notification_count_value=0
            if(obj.notification_arr!='NA')
            {
               console.log('obj.notification_arr[obj.notification_arr.length-1].notification_message_id',obj.notification_arr[obj.notification_arr.length-1].notification_message_id)
               last_id=obj.notification_arr[obj.notification_arr.length-1].notification_message_id
            }
          
            this.setState({notification_arr:[...this.state.notification_arr,...obj.notification_arr]})
            } 
            else{
              if(obj.msg[config.language]=='User not exists!')
              {
                this.props.navigation.navigate('Logout')
              }
              if(obj.account_active_status=="deactivate")
              {
                this.props.navigation.navigate('Logout')
             }
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
           this.setState({loading: false,refresh:false});
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }  
    }


  deleteconfirmationbtn=(btn,id)=>{
    Alert.alert(
      "Confirm",
      "Do you want to delete notification?",
      [
       { text: 'YES', onPress: () => this.deletenotification(btn,id) },
       { text: 'NO', onPress: () => console.log('cancle') },
       
     ],
     { cancelable: true },
  
    )
  }
    
    deletenotification= async (btn,id)=>{
      var userdata=await localStorage.getItemObject('user_arr')
    let  user_id=userdata.user_id 
     console.log('userid',userdata)
     if(this.state.isConnected===true)
        {
     var url = config.baseURL+'delete_notificatiton.php';
     let data=new FormData();
      data.append('user_id',user_id)
      data.append('notification_id',id)
      data.append('action',btn)
      data.append("user_type", 1);
      console.log('url',url)
      this.setState({user_id:user_id,loading:true,})
       fetch(url,{ 
         method: 'POST',
         headers: new Headers(config.headersapi), 
       body:data,
      }).then((obj)=>{  this.setState({loading:false});   return  obj.json();}).then((obj)=>{
        console.log("objdata=>",obj)
          if(obj.success == 'true'){
            let data=this.state.notification_arr
           
            let index= data.findIndex((item)=>{
                 return item.notification_message_id==id
             })  
             if(index!=-1)
             {
               data.splice(index, 1)
             }
             else if(btn=='all'){
                 data='NA' 
             }
             if(data.length==0)
             {
               data='NA'
              
              //  localStorage.setItemObject('company_id',null)
             }
             this.setState({notification_arr:data})
             ToastAndroid.showWithGravityAndOffset(
              obj.msg[config.language],
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );
               } 
           else{
            if(obj.msg[config.language]=='User not exists!')
            {
              this.props.navigation.navigate('Logout')
            }
            if(obj.account_active_status=="deactivate")
            {
              this.props.navigation.navigate('Logout')
           }
              msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
             return false;
        }
      }).catch((error)=> {
        console.log("-------- error ------- "+error);
        msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
          this.setState({loading: false});
    });
  }
  else{
     msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
   }
       
     } 
     _onRefresh = () => {
      this.setState({refresh:true})
      this.getnotificationdata()
    }
   
    loadMore = () => {
      console.log('vikas')
     if(this.state.notification_arr!='NA')
     {
      this.setState({
        loadMoreloading:true, page: this.state.page + 1
      }, () => {
        this.getnotificationdata1();
      });
     }
    }
    renderFooter = () => {
      //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if(this.state.loadMoreloading==true)
    {
       return (
         <ActivityIndicator
           style={{ color: '#000' }}
         />
       );
    
     }
     else{
       return null
     }
    };
   

    render(){
        console.log('cikasd')
return(
   <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
    <View style={styles.container}>
     <Loader loading={this.state.loading}/>
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
          {this.state.notification_arr!='NA' &&
          <View style={{width:'20%',alignSelf:'center'}}>
          {this.state.notification_arr.length>1 &&   <TouchableOpacity style={{width:'100%',alignSelf:'center'}} onPress={()=>{this.deleteconfirmationbtn('all',"")}}> 
              <View style={{width:'100%',alignSelf:'center'}} >
                  <Text style={{color:Colors.buttoncolor,textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Clear All</Text>
              </View>
            </TouchableOpacity>}
            </View>
          }
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor,width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
      
        {/* <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
        showsVerticalScrollIndicator={false}
          > */}
        <View style={{width:'95%',alignSelf:'center',paddingBottom:150}}>
          <FlatList
               data={this.state.notification_arr}
               showsVerticalScrollIndicator={false}
               onEndReached={(x) => {this.loadMore()}}
               onEndReachedThreshold={0.5}
               ListFooterComponent={this.renderFooter}
               onRefresh={() => this._onRefresh()}
               refreshing={this.state.refresh}
               renderItem={({item,index})=>{
                 if(this.state.notification_arr!='NA')
                 {
                   let json={}
                   if(item.action_json)
                   {
                   
                   json=item.action_json.replace(/"/g,"")
                  }
                   
                  return(
                    <View style={{width:'100%',alignSelf:'center'}}>
                   {item.action=='login' &&
                    <TouchableOpacity activeOpacity={1}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                              <Image source={{uri:config.img_url2+item.other_user_image}} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                   {item.action=="Signup"  &&
                     <TouchableOpacity activeOpacity={1}>
                     <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                           <View style={{width:'15%',}}>
                               <Image source={{uri:config.img_url2+item.other_user_image}} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                           </View>
                           <View style={{width:'75%',}}>
                       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                       <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                      </View>
                           <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                     <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                    {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                              </TouchableOpacity>
                             </View>
                     </TouchableOpacity>
                   }
                    {item.action=="item_approve"  &&
                       <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Homeproductdetaile',{'Product_id':item.action_id})}}>
                     <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                           <View style={{width:'15%',}}>
                           <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                           </View>
                           <View style={{width:'75%',}}>
                       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                       <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                      </View>
                           <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                     <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                    {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                              </TouchableOpacity>
                             </View>
                     </TouchableOpacity>
                   }
                   {item.action=="offer_create"  &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Viewoffers',{'item_id':item.action_id,'item_name':item.title})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="offer_accept"  &&
                     <TouchableOpacity activeOpacity={0.9} onPress={()=>{ this.props.navigation.navigate('Homeproductdetaile',{'Product_id':json.item_id})}}>
                    
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                              <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                   {item.action=="order_rate"  &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="new_booking"  &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="order_booking"  &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>

                      
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                   {item.action=="order_sold"  &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                   {item.action=="order_Shipped" &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="order_delivered"  &&
                   <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="reffer_amount"  &&
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('UserWallet')}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                              <Image source={{uri:config.img_url2+item.other_user_image}} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="order_accept"  &&
                                       <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                   {item.action=="order_reject"  &&
                                       <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                    {item.action=="order_rejection"  &&
                                       <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':item.action_id})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,width:'100%'}}>
                          <View style={{width:'15%',}}>
                          <Image source={item.item_image.length>0?{uri:config.img_url2+item.item_image[0].image}:require('../icons/noimage.png')} style={{width:45,height:45,borderRadius:5,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'75%',}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',width:'100%',fontSize:14,}}>{item.message[0]}</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,paddingTop:10}}>{item.createtime}</Text>
                     </View>
                          <TouchableOpacity style={{width:50,width:'10%'}} onPress={()=>{this.deleteconfirmationbtn('single',item.notification_message_id)}}>
                                    <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                             </TouchableOpacity>
                            </View>
                    </TouchableOpacity>
                   }
                   
                   
                    </View>
                  )
                 }
                 else{
                  if(item=='N')
                  {
                    return(
                      <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>No notification available</Text>
                    )
                  }
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
                   
            {/* </ScrollView> */}
  
       {/* ........................................Container finish............................... */}
      
      
       <UserFooter navigation={this.props.navigation} color={this.state.page}/>
        
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