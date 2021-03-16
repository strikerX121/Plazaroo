import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,ToastAndroid,TextInput,BackHandler,Keyboard,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'

import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import Icon2 from 'react-native-vector-icons/Entypo'

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
 export default class Addadress extends Component{
    constructor(props) {
        super(props);
        this.state = { 
             loading: false,
             home:true,
             work:false,
             other:false,
             placename:'',
             address_type:0,
            errorno:0,
            isConnected:true,
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
          this.setState({loading:false})
         });

  }
   
   addaddressbtn = async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
     let user_id=userdata.user_id
    
          if(this.state.placename.length<=0)
          {
            this.setState({errorno:1})
            return false
          }
          if(selleraddress=='NA')
          {
         this.setState({errorno:2})
        return false
         }
           if(this.state.isConnected===true)
          {
      this.setState({ loading: true,user_id:user_id});
      let data=new FormData();
      data.append('user_id',user_id)
      data.append('user_type',1)
      data.append('address_type',this.state.address_type)
      data.append('address_id',0)
      data.append('place_name',this.state.placename)
      data.append('address',selleraddress.address)
      data.append('latitude',selleraddress.latitude)
      data.append('longitude',selleraddress.longitude)
        var url = config.baseURL+'addressEditUpdate.php'
       console.log("url:"+url);
        const {navigate} = this.props.navigation;
     fetch(url,{
           method: 'POST',
           headers: new Headers(config.headersapi), 
         body:data
       }).then( (obj)=> {
        this.setState({loading:false});
          return obj.json();  
       }).then( (obj)=> { 
           console.log('obj',obj);
        //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
           if(obj.success == 'true'){
            this.props.navigation.goBack();
            selleraddress='NA'
            ToastAndroid.showWithGravityAndOffset(
              obj.msg[config.language],
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );
            // msgProvider.alert(msgTitle.information[config.language],  false);
             }else{
               msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
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
           <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
            <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Add Address</Text>
          </View>
          {/* <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:30,height:30}}/>
             </View>
          </TouchableOpacity> */}
                
        </View>
        {/* ..............................heaser finish................................ */}
        <ScrollView>
         <View style={{width:'95%',paddingTop:13,paddingBottom:80,alignSelf:'center'}}>
         <View style={{flexDirection:'row',width:'99%',paddingTop:20,alignSelf:'center'}}>
       <TouchableOpacity style={{width:'33%',paddingLeft:10}} onPress={()=>{this.setState({other:false,home:true,work:false,address_type:0})}}>
         <View style={[styles.tabstylebtn,this.state.home==true?{borderColor:Colors.buttoncolor}:{borderColor:Colors.borderColor}]}>
                <Image source={this.state.home==true?require('../icons/f1-a.png'):require('../icons/f1.png')} style={{width:18,height:18,alignSelf:'center',marginRight:5}}/>
                  <Text style={[styles.tabtextstyle,this.state.home==true?{color:Colors.buttoncolor}:{color:'black'}]}>Home</Text>
                </View>
             </TouchableOpacity>
         <TouchableOpacity style={{width:'33%',paddingLeft:10}} onPress={()=>{this.setState({other:false,home:false,work:true,address_type:1})}}>
                <View style={[styles.tabstylebtn,this.state.work==true?{borderColor:Colors.buttoncolor}:{borderColor:Colors.borderColor}]}>
                <Image source={this.state.work==true?require('../icons/work2.png'):require('../icons/work1.png')} style={{width:18,height:18,alignSelf:'center',marginRight:5}}/>
                  <Text style={[styles.tabtextstyle,this.state.work==true?{color:Colors.buttoncolor}:{color:'black'}]}>Work</Text>
                </View>
             </TouchableOpacity>
       <TouchableOpacity style={{width:'33%',paddingLeft:10}} onPress={()=>{this.setState({other:true,home:false,work:false,address_type:2})}}>
             <View style={[styles.tabstylebtn,this.state.other==true?{borderColor:Colors.buttoncolor}:{borderColor:Colors.borderColor}]}>
                <Image source={this.state.other==true?require('../icons/address2.png'):require('../icons/address1.png')} style={{width:18,height:18,alignSelf:'center',marginRight:5}}/>
                  <Text style={[styles.tabtextstyle,this.state.other==true?{color:Colors.buttoncolor}:{color:'black'}]}>Other</Text>
                </View>
             </TouchableOpacity>
          </View>
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   <Text style={{paddingLeft:10,fontSize:11,color:'gray',fontFamily:'Ubuntu-Regular',paddingTop:16,paddingBottom:7}}>PLACE NAME</Text>
   <View style={styles.inputcontainer}>
   
           <TextInput
                   placeholder='Enter place name'
                   placeholderTextColor='gray'
                   keyboardType='default'
                   returnKeyLabel='done'
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({placename:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View>
         {this.state.errorno==1 && 
                 <Text style={styles.errortextstyle}>Please enter place name</Text>
                }
         <Text style={{paddingLeft:10,fontSize:11,color:'gray',fontFamily:'Ubuntu-Regular',paddingTop:16,paddingBottom:7}}>PLACE ADDRESS</Text>
         <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addaddressgoogle')}}>
         <View style={[styles.inputcontainer,{ borderColor:Colors.inputborder, borderWidth:1.5,paddingVertical:7}]}>
             <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:7}}>
              <Icon2 name='location' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
              <Text style={{fontSize:13,paddingLeft:10,width:'95%',fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:10,color:'black'}}>{selleraddress!='NA'?selleraddress.address:'Add place address'}</Text> 
           </View>
        </View>
        </TouchableOpacity>
        {this.state.errorno==2 && 
                 <Text style={styles.errortextstyle}>Please enter add address</Text>
                }
        
{/*         
         <View style={styles.inputcontainer}>
           <TextInput
                   placeholder='13424 NE 20th St Bellevue, WA 98005'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   returnKeyLabel='done'
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   style={styles.textfiledinput}
                  />
         </View> */}
         </View>
       {/* ........................................Container finish............................... */}
     
     
           </ScrollView>
          
           <View style={{position:'absolute',bottom:15,left:0,right:0,}} >
           <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.addaddressbtn()}} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center'}]}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Save address</Text>
               </View>
            </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>{this.addaddressbtn()}} activeOpacity={0.8} style={{width:'95%',marginTop:25,paddingVertical:13,alignSelf:'center',backgroundColor:Colors.buttoncolor,borderWidth:0.8,borderColor:Colors.buttoncolor,borderRadius:5}}>
                           <Text style={{color:'#FFFFFF',fontFamily:'Ubuntu-Bold',fontSize:14,textAlign:'center',width:'100%'}}>Save address</Text> 
                          </TouchableOpacity> */}
                       
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
      width:'90%',
      alignSelf:'center',
      borderRadius:12,paddingVertical:15
    },
    inputcontainer:{
        flexDirection:'row',
         backgroundColor:'#FFFFFF',
        // elevation:2,
        // shadowOffset:{width:2,height:2},
        borderRadius:5,
        borderColor:Colors.inputborder,
        borderWidth:1.5,
        alignSelf:'center',
        paddingHorizontal:15,width:'95%'
    },
    textfiledinput:{
        paddingVertical:5,
        color:'black',
        fontFamily:'Ubuntu-Medium',
        fontSize:14,
        paddingLeft:12,
      width:'95%'
      },
      tabstylebtn:{
        backgroundColor:'#FFFFFF',
       width:'100%',
        flexDirection:'row',alignItems:'center',
        justifyContent:'center',borderRadius:5,paddingVertical:8,
        borderWidth:0.6
      },
      tabtextstyle:{

        fontFamily:'Ubuntu-Regular',
      textAlign:'center',alignSelf:'center'
    },
    errortextstyle:{
      color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',
      fontSize:13,paddingTop:4
    },
   
})