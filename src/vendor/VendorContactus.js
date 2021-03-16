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
export default class VendorContactus extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            Termsdata:[],
            isConnected:true,
            loading:false,
            isConnected:true,
            pagename:this.props.navigation.getParam('name'),
            description:'',
            subject:'',
            errorno:0,
            name:'',
            email:''
        }
        
    }

    componentDidMount(){
        NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
        //Subscribe to network state updates
           const unsubscribe = NetInfo.addEventListener(state => {
           this.setState({isConnected:state.isConnected})
           });
        
     }
     contactusbtn=async()=>{
   
    //   let user_id=0;
    let name=this.state.name
      let email=this.state.email
      let subject=this.state.subject
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
     if(email.length<=0){
        this.setState({errorno:3})
          return false;
        }
      else{
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) !== true){
          this.setState({errorno:4})
            return false;
        }
      }
      if(subject.length<=0){
            this.setState({errorno:5})
       return false
        }
        if(description.length<=0){
            this.setState({errorno:6})
       return false
        }
   if(this.state.isConnected===true)
      {
           this.setState({loading:true,})
            var url = config.baseURL+'contact_us.php'
            let data=new FormData()
            // data.append('user_id',user_id)
            data.append('email',email)
            data.append('name',name)
            data.append('subject',subject)
            data.append("user_type", 2);
            data.append('message',description)
          console.log('url',url)
          console.log('data',data)
          fetch(url,{
              method:'POST',
              headers: new Headers(config.headersapi), 
             body:data,
          }).then((obj)=>{  this.setState({loading:false,name:'',email:''});   return  obj.json();}).then((obj)=>{
              console.log('obj',obj)
              this.name.clear()
              this.email.clear()
              this.subject.clear()
              this.discription.clear()
                Keyboard.dismiss()
              if(obj.success=='true')
              {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                this.mailsendfunction(obj.mail_arr[0])
                
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
  mailsendfunction=(emailarr)=>{
    var email =emailarr.email;
     var mailcontent=emailarr.mail_content
     var mailsubject=emailarr.subject
     var  fromName=emailarr.fromName
     var url = config.baseURL+'mailFunctionsSend.php';
     var data = new FormData();
     data.append("email", email);
     data.append("mail_content", mailcontent);
     data.append("subject", mailsubject);
     data.append("fromName", fromName);
     data.append("user_type", 2);
      console.log('otp',data)
     fetch(url,{
        method: 'POST',
        headers: new Headers(config.headersapi), 
       body:data,
   }).then((obj)=> {
    this.setState({loading:false,});
           return obj.json();  
   }).then((obj)=> { 
     // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
    console.log('obj',obj)
   //  alert(JSON.stringify(obj))
     if(obj.success == 'true'){
      this.props.navigation.goBack();
        } else{
              
                msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
             return false;
       }
     }).catch((error)=> {
       console.log("-------- error ------- "+error);
         this.setState({loading: false});
   });
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:14,height:16}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*33/100,height:30}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Contact Us</Text>
             <Text style={{fontSize:14,paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}} numberOfLines={2}>Write details of your{"\n"}contact</Text>
             <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>Name</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Enter full name'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    ref={(ref)=>{this.name=ref}}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({name:txt})}}
                    maxLength={15}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={styles.errortextstyle}>Please enter full name</Text>
                   }

{this.state.errorno==2 && 
                    <Text style={styles.errortextstyle}>Please enter valid name</Text>
                   }
             <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>Email</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Enter email'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    returnKeyLabel='done'
                    ref={(ref)=>{this.email=ref}}
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({email:txt})}}
                    maxLength={50}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==3 && 
                    <Text style={styles.errortextstyle}>Please enter email</Text>
                   }
                   {this.state.errorno==4 && 
                    <Text style={styles.errortextstyle}>Please enter valid email</Text>
                   }
             <Text style={{color:'black',fontSize:14,paddingLeft:15,paddingTop:10}}>Subject</Text>
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Subject'
                    placeholderTextColor='gray'
                    keyboardType='default'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    ref={(ref)=>{this.subject=ref}}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({subject:txt})}}
                    maxLength={50}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==5 && 
                    <Text style={styles.errortextstyle}>Please enter subject</Text>
                   }

<Text style={{color:'black',fontSize:14,paddingLeft:15}}>Description</Text>
         <View style={{marginTop:7,}}>  
             <TextInput
                         style={styles.Textarea_Style}
                            placeholder={'Description'}
                            ref={(ref)=>{this.discription=ref}}
                             placeholderTextColor='gray'
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                         
                            returnKeyType="done"
                            returnKeyLabel="done"
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            maxLength={160}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(txt) => this.setState({description:txt})}
                         />
                         </View>
                      
                        {this.state.errorno==6 && 
                 <Text style={styles.errortextstyle}>Please enter description</Text>
                }
          
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'90%',}}>
       <TouchableOpacity  activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.contactusbtn()}}>
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