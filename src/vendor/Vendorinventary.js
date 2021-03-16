import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, RefreshControl,Alert,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import Venderfooter from './Venderfooter'
import { config } from '../providers/configProvider';
import Loader from '../Loader';
import NetInfo from '@react-native-community/netinfo';
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
 
export default class Vendorinventary extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             page:'inventary',
             All:true,
             Active:false,
             Past:false,
             isConnected:true,
             refresh:false,
            orderdata:orderdata,
            item_details_arr:[]
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.getalldatamyoffer1()
         });
        this.getalldatamyoffer()
     }
     getalldatamyoffer1=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'get_all_item.php?user_id='+userdata.user_id+'&user_type=2';
      console.log("url:"+url);
    
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({item_details_arr:obj.item_details_arr})
            } 
            else{
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                if(obj.account_active_status=="deactivate")
                {
                  this.props.navigation.navigate('Logout')
               }
                return false;
         }
       }).catch((error)=> {
         console.log("-------- error ------- "+error);
         msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
         this.setState({refresh:false})
     });
    }
    else{
       msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
     }  
    }
   getalldatamyoffer=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
        var url = config.baseURL+'get_all_item.php?user_id='+userdata.user_id+'&user_type=2';
      console.log("url:"+url);
      if(this.state.refresh==false)
         {
          this.setState({user_id:userdata.user_id,loading:true,})
         }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
             console.log('obj',obj)
           if(obj.success == 'true'){
             this.setState({item_details_arr:obj.item_details_arr})
            } 
            else{
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                if(obj.account_active_status=="deactivate")
                {
                  this.props.navigation.navigate('Logout')
               }
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
    _onRefresh = () => {
      this.setState({refresh:true})
     this.getalldatamyoffer1()
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 {/* <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/> */}
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Products</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Vendorpostitem')}}> 
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Vendoraddproduct')}}>  */}
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/plus.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity>
                
        </View>
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
          >
        {/* ..............................heaser finish................................ */}
         <View style={{width:'95%',paddingTop:13,paddingBottom:80,alignSelf:'center'}}>
            <View style={{flexDirection:'row',width:'100%',backgroundColor:'#f5f5f5',borderRadius:13}}>
               <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({All:true,Past:false,Active:false})}}>
                 {this.state.All==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>All</Text>
                   </View>}
                   {this.state.All==false && <View style={{width:'100%',borderRadius:12,paddingVertical:14}}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>All</Text>
                   </View>}
               </TouchableOpacity>
             
               <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Past:false,Active:true})}}>
                 {this.state.Active==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Active Products</Text>
                   </View>}
                   {this.state.Active==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Active Products</Text>
                   </View>}
               </TouchableOpacity>
               <TouchableOpacity style={{width:'33.3%',alignSelf:'center'}} onPress={()=>{this.setState({All:false,Past:true,Active:false})}}>
                 {this.state.Past==true && <View style={[styles.buttonlayoutheader,{backgroundColor:Colors.buttoncolor}]}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'#FFFFFF'}}>Past</Text>
                   </View>}
                   {this.state.Past==false && <View style={styles.buttonlayoutheader}>
                     <Text style={{textAlign:'center',fontFamily:'Ubuntu-Medium',color:'black'}}>Past</Text>
                   </View>}
               </TouchableOpacity>
              
          </View>  
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   {this.state.All==true && <View style={{marginTop:30,alignSelf:'center'}}>
              <FlatList
               data={this.state.item_details_arr}
               showsVerticalScrollIndicator={false}
                   renderItem={({item,index})=>{
                     if(this.state.item_details_arr!='NA')
                     {
                  return(
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',elevation:2,paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                             <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Vendorinventrydetail')}}>
                              <View style={{flexDirection:'row',width:'100%'}}>
                              <View style={{width:'25%',alignSelf:'center'}}>
                              <Image source={{uri:config.img_url+item.item_images[0].image}} style={{alignSelf:'center',width
                         :'100%',height:100,borderRadius:8,backgroundColor:Colors.imagebackcolor}}/>
                                </View>
                                <View style={{width:'75%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:13}}>{item.name}</Text>    
                                   <TouchableOpacity onPress={()=>{this.props.navigation.navigate('vendereditproductinventory')}}>
                                     <Image source={require('../icons/edit.png')} style={{alignSelf:'center',width:14,height:16,}}/>
                                   </TouchableOpacity>
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingTop:7,fontSize:13}}>Color: {item.color}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>Quantity: {item.quantity}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:12}}>Size: {item.size}</Text>    
                                   <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.price}</Text>
                                 </View> 
                                 </View>  
                                 </View>  
                                 </TouchableOpacity>
                    </View>
                  )
                }
                else{
                  if(item=='N')
                  {
                    return(
                      <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently selling items are not available</Text>
                    )
                  }
                }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>}
            {this.state.Past==true &&
       <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingTop:40,fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently selling items are not available</Text>
     }
      {this.state.Active==true &&
       <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingTop:40,fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>Currently selling items are not available</Text>
     }
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