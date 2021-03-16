import { Alert } from "react-native";

//--------------------------- Message Provider Start -----------------------
class messageFunctionsProviders {
	alert(title, message, callback) {
		if(callback === false){
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.ok[0], 
					},
				],
				{cancelable: false},
			);
		}else{
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.ok[0], 
						onPress: () => callback,
					},
				],
				{cancelable: false},
			);
		}
		
	}
	cameradeny=()=>{
		Alert.alert(
			 'suggestion',
			'go to settings and allow plazaroo to access camera/photos',
			[
				{
					text: msgTitle.cancel[0], 
				},
				{
					text: msgTitle.ok[0], 
					onPress: () =>  console.log('vikas'),
				},
			],
			{cancelable: false},
		);
	}

    confirm(title, message, callbackOk, callbackCancel) {
    	if(callbackCancel === false){
    		Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.cancel[0], 
					},
					{
						text: msgTitle.ok[0], 
						onPress: () =>  this.btnPageLoginCall(),
					},
				],
				{cancelable: false},
			);
    	}else{
    		Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.cancel[0], 
						onPress: () => callbackCancel,
					},
					{
						text: msgTitle.ok[0], 
						onPress: () => callbackOk,
					},
				],
				{cancelable: false},
			);
    	}
		
    }

    later(title, message, callbackOk, callbackCancel, callbackLater) {
		Alert.alert(
			title,
			message,
			[
				{
					text: 'Ask me later', 
					onPress: () => msgTitle.later[0],
				},
				{
					text: 'Cancel', 
					onPress: () => msgTitle.cancel[0],
				},
				{
					text: 'OK', 
					onPress: () => msgTitle.ok[0],
				},
			],
			{cancelable: false},
		);
    }

}
export const msgProvider = new messageFunctionsProviders();


//msgProvider.alert('Title', 'hello to all', false);
//msgProvider.alert('Title', 'hello to all', this.btnLoginCallTest());

//msgProvider.confirm('Title', 'hello to all confirm', this.btnConfirmLogin(), false);
//msgProvider.confirm('Title', 'hello to all confirm', this.btnConfirmLogin(), this.btnConfirmLoginCancel());

//msgProvider.later('Title', 'hello to all later', this.btnConfirmLogin());

// btnLoginCallTest = () => {
//   msgProvider.alert('Title', 'btnLoginCallTest call');
// }

// btnConfirmLogin = () => {
//   msgProvider.alert('Title', 'btnConfirmLogin call');
// }

// btnConfirmLoginCancel = () => {
//   msgProvider.alert('Title', 'btnConfirmLoginCancel call');
// }


//--------------------------- Message Provider End -----------------------



//--------------------------- Title Provider Start -----------------------

class messageTitleProvider {
	//----------------- message buttons
	ok = ['Ok', 'ق '];
	cancel = ['Cancel', 'ق '];
	later = ['Later', 'قق '];

	//--------------- message title 
	information = ['Information Message', 'التحقق من صحة'];
	alert = ['Alert', 'التحقق من صحة'];
	confirm = ['Information Message', 'التحقق من صحة'];
	validation = ['Information Message', 'التحقق من صحة'];
	success = ['Information Message', 'التحقق من صحة'];
	error = ['Information Message', 'التحقق من صحة'];
	response = ['Response', 'التحقق من صحة'];
	server=['Connection Error'];
	internet=['Connection Error']
	
}

export const msgTitle = new messageTitleProvider();

//--------------------------- Title Provider End -----------------------



//--------------------------- Message Provider Start -----------------------

class messageTextProvider {
	//--------------------- Validation messages ---------------

	//------------------ Login messages ---------------
	emptyEmail = ['Please enter email or phone', 'التحقق من صحة'];
	validEmail=['Please enter valid email']
	emptyPassword = ['Please enter password', 'التحقق من صحة'];
	lengthPassword=['Password length should be minimum 8 character'];
	emptynewPassword=['Please enter new password', 'التحقق من صحة'];
	emptyconfirmPassword=['Please enter new password', 'التحقق من صحة'];
	emptyconfirm=['please enter right password'];

	//-------------------- Registration messages ---------------
	emptyFirstName = ['Please enter first name', 'التحقق من صحة'];
	emptyLastName = ['Please enter last name', 'التحقق من صحة'];
	emptyPhone = ['Please enter phone number', 'التحقق من صحة'];

	//-------------------- Registration messages ---------------
	loginFirst = ['Please login first', 'التحقق من صحة'];
	emptyContactResion = ['Please select contact reason', 'التحقق من صحة'];
	emptyContactMessage = ['Please enter message', 'التحقق من صحة'];
    networkconnection=['Unable to connect. Please check that you are connected to the Internet and try again.'];
    servermessage=['An Unexpected error occured , Please try again .If the problem continues , Please do contact us'];
	
}

export const msgText = new messageTextProvider();

//--------------------------- Message Provider End -----------------------