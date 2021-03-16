import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Alert,Platform,SafeAreaView,Dimensions,Keyboard,TextInput,Modal,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar, ImageBackground} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import UserFooter from './UserFooter'

import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import Icon from 'react-native-vector-icons/AntDesign';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const BannerWidth = Dimensions.get('window').width*80/100;
const filedataimage_arr12 =[{'fileData':'NA','fileUri':'NA','status':true},{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},
{'fileData':'NA','fileUri':'NA','status':false},

]
export default class Postanitem extends Component{
    constructor(props) {
        super(props);
        this.state = { 
           loading: false,
           category_arr:[],
           subcategory_arr:[],
           category_arr1:[],
           subcategory_arr1:[],
           condition_arr:[],
           condition_arr1:[],
           filedataimage_arr12:filedataimage_arr12,
           modalVisable2:false,
           condition_id:'',
           isVisible:false,
           isVisible3:false,
           category_id:'',
           category_name:'Category',
           title:'',
           changeicon:false,
           item_detail:'',
            subcategory_name:'Subcategory',
           subcategory_id:'',
           isVisible4:false,
           selecttype:'category',
           shipping:true,
           pickup:false,
           fileData:'',
           singlestock:true,
           instock:false,
            changelayout:false,
           fileUri:'',
           condition_detail:'condition',
           filedataimage_arr:[],
          user_id:'',
           camraon:false,
           isConnected:true

            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener('didFocus', () => {
        //   this.getcategorydata1()
        //  });
    
    this.getpostitemdata()
    this.getconditiondata()
  
    }
    getpostitemdata=async()=>{
      let post_data= await localStorage.getItemObject('post_item_data')
      if(post_data!=null)
      {
        this.setState({filedataimage_arr:post_data.images,title:post_data.title,item_detail:post_data.item_detail,category_name:post_data.category_name,subcategory_name:post_data.subcategory_name,shipping:true,category_id:post_data.category_id,subcategory_id:post_data.subcategory_id})
        if(post_data.order_type==1)
        {
        this.setState({pickup:true})
        }
      }
      this.getcategorydata()
    }
    // getcategorydata1 = async() => {
    //   let userdata=await localStorage.getItemObject('user_arr')
    //     //-------------------- input validations -----------------
    //  let user_id=userdata.user_id
    //     if(this.state.isConnected===true)
    //   {
     
    //   var url = config.baseURL+'get_category.php?user_id='+user_id+'&user_type=1';
    //    console.log("url:"+url);
    //     const {navigate} = this.props.navigation;
    //  fetch(url,{
    //        method: 'GET',
    //        headers: new Headers(config.headersapi), 
         
    //    }).then( (obj)=> {
       
    //       return obj.json();  
    //    }).then( (obj)=> { 
    //        console.log('obj',obj);
    //     //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
    //        if(obj.success == 'true'){
    //         this.setState({category_arr:obj.category_arr})
    //          }else{
    //            msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
    //            if(obj.account_active_status=="deactivate")
    //            {
    //               this.props.navigation.navigate('Logout')
    //            }
    //           }
    //    }).catch((error)=> {
    //        console.log("-------- error ------- "+error);
    //       //  alert("result error:"+error)
    //        this.setState({loading: false });
    //    });
    //  }
    //    else{
    //     msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    //       }   
    //      }
    getcategorydata = async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------

     let user_id=userdata.user_id
        if(this.state.isConnected===true)
      {
      this.setState({ loading: true,user_id:user_id,category_arr:category_arr_show});
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
        getsubcategorydata = async(category_id) => {
          let userdata=await localStorage.getItemObject('user_arr')
            //-------------------- input validations -----------------
         let user_id=userdata.user_id
            if(this.state.isConnected===true)
          {
          this.setState({ loading: true,user_id:user_id});
          var url = config.baseURL+'get_sub_category.php?user_id='+user_id+'&user_type=1&category_id='+category_id;
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
                this.setState({subcategory_arr:obj.sub_category_arr,subcategory_arr1:obj.sub_category_arr})
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
             getconditiondata = async() => {
              let userdata=await localStorage.getItemObject('user_arr')
                //-------------------- input validations -----------------
        
             let user_id=userdata.user_id
                if(this.state.isConnected===true)
              {
              this.setState({loading:true,});
              var url = config.baseURL+'get_condition.php?user_id='+user_id+'&user_type=1';
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
                    this.setState({condition_arr:obj.condition_arr,condition_arr1:obj.condition_arr})
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
   Pickerimagebtn=()=>{
 
    ImagePicker.openPicker({
      // width: 800,
      // height: 800,
       cropping:true,
      // cropperCircleOverlay: true,
       sortOrder:'none',
       
    // compressImageMaxWidth: 1000,
    // compressImageMaxHeight: 1000,
    cropperToolbarTitle:'Zoom',
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif:true,
      minFiles:1,
      maxFiles:5,
      multiple:true,
      includeBase64:true, 
      avoidEmptySpaceAroundImag:false,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    }).then(response => {
      console.log('response',response);
      // let data1=this.state.filedataimage_arr12
      let data=this.state.filedataimage_arr
      
      
      // let file_json1={fileUri:'NA',
      //        fileData:'NA','status':true}
      //         if(response.length==1)
      //         {
      //            data1.push(file_json1)
      //         }
             
      for(let j=0; j<response.length; j++)
      {
        let file_json={fileUri:response[j].path,
            fileData:response[j].data}
            data.push(file_json)
            // data1[j]=(file_json1)
        }
     
                 this.setState({
                    filePath: response,
                     fileData: response.data,
                      fileUri: response.path,
                      imagedata:true,
                      errorno:0,
                      camraon:true,
                      filedataimage_arr:data,
                   
              });
    }).catch(e => {
      console.log('eror',e)
     
    });
   }
   Pickerimagebtn1=()=>{
      ImagePicker.openPicker({
      // width: 800,
      // height: 800,
       cropping: false,
      // cropperCircleOverlay: true,
       sortOrder:'none',
       
    // compressImageMaxWidth: 1000,
    // compressImageMaxHeight: 1000,
    cropperToolbarTitle:'Zoom',
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      includeBase64:true,
      avoidEmptySpaceAroundImag:false,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    }).then(response => {
      console.log(response);
      let data=this.state.filedataimage_arr
      for(let j=0; j<response.length; j++)
      {
        let file_json={fileUri:response[j].path,
        fileData:response[j].data}
        data.push(file_json)
            // data1[j]=(file_json1)
        }
                  this.setState({
                    filePath: response,
                     fileData: response.data,
                      fileUri: response.path,
                      imagedata:true,
                      errorno:0,
                      camraon:true,
                      filedataimage_arr:data
              });
    }).catch(e => {
      console.log('eror',e)
      if(e=='Error: CannotError: Cannot access images. Please allow access if you want to be able to select images. access images. Please allow access if you want to be able to select images.')
      {
        msgProvider.cameradeny();
      }
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
      avoidEmptySpaceAroundImag:false,
      includeExif: true,
      includeBase64:true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    }).then(response => {
      console.log(response);


          

        
      let data=this.state.filedataimage_arr
            let file_json={ fileUri:response.path,
              fileData:response.data,}
              data.push(file_json)
                  this.setState({
                    filePath: response,
                     fileData: response.data,
                      fileUri: response.path,
                      imagedata:true,
                      errorno:0,
                      camraon:true,
                      filedataimage_arr:data,
                     
              });
    }).catch(e => {
      console.log('eror',e)
    });
   }
   Cameraimagebtn1=()=>{
    ImagePicker.openCamera({
     // width: 800,
      // height: 800,
      cropping: false,
      // cropperCircleOverlay: true,
       sortOrder:'none',
    // compressImageMaxWidth: 1000,
    // compressImageMaxHeight: 1000,
    cropperToolbarTitle:'Zoom',
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      avoidEmptySpaceAroundImag:false,
      includeExif: true,
      includeBase64:true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    }).then(response => {
      console.log(response);
      let data=this.state.filedataimage_arr
            let file_json={ fileUri:response.path,
              fileData:response.data,}
              let file_json1={ fileUri:'NA',
                fileData:'NA','status':true}
                
                data.push(file_json)
                  this.setState({
                    filePath: response,
                     fileData: response.data,
                      fileUri: response.path,
                      imagedata:true,
                      errorno:0,
                      camraon:true,
                      filedataimage_arr:data
              });
    }).catch(e => {
      console.log('eror',e)
    });
   }
   
      // btnOpneImageOption = () => {


      // const options = {
      //        storageOptions: {
      //         skipBackup: true,
      //          path: 'images',
      //          cropping: true,
      //       },
          
      //       // storageOptions.cameraRoll:true,
      //       maxWidth: 700,
      //           maxHeight: 700,
      //           quality: 0.4
      //     };
        
      //     ImagePicker.showImagePicker(options, (response) => {
      //       console.log('Response = ', response);
        
      //       if (response.didCancel) {
      //         console.log('User cancelled image picker');
      //       } else if (response.error) {
      //         console.log('ImagePicker Error: ', response.error);
      //       } else if (response.customButton) {
      //         console.log('User tapped custom button: ', response.customButton);
      //       } else {
      //         let data=this.state.filedataimage_arr
      //       let file_json={ fileUri:response.uri,
      //         fileData:response.data,}
      //         data.push(file_json)
      //           this.setState({
      //               filePath: response,
      //                fileData: response.data,
      //                 fileUri: response.uri,
      //                 imagedata:true,
      //                 errorno:0,
      //                 camraon:true,
      //                 filedataimage_arr:data
      //         });
      //         // localStorage.setItemObject('postitemdata',data)
      //       }
      //     });
        
      // }
        selecttypebtn=(item)=>{
            if(this.state.selecttype=='category')
            {
            this.getsubcategorydata(item.category_id)
              this.setState({modalVisable2:false,category_name:item.category_name,category_id:item.category_id})
               if(item.category_id>6 && item.category_id<10)
               {
                 this.setState({changelayout:true})
               }
               else if(this.state.changelayout==true){
                    this.setState({changelayout:false})
                 }
            }
            else if(this.state.selecttype=='subcategory'){
              this.setState({modalVisable2:false,subcategory_name:item.name,subcategory_id:item.subcategory_id})
            }
          }
          chooseconditiondata=(item,index)=>{
                let data=this.state.condition_arr
                for(let i=0; i<data.length; i++)
                {
                  if(i==index)
                  {
                     data[i].status=true
                  }
                  else{
                      data[i].status=false
                   }
                }

            this.setState({condition_arr:data,condition_detail:item.title,condition_id:item.item_condition_id})
          }
nextbtn=()=>{
  if(this.state.filedataimage_arr.length<=0)
  {
    this.setState({errorno:1})
    return false
  }
  if(this.state.filedataimage_arr.length>5)
  {
        alert('You can add only 5 product photo. remove one of these if you want to change photos')
    return false
  }
  if(this.state.category_id.length<=0)
  {
    this.setState({errorno:4})
    return false
  }
  if(this.state.subcategory_id.length<=0)
  {
    this.setState({errorno:5})
    return false
  }
  if(this.state.title.length<=0)
  {
    this.setState({errorno:2})
    return false
  }
  
  if(this.state.item_detail.length<=0)
  {
    this.setState({errorno:3})
    return false
  }
  console.log('this.state.changelayout',this.state.changelayout)
  if(this.state.changelayout==false)
  {
  if(this.state.condition_detail=='condition')
  {
    console.log('chl gay bhi')
    this.setState({errorno:6})
    return false
  }
}
let order_type=0
if(this.state.changelayout==false)
{
 
   if(this.state.pickup==true)
   {
     order_type=1
   }
  }else{
    order_type=3
  }
   console.log('chl gay bhi kya bat h bahi ')
  let final_item_json={
     'images':this.state.filedataimage_arr,
     'title':this.state.title,
     'item_detail':this.state.item_detail,
     'category_id':this.state.category_id,
      'category_name':this.state.category_name,
       'condition_detail':this.state.condition_detail,
       'condition_id':this.state.condition_id,
      'subcategory_name':this.state.subcategory_name,
      'subcategory_id':this.state.subcategory_id,
      'order_type':order_type,
       'user_id':this.state.user_id

  }
  localStorage.setItemObject('post_item_data',final_item_json)
  this.props.navigation.navigate('Postitemdetails')
}
removeimage=(index)=>{
   let data1=this.state.filedataimage_arr
   data1.splice(index,1);
     this.setState({filedataimage_arr:data1})
  }
  removeallphoto=()=>{
    Alert.alert(
      "Confirm",
      "Do you want to delete selected all photo?",
      [
       { text: 'YES', onPress: () => this.setState({filedataimage_arr:[]}) },
       { text: 'NO', onPress: () => console.log('cancle') },
       
     ],
     { cancelable: true },
  
    )
   }

   SearchFilterFunction=(text)=> {
    //passing the inserted text in textinput
    let data1=this.state.selecttype=='category'?this.state.category_arr1:this.state.subcategory_arr1
    if(this.state.selecttype=='category')
    {
    const newData = data1.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.category_name ? item.category_name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
   
      console.log('data',newData)
      this.setState({
        category_arr:newData,
           search:text,
      });
   
    }
    else if(this.state.selecttype=='subcategory')
    {

      const newData = data1.filter(function(item) {
        //applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
     

      this.setState({
        subcategory_arr:newData,
         search:text,
    });
    }
   
  }
  SearchFilterFunction1=(text)=> {
    //passing the inserted text in textinput
    let data1=this.state.condition_arr1
    const newData = data1.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    
      this.setState({
         condition_arr:newData,
         search1:text,
      });
    
   
  }
    render(){
        console.log('cikasd')
      console.log('sjjgj',this.state.filedataimage_arr)
return(
    <View style={styles.container}>
           {/* <Loader loading={this.state.loading}/> */}
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
                   {this.state.changeicon==false && <Icon name='search1' color='gray' size={20} />}
                   {this.state.changeicon==true && <Icon name='arrowleft' color='gray' size={22} />}
                   </TouchableOpacity>
                    <TextInput
                    placeholder={this.state.selecttype=='category'?'Search Category':'Search Subcategory'}
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
                  data={this.state.selecttype=='category'?this.state.category_arr:this.state.subcategory_arr}
                   renderItem={({item,index})=>{
                     if(this.state.category_arr!='NA')
                      {
                   return(

                    <TouchableOpacity onPress={()=>{this.selecttypebtn(item)}}>
                      <View style={{borderBottomColor:'#f2f2f2',borderBottomWidth:1,alignContent:'center',paddingVertical:6}}>
                          {this.state.selecttype=='category' && <View style={{flexDirection:'row',}}>
                            <Image source={item.category_img!='NA'?{uri:config.img_url+item.category_img}:require('../icons/noimage.png')} style={{width:40,height:40,alignSelf:'center',borderRadius:20,backgroundColor:Colors.imagebackcolor}}/>
                            <Text style={{color:'black',paddingLeft:14,fontFamily:'Ubuntu-Bold',fontSize:15,paddingVertical:15}}>{item.category_name}</Text>  
                            </View>}
                         {this.state.selecttype!='category' && <View style={{flexDirection:'row',}}>
                         <Image source={item.image!='NA'?{uri:config.img_url+item.image}:require('../icons/noimage.png')} style={{width:40,height:40,alignSelf:'center',borderRadius:20,backgroundColor:Colors.imagebackcolor}}/>
                         <Text style={{color:'black',paddingLeft:14,fontFamily:'Ubuntu-Bold',fontSize:15,paddingVertical:15}}>{item.name}</Text>  
                         </View>}
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
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Ubuntu-Bold',fontSize:22}}>Choose media</Text>
                       <TouchableOpacity onPress={()=>{this.setState({isVisible:false});Platform.OS === 'android' ?this.Cameraimagebtn():this.Cameraimagebtn1()}} >
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Take a photo</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});Platform.OS === 'android' ?this.Pickerimagebtn():this.Pickerimagebtn1()}}>
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
        
         <Modal     
          animationType = {"slide"}
          transparent={false}
          visible = {this.state.isVisible4}
          onRequestClose = {() =>{ this.setState({isVisible4:false}) } }>
         <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
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
                    <Text style={{color:'black',fontSize:16,fontFamily:'Ubuntu-Bold'}}>{'condition'}</Text>
                    <TouchableOpacity onPress={()=>{this.setState({isVisible4:false})}}>
                    <Text style={{color:'#1085e6',fontSize:15,fontFamily:'Ubuntu-Medium'}}>Done</Text>
                    </TouchableOpacity>
               </View> 
               <View style={{flexDirection:'row',paddingTop:15,paddingBottom:5,width:'100%',}}>
                   <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.setState({changeicon:!this.state.changeicon})}}>
                   {this.state.changeicon==false && <Icon name='search1' color='gray' size={20} />}
                   {this.state.changeicon==true && <Icon name='arrowleft' color='gray' size={22} />}
                   </TouchableOpacity>
                    <TextInput
                    placeholder={'Search condition'}
                    placeholderTextColor='gray'
                   onFocus={()=>{this.setState({changeicon:true})}}
                    onChangeText={text => this.SearchFilterFunction1(text)}
                    onClear={text => this.SearchFilterFunction1('')}
                    value={this.state.search1}
                    showCancel={true}
                    style={{width:'75%',alignSelf:'center',fontSize:15}}
                    />
                 
               </View>  
          </View> 
          <View style={{width:'98%',marginLeft:40,paddingBottom:120,paddingTop:20,alignSelf:'center',}}>
          <FlatList
                  data={this.state.condition_arr}
                   renderItem={({item,index})=>{
                     if(this.state.condition_arr!='NA')
                      {
                   return(

                    <TouchableOpacity onPress={()=>{this.chooseconditiondata(item,index)}}>
                      <View style={{borderBottomColor:'#f2f2f2',borderBottomWidth:1,alignContent:'center',paddingVertical:6}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:26}}>
                        
                        <Text style={{color:'black',paddingLeft:14,fontFamily:'Ubuntu-Bold',fontSize:15,paddingVertical:15}}>{item.title}</Text>  
                            {item.status==false?  
                        <View style={{width:20,height:20,borderColor:'gray',marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                         <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                        </View> : <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                        <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                      </View>}
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
        
        {/* //=----------------------header part---------=000------ */}
     
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Upload Product/Service</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.nextbtn()}}> 
            <View style={{width:'100%',alignSelf:'center'}} >
              <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>NEXT</Text>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
            <View style={{borderBottomWidth:1,borderBottomColor:Colors.buttoncolor,width:'60%'}}></View>
           <View style={{borderBottomWidth:0.7,borderBottomColor:'#dedede',width:'40%'}}></View>
        </View>
       
        {/* ..............................heaser finish................................ */}
        <ScrollView style={{marginBottom:65}} keyboardShouldPersistTaps='always'   showsVerticalScrollIndicator={false} keyboardDismissMode='none'>
        <View style={{paddingHorizontal:20,paddingTop:20}}>
        <TouchableOpacity onPress={()=>{this.setState({selecttype:'category',errorno:0,modalVisable2:true})}}>
         <View style={[styles.inputcontainer,{  marginTop:5,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
            <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Choose Category</Text> 
      
              <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:8}}>
              <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'black'}}>{this.state.category_name}</Text> 
                  <Icon name='caretdown' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
              </View>
        
        </View>
        </TouchableOpacity>
        {this.state.errorno==4 && 
                 <Text style={styles.errortextstyle}>Please select category</Text>
                }
        <TouchableOpacity onPress={()=>{this.state.subcategory_arr.length!=0?this.state.subcategory_arr!='NA'?this.setState({selecttype:'subcategory',modalVisable2:true,errorno:0}):alert('Please Choose other category!'):alert('Choose the category first!')}}>
        <View style={[styles.inputcontainer,{marginTop:15,marginBottom:10,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
            <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Choose Subcategory</Text> 
             <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:8}}>
              <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'black'}}>{this.state.subcategory_name}</Text> 
                  <Icon name='caretdown' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
              </View>
        </View>
        </TouchableOpacity>
        {this.state.errorno==5 && 
                 <Text style={styles.errortextstyle}>Please select subcategory</Text>
                }
        {this.state.changelayout==false && <Text style={{fontSize:14,fontFamily:'Ubuntu-Bold',color:'black'}}>Details</Text>}
      {this.state.changelayout==false && <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
            <TouchableOpacity style={{paddingVertical:10,width:'35%',alignSelf:'center'}} onPress={()=>{this.setState({shipping:true,pickup:false})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
                 {this.state.shipping==false?  
                    <View style={{width:20,height:20,borderColor:'gray',marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                         <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                   </View> : <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                </View>}
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Shipping</Text> 
               </View>
          </TouchableOpacity>
          
           <TouchableOpacity style={{paddingVertical:10,width:'40%',alignSelf:'center'}} onPress={()=>{this.setState({shipping:false,pickup:true})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
                 {this.state.pickup==false? <View style={{width:20,height:20,borderColor:'gray',marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                </View>:  <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                </View>}
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Pick up</Text> 
               </View>
          </TouchableOpacity>
          </View>}
          {/* <TouchableOpacity onPress={()=>{this.state.filedataimage_arr.length<5?this.setState({isVisible:true}):alert('You can add only 5 product photo. remove one of these if you want to change photos')}} > 
          <View style={{width:'100%',flexDirection:'row'}}>
            <View style={{paddingBottom:15,width:'20%'}}>
                    <Image source={require('../icons/business-image.png')} style={{width:50,height:50}}/>
             </View>
         <View style={{paddingBottom:15,width:'80%',}}> 
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Product Photo</Text>  
             
             <Text style={{color:'black',fontFamily:'Ubuntu-Light',lineHeight:17,fontSize:13}}>Upload your most attractive images to entice your customer</Text>
          </View>
          </View>
          </TouchableOpacity> */}
          <Text style={{fontSize:14,fontFamily:'Ubuntu-Bold',color:'black',paddingBottom:3}}>Add Photo</Text>
               
           <View style={{width:'100%',alignSelf:'center',flexDirection:'row'}}>
           <TouchableOpacity onPress={()=>{this.state.filedataimage_arr.length<5?this.setState({isVisible:true}):alert('You can add only 5 product photo. remove one of these if you want to change photos')}}>
                    <View style={{alignSelf:'center',width:70,height:70,marginLeft:3,borderWidth:1,borderColor:'#f5f5f5',alignContent:'center',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:12}}>
                       <View >
                             <Image source={require('../icons/plus.png')} style={{width:50,height:50}}/>
                         </View>
                      
                     </View>
                     </TouchableOpacity>
             <FlatList
              data={this.state.filedataimage_arr}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item,index})=>{
                  return(
                   
                    <View style={{alignSelf:'center',width:70,height:70,marginLeft:3,borderWidth:1,borderColor:'#f5f5f5',alignContent:'center',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:12}}>
                       <View>
                       <Image source={{uri:'data:image/jpeg;base64,'+item.fileData}} style={{alignSelf:'center',width:70,height:70,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
                        <View style={{position:'absolute',alignSelf:'flex-end',alignItems:'flex-end',}}>
                                 <TouchableOpacity onPress={()=>{this.removeimage(index)}} style={{marginRight:1,marginTop:1}}>
                                       <Icon2 name='cross' size={20} color={Colors.buttoncolor} style={{alignSelf:'center',backgroundColor:'white'}}/>
                                        {/* <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:18,height:18}}/> */}
                                 </TouchableOpacity>
                         </View>
                         </View>
                      
                     </View>
   
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             </View>
          {this.state.errorno==1 && 
                 <Text style={[styles.errortextstyle,{paddingBottom:6}]}>Please choose at least one product photo</Text>
                }
                
          {/* {this.state.filedataimage_arr.length>0 &&
            <FlatList
            data={this.state.filedataimage_arr}
            numColumns={5}
             renderItem={({item,index})=>{
              return(
                <View  style={{paddingTop:10,width:'19%',marginLeft:'1%',marginBottom:10}}> 
                <View style={{width:'98%',alignSelf:'center',}}>
                <Image source={{uri:'data:image/jpeg;base64,' + item.fileData}} style={{alignSelf:'center',width:'100%',height:screenWidth*19/100,borderRadius:5}}/>
                <View style={{position:'absolute',alignSelf:'flex-end',alignItems:'flex-end',}}>
                         <TouchableOpacity onPress={()=>{this.removeimage(index)}} style={{marginRight:1,marginTop:1}}>
                           <Icon2 name='cross' size={20} color={Colors.buttoncolor} style={{alignSelf:'center',backgroundColor:'white'}}/>
                                
                         </TouchableOpacity>
                 </View>
                 <View> 
                  
                 </View>
              </View>
              </View>
             )
            
           }}
           keyExtractor={(item, index) => index.toString()}
           />
          } */}
          <View style={{paddingBottom:10}}>

        <Text style={{color:'gray',paddingLeft:10,fontFamily:'Ubuntu-Medium',fontSize:12.5}}>Photo: {this.state.filedataimage_arr.length}/5 only you can add 5 photo from your camera and gallery</Text>
            </View>
      {this.state.filedataimage_arr.length>1 &&
          <TouchableOpacity onPress={()=>{this.removeallphoto()}}>
            <View style={{flexDirection:'row',paddingBottom:10}}>
            <Icon1 name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
            <Text style={{color:Colors.buttoncolor,paddingLeft:10,fontFamily:'Ubuntu-Medium',fontSize:12.5}}>Remove all photo</Text>
            </View>
          </TouchableOpacity> 
       }
        
        
        <View style={styles.inputcontainer}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Product/Service Name</Text> 
             <TextInput
                    placeholder='Enter Product/Service Name'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({title:txt})}}
                    returnKeyType='done'
                    returnKeyLabel='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    maxLength={30}
                    style={styles.textfiledinput}
                    value={this.state.title}
                   />
          </View>
          {this.state.errorno==2 && 
                 <Text style={styles.errortextstyle}>Please enter Product/Service Name</Text>
                }
                    <View style={[styles.inputcontainer,{ marginTop:15,}]}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Item Details</Text> 
                        <TextInput
                            style={styles.Textarea_Style}
                            placeholder={'Describe your product/service in more details...'}
                            ref={(ref)=>{this.discription=ref}}
                             placeholderTextColor={Colors.textcolor}
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                            blurOnSubmit={true}
                             underlineColorAndroid={'transparent'}
                            onChangeText={(txt) => this.setState({item_detail:txt})}
                            returnKeyType="done"
                            returnKeyLabel="done"
                            onSubmitEditing={()=>{Keyboard.dismiss();}}
                            value={this.state.item_detail}
                        />
                         </View>
                        {this.state.errorno==3 && 
                 <Text style={styles.errortextstyle}>Please enter item details</Text>
                }

          {this.state.changelayout==false &&  <TouchableOpacity onPress={()=>{this.state.condition_arr=='NA'?this.getconditiondata():this.setState({selecttype:'condition',errorno:0,isVisible4:true})}}>
                   <View style={[styles.inputcontainer,{   marginTop:15,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
                   <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Product/service Condition</Text> 
      
                   <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:8}}>
                    <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'black'}}>{this.state.condition_detail}</Text> 
                  <Icon name='caretdown' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                </View>
        
            </View>
          </TouchableOpacity>}
        {/* <View style={[styles.inputcontainer,{ marginTop:15,}]}>
         <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>product/service Condition</Text> 
                        <TextInput
                        style={styles.Textarea_Style}
                            placeholder={'Describe your product/service in Brief details...'}
                            ref={(ref)=>{this.Condition_detail=ref}}
                             placeholderTextColor={Colors.textcolor}
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                            blurOnSubmit={true}
                             underlineColorAndroid={'transparent'}
                            onChangeText={(txt) => this.setState({condition_detail:txt})}
                            returnKeyType="done"
                            returnKeyLabel="done"
                            onSubmitEditing={()=>{Keyboard.dismiss();}}
                            value={this.state.Condition_detail}
                        />
                         </View> */}
                         {this.state.errorno==6 && 
                 <Text style={styles.errortextstyle}>Please enter Conditions</Text>
                }
         
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
      
       <UserFooter navigation={this.props.navigation} color={this.state.page}/> 
        
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
 
        backgroundColor:'#FFFFFF',
        // elevation:2,
        // shadowOffset:{width:2,height:2},
        borderRadius:5,
        borderColor:Colors.inputborder,
      borderWidth:1.5,
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
    Textarea_Style:{
        width:'100%',
        color:'black',
        textAlignVertical: 'top',
        fontFamily:'Ubuntu-Medium',
         paddingLeft:10,
        paddingRight:50,
        fontSize:15,
        height:120,
        backgroundColor:'#FFFFFF',
        justifyContent: "flex-start",
        // elevation:8,
      
        borderRadius:8,
        
       
    },
   
})