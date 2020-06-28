import React, {Component} from 'react';
import {
  View,
  TextInput,
  Modal,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid
} from 'react-native';
import Style from '../komponen/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
// import SPin from 'react-native-spinkit';bv
const Users = (
  <Icon name="user" size={20} color="black" style={{marginRight: 8}} />
);
const user = <Icon name="user" size={100} color="#ccc" />;
const email = (
  <Icon name="envelope" size={15} color="black" style={{marginRight: 8}} />
);
const Phone = (
  <Icon name="phone" size={20} color="black" style={{marginRight: 8}} />
);
const edit = (
  <Icon name="edit" size={25} color="#ccc" style={{marginRight: 5}} />
);
const Lock = (
  <Icon name="lock" size={20} color="black" style={{marginRight: 5}} />
);
const images = (
  <Icon name="image" size={15} color="black" style={{marginRight: 5}} />
);
const arrowLeft = <Icon name="angle-left" size={40} color="white" />;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Text_id: '',
      Text_name: '',
      Text_email: '',
      Text_no_telp: '',
      Text_password: '',
      Text_avatar: null,
      visible: false,
      isloading: false,
      ImageSource: null,
      modalaktif: true,
      modaloff: false,
    };
  }
  LogOut = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('LoginStack');
  };
  message = updateItem => {
    this.props.navigation.navigate('Private2', {detail: updateItem});
  };
  changeData = () => {
    let {Text_name, Text_id, Text_no_telp, Text_email} = this.state;
    const Notelp=parseInt(Text_no_telp)
    this.setState({isloading: true, visible: true});
    fetch('https://calm-mesa-84057.herokuapp.com/user/edit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Text_id,
        name: Text_name,
        email: Text_email,
        no_telp: Text_no_telp,
      }),
    })
      .then(res => res.json())
      .then(res => {
        
        console.log(res);
        if(Text_name!==null){
          AsyncStorage.setItem('name', Text_name);
          AsyncStorage.setItem('email', Text_email);
          AsyncStorage.setItem('no_telp', Text_no_telp);
          this.setState({isloading: false, visible: false});
          this._toastWithDurationGravityOffsetHandler()
        }
        
      })
      .catch(err => {
        console.log(err);
        Alert.alert('error');
        this.setState({isloading: false, visible: false});
      });
  };
  componentDidMount = () => {
    AsyncStorage.getItem('id').then(value => {
      if (value != null) {
        this.setState({Text_id: value});
      }
    });

    AsyncStorage.getItem('name').then(value => {
      if (value != null) {
        this.setState({Text_name: value});
      }
    });
    AsyncStorage.getItem('email').then(value => {
      if (value != null) {
        this.setState({Text_email: value});
      }
    });
    AsyncStorage.getItem('no_telp').then(value => {
      if (value != null) {
        this.setState({Text_no_telp: value});
      }
    });
    AsyncStorage.getItem('avatar').then(value => {
      if (value != null) {
        this.setState({ImageSource: value});
      }
    });
  };
  on = () => {
    this.setState({modaloff: true});
  };
  off = () => {
    this.setState({modaloff: false});
    this.setState({visibel: false});
  };
  
    
    pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
          this.setState({ImageSource:{uri:result.uri}})
      }

    };
  
  _toastWithDurationGravityOffsetHandler=()=>{
     ToastAndroid.showWithGravityAndOffset(
      'Success edit data',
      ToastAndroid.LONG, 
      ToastAndroid.BOTTOM,
      25, 
      50 
    );
  }
  _toastWithDurationGravityOffsetHandler2=()=>{
     ToastAndroid.showWithGravityAndOffset(
      'Success Upload Photo',
      ToastAndroid.LONG, 
      ToastAndroid.BOTTOM,
      25, 
      50 
    );
  }
  SengImage = () => {
    this.setState({isloading: true, visible: true});
    fetch('https://calm-mesa-84057.herokuapp.com/avatar/edit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.Text_id,
        avatar: `data:image/gif;base64, ${this.state.ImageSource}`,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        console.log(resJson);
        this.setState({isloading: false, visible: false});
        AsyncStorage.setItem(
          'avatar',
          `data:image/gif;base64, ${this.state.ImageSource}`,
        );
        this._toastWithDurationGravityOffsetHandler2()
      })
      .catch(err => {
        this.setState({visible: false});
        console.log(err);
      });
  };
  render() {
    return (
      <ScrollView style={{height:'100%',width:'100%'}}>
      <ImageBackground
        source={require('../../Asset/Back2png.png')}
        style={Style.image}>
          
        <Modal transparent animationType="slide" visible={this.state.visible}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {/* <SPin
              isVisible={this.state.visible}
              type="ThreeBounce"
              size={100}
              color="violet"
            /> */}
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Tampil')}
          style={Style.Arrow}>
          {arrowLeft}
        </TouchableOpacity>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Modal animationType="fade" transparent visible={this.state.modaloff}>
            <TouchableNativeFeedback onPress={this.off}>
              <View style={styles.ViewComponentModal1}>
                <View style={Style.Modal}>
                  <TouchableOpacity onPress={this.LogOut}>
                    <View style={Style.Yes}>
                      <Text style={{color: 'white'}}>Yes</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({modaloff:false})}>
                    <View style={Style.Yes}>
                      <Text style={{color: 'white'}}>No</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableNativeFeedback>
          </Modal>
          <TouchableOpacity onPress={()=>this.pickImage()}>
            <View style={Style.Photo}>
              <Image
                source={this.state.ImageSource}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 100,
                  position: 'absolute',
                }}
              />
              <Image
                source={{
                  uri: `data:image/gif;base64, ${this.state.ImageSource}`, //what is this for???? 
                }}
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 100,
                  position: 'absolute',
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={Style.Profile}>
              <View style={Style.Input}>
                <View style={Style.INput}>{Users}</View>
                <View style={Style.batas}>
                  <TextInput
                    placeholder="Insert You Name"
                    onChangeText={TextInput =>
                      this.setState({Text_name: TextInput})
                    }
                    value={this.state.Text_name}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      width: '100%',
                    }}
                  />
                </View>
              </View>
              <View style={Style.Input}>
                <View style={Style.INput}>{email}</View>
                <View style={Style.batas}>
                  <TextInput
                    placeholder="Insert You Email"
                    onChangeText={TextInput =>
                      this.setState({Text_email: TextInput})
                    }
                    value={this.state.Text_email}
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      width: '100%',
                    }}
                  />
                </View>
              </View>
              <View style={Style.Input}>
                <View style={Style.INput}>{Phone}</View>
                <View style={Style.batas}>
                  <TextInput
                    placeholder="Insert You Notelp"
                    onChangeText={TextInput =>
                      this.setState({Text_no_telp: TextInput})
                    }
                    value={this.state.Text_no_telp}
                    keyboardType="number-pad"
                  />
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#ccc',
                      width: '100%',
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={this.changeData}
                  style={{alignItems: 'center'}}>
                  <View style={Style.ButtonData}>
                    <Text>Edit Data</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.SengImage}
                  style={{alignItems: 'center'}}>
                  <View style={Style.ButtonData}>
                    <Text>Edit Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
              
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={Style.LogOut} onPress={this.on}>
              <Text style={{color: 'white'}}>LogOut</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.LogOut2} onPress={this.message}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      </ScrollView>
    );
  }
}

export default Home;
const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#fff',
  },

  StylingTextInput: {
    paddingLeft: 3,
    width: '85%',
    marginBottom: 7,
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: 'teal',
    fontSize: 15,
  },

  Btn_TambahData: {
    borderRadius: 5,
    width: '90%',
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#0092CC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  StyleTambahData: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  InMainContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  TextUpTextInput: {
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: 15,
  },
  ViewTouch: {
    marginTop: 25,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  ViewComponentModal1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewComponentModal2: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
