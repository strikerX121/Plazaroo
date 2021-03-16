import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,Modal,Alert,TextInput,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import UserFooter from './UserFooter'
import StarRating from 'react-native-star-rating';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import NetInfo from '@react-native-community/netinfo';
import OneSignal from 'react-native-onesignal';
import {notification} from '../providers/NotificationProvider';
import Loader from '../Loader';
import { color } from 'react-native-reanimated';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const data=[
    {
        'name':'Sarak William',
        'images':require('../icons/men2.jpg'),
         'price':'$100'
     },
     {
        'name':'Keria Saunders',
        'images':require('../icons/men.jpg'),
         'price':'$100'
     },
    
    
    
]
export default class Viewoffers extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
          isConnected:true,
             data:data,
             starCount:5,
             item_single_arr:[],
             modalVisible:false,
             refresh:false,
             item_id:this.props.navigation.getParam('item_id'),
             item_name:this.props.navigation.getParam('item_name'),
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
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.getofferdata1()
         });
         this.getofferdata()
  }
  getofferdata1 = async() => {
    let userdata=await localStorage.getItemObject('user_arr')
      //-------------------- input validations -----------------
   let user_id=userdata.user_id
   if(this.state.isConnected===true)
        {
          var url = config.baseURL+'get_all_offer.php?user_id='+user_id+'&user_type=1'+'&item_id='+this.state.item_id
     console.log("url:"+url);
      const {navigate} = this.props.navigation;
   fetch(url,{
         method: 'GET',
         headers: new Headers(config.headersapi), 
       }).then( (obj)=> {
      this.setState({refresh:false,});
        return obj.json();  
     }).then( (obj)=> { 
         console.log('obj',obj);
      //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
         if(obj.success == 'true'){
          // let data=obj.address_arr
          // for(let i=0; i<data.length; i++)
          //   {
          //       data[i].status=false
          //   }
          this.setState({item_single_arr:obj.item_single_arr})
         
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
         this.setState({ refresh:false});
     });
   }
     else{
      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }   
       }
  getofferdata = async() => {
        let userdata=await localStorage.getItemObject('user_arr')
          //-------------------- input validations -----------------
       let user_id=userdata.user_id
       if(this.state.isConnected===true)
            {
        this.setState({ loading: true,user_id:user_id});
     var url = config.baseURL+'get_all_offer.php?user_id='+user_id+'&user_type=1'+'&item_id='+this.state.item_id
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
              //  let data=obj.address_arr
              // for(let i=0; i<data.length; i++)
              //   {
              //       data[i].status=false
              //   }
              this.setState({item_single_arr:obj.item_single_arr})
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
 
          acceptedbtn = async(item,index) => {
          let userdata=await localStorage.getItemObject('user_arr')
              //-------------------- input validations -----------------
           let user_id=userdata.user_id
           if(this.state.isConnected===true)
                {
                  // v=user_id,other_user_id,offer_id,item_id, user_type
            this.setState({ loading: true,user_id:user_id});
            var url=config.baseURL+'accept_offer.php'
            let data=new FormData();
            data.append('user_id',userdata.user_id)
            data.append('other_user_id',item.user_id)
            data.append('offer_id',item.offer_id) 
            data.append('item_id',item.item_id) 
            data.append('user_type',1) 
            console.log("url:"+url);
            console.log('data',data)
              const {navigate} = this.props.navigation;
           fetch(url,{
                 method:'POST',
                 headers:new Headers(config.headersapi), 
                 body:data,
                }).then((obj)=> {
                this.setState({loading:false});
                return obj.json();  
             }).then( (obj)=> { 
                 console.log('obj',obj);
              //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                 if(obj.success == 'true'){
                 let data1= this.state.item_single_arr
                   if(data1[index].status==1)
                   {
                     data1[index].status=0
                   }
                   else{
                     data1[index].status=1
                   }
                   if(obj.notification_arr!='NA')
                        {
                         notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                       }
                    this.setState({item_single_arr:data1})
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
        _onRefresh = () => {
                this.setState({refresh:true})
               this.getofferdata1()
         }
          
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
      <Loader loading={this.state.loading}/>
         {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',height:screenHeight*8/100,}}>
         <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{width:'70%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,textAlign:'center'}}>{this.state.item_name}</Text>
          </View>
          {/* <TouchableOpacity style={{width:'15%',alignSelf:'center'}}> 
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/b-search.png')} style={{alignSelf:'center',width:16,height:16}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor,width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
        showsVerticalScrollIndicator={false}
          >
      {this.state.item_single_arr=='NA' &&
       <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:30}}>Currently offers are not available!</Text>
       }
        <View style={{width:'95%',alignSelf:'center',paddingBottom:70}}>
          <FlatList
               data={this.state.item_single_arr}
               showsVerticalScrollIndicator={false}
               renderItem={({item,index})=>{
                 if(this.state.item_single_arr!='NA')
                 {
                  return(
                    <TouchableOpacity activeOpacity={1}>
                       {/* {this.state.item_single_arr.length>1 &&
                           <View style={{alignSelf:'flex-end',alignItems:'flex-end',paddingTop:10}}>
                          {item.price==this.state.item_single_arr[0].price &&
                           <Image source={require('../icons/best_offer.jpg')} style={{width:90,height:80,resizeMode:'stretch'}}/>
                          //  <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:14,textAlign:'right'}}>Best Offer</Text>
                          } 
                          </View>} */}
                    <View style={{flexDirection:'row',paddingBottom:14,paddingTop:14,borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor}}>
                        
                          <View style={{width:'15%',}}>
                          {item.userDetails.image!='NA'?
                             <Image source={item.userDetails.login_type=='app'?{uri:config.img_url+item.userDetails.image}:{uri:item.userDetails.image}} style={{width:35,height:35,borderRadius:20,alignSelf:'center'}}/>:
                             <Image source={require('../icons/name.png')} style={{width:35,height:35,borderRadius:20,alignSelf:'center'}}/>
                          }
                             </View>
                          <View style={{width:'85%',}}>
                          <View style={{flexDirection:'row',width:'100%'}}>
                          <View style={{flexDirection:'row',width:'75%'}}>
                            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,}} numberOfLines={1}>{item.userDetails.name}</Text>
                            <View style={{width:'22%',alignSelf:'center',paddingLeft:8}}>
                                   <StarRating
                                          disabled={true}
                                          fullStar={require('../icons/star2.png')}
                                          emptyStar={require('../icons/unfilstar.png')}
                                          maxStars={5}
                                          starSize={9}
                                          rating={item.total_rate}
                                        //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                                   />
                            
                            </View> 
                            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',alignSelf:'center',fontSize:10,paddingLeft:6,}} numberOfLines={1}>{item.total_rate}</Text>
                       </View>
                  <Text style={{width:'25%',alignSelf:'flex-end',textAlign:'right',paddingRight:10,fontSize:13,color:Colors.buttoncolor}}>${item.price}</Text>
                          </View>
                        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingVertical:2}}>{item.createtime} </Text>
                        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,lineHeight:18}}>{item.description}</Text>
                         
                            <View style={{flexDirection:'row',marginTop:20}}>
                            {item.status==0 &&   <TouchableOpacity style={{backgroundColor:Colors.buttoncolor,width:'35%',borderRadius:6,paddingVertical:8}} onPress={()=>{this.acceptedbtn(item,index)}}>
                               <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,}}>Accept</Text>
                               </TouchableOpacity>}
                               {item.status==1 &&   <TouchableOpacity style={{backgroundColor:Colors.buttoncolor,width:'35%',borderRadius:6,paddingVertical:8,opacity:0.5}} activeOpacity={1}>
                               <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,}}>Accept</Text>
                               </TouchableOpacity>}
                               <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Messagedetaile',{'data':{'other_user_id':item.user_id,'name':item.userDetails.name}})}} style={{borderWidth:0.8,borderColor:Colors.buttoncolor,width:'35%',borderRadius:6,marginLeft:7,paddingVertical:8}}>
                               <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,}}>Message</Text>
                               </TouchableOpacity>
                             </View> 
                          </View>
                        
                            </View>
                    </TouchableOpacity>
                  )
               }}
              }
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
                   
            </ScrollView>
  
       {/* ........................................Container finish............................... */}
      
      
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
    inputcontainer:{
        flexDirection:'row',     
        backgroundColor:'#f5f5f5',
         height:47,
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:15,width:'83%'
    },
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:12,
        width:'100%',
    },
    textfont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:13.5,
        color:'gray',
        paddingLeft:10,
        lineHeight:30,
        paddingLeft:15
    }
   
})