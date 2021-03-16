import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Linking,Alert,KeyboardAvoidingView,Modal,TextInput,FlatList,BackHandler, ScrollView,TouchableOpacity,Platform,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import UserFooter from './UserFooter'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import firebase from './Config1';
import Firebase from 'firebase';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/EvilIcons'
import { firebaseprovider}  from '../providers/FirebaseProvider';
import  {notification} from '../providers/NotificationProvider'
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const BannerHieght = Dimensions.get('window').height; 
const BannerWidth = Dimensions.get('window').width; 
global.userChatIdGlobal = '';
global.message_loation='NA'
global.messagedata=[]
const data=[
    {
      'message':'Hello. i want to know about cards',
      'userid':164,
      'messageType':'text',
       'time':'8:14 AM'
    },
    {
    'message':'can it be solved?',
      'userid':164,
      'messageType':'text',
      'time':'8:15 AM'
    },
    {
    'message':'it will be our pleasure to help you',
      'userid':165,
      'messageType':'text',
      'time':'1:24 PM'
    },
  
  ]
 const optionmsg=[
   {
     'name': 'is it available',
   },
   {
    'name': 'is the price negotiable?',
  },
  {
    'name':  'what is the lowest offer'
  },
   
    
   

 ]
export default class Messagedetaile extends Component{
  constructor(props){
    super(props)
     this.state={
          modalVisible:false,
          optionmsg:optionmsg,
          data1:[],
          user_id:'',
          chatmsg:'',
          data:this.props.navigation.getParam('data'),
          directionpage:this.props.navigation.getParam('directionpage'),
          name:'',
          message_type:'text',
         filePath:{},
         isVisible:false,
          modalVisible:false,
          fileData: '',
          fileUri: '',
          imgBlob:'',
          isConnected:true,
          loading:false,
          behavior: 'position',
          bottom:5,
     }
     OneSignal.init(config.onesignalappid, {
       kOSSettingsKeyAutoPrompt: true,
     });
 
     OneSignal.setLogLevel(6, 0);
     this.show_user_message_chat = this.show_user_message_chat.bind(this);
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
      this.addressbtnmsg()
     });
    this.getmessagedata()
   
   }
   addressbtnmsg=()=>{
    if(message_loation!='NA')
    {
      console.log('vikas solanki 123')
      this.setState({chatmsg:message_loation.address,message_type:'location'})
    }
    else{
      this.setState({message_type:'text'})
    }
     
   }

   getmessagedata=async()=>{
    var userdata= await localStorage.getItemObject('user_arr');
     console.log('getmessagedata')
    
      this.setState({user_id:userdata.user_id,})
    
     
      var data=this.state.data
      console.log('data',data)
      var other_user_id = data.other_user_id
      // var item_id = data.item_id;
      console.log('other_user_id',other_user_id);
      // console.log('item_id',item_id);
      console.log('firebaseprovider',FirebaseUserJson)
      var inbox_count = FirebaseUserJson.findIndex(x => x.user_id==other_user_id);
      console.log("chat name inbox count before",inbox_count);
      if (inbox_count >= 0) {
        console.log("chat name inbox count",inbox_count);
        var jsonData=FirebaseUserJson[inbox_count];
        console.log('jsonData',jsonData);
        if(jsonData.name != 'NA'){
          this.setState({name:jsonData.name})
          
          // if (userProvider.getMe().user_type == 'user') {
          //   $('#chat_name').attr("onclick","redirectChefProfile("+other_user_id+")");
          // }
        }else{
          this.setState({name:'Chat'})
        }
    
      }else{
        this.setState({name:'Chat'})
        }
       this.show_user_message_chat()
    }
     sendmessagebtn=async()=>{
      console.log('sendmessagebtn')
      let messageType=this.state.message_type;
      if(message_loation!='NA')
      {
         messageType='location';
         message_loation='NA'
      }
      else{
        messageType='text';
      }
    
      let  message=this.state.chatmsg
     
      console.log('message',message)
      this.chatmsg.clear();
      this.setState({chatmsg:''})
      if(message.length<=0)
      {
        alert('plese enter massege')
       return false
       }
       this.sendmessagecallbtn(messageType,message)
     }
     sendmessagecallbtn=async(messageType,message)=>{
       let userdata= await localStorage.getItemObject('user_arr')
     
       let data1=this.state.data
 //  jhkfhjkhsdk
 var user_id=userdata.user_id
 var other_user_id = data1.other_user_id
//  var item_id = data1.item_id;
 var chat_type = 'Item_chat';

 var user_id_send='u_'+user_id;
 var other_user_id_send='u_'+other_user_id;

 var inbox_id_me = 'u_'+other_user_id;
 var inbox_id_other = 'u_'+user_id;
 console.log('inbox_id',inbox_id_me)
 console.log('inbox_id_other',inbox_id_other)
 //---------------------- this code for create inbox in first time -----------
 console.log('FirebaseInboxJsonChck',FirebaseInboxJson);
 var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
 console.log('find_inbox_index chat',find_inbox_index);
 console.log('other_user_id chat',other_user_id);
 if(find_inbox_index == -1){

   var jsonUserDataMe={
     count: 0,
     lastMessageType: "",
     lastMsg: "",      
     user_id:other_user_id,
     typing_status:'no',
     block_status:'no',
     lastMsgTime : Firebase.database.ServerValue.TIMESTAMP,        
   };

   var jsonUserDataother={
     count: 0,
     lastMessageType: "",
     lastMsg: "",
     user_id:user_id,
     typing_status:'no',
     block_status:'no',
     lastMsgTime : Firebase.database.ServerValue.TIMESTAMP,
     
   };

   firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
   firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataother);
   console.log('FirebaseUserJson',FirebaseUserJson);
 }
  //---------------------- this code for create inbox in first time end -----------

 //---------------------- this code for send message to both -----------
 var messageIdME = 'u_'+user_id+'__u_'+other_user_id; 
 var messageIdOther = 'u_'+other_user_id+'__u_'+user_id;
 var senderId=user_id; 
 var  inputId='xyz'
 // var timestamp = new Date().getTime();
 var messageJson={
   message: message,
   messageType: messageType,
   senderId : senderId,
   timestamp : Firebase.database.ServerValue.TIMESTAMP
 }
 
