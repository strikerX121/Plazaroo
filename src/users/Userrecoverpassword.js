import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,Keyboard,StatusBar} from 'react-native';
import Colors from '../Colors'
import Loader from '../Loader';
import { config } from '../providers/configProvider';

import NetInfo from '@react-native-community/netinfo';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Userrecoverpassword extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:true,
             HidePassword1:true,
             password:'',
             Cpassword:'',
             otpcode:'',
             errorno:0,
             
             isConnected:true,

            }
      
    }
    componentDidMount(){
      console.log(this.state.signal_id)
          NetInfo.fetch().then(state => {
            this.setState({isConnected:state.isConnected}) });
             const unsubscribe = NetInfo.addEventListener(state => {
              this.setState({isConnected:state.isConnected})
            });
          }


  resetpassword=async()=>{
   let user_id_code= await localStorage.getItemObject('user_id_code')
 
       var user_id=user_id_code ;
       var otpcode = this.state.otpcode;
       var newpass = this.state.password;
       var confirmpass = this.state.Cpassword;
      
Keyboard.dismiss();
      //-------------------- input validations -----------------
      if(otpcode.length<=0){
          this.setState({errorno:1})
           return false;
       }

      if(newpass.length<=0){
          this.setState({errorno:2})
          return false;
      }
      else if(newpass.length<6){
          this.setState({errorno:3})
          return false;
      }
      if(confirmpass.length<=0){
          this.setState({errorno:4})
          return false;
      }
      if(newpass!==confirmpass)
      {
          this.setState({errorno:5})
          return false;
      }
      
      if(this.state.isConnected===true)
      {

    let  url = config.baseURL+'reset_password.php';
    
      const {navigate} = this.props.navigation;
    
      var data = new FormData();
      data.append("user_id", user_id);
      data.append("otp", this.state.otpcode);
      data.append("password",this.state.password);
      data.append("user_type", 1);
      console.log('data',data)
         this.setState({loading:true})
      fetch(url,{
          method: 'POST',
          headers: new Headers(config.headersapi), 
          body:data,
      }).then((obj)=> {
          this.setState({loading:false});
          return obj.json();  
      }).then((obj)=> { 
     console.log('obj',obj)

           if(obj.success == 'true'){
              msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                 navigate('Userlogin')
          } else{
               msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          }
        }).catch( (error)=> {
          console.log("-------- error ------- "+error);
          msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
      });
  }
  else{
     msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
   } 
  }
 
  Resendotpbtn=async()=>{
    let user_id_code= await localStorage.getItemObject('user_id_code')
    console.log(user_id_code)
  let  user_id=user_id_code 
    Keyboard.dismiss()
     var url = config.baseURL+'forgot_resend_otp.php?user_id='+user_id+'&user_type=1';
    this.setState({loading:true})
    console.log('url',url)
    fetch(url,{
       method: 'GET',
       headers: new Headers(config.headersapi), 
    }).then( (obj)=> {
      this.setState({loading:false,});
          return obj.json();  
  }).then((obj)=> { 
    // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
    console.log('obj',obj)
      if(obj.success == 'true'){
   // this.mailsendfunction(obj.mail_arr[0])
          msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
      
        } else{
              msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
            return false;
      }
    }).catch((error)=> {
      console.log("-------- error ------- "+error);
      msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
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
<ScrollView  keyboardShouldPersistTaps='always'   showsVerticalScrollIndicator={false} keyboardDismissMode='none'>
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
        <View style={{paddingHorizontal:20,paddingTop:30}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Recover Password</Text>
<Text style={{fontSize:14,paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}} numberOfLines={2}>Reset code was sent to your email. Please{"\n"}enter the code end create new password.</Text>
        
        <View style={styles.inputcontainer}>
           
             <TextInput
                    placeholder='Enter code'
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({otpcode:txt})}}
                    maxLength={6}
                    style={styles.textfiledinput}
                   />
          </View>
           
          {this.state.errorno==1 && 
                 <Text style={styles.errortextstyle}>Please enter code</Text>
                }
         <View style={styles.inputcontainer}>
                  <TextInput
                    placeholder='New Password'
                    placeholderTextColor='gray'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({password:txt})}}
                    maxLength={14}
                    minLength={6}
                    secureTextEntry={this.state.HidePassword}
                    style={[styles.textfiledinput]}  
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
          {this.state.errorno==2 && 
                 <Text style={styles.errortextstyle}>Please enter password</Text>
                }
               {this.state.errorno==3 && 
                 <Text style={styles.errortextstyle}>Password length should be minimum 6 character</Text>
                }
          <View style={styles.inputcontainer}>
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
                    style={[styles.textfiledinput]}  
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
          {this.state.errorno==4 && 
                 <Text style={styles.errortextstyle}>Please enter confirm password</Text>
                }
               {this.state.errorno==5 && 
                 <Text style={styles.errortextstyle}>Confirm password not matched</Text>
                }
           <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.resetpassword()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Change Password</Text>
               </View>
            </TouchableOpacity>
            <View style={{alignItems:'center',alignSelf:'center',flexDirection:'row',width:'90%'}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',paddingRight:5,fontSize:14}}>Haven't received code?
                     </Text>
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.Resendotpbtn()}}>
                        <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:15.5,marginVertical:8,fontSize:14}}> Resend Code</Text>
                      </TouchableOpacity>
                 </View>
           
          
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
        paddingHorizontal:15,
        width:'100%'
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