import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Language extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false
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
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomColor:'#f2f2f2',borderBottomWidth:1}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
           <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Select Language</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
       <ScrollView>
       <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend1')}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/flag1.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>English</Text>
      </View>
        <Image source={require('../icons/g-tick.png')} style={{alignSelf:'center',width:17,height:17,borderRadius:6}}/>
        </View> 
        </TouchableOpacity>   
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend1')}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/flag2.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>French</Text>
        </View>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend1')}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/flag3.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>German</Text>
        </View>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend1')}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/flag4.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Italian</Text>
        </View>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.textbutton} activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Invitefriend1')}}>
        <View style={{flexDirection:'row'}}>
        <Image source={require('../icons/flag5.png')} style={{alignSelf:'center',width:22,height:20,borderRadius:6}}/>
            <Text style={styles.textfont}>Spanish</Text>
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
    paddingVertical:18,
    width:'90%',
    alignSelf:'center'
 },
    textfont:{
    fontFamily:'Ubuntu-Medium',
    fontSize:13.5,
    paddingLeft:10,
    paddingLeft:15
}
   
})