this.chatmsg.clear();
 firebaseprovider.SendUserMessage(messageIdME, messageJson, messageType, inputId); 
 firebaseprovider.SendUserMessage(messageIdOther, messageJson, messageType, inputId);

 //---------------------- this code for send message to both end -----------

 
 //----------------update user inbox----------------------------
 var jsonUserDataMe={
   count: 0,
   lastMessageType: messageType,
   lastMsg: message,
   lastMsgTime : Firebase.database.ServerValue.TIMESTAMP
 };
 
 firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);

 var user_id_me=userdata.user_id
 var chat_room_id=other_user_id;
 this.chatRoomIdUpdate(user_id_me, chat_room_id);

 //------------------------- get other user inbox -------------------

 console.log('other_user_id_send',other_user_id_send);
 console.log('user_id_send',user_id_send);
 var count_new=0;
 var query = firebase.database().ref('users/'+other_user_id_send+'/myInbox/'+inbox_id_other);
 query.once('value',(data)=> {      
   console.log("chat_data",data.toJSON());
   // console.log('user inbox data',data.val().count);
    var count_old=data.val()==null?0:data.val().count;
    console.log('count_old_check',count_old);
    count_new = parseInt(count_old)+1;
 
   var jsonUserDataOther={
     count: count_new,
     lastMessageType: messageType,
     lastMsg: message,        
     lastMsgTime : Firebase.database.ServerValue.TIMESTAMP
   };
   // alert("dddd");      
    console.log('jsonUserDataOther',jsonUserDataOther);
    firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataOther); 
     })
      //---------------------- send message notifications ----------------
var title='Plazaroo';
var message_send=message;
var SenderName=userdata.name;
if(messageType == 'text' ){
  message_send=SenderName+' says: '+message_send;

}else if(messageType=='location')
{
  message_send=SenderName+' share location '+message_send;
}
else{
  message_send=SenderName+' sent: '+messageType;
}

