import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,Keyboard,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import Loader from '../Loader';
import NetInfo from '@react-native-community/netinfo';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Userforgatepassword extends Component{
    constructor(props) {
        super(props);
        this.state = {    
         Email:'',
         isConnected:true,
         loading:false,
         errorno:0,
         user_id:'',
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
     }
   
     Forgotpassword = () => {
      Keyboard.dismiss();
     var email = this.state.Email;
    
  //-------------------- input validations -----------------
  if(email.length<=0){
             msgProvider.alert(msgTitle.validation[config.language], "Please enter the email address you signed up with", false);
             return false;
           }
           else{
             const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
             if (reg.test(email) !== true){
                   msgProvider.alert(msgTitle.validation[config.language], "Please enter valid email", false);
                   return false;
                }
           }
           
  //this.loadingStart();
   //-------------------- Call API to server ------------------
   this.setState({
     loading: true,
   });
   var url = config.baseURL+'forget_password.php';
    console.log("url:"+url);
    var data = new FormData();
    data.append("email", email);
    data.append("user_type", 2);
    const {navigate} = this.props.navigation;
  
   //  var data = new FormData();
   //  data.append("email", email);
    fetch(url,{
        method: 'POST',
        headers: new Headers(config.headersapi), 
      body:data,
    }).then( (obj)=> {
     this.setState({
       loading: false,
     });
              return obj.json();  
    }).then( (obj)=> { 
        console.log('obj',obj);
     //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
        if(obj.success == 'true'){
          //  msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
           localStorage.setItemObject('user_id_code',obj.user_details.user_id)
           this.props.navigation.navigate('Vendorcheckmail') 
             //  notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
           }else{
            msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
            
            this.setState({
              loading: false,
               });
           }
    }).catch((error)=> {
        console.log("-------- error ------- "+error);
       //  alert("result error:"+error)
        this.setState({
          loading: false,
        });
    });
    //this.loadingEnd();
    //-------------------- Call API to server End ------------------
  }

  mailsendfunction=(emailarr)=>{
    var email =emailarr.email;
    var mailcontent=emailarr.mail_content
    var mailsubject=emailarr.subject
    var  fromName=emailarr.fromName
    var url = config.baseURL+'mailFunctionsSend.php';
    var data = new FormData();
    data.append("email", email);
   data.append("mail_content", mailcontent);
  data.append("subject", mailsubject);
  data.append("fromName", fromName);
  data.append("user_type", 2);
     console.log('otp',data)
    fetch(url,{
       method: 'POST',
       headers: new Headers(config.headersapi), 
      body:data,
  }).then((obj)=> {
          return obj.json();  
  }).then((obj)=> { 
    // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
   console.log('obj',obj)
  //  alert(JSON.stringify(obj))
    if(obj.success == 'true'){
 
   this.email.clear();
   this.props.navigation.navigate('Vendorcheckemail') 
       } else{
               this.setState({loading:false,});
               msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
            return false;
      }
    }).catch((error)=> {
      console.log("-------- error ------- "+error);
        this.setState({loading: false});
  });
    }

    contactusbtn=async()=>{
       this.props.navigation.navigate('VendorContactus')
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
  <ScrollView keyboardShouldPersistTaps='always'   showsVerticalScrollIndicator={false} keyboardDismissMode='none'>
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*33/100,height:30,resizeMode:'contain'}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Forgot Password</Text>
<Text style={{fontSize:14,paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}} numberOfLines={2}>Enter your email and we'll send your{"\n"}instructions on how to reset your password.</Text>
        
        <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
                 <Image source={require('../icons/email2.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
             <TextInput
                    placeholder='Email'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    returnKeyLabel='done'
                    ref={(input) => { this.email = input; }}
                         returnKeyType='done'
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Email:txt})}}
                    maxLength={50}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={styles.errortextstyle}>Please enter email</Text>
                   }

  
          
           <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.Forgotpassword()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Reset Password</Text>
               </View>
            </TouchableOpacity>
          
           
          
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:0,alignSelf:'center',width:'100%',}}>
             <View style={{alignItems:'center',alignSelf:'center',justifyContent:'center',flexDirection:'row',width:'100%',backgroundColor:Colors.Themecolor}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',paddingRight:5,fontSize:14}}>Can not Recover Password?
                     </Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.contactusbtn()}}>
                        <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:15.5,marginVertical:20,fontSize:14}}> Contact Us</Text>
                      </TouchableOpacity>
                 </View>      
                      
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
        marginTop:25,
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
    errortextstyle:{
      color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',
      fontSize:13,paddingTop:4
    },
   
})