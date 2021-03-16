import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Alert,SafeAreaView,Dimensions,Keyboard,TextInput,Modal,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
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
global.selleraddress='NA';

const diraction1=[{'name':'North East',status:false,},
{'name':'North West',status:false,},
{'name':'Central',status:false,},
{'name':'South East',status:false,},
{'name':'South West',status:false,},
]
export default class Postanitem extends Component{
    constructor(props) {
        super(props);
        this.state = { 
           loading: false,
           category_arr:[],
           subcategory_arr:[],
           diraction_arr:diraction1,
           category_arr1:[],
           subcategory_arr1:[],
           condition_arr:[],
           condition_arr1:[],
           isVisible4:false,
           isVisible2:false,
           isVisible3:false,
           condition_id:'',
           isVisible:false,
           singlestock:false,
           instock:true,
           modalVisable2:false,
           category_id:'',
           category_name:'Category',
           diraction_name:'Select location type',
           title:'',
           changeicon:false,
           layout:0,
           item_detail:'',
           item_id:this.props.navigation.getParam('item_id'),
            subcategory_name:'Subcategory',
           subcategory_id:'',
           selecttype:'category',
           availability:'In Stock',
           page:'offer',
           shipping:true,
           price:'',
           pickup:false,
           Condition_detail:'condition',
           fixed:true,
           nagoia:false,
           fileData:'',
           fileUri:'',
           filedataimage_arr:[],
           item_single_arr:{},
           user_id:'',
           tax:'',
           delivery_charge:'',
           condition_detail:'',
           camraon:false,
           isConnected:true,
           addressbar:'',
           availability_id:0,

            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.getpostitemdata1()
         });
    
