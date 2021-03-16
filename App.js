import React from 'react';
import { Button, View, Text, Alert,StatusBar,SafeAreaView, Switch} from 'react-native';
import { createAppContainer,NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from './src/Colors';
import { firebaseprovider}  from './src/providers/FirebaseProvider';
import Splash from './src/Splash';
import Welcome from './src/Welcome';
import Vendorlogin from './src/vendor/Vendorlogin';
import Vendorforgate from './src/vendor/Vendorforgate';
import Vendorcheckmail from './src/vendor/Vendorcheckemail';
import VenderRecoverpassword from './src/vendor/VenderRecoverpassword';
import Vendorsignup from './src/vendor/Vendorsignup';
import VendorAddbussiness from './src/vendor/VendorAddbussiness';
import Vendorsuccess from './src/vendor/Vendorsuccess';
import Venderorders from './src/vendor/Venderorders';
import Vendorinventary from './src/vendor/Vendorinventary';
import Vendororderdetaile from './src/vendor/Vendororderdetaile';
import Vendorhome from './src/vendor/Vendorhome';
import Vendoraddproduct from './src/vendor/Vendoraddproduct';
import Uploadprofile from './src/users/Uploadprofile';
import Readtytogo from './src/users/Readtytogo';
import Userhome from './src/users/Userhome';
import Homeproductdetaile from './src/users/Homeproductdetaile';
import Productmakeoffer from './src/users/Productmakeoffer';
import Reviewyouroffer from './src/users/Reviewyouroffer';
import Paymentdeliverydetailes from './src/users/Paymentdeliveydetailes';
import Addadress from './src/users/Addadress';
import Addcreditcard from './src/users/Addcreditcard';
import Offersubmitted from './src/users/Offersubmitted';
import Postanitem from './src/users/Postanitem';
import Postitemdetails from './src/users/Postitemdetails';
import Itemadded from './src/users/Itemadded';
import Mylisting from './src/users/Mylisting';
import Filtersproduct from './src/users/Filtersproduct';
import Invitefriend from './src/users/Invitefriend';
import Setting from './src/users/Setting';
import Language from './src/users/Language';
import Termscondition from './src/users/Termscondition';
import Helpsupport from './src/users/Helpsupport';
import Changepassword from './src/users/Changepassword';
import Talkwithashelp from './src/users/Talkwithashelp';
import Message from './src/users/Message';
import Messagedetaile from './src/users/Messagedetaile';
import Profile from './src/users/Profile';
import Myoffer from './src/users/Myoffer';
import Notification from './src/users/Notification';
import Viewoffers from './src/users/Viewoffers';
import Reviewseller from './src/users/Reviewseller';
import Wishlist from './src/users/Wishlist';
import Account from './src/users/Account';
import Youraddress from './src/users/Youraddress';
import Paymentmethod from './src/users/Paymentmethod';
import Myorderuser from './src/users/Myorderuser';
import Orderdetailuser from './src/users/Orderdetailuser';
import Userlogin from './src/users/Userlogin';
import Usersignup from './src/users/Usersignup';
import Userforgatepassword from './src/users/Userforgatepassword';
import Usercheckmail from './src/users/Usercheckmail';
import Userrecoverpassword from './src/users/Userrecoverpassword';
import Usereditprofile from './src/users/Usereditprofile';
import Contactus from './src/users/Contactus';
import Notification_setting from './src/users/Notification_setting';
import Vendor_profile from './src/vendor/Vendor_profile';
import vendereditproductinventory from './src/vendor/vendereditproductinventory';
import Myoffersellingedit from './src/users/Myoffersellingedit';
import EditAddress from './src/users/EditAddress';
import Vendernotification from './src/vendor/Vendernotification';
import Homecategorypage from './src/users/Homecategorypage';
import Hometoptabbuttonpage from './src/users/Hometoptabbuttonpage';
import Referralcode from './src/users/Referralcode';
import Vendorinventrydetail from './src/vendor/Vendorinventrydetail';
import VendorContactus from './src/vendor/VendorContactus';
import VendorTearmscondition from './src/vendor/VendorTearmscondition';
import Logout from './src/Logout';
import Addaddressgoogle from './src/users/Addaddressgoogle';
import Fullviewimage from './src/users/Fullviewimage';
import Vendorpostitem from './src/vendor/Vendorpostitem';
import Vendorpostdetaile from'./src/vendor/Vendorpostdetaile';
import Homesearchpage from './src/users/Homesearchpage';
import Homefiltersearchdata from './src/users/Homefiltersearchdata';
import Paypalpayment from './src/users/Paypalpayment';
import Viewprofilepage from './src/users/Viewprofilepage';
import Usersellingproductdetaile from './src/users/Usersellingproductdetaile';
import Mybuyingproductdetaile from './src/users/Mybuyingproductdetaile';
import UserWallet from './src/users/UserWallet';
import Addaccount from './src/users/Addaccount';
import Showaccount from './src/users/Showaccount';
import Editaccount from './src/users/Editaccount';
import Promot_item from './src/users/Promot_item';
import Performance_item from './src/users/Performance_item';
import Paymentsubmit from './src/users/Paymentsubmit';
import Followunfolowuserlist from './src/users/Followunfolowuserlist';
const RootStack = createStackNavigator(
  {
   Splash:Splash,
   Welcome:Welcome,
   Vendorlogin:Vendorlogin,
   Vendorforgate:Vendorforgate,
   Vendorcheckmail:Vendorcheckmail,
   VenderRecoverpassword:VenderRecoverpassword,
   Vendorsignup:Vendorsignup,
   VendorAddbussiness:VendorAddbussiness,
   Vendorsuccess:Vendorsuccess,
   Venderorders:Venderorders,
   Vendorinventary:Vendorinventary,
   Vendororderdetaile:Vendororderdetaile,
   Vendorhome:Vendorhome,
   Vendoraddproduct:Vendoraddproduct,
   Uploadprofile:Uploadprofile,
   Readtytogo:Readtytogo,
   Userhome:Userhome,
   Homeproductdetaile:Homeproductdetaile,
   Productmakeoffer:Productmakeoffer,
   Reviewyouroffer:Reviewyouroffer,
   Paymentdeliverydetailes:Paymentdeliverydetailes,
   Addadress:Addadress,
   Addcreditcard:Addcreditcard,
   Offersubmitted:Offersubmitted,
   Postanitem:Postanitem,
   Postitemdetails:Postitemdetails,
   Itemadded:Itemadded,
   Mylisting:Mylisting,
   Filtersproduct:Filtersproduct,
   Invitefriend:Invitefriend,
   Setting:Setting,
   Language:Language,
   Termscondition:Termscondition,
   Helpsupport:Helpsupport,
   Changepassword:Changepassword,
   Talkwithashelp:Talkwithashelp,
   Message:Message,
   Messagedetaile:Messagedetaile,
   Profile:Profile,
   Myoffer:Myoffer,
   Notification:Notification,
   Viewoffers:Viewoffers,
   Reviewseller:Reviewseller,
   Wishlist:Wishlist,
   Account:Account,
   Youraddress:Youraddress,
   Paymentmethod:Paymentmethod,
   Myorderuser:Myorderuser,
   Orderdetailuser:Orderdetailuser,
   Userlogin:Userlogin,
   Usersignup:Usersignup,
   Userforgatepassword:Userforgatepassword,
   Usercheckmail:Usercheckmail,
   Userrecoverpassword:Userrecoverpassword,
   Usereditprofile:Usereditprofile,
   Contactus:Contactus,
   Notification_setting:Notification_setting,
   Vendor_profile:Vendor_profile,
   vendereditproductinventory:vendereditproductinventory,
   Myoffersellingedit:Myoffersellingedit,
   EditAddress:EditAddress,
   Vendernotification:Vendernotification,
   Homecategorypage:Homecategorypage,
   Hometoptabbuttonpage:Hometoptabbuttonpage,
   Referralcode:Referralcode,
   Vendorinventrydetail:Vendorinventrydetail,
   VendorContactus:VendorContactus,
   VendorTearmscondition:VendorTearmscondition,
   Logout:Logout,
   Addaddressgoogle:Addaddressgoogle,
   Fullviewimage:Fullviewimage,
   Vendorpostitem:Vendorpostitem,
   Vendorpostdetaile:Vendorpostdetaile,
   Homesearchpage:Homesearchpage,
   Homefiltersearchdata:Homefiltersearchdata,
   Paypalpayment:Paypalpayment,
   Viewprofilepage:Viewprofilepage,
   Usersellingproductdetaile:Usersellingproductdetaile,
   Mybuyingproductdetaile:Mybuyingproductdetaile,
   UserWallet:UserWallet,
   Addaccount:Addaccount,
   Showaccount:Showaccount,
   Editaccount:Editaccount,
   Promot_item:Promot_item,
   Performance_item:Performance_item,
   Paymentsubmit:Paymentsubmit,
   Followunfolowuserlist:Followunfolowuserlist,
   
  },
    {
      initialRouteName:'Splash',
      defaultNavigationOptions: {
      headerShown: false,
      mode: 'modal',
      // gesturesEnabled: false,
      transparentCard: true,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    },
  },
  

);


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  componentDidMount(){
   firebaseprovider.getAllUsers()
  }
render() {
    return (
      
        <SafeAreaView style={{flex:1,backgroundColor:Colors.statuscolor}}>
        <StatusBar 
           hidden = {false}
           backgroundColor = {Colors.statuscolor}
           translucent = {false}
           networkActivityIndicatorVisible = {true}
        />
        <AppContainer/>
        </SafeAreaView>
     
        
      );
  }
}
