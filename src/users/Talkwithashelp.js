import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
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
export default class Talkwithashelp extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             data:data,
           
            }
      
    }

    multiSliderValuesChange = values => {
        if(this.props.single ){
         this.setState({
             second : values[0],
         })  
        }else{
         this.setState({
             multiSliderValue: values,
             first : values[0],
             second : values[1],
         }) 
        }
         this.multiSliderValueCallback(values)
     }

     multiSliderValueCallback = (values) => {
      this.setState({multiSliderValues : values})
    }
 
     renderScale=()=> {
         const items = [];
         for (let i=this.state.min; i <= this.state.max; i++) {
             items.push(
                 <Item 
                     value = {i}
                     first = {this.state.first}
                     second = {this.state.second}
                 />
             );
         }
         return items;
     }
   
    render(){
        console.log('cikasd')
return(
    <View style={styles.container}>
         {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',height:screenHeight*8/100,}}>
         <TouchableOpacity style={{width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{width:'70%',alignSelf:'center'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16,textAlign:'center'}}>Help & Support</Text>
          </View>
          <TouchableOpacity style={{width:'15%',alignSelf:'center'}}> 
          <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/call.png')} style={{alignSelf:'center',width:16,height:16}}/>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:1,borderBottomColor:Colors.bottombordercolor,width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
      
        <View style={{width:'100%',position:'absolute',bottom:0,left:0,right:0}}>
            
        <View style={{width:'95%',alignSelf:'center',paddingTop:10}}>
            <FlatList
            data={this.state.data}
            showsVerticalScrollIndicator={false}
            ref={ref => (this.FlatListRef = ref)} // assign the flatlist's ref to your component's FlatListRef...
            onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
            contentContainerStyle={{marginBottom:80}}
             keyboardDismissMode='interactive'
            keyboardShouldPersistTaps='always' 
             renderItem={({item,index})=>{
               return(
                   <View style={{width:'95%',alignSelf:'center',paddingVertical:6}}>
                    {item.userid==165 &&<View style={{alignSelf:'flex-start',width:'70%'}}>
                      <View style={{backgroundColor:'#f5f5f5',padding:12,alignSelf:'flex-start',borderTopStartRadius:8,borderBottomLeftRadius:8,borderTopRightRadius:8}}>
                           {item.messageType=='text' && <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'black'}}>{item.message}</Text>}
                           {item.messageType=='image' && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Demo1',{'images':item.name,'type':'type'})}}>
                            <Image source={{uri:config.img_url+item.name}} style={{width:BannerWidth*62/100,height:BannerHieght*47/100,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
                            </TouchableOpacity>}
                            
                          </View>
                          <Text style={{fontSize:14,fontFamily:'Ubuntu-Regular',color:'gray'}}>{item.time}</Text>
                      </View>}
                      {item.userid==164 && <View style={{width:'70%',alignSelf:'flex-end',}}>
                          <View style={{backgroundColor:Colors.buttoncolor,borderTopStartRadius:8,borderBottomLeftRadius:8,borderTopRightRadius:8,padding:12,alignSelf:'flex-end'}}>
                          {item.messageType=='text' && <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'#FFFFFF',}}>{item.message}</Text>}
                           {item.messageType=='image' && <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Demo1',{'images':item.name,'type':'type'})}}>
                            <Image source={{uri:config.img_url+item.name}} style={{width:BannerWidth*62/100,height:BannerHieght*47/100,borderRadius:5,backgroundColor:Colors.imagebackcolor}}/>
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
                  
     
                   
         </View>
  
       {/* ........................................Container finish............................... */}
      
      
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'95%',}}>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',borderTopColor:'#ededed',borderTopWidth:2,paddingVertical:10}}>
            <View style={styles.inputcontainer}>
             <Image source={require('../icons/camera.png')} style={{alignSelf:'center',width:15.8,height:15}}/>
             <TextInput
                    placeholder='Type Message'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Email:txt})}}
                    maxLength={50}
                    style={styles.textfiledinput}
                   />
          </View> 
          <View style={{width:'13%',backgroundColor:Colors.buttoncolor,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                 <Image source={require('../icons/send.png')} style={{alignSelf:'center',width:50,height:50}}/>
             </View>
            </View>   
           
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