import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar,Modal,Alert} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import OneSignal from 'react-native-onesignal';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import NetInfo from '@react-native-community/netinfo';
import { firebaseprovider}  from '../providers/FirebaseProvider';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {notification} from '../providers/NotificationProvider';
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const BannerWidth = Dimensions.get('window').width*80/100;
export default class Uploadprofile extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             image:'NA',
             isVisible:false,
             isConnected:true,
             fileData:'',
             fileUri:'',
             camraon:false,
             login_type:'app'
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
        this.userdata1()
     }
    userdata1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      console.log('userdatauploading paghe',userdata)
      if(userdata!=null)
      {
        this.setState({image:userdata.image,login_type:userdata.login_type})
      }
    }
    Addphotobtn = async() => {
   let userdata=await localStorage.getItemObject('user_arr')
    
  //-------------------- input validations -----------------
  if(this.state.camraon==false && this.state.image=='NA' && this.state.login_type=='app'){
             msgProvider.alert(msgTitle.validation[config.language], "Please upload profile photo", false);
             return false;
           }
          
  if(this.state.isConnected===true)
   {
   this.setState({
     loading: true,
   });
   var url=config.baseURL+'user_signup_step2.php';
    console.log("url:"+url);
    var data = new FormData();
    data.append("user_id", userdata.user_id);
    data.append("user_type", 1);
    data.append("device_type", config.device_type);
    data.append("player_id",player_id_me1);
    if(this.state.login_type!='app')
    {
      data.append('login_type','socail')
    }
    else{
      data.append('login_type','app')
     }
   if(this.state.camraon==true)
   {
    data.append('image', {
      uri: this.state.fileUri,
      type: 'image/jpg', // or photo.type
      name: 'image.jpg'
    });
   }
   const {navigate} = this.props.navigation;
  
   //  var data = new FormData();
   //  data.append("email", email);
    fetch(url,{
        method: 'POST',
        headers: new Headers(config.headersapi), 
      body:data,
    }).then( (obj)=> {
     this.setState({loading:false});
       return obj.json();  
    }).then( (obj)=> { 
        console.log('obj',obj);
     //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
        if(obj.success == 'true'){
          localStorage.setItemObject('user_arr', obj.user_details);
          if(obj.notification_arr!='NA')
          {
             notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
          }
            firebaseprovider.firebaseUserCreate();
            firebaseprovider.getMyInboxAllData();
            this.props.navigation.navigate('Referralcode')
         
            }else{
            msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
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
      Pickerimagebtn=()=>{
        ImagePicker.openPicker({
          // width: 800,
           // height: 800,
          cropping: true,
           // cropperCircleOverlay: true,
           sortOrder:'none',
          // compressImageMaxWidth: 1000,
          // compressImageMaxHeight: 1000,
            cropperToolbarTitle:'Zoom',
          compressImageQuality: 0.5,
          compressVideoPreset: 'MediumQuality',
          includeExif: true,
          includeBase64:true,
          cropperStatusBarColor: 'white',
          cropperToolbarColor: 'white',
          cropperActiveWidgetColor: 'white',
          cropperToolbarWidgetColor: '#3498DB',
        }).then(response => {
          console.log(response);
        
                      this.setState({
                        filePath: response,
                         fileData: response.data,
                          fileUri: response.path,
                          imagedata:true,
                          errorno:0,
                          camraon:true,
                         
                  });
        }).catch(e => {
        console.log('eror',e)
        });
       }
      Cameraimagebtn=()=>{
        ImagePicker.openCamera({
           // width: 800,
         // height: 800,
              cropping: true,
         // cropperCircleOverlay: true,
       sortOrder:'none',
       // compressImageMaxWidth: 1000,
        // compressImageMaxHeight: 1000,
         cropperToolbarTitle:'Zoom',
          compressImageQuality: 0.5,
          compressVideoPreset: 'MediumQuality',
          includeExif: true,
          includeBase64:true,
          cropperStatusBarColor: 'white',
          cropperToolbarColor: 'white',
          cropperActiveWidgetColor: 'white',
          cropperToolbarWidgetColor: '#3498DB',
        }).then(response => {
          console.log(response);
         
                      this.setState({
                        filePath: response,
                         fileData: response.data,
                          fileUri: response.path,
                          imagedata:true,
                          errorno:0,
                          camraon:true,
                        
                  });
        }).catch(e => {
          console.log('eror',e)
        });
       }
  // btnOpneImageOption = () => {
  //   const options = {
  //          storageOptions: {
  //           skipBackup: true,
  //            path: 'images',
            
  //         },
  //         maxWidth: 700,
  //             maxHeight: 700,
  //             quality: 0.4
  //       };
      
  //       ImagePicker.showImagePicker(options, (response) => {
  //         console.log('Response = ', response);
      
  //         if (response.didCancel) {
  //           console.log('User cancelled image picker');
  //         } else if (response.error) {
  //           console.log('ImagePicker Error: ', response.error);
  //         } else if (response.customButton) {
  //           console.log('User tapped custom button: ', response.customButton);
  //         } else {
            
  //             this.setState({
  //                 filePath: response,
  //                  fileData: response.data,
  //                   fileUri: response.uri,
  //                   imagedata:true,
  //                   camraon:true,
  //                   profileimagehide:true,
  //                    openDate:false
  //           });
  //         }
  //       });
      
  //       }
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
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
          this.setState({isVisible:false})
            }}>
                   <TouchableOpacity onPress={()=>{this.setState({isVisible:false})}} activeOpacity={1} style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#00000040',opacity:1,}}>
                  <View style={{height:'auto',paddingHorizontal:25,width:BannerWidth,borderRadius:3,alignSelf:'center',backgroundColor:'#FFFFFF',}}>
                    {/* <View style={{paddingHorizontal:25,,borderRadius:5,backgroundColor:'#e3e3e3'}}> */}
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Ubuntu-Bold',fontSize:22}}>Choose media</Text>
                       <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Cameraimagebtn()}} >
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Take a photo</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Pickerimagebtn()}}>
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Choose from library</Text>
                                  </TouchableOpacity>
                          <View style={{width:'100%',alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',marginTop:35,marginBottom:15,alignItems:'flex-end'}}>
                                
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.props.navigation.navigate('Home')}} >
                                    <Text style={{color:'black',fontSize:17,fontFamily:'Ubuntu-Medium',letterSpacing:0.8}}>CANCEL</Text>
                                  </TouchableOpacity>
                             </View>


                            
                    </View>

                 
                 </TouchableOpacity>
         </Modal>
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Userlogin')}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',resizeMode:'contain',width:screenWidth*30/100,height:30}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30,flex:0.8,alignItems:'center',justifyContent:'center',alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
          {this.state.camraon==true ?
          
           <TouchableOpacity onPress={()=>{this.setState({isVisible:true})}}>
                 <View style={{paddingTop:20}}>
                 <Image source={{uri:'data:image/jpeg;base64,' + this.state.fileData}} style={{alignSelf:'center',borderRadius:100,width:200,height:200,}}/>
                 <View style={{position:'absolute',alignSelf:'center',paddingRight:100}}>
                    {/* <Image source={require('../icons/camera1.png')} style={{alignSelf:'center',width:100,height:100,}}/> */}
                    </View>
                   </View>
                 </TouchableOpacity>:
                 <View>
                   {this.state.image!='NA'?
                  
                   <TouchableOpacity onPress={()=>{this.setState({isVisible:true})}}>
                  <View style={{paddingTop:20}}>
                   <Image source={this.state.login_type!='app'?{uri:this.state.image}:{uri:config.img_url+this.state.image}} style={{alignSelf:'center',borderRadius:100,width:200,height:200,backgroundColor:Colors.imagebackcolor}}/>
                   <View style={{position:'absolute',alignSelf:'center',paddingRight:100}}>
                    {/* <Image source={require('../icons/camera1.png')} style={{alignSelf:'center',width:100,height:100,}}/> */}
                    </View>
                   </View>
                   </TouchableOpacity>
                  :
               <TouchableOpacity onPress={()=>{this.setState({isVisible:true})}}>
                 <Image source={require('../icons/upload_icon.png')} style={{alignSelf:'center',resizeMode:'contain',width:200,height:200,}}/>
                 </TouchableOpacity>}
                 </View> }
             </View>
             <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Bold',fontSize:20,paddingVertical:20}}>Upload profile{"\n"}photo</Text>
               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,alignSelf:'center',lineHeight:20,textAlign:'center'}}>Lorem ipsum dolor sit amet, consectetur{"\n"}adipiscing elit. Nullam sed.</Text>
        </View>  
       {/* ........................................Container finish............................... */}
       
       <View style={{position:"absolute",bottom:20,alignSelf:'center',width:'100%',}}>
     <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.Addphotobtn()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Submit</Text>
               </View>
          </TouchableOpacity>  
         
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
    }
   
})