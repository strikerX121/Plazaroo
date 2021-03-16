import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, RefreshControl,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import StarRating from 'react-native-star-rating';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const productitems=[
    {
      'image':require('../icons/home-image5.png'),
      'name':'Datsun Mitsubishi',
      'add':'Johar town',
      'price':125.00,
    },
    {
      'image':require('../icons/honda1.png'),
      'name':'Hyundai Hondaa',
      'add':'Wopda Town',
      'price':125.00,
    },
    {
      'image':require('../icons/bike2.jpg'),
      'name':'Dawlance Bike',
      'add':'Bahria Town',
      'price':188.00,
    },
    // {
    //   'image':require('../icons/apple.jpg'),
    //   'name':'Apple Mac Book 2019',
    //   'add':'Oxford Street',
    //   'price':125.00,
    // },
  ]
 
export default class Homefiltersearchdata extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
          refresh:false,
          isConnected:true,
          items_arr:this.props.navigation.getParam('filterdata'),
          cat_data:this.props.navigation.getParam('category_data'),
           
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
       
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
              <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
         </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Filter Items</Text>
          </View>
        
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView>
          
           
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
  
            
           {this.state.items_arr=='NA' && 
             <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',paddingTop:30,alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently items are not available</Text>
          }
   <View style={{width:'95%',paddingBottom:80,alignSelf:'center'}}>
   <View style={{marginTop:30,}}>
     <FlatList
      data={this.state.items_arr}
      numColumns={2}
      renderItem={({item,index})=>{
        if(this.state.items_arr!='NA'){
            return(
            <View style={{width:'49%',alignSelf:'center',margin:1,paddingVertical:14,borderRadius:12}}>
    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homeproductdetaile',{'Product_id':item.item_id})}}>
            <View style={{width:'90%',alignSelf:'center'}}>
           
             <View style={{width:'100%',alignSelf:'center',backgroundColor:'#f5f5f5'}}>
                <Image source={item.item_images!='NA'?{uri:config.img_url+item.item_images[0].image}:require('../icons/noimage.png')} style={{width:'100%',height:120,borderRadius:10,resizeMode:'cover',alignSelf:'center'}}/>
           </View>
            <Text style={{color:'black',paddingTop:10,fontFamily:'Ubuntu-Bold',paddingLeft:10,textAlign:'center',fontSize:13}}>{item.item_name}</Text>
            {/* <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:5,}}>
               <Image source={require('../icons/location.png')} style={{width:14,height:14,alignSelf:'center'}}/>
             <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13,paddingLeft:10}}>{item.add}</Text>
              </View>
            <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingLeft:10,fontSize:13}}>${item.price}</Text> */}
            </View>
            </TouchableOpacity>
           </View>
         )
          }
      }}
      keyExtractor={(item, index) => index.toString()}
     />
   </View>

</View>
  </ScrollView>
  
           
       {/* ........................................Container finish............................... */}
     
     
       <UserFooter navigation={this.props.navigation} color={this.state.page}/>
        
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
      alignSelf:'center',
      paddingVertical:15,
      borderBottomWidth:1,
      borderBottomColor:'#e8e8e8'
    }
   
})