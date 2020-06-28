import React from 'react'
import {
  View,
  ImageBackground,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  Alert,
  Image,
  ActivityIndicator,
  StatusBar,
  Modal
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import * as ImagePicker from 'expo-image-picker';

const user = (
  <Icon name='user' size={20} color='black' style={{ marginRight: 8 }} />
)
const email = (
  <Icon name='envelope' size={15} color='black' style={{ marginRight: 8 }} />
)
const Phone = (
  <Icon name='phone' size={20} color='black' style={{ marginRight: 8 }} />
)
const edit = (
  <Icon name='edit' size={25} color='#fff' style={{ marginRight: 5 }} />
)
const Lock = (
  <Icon name='lock' size={20} color='black' style={{ marginRight: 5 }} />
)
const images = (
  <Icon name='image' size={15} color='black' style={{ marginRight: 5 }} />
)
const arrowLeft = <Icon name='angle-left' size={40} color='white' />

const { width: WIDTH } = Dimensions.get('window')

class Editdata extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      TextInput_id: '',
      TextInput_name: '',
      TextInput_email: '',
      TextInput_no_telp: '',
      TextInput_password: '',
      TextInput_avatar: null,
      visible: false,
      isloading: false,
      ImageSource: null,
      modalaktif:true
    }
  }
  componentDidMount () {
    AsyncStorage.getItem('id').then(value => {
      if (value != null) {
        this.setState({ TextInput_id: value })
      }
    })
    
    AsyncStorage.getItem('name').then(value => {
      if (value != null) {
        this.setState({ TextInput_name: value })
      }
    })
    AsyncStorage.getItem('email').then(value => {
      if (value != null) {
        this.setState({ TextInput_email: value })
      }
    })
    AsyncStorage.getItem('no_telp').then(value => {
      if (value != null) {
        this.setState({ TextInput_no_telp: value })
      }
    })
    AsyncStorage.getItem('password').then(value => {
      if (value != null) {
        this.setState({ TextInput_password: value })
      }
    })
    AsyncStorage.getItem('avatar').then(value => {
      if (value != null) {
        this.setState({ TextInput_avatar: value })
      }
    })
  }

  // https://divitie.serveo.net/avatar/edit

  InsertStudentRecordsToServer = () => {
    this.setState({ isloading: true, visible: true })
    
    fetch('https://calm-mesa-84057.herokuapp.com/user/edit', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.TextInput_id,
        name: this.state.TextInput_name,
        email: this.state.TextInput_email,
        no_telp: this.state.TextInput_no_telp
      })
    })
    
      .then(response => response.json())
      .then(responseJson => {
          AsyncStorage.setItem('name', this.state.TextInput_name)
          AsyncStorage.setItem('email', this.state.TextInput_email)
          AsyncStorage.setItem('no_telp', this.state.TextInput_no_telp)
          
        this.setState({ isloading: false, visible: false })
        this.props.navigation.navigate('Screen3') 
        // this.setState({modalaktif:true})
      })
      .catch(error => {
        console.error(error)
        this.setState({ visible: false })
        alert('error')
      })
  }

  selectPhotoTapped () {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    }

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled photo picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        let source = { uri: response.uri }

        this.setState({
          ImageSource: source,
          TextInput_avatar: response.data
        })
      }
    })
  }

  ImageToServer = () => {
    this.setState({ isloading: true, visible: true })
    fetch('https://calm-mesa-84057.herokuapp.com/avatar/edit', {
      method: 'PUT',

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.TextInput_id,
        avatar:`data:image/gif;base64, ${this.state.TextInput_avatar}`
        // avatar: this.state.TextInput_avatar
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        AsyncStorage.setItem('avatar', `data:image/gif;base64, ${this.state.TextInput_avatar}`)
        this.setState({ isloading: false, visible: false, })
        this.props.navigation.navigate('Screen3') 
        // this.setState({modalaktif:true})
        
      })
      .catch(error => {
        console.error(error)
        this.setState({ visible: false })
        alert('error')
      })
  }
   
  render () {
    console.disableYellowBox = true; 
    return (
      <View style={styles.MainContainer}>
        <StatusBar backgroundColor='#0092CC' barStyle='light-content' />
        <Modal animationType='slide' transparent visible={this.state.visible}>
          <View style={styles.ViewComponentModal1}>
            <View style={styles.ViewComponentModal2}>
              <ActivityIndicator size='large' color='#0092CC' />
            </View>
          </View>
        </Modal>
        {/* <Modal animationType='slide' transparent visible={this.state.modalaktif}>
          <View style={styles.ViewComponentModal1}>
            <View style={{width:'70%', height:130, borderWidth:1, backgroundColor:'#fff', elevation:10, borderColor:'#fff', borderRadius:20, justifyContent:'flex-end', alignItems:'center'}}>
              <Text style={{fontSize:20, marginBottom:40}}>succes</Text>
              
              <TouchableOpacity 
              style={{borderWidth:1, width:'40%', height:35, borderRadius:10, marginBottom:10, justifyContent:'center', alignItems:'center', backgroundColor:'#0092CC', borderColor:'#0092CC', elevation:5}}
              onPress={() => this.props.navigation.navigate('Screen3')}
              >
                  <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>OK</Text>
              </TouchableOpacity>
            
            </View>
          </View>
        </Modal> */}
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#0092CC',
            alignItems: 'center',
            paddingHorizontal: 10,
            height: 60,
            borderBottomEndRadius: 35,
            borderBottomStartRadius: 35,
            elevation: 10
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => this.props.navigation.navigate('Screen5')}
          >
            {arrowLeft}
          </TouchableOpacity>
          <Text style={{ fontSize: 18, marginLeft: 10, color: '#fff' }}>
            Edit Profile
          </Text>
        </View>
        <ScrollView>
          <View
            style={{
              height: 150,
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: 70
            }}
          >
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                borderWidth: 3,
                borderColor: '#f3f3f3',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {this.state.TextInput_avatar === null ? (
                <Icon name='user' size={50} color='#cdcdcd' />
              ) : (
                <Image
                  source={{
                    uri: this.state.TextInput_avatar
                    
                  }}
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: '#f3f3f3',
                    position: 'absolute'
                  }}
                />
              )}
              <Image
                  source={{
                    uri: `data:image/gif;base64, ${this.state.TextInput_avatar}`
                    
                  }}
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: '#f3f3f3',
                    position: 'absolute'
                  }}
                />
            </View>
            {/* <Text>{this.state.TextInput_avatar}</Text> */}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  height: 35,
                  backgroundColor: '#0092CC',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  margin: 10,
                  borderRadius: 5,
                  elevation: 10
                }}
                onPress={this.selectPhotoTapped.bind(this)}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                  add Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 35,
                  backgroundColor: '#0092CC',
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 25,
                  margin: 10,
                  borderRadius: 5,
                  elevation: 10
                }}
                onPress={this.ImageToServer}
              >
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                  upload
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.InMainContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
              }}
            >
              {user}
              <Text style={styles.TextUpTextInput}>Name :</Text>
            </View>
            <TextInput
              placeholder='Enter Student Name'
              onChangeText={TextInputValue =>
                this.setState({ TextInput_name: TextInputValue })
              }
              underlineColorAndroid='transparent'
              value={this.state.TextInput_name}
              style={styles.StylingTextInput}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
              }}
            >
              {email}
              <Text style={styles.TextUpTextInput}>E-mail :</Text>
            </View>
            <TextInput
              placeholder='Enter E-mail'
              value={this.state.TextInput_email}
              onChangeText={TextInputValue =>
                this.setState({ TextInput_email: TextInputValue })
              }
              underlineColorAndroid='transparent'
              style={styles.StylingTextInput}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
              }}
            >
              {Phone}
              <Text style={styles.TextUpTextInput}>No. Telephone :</Text>
            </View>
            <TextInput
              placeholder='Enter No. Telephone'
              value={this.state.TextInput_no_telp}
              onChangeText={TextInputValue =>
                this.setState({ TextInput_no_telp: TextInputValue })
              }
              underlineColorAndroid='transparent'
              style={styles.StylingTextInput}
            />

            <View style={styles.ViewTouch}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.Btn_TambahData}
                onPress={this.InsertStudentRecordsToServer}
              >
                {edit}
                <Text style={styles.StyleTambahData}> Edit Data </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default Editdata

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  StylingTextInput: {
    paddingLeft: 3,
    width: '85%',
    width: WIDTH - 75,
    marginBottom: 7,
    height: 40,
    borderBottomWidth: 0.5,
    borderColor: 'teal',
    fontSize: 15
  },

  Btn_TambahData: {
    borderRadius: 5,
    width: '90%',
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#0092CC',
    justifyContent: 'center',
    alignItems: 'center'
  },

  StyleTambahData: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center'
  },
  InMainContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  TextUpTextInput: {
    width: WIDTH - 45,
    fontWeight: '500',
    fontStyle: 'italic',
    fontSize: 15
  },
  ViewTouch: {
    marginTop: 25,
    alignItems: 'center',
    width: '90%',
    marginBottom: 10
  },
  ViewComponentModal1: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ViewComponentModal2: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})