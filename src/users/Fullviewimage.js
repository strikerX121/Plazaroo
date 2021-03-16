import React, { Component } from 'react';
import { View,  Image ,Dimensions,TouchableOpacity,ActivityIndicator} from 'react-native';
import Colors from '../Colors';
import { config } from '../providers/configProvider';
const BannerWidth = Dimensions.get('window').width;
const Bannerheight = Dimensions.get('window').height*85/100;
export default class Fullviewimage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 1,
      images:this.props.navigation.getParam('images'),
      type:this.props.navigation.getParam('type'),
      onloaded:false,
    }
  }
  
  render() {
    return (
     <View style={{flex:1,backgroundColor:'black'}}>
       
          <View>
           < TouchableOpacity style={{paddingVertical:15,paddingLeft:20}} onPress={()=>{this.props.navigation.goBack()}}>
            <Image source={require('../icons/w-back.png')} style={{width:25,height:15}}/>
       </TouchableOpacity>
       </View>
       <View>
       {this.state.type!=null? <Image 
        onLoadStart={()=>{this.setState({onloaded:true})}}
        onLoadEnd={()=>{this.setState({onloaded:false})}}
       resizeMode='center' resizeMethod='resize' source={this.state.images==null?require('../icons/noimage.png'):{uri:config.img_url3+this.state.images}} style={{width:BannerWidth,resizeMode:'contain',height:Bannerheight}}/>:
       <Image 
       onLoadStart={()=>{this.setState({onloaded:true})}}
       onLoadEnd={()=>{this.setState({onloaded:false})}}
       source={this.state.images==null?require('../icons/noimage.png'):{uri:config.img_url3+this.state.images}} style={{width:BannerWidth,height:Bannerheight,backgroundColor:'gray',resizeMode:'contain'}}/>}
     <View style={{position:'absolute',alignContent:'center',alignItems:'center',justifyContent:'center',width:'100%',height:Bannerheight,alignSelf:'center'}}>
                    <ActivityIndicator size='large' color='#FFFFFF' animating={this.state.onloaded}/>      
                   </View>
      </View>
     </View>
    )
  }
}