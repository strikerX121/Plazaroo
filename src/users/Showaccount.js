import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,ToastAndroid,BackHandler, Keyboard,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import NetInfo from '@react-native-community/netinfo'
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Entypo'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Showaccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            Termsdata:[],
            isConnected:true,
            loading:false,
            isConnected:true,
            bank_data:this.props.navigation.getParam('bank_data'),
            ifsccode:'',
            errorno:0,
            price:'',
            name:'',
            account_no:''
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
          this.bakdetaileshow()
         });
         this.bakdetaileshow()   
     }
     bakdetaileshow=async()=>{
         let bank_data= await localStorage.getItemObject('bank_data')
          if(bank_data!=null)
          {
              this.setState({bank_data:bank_data})
          }
     }
    addbankdetaile=async()=>{
     let userdata=await localStorage.getItemObject('user_arr')
      var user_id = userdata.user_id
      let bank_data=this.state.bank_data
        // let order_id=this.state.orderdata.order_id
      Keyboard.dismiss();
      if(this.state.price.length<=0){
        this.setState({errorno:1})
          return false;
      }
      if(bank_data.user_wallet==0)
      {
             msgProvider.alert(msgTitle.information[config.language],'Please check your wallet amount', false);
             this.props.navigation.navigate('UserWallet')
               return false
      }
      if(this.state.price>bank_data.user_wallet)
      {
        msgProvider.alert(msgTitle.information[config.language],'Please check your wallet amount', false);
        this.props.navigation.navigate('UserWallet')
          return false
      }
      
   if(this.state.isConnected===true)
      {
           this.setState({loading:true,})
            var url = config.baseURL+'withdraw_payment.php'
            let data=new FormData()
              data.append('user_id',user_id)
              data.append('user_type',1)
              data.append('amount',this.state.price)
              data.append('description',this.state.comment)
              console.log('url',url)
              console.log('data',data)
          fetch(url,{
              method:'POST',
              headers: new Headers(config.headersapi), 
             body:data,
          }).then((obj)=>{  this.setState({loading:false,});   return  obj.json();}).then((obj)=>{
              console.log('obj',obj)
         Keyboard.dismiss()
              if(obj.success=='true')
              {
                ToastAndroid.showWithGravityAndOffset(
                  obj.msg[config.language],
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                  25,
                  50
                );
                this.props.navigation.navigate('UserWallet')
                
                }
          else{
              msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          }
            }).catch((error)=> {
              this.setState({loading:false})
              console.log('eror',error)
               msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
            })
          
          }
   else{
          msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        } 
      
    }
  deletebankaccount=async()=>{
   
    let userdata=await localStorage.getItemObject('user_arr')
    var user_id = userdata.user_id
      Keyboard.dismiss();
      if(this.state.isConnected===true)
      {
      this.setState({loading:true,})
       var url = config.baseURL+'delete_bank.php?user_id='+user_id+'&user_type=1&bank_id='+this.state.bank_data.bank_id
       fetch(url,{
              method:'Get',
              headers: new Headers(config.headersapi), 
           
          }).then((obj)=>{  this.setState({loading:false,});   return  obj.json();}).then((obj)=>{
              console.log('obj',obj)
            
            
                Keyboard.dismiss()
              if(obj.success=='true')
              {
                ToastAndroid.showWithGravityAndOffset(
                    obj.msg[config.language],
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                    25,
                    50
                  );
                  this.props.navigation.navigate('UserWallet')
                
                }
          else{
              msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          }
            }).catch((error)=> {
              this.setState({loading:false})
              console.log('eror',error)
               msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
            })
          
          }
   else{
          msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
        } 
      
  }
   
    render(){
        console.log('cikasd')
        let item=this.state.bank_data
        console.log('item',item)
return(
    <View style={styles.container}>
         <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
  <ScrollView style={{marginBottom:90}}>
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',borderBottomWidth:1,borderBottomColor:Colors.inputborder,flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
          
              <View style={{width:'100%',alignSelf:'center',}}>
              <Text style={{color:'black',fontSize:14,textAlign:'center',}}>Withdraw Request</Text>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30}}>
           <View style={{width:'97%',borderRadius:10,alignSelf:'center',paddingVertical:13,paddingHorizontal:15,backgroundColor:Colors.buttoncolor}}>
               <View style={{flexDirection:'row',width:'100%'}}>
