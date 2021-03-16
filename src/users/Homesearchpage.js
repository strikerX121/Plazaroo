import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,PermissionsAndroid,Platform,SafeAreaView,TouchableOpacity,BackHandler,FlatList,StatusBar,Keyboard} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import UserFooter from './UserFooter'
import Icon from 'react-native-vector-icons/AntDesign'
import Geolocation from '@react-native-community/geolocation';
import NetInfo from '@react-native-community/netinfo';
import MasonryList from "react-native-masonry-list";
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Homesearchpage extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading:false,
           isConnected:true,
           player_id:'' ,
           page:'home',
           refresh:false,
           category_arr:[],
           itemname:'',
           item_details_arr:'',
           item_arr:[],
           notification_count:'',
           changeicon:true,
         }
 }

    componentDidMount(){
         NetInfo.fetch().then(state => {
         this.setState({isConnected:state.isConnected})});
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state => {
         this.setState({isConnected:state.isConnected})
        });
     }

    searchdataitem=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=0
      if(userdata!=null)
      {
        user_id=userdata.user_id
      }
     let position=currentLatlong
     console.log('position',position)
      if(this.state.isConnected===true)
      {
        let longitude=position.coords.longitude
        let latitude=position.coords.latitude  
       var url = config.baseURL+'get_search_items.php?user_id='+user_id+'&user_type=1&latitude='+latitude+'&longitude='+longitude+'&keyword='+this.state.itemname;
       console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:user_id,loading:true,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,itemname:'',changeicon:false,refresh:false});    return  obj.json();}).then((obj)=>{
       console.log('obj',obj)

           if(obj.success == 'true'){
                  this.itemname.clear();
                  this.setState({item_details_arr:obj.item_details_arr})
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
   
    //   _onRefresh = () => {
    //     this.setState({refresh:true})
    //     this.getlatlong()
    //   }
     
     render(){
        console.log('cikasd')
  return(
     <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
       <Loader loading={this.state.loading}/>
        <View style={styles.container}>
        <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
        
         <ScrollView  
        style={{marginBottom:90}} showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='always' keyboardDismissMode='none'
         >
       <View style={{width:'95%',alignSelf:'center',paddingTop:10}}>
         {/* -------------------------------searchbar start------------------------------ */}
          <View style={{flexDirection:'row',justifyContent:'center',width:'100%'}}>
           
              <View style={{flexDirection:'row',borderRadius:10,backgroundColor:'#ededed',width:'100%',}}>
                <TouchableOpacity style={{width:'12%',alignSelf:'center'}}>
             
                   {this.state.changeicon==true && 
                   <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                   <Icon name='arrowleft' color='gray' size={22}  style={{alignSelf:'center'}} />
                    </TouchableOpacity>
                   }
                   {this.state.changeicon==false &&  <Image source={require('../icons/b-search.png')} style={{width:20,height:20,alignSelf:'center'}}/>}
                </TouchableOpacity>
                <View style={{width:'68%'}}>
                 <TextInput
                     placeholder='Search Item'
                     returnKeyLabel='done'
                     ref={(input) => { this.itemname = input; }}
                     returnKeyType='done'
                    
                     autoFocus={true}
                     onSubmitEditing={()=>{Keyboard.dismiss()}}
                     onChangeText={(txt)=>{this.setState({itemname:txt,changeicon:false})}}
                   style={{width:'100%',color:'black',fontFamily:'Ubuntu-Bold',alignSelf:'center',paddingVertical:10}}
                    />
                </View>
                {this.state.itemname.length>0  && <TouchableOpacity style={{paddingVertical:17,width:'8%',alignSelf:'center'}} onPress={()=>{this.itemname.clear();this.setState({changeicon:true,itemname:''})}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>}
               {this.state.itemname.length>0 && <TouchableOpacity style={{width:'12%',alignSelf:'center'}} onPress={()=>{this.searchdataitem()}}>
                  <Icon name='checkcircle' size={25} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
            </TouchableOpacity>}
              </View>
             
          
          </View>
         
       
          <View style={{width:'95%',paddingBottom:80,alignSelf:'center'}}>
   <View style={{marginTop:17,}}>
     <FlatList
      data={this.state.item_details_arr}
      numColumns={2}
      renderItem={({item,index})=>{
        if(this.state.item_details_arr!='NA'){
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
            
                  {this.state.item_details_arr=='NA' && <View>
                         <Text style={{color:'black',textAlign:'center',paddingTop:40,fontFamily:'Ubuntu-Regular',alignSelf:'center',justifyContent:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>this type of items are not available</Text>
                   </View>}
                     
                  
             

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