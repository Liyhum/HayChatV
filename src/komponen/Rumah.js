import React, { Component } from 'react';
import { View,Text,Image,ActivityIndicator,ScrollView } from 'react-native';
import Route from '../route/routes'
class Rumah extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            role:true
         };
    }
    splas =()=>{
        if(this.state.role==true){
            return(
                <View style={{width:"100%",height:"100%",backgroundColor: "red",alignItems:'center',justifyContent:"center"}}>
                    <Image source={require('../../Asset/back.png')} style={{height:50,width:50}}/>
                </View>
            )
        }
        else{
            return false
        }
    }
    render() {
        setTimeout(() => {
            this.setState({role:false})
        },5000);
        return (
            <View style={{flex:1}}>
                 {this.splas()}
                <View style={{width:"100%",height:"100%",backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
                    <Text>Login</Text>
                </View>
            </View>
        );
    }
}

export default Rumah;