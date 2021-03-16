import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Linking,ToastAndroid,Dimensions,Keyboard,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Loader from '../Loader';
import StarRating from 'react-native-star-rating';
import NetInfo from '@react-native-community/netinfo';
import {notification} from '../providers/NotificationProvider';
import OneSignal from 'react-native-onesignal';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
         {
           'name':'Levis colorblock',
           'images':require('../icons/men2.jpg'),
           'color':'Red',
           'quantity':1,
           'size':'M',
           'price':'120.95'
          },
        {
            'name':'Nokia 2.2',
            'images':require('../icons/nokia.jpg'),
            'color':'White',
            'quantity':1,
            'size':'Usa',
            'price':'120.95'
        },
       
]
 
export default class Mybuyingproductdetaile extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
              isConnected:true,
              refresh:false,
              orderdata:orderdata,
              status:4,
               order_details_arr:'',
               tracking_number:'',
               order_details:'',
               address:'',
               location:'',
               totalprice:0,
              order_type:'',
              //  order_id:this.props.navigation.getParam('order_id'),
              order_id:this.props.navigation.getParam('order_id'),
              item_details_info:[],
            }
            OneSignal.init(config.onesignalappid, {
              kOSSettingsKeyAutoPrompt: true,
            });
        
            OneSignal.setLogLevel(6, 0);
    }
      componentDidMount(){
     NetInfo.fetch().then(state => {
       this.setState({isConnected:state.isConnected}) });
     //Subscribe to network state updates
      const unsubscribe = NetInfo.addEventListener(state => {
      this.setState({isConnected:state.isConnected})
       });
       const { navigation } = this.props;
       this.focusListener = navigation.addListener('didFocus', () => {
        this.getorderdetile()
        });
       this.getorderdetile()
      }
    getorderdetile=async()=>{
     let userdata=await localStorage.getItemObject('user_arr')
     let user_id=userdata.user_id
     if(this.state.isConnected===true)
     {
      if(this.state.refresh==false)
      {
       this.setState({user_id:userdata.user_id,loading:true,})
      }
       var url = config.baseURL+'get_single_order.php?user_id='+userdata.user_id+'&user_type=1'+'&order_id='+this.state.order_id;
     console.log("url:"+url);
   
      fetch(url,{
         method: 'GET',
         headers: new Headers(config.headersapi), 
         }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
            console.log('obj',obj)
          if(obj.success == 'true'){
              let item=obj.order_details_arr
          let tax=parseFloat(item.sub_total*item.tax_value/100).toFixed(2)
          console.log(tax)
          let delivery_charge=parseFloat(item.delivery_charge).toFixed(2)
          console.log(delivery_charge)
          let price1=parseFloat(item.sub_total)+parseFloat(delivery_charge)+parseFloat(tax)
             console.log(price1)
            let price=price1.toFixed(2);
        
               this.setState({totalprice:price,order_details:obj.order_details_arr,item_details_info:obj.order_details_arr.item_details_info,order_type:obj.order_details_arr.item_details_info[0].order_type,location:obj.order_details_arr.item_details_info[0].location,address:obj.order_details_arr.address_details.address})
              } 
           else{
               msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
               if(obj.account_active_status=="deactivate")
               {
                 this.props.navigation.navigate('Logout')
              }
               return false;
        }
      }).catch((error)=> {
        console.log("-------- error ------- "+error);
        msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
        this.setState({refresh:false})
    });
   }
   else{
      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    }  
   }
   markasorderbtn=async(status)=>{
    let userdata=await localStorage.getItemObject('user_arr')
    let user_id=userdata.user_id
    let item1=this.state.order_details
    if(this.state.isConnected===true)
    {
     if(this.state.refresh==false)
     {
      this.setState({user_id:userdata.user_id,loading:true,})
     }
     var url = config.baseURL+'OrderStatusUpdate.php?user_id='+userdata.user_id+'&user_type=1'+'&order_id='+item1.order_id+'&order_status='+status;
       console.log("url:"+url);
       fetch(url,{
        method: 'GET',
        headers: new Headers(config.headersapi), 
        }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
           console.log('obj',)
         if(obj.success == 'true'){
          let item=obj.order_details_arr
          let tax=parseFloat(item.sub_total*item.tax_value/100).toFixed(2)
          console.log(tax)
          let delivery_charge=parseFloat(item.delivery_charge).toFixed(2)
          console.log(delivery_charge)
          let price1=parseFloat(item.sub_total)+parseFloat(delivery_charge)+parseFloat(tax)
             console.log(price1)
            let price=price1.toFixed(2);
        
               this.setState({totalprice:price,order_details:obj.order_details_arr,item_details_info:obj.order_details_arr.item_details_info,order_type:obj.order_details_arr.item_details_info[0].order_type,location:obj.order_details_arr.item_details_info[0].location,address:obj.order_details_arr.address_details.address})
             if(obj.notification_arr!='NA')
             {
              notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
             }
            } 
          else{
              msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              if(obj.account_active_status=="deactivate")
              {
                this.props.navigation.navigate('Logout')
             }
              return false;
       }
     }).catch((error)=> {
       console.log("-------- error ------- "+error);
       msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
       this.setState({refresh:false})
   });
  }
  else{
     msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
   }  
  }

  trackbtn= async(item) => {
    let userdata=await localStorage.getItemObject('user_arr')
      //-------------------- input validations -----------------
  let user_id=userdata.user_id
   if(this.state.isConnected===true)
        {
    this.setState({ loading: true,user_id:user_id});
       var url = config.baseURL+'add_tracking_number.php?user_id='+user_id+'&order_id='+this.state.order_details.order_id+'&track_number='+this.state.tracking_number+'&user_type=1'
     console.log("url:"+url);
      const {navigate} = this.props.navigation;
   fetch(url,{
         method: 'GET',
         headers: new Headers(config.headersapi), 
       }).then( (obj)=> {
        this.tracking_number.clear()
      this.setState({loading:false,tracking_number:""});
        return obj.json();  
     }).then( (obj)=> { 
      
         console.log('obj',obj);
      //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
         if(obj.success == 'true'){
          let item=obj.order_details_arr
          let tax=parseFloat(item.sub_total*item.tax_value/100).toFixed(2)
          console.log(tax)
          let delivery_charge=parseFloat(item.delivery_charge).toFixed(2)
          console.log(delivery_charge)
          let price1=parseFloat(item.sub_total)+parseFloat(delivery_charge)+parseFloat(tax)
             console.log(price1)
            let price=price1.toFixed(2);
        
               this.setState({totalprice:price,order_details:obj.order_details_arr,item_details_info:obj.order_details_arr.item_details_info,order_type:obj.order_details_arr.item_details_info[0].order_type,location:obj.order_details_arr.item_details_info[0].location,address:obj.order_details_arr.address_details.address})
               ToastAndroid.showWithGravityAndOffset(
                obj.msg[config.language],
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
              );
              }else{
             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
             if(obj.account_active_status=="deactivate")
             {
                this.props.navigation.navigate('Logout')
             }
            }
     }).catch((error)=> {
         console.log("-------- error ------- "+error);
        //  alert("result error:"+error)
         this.setState({loading: false });
     });
   }
     else{
      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }   
  }
  accept_reject_status=async(status)=>{
    let userdata=await localStorage.getItemObject('user_arr')
    let user_id=userdata.user_id
    
    if(this.state.isConnected===true)
       {
       if(this.state.refresh==false)
         {
          this.setState({user_id:userdata.user_id,loading:true,})
        }
     var url = config.baseURL+'accept_reject.php?user_id='+userdata.user_id+'&user_type=1'+'&order_id='+this.state.order_id+'&cancel_status='+status;
       console.log("url:"+url);
       fetch(url,{
        method: 'GET',
        headers: new Headers(config.headersapi), 
        }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
           console.log('obj',obj)
         if(obj.success == 'true'){
          let item=obj.order_details_arr
          let tax=parseFloat(item.sub_total*item.tax_value/100).toFixed(2)
          console.log(tax)
          let delivery_charge=parseFloat(item.delivery_charge).toFixed(2)
          console.log(delivery_charge)
          let price1=parseFloat(item.sub_total)+parseFloat(delivery_charge)+parseFloat(tax)
             console.log(price1)
            let price=price1.toFixed(2);
        
               this.setState({totalprice:price,order_details:obj.order_details_arr,item_details_info:obj.order_details_arr.item_details_info,order_type:obj.order_details_arr.item_details_info[0].order_type,location:obj.order_details_arr.item_details_info[0].location,address:obj.order_details_arr.address_details.address})
            if(obj.notification_arr!='NA')
               {
                notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
               }
               ToastAndroid.showWithGravityAndOffset(
                obj.msg[config.language],
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
              );
            } 
          else{
              msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              if(obj.account_active_status=="deactivate")
              {
                this.props.navigation.navigate('Logout')
             }
              return false;
       }
     }).catch((error)=> {
       console.log("-------- error ------- "+error);
       msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
       this.setState({refresh:false})
   });
  }
  else{
     msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
   }  
    }

    render(){
        console.log(this.state.order_type)
        let item1=this.state.order_details
    return(
      <View style={styles.container}>
          <Loader loading={this.state.loading}/>
          <Loader loading={this.state.loading}/>
           <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
 
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'95%',alignSelf:'center',flexDirection:'row',paddingTop:10,elevation:2,backgroundColor:'#FFFFFF'}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',}}>
                 <Image source={require('../icons/back.png')} style={{width:14,marginLeft:10,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
<Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Order No :{item1.order_no}</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 {/* <Image source={require('../icons/plus.png')} style={{alignSelf:'center',width:30,height:30}}/> */}
             </View>
          </TouchableOpacity>
                
        </View>
        {/* ..............................heaser finish................................ */}
         <ScrollView showsVerticalScrollIndicator={false}>
         <View style={{width:'95%',paddingTop:13,paddingBottom:80,alignSelf:'center'}}>
            <View style={{flexDirection:'row',width:'95%',alignSelf:'center',borderRadius:13}}>
               <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Pending</Text>
               </View>
               {item1.order_status<=0 &&   <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:'gray',}} numberOfLines={1}>- - - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Confirmed</Text>
                </View>}
               {item1.order_status>=1&&   <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Confirmed</Text>
                </View>}
                {this.state.order_type==1 &&
                <View style={{width:'21%'}}>
                {item1.order_status<=1&& 
                   <View style={{width:'100%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:'gray',}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Picked</Text>
                </View>
                }
               {item1.order_status>=2 &&  <View style={{width:'100%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Picked</Text>
                </View>}
                </View>}
                {this.state.order_type==0 &&
                <View style={{width:'21%'}}>
             {item1.order_status<=2 &&
                <View style={{width:'100%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color='gray' style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:'gray',}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipped</Text>
                </View>}
                {item1.order_status>=3 &&
                <View style={{width:'100%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipped</Text>
                </View>}
                </View>}
                {item1.order_status<=3 &&  
                <View style={{width:'24%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color='gray' style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:'gray',}}></Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Delivered</Text>
                </View>}
                {item1.order_status>3 &&  
                <View style={{width:'24%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}}></Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Delivered</Text>
                </View>}
          </View> 
         {/* ________________________________________slider finish_________________________ */}
         
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',marginTop:25,backgroundColor:'#f5f5f5',borderRadius:5,paddingVertical:14}}>
               <Text style={{color:'black',paddingLeft:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>Order Details</Text>
          {item1.payment_mode==2 &&    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addaddressgoogle',{'location_page':'meeting','order_id':item1.order_id})}}>
               <Text style={{color:Colors.buttoncolor,paddingRight:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>MEETING UP</Text>
               </TouchableOpacity>}
         </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
            {this.state.item_details_info=='NA' && 
             <Text style={{color:'black',paddingLeft:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>Order item is not available</Text>
            }
            <View style={{marginTop:15}}>
              <FlatList
               data={this.state.item_details_info}
               renderItem={({item,index})=>{
                 if(this.state.item_details_info!='NA')
                 {
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item.image!='NA'?{uri:config.img_url+item.image[0].image}:require('../icons/noimage.png')} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>{item.category_name}</Text>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>Quantity: {item.quantity}</Text>
                                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:12}}>Price</Text>    
                                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.item_price}</Text>
                                 </View> 
                                 </View>  
                                 </View>  
                    </View>
                  )
                 }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
              {/* ______________________________card finish_____________________________________  */}
              <View style={{marginHorizontal:20}}>
            {item1.user_details &&
              <View style={{paddingBottom:20,paddingVertical:13,marginTop:0.5,borderWidth:1,backgroundColor:'#FFFFFF',marginBottom:10, borderColor:Colors.inputborder,paddingHorizontal:15}}>
              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Purchase by</Text> 
              <TouchableOpacity activeOpacity={1} onPress={()=>{this.props.navigation.navigate('Profile',{'other_user_id':item1.user_details.user_id})}}>
              <View style={{width:'100%',flexDirection:'row',paddingVertical:8,alignSelf:'center'}}>
           <View style={{width:'15%',alignSelf:'center'}}>
           {item1.user_details.image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:30,height:30,borderRadius:15,backgroundColor:'gray'}}/>:
                       <Image source={item1.user_details.login_type=='app'?{uri:config.img_url1+item1.user_details.image}:{uri:item1.user_details.image}} style={{width:30,height:30,borderRadius:15,backgroundColor:'gray'}}/>
                     }
          
           </View>
         
           <View style={{width:'75%',alignSelf:'center'}}>
              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13,}}>{item1.user_details.name}</Text>  
              </View>
            <View style={{width:'15%',alignSelf:'center'}}>
              <Icon name='right' size={15} color='black' style={{alignSelf:'center'}}/>  
            </View>
        </View>
       
             {item1.address_details!='NA' &&
              <View style={{width:'80%'}}>
                   <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingLeft:13}}>{item1.address_details.address}</Text>    
                  </View>
             }
         
        </TouchableOpacity>
     </View>}
     {this.state.order_type!=3 &&
     <View>
     {item1.trach_status==0 && 
     <View>
     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:20}}>Tracking Number</Text>   
     <View style={{flexDirection:'row',width:'100%'}}>
     <View style={styles.inputcontainer}>
   
             <TextInput
                    placeholder='Enter Tracking Number'
                    placeholderTextColor='#c4c2c2'
                    keyboardType='default'
                    ref={(input) => { this.tracking_number = input; }}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({tracking_number:txt})}}
                    returnKeyType='done'
                    returnKeyLabel='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    maxLength={20}
                    style={styles.textfiledinput}
                    
                   />
          </View>
          {this.state.tracking_number.length>0 &&  <TouchableOpacity style={{width:'15%',alignItems:'center',justifyContent:'center'}} onPress={()=>{this.trackbtn()}}>
            <View style={{width:'100%',backgroundColor:Colors.buttoncolor,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('../icons/send.png')} style={{alignSelf:'center',width:50,height:50}}/>
               </View>
               </TouchableOpacity>  }
          </View>
     </View>}
     </View>}
    
    
     {this.state.order_type==0 &&  <View style={{flexDirection:'row',paddingBottom:7,paddingTop:5}}>
                    <Image source={require('../icons/delivery.png')} style={{width:25,height:25,alignSelf:'center'}}/>  
                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:20}}>Delivery</Text>   
                </View>}
            {this.state.order_type==0 &&    <Text style={{color:'gray',fontFamily:'Ubuntu-Light',fontSize:14,}}>{this.state.address}</Text> }  
            {this.state.order_type==1 &&  <View style={{flexDirection:'row',paddingBottom:15,}}>
                    <Image source={require('../icons/delivery.png')} style={{width:25,height:25,alignSelf:'center'}}/>  
                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:20}}>Pickup Address</Text>   
                </View>}
              
                {item1.payment_mode==2 &&
     <View>
       {item1.meeting_location!='NA' &&
       <View style={{marginTop:12}}>
         <View style={{flexDirection:'row',paddingBottom:6,}}>
            <Image source={require('../icons/address2.png')} style={{width:21,height:21,alignSelf:'center'}}/>  
          <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:14,paddingLeft:20}}>Meeting address</Text>   
     </View>
     <TouchableOpacity onPress={()=>{Linking.openURL('http://www.google.com/maps/place/'+item1.meeting_latitude,item1.meeting_longitude)}}>
     <Text style={{color:'black',fontFamily:'Ubuntu-Light',paddingBottom:13,paddingTop:6,fontSize:14,}}>{item1.meeting_location}</Text>
        </TouchableOpacity>
    </View>
    }
    </View>
     }
            {this.state.order_type==1 &&    <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:14,}}>{this.state.location}</Text> }  
                <View style={{flexDirection:'row',paddingBottom:5,paddingTop:10}}>
                    <Image source={require('../icons/bg-payment.png')} style={{width:25,height:25,alignSelf:'center'}}/>  
                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:20}}>Payment</Text>   
                </View>
               {item1.payment_mode==0 &&  <TouchableOpacity style={{marginBottom:20}}>
            <View style={{flexDirection:'row',marginTop:10,paddingVertical:14,borderRadius:6,backgroundColor:'#f5f5f5'}}>
                
                  <View style={{width:'75%',alignSelf:'center',paddingLeft:10}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>PayPal</Text>
                 
                  </View>
                  <View style={{width:'25%',alignSelf:'center'}}>
                  <Image source={require('../icons/paypal.png')} style={{width:27,height:27,alignSelf:'center',resizeMode:'contain'}}/>
                  </View>
                 
                    </View>
          </TouchableOpacity>}
          {item1.payment_mode==1 &&  <TouchableOpacity style={{marginBottom:20}}>
            <View style={{flexDirection:'row',marginTop:10,paddingVertical:14,borderRadius:6,backgroundColor:'#f5f5f5'}}>
                
                  <View style={{width:'75%',alignSelf:'center',paddingLeft:10}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Wallet</Text>
                   </View>
                  <View style={{width:'25%',alignSelf:'center'}}>
                  <Image source={require('../icons/cash.png')} style={{width:27,height:27,alignSelf:'center',resizeMode:'contain'}}/>
                  </View>
                 
                    </View>
          </TouchableOpacity>}

        {item1.payment_mode==2 && <TouchableOpacity style={{marginBottom:20}} onPress={()=>{this.setState({paypal:false,creditcard:false,cash:true})}}>
            <View style={{flexDirection:'row',marginTop:10,paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:'#e3e3e3'}}>
            <View style={{width:'75%',alignSelf:'center',paddingLeft:10}}>
               <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Cash on Delivery</Text>
                      <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>Pay when you received the product</Text>
                </View>
                   <View style={{width:'25%',alignSelf:'center'}}>
                      <Image source={require('../icons/cash.png')} style={{width:27,height:27,alignSelf:'center',resizeMode:'contain'}}/>
                  </View>
           </View>
        </TouchableOpacity>}
        {item1.track_number!='NA' &&
         <View style={{flexDirection:'row',paddingBottom:12,justifyContent:'space-between',}}>
         <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Tracking Number</Text>   
         <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>{item1.track_number}</Text>   
       </View>
        }
                <View style={{flexDirection:'row',paddingBottom:12,justifyContent:'space-between',}}>
                    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Original Product Price</Text>   
               <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>${item1.sub_total}</Text>   
                </View>
              {this.state.order_type==0 &&  <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Shipping</Text>   
               <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:14,}}>{item1.delivery_charge==0?'Free':'$'+item1.delivery_charge}</Text>   
                </View>}
                  <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
               <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Tax({parseInt(item1.tax_value)}%)</Text>   
               <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:14,}}>{item1.tax_value==null?'0.00':'$'+(item1.sub_total*item1.tax_value/100).toFixed(2)}</Text>   
                </View>
                <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Sub total</Text>   
                      <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:15,}}>${this.state.totalprice}</Text>   
                 </View>
            {item1.wallet_amount!=0 && <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Used wallet amount</Text>   
                      <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:15,}}>${item1.wallet_amount}</Text>   
                 </View>}
                <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
                <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Bold',fontSize:14,}}>TOTAL PRICE</Text>   
                     <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Bold',fontSize:15,}}>${this.state.totalprice}</Text>   
                </View>
          </View>


          {item1.cancel_order_description!=null &&  <View style={{width:'90%',backgroundColor:'#f5f5f5',borderRadius:5,marginVertical:14,paddingVertical:14,alignSelf:'center'}}>
               <Text style={{color:'black',paddingLeft:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>Rejection Reason</Text>
      </View> }
      {item1.cancel_order_description!=null &&     <View style={{paddingBottom:20,width:'90%',alignSelf:'center'}}>
      <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:14,}}>{item1.cancel_order_description}</Text>   
      {item1.cancel_status==0 && <Text style={{color:'#FFFFFF',paddingVertical:2,width:'40%',textAlign:'center',marginTop:10,borderRadius:10,fontFamily:'Ubuntu-Bold',fontSize:15,backgroundColor:Colors.buttoncolor,alignSelf:'flex-end',justifyContent:'flex-end'}}>PENDING</Text>}   
      {item1.cancel_status==1 && <Text style={{color:'#FFFFFF',paddingVertical:2,width:'40%',textAlign:'center',marginTop:10,borderRadius:10,fontFamily:'Ubuntu-Bold',fontSize:15,backgroundColor:Colors.buttoncolor,alignSelf:'flex-end',justifyContent:'flex-end'}}>{item1.order_status==5?'CANCEL':'PROCESS'}</Text>}   
      {item1.cancel_status==2 && <Text style={{color:'#FFFFFF',paddingVertical:2,width:'40%',textAlign:'center',marginTop:10,borderRadius:10,fontFamily:'Ubuntu-Bold',fontSize:15,backgroundColor:Colors.buttoncolor,alignSelf:'flex-end',justifyContent:'flex-end'}}>ACCEPT</Text>}   
      {item1.cancel_status==3 && <Text style={{color:'#FFFFFF',paddingVertical:2,width:'40%',textAlign:'center',marginTop:10,borderRadius:10,fontFamily:'Ubuntu-Bold',fontSize:15,backgroundColor:Colors.buttoncolor,alignSelf:'flex-end',justifyContent:'flex-end'}}>REJECT</Text>}   
                 </View>}
          {/* <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Cancel</Text>
               </View>
            </TouchableOpacity> */}
            {this.state.order_type==0  &&
            <View>
                {item1.order_status==0 &&
              
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{item1.track_number!='NA'?this.markasorderbtn(2):msgProvider.alert(msgTitle.information[config.language],"Please enter and submit tracking number", false);}} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                     <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Mark as Shipping</Text>
              </View>
            </TouchableOpacity>}
            {item1.order_status==3 &&
            <TouchableOpacity   activeOpacity={0.8} onPress={()=>{item1.track_number!='NA'?this.markasorderbtn(4): msgProvider.alert(msgTitle.information[config.language],"Please enter tracking number", false);}} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                     <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Mark as sold</Text>
              </View>
            </TouchableOpacity>
             }
              {/* {item1.order_status==4 &&
            <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Reviewseller',{'ratingdetaile':{'order_id':item1.order_id,'total_rate':item1.totalrate}})}} activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                     <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Rate Now</Text>
              </View>
            </TouchableOpacity>
             } */}
            </View>
             }
              { this.state.order_type==1  &&
              <View>
              {item1.order_status==1 &&
              
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.markasorderbtn(4)}} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
                 <View style={{alignSelf:'center',alignItems:'center',}}>
                       <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Mark As Sold</Text>
                </View>
              </TouchableOpacity>}
             
              {/* {item1.order_status==4 &&
            <TouchableOpacity   activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                     <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Delivered</Text>
              </View>
            </TouchableOpacity>
             } */}
                  </View>
           
             }

         {this.state.order_type==3 &&
         <View>
         { item1.order_status!=4 &&
            <TouchableOpacity   activeOpacity={0.8} onPress={()=>{this.markasorderbtn(4)}} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                     <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Mark as complete</Text>
              </View>
            </TouchableOpacity>}
            </View>
             }
           {item1.cancel_status==1 && 
           <View style={{flexDirection:'row',width:'100%',alignItems:'center',alignContent:'center',justifyContent:'center',alignSelf:'center'}}>
           <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.accept_reject_status(2)}} style={[styles.button1,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
                 <View style={{alignSelf:'center',alignItems:'center',}}>
                       <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Accept</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.accept_reject_status(3)}} style={[styles.button1,{backgroundColor:'#FFFFFF',marginLeft:5,alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
                 <View style={{alignSelf:'center',alignItems:'center',}}>
                       <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Reject</Text>
                </View>
              </TouchableOpacity>
              </View>
              }
              {/* {item1.order_status>3 &&
            <TouchableOpacity  onPress={()=>{this.markasorderbtn(4)}} activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                     <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Delivered</Text>
              </View>
            </TouchableOpacity>
             } */}
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Messagedetaile',{'data':{'item_id':item1.item_details_info[0].item_id,'other_user_id':item1.user_details.user_id,'name':item1.user_details.name},'directionpage':'seller',})}} activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center'}]}>
               <View style={{alignSelf:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Message Customer</Text>
               </View>
            </TouchableOpacity>
         </View>
         </ScrollView>
       {/* ........................................Container finish............................... */}
     
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
      },
      button1:
      {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:14,
        width:'46%',
      },
    buttonlayoutheader:{
      width:'90%',
      alignSelf:'center',
      borderRadius:12,paddingVertical:15
    },
    textfiledinput:{
      paddingVertical:5,
      color:'black',
      fontFamily:'Ubuntu-Medium',
      fontSize:14,
      paddingLeft:12,
    width:'100%'
    },
    errortextstyle:{
      color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',
      fontSize:13,paddingTop:4
    },
    inputcontainer:{
 
        backgroundColor:'#FFFFFF',
        // elevation:2,
        marginVertical:10,
        // shadowOffset:{width:2,height:2},
        borderRadius:5,
        borderColor:Colors.inputborder,
      borderWidth:1.5,
        alignSelf:'center',
        paddingHorizontal:15,width:'85%'
    },
   
})