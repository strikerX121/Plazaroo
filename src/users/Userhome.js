import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,PermissionsAndroid,Platform,SafeAreaView,TouchableOpacity,BackHandler,FlatList,StatusBar,Alert,Keyboard} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import UserFooter from './UserFooter'
import OneSignal from 'react-native-onesignal';
import firebase from './Config1';
import Icon from 'react-native-vector-icons/AntDesign'
import { firebaseprovider}  from '../providers/FirebaseProvider';
import Geolocation from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';
import MasonryList from "react-native-masonry-list";
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const productdata=[
  {
    'image':require('../icons/motors.png'),
    'name':'Motor'
  },
  {
    'image':require('../icons/electronics.png'),
    'name':'Electronics'
  },
  {
    'image':require('../icons/fashion.png'),
    'name':'Fashion'
  },
  {
    'image':require('../icons/furniture.png'),
    'name':'Furnitur'
  },
  {
    'image':require('../icons/motors.png'),
    'name':'Motor'
  },
  {
    'image':require('../icons/furniture.png'),
    'name':'Furnitur'
  },
]
const productitems=[
  {
    'image':require('../icons/home-image1.png'),
    'name':'Nokia 2.2 For Sale',
    'add':'Johar town',
    'price':125.00,
  },
  {
    'image':require('../icons/home-image2.png'),
    'name':'Atlas Honda',
    'add':'Wopda Town',
    'price':125.00,
  },
  {
    'image':require('../icons/home-image3.png'),
    'name':'Dawlance Fridge',
    'add':'Bahria Town',
    'price':188.00,
  },
  {
    'image':require('../icons/home-image4.png'),
    'name':'Apple Mac Book 2019',
    'add':'Oxford Street',
    'price':125.00,
  },
  {
    'image':require('../icons/home-image5.png'),
    'name':'Apple Mac Book 2019',
    'add':'Oxford Street',
    'price':125.00,
  },
  {
    'image':require('../icons/home-image6.png'),
    'name':'Apple Mac Book 2019',
    'add':'Oxford Street',
    'price':125.00,
  },
  {
    'image':require('../icons/home-image2.png'),
    'name':'Atlas Honda',
    'add':'Wopda Town',
    'price':125.00,
  },
  {
    'image':require('../icons/home-image3.png'),
    'name':'Dawlance Fridge',
    'add':'Bahria Town',
    'price':188.00,
  },
]

global.currentLatlong='NA'
global.selleraddress='NA';
global.category_arr_show='NA';
global.notification_count_value=0;
global.message_loation='NA'

