import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Keyboard,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import Loader from '../Loader';
import { config } from '../providers/configProvider';

import NetInfo from '@react-native-community/netinfo';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Changepassword extends Component{
    constructor(props) {
        super(props);
        this.state = {   oldpass:'',
                 newpass:'',
                 confirmpass:'',
                loading:false,
                user_id:'',
                HidePassword:true,
                HidePassword1:true,
                HidePassword2:true,
                errorno:0,
                isConnected:true,
                HidePassword3:true
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


    changepass=async()=>{
        var userdata1= await localStorage.getItemObject('user_arr')
         var user_id=userdata1.user_id;
         var password = this.state.oldpass;
         var newpass = this.state.newpass;
         var confirmpass = this.state.confirmpass;
        
 Keyboard.dismiss();
        //-------------------- input validations -----------------
        if(password.length<=0){
            this.setState({errorno:5})
             return false;
         }

        if(newpass.length<=0){
            this.setState({errorno:1})
            return false;
        }
        else if(newpass.length<6){
            this.setState({errorno:2})
            return false;
        }
        if(confirmpass.length<=0){
            this.setState({errorno:3})
            return false;
        }
        if(newpass!==confirmpass)
        {
            this.setState({errorno:4})
            return false;
        }
        
        if(this.state.isConnected===true)
        {

      let  url = config.baseURL+'change_password.php';
      
        const {navigate} = this.props.navigation;
      
        var data = new FormData();
        data.append("user_id", user_id);
        data.append("password_old", this.state.oldpass);
        data.append("password_new",this.state.newpass);
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
                   navigate('Setting')
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
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomColor:'#f2f2f2',borderBottomWidth:1}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
           <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Change Password</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView keyboardShouldPersistTaps='always'   showsVerticalScrollIndicator={false} keyboardDismissMode='none'>
        <View style={{width:'93%',alignSelf:'center',paddingTop:15}}>
        <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
                 <Image source={require('../icons/lock.png')} style={{alignSelf:'center',width:14,height:17}}/>
              </View>
             <TextInput
                    placeholder='Enter Current Password'
                    placeholderTextColor='gray'
                    returnKeyLabel='done'
                         returnKeyType='done'
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({oldpass:txt})}}
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
          {this.state.errorno==5 && 
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingTop:4}}>Please enter password</Text>
                   }
             
          {/* <TouchableOpacity style={{alignSelf:'flex-end',paddingTop:10}} onPress={()=>{this.props.navigation.navigate('Userforgatepassword')}}>
         <Text style={{color:'#e85660',textAlign:'center',fontFamily:'Ubuntu-Medium',alignSelf:'flex-end',fontSize:13,paddingRight:4,}}>Forgot?</Text>
         </TouchableOpacity>   */}
          <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
             <Image source={require('../icons/lock.png')} style={{alignSelf:'center',width:14,height:17}}/>
              </View>
             <TextInput
                    placeholder='Enter New Password'
                    placeholderTextColor='gray'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({newpass:txt})}}
                    maxLength={14}
                    minLength={6}
                    secureTextEntry={this.state.HidePassword2}
                    style={[styles.textfiledinput,{width:'100%'}]}  
                   />
            <TouchableOpacity onPress={()=>{this.setState({HidePassword2:!this.state.HidePassword2})}} style={{position:"absolute",right:25,alignSelf:'center',paddingVertical:7}}>
                {this.state.HidePassword2==true && 
                    <Icon1 name='ios-eye-off' size={22} color='gray' />  
                }  
                {this.state.HidePassword2==false && 
                    <Icon1 name='ios-eye' size={22} color='gray' />  
                }  
              </TouchableOpacity>
              
            
          </View>
          {this.state.errorno==1 && 
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingTop:4}}>Please enter new password</Text>
                   }
                     {this.state.errorno==2 && 
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingTop:4}}>Password length should be minimum 6 character</Text>
                   }
          <View style={styles.inputcontainer}>
             <View style={{alignSelf:'center'}}>
             <Image source={require('../icons/lock.png')} style={{alignSelf:'center',width:14,height:17}}/>
              </View>
             <TextInput
                    placeholder='Confirm New Password'
                    placeholderTextColor='gray'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({confirmpass:txt})}}
                    maxLength={14}
                    minLength={6}
                    secureTextEntry={this.state.HidePassword3}
                    style={[styles.textfiledinput,{width:'100%'}]}  
                   />
            <TouchableOpacity onPress={()=>{this.setState({HidePassword3:!this.state.HidePassword3})}} style={{position:"absolute",right:25,alignSelf:'center',paddingVertical:7}}>
                {this.state.HidePassword3==true && 
                    <Icon1 name='ios-eye-off' size={22} color='gray' />  
                }  
                {this.state.HidePassword3==false && 
                    <Icon1 name='ios-eye' size={22} color='gray' />  
                }  
              </TouchableOpacity>
             
                    
          </View>
          {this.state.errorno==3 && 
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingTop:4}}>Please enter confirm new password</Text>
                   }
               {this.state.errorno==4 && 
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingTop:4}}>Confirm password not matched</Text>
                   }
          <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.changepass()}}>
               <View style={{alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Update Password</Text>
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
         borderRadius:6,
        paddingVertical:14,
        width:'100%',
        alignSelf:'center',
        margin:15,
        backgroundColor:'#fa5252'
    },
    textfiledinput:{
        paddingVertical:8,
        color:'black',
        fontFamily:'Ubuntu-Regular',
        fontSize:14,
        paddingLeft:12,
           width:'100%'
      },
      inputcontainer:{
          flexDirection:'row',
          marginTop:10,
          backgroundColor:'#FFFFFF',
         borderColor:Colors.bottombordercolor,
         borderWidth:1,
          borderRadius:5,
          alignSelf:'center',
          paddingHorizontal:15,width:'100%'
      },
   
})