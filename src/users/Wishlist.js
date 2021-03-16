import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,ToastAndroid,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar,Alert} from 'react-native';
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


 
export default class Wishlist extends Component{
    constructor(props) {
        super(props);
        this.state = { 
               loading: false,
               isConnected:true,
               starCount:4.5,
               refresh:false,
               favouritedata:[]
             }
           }
    componentDidMount(){
          NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
          const unsubscribe = NetInfo.addEventListener(state => {
          this.setState({isConnected:state.isConnected})
         });
      
       this.getallfavouritedata()
        }
getallfavouritedata=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
    
      if(this.state.isConnected===true)
      {
        let data=new FormData()
        data.append('user_id',userdata.user_id)
        data.append('user_type',1)
      
      var url = config.baseURL+'get_favourites_item.php'
       console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({loading:true,})
      }
       fetch(url,{
          method: 'POST',
          headers: new Headers(config.headersapi), 
          body:data
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)
           if(obj.success == 'true'){
        this.setState({favouritedata:obj.item_details_arr})
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
      deletefavoritebtn=async(item_id,btn)=>{
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
        if(this.state.isConnected===true)
           {
             let data=new FormData()
           
             data.append('user_id',userdata.user_id)
             data.append('user_type',1)
             data.append('item_id',item_id)
           var url = config.baseURL+'itemFavoriteStatus.php'
          console.log("url:"+url);
         if(this.state.refresh==false)
           {
           this.setState({user_id:userdata.user_id,loading:true,})
          }
         fetch(url,{
            method: 'POST',
            headers: new Headers(config.headersapi), 
            body:data
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
                let data=this.state.favouritedata
                   let findindex=data.findIndex((item)=>{
                     return item.item_id==item_id
                   })
                   if(findindex!=-1)
                   {
                    data.splice(findindex,1)
                   }
                   if(data.length<=0)
                   {
                     data='NA'
                   }
                this.setState({favouritedata:data})
                ToastAndroid.showWithGravityAndOffset(
                  obj.msg[config.language],
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                  25,
                  50
                );
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
        deleteconfirmationbtn=(id,btn)=>{
          Alert.alert(
            "Confirm",
            "Do you want to delete address?",
            [
             { text: 'YES', onPress: () => this.deletefavoritebtn(id,btn) },
             { text: 'NO', onPress: () => console.log('cancle') },
             
           ],
           { cancelable: true },
        
          )
        } 
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
        
 
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Wishlist</Text>
          </View>
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView>
          {this.state.favouritedata=='NA' && 
           <Text style={{justifyContent:"center",alignSelf:'center',paddingTop:30}}>currently items are not available in Wishlist</Text>
          }
         <View style={{width:'95%',paddingTop:20,paddingBottom:80,alignSelf:'center'}}>
             
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
            <View style={{marginTop:10}}>
              <FlatList
                data={this.state.favouritedata}
                renderItem={({item,index})=>{
                  if(this.state.favouritedata!='NA')
                  {
                  return(
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Homeproductdetaile',{'Product_id':item.item_id})}}>
                    <View style={{width:'97%',alignSelf:'center',marginBottom:12,backgroundColor:'#fafafa',paddingVertical:16,borderRadius:7,}}>
                    <View style={{flexDirection:'row',width:'100%',paddingLeft:10}}>
                     <View style={{width:'23%',alignSelf:'center',}}>
                        <Image source={item.item_image!='NA'?{uri:config.img_url+item.item_image[0].image}:require('../icons/noimage.png')} style={{alignSelf:'center',width:'100%',height:80,borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                     </View>
                            <View style={{width:'75%',paddingLeft:10,alignSelf:'center'}}>  
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item.item_name}</Text>   
                            <TouchableOpacity onPress={()=>{this.deleteconfirmationbtn(item.item_id,'single')}}>
                            <Image source={require('../icons/delete.png')} style={{alignSelf:'center',width:14,height:16,marginRight:10}}/>
                            </TouchableOpacity> 
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
                                    //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                                 />
                                
                                 </View> 
                                 <Text style={{color:'gray',alignSelf:'center',fontFamily:'Ubuntu-Medium',paddingLeft:10,fontSize:12}}>{item.total_rate}</Text>    
                                
                                 </View>   
                       </View> 
                       
                 </View>
                       </View>  
                       </View> 
                     
                    </View>
                    </TouchableOpacity>
                  )
                  }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>

         </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
      
           
        
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