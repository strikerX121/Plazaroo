import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Alert,Keyboard,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import OneSignal from 'react-native-onesignal';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import UserFooter from './UserFooter'
import firebase from './Config1';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import Icon2 from 'react-native-vector-icons/Feather'
import { LoginManager , AccessToken,} from 'react-native-fbsdk'
import {GoogleSignin,
  GoogleSigninButton,
  statusCodes,} from 'react-native-google-signin';
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Account extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             countinbox:0,
             HidePassword:false,
             isConnected:true,
             refresh:false,
             page:'account',
             notification_count:2,
             image:'',
             email:'',
             name:'',
             login_type:'app',
            }
      
    }
    componentDidMount(){
      this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
        if (payload.lastState.routeName=="Userlogin" && payload.action.type=='Navigation/BACK') {
            BackHandler.exitApp();
          }
    });
      const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.userdata()
         });
        //  firebaseprovider.firebaseUserGetInboxCount();
        this.getMyInboxAllData1();
         this.userdata()
    
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
   userdata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
       
         this.setState({name:userdata.name,email:userdata.email,
image:userdata.image,login_type:userdata.login_type,notification_count:userdata.notification_count
      })
     
     }

    
    datauser=async()=>{
      var userdata= await localStorage.getItemObject('user_arr')
  console.log('userdata',userdata)
 
    FirebaseInboxJson=[];
        if(userdata.login_type=='app')
          {
           localStorage.setItemObject('user_arr',null);
           this.props.navigation.push('Userlogin')
           console.log('app')
        }
       else if(userdata.login_type=='google')
            {
                this.signOut()
                localStorage.setItemObject('user_arr',null);
                
                // alert('vikas')
           }
        else if(userdata.login_type=='facebook')   
            {
              this.Auth()
              localStorage.setItemObject('user_arr',null);
             
            }
     }
   
    signOut = async () => {
      //Remove user session from the device.
      try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        localStorage.setItemObject('user_arr',null);
        localStorage.setItemObject('facebookdata',null);
        this.props.navigation.navigate('Userlogin') // Remove the user from your app's state as well
      } catch (error) {
        console.error(error);
        this.props.navigation.navigate('Welcome')
      }
    };
    Auth = () => {
      LoginManager.logOut();
      localStorage.setItemObject('user_arr',null);
      console.log('facebook logout chl rha h ')
      localStorage.setItemObject('facebookdata',null);
    this.props.navigation.navigate('Userlogin')
     console.log('facebook logout chl rha h ')
    };
    vendorbecomebtn=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
     
      if(this.state.isConnected===true)
      {
      this.setState({loading:true,})
      
       var url = config.baseURL+'become_vendor_role.php?user_id='+user_id+'&user_type=1';
         console.log("url:"+url);
         fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
                if(obj.status=="no")
                  {
                   this.props.navigation.navigate('VendorAddbussiness')
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
    render(){
        console.log('cikasd')
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
       {/* //=----------------------header part---------=000------ */}
       <View style={{width:'100%',alignSelf:'center',paddingTop:20,backgroundColor:Colors.buttoncolor}}>
          <View style={{flexDirection:'row',width:'94%',justifyContent:'space-between',alignSelf:'center'}}>
          <TouchableOpacity style={{paddingTop:10}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
              <Icon2 name='chevron-left' size={28} color='gray' style={{alignSelf:'center'}}/>
                  {/* <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/> */}
             </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Setting')}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                  <Image source={require('../icons/setting.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
          </TouchableOpacity>
          </View>
          <View style={{width:'92%',flexDirection:'row',paddingBottom:40,paddingTop:30,alignSelf:'center'}}>
                      <View style={{width:'15%',alignSelf:'center'}}>
                      {this.state.image=='NA'?
                       <Image source={require('../icons/name.png')}  style={{width:40,height:40,borderRadius:25,backgroundColor:'#f0f0f0'}}/>:
                       <TouchableOpacity activeOpacity={0.8}  onPress={()=>{this.state.image!='NA'?this.props.navigation.navigate('Fullviewimage',{'images':this.state.image,'type':'vikas'}):null}}>
                       <Image source={this.state.login_type=='app'?{uri:config.img_url1+this.state.image}:{uri:this.state.image}}  style={{width:40,height:40,borderRadius:25,backgroundColor:'#f0f0f0'}}/>
                     </TouchableOpacity>
                      }
                  </View>
                        <View style={{width:'85%'}}>
<Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14}}>{this.state.name}</Text>
<Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:17}}>{this.state.email}</Text>
                        </View>
                  </View>     
           </View>
        {/* ..............................heaser finish................................ */}
       <ScrollView style={{marginBottom:80}}>
           <View style={{backgroundColor:'#FFFFFF',}}>
       <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Mylisting')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/listing.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>My Listings</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>   
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Myorderuser')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/orders.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>My Orders</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Usereditprofile')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/f-profile.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>View & Edit Profile</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('UserWallet')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
          <Icon1 name='wallet' size={22} color='gray' style={{alignSelf:'center'}}/>
         <Text style={styles.textfont}>Wallet</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Notification')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/notification.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Notification</Text>
      </View>
      <View style={{flexDirection:'row'}}>
       {notification_count_value>0 && <View style={{backgroundColor:Colors.buttoncolor,alignSelf:'center',alignItems:'center',justifyContent:'center',width:22,height:22,marginRight:6,borderRadius:6}}>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium'}}>{notification_count_value<10?notification_count_value:'9+'}</Text>
        </View>}
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Wishlist')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/wishlist.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Wishlist</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Viewprofilepage')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/f-profile.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>View & Profile</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Youraddress')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/address.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Address</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.vendorbecomebtn()}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/f-profile.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Become A Vendor</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        </View>
         <View style={{backgroundColor:'#FFFFFF',marginTop:15}}>
     
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend')}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/invite-friend.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Invite a Friend</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Termscondition',{'contantpage':0})}} style={styles.textbutton} activeOpacity={0.8} >
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/about-us.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>About US</Text>
        </View>
        </TouchableOpacity> 
         </View>
         <View style={{backgroundColor:'#FFFFFF',marginTop:15}}>
     
     <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.logout()}}>
     <View style={{flexDirection:'row'}}>
     <Image source={require('../icons/logout.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
         <Text style={[styles.textfont,{color:Colors.buttoncolor}]}>Log Out</Text>
     </View>
     </TouchableOpacity>
     
      </View>
        </ScrollView> 
       {/* ........................................Container finish............................... */}
     
       <UserFooter navigation={this.props.navigation} count_inbox={count_inbox} color={this.state.page}/>
         
        
    </View>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
       
    },
   
    button:
    {
        marginBottom:13,
         borderRadius:6,
        paddingVertical:12,
        width:'50%',
        margin:15,
        backgroundColor:'#fa5252'
    },
    textbutton:{
     borderBottomColor:'#f2f2f2'
    ,borderBottomWidth:1,
    paddingVertical:13,

    width:'90%',
    alignSelf:'center'
 },
    textfont:{
    fontFamily:'Ubuntu-Medium',
    fontSize:13.5,
    color:'gray',
    paddingLeft:10,
    paddingLeft:15
}
   
})