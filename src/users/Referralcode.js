import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,ToastAndroid,TextInput,Keyboard,BackHandler, ScrollView,TouchableOpacity,Alert,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import {notification} from '../providers/NotificationProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Referralcode extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
            referal_code:'',
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
      //   this.props.navigation.addListener('willFocus', payload => {
      //     console.log('payload',payload)
      //     if ((payload.context).search('Navigation/BACK_Root') != -1) {
      //         BackHandler.exitApp();
      //       }
      // });
     }
   
    finalsendreferralcode=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      var user_id = userdata.user_id
      this.Referral.clear();
      if(this.state.referal_code.length<=0)
      {
        this.setState({errorno:1})
        return false
      }
      Keyboard.dismiss()
      this.setState({loading:true})
       var url = config.baseURL+'user_signup_step3.php';
       let data=new FormData();
       data.append('user_id',user_id)
       data.append('referral_by',this.state.referal_code)
       data.append("user_type", 1);
       console.log('data',data)
       console.log('url',url)
     
      fetch(url,{
         method: 'POST',
         headers: new Headers(config.headersapi), 
        body:data
      }).then( (obj)=> {
        this.setState({loading:false,isVisible:false,referal_code:''});
            return obj.json();  
    }).then((obj)=> { 
      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
      console.log('obj',obj)
        if(obj.success == 'true'){
        // this.referal_code.clear();
        if(obj.notification_arr!='NA')
        {
          notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
        }
        localStorage.setItemObject('user_arr', obj.user_details);
        // this.props.navigation.navigate('Readtytogo')
        ToastAndroid.showWithGravityAndOffset(
          obj.msg[config.language],
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
          25,
          50
        );
        this.props.navigation.navigate('Userhome')
            
        
          } else{
            Alert.alert(
              "information message",
              "Referral code is invalid",
              [
               { text: 'ok', onPress: () =>console.log('false') },
              ],
             { cancelable: true },
        
            )
              return false;
        }
      }).catch((error)=> {
        console.log("-------- error ------- "+error);
          alert("result error:"+error)
          this.setState({loading: false});
    });
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
       {/* //=----------------------header part---------=000------ */}
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:15,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{ this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'65%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Referral Code</Text>
          </View>
          <TouchableOpacity style={{width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Userhome')}}> 
          <View style={{width:'100%',alignSelf:'center'}}>
          <Text style={{color:Colors.buttoncolor,textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Skip</Text>
             </View>
          </TouchableOpacity>
          </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView style={{marginBottom:70}} keyboardShouldPersistTaps='always'   showsVerticalScrollIndicator={false} keyboardDismissMode='none'>
        <View style={{paddingHorizontal:20,paddingTop:80,alignItems:'center',justifyContent:'center',alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/invite.png')} style={{alignSelf:'center',resizeMode:'contain',width:200,height:200,}}/>
             </View>
<Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:20,paddingTop:20,textAlign:"center"}}>Do you have{"\n"}any referral code!</Text>
{/* <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,alignSelf:'center',paddingTop:10,lineHeight:20}}>Save up to 15% on all tasks when you buy{"\n"}something form DealDelivery</Text> */}
<Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,alignSelf:'center',paddingTop:10,lineHeight:20}}>Refer your friends and earn Plazaroo rewards!{"\n"}And 15%  complete pera to Earn rewards every time you make a purchase</Text>
<Text style={{fontFamily:'Ubuntu-Regular',fontSize:14,alignSelf:'flex-start',marginTop:50,paddingLeft:20,paddingBottom:10,color:'gray',paddingTop:10}}>Please enter your referral code</Text>
       <View style={{width:'90%',alignSelf:'center',borderRadius:6,backgroundColor:Colors.lightgray}}>
       <TextInput
                    placeholder='Enter referral code'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    ref={(input) => { this.Referral = input; }}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({referal_code:txt})}}
                    maxLength={20}
                    style={styles.textfiledinput}
                   />
          
       </View>
       {this.state.errorno==1 && 
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center',paddingTop:4}}>Please enter referral code</Text>
                   }
        </View>  
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'95%',}}>
      
       <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.finalsendreferralcode()}} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Submit</Text>
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
    textfiledinput:{
        paddingVertical:10,
        color:'black',
        fontFamily:'Ubuntu-Medium',
        fontSize:14,
        paddingLeft:12,
        backgroundColor:Colors.lightgray,
           width:'100%'
      },
   
})