import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    AsyncStorage,
    Image,TouchableOpacity
} from 'react-native'
import Route from '../route/routes'

class AuthLoding extends Component {
    state ={
        role:true
    }
    render() { 
        setTimeout(()=>{
            this.setState({role:false})
        },3000)
        if(this.state.role){
            return(
            <View style = {{ flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginStack')}>
                    <Image source={require('../../Asset/logo.png')} style={{height:190,width:150}}/>
                </TouchableOpacity>
            </View>
            )
        }
        return ( 
            <Route/>
         );
    }
}
 
export default AuthLoding;