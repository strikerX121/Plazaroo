import React,{Component} from 'react';
import {Text,View,Image,TextInput,StyleSheet,ScrollView,Switch,TouchableOpacity,Dimensions,Alert,FlatList} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import {firebaseprovider}  from '../providers/FirebaseProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class UserFooter extends Component{
    constructor(props){
        super(props)
        this.state={
            color:''
        }
    }
    componentDidMount(){
        firebaseprovider.messagecountforfooter()
    }
 messagecountforfooter=async()=>{

        console.log('getMyInboxAllDatagetinboxaccount');
          userdata= await localStorage.getItemObject('user_arr')
        //------------------------------ firbase code get user inbox ---------------
        if(userdata != null){
          // alert("himanshu");
          var id='u_'+userdata.user_id;
          if(inboxoffcheck>0)
          {
            console.log('getMyInboxAllDatainboxoffcheck');
            var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
           //queryOff.off('child_added');
            queryOffinbox.off('child_changed');
          }
  
           var queryUpdatemyinbox = firebase.database().ref('users/'+id+'/myInbox/');
            queryUpdatemyinbox.on('child_changed', (data)=>{
            console.log('inboxkachildchange',data.toJSON())
        //  this.showUserInbox()
         firebaseprovider.firebaseUserGetInboxCount();
       })
        }
        }
    usercheckbtn=async(page)=>{
        const navigation=this.props.navigation;
        let userdata=await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
            if(userdata.profile_complete!=0)
            {
                if(page=='Myoffer')
                {
                    navigation.navigate('Myoffer')
                 }
            else if(page=='Postanitem')
            {
                navigation.navigate('Postanitem')
            }
            else if(page=='Message')
            {
                navigation.navigate('Message')
            }
            else if(page=='Account')
            {
                navigation.navigate('Account')
            }
             }
             else{
                 this.props.navigation.navigate('Userlogin') 
                 }
            
    }else{
            this.Checkuser()
        } 
     }
     Checkuser = () => {
            
        Alert.alert(
                msgTitle.confirm[config.language],
                msgText.loginFirst[config.language],
                [
                    {
                        text: msgTitle.cancel[0], 
                    },
                    {
                        text: msgTitle.ok[0], 
                        // onPress: () =>  this.btnPageLoginCall(),
                        onPress: ()=>{this.props.navigation.navigate('Userlogin')}
                    },
                ],
                {cancelable: false},
            );
        }
    render(){
        console.log('foter page count_inbox',count_inbox)
        const navigation=this.props.navigation;
        count_inbox=this.props.count_inbox
        return(
            <View style={style1.footercontainer}>
                
               {this.props.color=='home'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Userhome')}}>
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f1-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       {/* <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Home</Text> */}
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Userhome')}}>
              <View style={style1.footericonview}>
              <Image source={require('../icons/f1.png')}  resizeMethod='resize' style={style1.footerimage}/>
              {/* <Text style={style1.footertext}>Home</Text> */}
              </View>
            </TouchableOpacity>
               }
               
               {this.props.color=='offer'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{this.usercheckbtn('Myoffer')}}>
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f2-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       {/* <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Offers</Text> */}
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{this.usercheckbtn('Myoffer')}}>
              <View style={style1.footericonview}>
              <Image source={require('../icons/f2.png')}  resizeMethod='resize' style={style1.footerimage}/>
                  {/* <Text style={style1.footertext}>Offers</Text> */}
              </View>
            </TouchableOpacity>
               }
             <TouchableOpacity  onPress={()=>{localStorage.setItemObject('post_item_data',null); selleraddress='NA';this.usercheckbtn('Postanitem')}} activeOpacity={0.8} style={[style1.footericon,{backgroundColor:Colors.buttoncolor}]} >
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f3.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       {/* <Text style={[style1.footertext,{color:'#FFFFFF'}]}>Sell</Text> */}
                   </View>
               </TouchableOpacity>
              {this.props.color=='message'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{this.usercheckbtn('Message'); }}>
                    {count_inbox>0 && <View style={{position:'absolute',paddingLeft:37,top:0}}>
                     <View style={{alignSelf:'center',paddingVertical:0.7,paddingHorizontal:3,borderRadius:5,backgroundColor:Colors.buttoncolor}}>
                      <Text style={{color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:15,}}>{count_inbox==9?'9+':count_inbox}</Text>
                      </View>
                    </View>}
                   <View style={style1.footericonview}>
                   
                   <Image source={require('../icons/f4-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       {/* <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Messages</Text> */}
                      
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{this.usercheckbtn('Message'); }}>
             {count_inbox>0 && <View style={{position:'absolute',paddingLeft:37,top:0}}>
                     <View style={{alignSelf:'center',paddingVertical:0.7,paddingHorizontal:3,borderRadius:5,backgroundColor:Colors.buttoncolor}}>
                      <Text style={{color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Medium',fontSize:15,}}>{count_inbox==9?'9+':count_inbox}</Text>
                      </View>
                    </View>}
              <View style={style1.footericonview}>
              <Image source={require('../icons/f4.png')}  resizeMethod='resize' style={style1.footerimage}/>
                  {/* <Text style={style1.footertext}>Messages</Text> */}
                 
              </View>
            </TouchableOpacity>
               }
                {this.props.color=='account'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{this.usercheckbtn('Account');}}>
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f5-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       {/* <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Account</Text> */}
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{this.usercheckbtn('Account');}}>
              <View style={style1.footericonview}>
              <Image source={require('../icons/f5.png')}  resizeMethod='resize' style={style1.footerimage}/>
                  {/* <Text style={style1.footertext}>Account</Text> */}
              </View>
            </TouchableOpacity>
               }
               
             
           </View>
           
        )
    }
}
const style1=StyleSheet.create({
  
    footercontainer:{
        flexDirection:'row',width:screenWidth,
        backgroundColor:'#f7f7f7',
        position:'absolute',
        elevation:20,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.4,
        shadowColor:'black',
        bottom:0
         },
         footericon:{
            width:screenWidth*20/100,
            paddingVertical:15,
            
         },
         footericonview:{
             alignSelf:'center'
         },
         footertext:{
            color:'gray',
         fontSize:14,
         fontFamily:'Ubuntu-Medium'
       },
       footerimage:{
          alignSelf:'center',
       width:26,
       height:26
    }
   
})