import React from 'react';
import {View,AsyncStorage,TextInput,Text,Image,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


const eye =(<Icon name ='eye-slash' size={20} style={{padding:5}}/>)
class Register extends React.Component {
    state = {  
        name:'',
        email:'',
        password:'',
        telp:'',
        isLoading:false,
        modeVisibel:false,
        hide:true
    }
    SendData = (name,email,password,telp) =>{
        this.setState({isLoading:true})
        this.setState({modeVisibel:true})
        fetch('https://aqueous-hollows-28311.herokuapp.com/register',{
            method:"POST",
            headers:{
                Accept:'application/json',
                'Content-type':'application/json'
            },
            body: JSON.stringify({
                name:name,
                email:email,
                password:password,
                telp:telp
            })
        })
        .then(response=>response.json())
        .then(response =>{
            if(response.access_token){
                AsyncStorage.setItem('name',JSON.stringify(response.user.name))
                AsyncStorage.setItem('email',JSON.stringify(response.user.email))
                AsyncStorage.setItem('password',JSON.stringify(response.user.password))
                AsyncStorage.setItem('telp',JSON.stringify(response.user.telp))
                this.setState({isLoading:false})
                this.setState({modeVisibel:false})
                this.props.navigation.navigate('loogin')
            }
            else if (response.user.name){
                alert(response.user.name)
            }
            else if (response.user.email){
                alert(response.user.email)
            }
        })
        .then(response=>{
            this.setState({isLoading:true})
            this.setState({modeVisibel:false})
        })
        .catch(error=>{
            this.setState({isLoading:true})
            this.setState({modeVisibel:false})
            console.log(error)
            alert('error')
        })
    }
    hiden =() => {
        this.setState({hide: !this.state.hide})
    }
    render() {
        let {name,email,password,telp}= this.state
        return (
            <View>
                <View style={style.bag2}>
                    <View style={style.Acc}>
                        <TextInput
                        placeholder='Insert name'
                        value={this.state.name}
                        onChangeText={teks=> this.setState({name:teks})}
                        />
                    </View>
                    <View style={style.Input}/>
                    <View style={style.Acc}>
                        <TextInput
                        placeholder='Insert name'
                        value={this.state.email}
                        onChangeText={teks=> this.setState({email:teks})}
                        keyboardType='email-address'
                        />
                    </View>
                    <View style={style.Input}/>
                    <View style={style.Acc}>
                        <TextInput
                        placeholder='Insert name'
                        value={this.state.password}
                        secureTextEntry={this.state.hide}
                        onChangeText={teks=> this.setState({password:teks})}
                        />
                        <TouchableOpacity onPress ={this.hiden}>
                            {eye}
                        </TouchableOpacity>
                    </View>
                        <View style={style.Input}/>
                    <View style={style.Acc}>
                        <TextInput
                        placeholder='Insert name'
                        value={this.state.telp}
                        onChangeText={teks=> this.setState({telp:teks})}
                        keyboardType='number-pad'
                        />
                    </View>
                        <View style={style.Input}/>
                <TouchableOpacity
                onPress={()=> this.SendData(
                    name,
                    email,
                    password,
                    telp
                )}
                style={{alignItems:'center'}}
                >
                    <View style={style.Kotak}>
                        <Text>Sign Up</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

export default Register;

const style = StyleSheet.create({
    font:{
        fontSize:20,
    },
    headers:{
        height:50,
        width:150
    },
    Kotak:{
        height:50,
        width:150,
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center'
    },
    Acc:{
        flexDirection:'row'    ,
        justifyContent:'space-between',
        paddingHorizontal:10
    }  ,
    Input:{
        borderColor:'#ccc',
        borderWidth:1,
        marginVertical:10,
    },
    bag2:{
        height:'100%',
        width:'100%',
        paddingHorizontal:10,
        justifyContent:'center'
    }
})