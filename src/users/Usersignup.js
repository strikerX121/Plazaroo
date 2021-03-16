import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Alert,TextInput,Modal,BackHandler,Keyboard,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon4 from 'react-native-vector-icons/AntDesign'
import { firebaseprovider}  from '../providers/FirebaseProvider';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import {notification} from '../providers/NotificationProvider';
import OTPTextView from 'react-native-otp-textinput';
import { LoginManager , AccessToken,
  GraphRequest,
  GraphRequestManager,} from 'react-native-fbsdk'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from 'react-native-google-signin';
import Icon2 from 'react-native-vector-icons/Feather'
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Usersignup extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          Fname:'',
          Cpassword:'',
          Email:'',
          Password:'',
         otpcode:'',
         isConnected:true,
         modalVisible1:false,
         loading:false,
         modalVisible:false,
         HidePassword:true,
         HidePassword1:true,
         errorno:0,
         termconditioncheck:false,
         user_id:'',
         socialcheck:false,
         player_id:'',
         logintype:'app',
         socialimage:'',
         timer: null,
         referal_code:'',
         minutes_Counter: '01',
         seconds_Counter: '59',
         startDisable:false,
         signal_id:config.onesignalappid
        }
        OneSignal.init(config.onesignalappid, {
          kOSSettingsKeyAutoPrompt: true,
        });
    
        OneSignal.setLogLevel(6, 0);
    }


     
    componentDidMount(){
    console.log(this.state.signal_id)
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
           const unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected:state.isConnected})
          });
             GoogleSignin.configure({
         //It is mandatory to call this method before attempting to call signIn()
         // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
          webClientId:'105582699491-m9la5ema2oue6i2m5lq3k2ecctoauh58.apps.googleusercontent.com',
       });
        //Check if user is already signed in
       this._isSignedIn();
          let data=this.props.navigation.getParam('socialname')
          if(data!=null)
             {
              this.setState({socialcheck:true,logintype:data})
              this.socialdata()
             }
          OneSignal.setLocationShared(true);
          OneSignal.inFocusDisplaying(2);
          OneSignal.addEventListener('ids', this.onIds.bind(this));
          OneSignal.addEventListener('opened', this.onOpened);
            
          }
          socialdata=()=>{
            localStorage.getItemObject('facebookdata').then((res)=>{
                     this.setState({fecthsocialdata:res});
                    
                     console.log('facebookdata',res);
                     this.setState({Fname:res.firstname,Email:res.email,socialimage:res.image,socailid:res.id,})
                    //  this.state.f_name=res.firstname;
                    //  this.state.l_name=res.lastname;
                    //  this.state.email=res.email;
                    //  this.state.fileuri=res.image;
                    // var blob = new Blob([res.image], {type: "image/png"}) 
                    //      var blobUrl =res.image.createObjectURL(blob);
                    //  console.log('socialImage',blobUrl);
                    //  this.readImage(res.image)
                    })
            }
          componentWillUnmount() {
            OneSignal.removeEventListener('ids', this.onIds.bind(this));
               }
               onIds(device) {
                console.log('Device info: ', device);
                this.setState({
                  player_id:device.userId
                });
                player_id_me1=device.userId
            }
          onButtonStart = () => {

            let timer = setInterval(() => {
             
              if(this.state.minutes_Counter=='00' && this.state.seconds_Counter=='01') 
              {
                this.onButtonStop()
              }
           
                var num = (Number(this.state.seconds_Counter) - 1).toString(),
                   count = this.state.minutes_Counter;
                 
          
                 if ((this.state.seconds_Counter) == '00') {
                   count = (Number(this.state.minutes_Counter) - 1).toString();
                  num =59
                 }
             if(count!=-1)
             {
              this.setState({
                minutes_Counter: count.length == 1 ? '0' + count : count,
                seconds_Counter: num.length == 1 ? '0' + num : num
              });
             }
             else{
              this.onButtonStop()
             }
             
            }, 1000);
  
            this.setState({ timer });
        
            this.setState({startDisable : true})
          }
          onButtonStop = () => {
            clearInterval(this.state.timer);
            this.setState({startDisable : false})
          }
        
          GoogleLogin=async()=> {
            //Prompts a modal to let the user sign in into your application.
            try {
              await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
              });
              const userInfo = await GoogleSignin.signIn();
              console.log('User Info --> ', userInfo);
               this.callsocailweb(userInfo,'google')
            // console.log('userinfo',userInfo)
            // console.log('userinfoemail',userInfo.email)
              // this.fetchsocialdata(userInfo,'google')
              this.setState({ userInfo: userInfo });
            } catch (error) {
              // alert('Message'+error.message)
              console.log('Message', error.message);
              if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
              } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
              } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
              } else {
                console.log('Some Other Error Happened');
              }
            }
          };
          _isSignedIn = async () => {
          const isSignedIn = await GoogleSignin.isSignedIn();
          if (isSignedIn) {
            // alert('User is already signed in');
            //Get the User details as user is already signed in
            this._getCurrentUserInfo();
          } else {
            //alert("Please Login");
            console.log('Please Login');
          }
          this.setState({ gettingLoginStatus: false });
        };
        _getCurrentUserInfo = async () => {
          try {
            const userInfo = await GoogleSignin.signInSilently();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
              // alert('User has not signed in yet');
              console.log('User has not signed in yet');
            } else {
              // alert("Something went wrong. Unable to get user's info");
              console.log("Something went wrong. Unable to get user's info");
            }
          }
        };
         FacebookLogin=()=>{
    
     LoginManager.logInWithPermissions([
       'public_profile',"email"
     ]).then((result) => {
        if (result.isCancelled) {
         console.log('Login cancelled');
         // alert('login cancel')
          } else {
           AccessToken.getCurrentAccessToken().then(data => {
               // alert('hello');
   
               const processRequest = new GraphRequest(
                 '/me?fields=id,name,email,first_name,middle_name,last_name,picture.type(large)',
                 null,
                 this.get_Response_Info
               );
               // Start the graph request.
               new GraphRequestManager().addRequest(processRequest).start();
             });
        }
         })

         
         
   
   }
  get_Response_Info = (error, result) => {
    if (error) {
      //Alert for the Error
      Alert.alert('Error fetching data: ' + error.toString());
    } else {
     
       this.callsocailweb(result,'facebook')
        // this.fetchsocialdata(result,'facebook')
       
    }
  };
