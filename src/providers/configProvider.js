import { Platform  } from "react-native";
import base64 from 'react-native-base64'
global.player_id_me1='123456';
//--------------------------- Config Provider Start -----------------------
class configProvider {
	baseURL = 'https://sunstonedigitaltech.com/plazaroo/webservice/';
	img_url = 'https://sunstonedigitaltech.com/plazaroo/webservice/images/200X200/';
	img_url1= 'https://sunstonedigitaltech.com/plazaroo/webservice/images/400X400/';
	img_url2= 'https://sunstonedigitaltech.com/plazaroo/webservice/images/700X700/';
	img_url3= 'https://sunstonedigitaltech.com/plazaroo/webservice/images/';
	// baseURL = 'https://youngdecadeprojects.biz/2020/Zeeuni/webservice/';
	// img_url = 'https://youngdecadeprojects.biz/2020/Zeeuni/webservice/images/200X200/';
	// img_url1= 'https://youngdecadeprojects.biz/2020/Zeeuni/webservice/images/400X400/';
	// img_url2= 'https://youngdecadeprojects.biz/2020/Zeeuni/webservice//images/700X700/';
	// img_url3= 'https://youngdecadeprojects.biz/2020/Zeeuni/webservice/images/';
	language = 0;
	player_id = '123456';
	device_type = Platform.OS;
	//  userauth = base64.encode('mario');
	//  passauth = base64.encode('carbonell')
	
	onesignalappid='df2e6ece-527b-44d3-af6c-a1935a4f4fec'

	mapkey='AIzaSyBKVMRF83mlKmBMEfYFClUgIQp3iEIJtGI'
	headersapi={
		 'Authorization': 'Basic ' + base64.encode(base64.encode('mario')+":"+base64.encode('carbonell')), 
		  Accept: 'application/json',
		 'Content-Type': 'multipart/form-data',
		 'Cache-Control': 'no-cache,no-store,must-revalidate',
		 'Pragma': 'no-cache',
		'Expires': 0,
	   }
	login_type = 'app';
		  
	 GetPlayeridfunctin= (player_id)=>{
		  player_id_me1=player_id
	 }

};
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();





