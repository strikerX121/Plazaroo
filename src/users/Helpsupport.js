import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Keyboard,TextInput,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import UserFooter from './UserFooter'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon2 from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Helpsupport extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          isConnected:true,
           loading:false,
           faq_arr:[],
           faq_arr1:[]
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        this.gethelpcontent()
      }  
    
    gethelpcontent= async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
     let user_id=userdata.user_id
        if(this.state.isConnected===true)
         {
             this.setState({user_id:user_id,loading:true});
             var url = config.baseURL+'get_faq.php'
          let data=new FormData();
          data.append('user_id',user_id)
          data.append('user_type',1)
             console.log("url:"+url);
             console.log('data',data)
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
          this.setState({faq_arr:obj.faq_arr,faq_arr1:obj.faq_arr})    
         
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
        
       });
     }
       else{
        msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
          }   
         }
   
         SearchFilterFunction=(text)=> {
          //passing the inserted text in textinput
          let data1=this.state.faq_arr1
          const newData = data1.filter(function(item) {
            console.log(item)
            //applying filter for the inserted text in search bar
            const itemData = item.question ? item.question.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
              console.log('data',newData)
               this.setState({
                 faq_arr:newData,
                 search:text,
            });
        }
      //   clearsearchinput=()=>{
      //     if(this.state.post_code.length<=0)
      //     {
      //      msgProvider.alert(msgTitle.information[config.language], "Please enter postcode", false);
      //     return false
      //    }
      //    this.setState({searchloading:true})
      //     this.postcode.clear();
      //     Keyboard.dismiss();
      //     this.getlatlong()
      // }
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
         <TouchableOpacity style={{paddingVertical:15,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,textAlign:'center'}}>Support & FAQs</Text>
          </View>
          {/* <TouchableOpacity style={{paddingVertical:15,width:'25%',alignSelf:'center'}} onPress={()=>{this.props.navigation.navigate('Talkwithashelp')}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
              <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>Talk with us</Text>
             </View>
          </TouchableOpacity> */}
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:0.6,borderBottomColor:'#dbdbd9',width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
        <ScrollView>
        <View style={{paddingHorizontal:20,paddingTop:20}}>
              <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'black',paddingBottom:10,textAlign:'center'}}>Hello! How can we{"\n"}help you?</Text>
              <Text style={{fontSize:14,fontFamily:'Ubuntu-Regular',color:'gray',paddingBottom:20,textAlign:'center'}}>Nemo enim ipsam voluptatem{"\n"}quia voluptas sit</Text>
             <View style={styles.inputcontainer}>
             <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:14,height:14}}/>
             <TextInput
                   placeholder={'Search Category'}
                   placeholderTextColor='gray'
                   onFocus={()=>{this.setState({changeicon:true})}}
                   onChangeText={text => this.SearchFilterFunction(text)}
                   onClear={text => this.SearchFilterFunction('')}
                   value={this.state.search}
                   returnKeyLabel='done'
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   showCancel={true}
                   style={{width:'75%',alignSelf:'center',fontSize:15}}
              />
          </View>
          {this.state.errorno==1 && 
                    <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4,lineHeight:25}}>Please enter email</Text>
                   }
         <View style={{marginTop:10}}>
              <FlatList
               data={this.state.faq_arr}
               renderItem={({item,index})=>{
                 if(this.state.faq_arr!='NA')
                   {
                  return(
                    <View>
                    <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',paddingVertical:15,color:'black',paddingTop:25}}>{item.question}</Text>
                        {item.answer!='NA' &&
                          <View>
                             {item.answer.map((item1)=>{
                               return(
                                <View style={{flexDirection:'row'}}>
                                <Image source={require('../icons/pink-arrow.png')} style={{alignSelf:'center',width:15,height:10,borderRadius:6}}/>
                               <Text style={styles.textfont}>{item1}</Text>
                             </View>
                               )
                             })}
                          </View>
                        }
                        </View>
                    )
                  }
               }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
        
   </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
      
       {/* <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'95%',}}>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.props.navigation.navigate('VenderRecoverpassword')}}>
               <View style={{alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Apply</Text>
               </View>
            </TouchableOpacity>      
                      
             </View> */}
        
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
    inputcontainer:{
        flexDirection:'row',     
        backgroundColor:'#f0f5f7',
        elevation:2,
        shadowOffset:{width:2,height:2},
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
    textfont:{
        fontFamily:'Ubuntu-Regular',
        fontSize:13.5,
        color:'gray',
        paddingLeft:10,
        lineHeight:30,
        paddingLeft:15
    }
   
})