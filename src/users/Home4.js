import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,SafeAreaView,TouchableOpacity,BackHandler,FlatList,StatusBar} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import UserFooter from './UserFooter'
import Icon from 'react-native-vector-icons/AntDesign'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const productdata=[
  {
    'image':require('../icons/motors.png'),
    'name':'Motor'
  },
  {
    'image':require('../icons/electronics.png'),
    'name':'Electronics'
  },
  {
    'image':require('../icons/fashion.png'),
    'name':'Fashion'
  },
  {
    'image':require('../icons/furniture.png'),
    'name':'Furnitur'
  },
]
const productitems=[
  {
    'image':require('../icons/nokia1.jpg'),
    'name':'Nokia 2.2 For Sale',
    'add':'Johar town',
    'price':125.00,
  },
  {
    'image':require('../icons/bike.jpg'),
    'name':'Atlas Honda',
    'add':'Wopda Town',
    'price':125.00,
  },
  {
    'image':require('../icons/fridge.jpg'),
    'name':'Dawlance Fridge',
    'add':'Bahria Town',
    'price':188.00,
  },
  {
    'image':require('../icons/apple.jpg'),
    'name':'Apple Mac Book 2019',
    'add':'Oxford Street',
    'price':125.00,
  },
]
export default class Userhome extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
           player_id:'' ,
           page:'home',
           productdata:productdata,
           productitems:productitems
          }
       
    }
     render(){
        console.log('cikasd')
return(
  <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
    <View style={styles.container}>
         <StatusBar 
           hidden = {false}
           barStyle = "light-content"
           backgroundColor = {Colors.statuscolor}
           translucent = {true}
           networkActivityIndicatorVisible = {true}
        />
        <ScrollView style={{marginBottom:90}} showsVerticalScrollIndicator={false}>
       <View style={{width:'95%',alignSelf:'center',paddingTop:40}}>
         {/* -------------------------------searchbar start------------------------------ */}
          <View style={{flexDirection:'row',justifyContent:'center',width:'100%'}}>
              <View style={{flexDirection:'row',borderRadius:10,backgroundColor:'#ededed',width:'87%'}}>
                <TouchableOpacity style={{width:'15%',alignSelf:'center'}}>
                    <Image source={require('../icons/b-search.png')} style={{width:20,height:20,alignSelf:'center'}}/>
                </TouchableOpacity>
                <View style={{width:'70%'}}>
                    <TextInput
                     placeholder='Search'
                     style={{width:'100%',color:'black',fontFamily:'Ubuntu-Bold'}}
                    />
                </View>
                <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Filtersproduct')}}>
                    <Image source={require('../icons/filter.png')} style={{width:20,height:20,alignSelf:'center'}}/>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{width:'13%',alignSelf:'center'}}>
                 <View>
                     <Image source={require('../icons/b-notification.png')} style={{width:20,height:25,alignSelf:'center'}}/>
                 </View>
                 <View style={{position:'absolute',bottom:13,alignSelf:'flex-end',paddingRight:13,}}>
                    <Text style={{textAlign:'center',backgroundColor:'red',borderRadius:2,alignSelf:'center',color:'#FFFFFF',width:15,height:15}}>1</Text>
                 </View>
                </TouchableOpacity>
          </View>
       
       {/* -------------------------------searchbar finish------------------------------ */}
          <View style={{flexDirection:'row',paddingTop:15,width:'97%',alignSelf:'center'}}>
            <Image source={require('../icons/location.png')} style={{width:15,height:15,alignSelf:'center'}}/>
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingLeft:15}}>9 west 46 street, New York City</Text>
          </View>
          <View style={{flexDirection:'row',width:'97%',paddingTop:20,alignSelf:'center'}}>
             <TouchableOpacity style={{width:'20%'}}>
                <View style={{backgroundColor:'#FFFFFF',elevation:4,shadowOpacity:0.8,paddingVertical:8.2,borderRadius:5}}>
                    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center'}}>All</Text>
                </View>
             </TouchableOpacity>
             <TouchableOpacity style={{width:'38%',paddingLeft:10}}>
                <View style={{backgroundColor:'#FFFFFF',elevation:4,shadowOpacity:0.8,width:'100%',flexDirection:'row',borderRadius:5,paddingVertical:8}}>
                <Image source={require('../icons/pickup.png')} style={{width:18,height:18,alignSelf:'center',marginLeft:5}}/>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',alignSelf:'center',width:'80%'}}>Pick up</Text>
                </View>
             </TouchableOpacity>
             <TouchableOpacity style={{width:'38%',paddingLeft:10}}>
             <View style={{backgroundColor:'#FFFFFF',elevation:4,shadowOpacity:0.8,width:'100%',flexDirection:'row',borderRadius:5,paddingVertical:8}}>
                <Image source={require('../icons/shipping.png')} style={{width:18,height:18,alignSelf:'center',marginLeft:5}}/>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',alignSelf:'center',width:'80%'}}>Shipping</Text>
                </View>
             </TouchableOpacity>
          </View>
           <View style={{backgroundColor:Colors.buttoncolor,width:'100%',flexDirection:'row',marginTop:20,borderRadius:12,height:screenHeight*30/100}}> 
               <View style={{width:'40%',paddingTop:20,paddingLeft:15}}>
                    <Text style={{color:'#FFFFFF',fontFamily:'Poppins-ExtraBold',fontSize:28}}>70%</Text>
                    <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:20}}>Best Deal on{"\n"}Top Products</Text>
                    <TouchableOpacity style={{width:'60%',marginTop:10,borderRadius:8,backgroundColor:'#FFFFFF',paddingVertical:10}}>
                    <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:14}}>Shop Now</Text>
                 </TouchableOpacity>
               </View>
               <View style={{position:'absolute',bottom:0,width:'60%',right:0}}>
                  <Image source={require('../icons/girl.png')} style={{width:'87%',height:screenHeight*27/100}}/>
               </View>
           </View>
             <View style={{width:'100%',alignSelf:'center',paddingTop:20}}>
             <FlatList
              data={this.state.productdata}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              
              renderItem={({item,index})=>{
                  return(
                    <View style={{width:120,alignSelf:'center',backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:12}}>
                       <View >
                          <Image source={item.image} style={{width:70,height:70,alignSelf:'center'}}/>
                      </View>
                       <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.name}</Text>
                     </View>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             </View>
             <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:15,paddingHorizontal:10}}>
               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:16}}>Popular Products</Text>
               <TouchableOpacity>
                 <View style={{flexDirection:'row',paddingRight:15}}>
                 <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13}}>View all</Text>
                 <Icon name='right' size={15} color='gray' style={{alignSelf:'center'}}/>
                 </View>
               </TouchableOpacity>
             </View>

             <View style={{width:'100%',alignSelf:'center',paddingTop:10}}>
             <FlatList
              data={this.state.productitems}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>{
                  return(
                    <View style={{width:'49%',alignSelf:'center',margin:1,paddingVertical:14,borderRadius:12}}>
                      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homeproductdetaile')}}>
                      <View style={{width:'90%',alignSelf:'center'}}>
                     
                       <View style={{width:'100%',alignSelf:'center',backgroundColor:'#f5f5f5'}}>
                          <Image source={item.image} style={{width:'100%',height:100,alignSelf:'center'}}/>
                     </View>
                      <Text style={{color:'black',paddingTop:10,fontFamily:'Ubuntu-Bold',paddingLeft:10,fontSize:13}}>{item.name}</Text>
                      <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:5,}}>
                         <Image source={require('../icons/location.png')} style={{width:14,height:14,alignSelf:'center'}}/>
                       <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13,paddingLeft:10}}>{item.add}</Text>
                        </View>
                      <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingLeft:10,fontSize:13}}>${item.price}</Text>
                      </View>
                      </TouchableOpacity>
                     </View>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             </View>

          </View>
          {/* _________________________________________footer start _________________________________ */}
        
          </ScrollView>
          <UserFooter navigation={this.props.navigation} color={this.state.page}/>
    </View>
    </SafeAreaView>
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
        paddingVertical:15,
        width:'90%',
    }
   
})