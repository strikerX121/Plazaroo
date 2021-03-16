import React,{Component} from 'react';
import {Text,View,Image,TextInput,StyleSheet,ScrollView,Switch,TouchableOpacity,Dimensions,Alert,FlatList} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class Venderfooter extends Component{
    constructor(props){
        super(props)
        this.state={
            color:''
        }
    }
   
    render(){
        const navigation=this.props.navigation;
        return(
            <View style={style1.footercontainer}>
                
               {this.props.color=='home'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Vendorhome')}}>
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f-home-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Home</Text>
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Vendorhome')}}>
              <View style={style1.footericonview}>
              <Image source={require('../icons/f-home.png')}  resizeMethod='resize' style={style1.footerimage}/>
              <Text style={style1.footertext}>Home</Text>
              </View>
            </TouchableOpacity>
               }
               
               {this.props.color=='inventary'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Vendorinventary')}}>
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f-inventory-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Inventory</Text>
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{selleraddress='NA';navigation.navigate('Vendorinventary')}}>
              <View style={style1.footericonview}>
              <Image source={require('../icons/f-inventory.png')}  resizeMethod='resize' style={style1.footerimage}/>
                  <Text style={style1.footertext}>Inventory</Text>
              </View>
            </TouchableOpacity>
               }
             
              {this.props.color=='orders'? <TouchableOpacity activeOpacity={0.8} style={style1.footericon} onPress={()=>{navigation.navigate('Venderorders')}}>
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f-orders-a.png')}  resizeMethod='resize' style={style1.footerimage}/>
                       <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Orders</Text>
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Venderorders')}}>
              <View style={style1.footericonview}>
              <Image source={require('../icons/f-orders.png')}  resizeMethod='resize' style={style1.footerimage}/>
                  <Text style={style1.footertext}>Orders</Text>
              </View>
            </TouchableOpacity>
               }
            {this.props.color=='profile'?<TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} >
                   <View style={style1.footericonview}>
                   <Image source={require('../icons/f-profile-a.png')}  resizeMethod='resize' style={style1.footerimage} onPress={()=>{navigation.navigate('Vendor_profile')}}/>
                       <Text style={[style1.footertext,{color:Colors.buttoncolor}]}>Profile</Text>
                   </View>
               </TouchableOpacity>:
               <TouchableOpacity activeOpacity={0.8} style={[style1.footericon]} onPress={()=>{navigation.navigate('Vendor_profile')}}>
               <View style={style1.footericonview}>
               <Image source={require('../icons/f-profile.png')}  resizeMethod='resize' style={style1.footerimage}/>
                   <Text style={style1.footertext}>Profile</Text>
               </View>
           </TouchableOpacity>}
             
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
            width:screenWidth*25/100,
            paddingVertical:15
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