//   FacebookLogin=()=>{
//    var result={
//      'name':'Sam Jain',
//      'first_name':'Sam',
//      'last_name':'Jain',
//      'email':'testing.yd2@gmail.com',
//      'picture':{'data':{'url':'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=938239669983942&height=200&width=200&ext=1593599421&hash=AeSxenAbxPUd0Oxf'}},
//      'socialname':'facebook',
//      'id':'938239669983942'
//      }
//      this.callsocailweb(result,'facebook')
//  }
//  GoogleLogin1=()=>{
//    var result={
//      'user':{'name':'Young Decade','givenName':'Young',
//      'familyName':'Decade','email':'test.youngdecade1@gmail.com',
//        'photo':'https://lh3.googleusercontent.com/a-/AOh14GhPHfPtC0qWM8k349oVTlwNDXJihR3js1zCFgSrVA=s120',
//        'socialname':'google',
//        'id':'105552882127980951887'}
//      }
//      this.callsocailweb(result,'google')
//  }
  callsocailweb=(result,socialname)=>{
   
   if(socialname=='facebook')
   {
   var facebookdata={
     'name':result.name,
     'firstname':result.first_name,
     'lastname':result.last_name,
     'email':result.email,
     'image':result.picture.data.url,
     'logintype':socialname,
     'id':result.id
     }
   }
   else{
     var facebookdata={
       'name':result.user.name,
       'firstname':result.user.givenName,
       'lastname':result.user.familyName,
       'email':result.user.email,
       'image':result.user.photo,
       'logintype':socialname,
       'id':result.user.id
           }
   }
  
   localStorage.setItemObject('facebookdata',facebookdata);
 let url = config.baseURL+'social_login.php';
 console.log("url:"+url);
 const {navigate} = this.props.navigation;
 
 var data = new FormData();
 
 data.append("social_email", facebookdata.email);
 data.append("social_id", facebookdata.id);
 data.append("device_type", config.device_type);
 data.append("player_id",player_id_me1);
 data.append("social_type",socialname);
 data.append("user_type", 1);
 console.log("dtataa:",data);
 this.setState({loading:true,});
 fetch(url,{method: 'POST',  
  headers: new Headers(config.headersapi), 
  body:data,
 }).then( (obj)=> { this.setState({loading: false,});
  return obj.json();  
 }).then( (obj)=> { 
   console.log(obj);
 //alert(JSON.stringify(obj))
 //   
  
   if(obj.success == 'true'){
 
       // msgProvider.alert(msgTitle.success[config.language], obj.msg[config.language], false);
       var user_details = obj.user_details;
       if(obj.user_details!='NA')
         {
            localStorage.setItemObject('usersocial_arr', user_details);
             // navigate('Home')
         }
         if(obj.user_exist=='no')
           {
            
             this.setState({socialcheck:true,Fname:facebookdata.firstname,Email:facebookdata.email,socialimage:facebookdata.image,socailid:facebookdata.id,})
           }
           else{
            localStorage.setItemObject('user_arr', user_details);
            if(user_details.profile_complete==1){
              firebaseprovider.firebaseUserCreate();
              firebaseprovider.getMyInboxAllData();
              this.props.navigation.replace('Userhome');
              }
              else{
                navigate('Uploadprofile');
              }
        
               // if(obj.notification_arr!='NA')
             // {
             //   notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
             // }
           
          
           }
         
    }else{
          msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
           return false;
  }
 }).catch( (error) =>{
  console.log("-------- error ------- "+error);
  msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
    this.setState({loading:false})
 });
 } 
      Otpveryfication=()=>{
              Keyboard.dismiss()
              var user_id = this.state.user_id;
              var otp =this.state.otpcode;
             if(otp.length<=0)
             {
              msgProvider.alert(msgTitle.error[config.language],'We have sent you a One Time Password to the email details provided.Please check and enter the code to complete registration', false);
               return false
            }
              var url = config.baseURL+'otp_verify.php';
            
              var data = new FormData();
              data.append("user_id", user_id);
              data.append("otp", otp);
              data.append("user_type", 1);
              this.setState({loading:true})
               console.log('otp',data)
              fetch(url,{
                 method: 'POST',
                 headers: new Headers(config.headersapi), 
                body:data,
            }).then((obj)=> {
              this.setState({loading:false,modalVisible:false});
                    return obj.json();  
            }).then((obj)=> { 
              // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
             console.log('obj',obj)
            //  alert(JSON.stringify(obj))
              if(obj.success == 'true'){
                   var user_details = obj.user_details;
                    localStorage.setItemObject('user_arr', user_details);
                //   if(obj.notification_arr!='NA'){
                //         notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                //  }
                 this.props.navigation.navigate('Uploadprofile')
                    // notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                         
                 } else{
                  Alert.alert(
                    "information message",
                    obj.msg[config.language],
                    [
                     { text: 'ok', onPress: () => this.setState({modalVisible:true}) },
                    ],
                   { cancelable: true },
              
                  )
                      return false;
                }
              }).catch((error)=> {
                console.log("-------- error ------- "+error);
                  this.setState({loading: false});
            });
              }
        Resendotpbtn=()=>{
                var user_id = this.state.user_id;
                Keyboard.dismiss()
                 var url = config.baseURL+'resend_otp.php?user_id='+user_id+'&user_type=1';
                 clearInterval(this.state.timer);
                 this.setState({loading:true, timer: null,
                  minutes_Counter: '01',
                  seconds_Counter: '59', startDisable:false})
                 
                fetch(url,{
                   method: 'POST',
                   headers: new Headers(config.headersapi), 
                }).then( (obj)=> {
                  this.setState({loading:false,});
                      return obj.json();  
              }).then((obj)=> { 
                // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                console.log('obj',obj)
                  if(obj.success == 'true'){
                  this.otpcodetype.clear();
                      this.setState({loading:false,otpcode:''});
                      this.onButtonStart()
                      this.mailsendfunction(obj.mail_arr[0])
                      msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                  
                    } else{
                         
                           msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                        return false;
                  }
                }).catch((error)=> {
                  console.log("-------- error ------- "+error);
                    alert("result error:"+error)
                    this.setState({loading: false});
              });
                 }

         Signupbtn = () => {
                  //Alert.alert('btnSignUPCall');
                  console.log('playeridbtnsignp', player_id_me1)
                       var email = this.state.Email;
                       var password =this.state.Password;
                       var f_name = this.state.Fname;
                       var Cpassword = this.state.Cpassword;
                    Keyboard.dismiss()
                
                      //-------------------- input validations -----------------
                      if(f_name.length<=0){
                        this.setState({errorno:1})
                          return false;
                      }
                      else{
                         const reg1=/^[a-zA-Z ]{2,30}$/;
                        if(reg1.test(f_name)!==true)
                        {
                          this.setState({errorno:9})
                            return false;
                        }
                      }
                      if(this.state.socialcheck==false){
                     if(email.length<=0){
                        this.setState({errorno:2})
                          return false;
                        }
                      else{
                        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (reg.test(email) !== true){
                          this.setState({errorno:3})
                            return false;
                        }
                      }
                    }
                    else{
                      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                        if (reg.test(email) !== true){
                          this.setState({errorno:3})
                            return false;
                        }
                    }
                
                     if(this.state.socialcheck==false){
                            if(password.length<=0){
                              this.setState({errorno:4})
                           return false;
                        }
                        else if(password.length<6){
                          this.setState({errorno:5})
                          return false;
                        }
                        if(Cpassword.length<=0){
                          this.setState({errorno:6})
                          return false;
                         }
                        
                        if(Cpassword!=password){
                          this.setState({errorno:7})
                          return false;
                         }
                     
                        }
                        if(this.state.termconditioncheck==false){
                          this.setState({errorno:8})
                          return false;
                         }
                      
                        //-------------------- Call API to server ------------------
                        if(this.state.isConnected===true)
                        {
                        var url = config.baseURL+'signup.php';
                            console.log("url:",url);
                      
                      //    alert(url);
                   
                      const {navigate} = this.props.navigation;
                
                      var data = new FormData();
                      data.append("name", f_name);
                       data.append("email", email);
                      // data.append("mobile", Cpassword);
                      data.append("password", password);
                      data.append("device_type", config.device_type);
                      data.append("player_id", player_id_me1);
                      data.append("user_type", 1);
                      // data.append("login_type", config.login_type);
                      data.append("login_type",this.state.logintype)
                      this.state.socialcheck==false?data.append('social_id',''):data.append("social_id",this.state.socailid);
                      if(this.state.socialcheck==true)
                      {
                        data.append('image',this.state.socialimage)
                      }
                      console.log('data',data)
                      this.setState({loading:true})
                    
                   
                   

                     console.log('useranthanti',config.headersapi)
                      fetch(url,{
                         method: 'POST',
                         headers: new Headers(config.headersapi), 
                       
                        body:data,
                    }).then((obj)=>{
                      this.setState({loading:false});
                       console.log('obj',obj); 
                            return obj.json(); 
                            
                    }).then((obj)=> { 
                      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                     console.log('obj',obj)
                    //  alert(JSON.stringify(obj))
                      if(obj.success == 'true'){
                         var user_details = obj.user_details;
                         this.setState({user_id:user_details.user_id});
                        localStorage.setItemObject('user_arr', user_details);
                         if(this.state.socialcheck==false &&  user_details.otp_verify==0)
                            {
                              // this.mailsendfunction(obj.mail_arr[0])
                               this.props.navigation.navigate('Uploadprofile')
                               
                            }
                            else{
                              this.props.navigation.navigate('Uploadprofile')
                                }
                                // if(obj.notification_arr!='NA')
                                // {
                                //    notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                                // }
                         
                         
                        } else{
                              msgProvider.alert(msgTitle.information[config.language],obj.msg[config.language], false);
                              return false;
                        }
                      }).catch((error)=> {
                        console.log("-------- error ------- "+error);
                        
                          this.setState({loading: false});
                    });
                  }
                  else{
                     msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
                   }     
                   
                      
                  }
          
       mailsendfunction=(emailarr)=>{
                   var email =emailarr.email;
                    var mailcontent=emailarr.mail_content
                    var mailsubject=emailarr.subject
                    var  fromName=emailarr.fromName
                    var url = config.baseURL+'mailFunctionsSend.php';
                    this.setState({loading:true})
                    var data = new FormData();
                    data.append("email", email);
                    data.append("mail_content", mailcontent);
                    data.append("subject", mailsubject);
                    data.append("fromName", fromName);
                    data.append("user_type", 1);
                     console.log('otp',data)
                    fetch(url,{
                       method: 'POST',
                       headers: new Headers(config.headersapi), 
                      body:data,
                  }).then((obj)=> {
                    this.setState({loading:false,});
                          return obj.json();  
                  }).then((obj)=> { 
                    // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                   console.log('obj',obj)
                  //  alert(JSON.stringify(obj))
                    if(obj.success == 'true'){
                      this.setState({modalVisible:true})  
                      this.onButtonStart()      
                       } else{
                             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                            return false;
                      }
                    }).catch((error)=> {
                      console.log("-------- error ------- "+error);
                        this.setState({loading: false});
                  });
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
         <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible:false})
          }}>
          <TouchableOpacity activeOpacity={1} style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#00000080',}}>
            <View style={{height:'auto',width:'90%',borderRadius:12,justifyContent:'center',alignItems:'center',alignSelf:'center',backgroundColor:'#FFFFFF'}}>
                 <View style={{height:'auto',width:'90%'}}> 
                
                    <TouchableOpacity style={{width:'15%',alignSelf:'flex-end',padding:10}} onPress={()=>{this.setState({modalVisible:false,  timer: null,
                      minutes_Counter: '01',
                      seconds_Counter: '59',startDisable:false}); clearInterval(this.state.timer);}}>
                         <Image source={require('../icons/cross.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                     </ TouchableOpacity>
               
                <Text style={{fontSize:15,fontFamily:'Ubuntu-Medium',paddingTop:10,textAlign:'center'}}>We have sent you a One Time Password to the email details provided.Please check and enter the code to complete registration</Text>
                  {/* <Text style={{fontSize:15,paddingTop:5,textAlign:'center'}}>Enter Your Verification Code</Text> */}
                  <OTPTextView
                     containerStyle={styles.textInputContainer}
                     handleTextChange={text => this.setState({ otpcode: text })}
                     inputCount={6}
                     textInputStyle={{width:screenWidth*10/100}}
                     ref={(ref)=>{this.otpcodetype=ref}}
                     keyboardType="numeric"
                     returnKeyLabel='done'
                     tintColor={Colors.buttoncolor}
                     returnKeyType='done'
                     onSubmitEditing={()=>{Keyboard.dismiss()}}
                     />
                
                </View>
                {this.state.startDisable==true  && <View style={{paddingTop:15,flexDirection:'row',}}>
                <View style={{  backgroundColor:Colors.buttoncolor,width:30,height:30,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.counterText}>{this.state.minutes_Counter}</Text>
                </View>
                <View style={{ marginLeft:5, backgroundColor:Colors.buttoncolor,width:30,height:30,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
        <Text style={styles.counterText}>{this.state.seconds_Counter}</Text>
                </View>
               
                </View>}
                <View style={ this.state.startDisable==false?{width:'100%',flexDirection:'row',marginTop:25,paddingBottom:10}:{marginTop:25,paddingBottom:10,width:'100%',alignItems:'center',alignSelf:'center',justifyContent:'center'}}>
               {this.state.startDisable==false &&  <View style={{width:'50%',alignItems:'center'}}> 
                        <TouchableOpacity style={{backgroundColor:Colors.buttoncolor,borderRadius:50,width:'75%'}}  onPress={()=>{this.Resendotpbtn()}}>
                        
                            <Text style={{textAlign:'center',paddingVertical:5,color:'#FFFFFF',fontFamily:'Ubuntu-Medium',textAlign:'center'}}>RESEND</Text>
                         </TouchableOpacity>
                  </View>}
                  <View style={{width:'50%',alignItems:'center'}}> 
                       <TouchableOpacity style={{backgroundColor:Colors.buttoncolor,borderRadius:50,width:'75%'}} onPress={()=>{this.Otpveryfication()}}>
                             <Text style={{textAlign:"center",paddingVertical:5,color:'#FFFFFF',fontFamily:'Ubuntu-Medium',textAlign:'center'}}>CONFIRM</Text>
                           </TouchableOpacity>
                  </View>
                </View>
            </View>
             </TouchableOpacity>
        </Modal>
      
        <ScrollView keyboardShouldPersistTaps='always'   showsVerticalScrollIndicator={false} keyboardDismissMode='none'>
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*33/100,height:30,resizeMode:'contain'}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:20}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Sign Up</Text>
<Text style={{fontSize:14,paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}}>After registration you can use your account{"\n"}to log in next time, <Text style={{color:Colors.buttoncolor}} onPress={()=>{this.props.navigation.navigate('Userlogin')}}>Already have an account?</Text></Text>
        
        <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
                 <Image source={require('../icons/name.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
             <TextInput
                    placeholder='Full Name'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Fname:txt})}}
                    maxLength={50}
                    value={this.state.Fname}
                    style={styles.textfiledinput}
                   />
          </View>
            {this.state.errorno==1 && 
                    <Text style={styles.errortextstyle}>Please enter full name</Text>
                   }
                   {this.state.errorno==9 && 
                    <Text style={styles.errortextstyle}>Please enter valid name</Text>
                   }

       <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
                 <Image source={require('../icons/email2.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
             <TextInput
                    placeholder='Email'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Email:txt})}}
                    maxLength={50}
                    value={this.state.Email}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==2 && 
                    <Text style={styles.errortextstyle}>Please enter email</Text>
                   }
                    {this.state.errorno==3 && 
                    <Text style={styles.errortextstyle}>Please enter valid email</Text>
                   }
                   {this.state.socialcheck==true &&
                         <Text style={{marginTop:35}}></Text>
                     }
{this.state.socialcheck==false &&
<View>
        <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
                 <Image source={require('../icons/password.png')} style={{alignSelf:'center',width:15,height:15}}/>
              </View>
             <TextInput
                    placeholder='Password'
                    placeholderTextColor='gray'
                    returnKeyLabel='done'
                     returnKeyType='done'
                     onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Password:txt})}}
                    maxLength={14}
                    minLength={6}
                    secureTextEntry={this.state.HidePassword}
                    style={[styles.textfiledinput,{width:'100%'}]}  
                   />
            <TouchableOpacity onPress={()=>{this.setState({HidePassword:!this.state.HidePassword})}} style={{position:"absolute",right:25,alignSelf:'center',paddingVertical:7}}>
                {this.state.HidePassword==true && 
                    <Icon1 name='ios-eye-off' size={22} color='gray' />  
                }  
                {this.state.HidePassword==false && 
                    <Icon1 name='ios-eye' size={22} color='gray' />  
                }  
              </TouchableOpacity>
             
          </View>  
          {this.state.errorno==4 && 
                    <Text style={styles.errortextstyle}>Please enter password</Text>
                   }
                   {this.state.errorno==5 && 
                    <Text style={styles.errortextstyle}>Password length should be minimum 6 character</Text>
                   }
          <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
                 <Image source={require('../icons/password.png')} style={{alignSelf:'center',width:15,height:15}}/>
              </View>
             <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor='gray'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Cpassword:txt})}}
                    maxLength={14}
                    minLength={6}
                    secureTextEntry={this.state.HidePassword1}
                    style={[styles.textfiledinput,{width:'100%'}]}  
                   />
            <TouchableOpacity onPress={()=>{this.setState({HidePassword1:!this.state.HidePassword1})}} style={{position:"absolute",right:25,alignSelf:'center',paddingVertical:7}}>
                {this.state.HidePassword1==true && 
                    <Icon1 name='ios-eye-off' size={22} color='gray' />  
                }  
                {this.state.HidePassword1==false && 
                    <Icon1 name='ios-eye' size={22} color='gray' />  
                }  
              </TouchableOpacity>
              
          </View>
          {this.state.errorno==6 && 
                    <Text style={styles.errortextstyle}>Please enter confirm password</Text>
                   }
                    {this.state.errorno==7 && 
                    <Text style={styles.errortextstyle}>Confirm password not matched</Text>
                   }
           </View>}        
          <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,marginTop:15,alignItems:'center'}]} onPress={()=>{this.Signupbtn()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Sign Up</Text>
               </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.setState({termconditioncheck:!this.state.termconditioncheck,errorno:0})}}>
                    <View style={{flexDirection:'row',paddingTop:10,paddingBottom:5,alignSelf:'center'}}>
                    {this.state.termconditioncheck==true?<Icon4 name='checksquare' size={25} color={Colors.buttoncolor}/>:
                       <Icon3 name='checkbox-blank-outline' size={25} color='black'/>}
                    <View style={{alignSelf:'center'}}>

            <Text style={{fontSize:14,textAlign:'center',paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}}>By signing up you agree to our <Text style={{color:Colors.buttoncolor,textDecorationLine:'underline'}} onPress={()=>{this.setState({termconditioncheck:true}); this.props.navigation.navigate('Termscondition',{'contantpage':2})}}>Terms & Conditions</Text> and <Text style={{color:Colors.buttoncolor,textDecorationLine:'underline'}} onPress={()=>{this.setState({termconditioncheck:true}); this.props.navigation.navigate('Termscondition',{'contantpage':1})}}>Privacy Policy</Text> </Text>
           </View>
                      </View> 
                 </TouchableOpacity>

                 {/* <View style={{paddingTop:19}}>
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.setState({termconditioncheck:!this.state.termconditioncheck})}}>
                   <View style={{flexDirection:'row',width:'90%',alignSelf:'flex-end',alignItems:'flex-end',justifyContent:'flex-end'}}>
                   
                    {this.state.termconditioncheck==true?<Icon4 name='checksquare' size={25} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>:
                       <Icon3 name='checkbox-blank-outline' size={25} color='black' style={{alignSelf:'center'}}/>}
                    
                    <Text style={{fontSize:14,textAlign:'right',width:'95%',fontFamily:'Poppins-Light',paddingTop:14}}>By Continue or logins in, you agree to our <Text style={{color:Colors.buttoncolor,textDecorationLine:'underline'}} onPress={()=>{this.setState({termconditioncheck:true}); this.props.navigation.navigate('Tearmscondition',{'name':2})}}>Terms & Conditions</Text> and <Text style={{color:Colors.buttoncolor,textDecorationLine:'underline'}} onPress={()=>{this.setState({termconditioncheck:true}); this.props.navigation.navigate('Tearmscondition',{'name':1})}}>Privacy Policy</Text> </Text>
                  </View> 
                   </TouchableOpacity>
       
                 </View>  */}


                 {this.state.errorno==8 && 
                    <Text style={[styles.errortextstyle,{textAlign:'center'}]}>Please check terms & condition and privacy policy</Text>
                   }

          {/* <View style={{paddingTop:10,paddingBottom:5,justifyContent:"space-between"}}>
          <Text style={{fontSize:14,textAlign:'center',paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}}>By signing up you agree to our<Text style={{color:Colors.buttoncolor}} onPress={()=>{this.props.navigation.navigate('Termscondition')}}> Terms{"\n"}Condition & Privacy Policy</Text></Text>
           </View>  */}
          
          
            <Text style={{paddingVertical:10,textAlign:'center',fontSize:13,fontFamily:'Ubuntu-Regular'}}>or connect with</Text>
{/*           
            <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#347deb',borderWidth:0.7,borderColor:'#f2f2f2'}]} onPress={()=>{alert('coming soon')}}> */}
            <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#347deb',borderWidth:0.7,borderColor:'#f2f2f2'}]} onPress={()=>{this.FacebookLogin()}}>
               <View style={{flexDirection:'row',paddingHorizontal:10,width:'100%'}}>
                   <View style={{width:'15%'}}>
                   <Image source={require('../icons/facebook.png')} style={{width:25,alignSelf:'center',height:25,borderRadius:5,}}/>
                   </View>
                   <Text style={{fontFamily:'Ubuntu-Bold',fontSize:14.5,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',textAlign:'center',width:'72%'}}>Connect with Facebook</Text>
               </View>
            </TouchableOpacity>
            {/* <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',elevation:3,borderWidth:0.7,borderColor:'#f2f2f2'}]} onPress={()=>{alert('coming soon')}}> */}
            <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',elevation:3,borderWidth:0.7,borderColor:'#f2f2f2'}]} onPress={()=>{this.GoogleLogin()}}>
               <View style={{flexDirection:'row',paddingHorizontal:10,width:'100%'}}>
                   <View style={{width:'15%'}}>
                   <Image source={require('../icons/google.png')} style={{width:25,alignSelf:'center',height:25,borderRadius:5,}}/>
                   </View>
                   <Text style={{fontFamily:'Ubuntu-Bold',fontSize:14.5,paddingLeft:14,alignSelf:'center',color:'black',textAlign:'center',width:'72%'}}>Connect with Google</Text>
               </View>
            </TouchableOpacity>
</View>
       {/* ........................................Container finish............................... */}
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
        flexDirection:'row',
        marginTop:17,
        backgroundColor:'#FFFFFF',
        // elevation:2,
        // shadowOffset:{width:2,height:2},
        borderColor:Colors.inputborder,
      borderWidth:1.5,
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:15,width:'100%'
    },
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:12,
        width:'100%',
    },
    counterText:{
        color:'#FFFFFF',textAlign:'center',
        borderRadius:5,alignSelf:'center',
        alignContent:'center',
      
        justifyContent:'center',
        alignItems:'center'
      },
   
})