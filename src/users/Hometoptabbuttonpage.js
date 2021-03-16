import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import StarRating from 'react-native-star-rating';
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native-gesture-handler';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const productitems=[
    {
      'image':require('../icons/home-image1.png'),
      'name':'Nokia 2.2 For Sale',
      'add':'Johar town',
      'price':125.00,
    },
    {
      'image':require('../icons/home-image2.png'),
      'name':'Atlas Honda',
      'add':'Wopda Town',
      'price':125.00,
    },
    {
      'image':require('../icons/home-image3.png'),
      'name':'Dawlance Fridge',
      'add':'Bahria Town',
      'price':188.00,
    },
    {
      'image':require('../icons/home-image4.png'),
      'name':'Apple Mac Book 2019',
      'add':'Oxford Street',
      'price':125.00,
    },
    {
      'image':require('../icons/home-image5.png'),
      'name':'Apple Mac Book 2019',
      'add':'Oxford Street',
      'price':125.00,
    },
    {
      'image':require('../icons/home-image6.png'),
      'name':'Apple Mac Book 2019',
      'add':'Oxford Street',
      'price':125.00,
    },
  ]
 
export default class Hometoptabbuttonpage extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'offer',
             starCount:4.5,
             Selling:true,
             Buying:false,
             Post:false,
             productname:this.props.navigation.getParam('productname'),
            orderdata:productitems
            }
      
    }
    onStarRatingPress(rating) {
      this.setState({
        starCount:rating
      
      });
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
<Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>{this.state.productname} Product</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
    
           
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   {this.state.Selling==true && 
   <View style={{width:'95%',paddingBottom:80,alignSelf:'center'}}>
   <View style={{marginTop:30}}>
     <FlatList
      data={this.state.orderdata}
      numColumns={2}
      renderItem={({item,index})=>{
         return(
            <View style={{width:'49%',alignSelf:'center',margin:1,paddingVertical:14,borderRadius:12}}>
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homeproductdetaile')}}>
            <View style={{width:'90%',alignSelf:'center'}}>
           
             <View style={{width:'100%',alignSelf:'center',backgroundColor:'#f5f5f5'}}>
                <Image source={item.image} style={{width:'100%',height:120,borderRadius:10,resizeMode:'cover',alignSelf:'center'}}/>
           </View>
            <Text style={{color:'black',paddingTop:10,fontFamily:'Ubuntu-Bold',paddingLeft:10,textAlign:'center',fontSize:13}}>{item.name}</Text>
            {/* <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:5,}}>
               <Image source={require('../icons/location.png')} style={{width:14,height:14,alignSelf:'center'}}/>
             <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13,paddingLeft:10}}>{item.add}</Text>
              </View>
            <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingLeft:10,fontSize:13}}>${item.price}</Text> */}
            </View>
            </TouchableOpacity>
           </View>
         )
      }}
      keyExtractor={(item, index) => index.toString()}
     />
   </View>

</View>
   }
  
           
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