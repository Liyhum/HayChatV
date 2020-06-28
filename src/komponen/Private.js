import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Modal,
  ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
// import SPin from 'react-native-spinkit';
const eye =<Icon name='eye' size={25} style={{marginRight:8}}/>
const Users = (
  <Icon
    name="user"
    size={20}
    color="black"
    style={{marginRight: 5, marginTop: 10}}
  />
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
  <Icon
    name="lock"
    size={20}
    color="black"
    style={{marginRight: 5, marginTop: 10}}
  />
);
const Close = <Icon name='close' size={30} color='white' style={{paddingTop:10,paddingLeft:10}}/>
const arrowLeft = <Icon name="angle-left" size={40} color="white" />;
const ket = <Icon name="key" size={90} color="#0d691b" />;

class Private extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Text_id: '',
      Text_username: '',
      Text_password: '',
      Text_newPassword: '',
      visible: false,
      Text: 'Berhasil',
      hide: true,
    };
  }
  HidePassword = () => {
    this.setState({hide: !this.state.hide});
  };
  _toastWithDurationGravityOffsetHandler=()=>{
    ToastAndroid.showWithGravityAndOffset(
     'Success',
     ToastAndroid.LONG, 
     ToastAndroid.BOTTOM,
     25, 
     50 
   );
 }
 _toastWithDurationGravityOffsetHandler2=()=>{
  ToastAndroid.showWithGravityAndOffset(
   'Failed ',
   ToastAndroid.LONG, 
   ToastAndroid.BOTTOM,
   25, 
   50 
 );
}
  componentDidMount() {
    AsyncStorage.getItem('id').then(value => {
      if (value != null) {
        this.setState({Text_id: value});
      }
    });
  }
  Pass = () => {
    this.setState({visible: true});
    const {
      Text_username,
      Text_password,
      Text_newPassword,
      Text_id,
    } = this.state;
    fetch('https://calm-mesa-84057.herokuapp.com/private/edit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Text_id,
        username: Text_username,
        password: Text_password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.setState({isloading: false, visible: false});
        this._toastWithDurationGravityOffsetHandler()
      })
      .catch(err => {
        console.log(err);
        this.setState({isloading: false, visible: false});
        this._toastWithDurationGravityOffsetHandler2()
      });
  };
  render() {
    return (
      <View style={{backgroundColor: '#12e031'}}>
        <View style={{marginTop:20}}>
          <TouchableOpacity onPress={()=> this.props.navigation.navigate('Home')}>
            {Close}   
          </TouchableOpacity>
        </View>
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
        <View style={styles.sty}>
          <View style={styles.id}>
              
            {ket}
            <Text style={{fontSize: 30, textAlign: 'justify', color: 'white'}}>
              Change Your Password
            </Text>
            <Text style={{fontSize: 30, textAlign: 'justify', color: 'white'}}>
              Now!
            </Text>
          </View>

          <View style={styles.password}>
            <View>
              <TextInput
                placeholder="Insert New Username"
                value={this.state.Text_username}
                onChangeText={Text => this.setState({Text_username: Text})}
                style={styles.batas2}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                width: '100%',
              }}
            />
            <View>
              <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                <TextInput
                  placeholder="Insert New Password"
                  value={this.state.Text_password}
                  onChangeText={Text => this.setState({Text_password: Text})}
                  style={styles.batas2}
                  secureTextEntry={this.state.hide}
                />
                <TouchableOpacity onPress={this.HidePassword}>
                  {eye}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={this.Pass} style={styles.ButtonData}>
            <Text style={{color:'white'}}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Private;
