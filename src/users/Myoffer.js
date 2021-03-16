import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler,RefreshControl,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import Loader from '../Loader';
import firebase from './Config1';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import NetInfo from '@react-native-community/netinfo';
import StarRating from 'react-native-star-rating';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
       {
         'image':require('../icons/nokia.jpg'),
          'name':'Nokia 2.2',
          'add':'Johar Town',
          'category':'Mobile',
          'date':'02/26/20',
          'price':'125.00'
        },
       
       
]
 
export default class Myoffer extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'offer',
             starCount:4.5,
             countinbox:0,
             Selling:true,
             Buying:false,
             Post:false,
             isConnected:true,
             refresh:false,
            orderdata:orderdata,
            item_details_arr:[],
            my_buy_item:[],
            user_wallet:0,
            }
      
    }
    onStarRatingPress(rating) {
      this.setState({
        starCount:rating
      
      });
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
        this.getalldatamyoffer()
        // firebaseprovider.firebaseUserGetInboxCount();
      this.getMyInboxAllData1();
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
     getalldatamyoffer1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'my_selling_and_buy.php?user_id='+userdata.user_id+'&user_type=1';
      console.log("url:"+url);
    
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
            this.setState({user_wallet:obj.user_wallet,item_details_arr:obj.my_selling_item_details_arr,my_buy_item:obj.my_buy_item_details_arr})
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
        var url = config.baseURL+'my_selling_and_buy.php?user_id='+userdata.user_id+'&user_type=1';
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
             this.setState({user_wallet:obj.user_wallet,item_details_arr:obj.my_selling_item_details_arr,my_buy_item:obj.my_buy_item_details_arr})
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
    // getalldatamyoffer=async()=>{
    //   let userdata=await localStorage.getItemObject('user_arr')
    //   let user_id=userdata.user_id
    //   if(this.state.isConnected===true)
    //   {
    //     var url = config.baseURL+'get_all_item.php?user_id='+userdata.user_id+'&user_type=1';
    //   console.log("url:"+url);
    //   if(this.state.refresh==false)
    //      {
    //       this.setState({user_id:userdata.user_id,loading:true,})
    //      }
    //    fetch(url,{
    //       method: 'GET',
    //       headers: new Headers(config.headersapi), 
    //       }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
    //          console.log('obj',obj)
    //        if(obj.success == 'true'){
    //          this.setState({item_details_arr:obj.item_details_arr})
    //         } 
    //         else{
    //             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
    //             if(obj.account_active_status=="deactivate")
    //             {
    //               this.props.navigation.navigate('Logout')
    //            }
    //             return false;
    //      }
    //    }).catch((error)=> {
    //      console.log("-------- error ------- "+error);
    //      msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
    //        this.setState({loading: false,refresh:false});
    //  });
    // }
    // else{
    //    msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    //  }  
    // }
    _onRefresh = () => {
      this.setState({refresh:true})
     this.getalldatamyoffer1()
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>My Offers</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
          >
            <View style={{flexDirection:'row',paddingTop:10,width:'100%',borderRadius:13}}>
            <TouchableOpacity activeOpacity={0.8} style={{width:'49.7%',alignSelf:'center'}} onPress={()=>{this.setState({Selling:true,Buying:false,Post:false})}}>
                 {this.state.Selling==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Selling</Text>
                   </View>}
                   {this.state.Selling==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Selling</Text>
                   </View>}
               </TouchableOpacity>
             
               <TouchableOpacity activeOpacity={0.8} style={{width:'49.7%',alignSelf:'center'}} onPress={()=>{this.setState({Selling:false,Buying:true,Post:false})}}>
                 {this.state.Buying==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Buying</Text>
                   </View>}
                   {this.state.Buying==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Buying</Text>
                   </View>}
               </TouchableOpacity>
               {/* <TouchableOpacity activeOpacity={0.8} style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({Selling:false,Buying:false,Post:true})}}>
                 {this.state.Post==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Past</Text>
                   </View>}
                   {this.state.Post==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Past</Text>
                   </View>}
               </TouchableOpacity> */}
              
              
          </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   {this.state.Selling==true && 
   <View style={{width:'100%',paddingBottom:210,alignSelf:'center'}}>
   <View style={{marginTop:30}}>
     <FlatList
      data={this.state.item_details_arr}
  showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>{
        if(this.state.item_details_arr!='NA')
        {
         return(
           <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderRadius:5,paddingHorizontal:10}}>
                     <View style={{flexDirection:'row',width:'100%',paddingVertical:13}}>
                     <View style={{width:'32%',alignSelf:'center',height:100,backgroundColor:'#e8e8e8'}}>
                         <Image source={{uri:config.img_url+item.item_images[0].image}} style={{alignSelf:'center',width
                         :'100%',height:100,borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                       </View>
                       <View style={{width:'65%',height:100,marginLeft:'3%'}}>  
                       <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                          <Text style={{color:Colors.buttoncolor,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category_name}</Text>    
                         <TouchableOpacity style={{width:'20%'}} onPress={()=>{this.props.navigation.navigate('Myoffersellingedit',{'item_id':item.item_id})}}>
                          <Image source={require('../icons/edit-border.png')} style={{alignSelf:'center',width:15,height:20,}}/>
                          </TouchableOpacity>
                        </View> 
                      <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingTop:7,fontSize:13}}>{item.item_name}</Text>
                      <View style={{flexDirection:'row',paddingVertical:6}}>
                      <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,paddingTop:2}}/>    
                          <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}} numberOfLines={2}>{item.location}</Text>
                        </View> 
                        <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.item_price}</Text>
                       
                        </View>  
                        </View>  
                        <View style={{flexDirection:'row',paddingVertical:12,borderTopColor:Colors.lightgray,borderBottomColor:Colors.lightgray,borderBottomWidth:0.6,borderTopWidth:0.6,alignSelf:'center',width:'100%'}}>
                       <TouchableOpacity style={{width:'42%' }}  onPress={()=>{this.props.navigation.navigate('Viewoffers',{'item_id':item.item_id,'item_name':item.item_name})}}>
                       <View style={{flexDirection:'row',width:'100%' }}>
                         <Image source={require('../icons/offer.png')} style={{alignSelf:'center',width:15,height:18,}}/>
                         <Text style={{color:'black',fontFamily:'Ubuntu-Bold',alignSelf:'center',paddingLeft:5,fontSize:12}}>View {item.offer_count} offers</Text>    
                        </View>
                        </TouchableOpacity> 
                        <View style={{flexDirection:'row',width:'58%'}}>
                        <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13,alignSelf:'center'}}>Date Submit</Text>     
                        <View style={{flexDirection:'row',paddingLeft:7,alignSelf:'center'}}>
                        <Icon2 name='calendar' size={20} color='gray'  />
                        <Text style={{color:'gray',fontFamily:'Ubuntu-Medium',fontSize:10}} numberOfLines={1}>{item.createtime}</Text>    
                        </View>  
     
                        </View> 
                          </View>
           </View>
         )
        }
        else{
          if(item=='N')
          {
            return(
              <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently selling items are not available</Text>
            )
          }
        }
      }}
      keyExtractor={(item, index) => index.toString()}
     />
   </View>

