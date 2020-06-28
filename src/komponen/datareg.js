
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  ToastAndroid
} from 'react-native'
import ba from '../komponen/styles'
import Iconss from 'react-native-vector-icons/MaterialCommunityIcons'
import {Username,Emailadd,Telpadd,Password,Name} from '../redux/action/index'
import { connect } from 'react-redux'

const Akun = <Iconss name='account' size={25} style={ba.img}/>
const Eye = <Iconss name='eye' size={20}/>
const Lock = <Iconss name='lock'  size={20} style={ba.img}/>
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data : [],
      username:'',
      password:'',
      name:'',
      telp:'',
      email:'',
      Hide:true
     }
  }

Kirimdata2 = (username,password,name,telp,email) =>{
  const Telp =parseInt(telp)
  fetch('https://calm-mesa-84057.herokuapp.com/register',{
    method:'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      username:username,
      password:password,
      name:name,
      no_telp:telp,
      email:email
    })
  })
  
  .then(response => response.json())
  .then(response=>{
    console.log(response)
    if(response.access_token){
      this._toastWithDurationGravityOffsetHandler()
      this.props.navigation.navigate('Login')
    }
    
  })
  .catch(error =>{
    console.log(error)
    Alert.alert('error')
  })
}
_toastWithDurationGravityOffsetHandler=()=>{
  ToastAndroid.showWithGravityAndOffset(
   'Success',
   ToastAndroid.LONG, 
   ToastAndroid.BOTTOM,
   25, 
   50 
 );
}
HidePassword = () =>{
  this.setState({Hide:!this.state.Hide})
}

  render() {
    let{username,password,telp,email,name}= this.state
    return ( 
      <ScrollView>
        <ImageBackground source={require('../../Asset/Background1.png')} style={{height:'99%',width:'100%'}}>
        <View style={ba.judul}>
          <Image source={require('../../Asset/logo.png')} style={{height:150,width:120,marginTop:40}}/>
        </View>
      <View style={ba.posisi2}>
        <View style={ba.bentuk}>
          
              <View style={ba.Iden}>
                {Akun}
                <TextInput
                    style={ba.line}
                    placeholder = "Masukan Nama lengkap Kamu"
                    onChangeText =  { text => this.setState({name:text})}
                    keyboardType='email-address'
                />
              </View>
              <View style={ba.Iden}>
                {Akun}
                <TextInput
                    style={ba.line}
                    placeholder = "Masukan Username Kamu"
                    onChangeText =  { text => this.setState({username:text})}
                />
              </View>
              <View style={ba.Iden}>
                {Lock}
                <TextInput
                    style={ba.line}
                    placeholder = "Masukan Password Kamu"
                    onChangeText =  { text => this.setState({password:text})}
                    secureTextEntry={this.state.Hide}
                    
                />
                <TouchableOpacity onPress={this.HidePassword}>
                  {Eye}
                </TouchableOpacity>
              
              </View>
              <View style={ba.Iden}>
                <Image source={require('../../Asset/call-answer.png')}
                style={ba.img}
                />
                <TextInput
                    style={ba.line}
                    placeholder = "Masukan Nomor Kamu"
                    onChangeText =  { text => this.setState({telp:text})}
                    keyboardType='number-pad'
                />
              </View>
              <View style={ba.Iden}>
                <Image source={require('../../Asset/email.png')}
                style={ba.img}
                />
                <TextInput
                    style={ba.line}
                    placeholder = "Masukan Email Kamu"
                    onChangeText =  { text => this.setState({email:text})}
                    keyboardType='email-address'
                />
              </View>
          </View>
        </View>  
        <TouchableOpacity
        style={b.posisi}
        onPress={()=>this.Kirimdata2(
          username,
          password,
          name,
          telp,
          email,
          
        )}
        >
            <View>
              <View style={ba.Button2}>
                <Text style={ba.font}>Register</Text> 
              </View>
              
            </View>
        </TouchableOpacity>
        </ImageBackground>
        </ScrollView>
     );
  }
}
 const map = state =>{
   let {username,email,password,telp,name} =state.reduc
   return{username,email,password,telp,name}
 }
 export default connect(map,{Username,Password,Telpadd,Emailadd,Name})(App)
const b = StyleSheet.create({
    bentuk:{
        padding:12,
        borderWidth:2,
        borderRadius:30,
        borderColor:'white',
        marginVertical:5,
    },
    po:{
        paddingHorizontal:10,
        paddingVertical:20   
    },
    Button:{
        height:60,
        width:100,
        borderRadius:20,
        borderColor:'white',
        borderWidth:2,
        alignItems:'center',
        justifyContent:'center',
    },
    posisi:{
        alignItems:'center'
    },
    teks:{
        fontSize:15,
        fontWeight:'bold'
    },
    header:{
        height:60,
        width:'100%',
        elevation:4,
        backgroundColor:'white',
        justifyContent:'center'
    },
    judul:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:19,
        paddingVertical:19
    },
    Back:{
      paddingHorizontal:10,
      justifyContent:"space-between",
      flexDirection:'row',
      marginTop:120
    },
    line:{
      borderBottomColor:'green',
      borderBottomWidth:1
    },
    img:{
      height:20,
      width:20,
    },
    img3:{
      height:25,
      width:25
    }
})