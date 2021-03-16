import React,{Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,RefreshControl,TextInput,refreshControl,BackHandler,ToastAndroid, ScrollView,TouchableOpacity,StatusBar} from 'react-native';
import Colors from '../Colors'
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import UserFooter from './UserFooter'
import NetInfo from '@react-native-community/netinfo';
import Loader from '../Loader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Icon from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/AntDesign'
import Icon2 from 'react-native-vector-icons/EvilIcons'
import { FlatList } from 'react-native-gesture-handler';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
const Promote_offer=[{'day':'1 day promote',status:false,price:'$20'},
{'day':'2 day promote',status:false,price:'$30'},
{'day':'3 day promote',status:false,price:'$50'},
{'day':'4 day promote',status:false,price:'$70'}
]
 
export default class Promot_item extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            promote_data:this.props.navigation.getParam('promote_data'),
           isConnected:true,
           Promote_offer:Promote_offer,
           promoting_arr:[],
           walletcheck:false,
           user_wallet:0,
           promoting_id:'',
           promoting_price:0,
           payment_mode:1,
           wallet_pad:0,
           paid_amount:0,
           promoting_product_arr:'NA',
           amount:0,
           promote_date:'',
           promotion_day:'',
           openDate:false,
            loading:false,
            refresh:false,
        
            }
     }
    componentDidMount(){
      NetInfo.fetch().then(state => {
        this.setState({isConnected:state.isConnected}) });
      //Subscribe to network state updates
       const unsubscribe = NetInfo.addEventListener(state => {
       this.setState({isConnected:state.isConnected})
        });
        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener('didFocus', () => {
        //   this.getPromtedata()
        //  });
        this.getPromtedata()
     }
     getPromtedata = async(item) => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
    let user_id=userdata.user_id
    let item_id=this.state.promote_data.item_id
     if(this.state.isConnected===true)
          {
      this.setState({ loading: true,user_id:user_id});
         var url = config.baseURL+'get_promoting.php?user_id='+user_id+'&user_type=1&item_id='+item_id
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
                  this.setState({promoting_arr:obj.promoting_arr,user_wallet:obj.user_wallet, promoting_product_arr:obj.promoting_product_arr})
            }else{
               msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
               if(obj.account_active_status=="deactivate")
               {
                  this.props.navigation.navigate('Logout')
               }
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

    choosedatebtn1=(res)=>{
        let date=res.getDate()
        let month=res.getMonth()+1
        let year=res.getFullYear()
        let date1=year+'-'+month+'-'+date
        console.log('d',date1)
         this.setState({promote_date:date1,openDate:false})
          }

   selectpromote=(index)=>{
              let data=this.state.promoting_arr
              console.log('data',data)
              for(let i=0; i<data.length; i++)
              {
                   if(i==index)
                   {
                       data[i].status=true
                   }
                   else{
                    data[i].status=false
                   }
              }
              this.setState({promoting_arr:data,promoting_id:data[index].promoting_id,promoting_price:data[index].promoting_price,promotion_day:data[index].promoting_days})
       }
       walletpaymentfunction=()=>{
        if(this.state.user_wallet!=0)
        {
           if(this.state.promoting_id.length<=0)
            {
              msgProvider.alert(msgTitle.information[config.language],"Before use wallet please select promote", false);
              return false
           }
          else{
               this.setState({walletcheck:true})
             
                let amount=this.state.promoting_price
                console.log('amoun1645',amount)
                 if(amount>this.state.user_wallet)
                   {
                    let remamount=(parseFloat(amount)-parseFloat(this.state.user_wallet)).toFixed(2)
                     console.log('pad_amount',remamount)
                     this.setState({paid_amount:remamount,payment_mode:2,wallet_pad:this.state.user_wallet})
                   }
                  else if(amount<=this.state.user_wallet)
                  {
                   console.log('pad_amount2more',amount)
                   let remamount=(parseFloat(this.state.user_wallet)-parseFloat(amount)).toFixed(2)
                    console.log('pad_amount2more',amount)
                    this.setState({paid_amount:0,wallet_pad:amount,payment_mode:0})
                  }
                console.log('amount',amount)
              
             
             }
         
        }
        else{
            msgProvider.alert(msgTitle.information[config.language],"You have not sufficient amount in your wallet", false);
           }
        
         
       } 

    

       
       Paypalmethodbtn=async(order_arr)=>{
    
        let userdata=await localStorage.getItemObject('user_arr')
        if(this.state.promoting_id.length<=0)
        {
         msgProvider.alert(msgTitle.information[config.language],"please select promote", false);
         return false
        }
        if(this.state.promote_date.length<=0)
        {
         msgProvider.alert(msgTitle.information[config.language],"please select promote date", false);
         return false
        }
         let user_id=userdata.user_id
        let event_id=this.state.promote_data.item_id
         let amount
        if(this.state.walletcheck==false)
        {
           amount=this.state.promoting_price
        }
        else{
         amount=this.state.paid_amount
        }
  
        var url = config.baseURL+'paypal/paypal_payment_url.php?user_id='+user_id+'&amount='+amount+'&event_id='+event_id+'&currency=USD'+'&type=item'
        console.log("url:"+url);
        this.setState({loading:true})
         fetch(url,{
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
                  'Pragma': 'no-cache',
                  'Expires': 0,
                  Accept: 'application/json',
                 'Content-Type': 'multipart/form-data',
           },
         
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
                 console.log('og',obj)
                 let payment_mode
                 let paypal_amount
                 if(this.state.walletcheck==false)
                 {
                    payment_mode=1
                   paypal_amount=this.state.promoting_price
                 }
                 else{
                  payment_mode=this.state.payment_mode
                  paypal_amount=this.state.paid_amount
                 }
                 let promote_data={
                  'promotion_amount':this.state.promoting_price,
                  'start_date':this.state.promote_date,
                  'item_id':this.state.promote_data.item_id,
                  'promotion_day':this.state.promotion_day,
                 'paypal_amount':paypal_amount,
                 'payment_mode':payment_mode,
                 'wallet_amount':this.state.wallet_pad
                 }
                 console.log('promote_data',promote_data)
                 
                 this.props.navigation.navigate('Paypalpayment',{'url_paypal':obj.data.links[1].href,'order_id':this.state.promote_data.item_id,'promote_data':promote_data})
              } 
              else{
                
                    msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({loading: false});
       });
      
      }   
       paymentbtn=async()=>{
    
        let userdata=await localStorage.getItemObject('user_arr')
         let user_id=userdata.user_id
       if(this.state.promoting_id.length<=0)
       {
        msgProvider.alert(msgTitle.information[config.language],"please select promote", false);
        return false
       }
       if(this.state.promote_date.length<=0)
       {
        msgProvider.alert(msgTitle.information[config.language],"please select promote date", false);
        return false
       }
        let data =new FormData();
        data.append('user_id',user_id)
        data.append('wallet_amount',this.state.wallet_pad)
        if(this.state.walletcheck==false)
        {
          data.append('payment_mode',1)
          data.append('paypal_amount',this.state.promoting_price)
        }
        else{
          data.append('payment_mode',this.state.payment_mode)
          data.append('paypal_amount',this.state.paid_amount)
        }
         data.append('promotion_amount',this.state.promoting_price)
        data.append('start_date',this.state.promote_date)
        data.append('item_id',this.state.promote_data.item_id)
        data.append('promotion_day',this.state.promotion_day)
        var url = config.baseURL+'add_promoting.php'
        console.log("url:"+url);
        console.log("data:",data);
        this.setState({loading:true})
         fetch(url,{
            method: 'POST',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
                  'Pragma': 'no-cache',
                  'Expires': 0,
                  Accept: 'application/json',
                 'Content-Type': 'multipart/form-data',
           },
         body:data
          }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false});    return  obj.json();}).then((obj)=>{
         console.log('obj',obj)
             if(obj.success == 'true'){
                 console.log('og',obj)
                 ToastAndroid.showWithGravityAndOffset(
                  obj.msg[config.language],
                  ToastAndroid.LONG,
                  ToastAndroid.CENTER,
                  25,
                  50
                );
                this.props.navigation.navigate('Userhome')
                
              } 
              else{
                
                    msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
                return false;
           }
         }).catch((error)=> {
           console.log("-------- error ------- "+error);
           msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
             this.setState({loading: false});
       });
      
      }    


      checkcondition=()=>{
        if(this.state.promoting_id.length<=0)
        {
         msgProvider.alert(msgTitle.information[config.language],"please select promote", false);
         return false
        }
        if(this.state.promote_date.length<=0)
        {
         msgProvider.alert(msgTitle.information[config.language],"please select promote date", false);
         return false
        }

             if(this.state.payment_mode!=0)
             {
               this.Paypalmethodbtn()
             }
             else{
               this.paymentbtn()
             }
        
      }
    render(){
        console.log('cikasd')
        let  item=this.state.promote_data
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
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:20,borderBottomWidth:0.6,borderBottomColor:'#dbdbd9'}}>
         <TouchableOpacity style={{paddingVertical:17,width:'15%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:12,height:15}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'70%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:15,textAlign:'center'}}>Promote your item on OfferUp </Text>
          </View>
          </View>
        {/* ..............................heaser finish................................ */}
    
           
   {/* """"""""""""""""""""""""""""""""""""""""""header button finis""""""""""""""""""""""""""""""""" */}
   <ScrollView style={{marginBottom:100}}>
   <View style={{width:'100%',alignSelf:'center'}}>

                                <View style={{width:'95%',borderBottomWidth:1,paddingTop:20,borderBottomColor:'#f5f5f5',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',borderRadius:5,paddingHorizontal:10}}>
                              <View style={{flexDirection:'row',width:'100%',paddingVertical:13}}>
                              <View style={{width:'32%',alignSelf:'center',height:'auto',backgroundColor:'#e8e8e8'}}>
                                  <Image source={item.item_images!='NA'?{uri:config.img_url1+item.item_images[0].image}:require('../icons/noimage.png')} style={{alignSelf:'center',width:'100%',height:100,backgroundColor:Colors.imagebackcolor,borderRadius:7}}/>
                                </View>
                                <View style={{width:'65%',height:'auto',marginLeft:'3%'}}>  
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                   <Text style={{color:Colors.buttoncolor,borderRadius:3,backgroundColor:'#fae6fa',padding:4,fontFamily:'Ubuntu-Medium',fontSize:13}}>{item.category_name}</Text>    
                                  {/* <View style={{flexDirection:'row',}}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Promot_item')}}>
                                  <Text style={{color:'black',fontFamily:'Ubuntu-Medium',paddingRight:20,fontSize:14}}>Ad</Text>
                                  </TouchableOpacity> 
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Myoffersellingedit',{'item_id':item.item_id})}}>
                                       <Image source={require('../icons/edit-border.png')} style={{alignSelf:'center',width:15,height:20,}}/>
                                   </TouchableOpacity>
                                   </View> */}
                                 </View> 
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',paddingTop:7,fontSize:13}}>{item.item_name}</Text>
                               <View style={{flexDirection:'row',paddingVertical:6}}>
                               <Image source={require('../icons/address1.png')} style={{alignSelf:'center',width:15,height:15,}}/>    
                                   <Text style={{color:'gray',paddingLeft:6,fontFamily:'Ubuntu-Regular',fontSize:13}}>{item.location}</Text>
                                 </View> 
                                 <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:13}}>${item.item_price}</Text>
                                
                                 </View>  
                                 </View>  
                             </View>
                             {this.state.promoting_product_arr!='NA' &&
                             <View style={{width:'90%',alignSelf:'center',paddingBottom:10,marginBottom:10,}}>
           <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16}}>Promoted History</Text>                         
           <FlatList
               data={this.state.promoting_product_arr}
              
                 renderItem={({item,index})=>{
                  if(this.state.promoting_product_arr!='NA')
                   {
                   return(
                       <View style={{paddingBottom:10,width:'100%',borderBottomColor:'#f2f2f2',borderBottomWidth:1,alignSelf:'center'}} >
                     <View style={{paddingVertical:10,width:'100%',alignSelf:'center'}}>
                     <View style={{flexDirection:'row',paddingBottom:5,justifyContent:'space-between'}}>
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Medium'}}>Promote Days:</Text>    
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Regular'}}>{item.promotion_day} day</Text>     
     
                          </View>

                     <View style={{flexDirection:'row',paddingBottom:5,justifyContent:'space-between'}}>
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Medium'}}>Promote Price:</Text>    
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Regular'}}>{item.promotion_amount}</Text>     
     
                          </View>
                     <View style={{flexDirection:'row',paddingBottom:5,justifyContent:'space-between'}}>
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Medium'}}>Start Date:</Text>    
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Regular'}}>{item.start_date}</Text>     
     
                          </View>
                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Medium'}}>End Date:</Text>    
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Regular'}}>{item.end_date}</Text>     
     
                          </View>
                        {item.promoting_status=='Active' &&  <View style={{width:'40%',borderRadius:30,marginTop:7,alignSelf:'flex-end',backgroundColor:Colors.buttoncolor}}>
                          <Text style={{paddingLeft:10,paddingVertical:4,color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Medium'}}>Active</Text>    
                             </View>}
                             {item.promoting_status=='Not Active' &&  <View style={{width:'40%',borderRadius:30,marginTop:7,alignSelf:'flex-end',backgroundColor:Colors.buttoncolor,opacity:0.6}}>
                          <Text style={{paddingLeft:10,paddingVertical:4,color:'#FFFFFF',textAlign:'center',fontFamily:'Ubuntu-Medium'}}>Not Active</Text>    
                             </View>}
                  </View>
                  </View>
                    )
                }}  
            }
            />
            </View>
         }
        <View style={{width:'90%',alignSelf:'center',borderBottomColor:'#f2f2f2',paddingBottom:10,borderBottomWidth:1}}>
           <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16}}>Select promote</Text>                         
           <FlatList
               data={this.state.promoting_arr}
               numColumns={2}
                 renderItem={({item,index})=>{
                  if(this.state.promoting_arr!='NA')
                   {
                   return(
                       <TouchableOpacity style={{paddingVertical:10,width:'50%',alignSelf:'center'}} onPress={()=>{this.selectpromote(index)}}>
                     <View style={{paddingVertical:10,width:'100%',alignSelf:'center'}}>
                 
                     <View style={{flexDirection:'row',alignSelf:'center'}}>
                          
                              {item.status==false && <Icon3 name='checkbox-blank-outline' size={24} color='gray' style={{alignSelf:'center'}}/>}
                              {item.status==true && <Icon3 name='check-box-outline' size={24} color={Colors.buttoncolor} style={{alignSelf:'center',}}/>}
                            
                     <View style={{alignSelf:'center'}}>
                              <Text style={{paddingLeft:8,fontFamily:'Ubuntu-Medium',color:'gray',lineHeight:20}}>{item.promoting_days} day promote</Text>    
                          <Text style={{paddingLeft:10,fontFamily:'Ubuntu-Medium'}}>${item.promoting_price}</Text>    
                         </View>
                     </View>
                  </View>
                  </TouchableOpacity>
                    )
                }}  
            }
            />
            </View>
            <View style={{width:'90%',alignSelf:'center',borderBottomColor:'#f2f2f2',paddingVertical:10,borderBottomWidth:1}}>
             <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:16}}>Select promote date</Text> 
             <DateTimePickerModal
                       isVisible={this.state.openDate}
                       mode="date"
                       date={new Date()}
                       minimumDate={new Date()}

                       onConfirm={(date)=>{this.choosedatebtn1(date)}}
                       onCancel={()=>{this.setState({openDate:false})}}
                              />
                               <TouchableOpacity onPress={()=>{this.setState({openDate:true})}}>
                  
                  <View style={{flexDirection:'row',paddingTop:15,paddingBottom:15,justifyContent:'space-between'}}>
                    <Text style={{color:'black',fontSize:16,fontFamily:'Ubuntu-Medium'}}>{this.state.promote_date.length<=0?'Promote Date':this.state.promote_date}</Text>
                      <Icon2 name='calendar' size={20} color={Colors.Buttoncolor}/>
                  </View>
                 </TouchableOpacity>
           
            </View>
           {this.state.Buying==true &&
             <View style={{marginTop:30}}>
             {this.state.my_all_order_arr=='NA' &&
                   
                   <Text style={{color:'black',textAlign:'center',fontFamily:'Ubuntu-Regular',alignSelf:'center',fontSize:15,paddingTop:20}}>Currently orders are not available</Text> 
                  }
              <FlatList
               data={this.state.my_all_order_arr}
               renderItem={({item,index})=>{
                 if(this.state.my_all_order_arr!='NA')
                 {
                  return(
                   <TouchableOpacity activeOpacity={0.9} onPress={()=>{this.props.navigation.navigate('Mybuyingproductdetaile',{'order_id':item.order_id})}}>
                    <View style={{width:'95%',alignSelf:'center',marginBottom:12,backgroundColor:'#FFFFFF',elevation:2,paddingVertical:14,borderRadius:5,paddingHorizontal:10}}>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Bold',fontSize:14}}>Order no: {item.order_no}</Text>
                               <Text style={{color:'black',fontFamily:'Ubuntu-Regular',paddingVertical:7,fontSize:13}}>{item.createtime}</Text>
                                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                {item.order_status==0 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>Process</Text>}
                               {item.order_status==10 && <Text style={{color:'#08bd41',fontFamily:'Ubuntu-Medium',fontSize:12}}>On the way</Text>}
                               {item.order_status==1 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Pickup</Text>}
                               {item.order_status==2 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Shipped</Text>}
                               {item.order_status==3 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Delivered</Text>}
                               {item.order_status==4 && <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:12}}>Item Sold</Text>}
                               {item.order_status==6 && <Text style={{color:'#e31238',fontFamily:'Ubuntu-Medium',fontSize:12}}>Cancelled</Text>}     
                                          <Text style={{color:'black',fontFamily:'Ubuntu-Regular',fontSize:13}}>item x {item.item_count}= <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium'}}>${item.total_amt}</Text></Text>
                                 </View>     
                    </View>
                    </TouchableOpacity>
                  )
                 }
               }}
               keyExtractor={(item, index) => index.toString()}
              />
            </View>
           }

          


  

         </View>
         <View style={{borderBottomWidth:1,borderBottomColor:Colors.inputborder,paddingTop:20,paddingBottom:10,width:'95%',alignSelf:'center'}}>
                 <TouchableOpacity onPress={()=>{this.state.walletcheck==false?this.walletpaymentfunction():this.setState({walletcheck:false,wallet_pad:0})}}>
                 <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
                    {this.state.walletcheck==true?<Icon4 name='checksquare' size={30} color={Colors.buttoncolor}/>:
                 < Icon3 name='checkbox-blank-outline' size={30} color={Colors.textlight}/>}
                  <Text style={{fontSize:15,fontWeight:'bold',color:'gray'}}>Use wallet amount{this.state.user_wallet!=0?'($'+this.state.user_wallet+')':'($0)'}</Text>
                 </View>
                 </TouchableOpacity>
              </View>
         </ScrollView>
         <View style={{position:'absolute',bottom:6,left:0,right:0,}} >
          <TouchableOpacity activeOpacity={0.8} onPress={()=>{this.checkcondition()}} style={[styles.button,{backgroundColor:Colors.buttoncolor,alignItems:'center'}]}>
               <View style={{flexDirection:'row',alignSelf:'center',alignItems:'center',paddingHorizontal:10,}}>
               <Text style={{fontFamily:'Ubuntu-Bold',textAlign:'center',fontSize:16,paddingLeft:14,alignSelf:'center',color:'#FFFFFF',}}>Pay ${this.state.walletcheck==false?this.state.promoting_price:this.state.paid_amount}</Text>
                </View>
            </TouchableOpacity>
          
                       
                </View> 
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
      alignSelf:'center',
      paddingVertical:15,
      borderBottomWidth:1,
      borderBottomColor:'#e8e8e8'
    },
   
   
})