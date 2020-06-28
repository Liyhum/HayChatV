import React from 'react';
import {View,TextInput,FlatList,Image,AsyncStorage,TouchableOpacity,Text,StyleSheet,ImageBackground,ToastAndroid}  from 'react-native'
import Sty from '../komponen/styles'
import Icons from 'react-native-vector-icons/FontAwesome'
import { ScrollView } from 'react-native-gesture-handler';
// import SPin from 'react-native-spinkit'
const eye =<Icons name='eye' size={25}/>

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      Name:'',
      Password:'',
      Sembunyi:true,
      role:true
     };
  }
  HidePassword = () =>{
    this.setState({Sembunyi:!this.state.Sembunyi})
  }

_toastWithDurationGravityOffsetHandler=()=>{
  ToastAndroid.showWithGravityAndOffset(
   'Failed To Login',
   ToastAndroid.LONG, 
   ToastAndroid.BOTTOM,
   25, 
   50 
 );
}
  componentDidMount(){
    AsyncStorage.getItem('access_token').then(value=>{
      if(value!=null){
        this.props.navigation.navigate('Tampil')
      }
    })
  }
  
  login=()=>{
    const{
      Name,
      Password
    }=this.state
    fetch('https://calm-mesa-84057.herokuapp.com/login',{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:Name,
        password:Password
      })
    })
    .then((respons)=>respons.json())
    .then((respons)=>{
      console.log(respons)
      if (respons.access_token)
      {
        AsyncStorage.setItem('id',JSON.stringify(respons.user.id))
        AsyncStorage.setItem('name',respons.user.name)
        AsyncStorage.setItem('email',respons.user.email)
        AsyncStorage.setItem('no_telp',JSON.stringify(respons.user.no_telp))
        AsyncStorage.setItem('access_token', respons.access_token)
        AsyncStorage.setItem('avatar',respons.user.avatar)
        console.log('Sukses')
        this.props.navigation.navigate('Tampil')
      }
      else if(respons.user.username){
        alert('Goo ga ada isinya')
      }
    })
    .catch(err=>{
      this._toastWithDurationGravityOffsetHandler()
      console.log(err)
      
    })
  }
  render() {
    let{Name,Password} = this.state
    setTimeout(()=>{
      this.setState({role:false})
    },3000)
    if(this.state.role){
      return(
        <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
          <Image source={require('../../Asset/logo.png')} style={{height:190,width:150}}/>
          {/* <SPin
          size={50}
          type='Wave'
          color='#ccc'
          /> */}
        </View>
      )
    }
    return (
      <ScrollView>
        <View style={{flex:1}}>
  <ImageBackground
  source={require('../../Asset/background.png')}
  style={{height:800,width:'100%',justifyContent:'center',alignItems:'center'}}
  >
    <View style={Sty.logo}>
      <Image source={require('../../Asset/logo.png')} style={{height:190,width:150}}/>
    </View>
   
    <View style={Sty.back}>
      <View style={Style.posisi}>
        <Text style={Style.login}>LOGIN</Text>
        <View style={Style.Bentuk}>
          <TextInput
          placeholder="Masukan Username"
          onChangeText={text=> this.setState({Name:text})}
          />
          <View style={Style.line}/>
        </View>
        <View style={Style.Bentuk}>
          <View style={Style.be}>
            <TextInput
            placeholder="Masukan Password"
            onChangeText={text=> this.setState({Password:text})}
            secureTextEntry={this.state.Sembunyi}
            />
            <TouchableOpacity onPress={this.HidePassword}>
              {eye}
            </TouchableOpacity>
          </View>
          
          <View style={Style.line}/>
        </View>
        
      </View>
      
     
    </View> 
    <View style={Sty.Register}>
        <TouchableOpacity onPress={()=> this.login(
          Name,
          Password
        )}>
          <View style={Style.Button}>
            <Text style={{color:"white"}}>Login</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Private')}>
          <Text>Forget You Password??</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Sty.ref} onPress={()=>this.props.navigation.navigate('data')}>
          <Text>Don't have Account?</Text>
          <Text style={Sty.font}>Create Now </Text>
        </TouchableOpacity>
      </View>
  </ImageBackground>
  </View>  
      </ScrollView>
    );
  }
}

export default Login;
const Style= StyleSheet.create({
  posisi:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  posisi2:{
    flex:1,
  },
  img:{
    height:50,
    width:50
  },
  Button:{
    height:50,
    width:150,
    borderRadius:50,
    backgroundColor:'violet',
    alignItems:'center',
    justifyContent:'center',
  },
  line:{
    borderWidth:1,
    borderColor:'#ccc'
  },
  posisi3:{
    alignItems:'flex-end',
    paddingHorizontal:15,
    paddingVertical:15
  },
  be:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  Bentuk:{
    height:40,
    width:200,
    marginVertical:10
  },
  login:{
    fontSize:30,
    color:'violet',
    
  }
})