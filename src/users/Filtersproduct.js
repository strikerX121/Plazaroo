import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,Alert,TextInput,FlatList,BackHandler, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import UserFooter from './UserFooter';
import Loader from '../Loader';
import NetInfo from '@react-native-community/netinfo';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/AntDesign'
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Icon2 from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/AntDesign';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default class Filtersproduct extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             category_arr:[],
             multiSliderValue: [0, 50000],
             first: 0,
             second: 50000,
             keyword:'',
           
             single:false,
             multiSliderValues: [],
             categorydata :[]
            }
      
    }
    componentDidMount(){
      NetInfo.fetch().then(state => {
      this.setState({isConnected:state.isConnected})});
     //Subscribe to network state updates
      const unsubscribe = NetInfo.addEventListener(state => {
      this.setState({isConnected:state.isConnected})
     });
     this.getcategorydata()
  }

  getcategorydata = async() => {
    let userdata=await localStorage.getItemObject('user_arr')
      //-------------------- input validations -----------------
       let user_id=0
      if(userdata!=null)
        {
          user_id=userdata.user_id
       }
      
      if(this.state.isConnected===true)
    {
    this.setState({ loading: true,});
    var url = config.baseURL+'get_category.php?user_id='+user_id+'&user_type=1';
     console.log("url:"+url);
      const {navigate} = this.props.navigation;
   fetch(url,{
         method: 'GET',
         headers: new Headers(config.headersapi), 
       
     }).then( (obj)=> {
      this.setState({loading:false});
        return obj.json();  
     }).then( (obj)=> { 
         console.log('obj',obj);
      //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
         if(obj.success == 'true'){
           let data=obj.category_arr
           if(obj.category_arr!='NA')
           {
              for(let i=0; i<data.length; i++)
                 {
                   data[i].status=false
                }
                let temp={category_id: 0, createtime: "2020-08-14 13:47:14",  category_name: "ALL",status: true,
                  updatetime: "2020-08-14 14:18:34",}
                data.splice(0, 0, temp)
                // data[data.length]={category_id: 0,
                //   createtime: "2020-08-14 13:47:14",
                //     name: "ALL",
                //    status: true,
                //   updatetime: "2020-08-14 14:18:34",
                //   }
           }
          this.setState({category_arr:data,})
           }else{
             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
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
 searchdataitem=async()=>{
   let userdata=await localStorage.getItemObject('user_arr')
  let user_id=0
   if(userdata!=null)
  {
   user_id=userdata.user_id
  }
 
  let position=currentLatlong
   let categoryids=this.state.categorydata
  if(this.state.categorydata.length==0)
  {
    categoryids='all'
  }
  console.log('this.state.category_arr[0].status',this.state.category_arr[0].status)
  if(this.state.first==0 && this.state.second==50000 && this.state.categorydata.length==0 && this.state.keyword.length<=0 && this.state.category_arr[0].status==false)
  {
    msgProvider.alert(msgTitle.information[config.language],"Please select at least one filed", false);
   return false
  }
  console.log('position',position)
   if(this.state.isConnected===true)
   {
     let longitude=position.coords.longitude
     let latitude=position.coords.latitude  
    var url = config.baseURL+'get_filter_items.php?user_id='+user_id+'&user_type=1&latitude='+latitude+'&longitude='+longitude+'&category_ids='+categoryids+'&start_price='+this.state.first+'&end_price='+this.state.second+'&keyword='+this.state.keyword;
    console.log("url:"+url);
   this.setState({loading:true,})
   fetch(url,{
       method: 'GET',
       headers: new Headers(config.headersapi), 
       }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,});    return  obj.json();}).then((obj)=>{
    console.log('obj',obj)

        if(obj.success == 'true'){
          this.props.navigation.navigate('Homefiltersearchdata',{'filterdata':obj.item_details_arr})
           } 
       else{
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
// }
// else{
//   this.Checkuser()  
// } 
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
    
     selectcategory=(index,id)=>{
      if(index!=0)
      {
      let data=this.state.category_arr
         console.log(data)
     
          data[0].status=false
         let data2=this.state.categorydata 
         data[index].status=!data[index].status
        let findindex=data2.findIndex((item)=>{
        return item==id
      })  
      if(data[index].status==true)
       {
        data2.splice(index, 0, id);
       }
    else{
      console.log(findindex)
         data2.splice(findindex,1)
       }
      
       this.setState({category_arr:data,categorydata:data2})
      console.log('data',data2)
     }
     else{
      let data=this.state.category_arr
      console.log(data)
  
      for(let i=0; i<data.length; i++)
      {
          if(index==i)
          {
              data[i].status=true
          }
          else{
            data[i].status=false
          }
      }
       this.setState({category_arr:data,categorydata:[]})
       console.log('data',data)
     }
    }
   resetfunction=()=>{
      this.keywords.clear();
      let data3=this.state.category_arr
            for(let i=0; i<data3.length; i++)
             {
              data3[i].status=false
             }
       this.setState({ multiSliderValue:[0,50000],
        first: 0,
        second: 50000,
        single:false,
        keyword:'',
        multiSliderValues: [],
        category_arr:data3,
        categorydata :[]})
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
                      onPress: ()=>{this.props.navigation.navigate('Login')}
                  },
              ],
              {cancelable: false},
          );
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
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Filters</Text>
          </View>
          <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.resetfunction()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
              <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>RESET</Text>
             </View>
          </TouchableOpacity>
                
        </View>
        <View style={{flexDirection:'row',paddingTop:5}}>
        <View style={{borderBottomWidth:0.6,borderBottomColor:'#dbdbd9',width:'100%'}}></View>
         </View>
       
        {/* ..............................heaser finish................................ */}
        <ScrollView style={{marginBottom:50}}>
        <View style={{paddingHorizontal:20,paddingTop:20}}>
             <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',color:'black',paddingBottom:20}}>Filter by</Text>
             <View style={styles.inputcontainer}>
             <Image source={require('../icons/search.png')} style={{alignSelf:'center',width:14,height:14}}/>
             <TextInput
                    placeholder='Search'
                    placeholderTextColor='gray'
                    ref={(input)=>{this.keywords=input}}
                    keyboardType='email-address'
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({keyword:txt})}}
                    maxLength={50}
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Please enter email</Text>
                   }
                   <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',paddingVertical:15,color:'black',paddingBottom:20}}>Price Range</Text>
                   <View style={{alignSelf:'center',paddingVertical:7}}>
                   <MultiSlider
                        trackStyle={{backgroundColor:'#bdc3c7'}}
                        selectedStyle={{backgroundColor:Colors.buttoncolor}}
                        values={ this.state.single ?
                          [this.state.multiSliderValue[1]] : 
                          [this.state.multiSliderValue[0],this.state.multiSliderValue[1]]}
                        // sliderLength={Dimensions.get('window').width-this.props.LRpadding*2}
                        onValuesChange={this.multiSliderValuesChange}
                        min={0}
                        max={50000}
                        step={1}
                        allowOverlap={false}
                        // customMarker={CustomMarker}
                        snapped={true}
                    />
                   </View>
                   <View style={{paddingLeft:25}}>
                  <View style={{flexDirection:'row',justifyContent:"space-between",paddingVertical:7}}>
                       <Text style={{fontSize:14,}}>${this.state.first}</Text>
                       <Text style={{fontSize:14,fontWeight:'bold'}}>${this.state.second}</Text> 
                   </View>
                     <View style={[styles.column,{marginLeft:40}]}>
                    {this.renderScale()}
                </View>
                </View>
                  
                   <Text style={{fontSize:14,fontFamily:'Ubuntu-Medium',paddingVertical:15,color:'black',paddingBottom:20}}>Categories</Text>
                   <View style={{alignSelf:'center',paddingBottom:10,width:'100%'}}>                  
                 <FlatList
                     numColumns={3}
                     data={this.state.category_arr}
                   
                     renderItem={({item,index})=>{
                       if(this.state.category_arr!='NA')
                       {
                         return(
                           <TouchableOpacity onPress={()=>{this.selectcategory(index,item.category_id)}}>
                          
                             <View style={{paddingVertical:7,alignSelf:'center',marginLeft:6}}>
                             {
                                item.status==false &&
                                <Text style={{backgroundColor:'#FFFFFF',elevation:2,fontSize:12,borderRadius:4,paddingHorizontal:20,paddingVertical:10}}>{item.category_name}</Text>
                              } 
                                 {
                                   item.status==true &&
                                   <Text style={{backgroundColor:Colors.buttoncolor,color:'#FFFFFF',fontSize:12,borderRadius:4,paddingHorizontal:20,paddingVertical:10}}>{item.category_name}</Text>
                                 }        
                               </View>
                               </TouchableOpacity>
                         )
                     }}
                    }
                     keyExtractor={(item, index) => index.toString()}
                   />
                   </View>
    </View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
      
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'95%',}}>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{this.searchdataitem()}}>
               <View style={{alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Apply</Text>
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
      paddingLeft:12,
    width:'100%'
    },
    inputcontainer:{
        flexDirection:'row',     
        backgroundColor:'#FFFFFF',
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
    Textarea_Style:{
        width:'100%',
        color:'black',
        textAlignVertical: 'top',
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