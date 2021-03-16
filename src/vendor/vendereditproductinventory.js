import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,TextInput,BackHandler,Keyboard,ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
export default class vendereditproductinventory extends Component{
    constructor(props) {
        super(props);
        this.state = { loading: false,
             player_id:'' ,
             HidePassword:false
            }
      
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
  <ScrollView style={{marginBottom:100}}>
        {/* //=----------------------header part---------=000------ */}
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:15,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
              <View style={{width:'100%',alignSelf:'center',}}>
                <Image source={require('../icons/b-logo.png')} style={{alignSelf:'center',width:screenWidth*33/100,height:30,resizeMode:'contain'}}/>
              </View>
          </View>
          
                
        </View>
        {/* ..............................heaser finish................................ */}
        <View style={{paddingHorizontal:20,paddingTop:30}}>
             <Text style={{fontSize:20,paddingBottom:8,fontFamily:'Ubuntu-Bold',color:'black'}}>Edit Product</Text>
             <Text style={{fontSize:14,paddingBottom:10,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}} numberOfLines={2}>Update details of your{"\n"}Products</Text>
        
             <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10}}>
            <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}> 
                 <View style={{width:'100%',alignSelf:'center'}}>
                    <Image source={require('../icons/business-image.png')} style={{alignSelf:'center',width:50,height:50}}/>
               </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'80%'}}> 
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>Product Photo</Text>
             <Text style={{color:'black',fontFamily:'Ubuntu-Light',lineHeight:17,fontSize:13}}>Dealdelivery uses the following data to personalize an adapt in real-time</Text>
          </View>
          
                
        </View>
       
       
        <View style={styles.inputcontainer}>
            
             <TextInput
                    placeholder='Product Name'
                    placeholderTextColor='gray'
                    keyboardType='email-address'
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onFocus={()=>{this.setState({errorno:0})}}
                    onChangeText={(txt)=>{this.setState({Email:txt})}}
                    maxLength={50}
                    value='t shirt'
                    style={styles.textfiledinput}
                   />
          </View>
          {this.state.errorno==1 && 
                    <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Please enter email</Text>
                   }

         
         <View style={styles.inputcontainer}>
            
            <TextInput
                   placeholder='Category'
                   placeholderTextColor='gray'
                   keyboardType='email-address'
                   returnKeyLabel='done'
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   value='Levis'
                   style={styles.textfiledinput}
                  />
         </View>
         {this.state.errorno==1 && 
                   <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Please enter email</Text>
                  }
     
      
      <View style={styles.inputcontainer}>
            
            <TextInput
                   placeholder='Price'
                   placeholderTextColor='gray'
                   keyboardType='number-pad'
                   returnKeyLabel='done'
                   returnKeyType='done'
                   onSubmitEditing={()=>{Keyboard.dismiss()}}
                   onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   value='100'
                   style={styles.textfiledinput}
                  />
         </View>
         {this.state.errorno==1 && 
                   <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Please enter email</Text>
                  }

<View style={styles.inputcontainer}>
            
            <TextInput
                   placeholder='Quantity'
                   placeholderTextColor='gray'
                   keyboardType='number-pad'
                   returnKeyLabel='done'
                         returnKeyType='done'
                         onSubmitEditing={()=>{Keyboard.dismiss()}}
                         onFocus={()=>{this.setState({errorno:0})}}
                   onChangeText={(txt)=>{this.setState({Email:txt})}}
                   maxLength={50}
                   value='1'
                   style={styles.textfiledinput}
                  />
         </View>
         {this.state.errorno==1 && 
                   <Text style={{color:Colors.headercolor,fontFamily:'Ubuntu-Medium',fontSize:13,paddingBottom:4}}>Please enter email</Text>
                  }    

         
                   <TextInput
                        
                           style={styles.Textarea_Style}
                            placeholder={'Describe your Product in details'}
                            ref={(ref)=>{this.discription=ref}}
                             placeholderTextColor={Colors.textcolor}
                            multiline={true}
                            onFocus={()=>{this.setState({errorno:0})}}
                            onSubmitEditing={()=>{Keyboard.dismiss()}}
                            returnKeyType="done"
                            returnKeyLabel="done"
                           underlineColorAndroid={'transparent'}
                            onChangeText={(txt) => this.setState({description:txt})}
                         />
                        {this.state.errorno==2 && 
                 <Text style={{color:'red',fontSize:14,paddingTop:4}}>Please enter description</Text>
                }
          
</View>
       {/* ........................................Container finish............................... */}
       </ScrollView>
       <View style={{position:"absolute",bottom:5,alignSelf:'center',width:'90%',}}>
       <TouchableOpacity activeOpacity={0.8} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center',marginTop:20}]} onPress={()=>{}}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
                    <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Edit Product</Text>
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
        marginTop:25,
        backgroundColor:'#FFFFFF',
        // elevation:2,
        // shadowOffset:{width:2,height:2},
        borderColor:Colors.inputborder,
        borderWidth:1.5,
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
         paddingLeft:20,
        paddingRight:50,
        fontSize:15,
        fontFamily:'Ubuntu-Medium',
        height:120,
        // backgroundColor:'#FFFFFF',
        justifyContent: "flex-start",
        // elevation:8,
        borderColor:Colors.inputborder,
      borderWidth:1.5,
        // borderBottomColor:'black',
        // borderBottomWidth:0.6,
        // shadowOpacity:0.9,
        // shadowOffset:{width:2,height:20},
        // borderColor:Colors.inputborder,
      // borderWidth:1.5,
        borderRadius:8,
        marginTop:10,
       
    },
   
})