export default class Userhome extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading:false,
          countinbox:0,
          isConnected:true,
           player_id:'' ,
           page:'home',
           refresh:false,
           category_arr:[],
           item_arr:[],
           notification_count:'',
           productdata:productdata,
           productitems:productitems
          }
          OneSignal.init(config.onesignalappid, {
            kOSSettingsKeyAutoPrompt: true,
          });
      
          OneSignal.setLogLevel(6, 0);
    }

    callLocation=async(that)=>{
      localStorage.getItemObject('position').then((position)=>{
        console.log('position',position)
       if(position!=null)
       {
        var pointcheck1=0
        this.getalldata(position)
          Geolocation.getCurrentPosition(
            //Will give you the current location
                (position) => {
              localStorage.setItemObject('position',position)
              pointcheck1=1
                },
              (error) => { let position={'coords':{'latitude':-6.802353,'longitude':39.279556}}
             
              this.getalldata(position)},
              { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
            );
            that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
               console.log('data',position);
               
               if(pointcheck1!=1)
               {
                localStorage.setItemObject('position',position)
                this.getalldata(position)
               }
               
             });
           
       }
       else{
        console.log('helo gkjodi')
        var pointcheck=0
          Geolocation.getCurrentPosition(
            //Will give you the current location
             (position) => {
             localStorage.setItemObject('position',position)
              this.getalldata(position)
              pointcheck=1
                },
              (error) => {let position={'coords':{'latitude':-6.802353,'longitude':39.279556}}
             
              this.getalldata(position)},
              { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
            );
            that.watchID = Geolocation.watchPosition((position) => {
               //Will give you the location on location change
               console.log('data',position);
              
               if(pointcheck!=1)
               {
                localStorage.setItemObject('position',position)
                this.getalldata(position)
               }
               
             }); 
       }
      })
      }
      callLocation1=async(that)=>{
        localStorage.getItemObject('position').then((position)=>{
          console.log('position',position)
         if(position!=null)
         {
          this.getalldata1(position)
            Geolocation.getCurrentPosition(
              //Will give you the current location
                  (position) => {
                localStorage.setItemObject('position',position)
                  },
                (error) => console.log(error.message),
                { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
              );
              that.watchID = Geolocation.watchPosition((position) => {
              //Will give you the location on location change
                 console.log('data',position);
                 localStorage.setItemObject('position',position)
                 
               });
             
         }
         else{
          console.log('helo gkjodi')
            Geolocation.getCurrentPosition(
              //Will give you the current location
               (position) => {
               localStorage.setItemObject('position',position)
                this.getalldata1(position)
                  },
                (error) => console.log(error.message),
                { enableHighAccuracy:true, timeout: 15000, maximumAge: 1000 }
              );
              that.watchID = Geolocation.watchPosition((position) => {
              //Will give you the location on location change
                 console.log('data',position);
                 localStorage.setItemObject('position',position)
                 this.getalldata1(position)
               }); 
         }
        })
        }
      getlatlong=async()=>{
        let permission= await localStorage.getItemString('permission')
        if(permission!='denied')
        {
        var that =this;
        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
          this.callLocation(that);
        }else{
          // this.callLocation(that);
          async function requestLocationPermission() {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                  'title': 'Location Access Required',
                  'message': 'This App needs to Access your location'
                }
              )
              console.log('granted',PermissionsAndroid.RESULTS.GRANTED)
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  that.callLocation(that);
              } else { 
                 let position={'coords':{'latitude':-6.802353,'longitude':39.279556}}
                 localStorage.setItemString('permission','denied')
                 that.getalldata(position)
            }} catch (err) { console.warn(err) }
              }
            requestLocationPermission();
          } 
        } else{
          let position={'coords':{'latitude':-6.802353,'longitude':39.279556}}
          this.getalldata(position)
        }
       }
      //  getlatlong1=async()=>{
      //    console.log('call chuke vala function')
      //   let permission= await localStorage.getItemString('permission')
      //   if(permission!='denied')
      //   {
      //   var that =this;
      //   //Checking for the permission just after component loaded
      //   if(Platform.OS === 'ios'){
      //     this.callLocation1(that);
      //   }else{
      //     // this.callLocation(that);
      //     async function requestLocationPermission() {
      //       try {
      //         const granted = await PermissionsAndroid.request(
      //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
      //             'title': 'Location Access Required',
      //             'message': 'This App needs to Access your location'
      //           }
      //         )
      //         console.log('granted',PermissionsAndroid.RESULTS.GRANTED)
      //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //             that.callLocation1(that);
      //         } else { 
      //            let position={'coords':{'latitude':-6.802353,'longitude':39.279556}}
      //            localStorage.setItemString('permission','denied')
      //            that.getalldata1(position)
      //       }} catch (err) { console.warn(err) }
      //         }
      //       requestLocationPermission();
      //     } 
      //   } else{
      //     let position={'coords':{'latitude':-6.802353,'longitude':39.279556}}
      //     this.getalldata1(position)
      //   }
      //  }
       getdatalocalfunction= async ()=>{
         console.log('call localfunction')
      
        let homearr_data=await localStorage.getItemObject('homedata_arr')
        if(homearr_data!=null)
           {
             let obj=homearr_data
            let data=obj.item_details_arr;
            let data2=[];
            if(obj.item_details_arr!="NA")
            {
            for(let i=0; i<data.length; i++)
            {
              if(data[i].item_images!='NA')
              {
               let path1={uri:config.img_url2+data[i].item_images[0].image,id:data[i].item_id}
                 data2.push(path1)
             }
              
            }
            this.setState({notification_count:obj.notification_count,category_arr:obj.category_arr,item_arr:data2,})
           }
           else{
             this.setState({item_arr:obj.item_details_arr,notification_count:obj.notification_count,category_arr:obj.category_arr})
           }
               
          //  this.getlatlong1()
           }
           else{
            this.getlatlong()
           }
          }
     componentDidMount(){
      OneSignal.setLocationShared(true);
      OneSignal.inFocusDisplaying(2);
      OneSignal.addEventListener('ids', this.onIds.bind(this));
      OneSignal.addEventListener('opened', this.onOpened);
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected})});
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        this.getMyInboxAllData1()
         firebaseprovider.firebaseUserGetInboxCount()
       
         this.getlatlong()
         this.props.navigation.addListener('willFocus', payload => {
          console.log('payload',payload)
           if (payload.lastState.routeName == "Offersubmitted" && payload.action.type=='Navigation/BACK') {
                  this.getalldata1(currentLatlong)
                }
            });
        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener('didFocus', () => {
        //   if(currentLatlong!='NA')
        //   {
        //        this.getalldata1(currentLatlong)
        //   }
        
        //  });
      }
      getMyInboxAllData1=async()=>{
          console.log('getMyInboxAllData');
          userdata= await localStorage.getItemObject('user_arr')
       //------------------------------ firbase code get user inbox ---------------
       if(userdata != null){
         // alert("himanshu");
         var id='u_'+userdata.user_id;
         if(inboxoffcheck>0)
         {
           console.log('getMyInboxAllDatainboxoffcheck');
            var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
            queryOffinbox.off('child_added');
            queryOffinbox.off('child_changed');
         }

          var queryUpdatemyinbox = firebase.database().ref('users/'+id+'/myInbox/');
           queryUpdatemyinbox.on('child_changed', (data)=>{
           console.log('inboxkachildchange',data.toJSON())
           
           firebaseprovider.firebaseUserGetInboxCount()
           setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);
          
         //  this.getalldata(currentLatlong)
      })
      var queryUpdatemyinboxadded = firebase.database().ref('users/'+id+'/myInbox/');
      queryUpdatemyinboxadded.on('child_added', (data)=>{
       console.log('inboxkaaddedchid_added',data.toJSON())
       firebaseprovider.firebaseUserGetInboxCount()
       setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);
      
       // firebaseprovider.firebaseUserGetInboxCount();
  })
    
       }
         }
     componentWillUnmount() {
      this._didFocusSubscription && this._didFocusSubscription.remove();
      this._willBlurSubscription && this._willBlurSubscription.remove();
      OneSignal.removeEventListener('ids', this.onIds.bind(this));
      OneSignal.removeEventListener('opened', this.onOpened.bind(this));
     }
     onOpened=async(openResult)=>{
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
      var datajson=openResult.notification.payload.additionalData.p2p_notification.action_json;
      var user_id = datajson.user_id;
      var other_user_id = datajson.other_user_id;
      var action_id = datajson.action_id;
      var action = datajson.action;
       var  userdata = await localStorage.getItemObject('user_arr')
       console.log('datajson_user_id', datajson.user_id)
      console.log('datajson_other_user_id', datajson.other_user_id)
      console.log('datajson_action_id', datajson.action_id)
      console.log('datajson_action', datajson.action)
   
        if(userdata.user_id==other_user_id)
        {
          other_user_id=datajson.user_id
        }
    
      this.setState({loading:false})
      if(userdata!=null)
      {
        if(userdata.user_id!=other_user_id)
          {
            console.log('navigation run')
          if(action=='offer_create')
          {
             this.props.navigation.navigate('Viewoffers',{'item_id':datajson.action_id,'item_name':datajson.item_name})
          }
          if(action=='offer_accept')
          {
            this.props.navigation.navigate('Homeproductdetaile',{'Product_id':datajson.item_id})
          }
         
          else if(action=="item_approve")
          {
           this.props.navigation.navigate('Homeproductdetaile',{'Product_id':datajson.action_id})
          }
          else if(action=="vendor_approve")
          {
            this.props.navigation.navigate('Userhome')
          }
          else if(action=="order_booking")
        { 
          this.props.navigation.navigate('Orderdetailuser',{'order_id':datajson.action_id})
        }
        else if(action=="item_unapprove")
        { 
          this.props.navigation.navigate('Mylisting')
        }
        else if(action=="new_booking")
        { 
          this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':datajson.action_id})
        }
        else if(action=="order_delivered")
        {
          this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':datajson.action_id})
          // this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':datajson.action_id})
        }
        else if(action=="order_sold")
        {
          this.props.navigation.navigate('Orderdetailuser',{'order_id':datajson.action_id})
        }
        else if(action=="order_Shipped")
        {
          this.props.navigation.navigate('Orderdetailuser',{'order_id':datajson.action_id})
        }
        else if(action=='chat_single')
        {
          this.props.navigation.navigate('Messagedetaile',{'data':{'other_user_id':other_user_id,'name':datajson.SenderName}})
        }
        else if(action=='wallet_accept')
        {
          this.props.navigation.navigate('UserWallet')
        }
        else if(action=='wallet_reject')
          {
            this.props.navigation.navigate('UserWallet')
          }
      }
    
      }
      else{
         this.setState({loading:false})
         this.props.navigation.navigate('Login')
      }
    
   
    

     }
     onIds(device) {
      console.log('Device info: ', device);
      this.setState({
        player_id:device.userId
      });
      player_id_me1=device.userId
     }

    getalldata=async(position)=>{
      let userdata=await localStorage.getItemObject('user_arr')
     
      let user_id=0
      if(userdata!=null)
      {
        user_id=userdata.user_id
      }
  
      currentLatlong=position
      if(this.state.isConnected===true)
      {
        let longitude=position.coords.longitude
        let latitude=position.coords.latitude  
       var url = config.baseURL+'get_all_item_home.php?user_id='+user_id+'&user_type=1&latitude='+latitude+'&longitude='+longitude;
       console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:user_id,loading:true,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
            category_arr_show=obj.category_arr
            // localStorage.setItemObject('homedata_arr',obj)
             let data=obj.item_details_arr;
             let data2=[];
             if(obj.item_details_arr!="NA")
             {
             for(let i=0; i<data.length; i++)
             {
               if(data[i].item_images!='NA')
               {
                let path1={uri:config.img_url2+data[i].item_images[0].image,id:data[i].item_id}
                  data2.push(path1)
                }
               }
               notification_count_value=obj.notification_count
             this.setState({item_arr:data2,notification_count:obj.notification_count,category_arr:obj.category_arr})
            }
            else{
              notification_count_value=obj.notification_count
              this.setState({item_arr:obj.item_details_arr,notification_count:obj.notification_count,category_arr:obj.category_arr})
            }
           
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
      getalldata1=async(position)=>{
        let userdata=await localStorage.getItemObject('user_arr')
       
        let user_id=0
        if(userdata!=null)
        {
          user_id=userdata.user_id
        }
    
        currentLatlong=position
        if(this.state.isConnected===true)
        {
          let longitude=position.coords.longitude
          let latitude=position.coords.latitude  
         var url = config.baseURL+'get_all_item_home.php?user_id='+user_id+'&user_type=1&latitude='+latitude+'&longitude='+longitude;
         console.log("url:"+url);
        if(this.state.refresh==false)
        {
          this.setState({user_id:user_id,})
        }
         fetch(url,{
            method: 'GET',
            headers: new Headers(config.headersapi), 
            }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
              category_arr_show=obj.category_arr
              // localStorage.setItemObject('homedata_arr',obj)
               let data=obj.item_details_arr;
               let data2=[];
               if(obj.item_details_arr!="NA")
               {
               for(let i=0; i<data.length; i++)
               {
                 if(data[i].item_images!='NA')
                 {
                  let path1={uri:config.img_url2+data[i].item_images[0].image,id:data[i].item_id}
                    data2.push(path1)
                  }
                 }
                 notification_count_value=obj.notification_count
               this.setState({item_arr:data2,notification_count:obj.notification_count,category_arr:obj.category_arr})
              }
              else{
                notification_count_value=obj.notification_count
                this.setState({item_arr:obj.item_details_arr,notification_count:obj.notification_count,category_arr:obj.category_arr})
              }
             
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
      // getalldata1=async(position)=>{
      //   let userdata=await localStorage.getItemObject('user_arr')
       
      //   let user_id=0
      //   if(userdata!=null)
      //   {
      //     user_id=userdata.user_id
      //   }
   
      //   currentLatlong=position
      //   if(this.state.isConnected===true)
      //   {
      //     let longitude=position.coords.longitude
      //     let latitude=position.coords.latitude  
      //    var url = config.baseURL+'get_all_item_home.php?user_id='+user_id+'&user_type=1&latitude='+latitude+'&longitude='+longitude;
      //    console.log("url:"+url);
       
      //    fetch(url,{
      //       method: 'GET',
      //       headers: new Headers(config.headersapi), 
      //       }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
      //    console.log('obj',obj)
      //        if(obj.success == 'true'){
      //         category_arr_show=obj.category_arr
      //         localStorage.setItemObject('homedata_arr',obj)
              
             
      //         } 
  
      //         else{
      //           if(obj.account_active_status=="deactivate")
      //           {
      //              this.props.navigation.navigate('Logout')
      //           }
      //             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
      //           return false;
      //      }
      //    }).catch((error)=> {
      //      console.log("-------- error ------- "+error);
      //      msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
      //        this.setState({loading: false,refresh:false});
      //  });
      // }
      // else{
      //    msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
      //  }  
      //   }
      _onRefresh = () => {
        this.setState({refresh:true})
        this.getlatlong()
      }
      onPressImage=(item)=>{
        console.log(item)
        this.props.navigation.navigate('Homeproductdetaile',{'Product_id':item.id})
       
      }
      usercheckbtn=async()=>{
    
        let userdata=await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
            if(userdata.profile_complete!=0)
            {
              this.props.navigation.navigate('Notification');
             }
             else{
                 this.props.navigation.navigate('Userlogin') 
                 }
            
    }else{
            this.Checkuser()
        } 
     }
     Checkuser = () => {
            
        Alert.alert(
                msgTitle.confirm[config.language],
                msgText.loginFirst[config.language],
                [
                    {
                        text: msgTitle.cancel[0], 
                    },
                    {
                        text: msgTitle.ok[0], 
                        // onPress: () =>  this.btnPageLoginCall(),
                        onPress: ()=>{this.props.navigation.navigate('Userlogin')}
                    },
                ],
                {cancelable: false},
            );
        }
     render(){
       let item_arr=[]
       item_arr=this.state.item_arr
       console.log(' countinboxgsdfgdfhdsfh', this.state.countinbox)
        console.log('cikasdfsdgagwetwewe',this.state.item_arr)
  return(
     <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
       <Loader loading={this.state.loading}/>
        <View style={styles.container}>
        <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
         <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
          
        }
        style={{marginBottom:65}} showsVerticalScrollIndicator={false}
          >
       <View style={{width:'95%',alignSelf:'center',paddingTop:10}}>
         {/* -------------------------------searchbar start------------------------------ */}
          <View style={{flexDirection:'row',justifyContent:'center',width:'100%'}}>
             <TouchableOpacity style={{width:'87%',}} onPress={()=>{this.props.navigation.navigate('Homesearchpage')}}>
              <View style={{flexDirection:'row',borderRadius:10,backgroundColor:'#ededed',width:'100%',paddingVertical:10}}>
                <TouchableOpacity style={{width:'15%',alignSelf:'center'}}>
                    <Image source={require('../icons/b-search.png')} style={{width:20,height:20,alignSelf:'center'}}/>
                </TouchableOpacity>
                <View style={{width:'70%'}}>
                  <Text style={{width:'100%',color:'black',fontFamily:'Ubuntu-Bold',}}>Search</Text>
                    {/* <TextInput
                     placeholder='Search'
                     returnKeyLabel='done'
                     returnKeyType='done'
                     onSubmitEditing={()=>{Keyboard.dismiss()}}
                   
                    /> */}
                </View>
                <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Filtersproduct')}}>
                    <Image source={require('../icons/filter.png')} style={{width:20,height:20,alignSelf:'center'}}/>
                </TouchableOpacity>
              </View>
              </TouchableOpacity>
              <TouchableOpacity style={{width:'13%',alignSelf:'center'}} onPress={()=>{this.usercheckbtn()}}>
                 <View>
                     <Image source={require('../icons/b-notification.png')} style={{width:20,height:25,alignSelf:'center'}}/>
                 </View>
            {this.state.notification_count!=0 && <View style={{position:'absolute',bottom:13,alignSelf:'flex-end',paddingRight:13,}}>
      <Text style={{textAlign:'center',backgroundColor:'red',borderRadius:4,alignSelf:'center',color:'#FFFFFF',paddingVertical:1.5,paddingHorizontal:4}}>{this.state.notification_count>9?'9+':this.state.notification_count}</Text>
                 </View>}
                </TouchableOpacity>
          </View>
         
       {/* -------------------------------searchbar finish------------------------------ */}
          {/* <View style={{flexDirection:'row',paddingTop:15,width:'97%',alignSelf:'center'}}>
            <Image source={require('../icons/location.png')} style={{width:15,height:15,alignSelf:'center'}}/>
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingLeft:15}}>9 west 46 street, New York City</Text>
          </View>
          <View style={{flexDirection:'row',width:'97%',paddingTop:20,alignSelf:'center'}}>
             <TouchableOpacity activeOpacity={0.8} style={{width:'20%'}} onPress={()=>{this.props.navigation.navigate('Hometoptabbuttonpage',{'productname':'All'})}}>
                <View style={{backgroundColor:'#FFFFFF',elevation:4,shadowOpacity:0.8,paddingVertical:8.2,borderRadius:5}}>
                    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center'}}>All</Text>
                </View>
             </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} style={{width:'38%',paddingLeft:10}} onPress={()=>{this.props.navigation.navigate('Hometoptabbuttonpage',{'productname':'Pick up'})}}>
                <View style={{backgroundColor:'#FFFFFF',elevation:4,shadowOpacity:0.8,width:'100%',flexDirection:'row',borderRadius:5,paddingVertical:8}}>
                <Image source={require('../icons/pickup.png')} style={{width:18,height:18,alignSelf:'center',marginLeft:5}}/>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',alignSelf:'center',width:'80%'}}>Pick up</Text>
                </View>
             </TouchableOpacity>
             <TouchableOpacity activeOpacity={0.8} style={{width:'38%',paddingLeft:10}} onPress={()=>{this.props.navigation.navigate('Hometoptabbuttonpage',{'productname':'Shipping'})}}>
             <View style={{backgroundColor:'#FFFFFF',elevation:4,shadowOpacity:0.8,width:'100%',flexDirection:'row',borderRadius:5,paddingVertical:8}}>
                <Image source={require('../icons/shipping.png')} style={{width:18,height:18,alignSelf:'center',marginLeft:5}}/>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',alignSelf:'center',width:'80%'}}>Shipping</Text>
                </View>
             </TouchableOpacity>
          </View> */}
           {/* <View style={{backgroundColor:Colors.buttoncolor,width:'100%',flexDirection:'row',marginTop:20,borderRadius:12,height:screenHeight*30/100}}> 
               <View style={{width:'40%',paddingTop:20,paddingLeft:15}}>
                    <Text style={{color:'#FFFFFF',fontFamily:'Poppins-ExtraBold',fontSize:28}}>70%</Text>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:20}}>Best Deal on{"\n"}Top Products</Text>
                    <View style={{width:'60%',marginTop:10,borderRadius:8,backgroundColor:'#FFFFFF',paddingVertical:10}}>
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:14}}>Shop Now</Text>
                 </View>
               </View>
               <View style={{position:'absolute',bottom:0,width:'60%',right:0}}>
                  <Image source={require('../icons/girl.png')} style={{width:'87%',height:screenHeight*27/100}}/>
               </View>
           </View> */}
             <View style={{width:'100%',alignSelf:'center',paddingTop:10}}>
             <FlatList
              data={this.state.category_arr}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              
              renderItem={({item,index})=>{
                  return(
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homecategorypage',{'category_data':item})}}>
                    <View style={{width:90,alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:12}}>
                       <View >
                          <Image source={{uri:config.img_url+item.category_img}} style={{width:65,height:65,alignSelf:'center',borderRadius:35,backgroundColor:Colors.imagebackcolor}}/>
                      </View>
                       <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:11}} numberOfLines={1}>{item.category_name}</Text>
                     </View>
                     </TouchableOpacity>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             </View>
             {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:15,paddingHorizontal:10}}>
               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:16}}>Popular Products</Text>
               <TouchableOpacity>
                 <View style={{flexDirection:'row',paddingRight:15}}>
                 <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13}}>View all</Text>
                 <Icon name='right' size={15} color='gray' style={{alignSelf:'center'}}/>
                 </View>
               </TouchableOpacity>
             </View> */}
                  {this.state.item_arr=='NA' && <View>
                         <Text style={{color:'black',textAlign:'center',paddingTop:40,fontFamily:'Ubuntu-Regular',alignSelf:'center',justifyContent:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently items are not available</Text>
                   </View>}
                     
                  
             <View style={{width:'100%',alignSelf:'center',marginTop:20}}>
             {this.state.item_arr!='NA' &&
             <MasonryList     rerender={true} refreshing={true}  imageContainerStyle={{borderRadius:8}} columns={3}   spacing={1}  onPressImage={(item)=>{this.onPressImage(item)}} images={item_arr}/>}
             {/* <FlatList
              data={this.state.item_arr}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>{
                if(this.state.item_arr!='NA')
                {
                  return(
                    <View style={{width:'32.5%',margin:1,paddingVertical:7,height:'auto',borderRadius:12}}>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homeproductdetaile',{'Product_id':item.item_id})}}>
                      <View style={{width:'90%',alignSelf:'center'}}>
                          <View style={{width:'100%',}}>
                            <Image source={item.item_images!='NA'?{uri:config.img_url+item.item_images[0].image}:require('../icons/noimage.png')} style={{width:'100%',height:190,alignSelf:'center',borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                         </View>
                         <Text style={{color:'black',paddingTop:10,fontFamily:'Ubuntu-Bold',paddingLeft:10,fontSize:13}}>{item.name}</Text>
                      <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:5,}}>
                         <Image source={require('../icons/location.png')} style={{width:14,height:14,alignSelf:'center'}}/>
                       <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13,paddingLeft:10}}>{item.add}</Text>
                        </View>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingLeft:10,fontSize:13}}>${item.price}</Text>
                      </View>
                      </TouchableOpacity>
                     </View>
                  )
                }
               
               }}
               keyExtractor={(item, index) => index.toString()}
              /> */}
             </View>

          </View>
          {/* _________________________________________footer start _________________________________ */}
        
          </ScrollView>
          <UserFooter navigation={this.props.navigation} count_inbox={count_inbox} color={this.state.page}/>
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
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:15,
        width:'90%',
    }
   
})