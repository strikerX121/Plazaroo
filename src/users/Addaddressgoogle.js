import React,{Component} from 'react';
import {View,Text,StyleSheet,ImageBackground,ToastAndroid,Dimensions,ScrollView,Modal,TouchableOpacity,Image,TextInput,FlatList} from 'react-native';
import Colors from '../Colors';

import { config } from '../providers/configProvider';
import { localStorage }  from '../providers/localStorageProvider';
import { msgProvider, msgTitle, msgText } from '../providers/messageProvider';
import MapView, {Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import Loader from '../Loader';
import Icon2 from 'react-native-vector-icons/Entypo'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
 const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default class Addaddressgoogle extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            modalVisible1:false,
            addressbar2:false,
          addressbar:false,
          isConnected:true,
          messagepage:this.props.navigation.getParam('messagepage'),
          location_page:this.props.navigation.getParam('location_page'),
          order_id:this.props.navigation.getParam('order_id'),
          addressselected:"Search",
          latitude:'22.7165',
          latdelta:'0.0922',
          longdelta:'0.0421',
          longitude:'75.8307',
          username:'',
          address:'',
        };
      }
      setMapRef = (map) => {
        this.map = map;
      }
      getCoordinates=(region)=>{
        console.log("region",region)
        return( {
          latitude: parseFloat(this.state.latitude),
          longitude: parseFloat(this.state.longitude),
          latitudeDelta: parseFloat(this.state.latdelta),
          longitudeDelta:parseFloat(this.state.longdelta),
          }
        );
    }
 componentDidMount(){
         this.loadingfunction()
 }
 loadingfunction=()=>{
   this.setState({loading:true})
   const timer= setTimeout(() => {
     this.setState({loading:false})
}, 5000);
return () => clearTimeout(timer);
 }

    sendaddress = async() => {
      let userdata=await localStorage.getItemObject('user_arr')
        //-------------------- input validations -----------------
     let user_id=userdata.user_id
    
          
          if(selleraddress=='NA')
          {
          
            msgProvider.alert(msgTitle.information[config.language],"please select location", false);
            return false
         }
           if(this.state.isConnected===true)
          {
            
      this.setState({loading:true,user_id:user_id});
     
      let data=new FormData();
    
      data.append('user_id',user_id)
      data.append('user_type',1)
      
      data.append('order_id',this.state.order_id)
      data.append('meeting_location',selleraddress.address)
      data.append('meeting_latitude',selleraddress.latitude)
      data.append('meeting_longitude',selleraddress.longitude)
        var url = config.baseURL+'add_meeting_location.php'
      console.log('data',data)
     console.log('url',url)
        const {navigate} = this.props.navigation;
     fetch(url,{
           method: 'POST',
           headers: new Headers(config.headersapi), 
         body:data
       }).then( (obj)=> {
        this.setState({loading:false});
          return obj.json();  
       }).then( (obj)=> { 
           console.log('obj',obj);
        //msgProvider.alert(msgTitle.response[config.language], JSON.stringify(obj), false);
           if(obj.success == 'true'){
           
            selleraddress='NA'
              ToastAndroid.showWithGravityAndOffset(
              obj.msg[config.language],
              ToastAndroid.LONG,
              ToastAndroid.CENTER,
              25,
              50
            );
            this.props.navigation.goBack();
            // msgProvider.alert(msgTitle.information[config.language],  false);
             }else{
             
               if(obj.account_active_status=="deactivate")
                  {
                    msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
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

  render(){
    //    console.log(this.state.data)
    //    console.log(this.state.longitude)
    //    console.log(this.state.latitude)
    //    console.log(this.state.updatelatitude)
    //    console.log(this.state.updatelongitude)
// get_data1 = {
    //   "users": 
    //   [
    //       {
    //           productSrc:  require("./icons/asdasd.png"),
    //           LeftSideIcon: require("./icons/try.png"),
    //           RightSideIcon: require("./icons/Productheart.png")
    //       },
    var mapStyle=[{"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},{"elementType": "labels.text.fill","stylers": [{"color": "#746855"}]},{"elementType": "labels.text.stroke","stylers": [{"color": "#242f3e"}]},{"featureType": "administrative.locality","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "poi.park","elementType": "geometry","stylers": [{"color": "#263c3f"}]},{"featureType": "poi.park","elementType": "labels.text.fill","stylers": [{"color": "#6b9a76"}]},{"featureType": "road","elementType": "geometry","stylers": [{"color": "#38414e"}]},{"featureType": "road","elementType": "geometry.stroke","stylers": [{"color": "#212a37"}]},{"featureType": "road","elementType": "labels.text.fill","stylers": [{"color": "#9ca5b3"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"color": "#746855"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#1f2835"}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"color": "#f3d19c"}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#2f3948"}]},{"featureType": "transit.station","elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#17263c"}]},{"featureType": "water","elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},{"featureType": "water","elementType": "labels.text.stroke","stylers": [{"color": "#17263c"}]}];
    return(
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={{width:'100%',alignSelf:'center',flexDirection:'row',paddingTop:10,}}>
         <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}} onPress={()=>{this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}}>
                 <Image source={require('../icons/cross.png')} style={{alignSelf:'center',width:13,height:14}}/>
             </View>
          </TouchableOpacity>
          <View style={{paddingVertical:15,width:'60%'}}> 
            <Text style={{color:'black',fontFamily:'Ubuntu-Medium',fontSize:17,textAlign:'center'}}>Search Location</Text>
          </View>
       {this.state.selleraddress!='NA' && <TouchableOpacity style={{paddingVertical:15,width:'20%',alignSelf:'center'}}  onPress={()=>{this.state.location_page=='meeting'?this.sendaddress():this.props.navigation.goBack()}}> 
            <View style={{width:'100%',alignSelf:'center'}} >
              <Text style={{color:Colors.buttoncolor,fontFamily:'Ubuntu-Medium',fontSize:13,textAlign:'center'}}>Done</Text>
             </View>
          </TouchableOpacity>}
                
        </View>

        <View style={{flex:1}}>
    <MapView
     followsUserLocation={true}
     // onUserLocationChange={event =>this.getCoordinates(this)}
    
     style={{flex:1}}
      region={
       this.getCoordinates(this)
      }
     //  region={this.getCoordinates(this)}

      zoomEnabled={true}
      provider={PROVIDER_GOOGLE}
      minZoomLevel={2}
                        maxZoomLevel={20}
                        rotateEnabled={true}
                        pitchEnabled={true}
                        showsUserLocation={true}
                        moveOnMarkerPress={true}
                       
      showsScale={true} // also this is not working
      showsCompass={true} // and this is not working
      showsPointsOfInterest={true} // this is not working either
      showsBuildings={true} // and finally, this isn't working either
      showsUserLocation={true}
      showsMyLocationButton={true}
      showsTraffic={true}
      showsCompass={true}
      onMapReady={this.onMapReady}
      // onRegionChangeComplete ={(event)=>{this.getadddressfromlatlong(event)}}
     draggable
    
     //  customMapStyle={mapStyle}
     ref={this.setMapRef}
    
    >
        
                     {/* <MapView.Marker 
                     coordinate={{
                         latitude:parseFloat(item.gym_latitude),
                         longitude:parseFloat(item.gym_longitude),
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }}
                     title={'is aways thougth'}
                     onPress={()=>{this.props.navigation.navigate('Recommendedgymdiscription',{'gym_id':item.user_id})}}
                     >
                          <TouchableOpacity onPressOut={()=>{this.props.navigation.navigate('Recommendedgymdiscription',{'gym_id':item.user_id})}}>
                          <Image source={{uri:config.img_url+item.image}} style={{height: 40, width:40,borderRadius:15 }} />
                            </TouchableOpacity>
                   </MapView.Marker>
                 )} */}
                 <Marker
                  coordinate={{
                    latitude:parseFloat(this.state.latitude),
                    longitude:parseFloat(this.state.longitude),
                    latitudeDelta: parseFloat(this.state.latdelta),
                    longitudeDelta:parseFloat(this.state.longdelta),
                  }}
                  isPreselected={true}
       
       onDragEnd={(e) => {console.log("dragEnd",(e.nativeEvent.coordinate))}}
        draggable
        
       
        title={this.state.username!=null?this.state.username:'Guest user'}
        description={'Your are here location'}
        
      >
        <Image source={require('../icons/address2.png')} style={{height: 30, width:30 ,resizeMode:'contain'}} />
        </Marker>
    {/* <Image source={require('./icons/userlogo.png')} style={{height: 50, width:50,borderRadius:15 }} /> */}
    </MapView>

    <View style={{position:'absolute',width:'100%',top:20}}>
     <View style={{flex:1,paddingHorizontal:20}}>
              
          <GooglePlacesAutocomplete
              placeholder={this.state.addressselected} 
              minLength={1} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed={this.state.addressbar2} // true/false/undefined
              fetchDetails={true}
              ref={(instance) => { this.GooglePlacesRef = instance }}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // console.log('data',data);
                // console.log(details);
               console.log('datalocation',details)
               let data2={'latitude':details.geometry.location.lat,'longitude':details.geometry.location.lng,'address':details.formatted_address}
               selleraddress=data2
               if(this.state.messagepage=='message')
               {
                message_loation=data2
               }
              
              this.setState({addressbar:true})
              }}
              getDefaultValue={() => {
                return  selleraddress!='NA'?selleraddress.address:''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key:config.mapkey,
                language: 'en', // language of the results
                //types: '(cities)',  default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                       backgroundColor:'white',
                      marginTop:10,
                      borderWidth:1,
                    boderColor:'gray', 
                       alignSelf:'center',
                      height:42,
                   alignItems:'flex-end',
                  borderRadius:50
                },
                textInput: {
                  marginLeft: 10,
                  marginRight: 10,
                  textAlign:'right',
                fontFamily:'Poppins-SemiBold',
                  height:40,
                  
                 color: '#5d5d5d',
                  fontSize: 16,
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                 
                },
                description: {
                    fontWeight: 'bold',
                
                  },
                  container:{
                
                    borderRadius:10
                  },
                  poweredContainer:{
                    backgroundColor:Colors.buttoncolor,
                    borderRadius:15,
                    color:'#FFFFFF'
                  },
                  listView:{
                    backgroundColor:'#FFFFFF',
                marginTop:30,borderRadius:15,borderWidth:1,boderColor:'black'
                  }
                  
              }}
              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                types: 'food',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
                'postal_code',
                'sublocality',
                'country'

              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            //   predefinedPlaces={[homePlace, workPlace]}
              debounce={100}
              renderLeftButton={()  => <Icon2 name='location' size={20} color={Colors.buttoncolor} style={{alignSelf:'center',marginLeft:10}}/>}
              renderRightButton={()  => (<TouchableOpacity style={{alignSelf:'center',paddingLeft:10}} onPress={()=>{this.GooglePlacesRef.setAddressText("");this.setState({addressselected:'search'})}}>
              <Icon2 name='circle-with-cross' size={25} color='#c2cfc4' style={{alignSelf:'center',paddingRight:5}} />
          </TouchableOpacity>) }
              //   <Image source={require('./icons/location.png')} style={{alignContent:'center',alignSelf:'center',resizeMode:'contain',width:20,height:20,marginLeft:10}}/>}
            />
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
     backgroundColor:Colors.Themecolor
    },
    button:{
        backgroundColor:'#00a1e4',
        width:180,
        borderRadius:45,
        paddingVertical:10
    },
    searchbutton:{
        backgroundColor:'#00a1e4',
       
        borderRadius:45,
        paddingVertical:11,
        marginTop:20,
        marginBottom:8,
        textAlign:'center',
        color:'#FFFFFF',
        position:"absolute",bottom:10,width:'80%',
    alignSelf:'center'
    },
    searchbar:{
        flexDirection:"row",
        width:'80%',
        marginHorizontal:20,
        backgroundColor:'#FFFFFF',
        marginTop:10,
        marginRight:10,
        elevation: 10,
        borderRadius:15,
        alignSelf:'center',
        shadowOffset: {
          height: 7,
          width: 0
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.49,
        shadowRadius: 5,
        
    }
})