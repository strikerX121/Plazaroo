import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler,FlatList,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import StarRating from 'react-native-star-rating';
import Loader from '../Loader'
import Icon2 from 'react-native-vector-icons/EvilIcons'

import { floor } from 'react-native-reanimated';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Followunfolowuserlist extends Component {
    constructor(props) {
        super(props);
        this.state = { 
              loading: false,
              follow_status:0,
              user_id:'',
              modalVisible:false,
              isConnected:true,
              Followuser:'NA',
              Unfollouser:'NA',
              btn:this.props.navigation.getParam('btn'),
              pagename:this.props.navigation.getParam('pagename'),
              refresh:false,
            }
      
    }
    Termsconditiondata= async ()=>{
   
        if(this.state.isConnected===true)
                {
        var url = config.baseURL+'get_all_content.php?user_id=0&user_type=1';
        console.log('url',url) 
        fetch(url,{ 
           method: 'GET',
           headers: new Headers(config.headersapi), 
         
        }).then( (obj)=> {
              return obj.json();  
       }).then((obj)=> { 
        // msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
      console.log(obj)
        if(obj.success == 'true'){
            this.setState({loading:false,Termsdata:obj.content_arr});
            //  localStorage.setItemObject('contantdata',obj.content_arr)
                
             } 
             else{
                  this.setState({loading:false,});
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
    addfavoritebtn=async()=>{
        let userdata=await localStorage.getItemObject('user_arr')
        if(userdata!=null)
        {
        let user_id=userdata.user_id
        if(this.state.isConnected===true)
           {
             let data=new FormData()
           
             data.append('user_id',userdata.user_id)
             data.append('user_type',1)
             data.append('item_id',this.state.product_id)
           var url = config.baseURL+'itemFavoriteStatus.php'
          console.log("url:"+url);
         if(this.state.refresh==false)
           {
           this.setState({user_id:userdata.user_id,loading:true,})
          }
         fetch(url,{
            method: 'POST',
            headers: new Headers(config.headersapi), 
            body:data
          }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
                let data=this.state.productdetaile_arr
                if(obj.favorite_status==1)
                {
                      data.favraouiteCount=data.favraouiteCount+1
                }
                else{
                    data.favraouiteCount=data.favraouiteCount-1
                  }
                data.favourite=obj.favorite_status
                this.setState({productdetaile_arr:data})
              } 
              else{
                if(obj.msg[config.language]=='User not exists!')
                {
                  this.props.navigation.navigate('Logout')
                }
                if(obj.account_active_status=="deactivate")
                 {
                   this.props.navigation.navigate('Logout')
                 }
                  msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({loading: false,refresh:false});
       });
      }
      else{
         msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
       }  
        }
        else{
          this.Checkuser()
        }
      }
    render() {
        return (
            <View style={{flex:1}}>
                  <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
        <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>{this.state.pagename}</Text>
          </View>
          </View>


   {this.state.btn=='unfollow' &&
   
   <View style={{marginTop:10,paddingBottom:350}}>
        <FlatList
         data={this.state.Unfollouser}
         showsVerticalScrollIndicator={false}
         renderItem={({item,index})=>{
           if(this.state.Unfollouser!='NA')
           {
            return(
              <View style={{width:'95%',paddingVertical:6,borderBottomWidth:1,borderBottomColor:'#f2f2f2',alignSelf:'center',backgroundColor:'#FFFFFF',marginBottom:10,borderRadius:5,paddingHorizontal:10}}>
                        <View style={{flexDirection:'row',width:'100%',paddingVertical:6}}>
                           <View style={{width:'15%'}}>
                           {item.user_image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:40,height:40,borderRadius:20}}/>:
                       <Image source={item.login_type=='app'?{uri:config.img_url1+item.user_image}:{uri:item.user_image}} style={{backgroundColor:Colors.imagebackcolor,width:40,height:40,borderRadius:20}}/>
                     } 
                      </View>
                          <View style={{width:'80%',}}>  
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingBottom:2,fontSize:14}}>{item.item_name}</Text>
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14}}>{item.user_name}</Text>
                             <View style={{flexDirection:'row',paddingVertical:6,justifyContent:'space-between'}}>
                            
                                 <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.createtime}</Text>
                           </View> 
                          
                          
                           </View>  
                           </View>  
                    <Text style={{fontSize:12,color:'black',fontFamily:'Ubuntu-Regular',lineHeight:20,paddingLeft:15}}>{item.review}</Text>
              </View>
            )
          }
          else{
            if(item=='N')
            {
              return(
                 <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>No unfollowing users are available</Text>
              )
            }
          }
         }}
         keyExtractor={(item, index) => index.toString()}
        />
      </View>
   }
 {this.state.btn=='follow' && 
      <View style={{marginTop:10,paddingBottom:350}}>
        <FlatList
         data={this.state.Followuser}
         showsVerticalScrollIndicator={false}
         renderItem={({item,index})=>{
           if(this.state.Followuser!='NA')
           {
            return(
              <View style={{width:'95%',paddingVertical:6,borderBottomWidth:1,borderBottomColor:'#f2f2f2',alignSelf:'center',backgroundColor:'#FFFFFF',marginBottom:10,borderRadius:5,paddingHorizontal:10}}>
                        <View style={{flexDirection:'row',width:'100%',paddingVertical:6}}>
                           <View style={{width:'15%'}}>
                           {item.user_image=='NA'?
                       <Image source={require('../icons/name.png')} style={{width:40,height:40,borderRadius:20}}/>:
                       <Image source={item.login_type=='app'?{uri:config.img_url1+item.user_image}:{uri:item.user_image}} style={{backgroundColor:Colors.imagebackcolor,width:40,height:40,borderRadius:20}}/>
                     } 
                      </View>
                          <View style={{width:'80%',}}>  
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingBottom:2,fontSize:14}}>{item.item_name}</Text>
                          <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:14}}>{item.user_name}</Text>
                             <View style={{flexDirection:'row',paddingVertical:6,justifyContent:'space-between'}}>
                            
                                 <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.createtime}</Text>
                           </View> 
                          
                          
                           </View>  
                           </View>  
                    <Text style={{fontSize:12,color:'black',fontFamily:'Ubuntu-Regular',lineHeight:20,paddingLeft:15}}>{item.review}</Text>
              </View>
            )
          }
          else{
            if(item=='N')
            {
              return(
                <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,borderBottomWidth:0.6,borderBottomColor:'#FFFFFF'}}>No following users are available</Text>
              )
            }
          }
         }}
         keyExtractor={(item, index) => index.toString()}
        />
      </View>
    }
            </View>
        )
    }
}
