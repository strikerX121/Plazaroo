import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, Keyboard,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import NetInfo from '@react-native-community/netinfo'
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Editaccount extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            Termsdata:[],
            isConnected:true,
            loading:false,
            isConnected:true,
            bank_data:this.props.navigation.getParam('bank_data1'),
            ifsccode:'',
            errorno:0,
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
        this.bankdetaileshow()
     }
     bankdetaileshow=async()=>{
        let bank_data= await localStorage.getItemObject('bank_data')
      
         if(bank_data!=null)
         {
            let item1=bank_data
            this.setState({account_no:item1.account_no,ifsccode:item1.ifsc_code,name:item1.account_holder})
         }
    }
    //  showbankdetaile=()=>{
    //      let item1=this.state.bank_data
    //    this.setState({account_no:item1.account_no,ifsccode:item1.ifsc_code,name:item1.account_holder})
    //  }
    addbankdetaile=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
    //   let user_id=0;
    let name=this.state.name
      let account_no=this.state.account_no
      let ifsccode=this.state.ifsccode
      let description=this.state.description
     
      // let order_id=this.state.orderdata.order_id
      Keyboard.dismiss();
      if(name.length<=0){
        this.setState({errorno:1})
          return false;
      }
      else{
         const reg1=/^[a-zA-Z ]{2,30}$/;
        if(reg1.test(name)!==true)
        {
          this.setState({errorno:2})
            return false;
        }
      }
     if(account_no.length<=0){
        this.setState({errorno:3})
          return false;
        }
     
      if(ifsccode.length<=0){
            this.setState({errorno:5})
       return false
        }
       
   if(this.state.isConnected===true)
      {
           this.setState({loading:true,})
            var url = config.baseURL+'add_bank.php'
            let data=new FormData()
            data.append('user_id',user_id)
            data.append('user_type',1)
            data.append('account_holder',name)
            data.append('account_no',account_no)
            data.append("ifsc_code", ifsccode);
          
          console.log('url',url)
          console.log('data',data)
          fetch(url,{
              method:'POST',
              headers: new Headers(config.headersapi), 
             body:data,
          }).then((obj)=>{  this.setState({loading:false,name:'',email:''});   return  obj.json();}).then((obj)=>{
              console.log('obj',obj)
              this.account_no.clear()
              this.ifsccode.clear()
            
                Keyboard.dismiss()
              if(obj.success=='true')
              {
                this.setState({bank_data:obj.bank_data})
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                localStorage.setItemObject('bank_data',obj.bank_data) 
                this.props.navigation.goBack()
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
              <Text style={{color:'black',fontSize:14,textAlign:'center',}}>Add/Edit Bank Account</Text>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Enter Bank Details</Text>
       <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>Bank Holder Name</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Bank Holder Name'
                    placeholderTextColor='#d1d1d1'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    ref={(ref)=>{this.name=ref}}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({name:txt})}}
                    maxLength={40}
                    value={this.state.name}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={styles.errortextstyle}>Please enter Bank Holder Name</Text>
                   }

{this.state.errorno==2 && 
                    <Text style={styles.errortextstyle}>Please enter valid Bank Holder Name</Text>
                   }
             <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>Account Number</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Account Number'
                    placeholderTextColor='#d1d1d1'
                    keyboardType='number-pad'
                    returnKeyLabel='done'
                    ref={(ref)=>{this.account_no=ref}}
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({account_no:txt})}}
                    maxLength={20}
                    value={this.state.account_no}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==3 && 
                    <Text style={styles.errortextstyle}>Please enter Account Number</Text>
                   }
                   {this.state.errorno==4 && 
                    <Text style={styles.errortextstyle}>Please enter valid Account Number</Text>
                   }
             <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>IFSC Code</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='IFSC Code'
                    placeholderTextColor='#d1d1d1'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    ref={(ref)=>{this.ifsccode=ref}}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({ifsccode:txt})}}
                    maxLength={20}
                    value={this.state.ifsccode}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==5 && 
                    <Text style={styles.errortextstyle}>Please enter ifsc code</Text>
                   }


          
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'90%',}}>
       <TouchableOpacity  activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.addbankdetaile()}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Send</Text>
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
        borderColor:Colors.inputborder,
      borderWidth:1.5,
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
       
        borderColor:Colors.inputborder,
        borderWidth:1.5,
        // backgroundColor:'#FFFFFF',
        justifyContent: "flex-start",
        // elevation:2,
    //   shadowOpacity:0.9,
    //     shadowOffset:{width:2,height:20},
        borderRadius:8,
        marginTop:10,
       
    },
   
})