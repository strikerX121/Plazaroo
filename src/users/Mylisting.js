import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,Alert,TextInput,refreshControl,BackHandler, ScrollView,TouchableOpacity,StatusBar,ToastAndroid} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import firebase from './Config1';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

 
export default class Mylisting extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            Selling:true,
            Buying:false,
           isConnected:true,
           item_details_arr:[],
           my_all_order_arr:[],
            loading:false,
            refresh:false,
        
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
          this.getalldatamyoffer1()
         });
         this.getMyInboxAllData1();
        this.getalldatamyoffer()
     }
     getMyInboxAllData1=async()=>{

      console.log('getMyInboxAllData');
        userdata= await localStorage.getItemObject('user_arr')
      //------------------------------ firbase code get user inbox ---------------
      if(userdata != null){
        // alert("himanshu");
        var id='u_'+userdata.user_id;
        if(inboxoffcheck>0)
        {
          console.log('getMyInboxAllDatainboxoffcheck');
          var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
          queryOffinbox.off('child_added');
          queryOffinbox.off('child_changed');
        }

         var queryUpdatemyinbox = firebase.database().ref('users/'+id+'/myInbox/');
          queryUpdatemyinbox.on('child_changed', (data)=>{
          console.log('inboxkachildchange',data.toJSON())
          
          firebaseprovider.firebaseUserGetInboxCount()
          
          setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 2000);
        //  this.getalldata(currentLatlong)
     })
     var queryUpdatemyinboxadded = firebase.database().ref('users/'+id+'/myInbox/');
      queryUpdatemyinboxadded.on('child_added', (data)=>{
       console.log('inboxkaaddedchid_added',data.toJSON())
       firebaseprovider.firebaseUserGetInboxCount()
       setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);
      
       // firebaseprovider.firebaseUserGetInboxCount();
  })
      }
      }
      getalldatamyoffer1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'get_all_item.php?user_id='+userdata.user_id+'&user_type=1';
      console.log("url:"+url);
    
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({item_details_arr:obj.item_details_arr,my_all_order_arr:obj.my_all_order_arr})
            } 
            else{
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                if(obj.msg[config.language]=='User not exists!')
                {
                  this.props.navigation.navigate('Logout')
                }
                if(obj.account_active_status=="deactivate")
                {
                  this.props.navigation.navigate('Logout')
               }
                return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
         this.setState({refresh:false})
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }  
      }
     getalldatamyoffer=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'get_all_item.php?user_id='+userdata.user_id+'&user_type=1';
      console.log("url:"+url);
      if(this.state.refresh==false)
         {
          this.setState({user_id:userdata.user_id,loading:true,})
         }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({item_details_arr:obj.item_details_arr,my_all_order_arr:obj.my_all_order_arr})
            } 
            else{
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                if(obj.msg[config.language]=='User not exists!')
                  {
                    this.props.navigation.navigate('Logout')
                  }
                if(obj.account_active_status=="deactivate")
                  {
                   this.props.navigation.navigate('Logout')
                  }
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
    _onRefresh = () => {
      this.setState({refresh:true})
     this.getalldatamyoffer1()
    }
    removepost=(item_id)=>{
      Alert.alert(
        "Confirm",
        "Do you want to remove post?",
        [
         { text: 'YES', onPress: () => this.removepost1(item_id) },
         { text: 'NO', onPress: () => console.log('cancle') },
         
       ],
       { cancelable: true },
    
      )
    } 
    removepost1=async(item_id)=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
         {
         var url = config.baseURL+'mark_complete.php?user_id='+user_id+'&item_id='+item_id+'&user_type=1'
         console.log("url:"+url);
        if(this.state.refresh==false)
          {
           this.setState({loading:true,})
         }
       fetch(url,{
          method: 'Get',
          headers: new Headers(config.headersapi), 
      
        }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
              let data=this.state.item_details_arr
                 let findindex=data.findIndex((item)=>{
                   return item.item_id==item_id
                 })
                 if(findindex!=-1)
                 {
                  data.splice(findindex,1)
                 }
                 if(data.length<=0)
                 {
                   data='NA'
                 }
              this.setState({item_details_arr:data})
              ToastAndroid.showWithGravityAndOffset(
                obj.msg[config.language],
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                25,
                50
              );
            } 
            else{
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>My Listing</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
    
            <View style={{flexDirection:'row',paddingTop:10,width:'100%',borderRadius:13}}>
               <TouchableOpacity activeOpacity={0.8} style={{width:'50%',alignSelf:'center'}} onPress={()=>{this.setState({Selling:true,Buying:false})}}>
                 {this.state.Selling==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Selling</Text>
                   </View>}
                   {this.state.Selling==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Selling</Text>
                   </View>}
               </TouchableOpacity>
             
               <TouchableOpacity activeOpacity={0.8} style={{width:'50%',alignSelf:'center'}} onPress={()=>{this.setState({Selling:false,Buying:true})}}>
                 {this.state.Buying==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Buying</Text>
                   </View>}
                   {this.state.Buying==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Buying</Text>
                   </View>}
               </TouchableOpacity>
              
              
          </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
          >
   <View style={{width:'100%',paddingBottom:80,alignSelf:'center'}}>
   {this.state.Selling==true && 
            <View style={{marginTop:30}}>
               {this.state.item_details_arr=='NA' &&
                     <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:20}}>Currently items are not available</Text> 
               }
              <FlatList
               data={this.state.item_details_arr}
               renderItem={({item,index})=>{
                 if(this.state.item_details_arr!='NA')
                   {
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%',paddingVertical:13}}>
                              <View style={{width:'32%',alignSelf:'center',height:'auto',backgroundColor:'#e8e8e8'}}>
                                  <Image source={item.item_images!='NA'?{uri:config.img_url1+item.item_images[0].image}:require('../icons/noimage.png')} style={{alignSelf:'center',width:'100%',height:100,backgroundColor:Colors.imagebackcolor,borderRadius:7}}/>
                                </View>
                                <View style={{width:'65%',height:'auto',marginLeft:'3%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    
                                   <Text style={{color:Colors.buttoncolor,borderRadius:3,width:'75%',paddingBottom:2,fontFamily:'Ubuntu-Medium',fontSize:13,}} numberOfLines={1}>{item.category_name}</Text>    
                                
                                  <View style={{flexDirection:'row',}}>
                               {item.approve_flag==1 && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Promot_item',{'promote_data':item})}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingRight:20,fontSize:14}}>Ad</Text>
                               </TouchableOpacity>}
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Myoffersellingedit',{'item_id':item.item_id})}}>
                                       <Image source={require('../icons/edit-border.png')} style={{alignSelf:'center',width:15,height:20,}}/>
                                   </TouchableOpacity>
                                   </View>
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingTop:7,fontSize:13}}>{item.item_name}</Text>
                               <View style={{flexDirection:'row',paddingVertical:6}}>
                               <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                                   <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}} numberOfLines={2}>{item.location}</Text>
                                 </View> 
                                 <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.item_price}</Text>
                                 <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Performance_item',{'item_performance':item})}}>
                                 <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13.6}}>Item Performance</Text>
                                 </TouchableOpacity>
                                 </View>
                               
                              
                                 </View>  
                                 </View> 
                                 {item.availability==1 && <TouchableOpacity onPress={()=>{this.removepost(item.item_id)}} style={{alignSelf:'flex-end',width:'100%',alignItems:'flex-end',}} >
                                 <Text style={{color:'#FFFFFF',backgroundColor:Colors.buttoncolor,paddingHorizontal:14,paddingVertical:5,borderRadius:10,fontFamily:'Ubuntu-Medium',fontSize:13.6}}>Remove</Text>
                                 </TouchableOpacity>} 
                                 <View style={{flexDirection:'row',paddingVertical:12,borderTopColor:Colors.lightgray,borderBottomColor:Colors.lightgray,borderBottomWidth:0.6,borderTopWidth:0.6,alignSelf:'center',width:'100%'}}>
                                 {item.approve_flag==0 && <View style={{flexDirection:'row',width:'45%' }}>
                                  <Image source={require('../icons/pending.png')} style={{alignSelf:'center',width:14,height:18,resizeMode:'contain'}}/>
                                  <Text style={{color:'black',fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:5,fontSize:11}}>Pending for Review</Text>    
                                    </View> }
                                    {item.approve_flag==1 && <View style={{flexDirection:'row',width:'45%' }}>
                                  <Image source={require('../icons/pending.png')} style={{alignSelf:'center',width:14,height:18,resizeMode:'contain'}}/>
                                  <Text style={{color:'black',fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:5,fontSize:11}}>APPROVED IT</Text>    
                                    </View> }
                                    {item.approve_flag==2 && <View style={{flexDirection:'row',width:'45%' }}>
                                  <Image source={require('../icons/pending.png')} style={{alignSelf:'center',width:14,height:18,resizeMode:'contain'}}/>
                                  <Text style={{color:'black',fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:5,fontSize:11}}>UNAPPROVED</Text>    
                                    </View> }
                                 <View style={{flexDirection:'row',width:'55%',alignItems:'flex-end',alignSelf:'flex-end',alignContent:'flex-end'}}>
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:11,alignSelf:'center'}}>Date Submit</Text>    
                                 <Icon2 name='calendar' size={18} color='gray' style={{alignSelf:'center',paddingLeft:5,paddingTop:2}}/>   
                                        <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:10,alignSelf:'center'}}>{item.createtime}</Text>    
                                  </View> 
                                   </View>
                    </View>
                  )
                  }
               }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>}


           {this.state.Buying==true &&
             <View style={{marginTop:30}}>
             {this.state.my_all_order_arr=='NA' &&
                   
                   <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:20}}>Currently orders are not available</Text> 
                  }
              <FlatList
               data={this.state.my_all_order_arr}
               renderItem={({item,index})=>{
                 if(this.state.my_all_order_arr!='NA')
                 {
                   if(item.item_details_info!='NA')
                   {
                  let item1=item.item_details_info[0]
                  return(
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':item.order_id})}}>
                  < View style={{width:'100%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#f5f5f5',paddingVertical:10,borderRadius:5}}>
             <View style={{width:'95%',alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:7,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item1.image!='NA'?{uri:config.img_url+item1.image[0].image}:require('../icons/noimage.png')} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                              
                                <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item1.category_name}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:7}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item1.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                                   {/* <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>Quantity: {item.quantity}</Text> */}
                                 <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:7}}>
                                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:12}}>Price</Text>    
                                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item1.item_price}</Text>
                                 </View> 
                                 </View>  
                                 </View>  
                    </View>
             <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',paddingHorizontal:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.order_no}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.createtime}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                {item.order_status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>Process</Text>}
                               {item.order_status==10 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                               {item.order_status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                               {item.order_status==2 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipped</Text>}
                               {item.order_status==3 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Delivered</Text>}
                               {item.order_status==4 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Item Sold</Text>}
                               {item.order_status==5 && <Text style={{color:'#e31238',fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                                          <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.item_count}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.total_amt}</Text></Text>
                                 </View>     
                    </View>
                    </View>
                    </TouchableOpacity>
                  )
                 }
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
           }




   {this.state.Buying=='sdkjgskadf' && 
            <View style={{marginTop:30}}>
              <FlatList
               data={this.state.orderdata}
               renderItem={({item,index})=>{
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%',paddingVertical:13}}>
                              <View style={{width:'32%',alignSelf:'center',height:100,backgroundColor:'#e8e8e8'}}>
                                  <Image source={item.image} style={{alignSelf:'center',width:'100%',height:100,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'65%',height:100,marginLeft:'3%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:Colors.buttoncolor,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category}</Text>    
                                   {/* <Image source={require('../icons/edit-border.png')} style={{alignSelf:'center',width:15,height:20,}}/> */}
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingTop:7,fontSize:13}}>{item.name}</Text>
                               <View style={{flexDirection:'row',paddingVertical:6}}>
                               <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                                   <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.add}</Text>
                                 </View> 
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.price}</Text>
                                
                                 </View>  
                                 </View>  
                                 {/* <View style={{flexDirection:'row',paddingVertical:12,borderTopColor:Colors.lightgray,borderBottomColor:Colors.lightgray,borderBottomWidth:0.6,borderTopWidth:0.6,alignSelf:'center',width:'100%'}}>
                                 <View style={{flexDirection:'row',width:'50%' }}>
                                  <Image source={require('../icons/pending.png')} style={{alignSelf:'center',width:14,height:18,}}/>
                                  <Text style={{color:'black',fontFamily:'Ubuntu-Bold',alignSelf:'center',paddingLeft:5,fontSize:13}}>Pending for Review</Text>    
                                 </View> 
                                 <View style={{flexDirection:'row',width:'50%'}}>
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13,alignSelf:'center'}}>Date Submit</Text>       
                  <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:12,alignSelf:'center',paddingLeft:5}}><Icon2 name='calendar' size={20} color='gray' />{item.date}</Text>    
                                 </View> 
                                   </View> */}
                    </View>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>}

         </View>
         </ScrollView>
       {/* ........................................Container finish............................... */}
    
       <UserFooter navigation={this.props.navigation} count_inbox={count_inbox}  color={this.state.page}/>
        
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
    },
    buttonlayoutheader:{
      width:'100%',
      alignSelf:'center',
      paddingVertical:15,
      borderBottomWidth:1,
      borderBottomColor:'#e8e8e8'
    },
   
   
})