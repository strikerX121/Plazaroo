import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Alert,RefreshControl,ToastAndroid,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Icon from 'react-native-vector-icons/AntDesign'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
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

 
export default class Youraddress extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
          errorno:0,
          isConnected:true,
          user_id:'',
          refresh:false,
          address_arr:[],
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
          this.getalladdress1()
         });
         this.getalladdress()
  }
  getalladdress1 = async() => {
    let userdata=await localStorage.getItemObject('user_arr')
      //-------------------- input validations -----------------
   let user_id=userdata.user_id
   if(this.state.isConnected===true)
        {
    var url = config.baseURL+'getUserAddress.php?user_id='+user_id+'&user_type=1'
     console.log("url:"+url);
      const {navigate} = this.props.navigation;
   fetch(url,{
         method: 'GET',
         headers: new Headers(config.headersapi), 
       }).then( (obj)=> {
      this.setState({refresh:false,});
        return obj.json();  
     }).then( (obj)=> { 
         console.log('obj',obj);
      //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
         if(obj.success == 'true'){
          this.setState({address_arr:obj.address_arr})
           }else{
             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
             if(obj.account_active_status=="deactivate")
             {
                this.props.navigation.navigate('Logout')
             }
            }
     }).catch((error)=> {
         console.log("-------- error ------- "+error);
        //  alert("result error:"+error)
         this.setState({ refresh:false});
     });
   }
     else{
      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        }   
       }
  getalladdress = async() => {
        let userdata=await localStorage.getItemObject('user_arr')
          //-------------------- input validations -----------------
       let user_id=userdata.user_id
       if(this.state.isConnected===true)
            {
        this.setState({ loading: true,user_id:user_id});
     var url = config.baseURL+'getUserAddress.php?user_id='+user_id+'&user_type=1'
         console.log("url:"+url);
          const {navigate} = this.props.navigation;
       fetch(url,{
             method: 'GET',
             headers: new Headers(config.headersapi), 
           }).then( (obj)=> {
          this.setState({loading:false});
            return obj.json();  
         }).then( (obj)=> { 
             console.log('obj',obj);
          //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
             if(obj.success == 'true'){
              this.setState({address_arr:obj.address_arr})
               }else{
                 msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                 if(obj.account_active_status=="deactivate")
                 {
                    this.props.navigation.navigate('Logout')
                 }
                }
         }).catch((error)=> {
             console.log("-------- error ------- "+error);
            //  alert("result error:"+error)
             this.setState({loading: false });
         });
       }
         else{
          msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
            }   
           }
           removeaddress =async(address_id,action) => {
            let userdata=await localStorage.getItemObject('user_arr')
              //-------------------- input validations -----------------
            
           let user_id=userdata.user_id
              if(this.state.isConnected===true)
            {
            this.setState({ loading: true,user_id:user_id});
          //   let data=new FormData();
          //  data.append('user_id',user_id);
          //  data.append('user_type',1)
          //   data.append('address_id',address_id)
          //    data.append('action',action)
            var url = config.baseURL+'deleteUserAddress.php?user_id='+user_id+'&user_type=1&address_id='+address_id+'&action='+action
             console.log("url:"+url);
            //  console.log('data',data);
              const {navigate} = this.props.navigation;
           fetch(url,{
                 method: 'GET',
                 headers: new Headers(config.headersapi), 
              
             }).then( (obj)=> {
              this.setState({loading:false});
                return obj.json();  
             }).then( (obj)=> { 
                 console.log('obj',obj);
              //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
                 if(obj.success == 'true'){
                  
                   let data=this.state.address_arr
                    let index=data.findIndex((item)=>{
                      return item.address_id==address_id
                    })
                    if(index!=-1)
                    {
                      data.splice(index,1);
                     }
                     else if(btn=='all'){
                          data='NA' 
                     }
                     if(data.length==0)
                     {
                       data='NA'
                     }
                  this.setState({address_arr:data})
                  ToastAndroid.showWithGravityAndOffset(
                    obj.msg[config.language],
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    25,
                    50
                  );
                   }else{
                     msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                     if(obj.account_active_status=="deactivate")
                        {
                          this.props.navigation.navigate('Logout')
                       }
                    }
             }).catch((error)=> {
                 console.log("-------- error ------- "+error);
                //  alert("result error:"+error)
                 this.setState({loading: false });
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
                   { text: 'YES', onPress: () => this.removeaddress(id,btn) },
                   { text: 'NO', onPress: () => console.log('cancle') },
                   
                 ],
                 { cancelable: true },
              
                )
              }      
 _onRefresh = () => {
            this.setState({refresh:true})
           this.getalladdress1()
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'65%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>You Address</Text>
          </View>
          { this.state.address_arr!='NA' &&
          <View  style={{width:'20%',alignSelf:'center'}}>
         { this.state.address_arr.length>1 && <TouchableOpacity style={{width:'100%',alignSelf:'center'}} onPress={()=>{this.deleteconfirmationbtn(" ",'all')}}> 
            <View style={{width:'100%',alignSelf:'center'}} >
              <Text style={{color:Colors.buttoncolor,textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:14,}}>Clear All</Text>
             </View>
            </TouchableOpacity>}
          </View>
            }
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView  refreshControl={
          <RefreshControl
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            tintColor='black'
          />
        }
          >
         <View style={{width:'95%',paddingTop:20,paddingBottom:80,alignSelf:'center'}}>
             
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}


   <View style={{marginTop:10}}>
     <FlatList
      data={this.state.address_arr}
  showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>{
        if(this.state.address_arr!='NA')
        {
         return(
         
            <View style={{borderRadius:6,borderWidth:1,marginBottom:10,borderColor:'#f2f2f2',paddingVertical:13}}>
             <View style={{flexDirection:'row',}}>
             {item.address_type==0 &&   <View style={{width:'15%',alignSelf:'center'}}>
                    <Image source={require('../icons/f1.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                </View>}
                {item.address_type==1 &&   <View style={{width:'15%',alignSelf:'center'}}>
                <Image source={require('../icons/office-address.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                </View>}
                {item.address_type==2 &&   <View style={{width:'15%',alignSelf:'center'}}>
                    <Image source={require('../icons/address1.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                </View>}
                <View style={{width:'70%',alignSelf:'center'}}>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>{item.type} Address</Text>
                <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13,}}>{item.place_name}</Text>
                     <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>{item.address}</Text>
                </View>
               
                <TouchableOpacity style={{width:'15%',}} onPress={()=>{this.props.navigation.navigate('EditAddress',{'addressdata':item})}}>
                <View style={{width:'100%',}} >
                <Image source={require('../icons/edit.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                </View>
                  </TouchableOpacity>
                    
                
          </View>
                  <TouchableOpacity style={{width:50,width:'10%',alignItems:'flex-end',alignSelf:'flex-end',paddingRight:10}} onPress={()=>{this.deleteconfirmationbtn(item.address_id,'single')}}>
                             <Icon name='delete' size={17} color={Colors.buttoncolor} style={{alignSelf:'flex-end',paddingRight:5}}/>
                                   {/* <Text style={{color:'red',fontSize:15,fontFamily:'Dubai-Medium'}}>Delete</Text> */}
                    </TouchableOpacity>
            </View>
     
         )
        }
        else{
          if(item=='N')
          {
            return(
              <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>You have not yet added an address please add an address!</Text>
            )
          }
        }
      }}
      keyExtractor={(item, index) => index.toString()}
     />
     </View>


        {/* <TouchableOpacity>
            <View style={{flexDirection:'row',paddingVertical:13,borderRadius:6,borderWidth:1,borderColor:'#95f2f5'}}>
                  <View style={{width:'15%',alignSelf:'center'}}>
                      <Image source={require('../icons/f1.png')} style={{width:27,height:27,alignSelf:'center'}}/>
                  </View>
                  <View style={{width:'70%',alignSelf:'center'}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,lineHeight:26}}>Home Address</Text>
                  <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>Rosecrams Ave,Suite 200 EI Segundo, USA</Text>
                  </View>
                 
                  <TouchableOpacity style={{width:'15%',}} onPress={()=>{this.props.navigation.navigate('EditAddress')}}>
                  <View style={{width:'100%',}} >
                  <Image source={require('../icons/edit.png')} style={{width:15,height:15,alignSelf:'center'}}/>
                  </View>
                    </TouchableOpacity>
                      
                  
            </View> */}
       
      </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:'absolute',bottom:5,left:0,right:0,}}>
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.props.navigation.navigate('Addadress')}} style={{width:'95%',marginTop:25,paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                           <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Add new</Text> 
                          </TouchableOpacity>
                       
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