</View>
   }
   {this.state.Buying==true && 
   <View style={{width:'100%',paddingBottom:80,alignSelf:'center'}}>
            <View style={{marginTop:30}}>
              <FlatList
               data={this.state.my_buy_item}
               renderItem={({item,index})=>{
                 if(this.state.my_buy_item!='NA')
                 {
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%',paddingVertical:13}}>
                              <View style={{width:'32%',alignSelf:'center',height:100,backgroundColor:'#e8e8e8'}}>
                              <Image source={item.item_images!='NA'?{uri:config.img_url+item.item_images[0].image}:require('../icons/noimage.png')} style={{alignSelf:'center',width
                                          :'100%',height:100,borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'65%',height:100,marginLeft:'3%'}}> 
                                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                <Text style={{color:'#86e6eb',borderRadius:3,backgroundColor:'#e4f1f2',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category_name}</Text>    
                  {item.get_offer_status==1 &&     <Text style={{color:Colors.buttoncolor,marginLeft:10,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>Offer Accepted</Text> }   
                  {item.get_offer_status==0 &&     <Text style={{color:Colors.buttoncolor,marginLeft:10,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>Offer Pending</Text> }                
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingTop:7,fontSize:13}}>{item.item_name}</Text>
                               <View style={{flexDirection:'row',paddingVertical:6}}>
                               <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                                   <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}} numberOfLines={2}>{item.location}</Text>
                                 </View> 
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.get_offer_price}</Text>
                                
                                 </View>  
                                 </View>  
                                 <View style={{flexDirection:'row',paddingVertical:10,borderTopColor:Colors.lightgray,borderBottomColor:Colors.lightgray,borderBottomWidth:0.6,borderTopWidth:0.6,alignSelf:'center',width:'100%'}}>
                                 <View style={{width:'15%',}}>
                                 <Image source={item.userDetails.image!='NA'?{uri:config.img_url+item.userDetails.image}:require('../icons/name.png')}  style={{alignSelf:'center',width:30,height:30,borderRadius:14}}/>
                                  </View> 
                                 <View style={{width:'85%',alignSelf:'center'}}>
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.userDetails.name}</Text>     
                                 <View style={{flexDirection:'row',width:'100%'}}>
                                   <View style={{width:'30%',alignSelf:'center'}}>
                                   <StarRating
                                         disabled={true}
                                         fullStar={require('../icons/star2.png')}
                                         emptyStar={require('../icons/unfilstar.png')}
                                          // halfStarEnabled={true}
                                          // halfStarColor={Colors.Buttoncolor}
                                          //  emptyStarColor={Colors.textcolor}
                                          maxStars={5}
                                          starSize={10}
                                          rating={item.total_rate}
                                    //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                                 />
                                
                                 </View> 
                                 <Text style={{color:'gray',alignSelf:'center',fontFamily:'Ubuntu-Medium',width:'10%',paddingLeft:10,fontSize:12}}>{parseInt(item.total_rate)}</Text>    
                                {/* {item.order_details!='NA' &&  <TouchableOpacity style={{width:'60%',alignItems:'flex-end'}} onPress={()=>{this.props.navigation.navigate('Usersellingproductdetaile',{'order_details':item.order_details})}}> */}
                               {item.order_details!='NA' &&  <TouchableOpacity style={{width:'60%',alignItems:'flex-end'}} onPress={()=>{this.props.navigation.navigate('Orderdetailuser',{'order_id':item.order_details.order_id})}}>
                                     <View style={{alignSelf:'flex-end',width:'60%',paddingVertical:8,borderRadius:7,backgroundColor:Colors.buttoncolor,}}>
                                         <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium'}}>Recived</Text>  
                                     </View>
                                  </TouchableOpacity>}
                                  {item.get_offer_status>0 && <TouchableOpacity style={{width:'60%',alignItems:'flex-end'}} onPress={()=>{this.props.navigation.navigate('Reviewyouroffer',{'productdetaile':item})}}>
                                     <View style={{alignSelf:'flex-end',width:'60%',paddingVertical:8,borderRadius:7,backgroundColor:Colors.buttoncolor,}}>
                                         <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium'}}>Pay now</Text>  
                                     </View>
                                  </TouchableOpacity>}
                                 </View>  
              
                                 </View> 
                                   </View>
                    </View>
                  )
                }
                else{
                  if(item=='N')
                  {
                    return(
                      <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently buying items are not available</Text>
                    )
                  }
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>

         </View>
         }
            {this.state.Post==true && 
   <View style={{width:'100%',paddingBottom:80,alignSelf:'center'}}>
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
                                <View style={{flexDirection:'row',}}>
                                <Text style={{color:'#86e6eb',borderRadius:3,backgroundColor:'#e4f1f2',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category}</Text>    
                                   <Text style={{color:Colors.buttoncolor,marginLeft:10,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>Offer Accepted</Text>    
                                  
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingTop:7,fontSize:13}}>{item.name}</Text>
                               <View style={{flexDirection:'row',paddingVertical:6}}>
                               <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                                   <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.add}</Text>
                                 </View> 
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.price}</Text>
                                
                                 </View>  
                                 </View>  
                                 <View style={{flexDirection:'row',paddingVertical:10,borderTopColor:Colors.lightgray,borderBottomColor:Colors.lightgray,borderBottomWidth:0.6,borderTopWidth:0.6,alignSelf:'center',width:'100%'}}>
                                 <View style={{width:'15%',}}>
                                  <Image source={require('../icons/men.jpg')} style={{alignSelf:'center',width:25,height:25,borderRadius:14}}/>
                                  </View> 
                                 <View style={{width:'85%',alignSelf:'center'}}>
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Octasia Mushiro</Text>     
                                 <View style={{flexDirection:'row',width:'100%'}}>
                                   <View style={{width:'30%',alignSelf:'center'}}>
                                   <StarRating
                                         disabled={false}
                                         fullStar={require('../icons/star2.png')}
                                         emptyStar={require('../icons/star.png')}
                                          // halfStarEnabled={true}
                                          // halfStarColor={Colors.Buttoncolor}
                                          //  emptyStarColor={Colors.textcolor}
                                          maxStars={5}
                                          starSize={10}
                                          rating={this.state.starCount}
                                     selectedStar={(rating) => this.onStarRatingPress(rating)}
                                 />
                                
                                 </View> 
                                 <Text style={{color:'gray',alignSelf:'center',fontFamily:'Ubuntu-Medium',width:'10%',paddingLeft:10,fontSize:12}}>{this.state.starCount}</Text>    
                                  <TouchableOpacity style={{width:'60%',alignItems:'flex-end'}} onPress={()=>{this.props.navigation.navigate('Reviewseller')}}>
                                     <View style={{alignSelf:'flex-end',width:'60%',paddingVertical:8,borderRadius:7,backgroundColor:Colors.buttoncolor,}}>
                                         <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium'}}>Recived</Text>  
                                     </View>
                                  </TouchableOpacity>
                                 </View>  
              
                                 </View> 
                                   </View>
                    </View>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>

         </View>
         }
       {/* ........................................Container finish............................... */}
     
       </ScrollView>
       <UserFooter navigation={this.props.navigation} count_inbox={count_inbox} color={this.state.page}/>
        
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
    }
   
})