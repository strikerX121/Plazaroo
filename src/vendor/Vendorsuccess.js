import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Alert,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import Icon1 from 'react-native-vector-icons/Ionicons'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Vendorsuccess extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
            login_type:'app',
            approve_flag:1
            }
      
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus', payload => {
            console.log('payload',payload)
             if (payload.lastState.routeName == "Userhome" && payload.action.type=='Navigation/BACK') {
                  this.props.navigation.navigate('Account')
                  }
        });
        this.userdata1()
    }
    userdata1=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
          this.setState({approve_flag:userdata.approve_flag,login_type:userdata.login_type})
        }
      }
   
      approvebtn=()=>{
          if(this.state.approve_flag==0)
          {
            this.props.navigation.navigate('Userhome')
          }
          else{
            Alert.alert(
              "information message",
              "Your information has been submitted please wait for your approval.",
              [
               { text: 'ok', onPress: () =>this.props.navigation.navigate('Userlogin') },
              ],
             { cancelable: true },
        
            )
              return false;
    
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/bg-cross.png')} style={{alignSelf:'center',width:24,height:24}}/>
             </View>
          </TouchableOpacity>
         
            </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30,flex:0.8,alignItems:'center',justifyContent:'center',alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/success.png')} style={{alignSelf:'center',resizeMode:'contain',width:160,height:160,}}/>
             </View>
             <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:20,paddingBottom:20}}>Success!</Text>
             <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Regular',fontSize:14,alignSelf:'center',lineHeight:20}}>Your information has been submitted</Text>
             <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Regular',fontSize:14,alignSelf:'center',}}>please wait for your approval.</Text>
               <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',marginTop:50}]} onPress={()=>{this.props.navigation.navigate('Userhome')}}>
                      <View style={{alignSelf:'center',alignItems:'center'}}>
                      <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor,}}>Browse App</Text>
                    </View>
              </TouchableOpacity>  
            {/* <TouchableOpacity activeOpacity={0.8} style={[styles.button,{borderWidth:0.8,borderColor:'#FFFFFF',alignItems:'center',marginTop:10}]} onPress={()=>{this.props.navigation.navigate('Vendorlogin')}}>
                      <View style={{alignSelf:'center',alignItems:'center'}}>
                      <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Logout</Text>
                    </View>
            </TouchableOpacity>       */}
        </View>  
       {/* ........................................Container finish............................... */}
     
      
         
        
    </View>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:Colors.buttoncolor,
       },
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:45,
        paddingVertical:15,
        width:'80%',
    }
   
})