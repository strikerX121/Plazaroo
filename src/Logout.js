import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,BackHandler,StatusBar} from 'react-native';
import Colors from './Colors';
import { localStorage }  from './providers/localStorageProvider';
import { LoginManager , AccessToken,} from 'react-native-fbsdk'
import {GoogleSignin,
  GoogleSigninButton,
  statusCodes,} from 'react-native-google-signin';
import Loader from './Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
export default class Logout extends Component{
    // componentDidMount() {
    //     // this.setState({loading:true})
      
    //     this.props.navigation.addListener('willFocus', payload => {
    //         console.log('payload',payload)
    //         if ((payload.context).search('Navigation/BACK_Root') != -1) {
    //             BackHandler.exitApp();
              
    //         }
    //     });
    //    this.logout()
    // }

    componentDidMount(){
        
      this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
        if ((payload.context).search('Navigation/BACK_Root') != -1) {
            BackHandler.exitApp();
          }
    });
        // GoogleSignin.configure({
        //   //It is mandatory to call this method before attempting to call signIn()
        //   // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        //    webClientId:'133997198724-7lm5pm8ccapmf0kcivnjaq67a1un50pp.apps.googleusercontent.com',
        // }); 
      
       
        this.datauser1()
      }
    
 datauser1=async()=>{
  var userdata= await localStorage.getItemObject('user_arr')
  console.log('userdata',userdata)
  
    localStorage.setItemObject('user_arr',null);
    localStorage.setItemObject('facebookdata',null);
    this.props.navigation.navigate('Userlogin')
 
  
         
          
 }

    datauser=async()=>{
        var userdata= await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
              console.log('userdata',userdata)
         if(userdata.login_type=='app')
            {
              if(userdata.user_type==1)
              {
                localStorage.setItemObject('user_arr',null);
                this.props.navigation.navigate('Userlogin')
                console.log('app')
              }
              else{
                  localStorage.setItemObject('user_arr',null);
                  this.props.navigation.navigate('Vendorlogin')
                  console.log('app')
                 }
           
          }
         else if(userdata.login_type=='google')
              {
                  // this.signOut()
                  if(userdata.user_type==1)
                  {
                    localStorage.setItemObject('user_arr',null);
                    localStorage.setItemObject('facebookdata',null);
                    this.props.navigation.navigate('Userlogin')
                
                  }
                  else{
                    localStorage.setItemObject('user_arr',null);
                    localStorage.setItemObject('facebookdata',null);
                    this.props.navigation.navigate('Vendorlogin')
                     
                     }
                  // alert('vikas')
             }
          else if(userdata.login_type=='facebook')   
              {
                // this.Auth()
                if(userdata.user_type==1)
                {
                  localStorage.setItemObject('user_arr',null);
                  localStorage.setItemObject('facebookdata',null);
                  this.props.navigation.navigate('Userlogin')
              
                }
                else{
                  localStorage.setItemObject('user_arr',null);
                  localStorage.setItemObject('facebookdata',null);
                    this.props.navigation.navigate('Vendorlogin')
                   
                   }
              }
       }
       else{
        this.props.navigation.navigate('Userlogin')
       }
      }
     
      // signOut = async () => {
      //   //Remove user session from the device.
      //   try {
      //     await GoogleSignin.revokeAccess();
      //     await GoogleSignin.signOut();
      //     localStorage.setItemObject('user_arr',null);
      //     localStorage.setItemObject('facebookdata',null);
      //     this.props.navigation.navigate('Home') // Remove the user from your app's state as well
      //   } catch (error) {
      //     console.error(error);
      //     this.props.navigation.navigate('Home')
      //   }
      // };
      Auth = () => {
        LoginManager.logOut();
        localStorage.setItemObject('user_arr',null);
        localStorage.setItemObject('facebookdata',null);
        this.props.navigation.navigate('Home')
       console.log('fskfjsdjdfhsdh')
      };
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
         <StatusBar 
           hidden = {true}
           backgroundColor = {Colors.buttoncolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
        {/* <View style={styles.splashimage}>
            <Image  source={require('./icons/image1.png')} resizeMethod='resize' style={{width:'63%',height:'100%'}}/>
            <Image  source={require('./icons/image3.png')} resizeMethod='resize' style={{width:'29%',height:'80%'}}/>
           
        </View>
     
          <View style={styles.splashcontain}>
          <Image  source={require('./icons/yoloslogo.png')} resizeMethod='resize' style={{width:'67%',height:'26%'}}/>
        </View>
 
        <View style={[styles.splashimage,{ height:screenHeight*50/100,}]}>
        <Image  source={require('./icons/image2.png')} resizeMethod='resize' style={{width:'40%',height:'80%'}}/>
            <Image  source={require('./icons/image4.png')} resizeMethod='resize' style={{width:'60%',height:'70%'}}/>
        </View> */}
    </View>
  )
    }
}
const styles=StyleSheet.create({
    splashimage:{
       flexDirection:'row',
       justifyContent:'space-between',
       height:screenHeight*30/100,
   
   },
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    splashcontain:{
        height:screenHeight*40/100,
        width:'100%',
       alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    }
})