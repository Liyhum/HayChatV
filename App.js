import React from 'react';
import {View,ImageBackground,StyleSheet,Text,ActivityIndicator} from 'react-native'
import Route from './src/route/routes'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import Thunk from 'redux-thunk'
import reduc from './src/redux/reducer/index'
import Rumah from './src/komponen/Rumah';

class App extends React.Component{

  render(){
    return(
      <Provider store={createStore(reduc,{},applyMiddleware(Thunk))}>
        <Route/>
      </Provider>
      
    )
  }
}
const lo = StyleSheet.create({
  jun:{
      backgroundColor:'white',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  gam:{
      height:100,
      width:100,
      justifyContent:'center',
      alignItems:'center'
  },
  Text:{
    fontSize:43,
    color:'#000'
  }
})
export default App;