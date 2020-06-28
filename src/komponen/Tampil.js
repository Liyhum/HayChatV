import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
  AsyncStorage,
  ImageBackground,
  Modal
} from 'react-native';
import Floating from 'react-native-action-button';
import {getdata} from '../redux/action/index';
import {connect} from 'react-redux';
import Icons from 'react-native-vector-icons';
import Style from '../komponen/styles';
// import SPin from 'react-native-spinkit';
import {SearchBar} from 'react-native-elements';
const Akun = <Icons name="account" size={25} />;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: true,
      Text_id: '',
      Text_username: '',
      Text_email: '',
      Text_no_telp: '',
      Text_password: '',
      Text_name: '',
      avatar: null,
      cari: '',
    };
    this.data2();
  }
  updatecari = cari => {
    this.setState({Text_name: cari});
  };
  componentDidUpdate() {
    this.state.avatar;
  }
  data2 = async () => {
    try {
      let response = await fetch(
        'https://calm-mesa-84057.herokuapp.com/tampil',
      );
      let responseJson = await response.json();
      await this.props.getdata(responseJson);
      this.setState({refreshing: false});
    } catch (error) {
      console.log(error);
    }
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
        this.setState({avatar: value});
      }
    });
  };
  componentDidMount() {
    this.props.GetData();
    this.data2();
  }
  message = updateItem => {
    this.props.navigation.navigate('Chat', {detail: updateItem});
  };
  update = updateItem => {
    this.props.navigation.navigate('Home');
  };
  _onRefresh() {
    this.data2();
    this.props.getdata();
  }
  LogOut = () => {
    AsyncStorage.removeItem('access_token');
    this.props.navigation.navigate('LoginStack');
  };
  renderItems = ({item}) => {
    return (
      <View style={styles.posisi3}>
        <TouchableOpacity
          style={styles.posisi}
          onPress={() =>
            this.message([
              `${item.id}`,
              `${item.username}`,
              `${item.name}`,
              `${item.no_telp}`,
              `${item.avatar}`,
              `${item.email}`,
            ])
          }>
          <Image source={{uri: item.avatar}} style={styles.img} />
          <View style={styles.dalam}>
            <Text style={styles.font}> {item.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    console.disableYellowBox = true;
    let {Text_name} = this.state;
    if (this.state.refreshing) {
      return (
        <Modal transparent animationType="fade" visible={this.state.refreshing}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {/* <SPin
              isVisible={this.state.refreshing}
              type="Bounce"
              size={100}
              color="#8e78ff"
            /> */}
          </View>
        </Modal>
      );
    }
    return (
      <ImageBackground
        source={require('../../Asset/Background4.png')}
        style={{height: '100%', width: '100%'}}>
        <View style={{flex: 1}}>
          <View style={styles.osisi}>
            <Text style={styles.font1}>HayTalk</Text>
            <TouchableOpacity style={Style.pos} onPress={() => this.update()}>
              <Image
                source={{uri: this.state.avatar}}
                style={{height: 45, width: 45, borderRadius: 35}}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={this.props.GetData}
            keyExtractor={item => item.toString()}
            renderItem={this.renderItems}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoading !== true}
                onRefresh={this._onRefresh.bind(this)}
                colors={['blue', 'red', 'green', 'white']}
              />
            }
          />
        </View>
      </ImageBackground>
    );
  }
}
const mapStatProps = state => {
  let {GetData} = state.reduc;
  return {GetData};
};
export default connect(mapStatProps, {getdata})(App);

const styles = StyleSheet.create({
  Bentuk: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  posisi: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  dalam: {
    paddingVertical: 9,
    width: '70%',
  },
  font: {
    fontSize: 20,
    color: 'gray',
    fontStyle: 'italic',
  },
  font1: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    // fontFamily: 'Bryndan Write',
  },
  Button: {
    color: 'white',
    fontSize: 25,
  },
  Button2: {
    height: 20,
    width: 20,
    tintColor: '#ffff00',
  },
  heade: {
    height: 20,
    width: 20,
  },
  osisi: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    alignItems: 'center',
    paddingVertical: 15,
    marginTop:20
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  posisi3: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});

const actions = [
  {
    text: 'Tambah Data',
    icon: require('../../Asset/add-to-database.png'),
    position: 1,
    color: 'white',
    name: 'bt_Tambahdata',
  },
  {
    text: 'Detail',
    icon: require('../../Asset/add-to-database.png'),
    position: 2,
    color: 'white',
    name: 'Bt_Detail',
  },
];
