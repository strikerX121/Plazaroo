import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import Venderfooter from './Venderfooter'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';

import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { FlatList } from 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from 'react-native-chart-kit';
  
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

global.selleraddress='NA'
export default class Vendorhome extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'home',
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
        <View style={{width:'100%',alignSelf:'center',height:screenHeight*35/100,borderBottomLeftRadius:20,borderBottomRightRadius:20,backgroundColor:Colors.buttoncolor,paddingTop:10}}>
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Vendernotification')}} style={{paddingVertical:15,width:'20%',alignSelf:'flex-end'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/notification.png')} style={{alignSelf:'center',width:18,height:20}}/>
               {/* <View style={{backgroundColor:'green',position:'absolute',width:15,height:15,alignSelf:'flex-end'}}>
                  <Text style={{}}>1</Text>
               </View> */}
             </View>
          </TouchableOpacity>
          <View style={{flexDirection:'row',width:'80%',alignSelf:'center'}}>
               <View style={{width:90,alignSelf:'center',height:90,borderRadius:45,backgroundColor:'#efc2f0'}}>
                 {/* <Image source={require('../icons/product.png')} style={{alignSelf:'center',width:60,height:60,backgroundColor:'#f083f2',borderRadius:30}}/> */}
               </View>
             <View style={{paddingLeft:25,alignSelf:'center'}}>
                 <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14}}>Nike</Text>
                 <Text style={{color:'#dc95de',fontFamily:'Ubuntu-Regular',fontSize:14,paddingVertical:6}}>nike@gmail.com</Text>
                  <TouchableOpacity style={{backgroundColor:'#FFFFFF',width:'100%',borderRadius:15,marginTop:7}}> 
                  <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',textAlign:'center',paddingVertical:4,fontSize:12}}>Edit Account</Text>
                  </TouchableOpacity>
             </View>
          </View>
        
          <View style={{position:'absolute',bottom:20,alignSelf:'center',right:0}}>
              <View style={{flexDirection:'row',width:'95%',alignSelf:'center'}}>
                <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Venderorders')}}>
                <View style={{flexDirection:'row',width:'100%',alignSelf:'center'}}>
                    <Image source={require('../icons/orders.png')} style={{alignSelf:'center',width:20,height:20}}/>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Regular',textAlign:'center',fontSize:14,paddingLeft:15}}>orders</Text>
                 </View> 
                </TouchableOpacity>
                <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Vendor_profile')}}>
                 <View style={{flexDirection:'row',width:'100%',alignSelf:'center'}}>
                    <Image source={require('../icons/w-name.png')} style={{alignSelf:'center',width:20,height:20}}/>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Regular',textAlign:'center',fontSize:14,paddingLeft:15}}>Profile</Text>
                 </View>
                 </TouchableOpacity>
                 <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Vendorinventary')}}>
                 <View style={{flexDirection:'row',width:'100%',alignSelf:'center'}}>
                    <Image source={require('../icons/products.png')} style={{alignSelf:'center',width:20,height:20}}/>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Regular',textAlign:'center',fontSize:14,paddingLeft:15}}>Products</Text>
                 </View>
                 </TouchableOpacity>
            </View>   
          </View>
                
        </View>
        {/* ..............................heaser finish................................ */}
     <ScrollView style={{marginBottom:100}}>
    <View style={{width:'90%',alignSelf:'center',marginTop:15}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View >
                 <Text style={{color:'black',fontFamily:'Ubuntu-Bold'}}>Overview</Text> 
                     <View style={{flexDirection:'row',paddingTop:10}}>
                        <Text style={{color:'black',fontFamily:'Ubuntu-Regular'}}>Show</Text>
                       <Text style={{color:'black',fontFamily:'Ubuntu-Medium'}}>This Year <Icon2 name='caretdown' color='black' size={15}/></Text>  
                     </View>
              </View>
               <Image source={require('../icons/download.png')} style={{width:30,alignSelf:'center',height:30,borderRadius:5}}/>
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:20,alignSelf:'center'}}>
             <View style={{backgroundColor:'#FFFFFF',alignSelf:'center',alignItems:'center',borderRadius:5,paddingVertical:20,width:'48%'}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:25}}>Total Sale</Text>  
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15}}>$68,000</Text>  
              </View>
              <View style={{backgroundColor:'#FFFFFF',alignSelf:'center',alignItems:'center',borderRadius:5,paddingVertical:20,marginLeft:'4%',width:'48%'}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:25}}>Total Order</Text>  
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15}}>200</Text>  
              </View>
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:20,alignSelf:'center'}}>
             <View style={{backgroundColor:'#FFFFFF',alignSelf:'center',alignItems:'center',borderRadius:5,paddingVertical:20,width:'48%'}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:25}}>Total User</Text>  
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15}}>500K</Text>  
              </View>
              <View style={{backgroundColor:'#FFFFFF',alignSelf:'center',alignItems:'center',borderRadius:5,paddingVertical:20,marginLeft:'4%',width:'48%'}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:25}}>Total Products</Text>  
             <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15}}>50</Text>  
              </View>
           </View>
      
       <View style={{backgroundColor:'#FFFFFF',marginTop:13}}>
       <Text style={{color:'black',fontSize:14,paddingLeft:14,fontFamily:'Ubuntu-Medium',paddingVertical:10}}>Sales Figures</Text>  
       <View style={{flexDirection:'row',paddingBottom:10,justifyContent:'space-between',paddingHorizontal:15}}>
       <View style={{flexDirection:'row',}}>
                <Icon1 name='circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingLeft:10}}>Sales</Text>  
         </View>
         <View style={{flexDirection:'row',paddingRight:20}}>
                <Icon1 name='circle' size={13} color='green' style={{alignSelf:'center'}}/>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingLeft:10}}>Orders</Text>  
         </View>
         </View>
       <LineChart
  data={{
    labels: [
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        strokeWidth: 3,
      },
    ],
  }}
  width={Dimensions.get('window').width - 40}
  height={230}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/> 
</View>
</View>
</ScrollView>
       
       {/* ........................................Container finish............................... */}
     
     
             <Venderfooter navigation={this.props.navigation} color={this.state.page}/>
        
    </View>
  )
    }
}
const styles=StyleSheet.create({
  
    container:{
        flex:1,
        backgroundColor:'#f7f7f7',
       
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