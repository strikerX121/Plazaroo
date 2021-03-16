import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Keyboard,TextInput,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import firebase from './Config1';
import Firebase from 'firebase';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import { firebaseprovider}  from '../providers/FirebaseProvider';
import UserFooter from './UserFooter'
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon2 from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/AntDesign';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const data=[
    {
       'name':'Veronica jung',
        'images':require('../icons/men.jpg'),
         'message':'Hi,There,the price is negotiable',
         'time':'1:24 PM'
     },
     {
        'name':'James Corton',
        'images':require('../icons/men.jpg'),
         'message':'Have a plan for Discuss this?',
         'time':'9:22 PM'
     },
     {
        'name':'Nicole Ben',
        'images':require('../icons/men.jpg'),
         'message':'Thank you for information',
         'time':'6:17 PM'
     },
     {
        'name':'Ramadhan',
        'images':require('../icons/men.jpg'),
         'message':'May busy this week',
         'time':'16 Feb'
     },
    
]


export default class Message extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             data:data,
             page:'message',
             searchbar:false,
             inboxmessage:[],
             inboxmessage2:[],
             login_type:'app'
           
            }
      
    }
    componentDidMount(){
        NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
        this.setState({isConnected:state.isConnected})
        });
       
      this.getMyInboxAllData1()
      this.props.navigation.addListener('willFocus', payload => {
        console.log('payload',payload)
         if (payload.lastState.routeName == "Messagedetaile" && payload.action.type=='Navigation/BACK') {
              this.getMyInboxAllData1()
              }
             
          });;

        firebaseprovider.firebaseUserGetInboxCount();
        this.showUserInbox()
       }
    
        getMyInboxAllData1=async()=>{

        console.log('getMyInboxAllData123');
          userdata= await localStorage.getItemObject('user_arr')
        //------------------------------ firbase code get user inbox ---------------
        if(userdata != null){
          // alert("himanshu");
          var id='u_'+userdata.user_id;
          if(inboxoffcheck>0)
          {
            console.log('getMyInboxAllDatainboxoffcheck');
            var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
            // queryOffinbox.off('child_added');
            queryOffinbox.off('child_changed');
          }

           var queryUpdatemyinboxmessage = firebase.database().ref('users/'+id+'/myInbox/');
            queryUpdatemyinboxmessage.on('child_changed', (data)=>{
            console.log('inboxkachildchangemessage',data.toJSON())
            setTimeout(()=>{  this.showUserInbox() }, 3000);
      
           
       })
       var queryUpdatemyinboxadded = firebase.database().ref('users/'+id+'/myInbox/');
       queryUpdatemyinboxadded.on('child_added', (data)=>{
        console.log('inboxkaadded',data.toJSON())
        setTimeout(()=>{  this.showUserInbox() }, 3000);
       
        // firebaseprovider.firebaseUserGetInboxCount();
   })
        }
        }
       
    //    getMyInboxAllData=async()=>{
    //    console.log('getMyInboxAllData');
    //    let  userdata= await localStorage.getItemObject('user_arr')
    // //------------------------------ firbase code get user inbox ---------------
  
    // if(userdata != null){
    //   // alert("himanshu");
    //     var id='u_'+userdata.user_id;
      
    //     var queryOffLogin = firebase.database().ref('users/').child(id).child('/myInbox/');
    //     queryOffLogin.off('child_added');
    //   //---------------------------- inbox get first time all ---------------
    //    var query = firebase.database().ref('users/'+id+'/myInbox/');
    //    query.on('child_added',(data)=> {
    //     console.log('Inbox child_added',data.toJSON());
    //      FirebaseInboxJson.push(data.toJSON());
    //     console.log('FirebaseInboxJson-1',FirebaseInboxJson);
    //   });
      
    //   //--------------------------------- update code --------------
    //   var queryUpdate = firebase.database().ref('users/'+id+'/myInbox/');
    //     queryUpdate.on('child_changed', (data)=> {
        
    //     console.log('inbox update child_changed',data.toJSON());
      
    //     var inboxKeyName = data.key.charAt(0);
    //     console.log('inboxKeyName',inboxKeyName);
    //      var count=data.val().count;
    //       var lastMsg=data.val().lastMsg;
    //       var lastMsgTime=data.val().lastMsgTime;
    //       var lastMessageType=data.val().lastMessageType;
    //       var user_id=data.val().user_id;
         
    //       var chat_type=data.val().chat_type;
      
    //       for (var i = 0; i<FirebaseInboxJson.length; i++) {
    //         if (FirebaseInboxJson[i].order_number == order_number) {
    //           FirebaseInboxJson[i].count = count;
    //           FirebaseInboxJson[i].lastMsg = lastMsg;
    //           FirebaseInboxJson[i].lastMsgTime = lastMsgTime;
    //           FirebaseInboxJson[i].lastMessageType = lastMessageType;
    //           // FirebaseInboxJson[i].order_number = order_number;
    //         }
    //       }
      
    //       //--------------------- this code  run only index page curremt page -------------
    //     /*	var user_id_me=userdata.user_id;
    //       var other_user_id=user_id;
    //       console.log('other_user_id',other_user_id);
      
    //       var user_check_inbox_count = FirebaseUserJson.findIndex(x => x.user_id==other_user_id);
    //       console.log("user_check_inbox_count",user_check_inbox_count);		
    //       if(user_check_inbox_count >=0){
    //         console.log('FirebaseUserJson',FirebaseUserJson[user_check_inbox_count]);
    //         var userData=FirebaseUserJson[user_check_inbox_count];
    //         console.log("userDataMeuserDataMe",userData);
             
    //         var userImage=URLAPI_img_200X200+userData.image;
              
    //         var userName=userData.name;
    //         var onlineStatus=userData.onlineStatus;
    //         var chat_room_id_other=userData.chat_room_id;
            
    //         var lastMsgShow='';
    //         if(lastMessageType == 'text'){
    //           lastMsgShow=lastMsg;
    //         }if(lastMessageType == 'pdf'){
    //           lastMsgShow='PDF';
    //         }else if(lastMessageType == 'image'){
    //           lastMsgShow='Photo';
    //         }else if(lastMessageType == 'video'){
    //           lastMsgShow='Video';
    //         }else if(lastMessageType == 'audio'){
    //           lastMsgShow='Audio';
    //         }
            
    //         var imgOnline='';
    //         if(onlineStatus == 'true'){
    //           var imgOnline='<img src="img/msg_green_dot.png" class="msg_green_dot">';
    //         }
            
    //         if(lastMsgTime != ''){
    //           var lastMsgTimeShow=convertTimeAllFormat(lastMsgTime,'date_time');
              
    //           var countHtml='';
    //           if(count>0){
    //             countHtml='<abbr>'+count+'</abbr>';
    //           }
    //       console.log('otheruseridashish',other_user_id);
      
    //              console.log('lastMsgShowlastMsgShow',lastMsgShow);
      
    //           // var htmlData = '<li id="chat_list_'+other_user_id+'_'+order_number+'" data-position="'+lastMsgTime+'">'+
    //           // 			  '<a href="/chat/'+other_user_id+'/'+order_id+'/'+order_number+'/'+chat_type+'/">'+
    //           // 				'<span class="id_sec">#'+order_number+'</span>'+
    //           // 				'<div class="left">'+
    //           // 				  '<img src="'+userImage+'" onerror="this.src='+error_img_user+';">'+
    //           // 				'</div>'+
    //           // 				'<div class="right">'+
    //           // 				  '<h3>'+userName+'</h3>'+
    //           // 				  '<p>'+lastMsgShow+'</p>'+
    //           // 				'</div>'+
    //           // 				countHtml+
    //           // 			  '</a>'+
    //           // 			  '<time>'+lastMsgTimeShow+'</time>'+
    //           // 			'</li>';
    //           //  if(inboxKeyName == 'o'){           
    //           // 	$('#chat_list_'+other_user_id+'_'+order_number).hide();
    //           // 	$('#chat_list_'+other_user_id+'_'+order_number).remove();
      
    //           // 	$('#chat_meassage_inbox_list').append(htmlData);
    //           // 	$('#chat_meassage_inbox_list li').sort(sortInboxAll).appendTo('#chat_meassage_inbox_list');
    //           // }else if(inboxKeyName == 's'){           
    //           // 	$('#chat_list_'+other_user_id+'_'+order_number).hide();
    //           // 	$('#chat_list_'+other_user_id+'_'+order_number).remove();
      
    //           // 	$('#chat_meassage_inbox_list_service').append(htmlData);
    //           // 	$('#chat_meassage_inbox_list_service li').sort(sortInboxAll).appendTo('#chat_meassage_inbox_list_service');
    //           // }
    //         }
      
            
    //       }*/
        
    //   });
      
      
      
    //   }
      
    //    }
     convertTimeAllFormat=(time11, format)=>
         {
           console.log(' convertTimeAllFormat time11',time11)
         time11 = parseInt(time11);
       
       var date1 = new Date(time11);
       
       var curr_day = date1.getDay();
       var curr_date = date1.getDate();
       var curr_month = date1.getMonth(); //Months are zero based
       var curr_year = date1.getFullYear();
       
       var hours = date1.getHours();
       var minutes = date1.getMinutes();
       
       // consoleProvider.log('hours',hours);
       // consoleProvider.log('minutes',minutes);
       
       if(format == 12){
       var ampm = hours >= 12 ? 'PM' : 'AM';
       hours = hours % 12;
       hours = hours ? hours : 12; // the hour '0' should be '12'
       minutes = minutes < 10 ? '0'+minutes : minutes;
       var strTime = hours + ':' + minutes + ' ' + ampm;
       }else if(format == 24){
       var ampm = hours >= 12 ? 'PM' : 'AM';
       //hours = hours < 10 ? '0'+hours : hours;
       minutes = minutes < 10 ? '0'+minutes : minutes;
       var strTime = hours + ':' + minutes;
       }else if(format == 'other'){
       
       var ampm = hours >= 12 ? 'PM' : 'AM';
       hours = hours % 12;
       hours = hours ? hours : 12; // the hour '0' should be '12'
       minutes = minutes < 10 ? '0'+minutes : minutes;
       var strTimeAll = hours + ':' + minutes + ' ' + ampm;
       var strTime = curr_date+'. '+m_names_sort[curr_month]+' '+curr_year+' '+strTimeAll;
       }else if(format == 'ago'){
       var strTime = timeSince(new Date(time11));
       //consoleProvider.log(new Date(time11));
       }else if(format == 'date_time'){
       var date = new Date(time11);
       
       var seconds = Math.floor((new Date() - date) / 1000);
       var interval = Math.floor(seconds / 3600);
       if(interval <= 24) {
       var ampm = hours >= 12 ? 'PM' : 'AM';
       hours = hours % 12;
       hours = hours ? hours : 12; // the hour '0' should be '12'
       minutes = minutes < 10 ? '0'+minutes : minutes;
       var strTime = hours + ':' + minutes + ' ' + ampm;
       }else{
       var curr_month = date1.getMonth()+1; //Months are zero based
       var curr_year = date1.getFullYear();
       var curr_year_small = String(curr_year);
       console.log('curr_year_small',curr_year_small);
         curr_year_small=curr_year_small.substring(2, 4);
       console.log('curr_year_small',curr_year_small);
       var strTime = curr_month+'/'+curr_date+'/'+curr_year_small;
       }
      }
        else if(format == 'date_time_full'){
        var date = new Date(time11);
        
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 3600);
        if(interval <= 24) {
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        }else{
        var curr_month = date1.getMonth()+1; //Months are zero based
        var curr_year = date1.getFullYear();
        var curr_year_small = String(curr_year);
        console.log('curr_year_small',curr_year_small);
          curr_year_small=curr_year_small.substring(2, 4);
        console.log('curr_year_small',curr_year_small);
        
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTimeAll = hours + ':' + minutes + ' ' + ampm;
        
        var strTime = curr_month+'/'+curr_date+'/'+curr_year_small+' '+strTimeAll;
        }
        
        }
        
        return strTime;
        }

      showUserInbox=async()=>{
        console.log('showUserInboxmesssagepabgewala');  
        let  userdata= await localStorage.getItemObject('user_arr')
        var user_id=userdata.user_id
        var login_type=userdata.login_type
        inboxoffcheck=1
        var inbox=[] 
        console.log('FirebaseInboxJson get in-box121',FirebaseInboxJson);
        var len=FirebaseInboxJson.length;
        console.log('FirebaseInboxJson len',len);
        //$('.showConversationsCount').text(len);
        if(len>0){
          // $('#chat_meassage_inbox_list').html('');
          // $('#no_data_home').hide()
          FirebaseInboxJson.sort((a, b)=> {
            var x = a.lastMsgTime, y = b.lastMsgTime;
            return x > y ? -1 : x < y ? 1 : 0;
        });
          console.log('FirebaseInboxJsonmessage',FirebaseInboxJson);
          let other_user_id55=0
          // $.each(FirebaseInboxJson,function(index,keyValue)
         for(let k=0; k<FirebaseInboxJson.length; k++)
          // FirebaseInboxJson.map((keyValue)=>
          { 
           let  keyValue=FirebaseInboxJson[k]
           if(keyValue.user_id!=other_user_id55)
            {
            console.log('message user_id',keyValue);
            var other_user_id=keyValue.user_id;
            other_user_id55=keyValue.user_id;
            console.log('other_user_id55',other_user_id55)
            console.log('other_user_id',other_user_id)      
            console.log('FirebaseUserJson',FirebaseUserJson);
            var user_data_other = FirebaseUserJson.findIndex(x => x.user_id==other_user_id);    
            console.log("user_data_other",user_data_other);
            if(user_data_other != -1){
              var userDataMe=FirebaseUserJson[user_data_other];
              console.log('userdata',userDataMe)
              var count=keyValue.count;
              var lastMessageType=keyValue.lastMessageType;
              var lastMsg=keyValue.lastMsg;
              var lastMsgTime=keyValue.lastMsgTime;
              var order_id=keyValue.order_id;
              var order_number=keyValue.order_number;
              var chat_type=keyValue.chat_type;
              
               console.log('lastMsg',lastMsg);
                var userId=userDataMe.user_id;
                if(userDataMe.login_type=='app')
                {
                  var userImage=config.img_url+userDataMe.image;
                }
                else{
                  var userImage=userDataMe.image;
                }
             
              var userName=userDataMe.name;
                var onlineStatus=userDataMe.onlineStatus;
              
                var lastMsgShow='';
                if(lastMessageType == 'text'){
                  lastMsgShow=lastMsg;
                }else if(lastMessageType == 'image'){
                  lastMsgShow='Photo';
                }
                else if(lastMessageType == 'location'){
                  lastMsgShow='Share location';
                }
              
                var imgOnline='';
                // if(onlineStatus == 'true'){
                //   var imgOnline='<img src="img/msg_green_dot.png" class="msg_green_dot">';
                // }
                 var countHtml='';
                console.log('lastMsgTime',lastMsgTime);
                if(lastMsgTime != ''){
                   lastMsgTime=this.convertTimeAllFormat(lastMsgTime,'date_time');
                    // lastMsgTime=lastMsgTime
                   countHtml='';
                  }else{
                      lastMsgTime='';
                    }
                  if(count>0){
                    countHtml=count;                
                  }  
                  let data= {
                        'name':userName,
                         'images':userImage,
                        'message':lastMsgShow,
                        'time':lastMsgTime,
                        'count':count,
                        'other_user_id':other_user_id,

                    };
                  
                  inbox.push(data) 
                  this.setState({inboxmessage:inbox,inboxmessage2:inbox})    
       
                  /*var htmlData = '<li class="item-content chat_list_'+other_user_id+'" id="chat_list_'+other_user_id+'">'+
                    '<a href="/chat/'+other_user_id+'/'+userName+'/" class="item-link">'+
                      '<span><img src="'+userImage+'" '+onerror_user_placeholder+'  /></span>'+
                      '<content>'+
                        '<h3>'+userName+'</h3>'+
                        '<p class="lastMsgShow_'+other_user_id+'" id="lastMsgShow_'+other_user_id+'">'+lastMsgShow+'</p>'+
                      '</content>'+
                      '<time id="lastMsgTime_'+other_user_id+'">'+lastMsgTime+'</time>'+
                      '<span id="unreadMsgCount_'+other_user_id+'">'+countHtml+'</span>'+
                    '</a>'+
                  '</li>';*/
                    console.log('lastMsgShowlastMsgShow',lastMsgShow);
                    console.log('nilesh1 count',count);
       
                  //  var onerror="this.src='img/error_default_image121.png'";
                  // var htmlData = '<li id="chat_list_'+other_user_id+'_'+keyValue.order_number+'" data-position="'+keyValue.lastMsgTime+'">'+
                  //    '<a href="/chat/'+other_user_id+'/'+keyValue.order_id+'/'+keyValue.order_number+'/'+keyValue.chat_type+'/">'+
                  //     '<time>'+lastMsgTime+'</time>'+
                  //     '<span> <img src="'+userImage+'" onerror="'+onerror+'"></span>'+
                  //     '<content>'+
                  //       '<h2>#'+keyValue.order_number+'</h2>'+
                  //       '<h3>'+userName+'</h3>'+
                  //       '<h4>'+lastMsgShow+'</h4>'+
                  //     '</content>'+
                  //     countHtml+
                  //   '</a>'+
                  //   '</li>';
       
                  // console.log('nilesh2');
                  // if (chat_type == 'o') {
                  //   $('#chat_meassage_inbox_list').append(htmlData);
                  //   $('#chat_meassage_inbox_list li').sort(sortInboxAll).appendTo('#chat_meassage_inbox_list');
                  // }else if (chat_type == 's') {
                  //   $('#chat_meassage_inbox_list_service').append(htmlData);
                  //   $('#chat_meassage_inbox_list_service li').sort(sortInboxAll).appendTo('#chat_meassage_inbox_list_service');
                  // }
                
            }
       
          }
          
          // var length = $('#chat_meassage_inbox_list li').length;
          // var length2 = $('#chat_meassage_inbox_list_service li').length;
          
          // if(length==0){
          //   $('#no_data_home_order').show();    
          // }else{
          //   $('#no_data_home_order').hide();
          // }
          // if(length2==0){
          //   $('#no_data_home_service').show();    
          // }else{
          //   $('#no_data_home_service').hide();
          // }
        }}
        // this.setState({inboxmessage:'NA'}) 
        // }else{
        //   $('#chat_meassage_inbox_list').html('<li class="no_found_img"><img src="img/no-result.gif" style="width: 100%;"></li>');
        //  $('#no_data_home_order').show();
        //   $('#no_data_home_service').show();
        // }
       }
       SearchFilterFunction=(text)=> {
        //passing the inserted text in textinput
        let data1=this.state.inboxmessage2
        const newData = data1.filter(function(item) {
          //applying filter for the inserted text in search bar
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        console.log(newData)
        if(newData.length>0)
        {
          this.setState({
            inboxmessage: newData,
            search:text,
           
          });
        }
        else{
          this.setState({
            inboxmessage: 'NA',
            search:text,
           
          });
          this.setState({msg:'This Type of data is not available'})
        }
       
        }
   
    render(){
        console.log('inboxmessage  ',this.state.inboxmessage)
return(
    <View style={styles.container}>
         {/* //=----------------------header part---------=000------ */}
         <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',height:screenHeight*8/100,}}>
         <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{width:'70%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,textAlign:'center'}}>Messages</Text>
          </View>
          <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.setState({searchbar:true})}}> 
              <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/b-search.png')} style={{alignSelf:'center',width:16,height:16}}/>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:0}}>
        <View style={{borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor,width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
     { this.state.searchbar==true && <View style={{flexDirection:'row',alignSelf:'center',borderRadius:10,marginBottom:10,backgroundColor:'#f2f2f2',width:'95%',}}>
                <View style={{width:'10%',alignSelf:'center'}}>
                  <Image source={require('../icons/b-search.png')} style={{width:20,height:20,alignSelf:'center'}}/>
                 </View>
                <View style={{width:'80%'}}>
                 <TextInput
                   placeholder={'Search User Name'}
                   placeholderTextColor='gray'
                   onFocus={()=>{this.setState({changeicon:true})}}
                   onChangeText={text => this.SearchFilterFunction(text)}
                   onClear={text => this.SearchFilterFunction('')}
                   value={this.state.search}
                   showCancel={true}
                   returnKeyLabel='done'
                 
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   style={{width:'100%',alignSelf:'center',fontSize:15,paddingVertical:10}}
                    />
                </View>
                <TouchableOpacity style={{width:'10%',alignSelf:'center'}} onPress={()=>{this.setState({searchbar:false})}}> 
                 <View style={{width:'100%',alignSelf:'center'}}>
                    <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
                </View>
             </TouchableOpacity>
              </View>}
             {this.state.inboxmessage.length<=0 &&
             <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13.5,textAlign:'center',marginTop:30,}}>messages are not available</Text>
             }
        <View style={{width:'95%',alignSelf:'center',paddingBottom:150}}>
          <FlatList
               data={this.state.inboxmessage}
               showsVerticalScrollIndicator={false}
               renderItem={({item,index})=>{
                 if(this.state.inboxmessage!='NA')
                 {
                  return(
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Messagedetaile',{'data':{'other_user_id':item.other_user_id,'name':item.name}})}}>
                    <View style={{flexDirection:'row',paddingVertical:14,borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor}}>
                          <View style={{width:'15%'}}>
                              <Image source={{uri:item.images}} style={{width:35,height:35,borderRadius:20,alignSelf:'center',backgroundColor:Colors.imagebackcolor}}/>
                          </View>
                          <View style={{width:'70%',}}>
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,}}>{item.name}</Text>
                  <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,lineHeight:22}}>{item.message}</Text>
                          </View>
                          <View style={{width:'15%',alignSelf:'flex-end',alignItems:'flex-end'}}>
                          <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,}}>{item.time}</Text>
                       { item.count>0 && 
                           <View style={{width:25,height:25,marginTop:2,borderRadius:13,backgroundColor:Colors.buttoncolor,justifyContent:'center',alignItems:'center',alignSelf:'flex-end'}}>
                           <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:12.5,color:'#FFFFFF'}}>{item.count>9?'9+':item.count}</Text>
                            </View>
                       }
                              </View>
                            </View>
                    </TouchableOpacity>
                  )
                 }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
                   
              
  
       {/* ........................................Container finish............................... */}
      
      
       <UserFooter navigation={this.props.navigation}  count_inbox={count_inbox} color={this.state.page}/>
        
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