<Text style={{width:'75%',color:'#FFFFFF',fontFamily:'Ubuntu-Medium',alignSelf:'center',fontSize:15}} numberOfLines={1}>{item.account_holder}</Text> 
                  <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Editaccount',{'bank_data1':item})}}>
                   <View style={{width:25,height:25,alignSelf:'center',alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:50}}>
                   <Icon2 name='edit' size={16} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                   </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>{this.deletebankaccount()}}>
                      <View style={{width:25,height:25,marginLeft:15,alignSelf:'center',alignItems:'center',justifyContent:'center',backgroundColor:'white',borderRadius:50}}>
                      <Icon2 name='cross' size={16} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                   </View>
                   </TouchableOpacity>
                </View>  
<Text style={{width:'100%',color:'#FFFFFF',fontFamily:'Ubuntu-Medium',alignSelf:'center',fontSize:15,paddingVertical:13}} numberOfLines={1}>{item.account_no}</Text> 
                <Text style={{width:'100%',color:'#FFFFFF',fontFamily:'Ubuntu-Medium',alignSelf:'center',fontSize:15}} numberOfLines={1}>ifsc code:{item.ifsc_code}</Text>       
           </View>
       <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:15}}>Amount</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Enter Amount'
                    placeholderTextColor='#d1d1d1'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    ref={(ref)=>{this.name=ref}}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({price:txt})}}
                    maxLength={40}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={styles.errortextstyle}>Please enter Amount</Text>
                   }


             <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>comment</Text>
        <View style={styles.inputcontainer}>
            
        <TextInput
                    style={styles.Textarea_Style}
                            placeholder='Enter Comment'
                            ref={(ref)=>{this.discription=ref}}
                             placeholderTextColor={Colors.textcolor}
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            returnKeyType="done"
                            returnKeyLabel="done"
                            blurOnSubmit={true}
                            maxLength={160}
                           underlineColorAndroid={'transparent'}
                            onChangeText={(txt) => this.setState({comment:txt})}
                         />
          </View>
          {this.state.errorno==2 && 
             <Text style={styles.errortextstyle}>Please enter comment</Text>
           }
                  

          
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'90%',}}>
       <TouchableOpacity  activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.addbankdetaile()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Submit</Text>
               </View>
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
    textfiledinput:{
      paddingVertical:5,
      color:'black',
      fontFamily:'Ubuntu-Medium',
      fontSize:14,
      paddingLeft:5,
    width:'100%'
    },
    errortextstyle:{
      color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',
      fontSize:13,paddingTop:4
    },
    inputcontainer:{
        flexDirection:'row',
        marginVertical:10,
        backgroundColor:'#FFFFFF',
        // elevation:2,
        // shadowOffset:{width:2,height:2},
      
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:10,width:'100%'
    },
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:12,
        width:'100%',
    },
    Textarea_Style:{
      width:'100%',
      color:'black',
      textAlignVertical: 'top',
       paddingLeft:20,
      paddingRight:50,
      fontSize:15,
      height:120,
      fontFamily:'Ubuntu-Medium',
      // backgroundColor:'#FFFFFF',
      justifyContent: "flex-start",
      // elevation:8,
      // borderBottomColor:'black',
      // borderBottomWidth:0.6,
      // shadowOpacity:0.9,
      // shadowOffset:{width:2,height:20},
      borderColor:Colors.inputborder,
    borderWidth:1.5,
      borderRadius:8,
      marginTop:10,
     
  },
   
})