import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Keyboard,Alert,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Venderfooter from './Venderfooter'
import Loader from '../Loader';
import NetInfo from '@react-native-community/netinfo';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/Entypo'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Vendorpostdetaile extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          loading: false,
          fixed:true,
          nagoia:false,
          page:'inventary',
          price:'',
          location:'sunder nagar',
          isConnected:false,
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
          this.userrefersh()
         });
     }

 userrefersh=()=>{
   this.setState({loading:false})
   console.log('selleraddress',selleraddress)
 }

   publishdatabtn = async() => {
      let postdata=await localStorage.getItemObject('post_item_data')
        //-------------------- input validations -----------------

        if(this.state.price.length<=0)
        {
          this.setState({errorno:1})
          return false
        }
        if(selleraddress=='NA')
        {
          this.setState({errorno:2})
          return false
        }
        console.log('selleraddress',selleraddress)
    
       let price_type=0
         if(this.state.nagoia==true)
         {
           price_type=1
         }       
        if(this.state.isConnected===true)
      {
      this.setState({ loading: true,});
      let data=new FormData();
      data.append('user_id',postdata.user_id);
      data.append('user_type',2)
      data.append('order_type',postdata.order_type)
      data.append('category_id',postdata.category_id)
      data.append('subcategory_id',0)
      data.append('title',postdata.title)
      data.append('description',postdata.item_detail)
      data.append('price',this.state.price)
      data.append('location',selleraddress.address)
      data.append('price_type',price_type)
      data.append('latitude',selleraddress.latitude)
      data.append('longitude',selleraddress.longitude)
    for(let i=0; i<postdata.images.length; i++)
    {
      data.append('file[]', {
        uri: postdata.images[i].fileUri,
         type: 'image/jpg', // or photo.type
         name: 'image.jpg'
       });
    }
      var url = config.baseURL+'add_items.php'
       console.log("url:"+url);
       console.log('data',data)
        const {navigate} = this.props.navigation;
     fetch(url,{
           method: 'POST',
           headers: new Headers(config.headersapi), 
         body:data,
       }).then( (obj)=> {
        this.setState({loading:false});
          return obj.json();  
       }).then( (obj)=> { 
           console.log('obj',obj);
        //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
           if(obj.success == 'true'){
            localStorage.setItemObject('post_item_data',null)
            selleraddress='NA'
            this.props.navigation.navigate('Vendorinventary')
          
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Post an item</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.publishdatabtn()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
              <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>PUBLISH</Text>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:1.5,borderBottomColor:Colors.buttoncolor,width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
        <ScrollView>
        <View style={{paddingHorizontal:20,paddingTop:20}}>
             <Text style={{fontSize:14,fontFamily:'Ubuntu-Bold',color:'black',paddingBottom:20}}>Price</Text>
             <View style={styles.inputcontainer}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Price($)</Text> 
             <TextInput
                    placeholder='Enter price'
                    placeholderTextColor='gray'
                    keyboardType='number-pad'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({price:txt})}}
                    returnKeyType='done'
                    returnKeyLabel='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    maxLength={15}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                 <Text style={styles.errortextstyle}>Please enter price</Text>
                }
         <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
            <TouchableOpacity style={{paddingVertical:15,width:'35%',alignSelf:'center'}} onPress={()=>{this.setState({fixed:true,nagoia:false})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
              {this.state.fixed==false?  
               <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
               <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
              </View>
              :<View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
                </View>}
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Fixed</Text> 
               </View>
          </TouchableOpacity>
          <TouchableOpacity style={{paddingVertical:15,width:'40%',alignSelf:'center'}} onPress={()=>{this.setState({fixed:false,nagoia:true})}}> 
                 <View style={{width:'100%',flexDirection:'row',alignSelf:'center'}}>
                 {this.state.nagoia==false? <View style={{width:20,height:20,borderColor:'gray',marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                      <Text style={{width:10,height:10,borderRadius:50,textAlign:'center',}}></Text>
                </View>:
                <View style={{width:20,height:20,borderColor:Colors.buttoncolor,marginBottom:15,borderWidth:1,borderRadius:50,alignContent:'center',alignItems:'center',justifyContent:'center',alignSelf:'center'}}>
                <Text style={{width:10,height:10,borderRadius:50,backgroundColor:Colors.buttoncolor,textAlign:'center',}}></Text>
          </View>
                
                }
                <Text style={{fontSize:13,paddingLeft:10,paddingBottom:8,fontFamily:'Ubuntu-Medium',color:'black'}}>Negoiateable</Text> 
               </View>
          </TouchableOpacity>
          </View>
       
          <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Addaddressgoogle')}}>
         <View style={[styles.inputcontainer,{   marginTop:15,borderColor:Colors.inputborder, borderWidth:1.5,}]}>
            <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Location</Text> 
      
              <View style={{flexDirection:'row',paddingLeft:10,paddingVertical:7}}>
              <Icon2 name='location' size={10} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
              <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',alignSelf:'center',paddingLeft:10,color:'black'}}>{selleraddress!='NA'?selleraddress.address:'Add address'}</Text> 
                 
              </View>
        
        </View>
        </TouchableOpacity>
        {this.state.errorno==2 && 
                 <Text style={styles.errortextstyle}>Please enter add address</Text>
                }

          {/* <View style={styles.inputcontainer}>
        <Text style={{fontSize:13,paddingLeft:10,fontFamily:'Ubuntu-Regular',paddingTop:5,color:'gray'}}>Location</Text> 
             <TextInput
                    placeholder='Enter Postal Code Or Address'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Email:txt})}}
                    maxLength={50}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Please enter email</Text>
                   } */}
        
                  
        
        
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
      
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
    textfiledinput:{
      paddingVertical:5,
      color:'black',
      fontFamily:'Ubuntu-Medium',
      fontSize:14,
      paddingLeft:12,
    width:'100%'
    },
    errortextstyle:{
      color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',
      fontSize:13,textAlign:'center',paddingTop:4
    },
    inputcontainer:{
 
        backgroundColor:'#FFFFFF',
        // elevation:2,
        // shadowOffset:{width:2,height:2},
        borderColor:Colors.inputborder,
      borderWidth:1.5,
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:15,width:'100%'
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
        fontFamily:'Ubuntu-Medium',
         paddingLeft:10,
        paddingRight:50,
        fontSize:15,
        height:120,
        backgroundColor:'#FFFFFF',
        justifyContent: "flex-start",
        // elevation:8,
      
        borderRadius:8,
        
       
    },
   
})