    this.getpostitemdata()
    this.getconditiondata()
  
    }
    // getpostitemdata=async()=>{
    //   let post_data= await localStorage.getItemObject('post_item_data')
    //   if(post_data!=null)
    //   {
       
    //     if(post_data.order_type==1)
    //     {
    //     this.setState({pickup:true})
    //     }
    //   }
    //   this.getcategorydata()
    // }
    getpostitemdata1= async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
     let user_id=userdata.user_id
        if(this.state.isConnected===true)
      {
      this.setState({user_id:user_id,category_arr:category_arr_show});
      var url = config.baseURL+'get_single_item.php?user_id='+user_id+'&user_type=1&item_id='+this.state.item_id;
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
             let data1=obj.item_single_arr
             let address1={'latitude':data1.latitude,'longitude':data1.longitude,'address':data1.location}
             let category_name='Category'
             let subcategory_name='Subcategory'
             let availability='In Stock'
             let diraction_name='Select location type'
             if(data1.location_type.length>0)
             {
              diraction_name=data1.location_type
             }
             if(data1.availability==0)
             {
              availability='Single Post'
              this.setState({instock:false,singlestock:true})
             }
             if(data1.category_id==7){
              this.setState({layout:1})
             }
           else if(data1.category_id>7 && data1.category_id<10)
             {
             this.setState({layout:2})
             }
             let index= data1.category_arr.findIndex((item)=>{
                return item.category_id==obj.item_single_arr.category_id
             })
             if(index!=-1)
               {
              category_name=data1.category_arr[index].category_name
               }
             let index2= data1.subcategory_arr.findIndex((item1)=>{
              return item1.subcategory_id==data1.subcategory_id
           })
           if(index2!=-1)
               {
                subcategory_name=data1.subcategory_arr[index2].name
               }
             
            this.setState({ filedataimage_arr:data1.item_images,subcategory_name:subcategory_name,diraction_name:diraction_name,availability:availability,availability_id:data1.availability,addressbar:address1,title:data1.item_name,item_detail:data1.description,category_name:category_name,shipping:true,category_id:data1.category_id,subcategory_id:data1.subcategory_id,category_arr:data1.category_arr,price:data1.item_price,tax:data1.tax,delivery_charge:data1.delivery_charge,condition_detail:data1.conditions,condition_id:data1.condition_id})
        if(obj.item_single_arr.order_type==1)
             {
               this.setState({pickup:true,shipping:false})
             }
             if(obj.item_single_arr.price_type==1)
             {
                this.setState({nagoia:true,fixed:false})
              }
         
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
        
       });
     }
       else{
        msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
          }   
         }
    getpostitemdata= async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
         let user_id=userdata.user_id
         if(this.state.isConnected===true)
           {
          this.setState({ loading: true,user_id:user_id,category_arr:category_arr_show});
          var url = config.baseURL+'get_single_item.php?user_id='+user_id+'&user_type=1&item_id='+this.state.item_id;
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
             let data1=obj.item_single_arr
             let address1={'latitude':data1.latitude,'longitude':data1.longitude,'address':data1.location}
             let category_name='Category'
             let subcategory_name='Subcategory'
             let availability='In Stock'
             let diraction_name='Select location type'
             if(data1.location_type.length>0)
             {
              diraction_name=data1.location_type
             }
             if(data1.availability==0)
             {
              availability='Single Post'
              this.setState({instock:false,singlestock:true})
             }
             if(data1.category_id==7){
              this.setState({layout:1})
             }
           else if(data1.category_id>7 && data1.category_id<10)
             {
             this.setState({layout:2})
             }
            
            
             let index= data1.category_arr.findIndex((item)=>{
                return item.category_id==obj.item_single_arr.category_id
             })
             if(index!=-1)
               {
              category_name=data1.category_arr[index].category_name
               }
             let index2= data1.subcategory_arr.findIndex((item1)=>{
              return item1.subcategory_id==data1.subcategory_id
           })
           if(index2!=-1)
               {
                subcategory_name=data1.subcategory_arr[index2].name
               }
             
       this.setState({filedataimage_arr:data1.item_images,subcategory_name:subcategory_name,diraction_name:diraction_name,availability:availability,availability_id:data1.availability,addressbar:address1,title:data1.item_name,item_detail:data1.description,category_name:category_name,shipping:true,category_id:data1.category_id,subcategory_id:data1.subcategory_id,category_arr:data1.category_arr,price:data1.item_price,tax:data1.tax,delivery_charge:data1.delivery_charge,condition_detail:data1.conditions,condition_id:data1.condition_id})
        if(obj.item_single_arr.order_type==1)
             {
               this.setState({pickup:true,shipping:false})
             }
             if(obj.item_single_arr.price_type==1)
             {
                this.setState({nagoia:true,fixed:false})
              }
             
         
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
    // getcategorydata = async() => {
    //   let userdata=await localStorage.getItemObject('user_arr')
    //     //-------------------- input validations -----------------
    //  let user_id=userdata.user_id
    //     if(this.state.isConnected===true)
    //   {
    //   this.setState({ loading: true,user_id:user_id});
    //   var url = config.baseURL+'get_category.php?user_id='+user_id+'&user_type=1';
    //    console.log("url:"+url);
    //     const {navigate} = this.props.navigation;
    //  fetch(url,{
    //        method: 'GET',
    //        headers: new Headers(config.headersapi), 
         
    //    }).then( (obj)=> {
    //     this.setState({loading:false});
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
                this.setState({subcategory_arr:obj.sub_category_arr})
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
    //         //   let data=this.state.filedataimage_arr
    //         // let file_json={ fileUri:response.uri,
    //         //   fileData:response.data,}
    //           this.postimagedatabtn(response.uri)
            
    //             this.setState({
    //                 filePath: response,
    //                  fileData: response.data,
    //                   fileUri: response.uri,
    //                   imagedata:true,
    //                   errorno:0,
    //                   camraon:true,
                     
    //           });
    //           // localStorage.setItemObject('postitemdata',data)
    //         }
    //       });
        
    //       }

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
              includeExif: true,
              includeBase64:true,
              cropperStatusBarColor: 'white',
              cropperToolbarColor: 'white',
              cropperActiveWidgetColor: 'white',
              cropperToolbarWidgetColor: '#3498DB',
            }).then(response => {
              console.log(response);
             
                      // let file_json={ fileUri:response.uri,
                      //   fileData:response.data,}
                        this.postimagedatabtn(response.path)
              
                    
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
           Pickerimagebtn1=()=>{
            ImagePicker.openPicker({
              // width: 800,
      // height: 800,
          cropping:false,
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
             
                      // let file_json={ fileUri:response.uri,
                      //   fileData:response.data,}
                        this.postimagedatabtn(response.path)
              
                    
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
           cropping:true,
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
              this.postimagedatabtn(response.path)
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
        selecttypebtn=(item)=>{
            if(this.state.selecttype=='category')
            {
               this.getsubcategorydata(item.category_id)
              this.setState({modalVisable2:false,category_name:item.category_name,category_id:item.category_id})
               if(item.category_id==7){
                   this.setState({layout:1})
               }
              else if(item.category_id>7 && item.category_id<10)
              {
                this.setState({layout:2})
              }
              else {
                   this.setState({layout:0})
                }
            }
            else if(this.state.selecttype=='subcategory'){
              this.setState({modalVisable2:false,subcategory_name:item.name,subcategory_id:item.subcategory_id})
            }
          }
          edititembtn=()=>{
  if(this.state.filedataimage_arr.length<=0)
  {
    this.setState({errorno:1})
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
  if(this.state.price.length<=0)
  {
    this.setState({errorno:6})
    return false
  }
  if(this.state.tax.length<=0)
  {
    this.setState({errorno:11})
    return false
  }
  if(this.state.layout==0)
  {
  if(this.state.shipping==true)
  {
  if(this.state.delivery_charge.length<=0)
  {
    this.setState({errorno:13})
     return false
   }
   }
  }
  if(this.state.item_detail.length<=0)
  {
    this.setState({errorno:3})
    return false
  }
  console.log('kjflsdjljglsvikad batkh ik]kdfd jfsj')
  if(this.state.layout==0)
  {
   if(this.state.condition_detail=='condition')
     {
       this.setState({errorno:15})
       return false
     }
  }
  if(selleraddress=='NA' && this.state.addressbar.length<=0)
  {
    this.setState({errorno:7})
    return false
  }
  console.log('kjflsdjljglsvikad batkh ik]kdfd jfsj345346346')
 
  let diraction_name1=this.state.diraction_name
  if(this.state.diraction_name=='Select location type')
  {
    diraction_name1=''
  }
  let availability1=0
  if(this.state.layout==0)
        {
          availability1=this.state.availability_id
         if(this.state.availability=='Select Availability')
         {
          this.setState({errorno:18})
          return false
         }
        }
  console.log('phuch gya kya bhia')
  let order_type=0
  if(this.state.layout==0)
  {
    if(this.state.pickup==true)
    {
      order_type=1
    }
   
  }
  else{
    order_type=3
  }
  
  let price_type=0
  if(this.state.nagoia==true)
  {
   price_type=1
  }
let addressbar=this.state.addressbar
   if(this.state.isConnected===true)
   {
   this.setState({ loading: true,});
   let data=new FormData();
   data.append('user_id',this.state.user_id);
   data.append('user_type',1)
   data.append('order_type',order_type)
   data.append('item_id',this.state.item_id)
   data.append('category_id',this.state.category_id)
   data.append('subcategory_id',this.state.subcategory_id)
   data.append('title',this.state.title)
   data.append('description',this.state.item_detail)
   data.append('price',this.state.price)
   data.append('delivery_charge',this.state.delivery_charge)
   data.append('tax',this.state.tax)
   data.append('price_type',price_type)
   data.append('conditions',this.state.condition_detail)
   data.append('location_type', diraction_name1)
   data.append('availability',availability1)
   data.append('condition_id',this.state.condition_id)
   if(selleraddress!='NA')
   {
    data.append('location',selleraddress.address)
   data.append('latitude',selleraddress.latitude)
    data.append('longitude',selleraddress.longitude)
   }
   else{
    data.append('location',addressbar.address)
    data.append('latitude',addressbar.latitude)
     data.append('longitude',addressbar.longitude)
   }
   

  //  for(let i=0; i<this.state.filedataimage_arr.length; i++)
  //  {
  //    data.append('file[]', {
  //      uri: this.state.filedataimage_arr[i].image,
  //       type: 'image/jpg', // or photo.type
  //       name: 'image.jpg'
  //     });
  //  }
     var url = config.baseURL+'edit_items.php'
      console.log("url:"+url);
      console.log('data',data)
       const {navigate} = this.props.navigation;
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
          selleraddress='NA'
           this.props.navigation.goBack();
         
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
// removeimage=(index)=>{
//    let data1=this.state.filedataimage_arr
//    data1.splice(index,1);
//      this.setState({filedataimage_arr:data1})
//   }
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
   removeimage = async(image_id,action) => {
    let userdata=await localStorage.getItemObject('user_arr')
      //-------------------- input validations -----------------
      if(this.state.filedataimage_arr.length<2)
      {
        msgProvider.alert(msgTitle.information[config.language],'Please upload one photo before delete this product photo', false);
        return false
      }
   let user_id=userdata.user_id
      if(this.state.isConnected===true)
    {
    this.setState({ loading: true,user_id:user_id});
    let data=new FormData();
   data.append('user_id',user_id);
   data.append('user_type',1)
   data.append('item_id',this.state.item_id)
   data.append('item_image_id',image_id)
   data.append('action',action)
    var url = config.baseURL+'delete_item_image.php'
     console.log("url:"+url);
     console.log('data',data);
      const {navigate} = this.props.navigation;
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
           if(action=='single')
           {
           let data=this.state.filedataimage_arr
            let index=data.findIndex((item)=>{
              return item.item_image_id==image_id
            })
            if(index!=-1)
            {
              data.splice(index,1);
             }
          this.setState({filedataimage_arr:data})
            }
            else{
              this.setState({filedataimage_arr:[]})
            }
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
       postimagedatabtn = async(image) => {
        let userdata=await localStorage.getItemObject('user_arr')
          //-------------------- input validations -----------------
       let user_id=userdata.user_id
          if(this.state.isConnected===true)
        {
        this.setState({ loading: true,user_id:user_id});
        let data=new FormData();
       data.append('user_id',user_id);
       data.append('user_type',1)
       data.append('item_id',this.state.item_id)
       data.append('file', {
        uri:image,
         type: 'image/jpg', // or photo.type
         name: 'image.jpg'
       });
        var url = config.baseURL+'item_image_update.php'
         console.log("url:"+url);
          const {navigate} = this.props.navigation;
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
                 this.setState({filedataimage_arr:obj.item_image_arr})
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
           SearchFilterFunction=(text)=> {
            //passing the inserted text in textinput
            let data1=this.state.selecttype=='category'?this.state.category_arr1:this.state.subcategory_arr1
            const newData = data1.filter(function(item) {
              //applying filter for the inserted text in search bar
              const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            });
            if(this.state.selecttype=='category')
            {
              console.log('data',newData)
              this.setState({
                category_arr:newData,
                   search:text,
              });
           
            }
            else if(this.state.selecttype=='subcategory')
            {
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
           chooseconditiondata1=(item,index)=>{
            let data=this.state.diraction_arr
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
    
        this.setState({diraction_arr:data,diraction_name:item.name,isVisible2:false})
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
    render(){
        console.log('cikasd')
       
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
                         <View style={{flexDirection:'row',}}>
                      {this.state.selecttype=='category' &&   <Image source={item.category_img!='NA'?{uri:config.img_url+item.category_img}:require('../icons/noimage.png')} style={{width:40,height:40,alignSelf:'center',borderRadius:20,backgroundColor:Colors.imagebackcolor}}/>}
                      {this.state.selecttype!='category' &&   <Image source={item.image!='NA'?{uri:config.img_url+item.image}:require('../icons/noimage.png')} style={{width:40,height:40,borderRadius:20,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>}  
                         <Text style={{color:'black',paddingLeft:14,fontFamily:'Ubuntu-Bold',fontSize:15,paddingVertical:15}}>{this.state.selecttype=='category'?item.category_name:item.name}</Text>  
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
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Ubuntu-Bold',fontSize:22}}>Choose media</Text>
                                <TouchableOpacity onPress={()=>{this.setState({isVisible:false});Platform.OS === 'android'?this.Cameraimagebtn():this.Cameraimagebtn1()}} >
                                      <Text style={{color:Colors.headercolor,fontSize:17,ffontFamily:'Ubuntu-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Take a photo</Text>
                                 </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});Platform.OS === 'android'?this.Pickerimagebtn():this.Pickerimagebtn1()}}>
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
              <Modal
             animationType = {"slide"}
             transparent={true}
             visible={this.state.isVisible3}
             onRequestClose={() => {
             this.setState({isVisible3:false})
            }}>

         <TouchableOpacity  style={{flex:1,backgroundColor:'#00000050'}} onPress={()=>{this.setState({isVisible3:false})}} activeOpacity={1} >
                <View  style={{backgroundColor:'#FFFFFF',position:'absolute',bottom:0,}}>
                  <TouchableOpacity activeOpacity={1} style={()=>{this.setState({isVisible3:true})}}>
                <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:1,borderBottomColor:'#f0f0f0'}}>
         <TouchableOpacity activeOpacity={1} style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.setState({isVisible3:false})}}> 
            <View style={{width:'100%'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Upload Product/Service</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.nextbtn()}}> 
            <View style={{width:'100%',alignSelf:'center'}} >
              {/* <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>NEXT</Text> */}
             </View>
          </TouchableOpacity>
                
        </View>
               <TouchableOpacity onPress={()=>{this.setState({singlestock:true,instock:false,availability:'Single Post',availability_id:0})}}>
                       <View style={{borderBottomColor:'#f2f2f2',width:'90%',alignSelf:'center',paddingTop:14,}}>
                          <View style={{flexDirection:'row',width:'100%',}}>
                          <View style={{width:'87%'}}>
                           <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14}}>List as single item</Text>
                           <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:14}}>if you're selling one item, show "only one" on your listing.</Text>
                          </View>
                        {this.state.singlestock==false?  
                        <View style={{width:20,height:20,borderColor:'gray',marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                         <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                        </View> : <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                        <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                      </View>}
                           </View>
                        
                      </View>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={()=>{this.setState({singlestock:false,instock:true,availability:'In Stock',availability_id:1})}}>
                       <View style={{borderBottomColor:'#f2f2f2',width:'90%',alignSelf:'center',paddingTop:14,paddingBottom:23}}>
                          <View style={{flexDirection:'row',width:'100%',}}>
                          <View style={{width:'87%'}}>
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14}}>List as in stock</Text>
                   <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:14}}>if you're selling more then one item, show "in stock" on your listing.</Text>
                          </View>
                          {this.state.instock==false? 
                        <View style={{width:20,height:20,borderColor:'gray',marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                         <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                        </View> : <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                        <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                      </View>}
                           </View>
                        
                      </View>
                 </TouchableOpacity>
              
               
                </TouchableOpacity>
                </View>
                
                
                

                 
                 </TouchableOpacity>
         </Modal>
        
         <Modal
             animationType = {"slide"}
             transparent={true}
             visible={this.state.isVisible2}
             onRequestClose={() => {
             this.setState({isVisible2:false})
            }}>

         <TouchableOpacity  style={{flex:1,backgroundColor:'#00000050'}} onPress={()=>{this.setState({isVisible2:false})}} activeOpacity={1} >
                <View  style={{backgroundColor:'#FFFFFF',position:'absolute',bottom:0,}}>
                  <TouchableOpacity activeOpacity={1} style={()=>{this.setState({isVisible2:true})}}>
                <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:1,borderBottomColor:'#f0f0f0'}}>
         <TouchableOpacity activeOpacity={1} style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Upload Product/Service</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} > 
            <View style={{width:'100%',alignSelf:'center'}} >
              {/* <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>NEXT</Text> */}
             </View>
          </TouchableOpacity>
                
        </View>

        <FlatList
                  data={this.state.diraction_arr}
                   renderItem={({item,index})=>{
                     if(this.state.diraction_arr!='NA')
                      {
                   return(

                    <TouchableOpacity onPress={()=>{this.chooseconditiondata1(item,index)}}>
                      <View style={{borderBottomColor:'#f2f2f2',borderBottomWidth:1,alignContent:'center',paddingVertical:6}}>
                          <View style={{flexDirection:'row',justifyContent:'space-between',paddingRight:26}}>
                        
                        <Text style={{color:'black',paddingLeft:14,fontFamily:'Ubuntu-Bold',fontSize:15,paddingVertical:15}}>{item.name}</Text>  
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


               
               
                </TouchableOpacity>
                </View>
                
                
                

                 
                 </TouchableOpacity>
         </Modal>
      
      
        {/* <Modal     
          animationType = {"slide"}
          transparent={true}
          visible = {this.state.modalVisable2}
          onRequestClose = {() =>{ this.setState({modalVisable2:false}) } }>
         <TouchableOpacity  onPress={()=>{this.setState({modalVisable2:false})}} style={{flex:1,alignItems:'center',alignContent:'center',justifyContent:'center'}}>
           <View style={{flex:1,alignItems:'center',alignContent:'center',justifyContent:'center'}}>
                <View style={{width:screenWidth*90/100,borderRadius:5,backgroundColor:'#f5f5f5'}}>
               <TouchableOpacity activeOpacity={1} style={{paddingHorizontal:25,width:screenWidth*90/100,borderRadius:5,backgroundColor:'#f5f5f5',borderColor:'gray',borderWidth:0.6}}  onPress={()=>{this.setState({modalVisable2:true})}} >
                <FlatList
                  data={this.state.selecttype=='category'?this.state.category_arr:this.state.subcategory_arr}
                   renderItem={({item,index})=>{
                     if(this.state.category_arr!='NA')
                      {
                   return(
                    <TouchableOpacity onPress={()=>{this.selecttypebtn(item)}}>
                      <View style={{borderBottomColor:'#FFFFFF',paddingLeft:10,borderBottomWidth:1,alignContent:'center'}}>
                         <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingVertical:15}}>{this.state.selecttype=='category'?item.category_name:item.name}</Text>  
                      </View>
                    </TouchableOpacity>
                   )
                  }
                 }}
                 keyExtractor={(item, index) => index.toString()}
                 />
        </TouchableOpacity>
              </View>
              </TouchableOpacity>
              </Modal> */}
  
        {/* //=----------------------header part---------=000------ */}
     
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Edit An Item</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.edititembtn()}}> 
            <View style={{width:'100%',alignSelf:'center'}} >
              <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>Edit</Text>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
      <View style={{borderBottomWidth:0.7,borderBottomColor:'#dedede',width:'100%'}}></View>
        </View>
       
        {/* ..............................heaser finish................................ */}
        <ScrollView style={{marginBottom:73}}>
        <View style={{paddingHorizontal:20,paddingTop:20}}>
        <TouchableOpacity onPress={()=>{this.setState({selecttype:'category',errorno:0,modalVisable2:true})}}>
         <View style={[styles.inputcontainer,{marginTop:5,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
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
        {this.state.layout==0 && <Text style={{fontSize:14,fontFamily:'Ubuntu-Bold',color:'black'}}>Details</Text>}
       
       {this.state.layout==0 && <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
            <TouchableOpacity style={{paddingVertical:7,width:'35%',alignSelf:'center'}} onPress={()=>{this.setState({shipping:true,pickup:false})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
                 {this.state.shipping==false?  
                    <View style={{width:20,height:20,borderColor:'gray',marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                         <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                   </View>:<View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:10,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                </View>}
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Shipping</Text> 
               </View>
          </TouchableOpacity>
           <TouchableOpacity style={{paddingVertical:7,width:'40%',alignSelf:'center'}} onPress={()=>{this.setState({shipping:false,pickup:true})}}> 
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
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Product Photo Add</Text>
             <Text style={{color:'black',fontFamily:'Ubuntu-Light',lineHeight:17,fontSize:13}}>Upload your most attractive images to entice your customer</Text>
          </View>
          </View>
          </TouchableOpacity> */}
         <Text style={{fontSize:14,fontFamily:'Ubuntu-Bold',color:'black',paddingBottom:6,}}>Add Photo</Text>
          {this.state.filedataimage_arr!='NA' &&
           <View style={{width:'100%',alignSelf:'center',flexDirection:'row'}}>
           <TouchableOpacity onPress={()=>{this.state.filedataimage_arr.length<5?this.setState({isVisible:true}):alert('You can add only 5 product photo. remove one of these if you want to change photos')}}>
                    <View style={{alignSelf:'center',width:70,height:70,marginLeft:3,borderWidth:1,borderColor:'#f5f5f5',alignContent:'center',alignSelf:'center',justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:12}}>
                       <View>
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
      <Image source={{uri:config.img_url+item.image}} style={{alignSelf:'center',width:70,height:70,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
      <View style={{position:'absolute',alignSelf:'flex-end',alignItems:'flex-end',}}>
                <TouchableOpacity onPress={()=>{this.removeimage(item.item_image_id,'single')}} style={{marginRight:1,marginTop:1}}>
                     <Icon2 name='cross' size={25} color={Colors.buttoncolor} style={{alignSelf:'center',backgroundColor:'white'}}/>
                              {/* <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:18,height:18}}/> */}
                     </TouchableOpacity>
                 </View>
        </View>
     
    </View>
      // <View  style={{paddingTop:10,width:80,marginLeft:'1%',marginBottom:10}}> 
      //        <View style={{width:70,height:70,alignSelf:'center'}}>
      //        <Image source={{uri:config.img_url+item.image}} style={{alignSelf:'center',width:70,height:70,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
      //        <View style={{position:'absolute',alignSelf:'flex-end',alignItems:'flex-end',}}>
      //           <TouchableOpacity onPress={()=>{this.removeimage(item.item_image_id,'single')}} style={{marginRight:1,marginTop:1}}>
      //                <Icon2 name='cross' size={25} color={Colors.buttoncolor} style={{alignSelf:'center',backgroundColor:'white'}}/>
                             
      //                </TouchableOpacity>
      //            </View>
      //            <View> 
                  
      //            </View>
      //         </View>
      //         </View>

    )
 }}
 keyExtractor={(item, index) => index.toString()}
/>
</View>
            
          }
           {this.state.errorno==1 && 
                 <Text style={styles.errortextstyle}>Please choose at least one product photo</Text>
                }
           <View style={{paddingBottom:10}}>

<Text style={{color:'gray',paddingLeft:10,fontFamily:'Ubuntu-Medium',fontSize:12.5}}>Photo: {this.state.filedataimage_arr.length}/5 only you can add 5 photo from your camera and gallery</Text>
    </View>
      {/* {this.state.filedataimage_arr.length>1 &&
          <TouchableOpacity onPress={()=>{this.removeimage(" ",'all')}}>
            <View style={{flexDirection:'row',paddingBottom:10}}>
            <Icon1 name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
            <Text style={{color:Colors.buttoncolor,paddingLeft:10,fontFamily:'Ubuntu-Medium',fontSize:12.5}}>Remove all photo</Text>
            </View>
          </TouchableOpacity> 
       } */}


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
                <View style={[styles.inputcontainer,{marginTop:10}]}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Price</Text> 
             <TextInput
                    placeholder='Enter price'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({price:txt})}}
                    returnKeyType='done'
                    returnKeyLabel='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    maxLength={30}
                    style={styles.textfiledinput}
                    value={""+this.state.price+""}
                   />
          </View>
               {this.state.errorno==6 && 
                   <Text style={styles.errortextstyle}>Please enter price</Text>
                }
                {/* <View style={[styles.inputcontainer,{marginTop:10}]}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Tax(%)</Text> 
             <TextInput
                    placeholder='Enter Tax'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({tax:txt})}}
                    returnKeyType='done'
                    returnKeyLabel='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    maxLength={30}
                    style={styles.textfiledinput}
                    value={""+this.state.tax+""}
                   />
          </View> */}
          {this.state.errorno==11 && 
                 <Text style={styles.errortextstyle}>Please enter tax</Text>
                }
              {this.state.layout==0 &&  <View>
           {this.state.shipping==true   &&  <View style={[styles.inputcontainer,{marginTop:10}]}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Shipping Price/km</Text> 
             <TextInput
                    placeholder='Enter Shipping Price'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({delivery_charge:txt})}}
                    returnKeyType='done'
                    returnKeyLabel='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    maxLength={30}
                    style={styles.textfiledinput}
                    value={""+this.state.delivery_charge+""}
                   />
          </View>}
          </View>}
          {this.state.errorno==13 && 
                 <Text style={styles.errortextstyle}>Please enter price</Text>
                }

                 <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
            <TouchableOpacity style={{paddingVertical:15,width:'35%',alignSelf:'center'}} onPress={()=>{this.setState({fixed:true,nagoia:false})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
              {this.state.fixed==false?  
               <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
              </View>
              :<View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                </View>}
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Fixed</Text> 
               </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:15,width:'40%',alignSelf:'center'}} onPress={()=>{this.setState({fixed:false,nagoia:true})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
                 {this.state.nagoia==false? <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                </View>:
                <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
          </View>
                
                }
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Negotiable</Text> 
               </View>
          </TouchableOpacity>
          </View>
                    <View style={[styles.inputcontainer,]}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Item Details</Text> 
                        <TextInput
                        style={styles.Textarea_Style}
                            placeholder={'Describe your product/service in more details...'}
                            ref={(ref)=>{this.discription=ref}}
                             placeholderTextColor={Colors.textcolor}
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                            returnKeyType="done"
                            blurOnSubmit={true}
                            returnKeyLabel="done"
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            underlineColorAndroid={'transparent'}
                             onChangeText={(txt) => this.setState({item_detail:txt})}
                            value={this.state.item_detail}
                        />
                         </View>
                        {this.state.errorno==3 && 
                 <Text style={styles.errortextstyle}>Please enter item details</Text>
                }
                 {this.state.layout==0 &&  <TouchableOpacity onPress={()=>{this.state.condition_arr=='NA'?this.getconditiondata():this.setState({selecttype:'condition',errorno:0,isVisible4:true})}}>
                   <View style={[styles.inputcontainer,{   marginTop:15,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
                   <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Product/service Condition</Text> 
      
                   <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:8}}>
                    <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'black'}}>{this.state.condition_detail}</Text> 
                  <Icon name='caretdown' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                </View>
        
            </View>
          </TouchableOpacity>}
                         {this.state.errorno==15 && 
                 <Text style={styles.errortextstyle}>Please enter item conditions</Text>
                }
        {this.state.layout==1 && <TouchableOpacity onPress={()=>{this.setState({selecttype:'condition',errorno:0,isVisible4:true})}}>
                   <View style={[styles.inputcontainer,{   marginTop:15,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
                   <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>location Direction</Text> 
      
                   <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:8}}>
                    <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'black'}}>{this.state.diraction_name}</Text> 
                  <Icon1 name='caretdown' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                </View>
        
              </View>
             </TouchableOpacity>}
             {this.state.errorno==16 && 
                 <Text style={styles.errortextstyle}>Please enter location type</Text>
                }

    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addaddressgoogle')}}>
           <View style={[styles.inputcontainer,{   marginTop:15,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
              <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Location</Text> 
              <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:7}}>
              <Icon2 name='location' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
            {selleraddress!='NA' && <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:10,color:'black'}}>{selleraddress.address}</Text> }
            {selleraddress=='NA' && <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:10,color:'black'}}>{this.state.addressbar.address}</Text> }
              </View>
               </View>
        </TouchableOpacity>
        {this.state.errorno==7 && 
                 <Text style={styles.errortextstyle}>Please enter add address</Text>
                }
                {this.state.layout==0 && <TouchableOpacity onPress={()=>{this.setState({selecttype:'condition',errorno:0,isVisible3:true})}}>
                   <View style={[styles.inputcontainer,{   marginTop:15,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
                   <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Product/service Availability</Text> 
      
                   <View style={{flexDirection:'row',justifyContent:'space-between',paddingBottom:8}}>
                    <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'black'}}>{this.state.availability}</Text> 
                  <Icon1 name='caretdown' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                </View>
        
            </View>
          </TouchableOpacity>}
          {this.state.errorno==18 && 
                 <Text style={styles.errortextstyle}>Please select availability</Text>
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