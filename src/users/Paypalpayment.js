import React, { Component } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Colors from '../Colors';
import Loader from '../Loader';
import OneSignal from 'react-native-onesignal';
import {notification} from '../providers/NotificationProvider';
import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
export default class Paypalpayment extends Component {
    constructor(props){
        super(props)
        this.state={
            url_paypal:this.props.navigation.getParam('url_paypal'),
            order_id:this.props.navigation.getParam('order_id'),
            promote_data:this.props.navigation.getParam('promote_data'),
            loading:false,
            carddata:{},
            isConnected:true,
            refresh:false
           }
           OneSignal.init(config.onesignalappid, {
            kOSSettingsKeyAutoPrompt: true,
          });
      
          OneSignal.setLogLevel(6, 0);
    }
componentDidMount(){
  this.props.navigation.addListener('willFocus', payload => {
    console.log('payload',payload)
      if (payload.lastState.routeName == "Offersubmitted" && payload.action.type=='Navigation/BACK') {
         this.props.navigation.navigate('Userhome')
           }
      });
 console.log(this.state.buydata)
   }
   getorderdata=async(status)=>{
    let userdata=await localStorage.getItemObject('user_arr')
    let user_id=userdata.user_id
    if(this.state.isConnected===true)
    {
      var url = config.baseURL+'updateOrderDetails.php'
      let data=new FormData();
      data.append('user_id',userdata.user_id);
      data.append('order_id',this.state.order_id);
      data.append('user_type',1);
      data.append('payment_type',status);
        console.log("url:"+url);
        console.log('data',data)
    if(this.state.refresh==false)
       {
        this.setState({user_id:userdata.user_id,loading:true,})
       }
     fetch(url,{
        method: 'POST',
        headers: new Headers(config.headersapi), 
        body:data,
        }).then((obj)=>{ console.log('obj',obj);   this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
           console.log('obj',obj)
            if(obj.success == 'true'){
             if(obj.notification_arr!='NA')
                        {
                          notification.notificationfunction(obj.notification_arr[0].message,obj.notification_arr[0].action_json,obj.notification_arr[0].player_id,obj.notification_arr[0].title)
                        }
              if(obj.notification_arr1!='NA')
                 { 
                        notification.notificationfunction(obj.notification_arr1[0].message,obj.notification_arr1[0].action_json,obj.notification_arr1[0].player_id,obj.notification_arr1[0].title)
                 }
                  this.props.navigation.navigate('Offersubmitted')
               } 
           else{
              // msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
              if(obj.account_active_status=="deactivate")
              {
                this.props.navigation.navigate('Logout')
             }
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
  paymentbtn=async()=>{
    
   let userdata=await localStorage.getItemObject('user_arr')
   let user_id=userdata.user_id
   let item=this.state.promote_data
   this.setState({loading:true})
   let data =new FormData();
    data.append('user_id',user_id)
    data.append('wallet_amount',item.wallet_amount)
    data.append('paypal_amount',item.paypal_amount)
    
     data.append('promotion_amount',item.promotion_amount)
    data.append('start_date',item.start_date)
    data.append('item_id',item.item_id)
    data.append('promotion_day',item.promotion_day)
    var url = config.baseURL+'add_promoting.php'
    console.log("url:"+url);
    console.log("data:",data);
   
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
            this.props.navigation.navigate('Userhome')
          } 
          else{
            
                // msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
            return false;
       }
     }).catch((error)=> {
       console.log("-------- error ------- "+error);
       msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
         this.setState({loading:false});
   });
  
  } 

 _onNavigationStateChange(webViewState){
    webViewState.canGoBack=false
    if(webViewState.loading==false)
    {
     console.log('webViewState',webViewState);
     console.log(webViewState.url)
     var t=webViewState.url.split('/').pop().split('?')[0]
     if(typeof(t)!=null){
     var p=webViewState.url.split('?').pop().split('&')
     console.log('file name',t);
     if(t == 'paypal_success_final.php'){
        console.log('parameter',p);
        var order_id = 0;
       let cartcount=0
        console.log('p.length',p.length);
         for(var i=0; i<p.length; i++){
         var val = p[i].split('=');
         console.log('val',val);
         if(val[0] == 'order_id'){
           order_id =val[1]
         }
    }
    if(this.state.promote_data!=null)
    {
      this.paymentbtn()
    }
    else{
      this.getorderdata('pay')
    }
   
      //   this.props.navigation.navigate('Succesfullorder',{'order_id':order_id})
    }
     else if(t=='paypal_cancel.php'){
         msgProvider.alert(msgTitle.information[config.language],'Payment unsuccessful',false);
         this.props.navigation.navigate('Paymentdeliverydetailes')
       }
    }
  }}
  render() {
   const runFirst = `
      setTimeout(function() { window.alert('hi') }, 2000);
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return (
      <View style={{ flex: 1 }}>
          <Loader loading={this.state.loading} />
        <WebView
          source={{
              uri:this.state.url_paypal
            }}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          javaScriptEnabled = {true}
          domStorageEnabled = {true}
          // injectedJavaScript = {this.state.cookie}
          startInLoadingState={false}
          style={{marginTop: 20}}
          // containerStyle={{ marginTop: 20 }}
          // injectedJavaScript={runFirst}
          // androidHardwareAccelerationDisabled={true}
          // allowUniversalAccessFromFileURLs={true}
          // allowingReadAccessToURL={true}
          // keyboardDisplayRequiresUserAction={false}
          // allowFileAccess={true}
          // textZoom={100}
          // onMessage={this.onMessage}
          // onNavigationStateChange={(navEvent)=> console.log(navEvent.jsEvaluationValue)}
          // onMessage={(event)=> console.log(event.nativeEvent.data)}
        />
      </View>
    );
  }
}