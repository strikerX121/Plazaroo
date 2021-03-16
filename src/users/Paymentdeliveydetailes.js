import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Icon from 'react-native-vector-icons/AntDesign'

import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import {notification} from '../providers/NotificationProvider';
import OneSignal from 'react-native-onesignal';
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
    {
       'name':'Nokia 2.2 For Sale',
       'username':'Oc',
       'quantity':1,
       'size':'M',
       'price':'125.95'
     },
     
    
]

 
export default class Paymentdeliverydetailes extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
            address_type:0,
            errorno:0,
            address_arr:[],
            walletcheck:false,
            user_wallet:this.props.navigation.getParam('user_wallet'),
            cash:false,
            creditcard:false,
            distance:0,
            paypal:false,
            isConnected:true,
            checkaddress:0,
            offer_price:0,
            paid_amount:0,
            distancekm:false,
            wallet_pad:0,
            address_id:'',
            offertax:0,
             orderdata:orderdata,
             productdetaile:this.props.navigation.getParam('productdetaile')
            }
            OneSignal.init(config.onesignalappid, {
              kOSSettingsKeyAutoPrompt: true,
            });
        
            OneSignal.setLogLevel(6, 0);
    }
     componentDidMount(){
      this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
          if (payload.lastState.routeName == "Offersubmitted" && payload.action.type=='Navigation/BACK') {
             this.props.navigation.navigate('Userhome')
               }
          });
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state => {
         this.setState({isConnected:state.isConnected})
          });
          const { navigation } = this.props;
          this.focusListener = navigation.addListener('didFocus', () => {
            this.getalladdress1()
           });
           this.getalladdress()
         }
     getalladdress1 = async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
     let user_id=userdata.user_id
     let item=this.state.productdetaile
     let price=0
      let  offer_price=0
      let offertax=0
     if(item.accept_offer_details!='NA')
     {
     
    let price2=parseFloat(item.accept_offer_details.price).toFixed(2)
     let tax=parseFloat(price2*item.tax/100).toFixed(2)
     console.log('txa',tax)
     offertax=tax
      price=(parseFloat(tax)+parseFloat(price2)).toFixed(2)
      console.log('price',price)
 
      }
     if(this.state.isConnected===true)
          {
            this.setState({offer_price:price,offertax:offertax});
      var url = config.baseURL+'getUserAddress.php?user_id='+user_id+'&user_type=1'
       console.log("url:"+url);
        const {navigate} = this.props.navigation;
     fetch(url,{
           method: 'GET',
           headers: new Headers(config.headersapi), 
         }).then( (obj)=> {
        this.setState({refresh:false,});
          return obj.json();  
       }).then( (obj)=> { 
           console.log('obj',obj);
        //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
           if(obj.success == 'true'){
            let data=obj.address_arr
            for(let i=0; i<data.length; i++)
              {
                  data[i].status=false
              }
            this.setState({address_arr:data})
           
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
           this.setState({ refresh:false});
       });
     }
       else{
        msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
          }   
         }
     getalladdress = async() => {
      
          let userdata=await localStorage.getItemObject('user_arr')
            //-------------------- input validations -----------------
         let user_id=userdata.user_id
         console.log('userwallet ',this.state.user_wallet)
        
           let item=this.state.productdetaile
           let price=0
         let  offer_price=0
         let offertax=0
           if(item.accept_offer_details!='NA')
           {
          let price2=parseFloat(item.accept_offer_details.price).toFixed(2)
           let tax=parseFloat(price2*item.tax/100).toFixed(2)
           console.log('txa',tax)
           offertax=tax
            price=(parseFloat(tax)+parseFloat(price2)).toFixed(2)
            console.log('price',price)
       
            }
         if(this.state.isConnected===true)
              {
          this.setState({loading: true,offertax:offertax,user_id:user_id,offer_price:price});
       var url = config.baseURL+'getUserAddress.php?user_id='+user_id+'&user_type=1'
           console.log("url:"+url);
            const {navigate} = this.props.navigation;
         fetch(url,{
               method: 'GET',
               headers: new Headers(config.headersapi), 
             }).then( (obj)=> {
            this.setState({loading:false});
              return obj.json();  
           }).then( (obj)=> { 
               console.log('obj',obj);
            //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
               if(obj.success == 'true'){
                 let data=obj.address_arr
                for(let i=0; i<data.length; i++)
                  {
                      data[i].status=false
                  }
                this.setState({address_arr:data})
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
     chooseaddress=(index,item)=>{
                let data=this.state.address_arr
                console.log('data',data)
                for(let i=0; i<data.length; i++)
                {
                   if(i==index)
                   {
                      data[index].status=true
                   }
                 else{
                       data[i].status=false
                   }
                }
                this.getdistance(item)
                this.setState({address_arr:data,address_id:data[index].address_id})
          }
     paymentpropcessbtn = async() => {
              let userdata=await localStorage.getItemObject('user_arr')
                //-------------------- input validations -----------------
            if(this.state.productdetaile.order_type==0)
            {   
            if(this.state.address_arr=='NA')
             {
              msgProvider.alert(msgTitle.information[config.language],"Please add new address", false);
              return true
             }
                if(this.state.address_id.length<=0)
              {
                msgProvider.alert(msgTitle.information[config.language],"Please select address", false);
               return true
              }
            }
            if(this.state.walletcheck==true)
            {
            if(this.state.paid_amount!=0)
            {
              if(this.state.cash==false && this.state.paypal==false)
              {
                msgProvider.alert(msgTitle.information[config.language],"Please choose payment type", false);
                return true
              }
            }
          }
          else{
            if(this.state.cash==false && this.state.paypal==false)
              {
                msgProvider.alert(msgTitle.information[config.language],"Please choose payment type", false);
                return true
              }
          }
                let user_id=userdata.user_id
             if(this.state.isConnected===true)
                  {
//                     =user_id,other_user_id,address_id,add_to_cart[0][item_id],add_to_cart[0][item_price],add_t
// o_cart[0][item_qty],payment_mode_status(cash_on_delivery,payment), user_type
              this.setState({ loading: true,user_id:user_id});
           var url = config.baseURL+'userOrderBooking.php'
          
           let delivery_charge=(this.state.distance*this.state.productdetaile.delivery_charge).toFixed(2)
           let data=new FormData();
           data.append('user_id',user_id)
           data.append('other_user_id',this.state.productdetaile.user_id)
           
           if(this.state.productdetaile.order_type==0 )
            {   
           data.append('delivery_charge',delivery_charge)
            }
            else{
                data.append('delivery_charge',0)
              }
             if(this.state.walletcheck==true)
             {
              if(this.state.paid_amount!=0 )
              {
           if(this.state.cash==true)
           {
            data.append('payment_mode_status','cash_on_delivery') 
           }
           else{
            data.append('payment_mode_status','payment') 
           }
          }
          else{
               data.append('payment_mode_status','wallet') 
             }
             }
             else{
              if(this.state.cash==true)
                 {
                   data.append('payment_mode_status','cash_on_delivery') 
                  }
                else{
                   data.append('payment_mode_status','payment') 
                 }
         
             }
           if(this.state.productdetaile.order_type==0 )
           {

           data.append('address_id',this.state.address_id) 
           }
           else{
            data.append('address_id',0) 
           }
           data.append('item_id[]',this.state.productdetaile.item_id) 
           if(this.state.offer_price==0)
           {
            let tax=parseFloat(this.state.productdetaile.item_price*this.state.productdetaile.tax/100).toFixed()
            data.append('tax',tax) 
            data.append('item_price[]',this.state.productdetaile.item_price)
           }
           else{

                data.append('item_price[]',this.state.productdetaile.accept_offer_details.price)
              data.append('tax',this.state.offertax) 
              }

            
        
           data.append('item_qty[]',1)
           data.append('wallet_amount',this.state.wallet_pad)
           data.append('user_type',1)
               console.log("url:"+url);
               console.log('data',data)
                const {navigate} = this.props.navigation;
               fetch(url,{
                     method: 'POST',
                     headers: new Headers(config.headersapi), 
                     body:data
                  }).then( (obj)=> {
                  this.setState({loading:false});
                  return obj.json();  
               }).then( (obj)=> { 
                   console.log('obj',obj);
                //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                   if(obj.success == 'true'){
                     if(this.state.walletcheck==true)
                     {
                     if(this.state.paid_amount!=0)
                       {
                      if(this.state.cash==true)
                        {
                      if(obj.notification_arr!='NA')
                        {
                        //   for(let i=0; i<obj.notification_arr[0].length; i++)
                        //   {
                        //     notification.notificationfunction(obj.notification_arr[0][i].message,obj.notification_arr[0][i].action_json,obj.notification_arr[0][i].player_id,obj.notification_arr[0][i].title)
                        //  console.log('obj.notification_arr[i].player_id',obj.notification_arr[0][i].player_id)
                        //   }
                          notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                       
                        }
                        if(obj.notification_arr1!='NA')
                      {
                        notification.notificationfunction(obj.notification_arr1[0].message,obj.notification_arr1[0].action_json,obj.notification_arr1[0].player_id,obj.notification_arr1[0].title)
                     
                      }
                      this.props.navigation.navigate('Offersubmitted')
                     
                    }
                    else{
                         this.Paypalmethodbtn(obj.order_arr)
                        }
                      }
                    
                      else{
                        if(obj.notification_arr!='NA')
                        {
                          notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                       
                        }
                        if(obj.notification_arr1!='NA')
                      {
                        notification.notificationfunction(obj.notification_arr1[0].message,obj.notification_arr1[0].action_json,obj.notification_arr1[0].player_id,obj.notification_arr1[0].title)
                     
                      }
                      this.props.navigation.navigate('Offersubmitted')
                      }
                    }
                    else{
                      if(this.state.cash==true)
                      {
                    if(obj.notification_arr!='NA')
                      {
                        notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                     
                      }
                      if(obj.notification_arr1!='NA')
                      {
                        notification.notificationfunction(obj.notification_arr1[0].message,obj.notification_arr1[0].action_json,obj.notification_arr1[0].player_id,obj.notification_arr1[0].title)
                     
                      }
                    this.props.navigation.navigate('Offersubmitted')
                   
                  }
                  else{
                       this.Paypalmethodbtn(obj.order_arr)
                      }
                    }
                    
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
     getdistance = async(item) => {
                let userdata=await localStorage.getItemObject('user_arr')
                  //-------------------- input validations -----------------
               let user_id=userdata.user_id
               let item_lat=item.latitude
               let item_long=item.longitude
               let address_lat=this.state.productdetaile.latitude
               let address_long=this.state.productdetaile.longitude
               if(this.state.isConnected===true)
                    {
                this.setState({ loading: true,user_id:user_id});
                   var url = config.baseURL+'get_distance_lat_log.php?user_id='+user_id+'&user_type=1&'+'&item_lat='+item_lat+'&item_long='+item_long+'&address_lat='+address_lat+'&address_long='+address_long
                 console.log("url:"+url);
                  const {navigate} = this.props.navigation;
               fetch(url,{
                     method: 'GET',
                     headers: new Headers(config.headersapi), 
                   }).then( (obj)=> {
                  this.setState({loading:false});
                    return obj.json();  
                 }).then( (obj)=> { 
                     console.log('obj',obj);
                  //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                     if(obj.success == 'true'){
                    this.setState({distance:obj.distance,distancekm:true})  
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
     Paypalmethodbtn=async(order_arr)=>{
    
  let userdata=await localStorage.getItemObject('user_arr')
   let user_id=userdata.user_id
  let event_id=order_arr.order_id
  let amount=order_arr.order_total_amount
  var url = config.baseURL+'paypal/paypal_payment_url.php?user_id='+user_id+'&amount='+amount+'&event_id='+event_id+'&currency=USD'+'&type=order'
  console.log("url:"+url);
  this.setState({loading:true})
   fetch(url,{
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
            Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
     },
   
    }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false});    return  obj.json();}).then((obj)=>{
   console.log('obj',obj)
       if(obj.success == 'true'){
           console.log('og',obj)
           this.props.navigation.navigate('Paypalpayment',{'url_paypal':obj.data.links[1].href,'order_id':order_arr.order_id})
        } 
        else{
          
              msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
          return false;
     }
   }).catch((error)=> {
     console.log("-------- error ------- "+error);
     msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
       this.setState({loading: false});
 });

}         
walletpaymentfunction=()=>{
 if(this.state.user_wallet!=0)
 {
  if(this.state.productdetaile.order_type==0 && this.state.productdetaile.delivery_charge!=0 && this.state.distance==0 && this.state.distancekm==false)
  {
       msgProvider.alert(msgTitle.information[config.language],"Before use wallet please choose address", false);
       return false
  }
   else{
        this.setState({walletcheck:true})
       if(this.state.productdetaile.accept_offer_details=='NA')
       {
      
         let amount=parseFloat(parseFloat(this.state.productdetaile.item_price)+parseFloat(this.state.distance*this.state.productdetaile.delivery_charge)+parseFloat(this.state.productdetaile.item_price*this.state.productdetaile.tax/100)).toFixed(2)
         console.log('amoun1645',amount)
          if(amount>this.state.user_wallet)
            {
             let remamount=(parseFloat(amount)-parseFloat(this.state.user_wallet)).toFixed(2)
              console.log('pad_amount',remamount)
              this.setState({paid_amount:remamount,wallet_pad:this.state.user_wallet})
            }
           else if(amount<=this.state.user_wallet)
           {
            console.log('pad_amount2more',amount)
            let remamount=(parseFloat(this.state.user_wallet)-parseFloat(amount)).toFixed(2)
             console.log('pad_amount2more',amount)
             this.setState({paid_amount:0,wallet_pad:amount})
           }
         console.log('amount',amount)
        }
       else{
         let amount=((parseFloat(this.state.distance*this.state.productdetaile.delivery_charge)+parseFloat(this.state.offer_price)).toFixed(2))
         if(amount>this.state.user_wallet)
         {
           let remamount=(parseFloat(amount)-parseFloat(this.state.user_wallet)).toFixed(2)
            console.log('offerpad_amount',remamount)
            this.setState({paid_amount:remamount,wallet_pad:this.state.user_wallet})
         }
         else if(amount<=this.state.user_wallet)
         {
            let remamount=(parseFloat(this.state.user_wallet)-parseFloat(amount)).toFixed(2)
            console.log('offerpad_amount2more',amount)
            this.setState({paid_amount:0,wallet_pad:amount})
         }
         console.log('ooferamount12',amount)
        }
      }
  
 }
 else{
     msgProvider.alert(msgTitle.information[config.language],"You have not sufficient amount in your wallet", false);
    }
 
  
}  
  render(){
    console.log('prksdjg',this.state.productdetaile.item_price)
    console.log('charge',(this.state.distance*this.state.productdetaile.delivery_charge)+parseFloat(this.state.productdetaile.item_price))
    
    console.log('cikasd',parseFloat(parseFloat(this.state.productdetaile.item_price)+parseFloat(this.state.distance*this.state.productdetaile.delivery_charge)+parseFloat(this.state.productdetaile.item_price*this.state.productdetaile.tax/100)).toFixed(2))
return(
    <View style={styles.container}>
      <Loader loading={this.state.loading}/>
         <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
 
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Payment & Delivery Details</Text>
          </View>
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }>
         <View style={{width:'95%',paddingTop:20,paddingBottom:80,alignSelf:'center'}}>
             
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   {this.state.productdetaile.order_type==0 && 
   <View style={{marginTop:10}}>
   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingBottom:12,fontSize:13,}}>Delivery Address</Text>
     <FlatList
      data={this.state.address_arr}
  showsVerticalScrollIndicator={false}
  initialNumToRender={1}
      renderItem={({item,index})=>{
        if(this.state.address_arr!='NA')
        {
          if(index<=this.state.checkaddress)
          {
         return(
         
            <View style={{borderRadius:6,borderWidth:1,marginBottom:10,borderColor:'#f2f2f2',paddingVertical:13}}>
             <TouchableOpacity onPress={()=>{this.chooseaddress(index,item)}}>
             <View style={{flexDirection:'row',}}>
             {item.address_type==0 &&   <View style={{width:'15%',alignSelf:'center'}}>
                    <Image source={require('../icons/f1.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                </View>}
                {item.address_type==1 &&   <View style={{width:'15%',alignSelf:'center'}}>
                <Image source={require('../icons/office-address.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                </View>}
                {item.address_type==2 &&   <View style={{width:'15%',alignSelf:'center'}}>
                    <Image source={require('../icons/address1.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                </View>}
                <View style={{width:'70%',alignSelf:'center'}}>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>{item.type} Address</Text>
                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.place_name} </Text>  
                     <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>{item.address}</Text>
                </View>
              
                {item.status==false && 
                            <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                            <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                                <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                           </View> 
                       </View> }
                            
                      {item.status==true && 
                       <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                         <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                              <Text style={{width:10,height:10,backgroundColor:Colors.buttoncolor,borderRadius:50,textAlign:'center',}}></Text>
                                </View>
                         </View>
                    }
                {/* <TouchableOpacity style={{width:'15%',}} onPress={()=>{this.props.navigation.navigate('EditAddress',{'addressdata':item})}}>
                <View style={{width:'100%',}} >
                <Image source={require('../icons/edit.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                </View>
                  </TouchableOpacity> */}
                    
                
          </View>
          </TouchableOpacity>
                  {/* <TouchableOpacity style={{width:50,width:'10%',alignItems:'flex-end',alignSelf:'flex-end',paddingRight:10}} onPress={()=>{this.removeaddress(item.address_id,'single')}}>
                             <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text>
                    </TouchableOpacity> */}
            </View>
     
         )
                  }
        }
        else{
          if(item=='N')
          {
            return(
              <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>You have not yet added an address please add an address!</Text>
            )
          }
        }
      }}
      keyExtractor={(item, index) => index.toString()}
     />
     {this.state.address_arr!='NA' && this.state.address_arr.length>1 &&
     <View>
     {this.state.checkaddress==0  && <TouchableOpacity onPress={()=>{this.setState({checkaddress:this.state.address_arr.length})}}>
        <View style={{alignSelf:'flex-end',justifyContent:'flex-end',paddingVertical:10}}>
            <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,}}>Show more address</Text>
        </View>
        </TouchableOpacity>
      }
      </View>}
       <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addadress')}}>
        <View style={{alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',paddingTop:20}}>
            <Icon name='plus' size={13} color={Colors.buttoncolor} style={{alignSelf:'center',paddingRight:5}}/>
        <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,}}>Add new</Text>
        </View>
        </TouchableOpacity>
    {this.state.productdetaile.delivery_charge!=0 &&    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12,paddingVertical:5}}>Distance {this.state.distance} km</Text> }
     {this.state.productdetaile.delivery_charge!=0 && <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}>
    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipping Charge(${this.state.productdetaile.delivery_charge}/km) </Text> 
          <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>${(this.state.distance*this.state.productdetaile.delivery_charge).toFixed(2)}</Text>         
       </View>}
     </View>}

       
       
       
        {/* <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingBottom:12,fontSize:13,}}>Delivery Address</Text>
        <TouchableOpacity>
            <View style={{flexDirection:'row',paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:Colors.buttoncolor}}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/f1-a.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Home Address</Text>
                  <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12.5,}}>Rosecrams Ave,Suite 200 EI Segundo, USA</Text>
                  </View>
                  <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                  <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                           <Text style={{width:10,height:10,backgroundColor:Colors.buttoncolor,borderRadius:50,textAlign:'center',}}></Text>
                             </View>
                      </View>
                  {item.status==true && 
                            <View style={{width:20,height:20,borderColor:'#1085e6',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                           <Text style={{width:10,height:10,backgroundColor:'#1085e6',borderRadius:50,textAlign:'center',}}></Text>
                             </View> }
                             {item.status==false && <View style={{width:20,height:20,borderColor:'black',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                               </View> } 
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:15,paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:'#e3e3e3'}}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/office-address.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Office Address</Text>
                  <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>Johar Town, Street 12, NY, USA</Text>
                  </View>
                  <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                           <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                          </View> 
                      </View>
                    </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addadress')}}>
        <View style={{alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',paddingTop:10}}>
            <Icon name='plus' size={13} color={Colors.buttoncolor} style={{alignSelf:'center',paddingRight:5}}/>
        <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,}}>Add new</Text>
        </View>
        </TouchableOpacity> */}
       
       
        <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingBottom:12,fontSize:13,}}>Payment Method</Text>
        {/* <TouchableOpacity onPress={()=>{this.setState({paypal:false,creditcard:true,cash:false})}}>
            <View style={[{flexDirection:'row',paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:Colors.buttoncolor},this.state.creditcard==true?{borderColor:Colors.buttoncolor}:{borderColor:'#e3e3e3'}]}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/visa.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={[{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26},this.state.creditcard==true?{color:Colors.buttoncolor}:{color:'black'}]}>Credit Card</Text>
                  <Text style={[{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12.5,},this.state.creditcard==true?{color:Colors.buttoncolor}:{color:'black'}]}>xxx-xxxx-xxxx-1560</Text>
                  </View>
                {this.state.creditcard==true &&  <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                  <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                           <Text style={{width:10,height:10,backgroundColor:Colors.buttoncolor,borderRadius:50,textAlign:'center',}}></Text>
                             </View>
                      </View>}
                      {this.state.creditcard==false &&
                         <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                           <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                          </View> 
                      </View>
                      }
                
            </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>{this.setState({paypal:true,creditcard:false,cash:false})}}> 
            <View style={[{flexDirection:'row',marginTop:15,paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:'#e3e3e3'},this.state.paypal==true?{borderColor:Colors.buttoncolor}:{borderColor:'#e3e3e3'}]}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/paypal.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={[{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26},this.state.paypal==true?{color:Colors.buttoncolor}:{color:'black'}]}>PayPal</Text>
    
                  </View>
                  {this.state.paypal==true &&  <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                  <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                           <Text style={{width:10,height:10,backgroundColor:Colors.buttoncolor,borderRadius:50,textAlign:'center',}}></Text>
                             </View>
                      </View>}
                      {this.state.paypal==false &&     <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                           <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                          </View> 
                      </View>}
                    </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.setState({paypal:false,creditcard:false,cash:true})}}>
            <View style={[{flexDirection:'row',marginTop:15,paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:'#e3e3e3'},this.state.cash==true?{borderColor:Colors.buttoncolor}:{borderColor:'#e3e3e3'}]}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/cash.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={[{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26},this.state.cash==true?{color:Colors.buttoncolor}:{color:'black'}]}>Cash on Delivery</Text>
                  <Text style={[{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,},this.state.cash==true?{color:Colors.buttoncolor}:{color:'gray'}]}>Pay when you received the product</Text>
                  </View>
                  {this.state.cash==true &&  <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                  <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                           <Text style={{width:10,height:10,backgroundColor:Colors.buttoncolor,borderRadius:50,textAlign:'center',}}></Text>
                             </View>
                      </View>}
                      {this.state.cash==false && 
                  <View style={{width:'15%',alignSelf:'center',marginTop:10}}>
                           <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                          </View> 
                      </View>}
                    </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addcreditcard')}}>
        <View style={{alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',paddingTop:20}}>
            <Icon name='plus' size={13} color={Colors.buttoncolor} style={{alignSelf:'center',paddingRight:5}}/>
        <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,}}>Add new</Text>
        </View>
        </TouchableOpacity> */}
         <View style={{borderBottomWidth:1,borderBottomColor:Colors.inputborder,paddingTop:20,paddingBottom:10,width:'95%',alignSelf:'center'}}>
                 <TouchableOpacity onPress={()=>{this.state.walletcheck==false?this.walletpaymentfunction():this.setState({walletcheck:false,wallet_pad:0})}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    {this.state.walletcheck==true?<Icon name='checksquare' size={30} color={Colors.buttoncolor}/>:
                 < Icon3 name='checkbox-blank-outline' size={30} color={Colors.textlight}/>}
                  <Text style={{fontSize:15,fontWeight:'bold',color:'gray'}}>Use wallet amount{this.state.user_wallet!=0?'($'+this.state.user_wallet+')':'($0)'}</Text>
                 </View>
                 </TouchableOpacity>
              </View>
        
         </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
         <View style={{position:'absolute',bottom:5,left:0,right:0,}}>
          {this.state.walletcheck==false &&  <TouchableOpacity onPress={()=>{this.paymentpropcessbtn()}} activeOpacity={0.8} style={{width:'95%',marginTop:25,paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
          {this.state.productdetaile.accept_offer_details=='NA' && <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Pay now ${parseFloat(parseFloat(this.state.productdetaile.item_price)+parseFloat(this.state.distance*this.state.productdetaile.delivery_charge)+parseFloat(this.state.productdetaile.item_price*this.state.productdetaile.tax/100)).toFixed(2)}</Text> }
          {this.state.productdetaile.accept_offer_details!='NA' && <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Pay now ${((parseFloat(this.state.distance*this.state.productdetaile.delivery_charge)+parseFloat(this.state.offer_price)).toFixed(2))}</Text> }      
              </TouchableOpacity>}
          {this.state.walletcheck==true &&  <TouchableOpacity onPress={()=>{this.paymentpropcessbtn()}} activeOpacity={0.8} style={{width:'95%',marginTop:25,paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Pay now ${this.state.paid_amount}</Text> 
           
              </TouchableOpacity>}       
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
    },
    buttonlayoutheader:{
      width:'100%',
      borderRadius:12,paddingVertical:15
    }
   
})