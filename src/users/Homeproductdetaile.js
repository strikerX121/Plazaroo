import React,{Component} from 'react';
import {Text,View,StyleSheet,Alert,Platform,TouchableOpacity,Image,SafeAreaView,Dimensions,Keyboard,Modal,ImageBackground,BackHandler,FlatList,StatusBar,Linking, ScrollView} from 'react-native';
import Colors from '../Colors';
import Carousel from 'react-native-banner-carousel';
import { config } from '../providers/configProvider';
import {notification} from '../providers/NotificationProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { TextInput } from 'react-native-gesture-handler';
import UserFooter from './UserFooter'
import base64 from 'react-native-base64'
import NetInfo from '@react-native-community/netinfo';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Loader from '../Loader';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import StarRating from 'react-native-star-rating';
import Share from 'react-native-share'
import Icon from 'react-native-vector-icons/AntDesign'
import ImgToBase64 from 'react-native-image-base64';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

const ScrrenWidth = Dimensions.get('window').width
export default class Homeproductdetaile extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
           player_id:'' ,
           loading:false,
           user_id:'',
           onloaded:false,
           modalVisible:false,
            isConnected:true,
            user_wallet:0,
            description:'',
            offerprice:'',
            description:'',
            sherapp1:'',
            viewproductlist_arr:{},
            productdetaile_arr:'NA',
             product_arr:'',
            product_id:this.props.navigation.getParam('Product_id')
          }
       }
      componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        this.props.navigation.addListener('willFocus', payload => {
          console.log('payload',payload)
           if (payload.lastState.routeName == "Paymentsubmit" && payload.action.type=='Navigation/BACK') {
            this.props.navigation.navigate('Userhome')
                }
            });
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.gethomedetailepage1()
         });
        this.gethomedetailepage()
        this.Termsconditiondata()
      }
      Termsconditiondata= async ()=>{
        let userdata=await localStorage.getItemObject('user_arr')
         let user_id=userdata.user_id 
        if(this.state.isConnected===true)
                {
        var url = config.baseURL+'get_all_content.php?user_id='+user_id+'&user_type=1';
        console.log('url',url) 
        fetch(url,{ 
           method: 'GET',
           headers: {
               Accept:'application/json',
              'Content-Type': 'multipart/form-data',
          },
         
      }).then( (obj)=> {
          this.setState({loading:false});
              return obj.json();  
     }).then((obj)=> { 
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
          console.log(obj)
          if(obj.success == 'true'){
             let shereapp1=obj.content_arr[5].content;
           
             this.setState({loading:false,sherapp1:shereapp1})
            // this.setState({loading:false,Termsdata:obj.content_arr});
            //  localStorage.setItemObject('contantdata',obj.content_arr)
            } 
             else{
                 
                   msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
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
      gethomedetailepage=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=0
      if(userdata!=null)
      {
        user_id=userdata.user_id
      }
     console.log('currentLatlong',currentLatlong)
     let longitude=currentLatlong.coords.longitude
     let latitude=currentLatlong.coords.latitude  
      if(this.state.isConnected===true)
      {
      var url = config.baseURL+'get_single_item_details.php?user_id='+user_id+'&user_type=1&item_id='+this.state.product_id+'&latitude='+latitude+'&longitude='+longitude;
       console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:user_id,loading:true,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({ product_arr:'vikas',productdetaile_arr:obj.item_single_arr,price:obj.item_single_arr.item_price})
            } 
            else{
              if(obj.msg[config.language]=='User not exists!')
              {
                this.props.navigation.navigate('Logout')
              }
              if(obj.account_active_status=="deactivate")
              {
                 this.props.navigation.navigate('Logout')
              }
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
           this.setState({loading: false,refresh:false});
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }  
      }
       gethomedetailepage1=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=0
        if(userdata!=null)
        {
          user_id=userdata.user_id
        }
       console.log('currentLatlong',currentLatlong)
       let longitude=currentLatlong.coords.longitude
       let latitude=currentLatlong.coords.latitude  
        if(this.state.isConnected===true)
        {
        var url = config.baseURL+'get_single_item_details.php?user_id='+user_id+'&user_type=1&item_id='+this.state.product_id+'&latitude='+latitude+'&longitude='+longitude;
         console.log("url:"+url);
       this.setState({user_id:user_id})
      
         fetch(url,{
            method: 'GET',
            headers: new Headers(config.headersapi), 
            }).then((obj)=>{ console.log('obj',obj);  return obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
               this.setState({productdetaile_arr:obj.item_single_arr,price:obj.item_single_arr.item_price})
              } 
              else{
                if(obj.msg[config.language]=='User not exists!')
                {
                  this.props.navigation.navigate('Logout')
                }
                if(obj.account_active_status=="deactivate")
                {
                   this.props.navigation.navigate('Logout')
                }
                  msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             
       });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }  
        }
        addfavoritebtn=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
        let user_id=userdata.user_id
      if(this.state.isConnected===true)
           {
             let data=new FormData()
           
             data.append('user_id',userdata.user_id)
             data.append('user_type',1)
             data.append('item_id',this.state.product_id)
           var url = config.baseURL+'itemFavoriteStatus.php'
          console.log("url:"+url);
         if(this.state.refresh==false)
           {
           this.setState({user_id:userdata.user_id,loading:true,})
          }
         fetch(url,{
            method: 'POST',
            headers: new Headers(config.headersapi), 
            body:data
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
                let data=this.state.productdetaile_arr
                if(obj.favorite_status==1)
                {
                      data.favraouiteCount=data.favraouiteCount+1
                }
                else{
                    data.favraouiteCount=data.favraouiteCount-1
                  }
                data.favourite=obj.favorite_status
                this.setState({productdetaile_arr:data})
              } 
              else{
                if(obj.msg[config.language]=='User not exists!')
                {
                  this.props.navigation.navigate('Logout')
                }
                if(obj.account_active_status=="deactivate")
                 {
                   this.props.navigation.navigate('Logout')
                 }
                  msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({loading: false,refresh:false});
       });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }  
        }
        else{
          this.Checkuser()
        }
      }
       makeofferbtn=async()=>{
          let userdata=await localStorage.getItemObject('user_arr')
          let user_id=userdata.user_id
        if(this.state.isConnected===true)
             {
              let data=new FormData()
              data.append('user_id',userdata.user_id)
               data.append('user_type',1)
               data.append('other_user_id',this.state.productdetaile_arr.user_id)
               data.append('price',this.state.price)
               data.append('description',this.state.description)
               data.append('item_id',this.state.product_id)
             var url = config.baseURL+'create_offer.php'
            console.log("url:"+url);
            console.log('data',data)
           if(this.state.refresh==false)
             {
             this.setState({user_id:userdata.user_id,loading:true,})
            }
           fetch(url,{
              method: 'POST',
              headers: new Headers(config.headersapi), 
              body:data
            }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false,modalVisible:false});    return  obj.json();}).then((obj)=>{
           console.log('obj',obj)
               if(obj.success == 'true'){
                 if(obj.accept_order_arr!='NA')
                    {
                      this.props.navigation.navigate('Reviewyouroffer',{'productdetaile':this.state.viewproductlist_arr,'pagerefence':'homedetaile','user_wallet':this.state.user_wallet})
                    }
                 else{
                   this.props.navigation.navigate('Paymentsubmit')
                      // alert("Your offer has been submitted please wait until seller is not accept your offer.")
                     }
                 if(obj.notification_arr!='NA')
                    {
                      notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                    }
                } 
                else{
                  if(obj.msg[config.language]=='User not exists!')
                  {
                    this.props.navigation.navigate('Logout')
                  }
                  if(obj.account_active_status=="deactivate")
                   {
                     this.props.navigation.navigate('Logout')
                   }
                    msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                  return false;
             }
           }).catch((error)=> {
             console.log("-------- error ------- "+error);
             msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
               this.setState({loading: false,refresh:false});
         });
        }
        else{
           msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
         }  
          }
       checkmakeoffer=async()=>{
            let userdata=await localStorage.getItemObject('user_arr')
            if(userdata!=null)
            {
            let user_id=userdata.user_id
          if(this.state.isConnected===true)
               {
                
               var url = config.baseURL+'check_item_order.php?user_id='+user_id+'&user_type=1'+'&item_id='+this.state.product_id
              console.log("url:"+url);
            
               this.setState({loading:true,})
            
             fetch(url,{
                method: 'GET',
                headers: new Headers(config.headersapi), 
              
              }).then((obj)=>{  this.setState({loading:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
                 if(obj.success == 'true'){
                  
                   if(obj.item_single_arr!='NA')
                   {
                     if(this.state.productdetaile_arr.availability==0)
                     {
                      if(obj.item_single_arr.accept_order_arr==0)
                      { 
                       
                        if(obj.item_single_arr.accept_offer_details!='NA')
                        {
                          this.props.navigation.navigate('Reviewyouroffer',{'productdetaile':obj.item_single_arr,'pagerefence':'homedetaile','user_wallet':obj.user_wallet})
                        }
                        else{
                         
                          this.setState({modalVisible:true,viewproductlist_arr:obj.item_single_arr,user_wallet:obj.user_wallet})
                        }
                       
                      }
                  
                      else{ 
                          alert("Sorry, the item has been sold")
                          }
                        }
                          else{
                            if(obj.item_single_arr.accept_offer_details!='NA')
                              {
                               this.props.navigation.navigate('Reviewyouroffer',{'productdetaile':obj.item_single_arr,'pagerefence':'homedetaile','user_wallet':obj.user_wallet})
                              }
                           else{
                                this.setState({modalVisible:true,viewproductlist_arr:obj.item_single_arr,user_wallet:obj.user_wallet})
                              }
                           }
                        }
                   else{
                    alert("Sorry, the item has been sold")
                   }
                  
                  } 
                  else{
                    if(obj.msg[config.language]=='User not exists!')
                    {
                      this.props.navigation.navigate('Logout')
                    }
                    if(obj.account_active_status=="deactivate")
                     {
                       this.props.navigation.navigate('Logout')
                     }
                      msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                    return false;
               }
             }).catch((error)=> {
               console.log("-------- error ------- "+error);
               msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
                 this.setState({loading: false,refresh:false});
           });
          }
          else{
             msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
           } 
          } else{
            this.Checkuser()
          }
            }
      _onRefresh = () => {
        this.setState({refresh:true})
        this.gethomedetailepage()
      }
      shereappbtn=()=>{
        if( Platform.OS === 'android')
        {
          this.setState({loading:true})
        }
       
       let data=this.state.productdetaile_arr
       let imagedata=config.img_url3+data.item_images[0].image
       ImgToBase64.getBase64String(imagedata)
  .then((base64String) =>{ 
   
    
    let shareOptions = {
    title:'PLAZAROO',
    subject: data.item_name,
    message:'Item for PLAZAROO app '+"\n"+'Title: '+data.item_name+"\n"+'price: $'+data.item_price+"\n"+this.state.sherapp1,
  url:'data:image/png;base64,'+base64String,
    failOnCancel: false,
   };
   if( Platform.OS === 'android')
   {
    this.setState({loading:false});
   }
  
   Share.open(shareOptions)
  }
   
   )
  .catch(err => console.log('erro',err));
       console.log('base64.encode(data.item_images[0].image),',base64.encode(imagedata))
            

            // title,
            // subject: title,
            // message: `${message} ${url}`,
           
        // })
        // .catch(err => {console.log(err)});
    
      }

       usercheckbtn=async(btn,item)=>{
    
        let userdata=await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
            if(userdata.profile_complete!=0)
            {
              if(btn=='shere')
              {
                this.shereappbtn();
              }
              else if(btn=='profile')
              {
                if(userdata.user_id!=item)
                {
                  this.props.navigation.navigate('Profile',{'other_user_id':item})             
                }
                else{
                  this.props.navigation.navigate('Viewprofilepage')             
                }
                
              }
              else if(btn=='message')
              {
                this.props.navigation.navigate('Messagedetaile',{'data':{'other_user_id':item.user_id,'name':item.userDetails.name}})
              }
            
          }
             else{
                 this.props.navigation.navigate('Userlogin') 
                 }
            
    }else{
            this.Checkuser()
        } 
       }
     Checkuser = () => {
            
        Alert.alert(
                msgTitle.confirm[config.language],
                msgText.loginFirst[config.language],
                [
                    {
                        text: msgTitle.cancel[0], 
                    },
                    {
                        text: msgTitle.ok[0], 
                        // onPress: () =>  this.btnPageLoginCall(),
                        onPress: ()=>{this.props.navigation.navigate('Userlogin')}
                    },
                ],
                {cancelable: false},
            );
        }

     render(){
        console.log('cikasd')
        if(this.state.productdetaile_arr!='NA')
        {
          let item=this.state.productdetaile_arr
          console.log('item',item)
return(
  <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
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
        }}
      > 
      <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.setState({modalVisible:false})}} style={{backgroundColor:'#00000050',flex:1}}>
        <View style={{backgroundColor:'#00000050',flex:1}}>
            <View style={{position:'absolute',bottom:0,left:0,right:0,backgroundColor:'#FFFFFF',borderTopStartRadius:20,borderTopRightRadius:20}}>
               <TouchableOpacity activeOpacity={1} onPress={()=>{this.setState({modalVisible:true})}}>
                <View style={{backgroundColor:'#FFFFFF',width:'100%',paddingVertical:10,alignSelf:'center',borderTopStartRadius:20,borderTopRightRadius:20}}>
                {/* <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13,paddingVertical:16,paddingLeft:20}}>Enter your offer</Text>  */}
                <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13,paddingVertical:16,paddingLeft:20}}>your offer price</Text>   
                <View style={{backgroundColor:'#f0f0f0',marginHorizontal:10,alignSelf:'center',width:'90%',borderRadius:7}}>
                <TextInput
                    placeholder='Enter Your Offer'
                    placeholderTextColor='gray'
                    keyboardType='numeric'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    // editable={item.price_type==1?true:false}
                    editable={false}
                    ref={(input) => { this.offer = input; }}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({price:txt})}}
                    maxLength={20}
                    value={"$"+this.state.price+""}
                    style={styles.textfiledinput}
                   />
          
       
                </View>
                {/* {item.price_type==1 && <View>  */}
                
         {item.price_type==5 && <View> {/* //change kiya 1 ko 5 mane */}
            <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13,paddingVertical:16,paddingLeft:20}}>Enter your description</Text>  
                 <View style={{backgroundColor:'#f0f0f0',marginHorizontal:10,alignSelf:'center',width:'90%',borderRadius:7}}>
                  <TextInput
                         style={styles.Textarea_Style}
                         placeholder={'Describe Your Product In Details'}
                         ref={(ref)=>{this.discription=ref}}
                          placeholderTextColor={Colors.textcolor}
                         multiline={true}
                         onFocus={()=>{this.setState({errorno:0})}}
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         returnKeyType="done"
                         returnKeyLabel="done"
                        underlineColorAndroid={'transparent'}
                         onChangeText={(txt) => this.setState({description:txt})}
                      />
                      </View>
                      </View>}
                <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingVertical:16,paddingVertical:10,paddingLeft:10}}>Seller is only accepting offers at full price</Text>  
                <TouchableOpacity onPress={()=>{this.setState({modalVisible:false});item.price_type==1?this.makeofferbtn():this.props.navigation.navigate('Reviewyouroffer',{'productdetaile':this.state.viewproductlist_arr,'pagerefence':'homedetaile','user_wallet':this.state.user_wallet})}} activeOpacity={0.8}  style={{width:'90%',paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                  {/* <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Ship to me</Text>  */}
                  <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Proceed</Text> 
              </TouchableOpacity> 
            </View>
            </TouchableOpacity>
            </View>
        </View>  
        </TouchableOpacity> 
      </Modal>
        <View>
         <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    showsPageIndicator={true}
                    loop
                    index={0}
                    pageSize={ScrrenWidth*100/100}
                    activePageIndicatorStyle={{backgroundColor:'white'}}
                    pageIndicatorStyle={{backgroundColor:'gray'}}
                    // pageSize={ScrrenWidth*90/100}
                >
                 
                  {item.item_images!="NA" && item.item_images.map((item1,index) =>{
                    return   ( 
                    <TouchableOpacity activeOpacity={0.8}  onPress={()=>{item1.image!='NA'?this.props.navigation.navigate('Fullviewimage',{'images':item1.image,'type':'vikas'}):null}}>
                      <Image onLoadStart={()=>{this.setState({onloaded:true})}}
                           onLoadEnd={()=>{this.setState({onloaded:false})}}
                           source={item1.image!='NA'?{uri:config.img_url2+item1.image}:require('../icons/noimage.png')} resizeMethod='scale' resizeMode='stretch' style={{width:screenWidth,height:screenHeight*37/100,paddingVertical:10,backgroundColor:Colors.imagebackcolor,resizeMode:'stretch'}} />
                     </TouchableOpacity>
                    )})}
                 
                </Carousel>
                <View style={{position:'absolute',top:10,width:screenWidth,height:screenHeight*30/100}}>
                <View style={{paddingTop:15,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
           <TouchableOpacity style={{width:25,height:25,alignItems:'center',justifyContent:'center',alignContent:'center',backgroundColor:'#FFFFFF',borderRadius:3,alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}>
           <Image source={require('../icons/back.png')} style={{width:15,height:15,alignSelf:'center'}}/>
           </TouchableOpacity>
           <View style={{flexDirection:'row'}}>
         <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',paddingVertical:3,marginRight:10,paddingHorizontal:10,borderRadius:15,elevation:2}}>
             <Image source={require('../icons/g-eye.png')} style={{width:10,height:10,alignSelf:'center',marginRight:3}}/>
    <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:10,textAlignVertical:'center'}}>{item.viewCount}</Text> 
         </View> 
         <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',paddingVertical:3,paddingHorizontal:10,borderRadius:15,elevation:2}}>
             <Image source={require('../icons/g-heart.png')} style={{width:10,height:10,alignSelf:'center',marginRight:3}}/>
    <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:10,textAlignVertical:'center'}}>{item.favraouiteCount}</Text> 
         </View>
         </View>
       
      </View>
     
                </View>
                </View>
     {/* <ImageBackground source={item.item_images!='NA'?{uri:config.img_url+item.item_images[0].image}:require('../icons/noimage.png')} style={{width:screenWidth,height:screenHeight*30/100,paddingVertical:10,backgroundColor:Colors.imagebackcolor}}>
      <View style={{paddingTop:15,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10}}>
           <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
           <Image source={require('../icons/back.png')} style={{width:15,height:15,alignSelf:'center'}}/>
           </TouchableOpacity>
       <View style={{flexDirection:'row'}}>
           <Image source={require('../icons/w-share.png')} style={{width:15,height:15,alignSelf:'center',marginRight:15}}/>
            <Image source={require('../icons/w-heart.png')} style={{width:15,height:15,alignSelf:'center',}}/>
       </View>
      </View>
     </ImageBackground>  */}
     <ScrollView >  
     <View style={{paddingBottom:20,  borderBottomColor:Colors.inputborder, borderBottomWidth:1.5,backgroundColor:'#FFFFFF',}}>
     <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:14,width:'90%',alignSelf:'center',paddingVerticalL:12}}>
    <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12}}>{item.category_name}</Text> 
    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:14}}>${item.item_price}</Text>         
     </View>
    <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15,paddingLeft:19,paddingTop:5}}>{item.item_name}</Text>         
     <View style={{flexDirection:'row',justifyContent:'space-between',width:'90%',alignSelf:'center',marginVertical:13}}>
         <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',borderRadius:15,elevation:2,paddingVertical:3,marginRight:10,paddingHorizontal:10}}>
             <Image source={require('../icons/fire.png')} style={{width:10,height:10,alignSelf:'center',marginRight:3}}/>
              <Text style={{color:'gray',fontFamily:'Ubuntu-Bold',fontSize:10,textAlignVertical:'center'}}>{item.distance} km</Text> 
         </View>
        <View>
          <View style={{flexDirection:'row'}}>
 <TouchableOpacity style={{width:25,marginRight:13,height:25,alignItems:'center',justifyContent:'center',alignContent:'center',backgroundColor:Colors.buttoncolor,borderRadius:3,alignSelf:'center'}} onPress={()=>{this.usercheckbtn('shere')}}>
         <Image source={require('../icons/w-share.png')} style={{width:15,height:15,alignSelf:'center',}}/>
         </TouchableOpacity>
       {item.favourite==0 && <TouchableOpacity style={{width:25,height:25,alignItems:'center',justifyContent:'center',alignContent:'center',backgroundColor:Colors.buttoncolor,borderRadius:3,alignSelf:'center'}} onPress={()=>{this.addfavoritebtn()}}>
               <Image source={require('../icons/g-heart.png')} style={{width:16,height:15,alignSelf:'center',resizeMode:'contain'}}/>
         </TouchableOpacity>}
         {item.favourite==1 && <TouchableOpacity style={{width:25,height:25,alignItems:'center',justifyContent:'center',alignContent:'center',backgroundColor:Colors.buttoncolor,borderRadius:3,alignSelf:'center'}} onPress={()=>{this.addfavoritebtn()}}>
               <Image source={require('../icons/w-heart.png')} style={{width:15,height:15,alignSelf:'center',resizeMode:'contain'}}/>
         </TouchableOpacity>}
       </View>
    
        </View>
         
     </View>
     </View>
     
     <View style={{paddingBottom:20,flexDirection:'row',justifyContent:'space-between',paddingVertical:13,marginTop:0.5,backgroundColor:'#FFFFFF', borderBottomColor:Colors.inputborder, borderBottomWidth:1.5,paddingHorizontal:15}}>
      <View>
      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Details</Text> 
         <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12,lineHeight:20}}>{item.description}</Text> 
      </View>
      <View>
      <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Post Date</Text> 
         <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12,lineHeight:20}}>{item.createtime}</Text> 
      </View>
     </View>
     <View style={{paddingBottom:20,paddingVertical:13,marginTop:0.5,backgroundColor:'#FFFFFF',borderBottomColor:Colors.inputborder, borderBottomWidth:1.5,paddingHorizontal:15}}>
       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Sold by</Text> 
        <TouchableOpacity onPress={()=>{this.usercheckbtn('profile',item.user_id)}}>
        <View style={{width:'100%',flexDirection:'row',paddingVertical:8,alignSelf:'center'}}>
           <View style={{width:'15%',alignSelf:'center'}}>
           {item.userDetails.image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:30,height:30,borderRadius:15,backgroundColor:'gray'}}/>:
                       <Image source={item.userDetails.login_type=='app'?{uri:config.img_url1+item.userDetails.image}:{uri:item.userDetails.image}} style={{width:30,height:30,borderRadius:15,backgroundColor:'gray'}}/>
                     }
          
           </View>
         <View style={{width:'75%'}}>
              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.userDetails.name}</Text>  
              <View style={{width:'80%',flexDirection:'row'}}>
                                   <StarRating
                                          disabled={true}
                                          fullStar={require('../icons/star.png')}
                                          emptyStar={require('../icons/unfilstar.png')}
                                          maxStars={5}
                                          starSize={15}
                                          rating={""+this.state.starCount,item.total_rate+""}
                                        //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                                   />
                                <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingLeft:13}}>{item.total_rate}</Text>    
                            </View> 
                    
            </View> 
            <View style={{width:'15%',alignSelf:'center'}}>
              <Icon name='right' size={15} color='black' style={{alignSelf:'center'}}/>  
            </View>
        </View>
        </TouchableOpacity>
     </View>
     <View style={{paddingBottom:20,paddingVertical:13,marginTop:0.5,backgroundColor:'#FFFFFF', borderBottomColor:Colors.inputborder, borderBottomWidth:1.5,paddingHorizontal:15}}>
       <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Location</Text> 
       {/* {item.location!='NA' &&  <TouchableOpacity onPress={()=>{Linking.openURL('http://www.google.com/maps/place/'+item.latitude,item.longitude)}}>
                     <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12,lineHeight:20}}>{item.location}</Text> 
          </TouchableOpacity>} */}
      {/* <View style={{width:'100%',alignSelf:'center',paddingVertical:10}}>
          <Image source={require('../icons/map.jpg')} style={{width:'100%',height:130}}/>
      </View> */}
      {item.latitude!="NA" &&
                <View style={{width:'100%',height:180,backgroundColor:'#FFFFFF'}}>
                    {item.latitude!="" &&
                               <MapView
                                    style={styles.map}
                                    zoomEnabled={true}
                                    showsUserLocation = { true }
                                    followUserLocation = { true }
                                    initialRegion={{
                                    latitude:parseFloat(item.latitude),
                                    longitude:parseFloat(item.longitude),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                 }}
                                 //  customMapStyle={mapStyle}
                                > 
                                <MapView.Circle
                                key = { (item.latitude + item.longitude).toString() }
                                center = { {
                                  latitude:parseFloat(item.latitude),
                                  longitude:parseFloat(item.longitude),
                              } }
                                radius = { 2000 }
                                strokeWidth = { 0.7 }
                                strokeColor = { '#1a66ff' }
                                fillColor = { '#d9e5fc' }
                                // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                               />

                                 <Marker
                                   draggable
                                   coordinate={{
                                    latitude:parseFloat(item.latitude),
                                    longitude:parseFloat(item.longitude),
                                    
                                   }}
                                   onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
                                   title={item.item_name.toUpperCase()}
                                   description={item.location}
                                  
                                 >
                                   <Image source={item.item_images!='NA'?{uri:config.img_url1+item.item_images[0].image}:require('../icons/noimage.png')} style={{height: 30, width:30,borderRadius:6 }} />
                                   </Marker>
                               </MapView>
                            }
                             </View> }  
    { item.user_id!=this.state.user_id &&  <View style={{width:'100%',flexDirection:'row',paddingTop:20}}>
        <View style={{width:'48%',paddingVertical:13,backgroundColor:'#FFFFFF',alignSelf:'center',borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
         <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.usercheckbtn('message',item)}} >
         <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center',width:'100%'}}>Send Message</Text> 
         </TouchableOpacity>  
         </View>
         <View style={{width:'48%',paddingVertical:13,alignSelf:'center',marginLeft:'2%',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
         <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.checkmakeoffer()}}>
         {/* <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Productmakeoffer')}} > */}
         <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center',width:'100%'}}>Make offer</Text> 
         </TouchableOpacity>  
         </View>
      </View>}
     </View>
     </ScrollView>
    </View>
    </SafeAreaView>
  )
    }
    else if(this.state.product_arr.length>1)
      {
      return(
          <View style={styles.container}>
            <Loader loading={this.state.loading}/>
              <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:30}}>
         <View style={{paddingVertical:15,width:'20%',alignSelf:'center'}} > 
            <TouchableOpacity style={{width:'100%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:15,height:15}}/>
                 </TouchableOpacity>
             </View>
          
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*32/100,height:30,resizeMode:'contain'}}/>
              </View>
          </View>
          </View>
                
            <Text style={{color:'black',textAlign:'center',fontSize:15,fontFamily:'Ubuntu-Medium',paddingTop:100}}>currently product detail not available</Text>
          </View>
      )
      
    }
    else{
      return(
        <View style={{flex:1,justifyContent:'center',alignSelf:'center',alignItems:'center'}}>
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center'}}>loading...</Text>
            </View>
      )
    }
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
        paddingVertical:15,
        width:'90%',
    },
    map: {
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
    },
    textfiledinput:{
      paddingVertical:8,
      color:'black',
      fontFamily:'Ubuntu-Medium',
      fontSize:14,
      paddingLeft:12,
      backgroundColor:Colors.lightgray,
         width:'100%'
    },
    Textarea_Style:{
      width:'100%',
      color:'black',
      textAlignVertical: 'top',
       paddingLeft:20,
      paddingRight:50,
      fontSize:15,
      height:110,
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