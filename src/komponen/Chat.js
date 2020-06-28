import React, {Component} from 'react';
import {
  View,
  AsyncStorage,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
  TextInput,
  Image,
  Modal,
  TouchableNativeFeedback,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/MaterialIcons';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {getdata} from '../redux/action/index';
import {connect} from 'react-redux';
import Axios from 'axios';
import Style from '../komponen/styles';
const Close = <Icon name="close" size={30} color="black" />;
const send = <Icon name="send" size={30} />;
const phone = (
  <Icon
    name="phone"
    size={25}
    color="black"
    style={{marginTop: 3, marginRight: 15}}
  />
);
const renderCustomPopup = ({
  appIconSource,
  appTitle,
  timeText,
  title,
  body
}) => (
  <View style={{ width: '95%', borderWidth: 1, borderRadius: 5 }}>
    <View
      style={{
        borderBottomWidth: 1,
        height: 25,
        width: '100%',
        paddingLeft: 10,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#f3f3f3'
      }}
    >
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{title}</Text>
    </View>
    <View style={{ padding: 10, paddingTop: -5 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 5 }}>
        Rizqan
      </Text>
      <Text style={{ fontSize: 15 }}>{body}</Text>
    </View>
  </View>
)

import Notif from 'react-native-push-notification-popup'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      Text_text: '',
      Visibel: false,
      pesan: '',
      id: '',
      dataSource: [],
      role: true,
      ModalDelet: false,
      avatar: null,
      idpesan: '',
    };
  }
  componentDidMount = () => {
    this._TakeData();
    AsyncStorage.getItem('id').then(value => {
      if (value != null) {
        this.setState({id: value});
      }
    });
    AsyncStorage.getItem('avatar').then(value => {
      if (value != null) {
        this.setState({avatar: value});
      }
    });
  };
  onNotification () {
    this.popup.show({
      onPress: function () {
        console.log('Pressed')
      },
      appIconSource: require('../../Asset/Back23.png'),
      appTitle: 'Some App',
      timeText: 'Now',
      title: 'Hello World',
      body: 'This is a sample message.\nTesting emoji 😀',
      // slideOutTime: 5000,
    })
  }
  delete = () => {
    const id = this.state.idpesan;
    this.setState({ModalDelet: false});
    fetch('https://calm-mesa-84057.herokuapp.com/message/delete/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(del => {
        console.log(del);
      })
      .catch(err => {
        console.log(err);
      });
  };
  _itemComponent = ({item}) => {
    const Idyu = parseInt(this.state.id);
    if (item.sender_id === Idyu) {
      return (
        <View
          style={{alignItems: 'flex-end', marginLeft: 20, marginBottom: 15}}>
          <Modal transparent visible={this.state.ModalDelet}>
            <View style={Style.del}>
              <Text style={{color: 'black'}}>Hapus Pesan ini?</Text>
              <TouchableOpacity onPress={() => this.delete()}>
                <View style={Style.LogOut2}>
                  <Text style={{color: 'white'}}>Yes</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({ModalDelet: false})}>
                <View style={Style.LogOut2}>
                  <Text style={{color: 'white'}}>no</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
          <View style={{flexDirection: 'row', paddingLeft: 50,marginRight:15}}>
            <TouchableOpacity
              style={Style.Chat}
              onLongPress={() =>
                this.setState({ModalDelet: true, idpesan: item.id})
              }>
              <Text style={{fontSize: 15}}> {item.text} </Text>
              <Text style={{fontSize: 8}}> {item.created_at} </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', paddingRight: 5}}>
          <View style={{marginRight:5}}>
            <Image
              source={{uri: this.props.navigation.state.params.detail[4]}}
              style={Style.imag}
            />
          </View>
          <View style={Style.Chat2}>
            <Text style={{fontSize: 15}}> {item.text} </Text>
            <Text style={{fontSize: 8}}> {item.created_at} </Text>
          </View>
        </View>
      );
    }
  };
  Send = e => {
    e.preventDefault();
    const dataPesan = {
      sender_id: this.state.id,
      receiver_id: this.props.navigation.state.params.detail[0],
      text: this.state.Text_text,
    };
    let Data = this.props.GetData;
    Axios.post(
      'https://calm-mesa-84057.herokuapp.com/message/send',
      dataPesan,
    ).then(respone => {
      console.log(respone);
      this.setState({
        dataSource: Data,
        Text_text: this.state.pesan,
      });
    });
    setTimeout(() => {
      this._TakeData();
    }, 300);
  };
  componentDidUpdate = () => {
    this._TakeData();
  };
  _TakeData = async () => {
    const sender_id = this.state.id;
    const receiver_id = this.props.navigation.state.params.detail[0];

    try {
      let response = await fetch(
        'https://calm-mesa-84057.herokuapp.com/message/' +
          sender_id +
          '/' +
          receiver_id,
        {
          method: 'GET',
          headers: new Headers({
            ContentType: 'application/json',
            Accept: 'application/json',
          }),
        },
      );
      let responseJson = await response.json();
      await this.setState({
        dataSource: responseJson.message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <ImageBackground
        style={{height: '100%', width: '100%'}}
        source={require('../../Asset/Back23.png')}>
        <Notif
          ref={ref => (this.popup = ref)}
          renderPopupContent={renderCustomPopup}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 13,
              paddingHorizontal: 15,
              alignItems: 'center',
              elevation: 4,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Tampil')}>
              {Close}
            </TouchableOpacity>
            <Text style={Style.Jud}>
              {this.props.navigation.state.params.detail[2]}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    `tel:${this.props.navigation.state.params.detail[3]}`,
                  )
                }>
                {phone}
              </TouchableOpacity>
              <View style={Style.Ima}>
                <Image
                  source={{uri: this.props.navigation.state.params.detail[4]}}
                  style={Style.Ima}
                />
              </View>
            </View>
          </View>
          <FlatList
            data={this.state.dataSource}
            renderItem={this._itemComponent}
            keyExtractor={item => item.toString()}
          />

          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
            }}>
            <View style={Style.Sendt}>
              <TextInput
                style={{
                  width: '85%',
                  paddingHorizontal: 15,
                  fontSize: 18,
                  justifyContent: 'center',
                  borderRadius: 40,
                  borderColor:'#ccc',
                  borderWidth:1,
                  marginLeft:11,
                  paddingVertical:10
                }}
                placeholder="Write a message"
                onChangeText={Text_text =>
                  this.setState({Text_text: Text_text})
                }
                value={this.state.Text_text}
                underlineColorAndroid="transparent"
                returnKeyType="send"
              />
            </View>
            <TouchableOpacity
              onPress={this.Send.bind(this)}
              style={{justifyContent: 'center'}}>
              {send}
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStatProps = state => {
  let {GetData} = state.reduc;
  return {GetData};
};
export default connect(mapStatProps, {getdata})(Chat);
