import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler, ScrollView,TouchableOpacity,StatusBar,Alert} from 'react-native';
import Colors from '../Colors'

import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';

import Icon1 from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { FlatList } from 'react-native-gesture-handler';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from 'react-native-chart-kit';
import Loader from '../Loader';
  
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const ViewCount1=[0,0,0,0,0,0,0]
const Monthcount1=["jan 1","jan 2","jan 3", "jan 4", "jan 5", "jan 6","jan 7"]
global.selleraddress='NA'
export default class Performance_item extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             refresh:false,
             viewCount:0,
             isConnected:true,
             HidePassword:false,
             total_view_count:0,
             item_performance:this.props.navigation.getParam('item_performance'),
             page:'home',
             Monthcount:Monthcount1,
             ViewCount:ViewCount1,
             
           }
      
    }
    componentDidMount()
    {
      this.getviewcount()
    }

    getviewcount=async()=>{
      let userdata=await localStorage.getItemObject('user_arr')
      let user_id=userdata.user_id
      if(this.state.isConnected===true)
      {
         var url = config.baseURL+'get_item_view_count.php?user_id='+userdata.user_id+'&user_type=1&item_id='+this.state.item_performance.item_id;
        console.log("url:"+url);
      if(this.state.refresh==false)
      {
        this.setState({user_id:userdata.user_id,loading:true,})
      }
       fetch(url,{
          method: 'GET',
          headers: new Headers(config.headersapi), 
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
           console.log('obj',obj)
           if(obj.success == 'true'){
             if(obj.item_day_count_arr!='NA')
              {
                
                let data=obj.item_day_count_arr
                let ViewCount=[]
                let Monthcount=[]
               for(let i=0; i<data.length; i++)
               {
                  ViewCount.push(data[i].view_count) 
                  Monthcount.push(data[i].day)                
               }
               console.log('viewcount',ViewCount+Monthcount)
                this.setState({ViewCount:ViewCount,Monthcount:Monthcount,total_view_count:obj.total_view_count})
              }
               
            } 
            else{
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
    getitemvalue=(item)=>{
       console.log(item)
      Alert.alert(
      'Views',
      'Your item views: '+item.value,
      [
        {
          text:'cancel', 
         },
        {
          text: 'ok', 
          onPress: () => console.log('vikas solanki')
          // onPress: () => this.props.navigation.navigate('Logout'),
        },
      ],
        {
            text: 'ok', 
            onPress: () => console.log('vikas solanki'),
            // onPress: () => this.props.navigation.navigate('Logout'),
          },
      
        {cancelable: false},
      );
    }
   
    render(){
        console.log('item_performance',this.state.Monthcount)
        console.log('mat',this.state.ViewCount)
        let item=this.state.item_performance
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
  <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
     <View style={{width:'100%',alignSelf:'center'}}>
          <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
      </View>
   </TouchableOpacity>
   <View style={{paddingVertical:15,width:'60%'}}> 
     <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Item Performance</Text>
   </View>
 
         
 </View>
        
 <ScrollView >
        <View style={{width:'100%',alignSelf:'center',paddingVertical:15,borderBottomLeftRadius:20,borderBottomRightRadius:20,paddingTop:10}}>
       
          <View style={{flexDirection:'row',width:'90%',alignSelf:'center'}}>
               <View style={{width:90,alignSelf:'center',height:90,borderRadius:45}}>
            <Image source={item.item_images!='NA'?{uri:config.img_url1+item.item_images[0].image}:require('../icons/name.png')} style={{alignSelf:'center',width:70,height:70,backgroundColor:Colors.imagebackcolor,borderRadius:7}}/> 
               </View>
             <View style={{paddingLeft:20,alignSelf:'center'}}>
                <Text style={{borderRadius:3,paddingBottom:4,color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category_name}</Text>    
               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>{item.item_name}</Text>
              <View style={{flexDirection:'row',paddingVertical:6}}>
                               <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                                   <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}numberOfLines={2}>{item.location}</Text>
                                 </View> 
              <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:14,paddingVertical:6}}>${item.item_price}</Text>
                  
             </View>
          </View>
        
          
                
        </View>
        {/* ..............................heaser finish................................ */}
   
    <View style={{width:'90%',alignSelf:'center',marginTop:15}}>
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View >
                 <Text style={{color:'black',fontFamily:'Ubuntu-Bold'}}>Overview</Text> 
                     
              </View>
               {/* <Image source={require('../icons/download.png')} style={{width:30,alignSelf:'center',height:30,borderRadius:5}}/> */}
           </View>
           <View style={{flexDirection:'row',width:'100%',marginTop:20,alignSelf:'center'}}>
             <View style={{backgroundColor:'#f7f7f7',alignSelf:'center',alignItems:'center',borderRadius:5,paddingVertical:20,width:'48%'}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:12,lineHeight:25}}>Total View</Text>  
<Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:15}}>{this.state.total_view_count}</Text>  
              </View>
             
           </View>
          
      
       <View style={{backgroundColor:'#FFFFFF',marginTop:13}}>
       <Text style={{color:'black',fontSize:14,paddingLeft:14,fontFamily:'Ubuntu-Medium',paddingVertical:10}}>Item Figures</Text>  
       <View style={{flexDirection:'row',paddingBottom:10,justifyContent:'space-between',paddingHorizontal:15}}>
       <View style={{flexDirection:'row',}}>
                <Icon1 name='circle' size={13} color={Colors.buttoncolor} style={{alignSelf:'center'}}/>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingLeft:10}}>Item Views</Text>  
         </View>
         {/* <View style={{flexDirection:'row',paddingRight:20}}>
                <Icon1 name='circle' size={13} color='green' style={{alignSelf:'center'}}/>
                <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingLeft:10}}>sale</Text>  
         </View> */}
         </View>
         <ScrollView horizontal={true}>
           
       <LineChart
      data={{
      labels:this.state.Monthcount,
      datasets: [
        {
         data:this.state.ViewCount,
         strokeWidth:2,
      },
    ],
  }}
  width={Dimensions.get('window').width - 40}

  onDataPointClick={(item)=>{this.getitemvalue(item)}}
  height={220}
  yAxisLabel={'Views '}

  bezier
  fromZero={true}
  withHorizontalLabels={true}
  
  segments={2}
  chartConfig={{
    backgroundColor: '#1cc910',
    backgroundGradientFrom: '#eff3ff',
    backgroundGradientTo: '#efefef',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 5,
    },
  }}
  style={{
    marginVertical: 8,
    borderRadius: 5,
  }}
/> 
</ScrollView>
</View>
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
        alignSelf:'center',
        borderRadius:6,
        paddingVertical:14,
        width:'90%',
    },
    buttonlayoutheader:{
      width:'100%',
      borderRadius:12,paddingVertical:15
    }
   
})