import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,SafeAreaView,TouchableOpacity,Modal,Alert,BackHandler,Keyboard,FlatList,StatusBar} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import Loader from '../Loader';
import Icon from 'react-native-vector-icons/AntDesign'
import NetInfo from '@react-native-community/netinfo';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const BannerWidth = Dimensions.get('window').width*80/100;
export default class Usereditprofile extends Component{
    constructor(props){
        super(props)
        this.state={
            menu:'',
            notification:false,
            fname:'',
            page:this.props.navigation.getParam('page'),
            user_id:'',
            mobile:'',
            fileData:'',
            fileUri:'',
            camraon:false,
            isVisible:false,
            errorno:0,
            email:'',
            image:'NA',
            notification:true,
            isConnected:true,
            loading:false,
            login_type:'app',
            address:null,
            errono:0,
        }
    }

    componentDidMount(){
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state => {
         this.setState({isConnected:state.isConnected})
           });
          this.userdata()
       }
     userdata=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
          console.log('userdata',userdata)
          if(userdata.notification_status==1)
                 {
                     this.setState({notification:false})
                 }
           this.setState({fname:userdata.name,email:userdata.email,mobile:userdata.mobile,
            user_id:userdata.user_id,image:userdata.image,login_type:userdata.login_type,address:userdata.address
        })
       
       }
      //  btnOpneImageOption = () => {
      //   const options = {
      //          storageOptions: {
      //           skipBackup: true,
      //            path: 'images',
                
      //         },
      //         allowsEditing:true,
      //         maxWidth: 700,
      //         maxHeight: 700,
      //         quality: 0.4
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
            Pickerimagebtn=()=>{
              ImagePicker.openPicker({
                width: 800,
                height: 800,
                cropping: true,
                // cropperCircleOverlay: true,
                sortOrder:'none',
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
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
                width: 800,
                height: 800,
                cropping: true,
                // cropperCircleOverlay: true,
                sortOrder:'none',
                compressImageMaxWidth: 1000,
                compressImageMaxHeight: 1000,
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
       Editbtn=()=>{
        Keyboard.dismiss();
        let user_id =this.state.user_id;
        let f_name = this.state.fname;
        let mobile =this.state.mobile;
        let email =this.state.email;
       console.log('f_name',this.state.f_name)
       console.log('mobile',this.state.mobile)

        if(f_name.length<=0){
             this.setState({errorno:1})
             return false;
        }
       
//         if(mobile.length<=0 ){
//           this.setState({errorno:2})
//           return false;
//      }
//      if(mobile.length<10){
//       this.setState({errorno:3})
//       return false;
//  }
       
            //-------------------- Call API to server ------------------
            if(this.state.isConnected===true)
             {
             var url = config.baseURL+'edit_profile.php';
                console.log("url:"+url);
        //    alert(url);
     
        const {navigate} = this.props.navigation;
      
        this.setState({loading:true})
        var data = new FormData();
        data.append("user_id", user_id);
         data.append("name", f_name);
        if(this.state.mobile!=null)
        {
          data.append("mobile",mobile);
        }
        else{
          data.append("mobile","");
        }
         data.append("email",email);
      if(this.state.address!=null)
      {
        data.append("address",this.state.address);
      }
      else{
        data.append("address","");
      }
         data.append("latitude",0);
         data.append("longitude",0);
         data.append('login_type',this.state.login_type)
         data.append("user_type", 1);
         if(this.state.camraon==true)
         {
           data.append('image', {
             uri: this.state.fileUri,
             type: 'image/jpg', // or photo.type
             name: 'image.jpg'
           });
           
         }
        console.log('data',data)
      
       fetch(url,{
         method: 'POST',
         headers: new Headers(config.headersapi), 
        body:data,
    }).then(function (obj) {
      this.setState({loading:false});
       return obj.json();  
    }.bind(this)).then((obj)=> { 
      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
     console.log('obj',obj)
    //  alert(JSON.stringify(obj))
      if(obj.success == 'true'){
        // this.setState({loading:false,});
                 var user_details = obj.user_details; 
               msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
               localStorage.setItemObject('user_arr', user_details);
               setTimeout(() => {
                  firebaseprovider.firebaseUserCreate();
              }, 2000);
              if(this.state.page=='view')
              {
                this.props.navigation.navigate('Viewprofilepage')
              }
              else{
                this.props.navigation.navigate('Account')
              }
             
              } 
             else{
              // this.setState({loading:false,});
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
    render(){
return(
    <View style={styles.container}>
      <Loader loading={this.state.loading}/>
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
        <View style={{backgroundColor:Colors.buttoncolor,paddingVertical:15,height:screenHeight*30/100}}>
     <TouchableOpacity style={{paddingTop:10}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',marginLeft:15}}>
                  <Image source={require('../icons/w-back.png')} style={{width:12,height:15,}}/>
             </View>
          </TouchableOpacity>
      <View style={{paddingVertical:10,alignItems:'center',justifyContent:'center',}}>
               {this.state.camraon==false && <View>
                    {this.state.image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:90,height:90,borderRadius:25,backgroundColor:'#f0f0f0'}}/>:
                       <Image source={this.state.login_type=='app'?{uri:config.img_url1+this.state.image}:{uri:this.state.image}} style={{width:90,height:90,borderRadius:50,backgroundColor:Colors.imagebackcolor}}/>
                     }
              </View> }
               {this.state.camraon==true &&
                 <Image source={{uri:'data:image/jpeg;base64,' + this.state.fileData}} style={{width:94,height:94,borderRadius:52,backgroundColor:Colors.imagebackcolor}}/>
               }
               <TouchableOpacity onPress={()=>{this.setState({isVisible:true})}}>
                    <View style={{width:145,backgroundColor:'#FFFFFF',marginTop:13,borderRadius:8}}>
                          <Text style={{fontSize:14,color:Colors.headercolor,textAlign:'center',paddingVertical:9,}}>CHANGE PHOTO</Text>
                     </View>
                   </TouchableOpacity>
            </View>
            </View>
            <ScrollView style={{paddingTop:20,paddingBottom:20}} showsVerticalScrollIndicator={false}>
            <View style={{paddingHorizontal:20,paddingTop:20}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Edit Profile</Text>
              <View style={{paddingLeft:10,marginTop:15}}>
             <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Name</Text>
             </View>
             <View style={styles.inputcontainer}>
             <TextInput
                    placeholder='Full Name'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({fname:txt})}}
                    maxLength={50}
                    value={this.state.fname}
                    style={styles.textfiledinput}
                   />
          </View>
               {this.state.errorno==1 && 
                  <Text style={styles.errortextstyle}>Please enter full name</Text>
                }
             <View style={{paddingLeft:10}}>
                   <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Email</Text>
              </View>
             <View style={styles.inputcontainer}>
           
             <TextInput
                    placeholder='Email'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    returnKeyLabel='done'
                         returnKeyType='done'
                         editable={false}
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({email:txt})}}
                    maxLength={50}
                    value={this.state.email}
                    style={styles.textfiledinput}
                   />
          </View>
        
                   {/* <View style={{paddingLeft:10,}}>
             <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Mobile</Text>
             </View> */}
             {/* <View style={styles.inputcontainer}>
           
             <TextInput
                    placeholder='Mobile'
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({mobile:txt})}}
                    maxLength={10}
                    value={this.state.mobile!=null?""+this.state.mobile+"":''}
                    style={styles.textfiledinput}
                   />
          </View> */}
               {/* {this.state.errorno==2 && 
                    <Text style={styles.errortextstyle}>Please enter mobile</Text>
                }
                   {this.state.errorno==3 && 
                    <Text style={styles.errortextstyle}>please enter valid mobile number</Text>
                   } */}
                 {/* <View style={{paddingLeft:10}}>
                    <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Address</Text>
                 </View>
             <View style={styles.inputcontainer}>
           
             <TextInput
                    placeholder='Address'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({address:txt})}}
                    maxLength={70}
                    value={this.state.address!=null?this.state.address:''}
                    style={styles.textfiledinput}
                   />
          </View> */}
        

          

          <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,marginTop:15,alignItems:'center'}]} onPress={()=>{this.Editbtn()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Update</Text>
               </View>
            </TouchableOpacity>

           
         </View>   
                    
                   
              </ScrollView>  
          
       
          {/*--------------------------------- containfinish---------------------------- ---- */}
          {/* --------------------------------footer start------------------------- */}
          {/* <View style={{position:'absolute',bottom:5,left:0,right:0}}>
              <TouchableOpacity  onPress={()=>{this.Editbtn()}} style={{width:'90%',alignSelf:'center',paddingTop:10}}>
                       <View style={styles.button}>
                        <Text style={{color:'#FFFFFF',fontSize:15,fontWeight:'bold',letterSpacing:1,textAlign:'center'}}>UPDATE</Text>
                       </View>
                   </TouchableOpacity>
                   </View> */}
    </View>
)
    }
}
const styles=StyleSheet.create({
    container:{
 flex:1,
 backgroundColor:'#FFFFFF'
    },
headersearchbar:{
    width:screenWidth,
    alignSelf:'center',
    backgroundColor:Colors.lightpink
  },
  filedcontainer:{
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:20
},
filedtext:{
  color:'black',
  fontSize:14.5,
  paddingLeft:20
},
textfiledinput:{
    paddingVertical:7,
    color:'black',
    fontFamily:'Ubuntu-Medium',
    fontSize:14,
    paddingLeft:12,
       width:'100%',
     
  },
  inputcontainer:{
     
     backgroundColor:'#FFFFFF',
      // elevation:2,
      // shadowOffset:{width:2,height:2},
      borderColor:Colors.inputborder,
      borderWidth:1.5,
      borderRadius:5,
      marginVertical:7,
      alignSelf:'center',
      paddingHorizontal:7,width:'100%'
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
