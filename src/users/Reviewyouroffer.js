import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Icon from 'react-native-vector-icons/AntDesign'
import StarRating from 'react-native-star-rating';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import Icon2 from 'react-native-vector-icons/Feather'
import { FlatList } from 'react-native-gesture-handler';
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

 
export default class Reviewyouroffer extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             isConnected:true,
             refresh:false,
             starCount:4.5,
             offer_price:'',
             totalprice:0,
             user_wallet:this.props.navigation.getParam('user_wallet'),
             taxprice:0,
            productdetaile:this.props.navigation.getParam('productdetaile'),
             orderdata:orderdata
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener('didFocus', () => {
        //   this.getalladdress1()
        //  });
        console.log('productdetaile:this.props.navigation.getParam', this.props.navigation.getParam('productdetaile'))
        this.checkmakeoffer()
  }
    checkmakeoffer=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
     let get_offer_id= this.state.productdetaile.get_offer_id
     let check_page=this.props.navigation.getParam('pagerefence')
      if(check_page=='homedetaile')
      {
        get_offer_id=this.state.productdetaile.accept_offer_details.get_offer_id
      }
      if(this.state.isConnected===true)
         {
        var url = config.baseURL+'review_offer.php?user_id='+user_id+'&user_type=1'+'&item_id='+this.state.productdetaile.item_id+'&offer_id='+get_offer_id
        console.log("url:"+url);
        this.setState({loading:true,})
        fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
        
        }).then((obj)=>{  this.setState({loading:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
             if(obj.item_single_arr!='NA')
             {
               let item=obj.item_single_arr
               let price=0
               let offer_price=0
               let taxprice=0
               if(item.accept_offer_details!='NA')
               {
              let price2=parseFloat(item.accept_offer_details.price).toFixed(2)
               let tax=parseFloat(price2*item.tax/100).toFixed(2)
               console.log('txa',tax)
               let charge=parseFloat(item.delivery_charge).toFixed(2)
                taxprice=tax
                price=(parseFloat(tax)+parseFloat(price2)).toFixed(2)
                console.log('price',price)
                offer_price=item.accept_offer_details.price
                }
               else{
                 console.log('lsdlhghshdfjsk')
                 let tax=parseFloat(item.item_price*item.tax/100).toFixed(2)
                   taxprice=tax
                   console.log('tax',taxprice)
                  price=parseFloat(item.item_price+tax).toFixed(2)
                  offer_price=item.item_price
                }
          
               
                   this.setState({taxprice:taxprice,offer_price:offer_price,user_wallet:obj.user_wallet,modalVisible:true,productdetaile:obj.item_single_arr,totalprice:price})
                
               
                  console.log('totalprice',this.state.totalprice)
             }
             else{
              alert("Sorry, the item has been sold")
             }
            
            } 
            else{
              if(obj.account_active_status=="deactivate")
               {
                 this.props.navigation.navigate('Logout')
               }
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
           this.setState({loading: false,refresh:false});
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }  
      }
   
    render(){
     let item=this.state.productdetaile
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
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Review your offer</Text>
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
   <View style={{flexDirection:'row',width:'100%'}}>
                    <View style={{width:'23%',alignSelf:'center'}}>
                        <Image source={item.item_images!='NA'?{uri:config.img_url1+item.item_images[0].image}:require('../icons/noimage.png')} style={{alignSelf:'center',width:'100%',height:80,borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                    </View>
                      <View style={{width:'77%',paddingLeft:10,alignSelf:'center'}}>  
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item.item_name}</Text>    
                            {/* <Image source={require('../icons/delete.png')} style={{alignSelf:'center',width:14,height:16,marginRight:10}}/> */}
                       </View> 
                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingTop:7,fontSize:13}}>${item.item_price}</Text>
                     <View style={{width:'100%',flexDirection:'row',paddingVertical:8,alignSelf:'center'}}>
                      <View style={{width:'15%',alignSelf:'center'}}>
                        <Image source={item.userDetails.image!='NA'?{uri:config.img_url+item.userDetails.image}:require('../icons/name.png')} style={{width:23,height:23,borderRadius:13,backgroundColor:'#f0f0f0'}}/>
                     </View>
                     <View style={{width:'85%'}}>
        <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>{item.userDetails.name}</Text>  
                          <View style={{flexDirection:'row',width:'100%'}}>
                                   <View style={{width:'30%',alignSelf:'center'}}>
                                   <StarRating
                                         disabled={true}
                                         fullStar={require('../icons/star2.png')}
                                         emptyStar={require('../icons/unfilstar.png')}
                                          // halfStarEnabled={true}
                                          // halfStarColor={Colors.Buttoncolor}
                                          //  emptyStarColor={Colors.textcolor}
                                          maxStars={5}
                                          starSize={10}
                                          rating={item.total_rate}
                                     selectedStar={(rating) => this.onStarRatingPress(rating)}
                                 />
                                
                                 </View> 
                                 <Text style={{color:'gray',alignSelf:'center',fontFamily:'Ubuntu-Medium',paddingLeft:10,fontSize:12}}>{item.total_rate}</Text>    
                                
                                 </View>  
                       </View> 
                       
                 </View>
                       </View>  
                       </View> 
          
          
          
          
          
            {/* <View style={{marginTop:10}}>
              <FlatList
               data={this.state.orderdata}
               renderItem={({item,index})=>{
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',paddingVertical:14,borderRadius:5,}}>
                    <View style={{flexDirection:'row',width:'100%'}}>
                    <View style={{width:'23%',alignSelf:'center'}}>
                        <Image source={require('../icons/nokia.jpg')} style={{alignSelf:'center',width:'100%',height:80,borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                    </View>
                      <View style={{width:'77%',paddingLeft:10,alignSelf:'center'}}>  
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item.name}</Text>    
                            <Image source={require('../icons/delete.png')} style={{alignSelf:'center',width:14,height:16,marginRight:10}}/>
                       </View> 
                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingTop:7,fontSize:13}}>{item.price}</Text>
                     <View style={{width:'100%',flexDirection:'row',paddingVertical:8,alignSelf:'center'}}>
                      <View style={{width:'15%',alignSelf:'center'}}>
                        <Image source={require('../icons/men2.jpg')} style={{width:23,height:23,borderRadius:13,backgroundColor:'#f0f0f0'}}/>
                     </View>
                     <View style={{width:'85%'}}>
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Octasia Mushiro</Text>  
                          <View style={{flexDirection:'row',width:'100%'}}>
                                   <View style={{width:'30%',alignSelf:'center'}}>
                                   <StarRating
                                         disabled={false}
                                         fullStar={require('../icons/star2.png')}
                                         emptyStar={require('../icons/star.png')}
                                          // halfStarEnabled={true}
                                          // halfStarColor={Colors.Buttoncolor}
                                          //  emptyStarColor={Colors.textcolor}
                                          maxStars={5}
                                          starSize={10}
                                          rating={this.state.starCount}
                                     selectedStar={(rating) => this.onStarRatingPress(rating)}
                                 />
                                
                                 </View> 
                                 <Text style={{color:'gray',alignSelf:'center',fontFamily:'Ubuntu-Medium',paddingLeft:10,fontSize:12}}>{this.state.starCount}</Text>    
                                
                                 </View>  
                       </View> 
                       
                 </View>
                       </View>  
                       </View> 
                     
          </View>
                  )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View> */}

         </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:'absolute',bottom:0,left:0,right:0,}}>
                         <View style={{backgroundColor:'#f2f2f2',paddingVertical:10,alignSelf:'center',width:'100%',paddingHorizontal:15}}>
                         <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>PAYMENT SUMMARY</Text> 
                         <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
                              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Offer Price</Text> 
                              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>${parseFloat(this.state.offer_price).toFixed(2)}</Text>         
                        </View>
                       {item.order_type==0 &&     <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
                             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipping({item.delivery_charge}/km)</Text> 
                              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>{item.delivery_charge==0?'Free':'$0.00'}</Text>         
                        </View>}
                         <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>Tax({parseInt(item.tax)}%)</Text> 
                               {/* item.accept_offer_details!='NA'?parseFloat(this.state.offer_price*item.tax/100).toFixed(2):parseFloat(item.item_price*item.tax/100).toFixed(2) */}
                               <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>${this.state.taxprice}</Text>         
                         </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:10}}>
                              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12}}>You Pay</Text> 
                              <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>${this.state.totalprice}</Text>         
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Paymentdeliverydetailes',{'productdetaile':this.state.productdetaile,'totalprice':this.state.totalprice,'user_wallet':this.state.user_wallet})}} style={{width:'95%',marginTop:25,paddingVertical:11,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                           <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Continue</Text> 
                          </TouchableOpacity>
                        </View>
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