import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,FlatList,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import Loader from '../Loader'
import HTMLView from 'react-native-htmlview';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
import NetInfo from '@react-native-community/netinfo';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Termscondition extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false,
             pagename:this.props.navigation.getParam('contantpage'),
             loading:false,
             isConnected:true,
             Termsdata:[]
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
        componentDidMount(){
         this.Termsconditiondata()
         NetInfo.fetch().then(state => {
          this.setState({isConnected:state.isConnected}) });
           const unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected:state.isConnected})
          });
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
       {/* //=----------------------header part---------=000------ */}
       <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomColor:'#f2f2f2',borderBottomWidth:1}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/back.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}>
            {this.state.pagename==1 &&
                     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Privacy Policy</Text>
               }
                 {this.state.pagename==0 &&
                    <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>About</Text>
                 }
                  {this.state.pagename==2 &&
                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Terms & Conditions</Text>
                    
                 } 
                  

          </View>
          </View>
        {/* ..............................heaser finish................................ */}
       <ScrollView showsVerticalScrollIndicator={false}>
      {/* {this.state.contantpage!='about' &&  <View style={{width:'93%',alignSelf:'center',paddingTop:20}}>
        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14,}}>Privacy</Text>
        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingTop:15,lineHeight:18}}>Sed ut perpiciatis unde omnis iste natus  error sit voluptatem accusantium doloremque laudantium,titam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicab, Nemo enim ipsam voluptatem quia volutas sit aspernatur aut odit aut fugit,</Text>
        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14,paddingTop:10}}>Policy</Text>
        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingTop:10,lineHeight:18}}>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quarat voluptatem.</Text>
</View>  }
{this.state.contantpage=='about' &&  <View style={{width:'93%',alignSelf:'center',paddingTop:20}}>
        <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14,}}>About</Text>
        <Text style={{color:'gray',fontFamily:'Ubuntu-Regular',fontSize:13,paddingTop:15,lineHeight:18}}>Sed ut perpiciatis unde omnis iste natus  error sit voluptatem accusantium doloremque laudantium,titam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicab, Nemo enim ipsam voluptatem quia volutas sit aspernatur aut odit aut fugit,</Text>
       
</View>  } */}
<View style={{marginBottom:20,marginHorizontal:15,alignItems:'center',alignSelf:'center'}}>
              <FlatList
                         showsVerticalScrollIndicator={false}
                       data={this.state.Termsdata}
                       renderItem={({item,index}) => {
                       console.log('page',this.state.pagename)
                return (
                        <View style={{paddingVertical:10,}}>

                           <View  style={{alignSelf:'center'}}>
                               {item.content_type==this.state.pagename &&
                                    <View style={{height:'auto'}}>
                                        <HTMLView
                                        // value={item.content.replace(/(<([^>]+)>)/ig, '')}
                                           value={item.content}
                                         stylesheet={styles}
                                       />
                              
                                  </View>
                             }
                             </View>
                        
                         </View>
                        
                      );
                }}
                keyExtractor={(item, index) => index.toString()}
                />
       </View>
       
          
        </ScrollView> 
       {/* ........................................Container finish............................... */}
     
      
         
        
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
         borderRadius:6,
         paddingVertical:12,
         width:'50%',
         margin:15,
         backgroundColor:'#fa5252'
    },
    textbutton:{
     borderBottomColor:'#f2f2f2'
    ,borderBottomWidth:1,
     paddingVertical:16,
     width:'95%',
     alignSelf:'center'
 },
    textfont:{
    fontFamily:'Ubuntu-Medium',
    fontSize:13,
    paddingLeft:10
},
p:{
  fontWeight: '300',
  color: Colors.textcolor, // make links coloured pink
  // textAlign:'justify',
  marginBottom: -50,
  lineHeight:24,
  letterSpacing:0.8,
  fontStyle:'normal',
  fontFamily:'Ubuntu-Medium'
},
   
})