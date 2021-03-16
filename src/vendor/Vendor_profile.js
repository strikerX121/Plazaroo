import React,{Component} from 'react';
import {Text,View,StyleSheet,Alert,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Venderfooter from './Venderfooter'
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Vendor_profile extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'profile',
             image:'',
             email:'',
             name:'',
             login_type:'app',
            }
      
    }

    componentDidMount(){
      this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
        if (payload.lastState.routeName=="Welcome") {
            BackHandler.exitApp();
          }
    });
      this.userdata()
  }
userdata=async()=>{
   let userdata=await localStorage.getItemObject('user_arr')
     console.log('userdata',userdata)
    
      this.setState({name:userdata.name,email:userdata.email,
image:userdata.image,login_type:userdata.login_type,
   })
  
  }
  logout=()=>{
       
    Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
      [
        {
          text:'cancel', 
         },
        {
          text: 'ok', 
          onPress: () => this.datauser(),
          // onPress: () => this.props.navigation.navigate('Logout'),
        },
      ],
      {cancelable: false},
    );
  }
  datauser=async()=>{
    var userdata= await localStorage.getItemObject('user_arr')
console.log('userdata',userdata)
     if(userdata.login_type=='app')
        {
         localStorage.setItemObject('user_arr',null);
         this.props.navigation.navigate('Welcome')
         console.log('app')
      }
     else if(userdata.login_type=='google')
          {
              // this.signOut()
              localStorage.setItemObject('user_arr',null);
              localStorage.setItemObject('facebookdata',null);
              this.props.navigation.navigate('Welcome')
              // alert('vikas')
         }
      else if(userdata.login_type=='facebook')   
          {
            // this.Auth()
            localStorage.setItemObject('user_arr',null);
            localStorage.setItemObject('facebookdata',null);
            this.props.navigation.navigate('Welcome')
          }
   }
   
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
        <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
 
        {/* //=----------------------header part---------=000------ */}
       {/* //=----------------------header part---------=000------ */}
       <View style={{width:'100%',alignSelf:'center',paddingTop:20,backgroundColor:Colors.buttoncolor}}>
          <View style={{flexDirection:'row',width:'94%',justifyContent:'space-between',alignSelf:'center'}}>
          <TouchableOpacity style={{paddingTop:10}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                  <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
         <TouchableOpacity> 
            <View style={{width:'100%',alignSelf:'center'}}>
                  <Image source={require('../icons/setting.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
          </TouchableOpacity>
          </View>
          <View style={{width:'92%',flexDirection:'row',paddingBottom:40,paddingTop:30,alignSelf:'center'}}>
                      <View style={{width:'15%',alignSelf:'center'}}>
                      {this.state.image=='NA'?
                       <Image source={require('../icons/name.png')}  style={{width:40,height:40,borderRadius:25,backgroundColor:'#f0f0f0'}}/>:
                       <Image source={this.state.login_type=='app'?{uri:config.img_url1+this.state.image}:{uri:this.state.image}}  style={{width:40,height:40,borderRadius:25,backgroundColor:'#f0f0f0'}}/>
                      }
                        {/* <Image source={require('../icons/men2.jpg')} style={{width:40,height:40,borderRadius:25,backgroundColor:'#f0f0f0'}}/> */}
                     </View>
                        <View style={{width:'85%'}}>
<Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14}}>{this.state.name}</Text>
<Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:17}}>{this.state.email}</Text>
                        </View>
                  </View>     
           </View>
        {/* ..............................heaser finish................................ */}
       <ScrollView style={{marginBottom:80}}>
           <View style={{backgroundColor:'#FFFFFF',}}>
       {/* <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Mylisting')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/listing.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>My Listings</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>    */}
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Venderorders')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/orders.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>My Orders</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity> 
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} >
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/f-profile.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>View & Edit Profile</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Vendernotification')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/notification.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Notification</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Wishlist')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/wishlist.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Wishlist</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Youraddress')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/address.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Address</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Paymentmethod')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/payment.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Payment</Text>
      </View>
        <Image source={require('../icons/side-arrow.png')} style={{alignSelf:'center',width:13,height:14,}}/>
        </View> 
        </TouchableOpacity>
        
        </View>
         <View style={{backgroundColor:'#FFFFFF',marginTop:15}}>
     
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend')}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/invite-friend.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Invite a Friend</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('VendorTearmscondition',{'contantpage':0})}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/about-us.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>About US</Text>
        </View>
        </TouchableOpacity> 
         </View>
         <View style={{backgroundColor:'#FFFFFF',marginTop:15}}>
     
     <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.logout()}}>
     <View style={{flexDirection:'row'}}>
     <Image source={require('../icons/logout.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
         <Text style={[styles.textfont,{color:Colors.buttoncolor}]}>Log Out</Text>
     </View>
     </TouchableOpacity>
     
      </View>
        </ScrollView> 
       {/* ........................................Container finish............................... */}
     
       <Venderfooter navigation={this.props.navigation} color={this.state.page}/>
         
        
    </View>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
       
    },
   
    button:
    {
        marginBottom:13,
         borderRadius:6,
        paddingVertical:12,
        width:'50%',
        margin:15,
        backgroundColor:'#fa5252'
    },
    textbutton:{
     borderBottomColor:'#f2f2f2'
    ,borderBottomWidth:1,
    paddingVertical:13,

    width:'90%',
    alignSelf:'center'
 },
    textfont:{
    fontFamily:'Ubuntu-Medium',
    fontSize:13.5,
    color:'gray',
    paddingLeft:10,
    paddingLeft:15
}
   
})