var other_user_id = chat_room_id;
console.log('other_user_id_noti',other_user_id);
var message_noti=message_send;
var action_json={
 user_id:user_id_me,
 other_user_id:other_user_id,
 chat_type:chat_type,
 action_id :0,
 action:'chat_single',
 // action_id : user_id_me,
 SenderName:SenderName,
};
// alert(user_id_me);  
this.sendNotificationSignle(title, message_noti, action_json, other_user_id);
//---------------------- send message notifications end----------------
     
   } 
   sendNotificationSignle=async(title, message, action_json, user_id_member)=>{
    let userdata= await localStorage.getItemObject('user_arr')
    console.log('sendNotificationSignle action_json',action_json);
    console.log('sendNotificationSignle message',message);
    console.log('sendNotificationSignle user_id_member',user_id_member);
  
    console.log('update delete_flag',user_id_member);
    console.log("sendNotificationSignle FirebaseUserJson",FirebaseUserJson);
    var user_check_inbox = FirebaseUserJson.findIndex(x => x.user_id==user_id_member);
    console.log("user_check_inbox subuser",user_check_inbox);   
    if(user_check_inbox >=0){
      console.log('FirebaseUserJson subuser',FirebaseUserJson[user_check_inbox]);
      var player_id_get=FirebaseUserJson[user_check_inbox].player_id;
      var chat_room_id_get=FirebaseUserJson[user_check_inbox].chat_room_id;
      var notification_status=FirebaseUserJson[user_check_inbox].notification_status;
  
      console.log('chat_room_id_get',chat_room_id_get+'//'+chat_room_id_get);
      console.log('player_id_get',user_id_member+'//'+player_id_get);
      console.log('notification_status',notification_status);
      
      if(notification_status == 1){
        var user_id_me=userdata.user_id;  
        console.log('chat_room_id_get',chat_room_id_get+'!='+user_id_me);
        // if(chat_room_id_get != user_id_me){
          if(player_id_get != 'no' && player_id_get != '123456'){
            var player_id_arr=[];
            player_id_arr.push(player_id_get);
            console.log('player_id_arr',player_id_arr);
           
            if(player_id_arr.length>0){
              console.log('vikas slonakfsdsend notihd');
              notification.notificationfunction(message,action_json,player_id_get,title);
            }
          // }
        }
      }
    }
  }
  chatRoomIdUpdate=(user_id, other_user_id)=>{
    console.log('chatRoomIdUpdate user_id',user_id);
    console.log('chatRoomIdUpdate other_user_id',other_user_id);
    var id='u_'+user_id;
    var jsonUserDataMe={
        chat_room_id : other_user_id,
    };
    firebaseprovider.CreateUser(id, jsonUserDataMe);
  }
    myInboxCountZeroChat=()=>{
    console.log('myInboxCountZeroChat');
    var data=this.state.data
    var user_id=this.state.user_id
    var other_user_id = data.other_user_id
      var user_id_send='u_'+user_id;
    var other_user_id_send='u_'+other_user_id;
  
    var jsonUserDataOther={
      count: 0,
      user_id: other_user_id,
    };
    firebaseprovider.UpdateUserInboxOther(user_id_send, other_user_id_send, jsonUserDataOther);
    }
  
    show_user_message_chat=()=>{
    //  var messagedata=[]
    var other_user_id = this.state.data.other_user_id
    var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
     console.log('find_inbox_index chatshow_user_message_chat',find_inbox_index);
      console.log('other_user_id chatshow_user_message_chat',other_user_id);
     if(find_inbox_index >=0){
       console.log('inboxfinguser')
        this.myInboxCountZeroChat()
      }
   
      console.log('show_user_message');
  
      // var userdata= await localStorage.getItemObject('user_arr');
      var data=this.state.data
      var user_id=this.state.user_id
      var other_user_id = data.other_user_id
      // var item_id = data.item_id;
      var chat_type = 'Item_chat';

      var userChatId='u_'+user_id+'__u_'+other_user_id
      if(userChatIdGlobal == '')
        {
           userChatIdGlobal=userChatId;
         }
      console.log('userChatIdGlobal',userChatIdGlobal);
      var queryOff = firebase.database().ref('message/').child(userChatIdGlobal);
      queryOff.off('child_added');
      queryOff.off('child_changed');
      // alert('userChatId======'+userChatId);
        var image_index_me =0;
        var image_index_other =0;
        userChatIdGlobal = userChatId;
        var query = firebase.database().ref('message/'+userChatId).orderByChild("timestamp");
        query.on('child_added',(data)=> {
        console.log('message child_added chat all data',data.toJSON());
        // LoadingEnd();
        
        var msgKey=data.key;
        var message=data.val().message;
        var messageType=data.val().messageType;
        var senderId=data.val().senderId;
        var timestamp=data.val().timestamp;
        var lastMsgTime=firebaseprovider.convertTimeAllFormat(timestamp,'date_time_full');
        var messageDataShow = '';   
         console.log('senderId',senderId);
        console.log('user_id',user_id); 
     
      if(senderId == user_id){
        console.log('senderId',senderId);     
  
        if(messageType == 'text'){
         
          var messageJson={
            'name': message,
            'userid':senderId,
            'messageType':messageType,
            'time':lastMsgTime
          }
          console.log('messageJoson',messageJson)
          let data6=this.state.data1
          data6.push(messageJson)
          this.setState({data1:data6})
         }else if(messageType == 'location'){
          var messageJson={
            'name': message,
            'userid':senderId,
            'messageType':messageType,
            'time':lastMsgTime
          }
          console.log('messageJoson',messageJson)
          let data6=this.state.data1
          data6.push(messageJson)
          this.setState({data1:data6})
         }
         else if(messageType == 'image'){
          var messageJson={
            'name': message,
            'userid':senderId,
            'messageType':messageType,
            'time':lastMsgTime
          }
          console.log('messageJoson',messageJson)
          let data6=this.state.data1
          data6.push(messageJson)
          this.setState({data1:data6})
       
        }
      }else{
       if(messageType == 'text'){
            var messageJson={
              'name': message,
              'userid':senderId,
              'messageType':messageType,
              'time':lastMsgTime
            }
             console.log('messageJson',messageJson)
             let data6=this.state.data1
             data6.push(messageJson)
             this.setState({data1:data6})
             
          }
          else if(messageType == 'location'){
            var messageJson={
              'name': message,
              'userid':senderId,
              'messageType':messageType,
              'time':lastMsgTime
            }
             console.log('messageJson',messageJson)
             let data6=this.state.data1
             data6.push(messageJson)
             this.setState({data1:data6})
           }
          else if(messageType == 'image'){
            var messageJson={
              'name': message,
              'userid':senderId,
              'messageType':messageType,
              'time':lastMsgTime
            }
            console.log('messageJoson',messageJson)
            let data6=this.state.data1
            data6.push(messageJson)
            this.setState({data1:data6})
           
          }
        }   
       console.log('this.state.data1',this.state.data1)
      });
     
      // for(let i=0; i<messagedata.length; i++)
      // {
      //   messagedata[i]=messagedata[(messagedata.length-1)-i];
      // }
    
    console.log('enndshowfunction')
    }
    senduserreport=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      console.log('userdata',userdata)
      let user_id=userdata.user_id 
      let data=this.state.data
      var other_user_id = data.other_user_id
      var url = config.baseURL+'chat_report_submit.php?user_id='+user_id+'&other_user_id='+other_user_id+'&user_type=1'+'&report_type=chat';
      console.log('url',url)
      this.setState({loading:true,})
      fetch(url,{
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': 0,
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
         }).then((obj)=> {
          this.setState({loading:false});
              return obj.json();  
    }).then((obj) =>{ 
        console.log('obj',obj);
   
       if(obj.success == 'true'){
                        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                  } 
           else{
            if(obj.account_active_status=="deactivate")
            {
               this.props.navigation.navigate('Logout')
            }
              msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
             return false;}
        }).catch((error) =>{
          this.setState({loading:false});
          msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
       })
      }
      clearchatbtn=()=>{
        Alert.alert(
          'Are you sure you want to clear chat ?',  // message
         '',
          [
           {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => {this.ClearChatConfirm()}, style:'destructive'},
          ],
          { cancelable: false }
        )
    }
 ClearChatConfirm=async()=>{
   let userdata=await localStorage.getItemObject('user_arr')
   console.log('userdata',userdata)
     let data=this.state.data
      var user_id=userdata.user_id
      var other_user_id = data.other_user_id
      // var item_id = data.item_id;
      var chat_type = 'Item_chat';
      
      var messageIdME = 'u_'+user_id+'__u_'+other_user_id;
      var id = 'u_'+user_id;
      var otherid = 'u_'+other_user_id;
    let  jsonUsesadsssfrData = {};
     
        firebase.database().ref().child('message' + '/' + messageIdME+'/').remove();
        // messagedata=[] 
        this.setState({data1:[],modalVisible:false}) 
      let jsonUserData = {};
      
      
      var jsonUserDataMe={
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        lastMsgTime: "",
        user_id:other_user_id,
      };
        var user_id_send='u_'+user_id;
        var other_user_id_send='u_'+other_user_id;
        var inbox_id_me ='u_'+other_user_id;
        
        firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
      // getMyInboxAllData();
    
    }

    Pickerimagebtn=()=>{
      ImagePicker.openPicker({
         // width: 800,
           // height: 800,
           cropping: true,
           // cropperCircleOverlay: true,
           sortOrder:'none',
          // compressImageMaxWidth: 1000,
          // compressImageMaxHeight: 1000,
            cropperToolbarTitle:'Zoom',
          compressImageQuality: 0.5,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
        includeBase64:true,
        cropperStatusBarColor: 'white',
        cropperToolbarColor: 'white',
        cropperActiveWidgetColor: 'white',
        cropperToolbarWidgetColor: '#3498DB',
      }).then(response => {
        console.log(response);
       
                
                    this.setState({
                      filePath: response,
                       fileData: response.data,
                        fileUri: response.path,
                        imagedata:true,
                        errorno:0,
                        camraon:true,
                       
                })
                let user_id=this.state.user_id
                console.log('this.state.fileUri',response.uri)
                 var url = config.baseURL+'chat_file_upload.php';
                 var data2 = new FormData();
               
                  data2.append('user_id',user_id)
                  data2.append('file_type','image')
                  data2.append('file', {
                   uri: response.path,
                   type: 'image/jpg', // or photo.type
                   name: 'image.jpg'
                 });
                  console.log('url',url)
                  console.log('data',data2)
                 // this.setState({loading:true,})
            fetch(url,{
                   method: 'POST',
                   headers: {
                     "Content-Type": "multipart/form-data"
                 },
               body:data2,
           }).then((obj)=> {
             this.setState({loading:false})
                  return obj.json();  
               }).then((obj)=> { 
                    console.log('obj',obj);
                      if(obj.success == 'true'){
                       this.setState({bottom:0})
                         this.sendmessagecallbtn('image',obj.file)
                       } 
                      else{
                       // this.setState({loading:false});
                         msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                        return false;}
                   }).catch((error) =>{
                     console.log('error',error)
                     msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
                  })
                
              
                
      }).catch(e => {
        console.log('eror',e)
      });
     }
    Cameraimagebtn=()=>{
      ImagePicker.openCamera({
          // width: 800,
           // height: 800,
           cropping: true,
           // cropperCircleOverlay: true,
           sortOrder:'none',
          // compressImageMaxWidth: 1000,
          // compressImageMaxHeight: 1000,
            cropperToolbarTitle:'Zoom',
          compressImageQuality: 0.5,
        compressVideoPreset: 'MediumQuality',
        includeExif: true,
        includeBase64:true,
        cropperStatusBarColor: 'white',
        cropperToolbarColor: 'white',
        cropperActiveWidgetColor: 'white',
        cropperToolbarWidgetColor: '#3498DB',
      }).then(response => {
        console.log(response);
       
                    this.setState({
                      filePath: response,
                       fileData: response.data,
                        fileUri: response.path,
                        imagedata:true,
                        errorno:0,
                        camraon:true,
                       
                });
                let user_id=this.state.user_id
                console.log('this.state.fileUri',response.uri)
                 var url = config.baseURL+'chat_file_upload.php';
                 var data2 = new FormData();
               
                  data2.append('user_id',user_id)
                  data2.append('file_type','image')
                  data2.append('file', {
                   uri: response.path,
                   type: 'image/jpg', // or photo.type
                   name: 'image.jpg'
                 });
                  console.log('url',url)
                  console.log('data',data2)
                 // this.setState({loading:true,})
            fetch(url,{
                   method: 'POST',
                   headers: {
                     "Content-Type": "multipart/form-data"
                 },
               body:data2,
           }).then((obj)=> {
             this.setState({loading:false})
                  return obj.json();  
               }).then((obj)=> { 
                    console.log('obj',obj);
                      if(obj.success == 'true'){
                       this.setState({bottom:0})
                         this.sendmessagecallbtn('image',obj.file)
                       } 
                      else{
                       // this.setState({loading:false});
                         msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                        return false;}
                   }).catch((error) =>{
                     console.log('error',error)
                     msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
                  })
      }).catch(e => {
        console.log('eror',e)
      });
     }
    render(){
        console.log('cikasd')
        if(Platform.OS === 'ios')
        {
return(
 
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
   <View style={styles.container}>
          <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
         <Modal
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
          this.setState({isVisible:false})
            }}>
                   <TouchableOpacity onPress={()=>{this.setState({isVisible:false})}} activeOpacity={1} style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#00000040',opacity:1,}}>
                  <View style={{height:'auto',paddingHorizontal:25,width:BannerWidth*80/100,borderRadius:3,alignSelf:'center',backgroundColor:'#FFFFFF',}}>
                    {/* <View style={{paddingHorizontal:25,,borderRadius:5,backgroundColor:'#e3e3e3'}}> */}
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Ubuntu-Bold',fontSize:22}}>Select a options</Text>
                       <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Cameraimagebtn()}} >
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Take Photo..</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Pickerimagebtn()}}>
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Choose form Libary..</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.props.navigation.navigate('Addaddressgoogle',{'messagepage':'message'})}}>
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Shere your location..</Text>
                                  </TouchableOpacity>
                          <View style={{width:'100%',alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',marginTop:35,marginBottom:15,alignItems:'flex-end'}}>
                                
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.props.navigation.navigate('Home')}} >
                                    <Text style={{color:'black',fontSize:17,fontFamily:'Ubuntu-Medium',letterSpacing:0.8}}>CANCEL</Text>
                                  </TouchableOpacity>
                             </View>


                            
                    </View>

                 
                 </TouchableOpacity>
         </Modal>
         <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setState({modalVisible:false})}}
        >
          <TouchableOpacity 
             style={{flex:1}}
            activeOpacity={1} 
            onPressOut={() => {this.setState({modalVisible:false})}}
          >
          <View  style={{backgroundColor:'#f5f4f2',height:'auto',position:'absolute',bottom:0,left:0,right:0}}> 
            <View style={{paddingTop:15,paddingHorizontal:20}}>
                <TouchableOpacity  onPress={()=>{this.clearchatbtn()}}>
                     <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Clear Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingVertical:16}} onPress={()=>{this.senduserreport()}}>
                     <Text style={{color:'black',fontSize:15,fontFamily:'Ubuntu-Medium'}}>Report User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingBottom:15}} onPress={()=>{this.setState({modalVisible:false})}}>
                     <Text style={{color:'red',fontSize:15,fontFamily:'Ubuntu-Medium'}}>Cancel</Text>
                </TouchableOpacity>
           </View>   
            
          </View>
          
          </TouchableOpacity>   
        </Modal>
           {/* //=----------------------header part---------=000------ */}
           
          <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingHorizontal:10,paddingVertical:14,}}>
           <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.myInboxCountZeroChat(); this.props.navigation.goBack()}}> 
              <View style={{width:'100%',alignSelf:'center'}}>
                   <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:13,height:14}}/>
               </View>
            </TouchableOpacity>
            <View style={{width:'70%',alignSelf:'center'}}> 
  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,textAlign:'center'}}>{this.state.data.name}</Text>
            </View>
            <TouchableOpacity onPress={()=>{this.setState({modalVisible:true})}} style={{width:'15%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center',}}>
            <Image source={require('../icons/dots.png')} style={{alignSelf:'center',width:5,height:24,resizeMode:'contain'}}/>
               </View>
            </TouchableOpacity>
                  
          </View>
          <View style={{paddingBottom:180,width:'95%',paddingTop:10}}>
   <FlatList
              data={this.state.data1}
              showsVerticalScrollIndicator={false}
              ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
              onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
              contentContainerStyle={{marginBottom:100}}
               keyboardDismissMode='interactive'
              keyboardShouldPersistTaps='always' 
               renderItem={({item,index})=>{
                 return(
                     <View style={{width:'95%',alignSelf:'center',paddingVertical:6}}>
                      {item.userid!=this.state.user_id &&<View style={{alignSelf:'flex-start',width:'70%'}}>
                        <View style={{backgroundColor:'#f5f5f5',padding:6,alignSelf:'flex-start',borderTopStartRadius:8,borderBottomLeftRadius:8,borderTopRightRadius:8}}>
                             {item.messageType=='text' && <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'black'}}>{item.name}</Text>}
                             {item.messageType=='location' &&
                             <View style={{flexDirection:'row'}}>
                               <Icon name='location' size={22} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                               {/* <Image source={require('../icons/address1.png')} style={{width:21,height:21,alignSelf:'center'}}/>   */}
                             <Text style={{fontSize:14, color:'black',fontFamily:'Ubuntu-Medium',paddingRight:7}}  onPress={()=>{Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+item.name)}}>{item.name}</Text>
                             </View>}
                             {item.messageType=='image' && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Fullviewimage',{'images':item.name,'type':'type'})}}>
                              <Image source={{uri:config.img_url2+item.name}} style={{width:BannerWidth*62/100,height:BannerHieght*47/100,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
                              </TouchableOpacity>}
                              
                            </View>
                            <Text style={{fontSize:14,fontFamily:'Ubuntu-Regular',color:'gray'}}>{item.time}</Text>
                        </View>}
                        {item.userid==this.state.user_id && <View style={{width:'70%',alignSelf:'flex-end',}}>
                            <View style={{backgroundColor:Colors.buttoncolor,borderTopStartRadius:8,borderBottomLeftRadius:8,borderTopRightRadius:8,padding:6,alignSelf:'flex-end'}}>
                            {item.messageType=='text' && <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'#FFFFFF',}}>{item.name}</Text>}
                            {item.messageType=='location' &&
                             <View style={{flexDirection:'row'}}>
                                                             <Icon name='location' size={22} color='#FFFFFF' style={{alignSelf:'center'}}/>
                                <Text style={{fontSize:14, color:'#FFFFFF',fontFamily:'Ubuntu-Medium',paddingRight:7}}   onPress={()=>{Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+item.name)}}>{item.name}</Text>
                                </View>}
                             {item.messageType=='image' && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Fullviewimage',{'images':item.name,'type':'type'})}}>
                              <Image source={{uri:config.img_url2+item.name}} style={{width:BannerWidth*62/100,height:BannerHieght*47/100,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
                              </TouchableOpacity>}
                              
                            </View>
                            <Text style={{fontSize:14,alignSelf:'flex-end',fontFamily:'Ubuntu-Regular',color:'gray'}}>{item.time}</Text>
                           
                        </View>}
                     </View>
                 )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             
   </View>



          
    
         {/* ........................................Container finish............................... */}
        
        
         <View style={{position:"absolute",bottom:this.state.bottom==0?0:43,alignSelf:'center',width:'95%'}}>
         {this.state.directionpage!='seller' &&  <View style={{flexDirection:'row',width:'100%',alignSelf:'center',paddingTop:30}}>
             <FlatList
              data={this.state.optionmsg}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item,index})=>{
                return(
                  <TouchableOpacity onPress={()=>{this.setState({chatmsg:item.name,bottom:0})}}>
                  <View style={{backgroundColor:Colors.buttoncolor,borderRadius:15,padding:5,paddingHorizontal:8,marginLeft:5}}>
                     <Text style={{color:'#FFFFFF',alignSelf:'center',fontSize:11,fontFamily:'Ubuntu-Regular'}}>{item.name}</Text>
                  </View>
                  </TouchableOpacity>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
               />
             
              
               {/* <TouchableOpacity>
               <View style={{backgroundColor:Colors.buttoncolor,borderRadius:15,padding:5,paddingHorizontal:8,marginLeft:5}}>
                     <Text style={{color:'#FFFFFF',alignSelf:'center',fontSize:11,fontFamily:'Ubuntu-Regular'}}>is the price negatiable?</Text>
                 </View>
               </TouchableOpacity>
               <TouchableOpacity>
               <View style={{backgroundColor:Colors.buttoncolor,borderRadius:15,padding:5,paddingHorizontal:8,marginLeft:5}}>
                     <Text style={{color:'#FFFFFF',alignSelf:'center',fontSize:11,fontFamily:'Ubuntu-Regular'}}>what is the lowest offer</Text>
                 </View>
               </TouchableOpacity> */}
             </View>}
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',borderTopColor:'#ededed',borderTopWidth:2,paddingVertical:10}}>
              <View style={[styles.inputcontainer,this.state.chatmsg.length<=0?{width:'98%'}:{width:'83%'}]}>
                <TouchableOpacity style={{alignSelf:'center',width:15.8,height:15,paddingRight:10}} onPress={()=>{this.setState({isVisible:true})}}>
               <Image source={require('../icons/Add.jpg')} style={{alignSelf:'center',width:18,borderRadius:6,height:18}}/>
               </TouchableOpacity>
                  <TextInput
                  placeholder='Type Message'
                  placeholderTextColor='gray'
                 ref={(input) => { this.chatmsg = input; }}
                onChangeText={(txt)=>{this.setState({chatmsg:txt})}} 
               keyboardType="default"
               onFocus={()=>{this.setState({Numberbtn:1,bottom:43});}}
               blurOnSubmit={true}
                // scrollEnabled={true}
                onSubmitEditing={()=>{this.setState({bottom:0})}}
                value={this.state.chatmsg}
                style={{width:'100%'}}
                    
                     />
            </View> 
            {this.state.chatmsg.length>0 &&  <TouchableOpacity style={{width:'13%',alignItems:'center',justifyContent:'center'}} onPress={()=>{this.sendmessagebtn()}}>
            <View style={{width:'100%',backgroundColor:Colors.buttoncolor,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('../icons/send.png')} style={{alignSelf:'center',width:50,height:50}}/>
               </View>
               </TouchableOpacity>  }
              </View>   
             
               </View>
          
      </View>
    
         
    </KeyboardAvoidingView>
       
    )
   }
   else{
    return(
 
      
      <View style={styles.container}>
          <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
         <Modal
            animationType = {"slide"}
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
          this.setState({isVisible:false})
            }}>
                   <TouchableOpacity onPress={()=>{this.setState({isVisible:false})}} activeOpacity={1} style={{flex:1,alignContent:'center',alignItems:'center',justifyContent:'center',backgroundColor:'#00000040',opacity:1,}}>
                  <View style={{height:'auto',paddingHorizontal:25,width:BannerWidth*80/100,borderRadius:3,alignSelf:'center',backgroundColor:'#FFFFFF',}}>
                    {/* <View style={{paddingHorizontal:25,,borderRadius:5,backgroundColor:'#e3e3e3'}}> */}
                       <Text style={{color:'black',paddingTop:20,fontFamily:'Ubuntu-Bold',fontSize:22}}>Select  a options</Text>
                       <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Cameraimagebtn()}} >
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:13,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Take Photo..</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.Pickerimagebtn()}}>
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Choose form Libary..</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.props.navigation.navigate('Addaddressgoogle',{'messagepage':'message'})}}>
                                    <Text style={{color:Colors.headercolor,fontSize:17,fontFamily:'Ubuntu-Medium',paddingTop:16,letterSpacing:0.8,textAlign:'left',alignSelf:'flex-start'}}>Shere your location..</Text>
                                  </TouchableOpacity>
                          <View style={{width:'100%',alignSelf:'flex-end',flexDirection:'row',justifyContent:'flex-end',marginTop:35,marginBottom:15,alignItems:'flex-end'}}>
                                
                                  <TouchableOpacity onPress={()=>{this.setState({isVisible:false});this.props.navigation.navigate('Home')}} >
                                    <Text style={{color:'black',fontSize:17,fontFamily:'Ubuntu-Medium',letterSpacing:0.8}}>CANCEL</Text>
                                  </TouchableOpacity>
                             </View>


                            
                    </View>

                 
                 </TouchableOpacity>
         </Modal>
         <Modal 
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setState({modalVisible:false})}}
        >
          <TouchableOpacity 
             style={{flex:1}}
            activeOpacity={1} 
            onPressOut={() => {this.setState({modalVisible:false})}}
          >
          <View  style={{backgroundColor:'#f5f4f2',height:'auto',position:'absolute',bottom:0,left:0,right:0}}> 
            <View style={{paddingTop:15,paddingHorizontal:20}}>
                <TouchableOpacity  onPress={()=>{this.clearchatbtn()}}>
                     <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Clear Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingVertical:16}} onPress={()=>{this.senduserreport()}}>
                     <Text style={{color:'black',fontSize:15,fontFamily:'Ubuntu-Medium'}}>Report User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingBottom:15}} onPress={()=>{this.setState({modalVisible:false})}}>
                     <Text style={{color:'red',fontSize:15,fontFamily:'Ubuntu-Medium'}}>Cancel</Text>
                </TouchableOpacity>
           </View>   
            
          </View>
          
          </TouchableOpacity>   
        </Modal>
           {/* //=----------------------header part---------=000------ */}
           
          <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingHorizontal:10,paddingVertical:14,}}>
           <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.myInboxCountZeroChat();this.props.navigation.goBack()}}> 
              <View style={{width:'100%',alignSelf:'center'}}>
                   <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:13,height:14}}/>
               </View>
            </TouchableOpacity>
            <View style={{width:'70%',alignSelf:'center'}}> 
  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,textAlign:'center'}}>{this.state.data.name}</Text>
            </View>
            <TouchableOpacity onPress={()=>{this.setState({modalVisible:true})}} style={{width:'15%',alignSelf:'center'}}> 
            <View style={{width:'100%',alignSelf:'center',}}>
            <Image source={require('../icons/dots.png')} style={{alignSelf:'center',width:5,height:24,resizeMode:'contain'}}/>
               </View>
            </TouchableOpacity>
                  
          </View>
   <View style={{paddingBottom:180,width:'95%',paddingTop:10}}>
   <FlatList
              data={this.state.data1}
              showsVerticalScrollIndicator={false}
              ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
              onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
              contentContainerStyle={{marginBottom:100}}
               keyboardDismissMode='interactive'
              keyboardShouldPersistTaps='always' 
               renderItem={({item,index})=>{
                 return(
                     <View style={{width:'95%',alignSelf:'center',paddingVertical:6}}>
                      {item.userid!=this.state.user_id &&<View style={{alignSelf:'flex-start',width:'70%'}}>
                        <View style={{backgroundColor:'#f5f5f5',padding:6,alignSelf:'flex-start',borderTopStartRadius:8,borderBottomLeftRadius:8,borderTopRightRadius:8}}>
                             {item.messageType=='text' && <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'black'}}>{item.name}</Text>}
                             {item.messageType=='location' &&
                             <View style={{flexDirection:'row'}}>
                               <Icon name='location' size={22} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                               {/* <Image source={require('../icons/address1.png')} style={{width:21,height:21,alignSelf:'center'}}/>   */}
                             <Text style={{fontSize:14, color:'black',fontFamily:'Ubuntu-Medium',paddingRight:7}}  onPress={()=>{Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+item.name)}}>{item.name}</Text>
                             </View>}
                             {item.messageType=='image' && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Fullviewimage',{'images':item.name,'type':'type'})}}>
                              <Image source={{uri:config.img_url2+item.name}} style={{width:BannerWidth*62/100,height:BannerHieght*47/100,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
                              </TouchableOpacity>}
                              
                            </View>
                            <Text style={{fontSize:14,fontFamily:'Ubuntu-Regular',color:'gray'}}>{item.time}</Text>
                        </View>}
                        {item.userid==this.state.user_id && <View style={{width:'70%',alignSelf:'flex-end',}}>
                            <View style={{backgroundColor:Colors.buttoncolor,borderTopStartRadius:8,borderBottomLeftRadius:8,borderTopRightRadius:8,padding:6,alignSelf:'flex-end'}}>
                            {item.messageType=='text' && <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'#FFFFFF',}}>{item.name}</Text>}
                            {item.messageType=='location' &&
                             <View style={{flexDirection:'row'}}>
                                                             <Icon name='location' size={22} color='#FFFFFF' style={{alignSelf:'center'}}/>
                                <Text style={{fontSize:14, color:'#FFFFFF',fontFamily:'Ubuntu-Medium',paddingRight:7}}   onPress={()=>{Linking.openURL('https://www.google.com/maps/dir/?api=1&origin='+item.name)}}>{item.name}</Text>
                                </View>}
                             {item.messageType=='image' && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Fullviewimage',{'images':item.name,'type':'type'})}}>
                              <Image source={{uri:config.img_url2+item.name}} style={{width:BannerWidth*62/100,height:BannerHieght*47/100,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
                              </TouchableOpacity>}
                              
                            </View>
                            <Text style={{fontSize:14,alignSelf:'flex-end',fontFamily:'Ubuntu-Regular',color:'gray'}}>{item.time}</Text>
                           
                        </View>}
                     </View>
                 )
               }}
               keyExtractor={(item, index) => index.toString()}
              />
             
   </View>


          
    
         {/* ........................................Container finish............................... */}
        
        
         <View style={{position:"absolute",bottom:Platform.OS === 'ios'?this.state.bottom:0,alignSelf:'center',width:'95%',}}>
          {this.state.directionpage!='seller' && <View style={{flexDirection:'row',width:'100%',alignSelf:'center',paddingTop:30,}}>
             <FlatList
              data={this.state.optionmsg}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item,index})=>{
                return(
                  <TouchableOpacity onPress={()=>{this.setState({chatmsg:item.name})}}>
                  <View style={{backgroundColor:Colors.buttoncolor,borderRadius:15,padding:5,paddingHorizontal:8,marginLeft:5}}>
                     <Text style={{color:'#FFFFFF',alignSelf:'center',fontSize:11,fontFamily:'Ubuntu-Regular'}}>{item.name}</Text>
                  </View>
                  </TouchableOpacity>
                  )
                }}
                  keyExtractor={(item, index) => index.toString()}
               />
             
              
               {/* <TouchableOpacity>
               <View style={{backgroundColor:Colors.buttoncolor,borderRadius:15,padding:5,paddingHorizontal:8,marginLeft:5}}>
                     <Text style={{color:'#FFFFFF',alignSelf:'center',fontSize:11,fontFamily:'Ubuntu-Regular'}}>is the price negatiable?</Text>
                 </View>
               </TouchableOpacity>
               <TouchableOpacity>
               <View style={{backgroundColor:Colors.buttoncolor,borderRadius:15,padding:5,paddingHorizontal:8,marginLeft:5}}>
                     <Text style={{color:'#FFFFFF',alignSelf:'center',fontSize:11,fontFamily:'Ubuntu-Regular'}}>what is the lowest offer</Text>
                 </View>
               </TouchableOpacity> */}
             </View>}
              <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',borderTopColor:'#ededed',borderTopWidth:2,paddingVertical:10}}>
              <View style={[styles.inputcontainer,this.state.chatmsg.length<=0?{width:'98%'}:{width:'83%'}]}>
                <TouchableOpacity style={{alignSelf:'center',width:15.8,height:15,paddingRight:10}} onPress={()=>{this.setState({isVisible:true})}}>
               <Image source={require('../icons/Add.jpg')} style={{alignSelf:'center',width:18,height:18,borderRadius:6}}/>
               </TouchableOpacity>
                  <TextInput
                  placeholder='Type Message'
                  placeholderTextColor='gray'
                 ref={(input) => { this.chatmsg = input; }}
                onChangeText={(txt)=>{this.setState({chatmsg:txt})}} 
               keyboardType="default"
               onFocus={()=>{this.setState({Numberbtn:1,bottom:43});}}
               blurOnSubmit={true}
                scrollEnabled={true}
                onSubmitEditing={()=>{this.setState({bottom:0})}}
                value={this.state.chatmsg}
                style={{width:'100%'}}
                    
                     />
            </View> 
            {this.state.chatmsg.length>0 &&  <TouchableOpacity style={{width:'13%',alignItems:'center',justifyContent:'center'}} onPress={()=>{this.sendmessagebtn()}}>
            <View style={{width:'100%',backgroundColor:Colors.buttoncolor,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                   <Image source={require('../icons/send.png')} style={{alignSelf:'center',width:50,height:50}}/>
               </View>
               </TouchableOpacity>  }
              </View>   
             
               </View>
          
      </View>
    
         
      )
   }
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
        backgroundColor:'#f5f5f5',
         height:47,
        borderRadius:5,
        alignSelf:'center',
        paddingHorizontal:15,width:'83%'
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