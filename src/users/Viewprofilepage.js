import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import NetInfo from '@react-native-community/netinfo';
import firebase from './Config1';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import StarRating from 'react-native-star-rating';
import Loader from '../Loader'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native-gesture-handler';
import { floor } from 'react-native-reanimated';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
     
        {
          'image':require('../icons/honda1.png'),
            'name':'Honda Civic 2016',
            'add':'Oxford Street',
          'category':'Cars & trucks',
          'date':'02/26/20',
          'price':'128,0000.00'
        },
       
]
const reviewdata=[
    {
        'name':'Kaira Saunders',
        'image':require('../icons/men.jpg'),
         'date':'Sep 18 2020',
         'rating':'5.0'
        },
        {
         'name':'Kaira Saunders',
         'image':require('../icons/men.jpg'),
         'date':'Sep 18 2020',
         'rating':'5.0'
         },
            {
          'name':'Kaira  Saunders',
          'image':require('../icons/men.jpg'),
           'date':'Sep 18 2020',
           'rating':'5.0'
         },
         {
            'name':'Kaira  Saunders',
            'image':require('../icons/men.jpg'),
             'date':'Sep 18 2020',
             'rating':'5.0'
           },
] 
export default class Viewprofilepage extends Component{
    constructor(props) {
        super(props);
        this.state = { 
              loading: false,
              follow_status:0,
              user_id:'',
              listingdata:[],
              modalVisible:false,
              isConnected:true,
              Profile:false,
              Listing:false,
              Review:true,
              follow_count:0,
              image:'',
              name:'',
              allRating_arr:[],
              login_type:'app',
              email:'',
              reviewdata:reviewdata,
              other_user_details:{},
              other_user_id:this.props.navigation.getParam('other_user_id'),
              allRating_arr:[],
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
        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener('didFocus', () => {
        //  this.getlatlong()
        //  });
       
        this.getMyInboxAllData1();
        this.getalluserdata();
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
     queryUpdatemyinbox.on('child_added', (data)=>{
      console.log('inboxkachildchange',data.toJSON())
      firebaseprovider.firebaseUserGetInboxCount()
      setTimeout(()=>{ this.setState({countinbox:count_inbox}) }, 3000);
    //  this.getalldata(currentLatlong)
 })
      }
      
    }
    getalluserdata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
     console.log('userdata',userdata)
      if(this.state.isConnected===true)
    {
       var url = config.baseURL+'get_user_review.php?user_id='+userdata.user_id+'&user_type=1'
       console.log("url:"+url);
      this.setState({user_id:userdata.user_id,loading:true,image:userdata.image,name:userdata.name,email:userdata.email,login_type:userdata.login_type})
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({allRating_arr:obj.allRating_arr})
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

    //   followbtn=async()=>{
    //     let userdata=await localStorage.getItemObject('user_arr')
    //     if(this.state.isConnected===true)
    //      {
    //     let data=new FormData()
    //     data.append('user_id',userdata.user_id)
    //     data.append('user_type',1)
    //     data.append('other_user_id',this.state.other_user_details.user_id)
    //     var url = config.baseURL+'add_follow.php'
    //      console.log("url:"+url);
       
    //       this.setState({loading:true,})
      
    //      fetch(url,{
    //         method: 'POST',
    //         headers: new Headers(config.headersapi), 
    //         body:data
    //         }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
    //      console.log('obj',obj)
    //          if(obj.success == 'true'){
    //            if(obj.follow_status==1)
    //            {
    //                this.setState({follow_count:this.state.follow_count+1})
    //            }else{
    //                this.setState({follow_count:this.state.follow_count-1})
    //                }
    //             this.setState({follow_status:obj.follow_status})
    //             } 
    //            else{
    //             if(obj.account_active_status=="deactivate")
    //             {
    //                this.props.navigation.navigate('Logout')
    //             }
    //               msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
    //             return false;
    //        }
    //      }).catch((error)=> {
    //        console.log("-------- error ------- "+error);
    //        msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
    //          this.setState({loading: false,refresh:false});
    //    });
    //   }
    //   else{
    //      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    //    }  
    //   }
    
    render(){
        console.log('cikasd')
       let  user_data=this.state.other_user_details
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
        <View style={{width:'100%',paddingTop:20,alignSelf:'center',}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20}}>
         <TouchableOpacity style={{paddingVertical:17,}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center',}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:17,}} onPress={()=>{this.props.navigation.replace('Usereditprofile',{'page':'view'})}}> 
            <View style={{width:'100%',alignSelf:'center',}}>
            <Text style={{ color:Colors.buttoncolor,fontSize:13,fontFamily:'Ubuntu-Medium',}}>Edit</Text>
             </View>
          </TouchableOpacity>
          </View>
          <View style={{alignSelf:'center',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <View style={{width:'100%'
          ,alignSelf:'center',}}>
          {this.state.image=='NA'?
                       <Image source={require('../icons/name.png')} style={{alignSelf:'center',width:75,height:75,borderRadius:50,backgroundColor:Colors.imagebackcolor}}/>:
                       <Image source={this.state.login_type=='app'?{uri:config.img_url1+this.state.image}:{uri:this.state.image}} style={{alignSelf:'center',width:75,height:75,borderRadius:50,backgroundColor:Colors.imagebackcolor}}/>
                     } 
              </View>
                    <Text style={{color:'black',fontSize:15,textAlign:'center',fontFamily:'Ubuntu-Bold',paddingTop:10}}>{this.state.name}</Text>
          {/* <Text style={{color:'gray',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',paddingTop:7}}>{this.state.name}</Text> */}
            <View style={{backgroundColor:Colors.buttoncolor, paddingVertical:6,marginTop:3,borderRadius:5,width:'65%',alignSelf:'center'}} activeOpacity={1}>
                    <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',}}>{this.state.email}</Text>
           </View>
           {/* <View style={{width:'65%',flexDirection:'row'}}>
           <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Followunfolowuserlist',{'btn':'follow','pagename':'Following User'})}} style={{backgroundColor:Colors.buttoncolor,paddingVertical:10,marginTop:10,borderRadius:5,width:'49%',alignSelf:'center'}} activeOpacity={0.8}>
                    <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',}}>Follow User</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Followunfolowuserlist',{'btn':'unfollow','pagename':'Unfollowing User'})}} style={{backgroundColor:Colors.buttoncolor,paddingVertical:10,marginTop:10,marginLeft:'1%',borderRadius:5,width:'49%',alignSelf:'center'}} activeOpacity={1}>
                    <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',}}>Unfollow User</Text>
           </TouchableOpacity>
           </View>  */}
          </View>
        
          </View>
        {/* ..............................heaser finish................................ */}
    
            <View style={{flexDirection:'row',paddingTop:10,width:'100%',borderRadius:13}}>
               {/* <TouchableOpacity activeOpacity={0.8} style={{width:'49.7%',alignSelf:'center'}} onPress={()=>{this.setState({Listing:true,Profile:false,Review:false})}}>
                 {this.state.Listing==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Listing</Text>
                   </View>}
                   {this.state.Listing==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Listing</Text>
                   </View>}
               </TouchableOpacity> */}
             
               {/* <TouchableOpacity activeOpacity={0.8} style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({Listing:false,Profile:true,Review:false})}}>
                 {this.state.Profile==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Profile</Text>
                   </View>}
                   {this.state.Profile==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Profile</Text>
                   </View>}
               </TouchableOpacity> */}
               <TouchableOpacity activeOpacity={1} style={{width:'100%',alignSelf:'center'}} >
                 {this.state.Review==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor,paddingLeft:10}}>Reviews</Text>
                   </View>}
                   {this.state.Review==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{fontFamily:'Ubuntu-Medium',color:'black',paddingLeft:10}}>Reviews</Text>
                   </View>}
               </TouchableOpacity>
              
              
          </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
    
      
       {this.state.Review==true && 
      <View style={{width:'100%',paddingBottom:80,alignSelf:'center'}}>
      {/* <Text style={{color:'black',paddingLeft:20,paddingTop:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>Reviews</Text>     */}
      <View style={{marginTop:10,paddingBottom:350}}>
        <FlatList
         data={this.state.allRating_arr}
         showsVerticalScrollIndicator={false}
         renderItem={({item,index})=>{
           if(this.state.allRating_arr!='NA')
           {
            return(
              <View style={{width:'95%',paddingVertical:6,borderBottomWidth:1,borderBottomColor:'#f2f2f2',alignSelf:'center',backgroundColor:'#FFFFFF',marginBottom:10,borderRadius:5,paddingHorizontal:10}}>
                        <View style={{flexDirection:'row',width:'100%',paddingVertical:6}}>
                           <View style={{width:'15%'}}>
                           {item.user_image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:40,height:40,borderRadius:20}}/>:
                       <Image source={item.login_type=='app'?{uri:config.img_url1+item.user_image}:{uri:item.user_image}} style={{backgroundColor:Colors.imagebackcolor,width:40,height:40,borderRadius:20}}/>
                     } 
                      </View>
                          <View style={{width:'80%',}}>  
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingBottom:2,fontSize:14}}>{item.item_name}</Text>
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14}}>{item.user_name}</Text>
                             <View style={{flexDirection:'row',paddingVertical:6,justifyContent:'space-between'}}>
                             <View style={{flexDirection:'row',}}>
                            
                                   <StarRating
                                          disabled={true}
                                          fullStar={require('../icons/star2.png')}
                                          emptyStar={require('../icons/unfilstar.png')}
                                          maxStars={5}
                                          starSize={13}
                                          
                                          rating={item.rating}
                                        //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                                   />
                                
                            
                                 <Text style={{color:'black',alignSelf:'center',fontFamily:'Ubuntu-Medium',fontSize:14,paddingLeft:5}}>{item.rating}</Text>
                                </View>
                                 <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.createtime}</Text>
                           </View> 
                          
                          
                           </View>  
                           </View>  
                    <Text style={{fontSize:12,color:'black',fontFamily:'Ubuntu-Regular',lineHeight:20,paddingLeft:15}}>{item.review}</Text>
              </View>
            )
          }
          else{
            if(item=='N')
            {
              return(
                <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>No reviews are available</Text>
              )
            }
          }
         }}
         keyExtractor={(item, index) => index.toString()}
        />
      </View>

   </View>
  
     }
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
    }
   
})