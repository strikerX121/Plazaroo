import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/FontAwesome'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const orderdata=[
       {
          'name':'Levis colorblock',
           'images':require('../icons/men2.jpg'),
          'color':'Red',
          'quantity':1,
          'size':'M',
          'price':'120.95'
        },
        {
            'name':'Nokia 2.2',
            'images':require('../icons/nokia.jpg'),
            'color':'White',
            'quantity':1,
            'size':'Usa',
            'price':'120.95'
        },
       
]
 
export default class Vendororderdetaile extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'inventary',
             All:true,
             Active:false,
             Past:false,
             orderdata:orderdata,
             status:4,
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
        <View style={{width:'95%',alignSelf:'center',flexDirection:'row',paddingTop:10,elevation:2,backgroundColor:'#FFFFFF'}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',}}>
                 <Image source={require('../icons/back.png')} style={{width:14,marginLeft:10,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Order No :876543</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 {/* <Image source={require('../icons/plus.png')} style={{alignSelf:'center',width:30,height:30}}/> */}
             </View>
          </TouchableOpacity>
                
        </View>
        {/* ..............................heaser finish................................ */}
         <ScrollView>
         <View style={{width:'95%',paddingTop:13,paddingBottom:80,alignSelf:'center'}}>
            <View style={{flexDirection:'row',width:'95%',alignSelf:'center',borderRadius:13}}>
               <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:11}}>Pending</Text>
               </View>
               <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:11}}>Confirmed</Text>
                </View>
                <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:11}}>Picked</Text>
                </View>
                <View style={{width:'21%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}} numberOfLines={1}>- - - - - - - -</Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:11}}>Shipped</Text>
                </View>
                <View style={{width:'16%'}}>
                   <View style={{flexDirection:'row',width:'100%',marginLeft:10}}>
                        <Icon3 name='check-circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/> 
                        <Text style={{textDecorationStyle:'dashed',alignSelf:'center',color:Colors.buttoncolor,}}></Text>
                   </View>
                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:11}}>Delivered</Text>
                </View>
          </View> 
         {/* ________________________________________slider finish_________________________ */}
         
          <View style={{width:'100%',marginTop:25,backgroundColor:'#f5f5f5',borderRadius:5,paddingVertical:14}}>
               <Text style={{color:'black',paddingLeft:10,fontFamily:'Ubuntu-Bold',fontSize:13}}>Order Details</Text>
         </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
            <View style={{marginTop:15}}>
              <FlatList
               data={this.state.orderdata}
               renderItem={({item,index})=>{
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center',}}>
                                  <Image source={item.images} style={{width:70,borderRadius:5,height:70,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item.name}</Text>    
                                   {/* <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/> */}
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>Color: {item.color}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>Quantity: {item.quantity}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:12}}>Size: {item.size}</Text>    
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.price}</Text>
                                 </View> 
                                 </View>  
                                 </View>  
                    </View>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
              {/* ______________________________card finish_____________________________________  */}
              <View style={{marginHorizontal:20}}>
                <View style={{flexDirection:'row',paddingBottom:15,}}>
                    <Image source={require('../icons/delivery.png')} style={{width:25,height:25,alignSelf:'center'}}/>  
                     <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:20}}>Delivery</Text>   
                </View>
                <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:14,}}>Jasmine Hampton, 438 Dark Spurt Avenue, San Francisco, CA, 94528</Text>   
                <View style={{flexDirection:'row',paddingBottom:12,justifyContent:'space-between',paddingTop:20}}>
                    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Original Product Price</Text>   
                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>$240</Text>   
                </View>
                <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Shipping</Text>   
                     <Text style={{color:'black',fontFamily:'Ubuntu-Light',fontSize:14,}}>Free</Text>   
                </View>
                <View style={{flexDirection:'row',paddingBottom:20,justifyContent:'space-between'}}>
                <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Bold',fontSize:14,}}>TOTAL PRICE</Text>   
                     <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Bold',fontSize:15,}}>$240.9</Text>   
                </View>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:'#FFFFFF',alignItems:'center',borderColor:Colors.buttoncolor,borderWidth:0.8}]}>
               <View style={{alignSelf:'center',alignItems:'center',}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:Colors.buttoncolor}}>Cancel</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center'}]}>
               <View style={{alignSelf:'center',alignItems:'center'}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Message Customer</Text>
               </View>
            </TouchableOpacity>
         </View>
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
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:14,
        width:'90%',
    },
    buttonlayoutheader:{
      width:'90%',
      alignSelf:'center',
      borderRadius:12,paddingVertical:15
    }
   
})