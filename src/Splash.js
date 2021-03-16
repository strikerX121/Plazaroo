import React,{Component} from 'react';
import { firebaseprovider}  from './providers/FirebaseProvider';
import {Text,View,StyleSheet,Image,Dimensions,BackHandler,StatusBar} from 'react-native';
import Colors from './Colors';
import { config } from './providers/configProvider';
import OneSignal from 'react-native-onesignal';
import { localStorage }  from './providers/localStorageProvider';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
global.inboxoffcheck=0;
export default class Splash extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:''}
        OneSignal.init('679efe46-b587-49a5-a4df-3a37eb95786a', {
            kOSSettingsKeyAutoPrompt: true,
          });
      
          OneSignal.setLogLevel(6, 0);
       }
   
    componentDidMount() {
           OneSignal.setLocationShared(true);
           OneSignal.inFocusDisplaying(2);
           OneSignal.addEventListener('ids', this.onIds.bind(this));
           OneSignal.addEventListener('opened', this.onOpened);
      
        this.props.navigation.addListener('willFocus', payload => {
            console.log('payload',payload)
            if ((payload.context).search('Navigation/BACK_Root') != -1) {
                BackHandler.exitApp();
              }
        });
       const timer= setTimeout(() => {
            this.authenticateSession();
        }, 4000);
        return () => clearTimeout(timer);
    }
    authenticateSession = async () => {
    
        const { navigation } = this.props;
        let result= await localStorage.getItemObject('user_arr'); 
            
            console.log('splasedata',result)
                     if(result!=null)
                        {
                            if(result.user_type==1)
                             { if(result.login_type=='app')
                               {
                                 if(result.profile_complete==0)
                                 {
                                    this.props.navigation.navigate('Userlogin')
                                    // this.props.navigation.navigate('Welcome')
                                 }
                                 else if(result.profile_complete==1){
                                   
                                    // this.props.navigation.navigate('Welcome')
                                    console.log('hello bhai call ho rha h yha s')
                                    firebaseprovider.firebaseUserCreate();
                                    firebaseprovider.getMyInboxAllData();
                                    this.props.navigation.navigate('Userhome')
                                }
                                    // else{
                                    //     this.props.navigation.navigate('Userlogin')
                                    // }
                                }else{
                                    if(result.profile_complete==1){
                                        firebaseprovider.firebaseUserCreate();
                                        firebaseprovider.getMyInboxAllData();
                                        this.props.navigation.navigate('Userhome') 
                                    }
                                    else{
                                        this.props.navigation.navigate('Userlogin')  
                                    }
                                   
                                   }
                                
                             }
                            else if(result.user_type==2)
                            {
                                if(result.login_type=='app')
                               {
                                if(result.otp_verify==0)
                                {
                                    // this.props.navigation.navigate('Vendorlogin')  
                                    this.props.navigation.navigate('Welcome')
                                }
                                else if(result.otp_verify==1 && result.profile_complete==0){
                                    // this.props.navigation.navigate('Vendorlogin')  
                                    this.props.navigation.navigate('Welcome')
                                  }
                                else if(result.approve_flag==0){
                                   this.props.navigation.navigate('Vendorhome')
                                }
                                else{
                                    this.props.navigation.navigate('Welcome')
                                }
                            }
                            else if(result.approve_flag==0){
                                this.props.navigation.navigate('Vendorhome')
                            }
                            else{
                                this.props.navigation.navigate('Welcome')
                            }
                               
                            }
                         
                        }
                      else{
                            this.props.navigation.navigate('Userlogin')
                         }  

        }
    componentWillUnmount() {
        OneSignal.removeEventListener('ids', this.onIds.bind(this));
           }
           onIds(device) {
            console.log('Device info: ', device);
            this.setState({
              player_id:device.userId
            });
            config.GetPlayeridfunctin(device.userId)
        }
  
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
         <StatusBar 
           hidden = {true}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
        <View style={{width:screenWidth*90/100,height:100,alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
            <Image source={require('./icons/logo.png')} style={{alignSelf:'center',width:screenWidth*55/100,height:60,resizeMode:'contain'}}/>
        </View>
    </View>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:Colors.buttoncolor,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },
   
})