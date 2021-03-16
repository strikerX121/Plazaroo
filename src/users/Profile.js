import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import StarRating from 'react-native-star-rating';
import NetInfo from '@react-native-community/netinfo';

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
export default class Profile extends Component{
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
             Listing:true,
             Review:false,
             follow_count:0,
             reviewdata:reviewdata,
             other_user_details:{},
             other_user_id:this.props.navigation.getParam('other_user_id'),
             allRating_arr:[],
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
        this.getalluserdata()
    }
    getalluserdata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
     
      if(this.state.isConnected===true)
    {
      var url = config.baseURL+'get_user_Details.php?user_id='+userdata.user_id+'&user_type=1&other_user_id='+this.state.other_user_id
       console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:userdata.user_id,loading:true,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({follow_count:obj.follow_count,follow_status:obj.follow_status,listingdata:obj.item_details_arr,allRating_arr:obj.allRating_arr,other_user_details:obj.other_user_details})
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

      followbtn=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        if(this.state.isConnected===true)
         {
        let data=new FormData()
        data.append('user_id',userdata.user_id)
        data.append('user_type',1)
        data.append('other_user_id',this.state.other_user_details.user_id)
        var url = config.baseURL+'add_follow.php'
         console.log("url:"+url);
       
          this.setState({loading:true,})
      
         fetch(url,{
            method: 'POST',
            headers: new Headers(config.headersapi), 
            body:data
            }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
               if(obj.follow_status==1)
               {
                   this.setState({follow_count:this.state.follow_count+1})
               }else{
                   this.setState({follow_count:this.state.follow_count-1})
                   }
                this.setState({follow_status:obj.follow_status})
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
         <TouchableOpacity style={{paddingVertical:17,width:'15%',}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center',}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{alignSelf:'center',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center',}}>
          {user_data.image=='NA'?
                       <Image source={require('../icons/name.png')} style={{alignSelf:'center',width:75,height:75,borderRadius:50,backgroundColor:Colors.imagebackcolor}}/>:
                       <Image source={user_data.login_type=='app'?{uri:config.img_url1+user_data.image}:{uri:user_data.image}} style={{alignSelf:'center',width:75,height:75,borderRadius:50,backgroundColor:Colors.imagebackcolor}}/>
                     } 
              </View>
                    <Text style={{color:'black',fontSize:15,textAlign:'center',fontFamily:'Ubuntu-Bold',paddingTop:10}}>{user_data.name}</Text>
          {/* <Text style={{color:'gray',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',paddingTop:7}}>Followed by {this.state.follow_count} People</Text>
       {this.state.follow_status==0 &&   <TouchableOpacity style={{backgroundColor:Colors.buttoncolor,paddingVertical:10,marginTop:10,borderRadius:5,width:'65%',alignSelf:'center'}} onPress={()=>{this.followbtn()}}>
           <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',}}>Follow</Text>
           </TouchableOpacity>}
           {this.state.follow_status==1 &&   <TouchableOpacity style={{backgroundColor:Colors.buttoncolor,paddingVertical:10,marginTop:10,borderRadius:5,width:'65%',alignSelf:'center'}} onPress={()=>{this.followbtn()}}>
           <Text style={{color:'#FFFFFF',fontSize:13,textAlign:'center',fontFamily:'Ubuntu-Medium',}}>Unfollow</Text>
           </TouchableOpacity>} */}
          </View>
        
          </View>
        {/* ..............................heaser finish................................ */}
    
            <View style={{flexDirection:'row',paddingTop:10,width:'100%',borderRadius:13}}>
               <TouchableOpacity activeOpacity={0.8} style={{width:'49.7%',alignSelf:'center'}} onPress={()=>{this.setState({Listing:true,Profile:false,Review:false})}}>
                 {this.state.Listing==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Listing</Text>
                   </View>}
                   {this.state.Listing==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Listing</Text>
                   </View>}
               </TouchableOpacity>
             
               {/* <TouchableOpacity activeOpacity={0.8} style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({Listing:false,Profile:true,Review:false})}}>
                 {this.state.Profile==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Profile</Text>
                   </View>}
                   {this.state.Profile==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Profile</Text>
                   </View>}
               </TouchableOpacity> */}
               <TouchableOpacity activeOpacity={0.8} style={{width:'49.7%',alignSelf:'center'}} onPress={()=>{this.setState({Listing:false,Profile:false,Review:true})}}>
                 {this.state.Review==true && <View style={[styles.buttonlayoutheader,{borderBottomColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:Colors.buttoncolor}}>Reviews</Text>
                   </View>}
                   {this.state.Review==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Reviews</Text>
                   </View>}
               </TouchableOpacity>
              
              
          </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
     {this.state.Listing==true && 
      <View style={{width:'100%',paddingBottom:350,alignSelf:'center'}}>
      <View style={{marginTop:30}}>
        <FlatList
         data={this.state.listingdata}
         showsVerticalScrollIndicator={false}
         renderItem={({item,index})=>{
           if(this.state.listingdata!='NA')
           {
            return(
              <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Homeproductdetaile',{'Product_id':item.item_id})}}>
              <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderRadius:5,paddingHorizontal:10}}>
                        <View style={{flexDirection:'row',width:'100%',paddingVertical:13}}>
                        <View style={{width:'33%',alignSelf:'center',height:100,}}>
                            <Image source={item.item_images!='NA'?{uri:config.img_url+item.item_images[0].image}:require('../icons/noimage.png')} style={{alignSelf:'center',width:'100%',borderRadius:7,height:100,backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'63%',height:100,marginLeft:'5%'}}>  
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                             <Text style={{color:Colors.buttoncolor,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category_name}</Text>    
                             {/* <Image source={require('../icons/edit-border.png')} style={{alignSelf:'center',width:15,height:20,}}/> */}
                           </View> 
                         <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingTop:7,fontSize:14}}>{item.item_name}</Text>
                         <View style={{flexDirection:'row',paddingVertical:6}}>
                         <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                             <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}} numberOfLines={2}>{item.location}</Text>
                           </View> 
                           <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.item_price}</Text>
                          
                           </View>  
                           </View>  
                         
              </View>
              </TouchableOpacity>
            )
          }
          else{
            if(item=='N')
            {
              return(
                <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently items are not available</Text>
              )
            }
          }
         }}
         keyExtractor={(item, index) => index.toString()}
        />
      </View>

   </View>
  
     }
      {this.state.Profile==true &&
      <ScrollView style={{marginBottom:80}}>
      <View style={{width:'90%',alignSelf:'center',paddingTop:20}}>
        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14,}}>About</Text>
        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingTop:15,lineHeight:18}}>Borm in Detroit, Michigan,and a graduate of yale University and the University of Michigan Medical School, Carson has authored numerous books on his medical career amd political stances. he was portrayed by Cuba Gooding jr</Text>
        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14,paddingTop:10}}>Verification</Text>
        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingTop:10,lineHeight:18}}>Verification helps you to increase your chances of getting, selected, People will trust you i you have verified badge on your profile.</Text>
      
                    <View style={{flexDirection:'row',paddingVertical:15}}>
                        <Image source={require('../icons/email.png')} style={{width:28,height:20,borderRadius:5,alignSelf:'center'}}/>
                           <View style={{width:'80%',paddingLeft:13}}>
                                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,}}>Email</Text>
                                 <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,lineHeight:22}}>Verified</Text>
                          </View>
                         </View>
                         <View style={{flexDirection:'row',paddingVertical:15}}>
                        <Image source={require('../icons/mobile.png')} style={{width:28,height:20,borderRadius:5,alignSelf:'center'}}/>
                           <View style={{width:'80%',paddingLeft:13}}>
                                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,}}>Mobile</Text>
                                 <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,lineHeight:22}}>Verified</Text>
                          </View>
                         </View>
                         <View style={{flexDirection:'row',paddingVertical:15}}>
                        <Image source={require('../icons/cnic.png')} style={{width:28,height:20,borderRadius:5,alignSelf:'center'}}/>
                           <View style={{width:'80%',paddingLeft:13}}>
                                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,}}>Cnic</Text>
                                 <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,lineHeight:22}}>Verified</Text>
                          </View>
                         </View>
        </View>
        </ScrollView>
      }
       {this.state.Review==true && 
      <View style={{width:'100%',paddingBottom:80,alignSelf:'center'}}>
      <Text style={{color:'black',paddingLeft:20,paddingTop:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>Reviews</Text>    
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
                   <View style={{flexDirection:'row',paddingVertical:5,justifyContent:'space-between'}}>
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