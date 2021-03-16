import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,SafeAreaView,TouchableOpacity,Modal,Alert,BackHandler,Keyboard,FlatList,StatusBar} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import Loader from '../Loader';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon3 from 'react-native-vector-icons/Feather'
import NetInfo from '@react-native-community/netinfo';
// import ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
const BannerWidth = Dimensions.get('window').width*80/100;
export default class UserWallet extends Component{
    constructor(props){
        super(props)
        this.state={
            menu:'',
           loading:false,
           isConnected:true,
           refresh:false,
           errorno:0,
           history:true,
           withdraw:false,
           withdraw_details:[],
           bank_deatils:'NA',
          user_wallet:0,
           transactions_arr:[],

        }
    }

    componentDidMount(){
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
         const unsubscribe = NetInfo.addEventListener(state => {
         this.setState({isConnected:state.isConnected})
           });
         this.getwalletdata()
           const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
          this.getwalletdata1()
         });
       }
getwalletdata=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        let user_id=userdata.user_id
      
        if(this.state.isConnected===true)
        {
        
        
        var url = config.baseURL+'get_all_transactions.php?user_id='+user_id+'&user_type=1'
         console.log("url:"+url);
        if(this.state.refresh==false)
        {
          this.setState({loading:true,})
        }
         fetch(url,{
            method: 'Get',
            headers: new Headers(config.headersapi), 
          
            }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
             this.setState({transactions_arr:obj.transactions_arr,user_wallet:obj.user_wallet,bank_deatils:obj.bank_deatils,withdraw_details:obj.withdraw_details})
             localStorage.setItemObject('bank_data',obj.bank_deatils)
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
           
getwalletdata1=async()=>{
          let userdata=await localStorage.getItemObject('user_arr')
          let user_id=userdata.user_id
        
          if(this.state.isConnected===true)
          {
          
          
          var url = config.baseURL+'get_all_transactions.php?user_id='+user_id+'&user_type=1'
           console.log("url:"+url);
        
           fetch(url,{
              method: 'Get',
              headers: new Headers(config.headersapi), 
            
              }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
           console.log('obj',obj)
               if(obj.success == 'true'){
               this.setState({transactions_arr:obj.transactions_arr,user_wallet:obj.user_wallet,bank_deatils:obj.bank_deatils,withdraw_details:obj.withdraw_details})
               localStorage.setItemObject('bank_data',obj.bank_deatils)
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
return(
    <View style={styles.container}>
      <Loader loading={this.state.loading}/>
   
        <View style={{backgroundColor:Colors.buttoncolor,paddingVertical:15,height:screenHeight*30/100}}>
     <View style={{flexDirection:'row',justifyContent:'space-between'}}>
     <TouchableOpacity style={{paddingTop:10}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',marginLeft:15}}>
                  <Image source={require('../icons/w-back.png')} style={{width:12,height:15,}}/>
             </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingTop:10}} onPress={()=>{this.state.bank_deatils=='NA'?this.props.navigation.navigate('Addaccount'):this.props.navigation.navigate('Showaccount',{'bank_data':this.state.bank_deatils})}}> 
            <View style={{width:'100%',marginRight:15}}>
                  <Image source={require('../icons/plusicon.png')} style={{width:20,height:20,}}/>
             </View>
          </TouchableOpacity>
          </View>
      <View style={{paddingVertical:10,paddingTop:30,alignItems:'center',justifyContent:'center',}}>
              <Text style={{fontSize:16,color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Medium',paddingVertical:9,}}>Wallet Amount</Text>
<Text style={{fontSize:19,color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Bold',paddingVertical:9,}}>{this.state.user_wallet!='NA'?"$"+this.state.user_wallet:'$0.00'}</Text>
                   
            </View>
            </View>
            <View style={{marginTop:15,width:'90%',flexDirection:'row',alignSelf:'center',paddingVertical:10}}>
                <TouchableOpacity style={{width:'50%'}} onPress={()=>{this.setState({history:true,withdraw:false})}}>
                    <View style={[{width:'100%',backgroundColor:'#FFFFFF',borderWidth:1,borderTopLeftRadius:35,paddingVertical:7,borderBottomLeftRadius:35,borderColor:Colors.inputborder},this.state.history==true?{backgroundColor:Colors.buttoncolor}:{backgroundColor:'#FFFFFF'}]}>
                       <Text style={{fontSize:16,color:'black',textAlign:'center',fontFamily:'Ubuntu-Medium',paddingVertical:9,}}>Wallet History</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'50%'}} onPress={()=>{this.setState({history:false,withdraw:true})}}>
                    <View style={[{width:'100%',backgroundColor:'#FFFFFF',borderWidth:1,borderBottomRightRadius:35,borderTopRightRadius:35,paddingVertical:7,borderColor:Colors.inputborder},this.state.withdraw==true?{backgroundColor:Colors.buttoncolor}:{backgroundColor:'#FFFFFF'}]}>
                       <Text style={{fontSize:16,color:'black',textAlign:'center',fontFamily:'Ubuntu-Medium',paddingVertical:9,}}>Wallet Request</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {this.state.withdraw==true && 
            <View style={{marginTop:2,width:'95%',alignSelf:'center',marginBottom:320}}>
              {this.state.withdraw_details=='NA' &&
            <Text style={{width:'78%',fontFamily:'Ubuntu-Medium',textAlign:'center',paddingTop:30,fontSize:13}} numberOfLines={1}>wallet request is not available</Text>
            }
            <FlatList
              data={this.state.withdraw_details}
              showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>{
                if(this.state.withdraw_details!='NA')
                {
                return(
                    <View style={{width:'95%',alignSelf:'center',paddingVertical:8,borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                         <View style={{flexDirection:'row',width:'100%',alignSelf:'center'}}>
                              <Text style={{width:'78%',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.createtime}</Text>
                           <Text style={{width:'22%',textAlign:'right',fontFamily:'Ubuntu-Bold',fontSize:13}}  numberOfLines={1}>${item.amount}</Text> 
                         </View> 
                         <View style={{flexDirection:'row',width:'100%',alignSelf:'center',paddingTop:5}}>
                              <Text style={{width:'78%',fontFamily:'Ubuntu-Regular',color:'black',fontSize:16}} numberOfLines={1}>{item.account_holder}</Text>
                               {item.status==0 &&
                                <Text style={{width:'22%',textAlign:'right',color:'#e3de4b',fontFamily:'Ubuntu-Bold',fontSize:13}}  numberOfLines={1}>Pending</Text> 
                               }
                               {item.status==2 &&
                                <Text style={{width:'22%',textAlign:'right',color:'#f51853',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>Decline</Text> 
                                }
                              {item.status==1 &&
                              <Text style={{width:'22%',textAlign:'right',color:'#60e67d',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>Completed</Text> 
                              }
                         </View>  
                         <Text style={{width:'100%',fontFamily:'Ubuntu-Regular',color:'gray',fontSize:13,paddingTop:5}} numberOfLines={1}>Ac no{item.account_no}</Text>
                         <Text style={{width:'100%',fontFamily:'Ubuntu-Regular',color:'gray',fontSize:13,paddingTop:5}} numberOfLines={1}>ifsc code {item.ifsc_code}</Text>
                         <Text style={{width:'85%',fontFamily:'Ubuntu-Regular',color:'gray',fontSize:13,paddingTop:5}} numberOfLines={2}>{item.description}</Text>
                         

                    </View>
                    )
                }
             }}
             keyExtractor={(item, index) => index.toString()}
            />
          </View>
            }
             {this.state.history==true && 
            <View style={{marginTop:2,width:'95%',alignSelf:'center',marginBottom:320}}>
              {this.state.transactions_arr=='NA' &&
            <Text style={{width:'78%',fontFamily:'Ubuntu-Medium',textAlign:'center',paddingTop:30,fontSize:13}} numberOfLines={1}>wallet history is not available</Text>
            }
            <FlatList
              data={this.state.transactions_arr}
              showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>{
                if(this.state.transactions_arr!='NA')
                {
                return(
                  <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                    if(item.status==1 || item.status==2)
                    {
                      this.props.navigation.navigate('Orderdetailuser',{'order_id':item.action_id})
                    }
                  }}>
                    <View style={{width:'97%',alignSelf:'center',paddingVertical:12,borderBottomWidth:1,borderBottomColor:'#f2f2f2'}}>
                        <View style={{width:'100%',flexDirection:'row'}}>
                         {item.status==2 && <View style={{width:'10%',alignSelf:'center'}}>
                            <Icon3 name='arrow-down-left' size={26} color='red' style={{alignSelf:'center'}}/>
                          </View>}
                          {item.status==3 && <View style={{width:'10%',alignSelf:'center'}}>
                            <Icon3 name='arrow-down-left' size={26} color='red' style={{alignSelf:'center'}}/>
                          </View>}
                          {item.status==4 && <View style={{width:'10%',alignSelf:'center'}}>
                            <Icon3 name='arrow-down-left' size={26} color='red' style={{alignSelf:'center'}}/>
                          </View>}
                          {item.status==1 && <View style={{width:'10%',alignSelf:'center'}}>
                            <Icon3 name='arrow-up-right' size={26} color='green' style={{alignSelf:'center'}}/>
                          </View>}
                          {item.status==0 && <View style={{width:'10%',alignSelf:'center'}}>
                            <Icon3 name='arrow-up-right' size={26} color='green' style={{alignSelf:'center'}}/>
                          </View>}
                          {item.status==5 && <View style={{width:'10%',alignSelf:'center'}}>
                            <Icon3 name='arrow-up-right' size={26} color='green' style={{alignSelf:'center'}}/>
                          </View>}
                          <View style={{width:'90%'}}>
                          <View style={{flexDirection:'row',width:'100%',alignSelf:'center'}}>
                               <Text style={{width:'75%',fontFamily:'Ubuntu-Medium',fontSize:13}} numberOfLines={1}>{item.date}</Text>
                               <Text style={{width:'25%',textAlign:'right',fontFamily:'Ubuntu-Bold',fontSize:13}}  numberOfLines={1}>{item.status>1?item.status!=5?( <Text style={{color:'red'}}>- </Text> ):( <Text style={{color:'green'}}>+ </Text> ):( <Text style={{color:'green'}}>+ </Text> )} ${item.amount}</Text> 
                          </View> 
                         
                              <View style={{paddingTop:5}}>
                              {item.status==0 &&
                               <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}}  numberOfLines={1}>{item.message}</Text> 
                              }
                               {item.status==2 &&
                               <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.message}</Text> 
                              }
                              {item.status==1 &&
                               <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.message}</Text> 
                              }
                              {item.status==3 &&
                              <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.message}</Text> 
                              }
                             {item.status==4 &&
                              <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.message}</Text> 
                              }
                              {item.status==5 &&
                              <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.message}</Text> 
                              }
                               {item.status==6 &&
                              <Text style={{width:'90%',color:'gray',fontFamily:'Ubuntu-Bold',fontSize:13}} numberOfLines={1}>{item.message}</Text> 
                              }
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

            }
            
    </View>
)
    }
}
const styles=StyleSheet.create({
    container:{
 flex:1,
 backgroundColor:'#FFFFFF'
    },

  button:
  {
      marginBottom:13,
      alignSelf:'center',
      borderRadius:6,
      paddingVertical:12,
      width:'100%',
  },
  errortextstyle:{
    color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',
    fontSize:13,paddingTop:4
  },
 
})
