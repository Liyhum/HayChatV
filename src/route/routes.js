import React from 'react';
import {} from 'react-native'
import {createAppContainer,createSwitchNavigator,} from 'react-navigation'
import {createStackNavigator} from "react-navigation-stack"
import {createDrawerNavigator} from 'react-navigation-drawer'
import ju from '../komponen/Home'
import Tampil from '../komponen/Tampil'
import da from '../komponen/datareg'
import Detail from '../komponen/Detail'
import Login from '../komponen/Login'
import Chats from '../komponen/Chat'
import Register from '../komponen/Register'
import Load from '../komponen/Loading'
import Private from '../komponen/Private';
const LoginStack= createStackNavigator ({
    Login :{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    data:{
        screen:da,
        navigationOptions:{
            header:null
        }
    },
    Private:{
        screen:Private,
        navigationOptions:{
            header:null
        }
    }
})

const tu = createStackNavigator(
{   
    
    Tampil:{
        screen:Tampil,
        navigationOptions:{
            header:null
        }
    },
    Home:{
        screen:ju,
        navigationOptions:{
            header:null
        }
    },
    
    Detail:{
        screen:Detail,
        navigationOptions:{
            header:null
        }
    },
    Chat:{
        screen:Chats,
        navigationOptions:{
            header:null
        }
    },
    Register:{
        screen:Register,
        navigationOptions:{
            header:null
        }
    },
    Private2:{
        screen:Private,
        navigationOptions:{
            header:null
        }
    }
},
)
const Cant = createSwitchNavigator({
    LoginStack: LoginStack,
    AuthFlow : tu,
    
})
export default createAppContainer(Cant)