import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Alert,Dimensions,ToastAndroid,Linking,TextInput,Platform,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import OneSignal from 'react-native-onesignal';
import Icon2 from 'react-native-vector-icons/Feather'
import { LoginManager , AccessToken,} from 'react-native-fbsdk'
import {GoogleSignin,
  GoogleSigninButton,
  statusCodes,} from 'react-native-google-signin';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Setting extends Component{
    constructor(props) {
        super(props);
        this.state = { 
             loading: false,
             player_id:'' ,
             HidePassword:false,
             login_type:'app',
             rateapps:'',
             isConnected:true
            }
      
    }
    componentDidMount(){
      this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
        if (payload.lastState.routeName=="Userlogin" && payload.action.type=='Navigation/BACK') {
            BackHandler.exitApp();
          }
    });
        this.Termsconditiondata()
         this.userdata1()
        
     }
     userdata1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      if(userdata!=null)
      {
        this.setState({image:userdata.image,login_type:userdata.login_type})
      }
    }
     Termsconditiondata= async ()=>{
   
      if(this.state.isConnected===true)
              {
      var url = config.baseURL+'get_all_content.php?user_id=0&user_type=1';
      console.log('url',url) 
      fetch(url,{ 
         method: 'GET',
         headers: new Headers(config.headersapi), 
       
      }).then( (obj)=> {
            return obj.json();  
     }).then((obj)=> { 
      // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
    console.log(obj)
      if(obj.success == 'true'){
        let rateapps=Platform.OS === 'ios'?obj.content_arr[3].content:obj.content_arr[4].content;
          this.setState({loading:false,rateapps:rateapps});
          //  localStorage.setItemObject('contantdata',obj.content_arr)
           } 
           else{
                  this.setState({loading:false,});
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
       deleteaccountbtn= async ()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected===true)
                {
        var url = config.baseURL+'user_account_delete.php?user_id='+user_id+'&user_type=1';
        console.log('url',url) 
        fetch(url,{ 
           method: 'GET',
           headers: new Headers(config.headersapi), 
         
        }).then( (obj)=> {
              return obj.json();  
       }).then((obj)=> { 
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
      console.log(obj)
        if(obj.success == 'true'){
          ToastAndroid.showWithGravityAndOffset(
            obj.msg[config.language],
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50
          );
          localStorage.setItemObject('user_arr',null);
          this.props.navigation.navigate('Userlogin')
             } 
             else{
                    this.setState({loading:false,});
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
         deleteconfirmationbtn=()=>{
          Alert.alert(
            "Confirm",
            "Do you want to delete your account?",
            [
             { text: 'YES', onPress: () => this.deleteaccountbtn() },
             { text: 'NO', onPress: () => console.log('cancle') },
             
           ],
           { cancelable: true },
        
          )
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
          FirebaseInboxJson=[];
          if(userdata.login_type=='app')
             {
             localStorage.setItemObject('user_arr',null);
             this.props.navigation.navigate('Userlogin')
             console.log('app')
           }
              else if(userdata.login_type=='google')
                  {
                  // this.signOut()
                  localStorage.setItemObject('user_arr',null);
                  localStorage.setItemObject('facebookdata',null);
                  this.props.navigation.navigate('Userlogin')
                  // alert('vikas')
             }
          else if(userdata.login_type=='facebook')   
              {
                // this.Auth()
                localStorage.setItemObject('user_arr',null);
                localStorage.setItemObject('facebookdata',null);
                this.props.navigation.navigate('Userlogin')
              }
       }
     
      signOut = async () => {
        //Remove user session from the device.
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          localStorage.setItemObject('user_arr',null);
          localStorage.setItemObject('facebookdata',null);
          this.props.navigation.navigate('Welcome') // Remove the user from your app's state as well
        } catch (error) {
          console.error(error);
          this.props.navigation.navigate('Welcome')
        }
      };
      Auth = () => {
        LoginManager.logOut();
        localStorage.setItemObject('user_arr',null);
        localStorage.setItemObject('facebookdata',null);
        this.props.navigation.navigate('Welcome')
       console.log('fskfjsdjdfhsdh')
      };
     
   
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
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomColor:'#f2f2f2',borderBottomWidth:1}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Settings</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
       <ScrollView>
   {this.state.login_type=='app' &&  <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Changepassword')}}>
              <Text style={styles.textfont}>Change Password</Text>
         </TouchableOpacity> }  
       
        {/* <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Language')}}>
        <Text style={styles.textfont}>Languages</Text>
        </TouchableOpacity>   */}
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Helpsupport')}}>
        <Text style={styles.textfont}>Help & Support</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Notification_setting')}}>
        <Text style={styles.textfont}>Notification Setting</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend')}}>
        <Text style={styles.textfont}>Invite a Friend</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Termscondition',{'contantpage':1})}}>
        <Text style={styles.textfont}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Termscondition',{'contantpage':0})}}>
        <Text style={styles.textfont}>About US</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textbutton}  activeOpacity={0.8} onPress={()=>{ Linking.openURL(this.state.rateapps).catch(err =>
                        alert('Please check for the Google Play Store')
                   );}}>
       <Text style={styles.textfont}>Rate Us On App Store</Text>
        </TouchableOpacity> 
        <TouchableOpacity activeOpacity={0.8} style={styles.textbutton} onPress={()=>{this.logout()}}>
        <Text style={styles.textfont}>Logout</Text>
        </TouchableOpacity> 
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.deleteconfirmationbtn()}} style={[styles.button]} >
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
               <Image source={require('../icons/trash.png')} style={{alignSelf:'center',width:12,height:15}}/>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:14,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Delete my account</Text>
               </View>
            </TouchableOpacity>    
        </ScrollView> 
       {/* ........................................Container finish............................... */}
     
      
         
        
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
    width:'95%',
    alignSelf:'center'
 },
    textfont:{
    fontFamily:'Ubuntu-Medium',
    fontSize:13,
    paddingLeft:10
}
   
})