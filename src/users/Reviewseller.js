import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,Modal,Keyboard,Alert,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import StarRating from 'react-native-star-rating';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import {notification} from '../providers/NotificationProvider';
import Loader from '../Loader';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import { FlatList } from 'react-native-gesture-handler';

const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Reviewseller extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
            isConnected:true,
            refresh:false,
             modalVisible:false,
             starCount:0,
             compliment5:false,
             tip_amount:0,
             compliment10:false,
             compliment15:false,
             ratingdetaile:this.props.navigation.getParam('ratingdetaile'),
             review:'',
             description:''
            }
            OneSignal.init(config.onesignalappid, {
              kOSSettingsKeyAutoPrompt: true,
            });
        
            OneSignal.setLogLevel(6, 0);
    }
    componentDidMount(){
      console.log('ratingdetaile',this.state.ratingdetaile)
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
    //  this.review_datile()
    //     let data=this.state.ratingdetaile
    //     this.setState({starCount:data.total_rate,})
       }

       review_datile=()=>{
            
       }

    onStarRatingPress(rating) {
      this.setState({
        starCount:rating
       });
    }
  // ratingbtn=async()=>{
  //     let userdata=await localStorage.getItemObject('user_arr')
     
  //     if(this.state.isConnected===true)
  //     {
  //      if(this.state.refresh==false)
  //      {
  //       this.setState({user_id:userdata.user_id,loading:true,})
  //      }
  //      var url = config.baseURL+'get_user_review.php?user_id='+userdata.user_id+'&user_type=1'
  //       let data=new FormData();
  //       data.append('user_id',user_id)
  //       data.append('user_type',1)
  //       data.append('order_id',1)
  //       data.append('rate',user_id)
  //       data.append('comment',user_id)
  //       data.append('tip_amount',user_id)
  //      console.log("url:"+url);
  //        fetch(url,{
  //         method: 'GET',
  //         headers: new Headers(config.headersapi), 
  //         }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
  //            console.log('obj',obj)
  //          if(obj.success == 'true'){
  //              this.props.navigation.navigate('Myoffer')
  //              } 
  //           else{
  //               msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
  //               if(obj.account_active_status=="deactivate")
  //               {
  //                 this.props.navigation.navigate('Logout')
  //              }
  //               return false;
  //        }
  //      }).catch((error)=> {
  //        console.log("-------- error ------- "+error);
  //        msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
  //        this.setState({refresh:false})
  //    });
  //   }
  //   else{
  //      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
  //    }  
  //   }
    ratereviewbtn=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      
      if(this.state.isConnected===true)
      {
      
        this.setState({loading:true,})
      
       var url = config.baseURL+'review.php'
       let data=new FormData()
   
       data.append('user_id',user_id)
       data.append('user_type',1)
       data.append('order_id',this.state.ratingdetaile.order_id)
       data.append('rate',this.state.starCount)
       data.append('comment',this.state.description)
       data.append('tip_amount',this.state.tip_amount)
         console.log("url:"+url);
         console.log("data:",data);
         fetch(url,{
          method: 'POST',
          headers: new Headers(config.headersapi), 
          body:data,
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,modalVisible:false,refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
                if(obj.notification_arr!='NA')
                {
                 for(let i=0; i<obj.notification_arr[0].length; i++)
                 {
                  notification.notificationfunction(obj.notification_arr[0][i].message,obj.notification_arr[0][i].action_json,obj.notification_arr[0][i].player_id,obj.notification_arr[0][i].title)
                 }
                }
              this.props.navigation.navigate('Userhome')
               } 
            else{
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
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
    render(){
     let item1=this.state.ratingdetaile
        console.log('cikasd')
return(
    <View style={styles.container}>
      <Loader loading={this.state.loading}/>
         <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
         this.setState({modalVisible:false})
          }}>
          <View style={{flex:1,backgroundColor:'#00000040'}}>
          
            <View style={styles.modalcontainer}>
             <View style={{flexDirection:'row',justifyContent:"space-between",paddingVertical:10,paddingTop:15}}>
                 <Text style={{fontSize:15,fontWeight:'bold'}}>REVIEW SELLER</Text>
                 <TouchableOpacity onPress={()=>{this.setState({modalVisible:false})}}>
                 <Image source={require('../icons/cross.png')} style={{width:18,height:18}}/>
                 </TouchableOpacity>
             </View>
             <View style={{width:'45%',alignSelf:'center',paddingVertical:10,paddingBottom:20}}>
             <StarRating
                disabled={false}
                fullStar={require('../icons/star2.png')}
              emptyStar={require('../icons/unfilstar.png')}
                halfStarEnabled={false}
                // halfStarColor={Colors.buttoncolor}
                // emptyStarColor={Colors.Buttoncolor}
                 maxStars={5}
                 starSize={27}
                 rating={this.state.starCount}
               selectedStar={(rating) => {this.setState({starCount:rating})}}
             />
             
             </View>
           
             <View style={{borderTopWidth:0.5,paddingTop:25}}>
             <Text style={{fontSize:14,fontWeight:'bold'}}>LEAVE A FEEDBACK</Text>
             </View>
             <View style={{paddingVertical:20}}>
                           
                           <TextInput
           // containerStyle={styles.textareaContainer}
                          style={styles.Textarea_Style}
                           placeholder={'User Discription.....'}
                            placeholderTextColor={'#333'}
                           multiline={true}
                           autoFocus={false}
                            blurOnSubmit={true}
                          onSubmitEditing={()=>{Keyboard.dismiss()}}
                          underlineColorAndroid={'transparent'}
                           onChangeText={(txt) => this.setState({description:txt})}
                             />
                         </View>
                         <TouchableOpacity style={styles.Reviewbutton} onPress={()=>{this.setState({modalVisible:false})}} >
                            <Text style={{textAlign:'center',color:'#FFFFFF',fontSize:16}}>
                               ADD REVIEW
                            </Text>
                        </TouchableOpacity>
            
     </View>
   
          </View>
        </Modal>
 
        {/* //=----------------------header part---------=000------ */}
       {/* //=----------------------header part---------=000------ */}
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',height:screenHeight*8/100,}}>
         <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{width:'65%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Review Seller</Text>
          </View>
          <TouchableOpacity style={{width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
          <View style={{width:'100%',alignSelf:'center'}}>
          <Text style={{color:'#6ee089',fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center'}}>SKIP NOW</Text>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor,width:'100%'}}></View>
         </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView style={{marginBottom:100}}>
        <View style={{paddingHorizontal:20,paddingTop:60,alignItems:'center',marginTop:40,alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
          {item1.seller_details.image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:80,height:80,borderRadius:40,alignSelf:'center',backgroundColor:'gray'}}/>:
                       <Image source={item1.seller_details.login_type=='app'?{uri:config.img_url1+item1.seller_details.image}:{uri:item1.seller_details.image}} style={{width:80,height:80,borderRadius:40,alignSelf:'center',backgroundColor:'gray'}}/>
                     }
        </View>
             <View style={{width:'70%',alignSelf:'center',paddingTop:25,paddingLeft:8}}>
                                   <StarRating
                                          disabled={true}
                                          fullStar={require('../icons/star2.png')}
                                          emptyStar={require('../icons/unfilstar.png')}
                                          maxStars={5}
                                          starSize={35}
                                          rating={this.state.starCount}
                                        //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                                   />
                                
                            </View> 
                         <TouchableOpacity style={{width:'60%'}} onPress={()=>{this.setState({modalVisible:true})}}>
                            <View style={{backgroundColor:'#fae6fa',flexDirection:'row',alignSelf:'center',alignItems:'center',borderRadius:6,justifyContent:'center',marginTop:15,paddingVertical:12,width:'100%'}}>
                            <Image source={require('../icons/compliment.png')} style={{alignSelf:'center',width:17,height:18,}}/>
                            <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>Give a compliment</Text>
                            </View>
                            </TouchableOpacity>
                             {/* <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,paddingTop:20,textAlign:"center",paddingTop:60}}>Add a tips for Octasia Mushiro</Text>
                             <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',textAlign:'center',fontSize:13,alignSelf:'center',paddingTop:10,lineHeight:20}}>Original Price was $126.00</Text> */}
                            {/* <View style={{flexDirection:'row',width:'70%',justifyContent:'space-evenly',paddingTop:20}}>
                               <TouchableOpacity onPress={()=>{this.setState({compliment5:true,compliment15:false,compliment10:false,tip_amount:5})}}>
                               {this.state.compliment5==false && <View style={{backgroundColor:'#f5ebf5',width:70,height:70,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>$5.00</Text>
                                 </View>}
                                 {this.state.compliment5==true && <View style={{backgroundColor:Colors.buttoncolor,width:70,height:70,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>$5.00</Text>
                                 </View>}
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={()=>{this.setState({compliment5:false,compliment15:false,compliment10:true,tip_amount:10})}}>
                               {this.state.compliment10==false && <View style={{backgroundColor:'#f5ebf5',width:70,height:70,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>$10.00</Text>
                                 </View>}
                                 {this.state.compliment10==true && <View style={{backgroundColor:Colors.buttoncolor,width:70,height:70,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>$10.00</Text>
                                 </View>}
                                 </TouchableOpacity>
                                 <TouchableOpacity onPress={()=>{this.setState({compliment5:false,compliment15:true,compliment10:false,tip_amount:15})}}>
                               {this.state.compliment15==false && <View style={{backgroundColor:'#f5ebf5',width:70,height:70,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>$15.00</Text>
                                 </View>}
                                 {this.state.compliment15==true && <View style={{backgroundColor:Colors.buttoncolor,width:70,height:70,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
                                 <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:12,textAlign:'center',paddingLeft:5}}>$15.00</Text>
                                 </View>}
                                 </TouchableOpacity>
                                
                            </View> */}
                            {/* <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',textAlign:'center',fontSize:13,alignSelf:'center',paddingTop:10,lineHeight:20}}>Enter custom amount</Text>
                            <View style={{width:'80%',marginTop:10,alignContent:'center',justifyContent:'center'}}>
                              <TextInput
                               placeholder='Please enter custom amount'
                               placeholderTextColor='gray'
                               keyboardType='number-pad'
                               returnKeyLabel='done'
                               returnKeyType='done'
                               ref={(input) => { this.tip_amount = input; }}
                               onSubmitEditing={()=>{Keyboard.dismiss()}}
                               onFocus={()=>{this.setState({errorno:0})}}
                               onChangeText={(txt)=>{this.setState({tip_amount:txt})}}
                               style={{borderWidth:0.7,borderColor:'#f2f2f2',paddingLeft:10,paddingVertical:10,width:'100%'}}
                              />
                            </View> */}
              </View>  
              </ScrollView>
       {/* ........................................Container finish............................... */}
     
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'95%',}}>
          <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.state.starCount!=0?this.ratereviewbtn():alert('please give a compliment') }}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Submit Review</Text>
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
    },
    modalcontainer:{
      position:"absolute",
      paddingHorizontal:30,
      height:'60%',
      bottom:10,
      right:0,left:0,
      backgroundColor:'#FFFFFF',
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
      elevation: 10,
      shadowOffset: {
      height: 1,
      width:0, },
      shadowColor: "rgba(0,0,0,.5)",
      shadowOpacity: 0.5,
      shadowRadius: 7,
  },
  Reviewbutton:{
    backgroundColor:Colors.buttoncolor,
    width:'80%',
    borderRadius:45,
    paddingVertical:13,
    marginTop:20,
    // position:"absolute",
    // bottom:5,
    alignSelf:'center'
}, 
Textarea_Style:{
  width:'98%',
  color:'#000',
  textAlignVertical: 'top',
 
  paddingLeft:20,
  paddingRight:50,
  fontSize:15,
  height:110,
  justifyContent: "flex-start",
  // borderWidth: 1,
  // borderColor:'#b3b3b3',
  borderRadius:20,

  borderColor:Colors.inputborder,
  borderWidth:1.5,
},
})