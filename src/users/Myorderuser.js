import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import UserFooter from './UserFooter'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import Loader from '../Loader';
import firebase from './Config1';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import NetInfo from '@react-native-community/netinfo';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
       {
          'orderno':'876543',
           'date':'29 April 1:21 pm',
           'status':0,
           'quantity':3,
            'price':24,
        },
        {
          'orderno':'876543',
           'date':'29 April 1:21 pm',
           'status':1,
           'quantity':2,
            'price':21,
        },
        {
        'orderno':'876543',
        'date':'29 April 1:21 pm',
        'status':2,
        'quantity':1,
         'price':'09',
        }
]
 

export default class Myorderuser  extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
            
             page:'orders',
             All:true,
             Ongoing:false,
             Wating:false,
             isConnected:true,refresh:false,
             Complete:false,
             my_all_order_arr:[],
             my_waitting_order_arr:[],
             my_ongoing_order_arr:[],
             my_completed_order_arr:[],
             orderdata:orderdata
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
          this.getorderdata1()
         });
         this.getMyInboxAllData1();
        this.getorderdata()
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
          
          setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);
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
     getorderdata1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'get_all_my_order.php?user_id='+userdata.user_id+'&user_type=1';
      console.log("url:"+url);
    
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({my_completed_order_arr:obj.my_completed_order_arr,my_all_order_arr:obj.my_all_order_arr,my_waitting_order_arr:obj.my_waitting_order_arr,my_ongoing_order_arr:obj.my_ongoing_order_arr})
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
   getorderdata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'get_all_my_order.php?user_id='+userdata.user_id+'&user_type=1';
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
            this.setState({my_completed_order_arr:obj.my_completed_order_arr,my_all_order_arr:obj.my_all_order_arr,my_waitting_order_arr:obj.my_waitting_order_arr,my_ongoing_order_arr:obj.my_ongoing_order_arr})
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
      this.getorderdata1()
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
 <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
  <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
     <View style={{width:'100%',alignSelf:'center'}}>
          <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
      </View>
   </TouchableOpacity>
   <View style={{paddingVertical:15,width:'60%'}}> 
     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>My Orders</Text>
   </View>
   {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
     <View style={{width:'100%',alignSelf:'center'}}>
          <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:18,height:18}}/>
      </View>
   </TouchableOpacity> */}
         
 </View>
 {/* ..............................heaser finish................................ */}
  <View style={{width:'95%',paddingTop:20,paddingBottom:80,alignSelf:'center'}}>
     <View style={{flexDirection:'row',width:'100%',backgroundColor:'#f5f5f5',borderRadius:13}}>
        <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({All:true,Ongoing:false,Wating:false,Complete:false})}}>
          {this.state.All==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>All</Text>
            </View>}
            {this.state.All==false && <View style={{width:'100%',borderRadius:12,paddingVertical:14}}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>All</Text>
            </View>}
        </TouchableOpacity>
      
        <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Ongoing:true,Wating:false,Complete:false})}}>
          {this.state.Ongoing==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Ongoing</Text>
            </View>}
            {this.state.Ongoing==false && <View style={styles.buttonlayoutheader}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Ongoing</Text>
            </View>}
        </TouchableOpacity>
        {/* <TouchableOpacity style={{width:'25%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Ongoing:false,Wating:true,Complete:false})}}>
          {this.state.Wating==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Waiting</Text>
            </View>}
            {this.state.Wating==false && <View style={styles.buttonlayoutheader}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Waiting</Text>
            </View>}
        </TouchableOpacity> */}
        <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Ongoing:false,Wating:false,Complete:true})}}>
          {this.state.Complete==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Completed</Text>
            </View>}
            {this.state.Complete==false && <View style={styles.buttonlayoutheader}>
              <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Completed</Text>
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
        showsVerticalScrollIndicator={false}
          > 
  {this.state.All==true && 
        <View style={{marginTop:30,paddingBottom:110}}>
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
            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.order_id})}}>
           <View style={{width:'100%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#f5f5f5',paddingVertical:10,borderRadius:5}}>
             <View style={{width:'95%',alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:7,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item1.image!='NA'?{uri:config.img_url+item1.image[0].image}:require('../icons/noimage.png')} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item1.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>{item1.category_name}</Text>
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
                        {item.order_status==2 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipping</Text>}
                        {item.order_status==3 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Delivered</Text>}
                        {item.order_status==4 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Completed</Text>}
                        {item.order_status==5 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
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
     </View>}
     {this.state.Ongoing==true && 

    <View style={{marginTop:30,paddingBottom:110}}>
       {this.state.my_ongoing_order_arr=='NA' &&
            
            <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:20}}>Currently orders are not available</Text> 
           }
       <FlatList
        data={this.state.my_ongoing_order_arr}
        renderItem={({item,index})=>{
          if(this.state.my_ongoing_order_arr!='NA')
           {
            if(item.item_details_info!='NA')
            {
            let item1=item.item_details_info[0]
           return(
             <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.order_id})}}>
           <View style={{width:'100%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#f5f5f5',paddingVertical:10,borderRadius:5}}>
             <View style={{width:'95%',alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:7,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item1.image!='NA'?{uri:config.img_url+item1.image[0].image}:require('../icons/noimage.png')} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item1.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>{item1.category_name}</Text>
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
                         {item.order_status==5 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}   
                        {item.order_status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                        {item.order_status==2 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipping</Text>}
                        {item.order_status==3 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Delivered</Text>}
                        {item.order_status==4 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Completed</Text>}
                           <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x 1= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.total_amt}</Text></Text>
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
     </View>}
     {this.state.Complete==true && 
    <View style={{marginTop:30,paddingBottom:110}}>
         {this.state.my_completed_order_arr=='NA' &&
            
            <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:10}}>No Completed order right now</Text> 
           }
           {/* 0='Placed', 1='Accept', 2='Proceed', 3='On the way', 4='Delivered', 5='Cancelled by admin', 6='Cancelled by customer', */}
       <FlatList
        data={this.state.my_completed_order_arr}
        renderItem={({item,index})=>{
          if(this.state.my_completed_order_arr!='NA')
            {
              if(item.item_details_info!='NA')
            {
          let item1=item.item_details_info[0]
           return(
            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.order_id})}}>
  <View style={{width:'100%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#f5f5f5',paddingVertical:10,borderRadius:5}}>
             <View style={{width:'95%',alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:7,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item1.image!='NA'?{uri:config.img_url+item1.image[0].image}:require('../icons/noimage.png')} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item1.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>{item1.category_name}</Text>
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
                     
                        {item.order_status==4 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Completed</Text>}
                      
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
     </View>}
     {this.state.Wating==true && 
    <View style={{marginTop:30}}>
       {this.state.my_waitting_order_arr=='NA' &&
            
            <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:10}}>Currently orders are not available</Text> 
           }
       <FlatList
        data={this.state.my_waitting_order_arr}
        renderItem={({item,index})=>{
          if(this.state.my_waitting_order_arr!='NA')
         {
          if(item.item_details_info!='NA')
          {
          let item1=item.item_details_info[0]
           return(
            <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.order_id})}}>
           <View style={{width:'100%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderWidth:1,borderColor:'#f5f5f5',paddingVertical:10,borderRadius:5}}>
             <View style={{width:'95%',alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:7,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item1.image!='NA'?{uri:config.img_url+item1.image[0].image}:require('../icons/noimage.png')} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item1.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>{item1.category_name}</Text>
                                   {/* <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>Quantity: {item.quantity}</Text> */}
                                 <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:7}}>
                                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:12}}>Price</Text>    
                                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item1.item_price}</Text>
                                 </View> 
                                 </View>  
                                 </View>  
                    </View>
             <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',paddingHorizontal:10}}>
       
                        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.orderno}</Text>
                        <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.date}</Text>
                         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                         {item.order_status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>Pending</Text>}
                        {item.order_status==3 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                        {item.order_status==4 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                        {item.order_status==6 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                        {item.order_status==5 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}       
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.quantity}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.price}</Text></Text>
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
     </View>}

  
  </ScrollView>  
  </View>
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
      borderRadius:12,paddingVertical:15
    }
   
})