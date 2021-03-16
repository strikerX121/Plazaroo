import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Alert,TouchableOpacity,BackHandler,StatusBar} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Readtytogo extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false, player_id:'' }
      
    }
   componentDidMount(){
    this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
         if (payload.lastState.routeName == "Userhome") {
                BackHandler.exitApp();
              }
        // if ((payload.context).search('Navigation/BACK_Root') != -1) {
        //     BackHandler.exitApp();
        //   }
    });
   }
   
    submitrefralcode=()=>{
        Alert.alert(
          "Confirmation",
          "Do you have a referral code?",
          [
            { text: 'YES', onPress: () => this.props.navigation.navigate('Referralcode') },
            { text: 'NO', onPress: () => this.props.navigation.navigate('Userhome') },
           
         ],
         { cancelable: true },
    
        )
       } 
  
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
       
        <View style={{width:'100%',paddingBottom:25}}>
            <Image source={require('../icons/logo.png')} style={{alignSelf:'center',resizeMode:'contain',width:screenWidth*52/100,height:50}}/>
        </View>
        <Text style={{color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Bold',fontSize:20,paddingVertical:20}}>You are ready to go!</Text>
               <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Regular',fontSize:14,alignSelf:'center',lineHeight:23,textAlign:'center'}}>Thanks for taking your time to create{"\n"}account with us. Now this is the{"\n"}fun part, let's explore tha app.</Text>
               <View style={{position:"absolute",bottom:10,alignSelf:'center',width:'100%',}}>
              <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',marginTop:20}]} onPress={()=>{this.props.navigation.navigate('Userhome')}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor,}}>Continue</Text>
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
        backgroundColor:Colors.buttoncolor,
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center'
    },
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:15,
        width:'90%',
    }
   
})