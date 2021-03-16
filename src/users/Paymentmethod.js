import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Icon from 'react-native-vector-icons/AntDesign'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import { FlatList } from 'react-native-gesture-handler';
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
    {
       'name':'Nokia 2.2 For Sale',
       'username':'Oc',
       'quantity':1,
       'size':'M',
       'price':'125.95'
     },
     
    
]

 
export default class Paymentmethod extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'orders',
             All:true,
             Ongoing:false,
             Wating:false,
             Complete:false,
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Payment Methods</Text>
          </View>
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView>
         <View style={{width:'95%',paddingTop:20,paddingBottom:80,alignSelf:'center'}}>
             
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}

        <TouchableOpacity>
            <View style={{flexDirection:'row',paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:Colors.bottombordercolor}}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                  <Image source={require('../icons/master-card.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Master Card</Text>
                  <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>xxx-xxxx-xxxx-1560</Text>
                  </View>
                  <View style={{width:'15%',}}>
                  <Image source={require('../icons/edit.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                      </View>
                  
            </View>
        </TouchableOpacity>
      
        <TouchableOpacity>
            <View style={{flexDirection:'row',paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:Colors.bottombordercolor}}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                  <Image source={require('../icons/visa.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Credit Card</Text>
                  <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>xxx-xxxx-xxxx-1560</Text>
                  </View>
                  <View style={{width:'15%',}}>
                  <Image source={require('../icons/edit.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                      </View>
                  
            </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <View style={{flexDirection:'row',marginTop:15,paddingVertical:14,borderRadius:6,borderWidth:1,borderColor:Colors.bottombordercolor}}>
                <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/paypal.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>PayPal</Text>
                   <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>my paypal@gmail.com</Text>
                   </View>
                   <View style={{width:'15%',}}>
                   <Image source={require('../icons/edit.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                      </View>
                    </View>
        </TouchableOpacity>
       
       
        
       
        
         </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:'absolute',bottom:5,left:0,right:0,}} >
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addcreditcard')}} activeOpacity={0.8} style={{width:'95%',marginTop:25,paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                           <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Add new</Text> 
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
      width:'100%',
      borderRadius:12,paddingVertical:15
    }
   
})