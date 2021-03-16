import ImagePicker from 'react-native-image-picker';

class mediaAllProvider {

  launchCamera(){
    //alert('launchCamera');

      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        //cameraType: 'back',
        mediaType: 'photo',
        quality: 1,
      };

      ImagePicker.launchCamera(options, (response) => {
        //alert('Response = ', response);

        if (response.didCancel) {
          //alert('User cancelled image picker');
        } else if (response.error) {
          //alert('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          //alert('User tapped custom button: ', response.customButton);
          //alert(response.customButton);
        } else {
            alert('response', JSON.stringify(response));
            return response;
          // const source = { uri: response.uri };
           
          // this.setState({
          //   filePath: response,
          //   fileData: response.data,
          //   fileUri: response.uri
          // });
        }
      });

    };

    launchImageLibrary (){
    
      const options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
            mediaType: 'photo',
            quality: 1,
        };

      ImagePicker.launchImageLibrary(options, (response) => {
        //Alert.alert('Response = ', JSON.stringify(response));

        if (response.didCancel) {
          //Alert.alert('User cancelled image picker');
        } else if (response.error) {
          //Alert.alert('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          //Alert.alert('User tapped custom button: ', response.customButton);
          //Alert.alert(response.customButton);
        } else {
          Alert.alert('response', JSON.stringify(response));
          return response;
        }
      });

    }
}

export const mediaProvider = new mediaAllProvider();

// mediaProvider.launchImageLibrary().then((imgData) => {
//      Alert.alert('imgData', JSON.stringify(imgData));

//     this.setState({
//         filePath: imgData,
//         fileData: imgData.data,
//         fileUri: imgData.uri
//       });
// }).catch(function (error) {
//     console.log("-------- error ------- "+error);
//     alert("result error:"+error)
// });;


// //-------------------- open camera --------------
// mediaProvider.launchCamera().then((imgData) => {
//     Alert.alert('imgData', JSON.stringify(imgData));

//     this.setState({
//         filePath: imgData,
//         fileData: imgData.data,
//         fileUri: imgData.uri
//       });
// }).catch(function (error) {
//     console.log("-------- error ------- "+error);
//     alert("result error:"+error)
// });;
