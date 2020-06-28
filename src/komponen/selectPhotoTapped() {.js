selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

ImagePicker.launchImageLibraryAsync(options, response => {
    console.log('Response = ', response);
    
    if (response.didCancel) {
      console.log('User cancelled photo picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      let source = {uri: response.uri};
      console.log(response," -=-=-=-  check resp ",)
      this.setState({
        ImageSource: source,
        Text_avatar: response.data,
      });
    }
  });