import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler,Switch,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import NetInfo from '@react-native-community/netinfo';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import Loader from '../Loader';
import Icon3 from 'react-native-vector-icons/Ionicons'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Notification_setting extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
             player_id:'' ,
             notification:true,
             HidePassword:false,
             user_id:''
            }
      
    }
    componentDidMount(){
        console.log(this.state.signal_id)
            NetInfo.fetch().then(state => {
              this.setState({isConnected:state.isConnected}) });
               const unsubscribe = NetInfo.addEventListener(state => {
                this.setState({isConnected:state.isConnected})
              });
              this.userdata()
      }
      userdata=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        console.log('userdata',userdata)
          if(userdata.notification_status==0)
                 {
                        this.setState({notification:false})
                 }
           this.setState({user_id:userdata.user_id})
       
       }


      notificationbtn=()=>{
        if(this.state.isConnected===true)
        {
        
            var data = new FormData();
            data.append("user_id", this.state.user_id);
            data.append("user_type", 1);
        var url = config.baseURL+'notification_on_off.php';
              
        console.log("url:"+url);
        this.setState({loading:true})
         fetch(url,{
            method: 'POST',
            headers: new Headers(config.headersapi), 
            body:data,
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
                   var user_details = obj.user_details; 
                 localStorage.setItemObject('user_arr', user_details);
                 msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              } 
              else{
                  msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({loading: false});
       });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }  
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*30/100,height:30,resizeMode:'contain'}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30,flex:0.8}}>
         
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:20,paddingTop:20}}>Notification Setting</Text>
<Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:10,paddingTop:10,lineHeight:20}}>If you want to turn off notification in the app{"\n"}turn off the toggle button from here</Text>
<View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:8,}}>
                     <View style={{flexDirection:'row',paddingTop:20,paddingBottom:10}}> 
                     <Icon3 name='ios-notifications' color={Colors.buttoncolor} size={20}/>
                      <Text style={{color:'black',fontSize:14,paddingLeft:20}}>Notification</Text>
                     </View>
                     <Switch
                     thumbColor={this.state.notification?'white':'white'}
                     trackColor={{true:Colors.buttoncolor,false:'gray'}}
                     onValueChange = {(check)=>{this.setState({notification:check});this.notificationbtn()}}
                     value={this.state.notification}
                     />
                     </View>
        </View>  
       {/* ........................................Container finish............................... */}
     
       {/* <View style={{position:"absolute",bottom:20,alignSelf:'center',width:'100%',}}>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.props.navigation.navigate('Userrecoverpassword')}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Continue</Text>
               </View>
            </TouchableOpacity>      
                      
             </View> */}
         
        
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
    }
   
})