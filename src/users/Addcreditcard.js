import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'

import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
       {
          'name':'Levis colorblock',
          'color':'Red',
          'quantity':1,
          'size':'M',
          'price':'120.95'
        },
        {
            'name':'Levis colorblock',
            'color':'Red green',
            'quantity':1,
            'size':'ML,XL',
            'price':'120.95'
        },
       
]
 
export default class Addcreditcard extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'inventary',
             All:true,
             Active:false,
             Past:false,
             orderdata:orderdata
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
           <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Add credit card</Text>
          </View>
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView>
         <View style={{width:'95%',paddingTop:13,paddingBottom:80,alignSelf:'center'}}>
        
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   <Text style={{paddingLeft:10,fontSize:11,color:'gray',fontFamily:'Ubuntu-Regular',paddingTop:16,paddingBottom:7}}>Name</Text>
   <View style={styles.inputcontainer}>
   
           <TextInput
                   placeholder='Shane Mendoza'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View>
         <Text style={{paddingLeft:10,fontSize:11,color:'gray',fontFamily:'Ubuntu-Regular',paddingTop:16,paddingBottom:7}}>Credit Card Number</Text>
         <View style={styles.inputcontainer}>
           <TextInput
                   placeholder='Enter Card Number'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View>
         <View style={{width:'97%',flexDirection:'row',alignSelf:'center'}}>
        <View style={{width:'50%',alignSelf:'center'}}>
         <Text style={{paddingLeft:10,fontSize:11,color:'gray',fontFamily:'Ubuntu-Regular',paddingTop:16,paddingBottom:7}}>Expires</Text>
         <View style={[styles.inputcontainer]}>
           <TextInput
                   placeholder='10/27/2030'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View>
         </View>
         <View style={{width:'50%',alignSelf:'center'}}>
         <Text style={{paddingLeft:10,fontSize:11,color:'gray',fontFamily:'Ubuntu-Regular',paddingTop:16,paddingBottom:7}}>Expires</Text>
         <View style={[styles.inputcontainer]}>
           <TextInput
                   placeholder='Enter cvv'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View>
         </View>
         </View>
         <TouchableOpacity style={{marginTop:15,width:'40%',marginLeft:10,borderRadius:6,backgroundColor:Colors.buttoncolor,paddingVertical:12}}>
               <View style={{flexDirection:'row',justifyContent:'center',}}>
                 <Image source={require('../icons/scan.png')} style={{width:15,marginRight:10,height:15,alignSelf:'center'}}/>    
                 <Text style={{fontSize:11,color:'#FFFFFF',fontFamily:'Ubuntu-Medium',}}>SCAN CARD</Text>
               </View>
         </TouchableOpacity>
         </View>
       {/* ........................................Container finish............................... */}
     
     
           </ScrollView>
           <View style={{position:'absolute',bottom:5,left:0,right:0,}}>
           <Text style={{fontSize:12,paddingBottom:5,color:'gray',paddingLeft:15,fontFamily:'Ubuntu-Regular',lineHeight:18}}>Debit cards are accepted at some locations and for some{"\n"}categories.</Text>
                   <View style={{width:'95%',alignSelf:'center',flexDirection:'row'}}>
                     <View style={{width:'16%',alignSelf:'center'}}>
                     <Image source={require('../icons/card1.png')} style={{width:'90%',height:30,alignSelf:'center'}}/>    
                     </View>
                     <View style={{width:'16%',alignSelf:'center'}}>
                     <Image source={require('../icons/card2.png')} style={{width:'90%',height:30,alignSelf:'center'}}/>    
                     </View>
                     <View style={{width:'16%',alignSelf:'center'}}>
                     <Image source={require('../icons/card4.png')} style={{width:'90%',height:30,alignSelf:'center'}}/>    
                     </View>
                     <View style={{width:'16%',alignSelf:'center'}}>
                     <Image source={require('../icons/card5.png')} style={{width:'90%',height:30,alignSelf:'center'}}/>    
                     </View>
                     <View style={{width:'16%',alignSelf:'center'}}>
                     <Image source={require('../icons/card6.png')} style={{width:'90%',height:30,alignSelf:'center'}}/>    
                     </View>
                     <View style={{width:'16%',alignSelf:'center'}}>
                     <Image source={require('../icons/card1.png')} style={{width:'90%',height:30,alignSelf:'center'}}/>    
                     </View>

                   </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Paymentdeliverydetailes')}} style={{width:'95%',marginTop:25,paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                           <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Add Card</Text> 
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
    buttonlayoutheader:{
      width:'90%',
      alignSelf:'center',
      borderRadius:12,paddingVertical:15
    },
    inputcontainer:{
        flexDirection:'row',
         backgroundColor:'#FFFFFF',
        elevation:2,
        shadowOffset:{width:2,height:2},
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:15,width:'95%'
    },
    textfiledinput:{
        paddingVertical:5,
        color:'black',
        fontFamily:'Ubuntu-Medium',
        fontSize:14,
        paddingLeft:12,
      width:'95%'
      },
   
})