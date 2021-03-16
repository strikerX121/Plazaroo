import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import Venderfooter from './Venderfooter'
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
          'orderno':'876543',
           'date':'29 April 1:21 pm',
           'status':0,
           'quantity':3,
            'price':24,
        },
        {
          'orderno':'876543',
           'date':'29 April 1:21 pm',
           'status':1,
           'quantity':2,
            'price':21,
        },
        {
          'orderno':'876543',
           'date':'29 April 1:21 pm',
           'status':2,
           'quantity':1,
            'price':'09',
        }
]
 
export default class Venderorders extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'orders',
             All:true,
             Ongoing:false,
             Wating:false,
             orderdata1:'NA',
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
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>My Orders</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:18,height:18}}/>
             </View>
          </TouchableOpacity>
                
        </View>
        {/* ..............................heaser finish................................ */}
         <View style={{width:'95%',paddingTop:20,paddingBottom:80,alignSelf:'center'}}>
            <View style={{flexDirection:'row',width:'100%',backgroundColor:'#f5f5f5',borderRadius:13}}>
               <TouchableOpacity style={{width:'25%',alignSelf:'center'}} onPress={()=>{this.setState({All:true,Ongoing:false,Wating:false,Complete:false})}}>
                 {this.state.All==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>All</Text>
                   </View>}
                   {this.state.All==false && <View style={{width:'100%',borderRadius:12,paddingVertical:14}}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>All</Text>
                   </View>}
               </TouchableOpacity>
             
               <TouchableOpacity style={{width:'25%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Ongoing:true,Wating:false,Complete:false})}}>
                 {this.state.Ongoing==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Ongoing</Text>
                   </View>}
                   {this.state.Ongoing==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Ongoing</Text>
                   </View>}
               </TouchableOpacity>
               <TouchableOpacity style={{width:'25%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Ongoing:false,Wating:true,Complete:false})}}>
                 {this.state.Wating==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Waiting</Text>
                   </View>}
                   {this.state.Wating==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Waiting</Text>
                   </View>}
               </TouchableOpacity>
               <TouchableOpacity style={{width:'25%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Ongoing:false,Wating:false,Complete:true})}}>
                 {this.state.Complete==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Completed</Text>
                   </View>}
                   {this.state.Complete==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Completed</Text>
                   </View>}
               </TouchableOpacity>
          </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   {this.state.All==true && 
           <View style={{marginTop:30}}>
              <FlatList
               data={this.state.orderdata}
               renderItem={({item,index})=>{
                  return(
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Vendororderdetaile')}}>
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',elevation:2,paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.orderno}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.date}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                               {item.status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                               {item.status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                               {item.status==2 && <Text style={{color:'#e31238',fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                                          <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.quantity}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.price}</Text></Text>
                                 </View>     
                    </View>
                    </TouchableOpacity>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>}
            {this.state.Ongoing==true && 
           <View style={{marginTop:30}}>
              <FlatList
               data={this.state.orderdata}
               renderItem={({item,index})=>{
                 if(item.status==0)
                {
                  return(
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Vendororderdetaile')}}>
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',elevation:2,paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.orderno}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.date}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                               {item.status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                               {item.status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                               {item.status==2 && <Text style={{color:'#e31238',fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                                          <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.quantity}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.price}</Text></Text>
                                 </View>     
                    </View>
                    </TouchableOpacity>
                  )
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>}
            {this.state.Complete==true && 
           <View style={{marginTop:30}}>
              <FlatList
               data={this.state.orderdata1}
               renderItem={({item,index})=>{
                 if(this.state.orderdata1!='NA')
                {
                  return(
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Vendororderdetaile')}}>
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',elevation:2,paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.orderno}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.date}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                               {item.status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                               {item.status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                               {item.status==2 && <Text style={{color:'#e31238',fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                                          <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.quantity}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.price}</Text></Text>
                                 </View>     
                    </View>
                    </TouchableOpacity>
                  )
                }
                else{
                  if(item=='N')
                  {
                   return(
                        <Text style={{textAlign:'center',alignSelf:'center',fontSize:13,fontFamily:'Ubantu-Medium'}}>No Completed order right now</Text>
                      )
                  }
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>}
            {this.state.Wating==true && 
           <View style={{marginTop:30}}>
              <FlatList
               data={this.state.orderdata}
               renderItem={({item,index})=>{
                 if(item.status==1)
                {
                  return(
                    <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Vendororderdetaile')}}>
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',elevation:2,paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.orderno}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.date}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                               {item.status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                               {item.status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                               {item.status==2 && <Text style={{color:'#e31238',fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                                          <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.quantity}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.price}</Text></Text>
                                 </View>     
                    </View>
                    </TouchableOpacity>
                  )
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>}

         </View>
       {/* ........................................Container finish............................... */}
     
     
             <Venderfooter navigation={this.props.navigation} color={this.state.page}/>
        
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