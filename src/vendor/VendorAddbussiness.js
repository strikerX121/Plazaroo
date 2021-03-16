import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,SafeAreaView,TextInput,FlatList,Modal,Keyboard,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Loader from '../Loader';

import Icon2 from 'react-native-vector-icons/Entypo'
import NetInfo from '@react-native-community/netinfo';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const BannerWidth = Dimensions.get('window').width*80/100;
export default class VendorAddbussiness extends Component{
    constructor(props) {
        super(props);
        this.state = { 
             loading: false,
             player_id:'',
             HidePassword:false,
             isConnected:true,
             refresh:false,
             modalVisable2:false,
             isVisible:false,
             category_arr:[],
             category_arr1:[],
             category_id:'',
             category_name:'',
             bussiness_name:'',
             bussiness_email:'',
             description:'',
             fileData:'',
             fileUri:'',
             camraon:false,
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
    this.getcategorydata()
    }
   
    getcategorydata = async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
     let user_id=userdata.user_id
        if(this.state.isConnected===true)
      {
      this.setState({ loading: true,category_arr:category_arr_show});
      var url = config.baseURL+'get_category.php?user_id='+user_id+'&user_type=1';
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
            this.setState({category_arr:obj.category_arr,category_arr1:obj.category_arr})
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
         letstartbtn = async() => {
          let userdata=await localStorage.getItemObject('user_arr')
          let user_id=userdata.user_id
          var name = this.state.bussiness_name;
           var email = this.state.bussiness_email;
           var description = this.state.description;
           var category_id = this.state.category_id;
       //-------------------- input validations -----------------
       if(name.length<=0){
        this.setState({errorno:1})
       return false;
       } 
       if(category_id.length<=0){
          this.setState({errorno:2})
         return false;
         } 
       if(email.length<=0){
                  this.setState({errorno:3})
                   return false;
                } 
               else{
                const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (reg.test(email) !== true){
                  this.setState({errorno:4})
                    return false;
                }
              }
       if(description.length<=0){
            this.setState({errorno:5})
           return false;
             }   
             if(this.state.camraon==false)
             {
              this.setState({errorno:6})
              return false;
             }     
                Keyboard.dismiss()   
               
       //this.loadingStart();
        //-------------------- Call API to server ------------------
         var url = config.baseURL+'vendor_signup_step2.php';
         console.log("url:"+url);
       
         const {navigate} = this.props.navigation;
       
         var data = new FormData();
         data.append("category_id", category_id);
         data.append("name", name);
         data.append("user_id",user_id);
         data.append("email", email);
         data.append("description",description);
         data.append("user_type", 1);
           if(this.state.camraon==true)
             {
            data.append('file', {
            uri: this.state.fileUri,
             type: 'image/jpg', // or photo.type
             name: 'image.jpg'
           });
           }
         console.log('data',data)
         this.setState({ loading: true });
         
         fetch(url,{
             method: 'POST',
             headers: new Headers(config.headersapi), 
             body:data,
         }).then((obj)=> {
          this.setState({ loading:false});
                   return obj.json();  
         }).then( (obj)=> { 
             console.log('obj',obj);
               if(obj.success == 'true'){
                        //msgProvider.alert(msgTitle.success[config.language], obj.msg[config.language], false);
                localStorage.setItemObject('user_arr', obj.user_details);
                  this.props.navigation.navigate('Vendorsuccess')
                   }else{
                 msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                  return false
                }
         }).catch( (error)=> {
             console.log("-------- error ------- "+error);
             msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({
               loading: false,
             });
         });
         //this.loadingEnd();
         //-------------------- Call API to server End ------------------
       }
      //  btnOpneImageOption = () => {
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
      //                    openDate:false,
      //           });
      //         }
      //       });
          
      //       }

            Pickerimagebtn=()=>{
              ImagePicker.openPicker({
               // width: 800,
      // height: 800,
      cropping: true,
      // cropperCircleOverlay: true,
       sortOrder:'none',
    // compressImageMaxWidth: 1000,
    // compressImageMaxHeight: 1000,
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
                console.log('eroor',e)
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
                console.log('eroor',e)
              });
             }      
            SearchFilterFunction=(text)=> {
              //passing the inserted text in textinput
              let data1=this.state.category_arr1
              const newData = data1.filter(function(item) {
                //applying filter for the inserted text in search bar
                const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
              });
             
                console.log('data',newData)
                this.setState({
                  category_arr:newData,
                     search:text,
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
          animationType = {"slide"}
          transparent={false}
          visible = {this.state.modalVisable2}
          onRequestClose = {() =>{ this.setState({modalVisable2:false}) } }>
         <SafeAreaView style={{flex:1,}}>
           <View style={{ borderColor: 'gray',borderBottomWidth: 0,
            shadowOffset: { width: 15, height: 15 },
          borderBottomColor:'gray',
          //  shadowOpacity: 0.26,
           shadowColor: '#000',
             shadowRadius: 2,
           shadowRadius: 1.41,
             elevation: 2.5,
             paddingHorizontal:20}}>
                <View style={{flexDirection:'row',paddingTop:15,justifyContent:'space-between'}}>
                    <Text style={{color:'black',fontSize:16,fontFamily:'Ubuntu-Bold'}}>{this.state.selecttype=='category'?'Category':'Subcategory'}</Text>
                   <TouchableOpacity onPress={()=>{this.setState({modalVisable2:false})}}>
                   <Text style={{color:'#1085e6',fontSize:15,fontFamily:'Ubuntu-Medium'}}>Done</Text>
                   </TouchableOpacity>
               </View> 
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:5,width:'100%',}}>
                   <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.setState({changeicon:!this.state.changeicon})}}>
                   {this.state.changeicon==false && <Icon1 name='search1' color='gray' size={20} />}
                   {this.state.changeicon==true && <Icon1 name='arrowleft' color='gray' size={22} />}
                   </TouchableOpacity>
                    <TextInput
                    placeholder={'Search Category'}
                    placeholderTextColor='gray'
                     onFocus={()=>{this.setState({changeicon:true})}}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    onClear={text => this.SearchFilterFunction('')}
                    value={this.state.search}
                    showCancel={true}
                    style={{width:'75%',alignSelf:'center',fontSize:15}}
                    />
                 
               </View>  
          </View> 
          <View style={{width:'98%',marginLeft:40,paddingBottom:120,paddingTop:20,alignSelf:'center',}}>
          <FlatList
                  data={this.state.category_arr}
                   renderItem={({item,index})=>{
                     if(this.state.category_arr!='NA')
                      {
                   return(
                    <TouchableOpacity onPress={()=>{this.setState({modalVisable2:false,category_name:item.category_name,category_id:item.category_id})}}>
                      <View style={{borderBottomColor:'#f2f2f2',borderBottomWidth:1,alignContent:'center',paddingVertical:6}}>
                         <View style={{flexDirection:'row',}}>
                           <Image source={item.category_img!='NA'?{uri:config.img_url+item.category_img}:require('../icons/noimage.png')} style={{width:40,height:40,borderRadius:20,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/> 
                           <Text style={{color:'black',paddingLeft:14,fontFamilyt:'Ubuntu-Bold',fontSize:15,paddingVertical:15}}>{item.category_name}</Text>  
                        </View>

                      </View>
                    </TouchableOpacity>
                   )
                  }
                 }}
                 keyExtractor={(item, index) => index.toString()}
                 />
            </View>  
         </SafeAreaView>
         </Modal>
  
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
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Ubuntu-Bold',fontSize:22}}>Select a Photo</Text>
                       <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Cameraimagebtn()}} >
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Take Photo..</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Pickerimagebtn()}}>
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Choose form Libary..</Text>
                                  </TouchableOpacity>
                          <View style={{width:'100%',alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',marginTop:35,marginBottom:15,alignItems:'flex-end'}}>
                                
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.props.navigation.navigate('Home')}} >
                                    <Text style={{color:'black',fontSize:17,fontFamily:'Ubuntu-Medium',letterSpacing:0.8}}>CANCEL</Text>
                                  </TouchableOpacity>
                             </View>


                            
                    </View>

                 
                 </TouchableOpacity>
         </Modal>
  <ScrollView style={{marginBottom:85}} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'>
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:14,height:16,resizeMode:'contain'}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*33/100,height:30}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Add your business</Text>
             <Text style={{fontSize:14,paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}} numberOfLines={2}>Write details of your{"\n"}business</Text>
             {this.state.camraon==true ?
              <TouchableOpacity style={{width:'100%'}} onPress={()=>{this.setState({isVisible:true})}} > 
             <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
             <View style={{width:'20%',alignSelf:'center'}}>
              <Image source={{uri:'data:image/jpeg;base64,' + this.state.fileData}} style={{alignSelf:'center',width:50,borderRadius:25,height:50}}/>
            </View>
                 <View style={{paddingVertical:15,width:'80%'}}> 
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Business image</Text>
             <Text style={{color:'black',fontFamily:'Ubuntu-Light',lineHeight:17,fontSize:13}}>Dealdelivery uses the following data to personalize an adapt in real-time</Text>
          </View>
         </View>
        </TouchableOpacity>:

<TouchableOpacity style={{width:'100%'}}  onPress={()=>{this.setState({isVisible:true})}}> 
<View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
<View style={{width:'20%',alignSelf:'center'}}>
            <Image source={require('../icons/business-image.png')} style={{alignSelf:'center',width:50,height:50}}/>
       </View>
    <View style={{paddingVertical:15,width:'80%'}}> 
<Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Business image</Text>
<Text style={{color:'black',fontFamily:'Ubuntu-Light',lineHeight:17,fontSize:13}}>Dealdelivery uses the following data to personalize an adapt in real-time</Text>
</View>

   
</View>
</TouchableOpacity>}


        
        {this.state.errorno==6 && 
                 <Text style={styles.errortextstyle}>Please choose business image</Text>
                }
   
       
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Business Name'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({bussiness_name:txt})}}
                    maxLength={20}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                 <Text style={styles.errortextstyle}>Please enter business Name</Text>
                }
   

         
         <View style={styles.inputcontainer}>
          <TouchableOpacity onPress={()=>{this.state.category_arr!='NA'?this.setState({modalVisable2:true,errorno:0}):alert('categories are not available')}}> 
           <View  style={[styles.textfiledinput,{flexDirection:'row',paddingVertical:11}]}>
            {this.state.category_name.length>0?<Text style={{width:'90%',color:'black', fontFamily:'Ubuntu-Medium',}}>{this.state.category_name}</Text>:
            <Text style={{width:'90%'}}>Category</Text>}
                  
               <Icon1 name='caretdown' size={15} color='gray' style={{alignSelf:'center',width:'10%'}}/>
            </View>
            </TouchableOpacity>
         </View>
            
              {this.state.errorno==2 && 
                 <Text style={styles.errortextstyle}>Please select category</Text>
                }
     
      
      <View style={styles.inputcontainer}>
            
            <TextInput
                   placeholder='Business Email'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   returnKeyLabel='done'
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({bussiness_email:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View>
         {this.state.errorno==3 && 
                 <Text style={styles.errortextstyle}>Please enter business email</Text>
                }
      {this.state.errorno==4 && 
                 <Text style={styles.errortextstyle}>Please enter valid business email</Text>
                }
     

        <TextInput
                    style={styles.Textarea_Style}
                            placeholder={'Describe your business in details'}
                            ref={(ref)=>{this.discription=ref}}
                             placeholderTextColor={Colors.textcolor}
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            returnKeyType="done"
                            returnKeyLabel="done"
                            blurOnSubmit={true}
                            maxLength={160}
                           underlineColorAndroid={'transparent'}
                            onChangeText={(txt) => this.setState({description:txt})}
                         />
                      {this.state.errorno==5 && 
                 <Text style={styles.errortextstyle}>Please enter description</Text>
                }
          
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'90%',}}>
            <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.letstartbtn()}}>
                <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Let's Start</Text>
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
    Textarea_Style:{
        width:'100%',
        color:'black',
        textAlignVertical: 'top',
         paddingLeft:20,
        paddingRight:50,
        fontSize:15,
        height:120,
        fontFamily:'Ubuntu-Medium',
        // backgroundColor:'#FFFFFF',
        justifyContent: "flex-start",
        // elevation:8,
        // borderBottomColor:'black',
        // borderBottomWidth:0.6,
        // shadowOpacity:0.9,
        // shadowOffset:{width:2,height:20},
        borderColor:Colors.inputborder,
      borderWidth:1.5,
        borderRadius:8,
        marginTop:10,
       
    },
   
})