import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import Share from 'react-native-share'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Invitefriend extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             referral_code:'NA',
             sherapp1:'',
             isConnected:true,
            
            }
      
    }
    componentDidMount(){
     this.userdata1()
      this.Termsconditiondata()
         }
       Termsconditiondata= async ()=>{
        let userdata=await localStorage.getItemObject('user_arr')
         let user_id=userdata.user_id 
        if(this.state.isConnected===true)
                {
        var url = config.baseURL+'get_all_content.php?user_id='+user_id+'&user_type=1';
        console.log('url',url) 
        fetch(url,{ 
           method: 'GET',
           headers: {
               Accept:'application/json',
              'Content-Type': 'multipart/form-data',
          },
         
      }).then( (obj)=> {
          this.setState({loading:false});
              return obj.json();  
     }).then((obj)=> { 
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
          console.log(obj)
          if(obj.success == 'true'){
             let shereapp1=obj.content_arr[5].content;
           
             this.setState({loading:false,sherapp1:shereapp1})
            // this.setState({loading:false,Termsdata:obj.content_arr});
            //  localStorage.setItemObject('contantdata',obj.content_arr)
            } 
             else{
                 
                   msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
               return false;
          }
        }).catch((error)=> {
          console.log("-------- error ------- "+error);
          this.setState({loading: false});
      });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }   
         
         }
   userdata1=async()=>{
    let userdata=await localStorage.getItemObject('user_arr')
    console.log('userdata',userdata)
    if(userdata!=null)
    {
      this.setState({referral_code:userdata.referral_code})
    }
  }
  shereappbtn=()=>{
    // ImgToBase64.getBase64String(config.img_url+image)
    // .then(base64String =>{return base64String}).then((res)=>{
       //  console.log('res',res)
      //  // here's base64 encoded image
      console.log(this.state.sherapp1)
        let shareOptions = {
          title: 'Referral Code',
          subject: 'I’ve shared a link with you to a great new App',
         message:'Referral code for PLAZAROO app "'+this.state.referral_code+'"'+"\n"+this.state.sherapp1,
          url: this.state.sherapp,
          failOnCancel: false,
        };

        // title,
        // subject: title,
        // message: `${message} ${url}`,
        Share.open(shareOptions)
    // })
    // .catch(err => {console.log(err)});

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
 
        {/* //=----------------------header part---------=000------ */}
       {/* //=----------------------header part---------=000------ */}
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Invite Friend</Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30,flex:0.8,alignItems:'center',justifyContent:'center',alignContent:'center'}}>
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/invite.png')} style={{alignSelf:'center',resizeMode:'contain',width:200,height:200,}}/>
             </View>
<Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:20,paddingTop:20,textAlign:"center"}}>Invite Friends{"\n"}Get Coupons each!</Text>
<Text style={{color:'black',fontFamily:'Ubuntu-Medium',textAlign:'center',fontSize:13,alignSelf:'center',paddingTop:10,lineHeight:20}}>Save up to 15% on all tasks when you buy{"\n"}something form DealDelivery</Text>
        </View>  
       {/* ........................................Container finish............................... */}
     
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'95%',}}>
       <Text style={{fontFamily:'Ubuntu-Regular',fontSize:14,paddingLeft:20,paddingBottom:10,color:'gray',}}>Share your invite code</Text>
       <View style={{width:'90%',alignSelf:'center',borderRadius:6,paddingVertical:13,backgroundColor:Colors.lightgray}}>
<Text selectable={true}  style={{fontFamily:'Ubuntu-Medium',fontSize:14,paddingLeft:10}}>{this.state.referral_code}</Text>
       </View>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.state.sherapp1.length>0?this.shereappbtn():null}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Invite friends</Text>
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
   
    button:
    {
        marginBottom:13,
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:14,
        width:'90%',
    }
   
})