
import React, { Component } from 'react';
import {View,Text,StyleSheet,RefreshControl,ActivityIndicator,FlatList,Image,TouchableOpacity} from 'react-native'
import Floating from 'react-native-action-button'
class App extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          data : [],
          isLoading :true
         }
         this.state={refreshing:false}
         this.ambildata();
      }
      ambildata = async () => {
        return fetch('https://calm-mesa-84057.herokuapp.com/tampil')
        .then((respose) => respose.json())
        .then((resposeJson) => {
          console.log(resposeJson)
          this.setState({
            data : resposeJson
          })
        } )
        .catch((error) => console.log(error))
      }
    
      componentDidMount(){
        this.ambildata()
      }
      update=(updateItem)=>{
        this.props.navigation.navigate('Home',{detail:updateItem})
      }
      _onRefresh(){
        this.setState({ data: [] });
        this.ambildata()
      }
      renderItems = ({item}) => {
        const {
            id,
            username,
            name,
            no_telp,
            avatar,
        email
        } = item 

        return(
            <View>
                <View>
                    <View style={styles.posisi}>
                        <View style={styles.dalam1}>
                            <Text style={styles.font1}> {id} </Text>
                        </View>
                    </View>
                    <View style={styles.dalam}>
                        <Text style={styles.teks}>Nama</Text>
                        <Text style={styles.font}> {name} </Text>
                    </View>
                    <View style={styles.dalam}>
                        <Text style={styles.teks}>Kelas</Text>
                        <Text style={styles.font}> {username} </Text>
                    </View>
                    <View style={styles.dalam}>
                        <Text style={styles.teks}>Nomor Handphone</Text>
                        <Text style={styles.font}> {no_telp} </Text>
                    </View>
                    <View style={styles.dalam}>
                        <Text style={styles.teks}>Email</Text>
                        <Text style={styles.font}> {email} </Text>
                    </View>
                    <View/>
                </View>
            </View>
        )
        
        }
    render(){
        if (this.state.refreshing) {
            return (
              <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicator 
                size="large"
                color={["green","white","blue"]}
                />
              </View>
            );
          }
        return(
            <View style={{flex:1}}>
                <View style={styles.judul}>
                    <TouchableOpacity
                    onPress={()=>this.props.navigation.navigate('Tampil')}
                    >
                        <Image source={require('../../Asset/back.png')}
                        style={styles.img3}
                        />
                    </TouchableOpacity>
                    <Text style={styles.teks}>Register</Text>
                </View>
                <FlatList
                data = {this.state.data}
                keyExtractor={item => item.toString()}
                renderItem={this.renderItems}
                refreshControl={
                    <RefreshControl refreshing={this.state.isLoading}
                    onRefresh={this._onRefresh.bind(this)}
                    colors={["green","blue","green","yellow"]}
                    />
                }
                />
                    
             
            <Floating buttonColor='#7e9a00'>
                  <Floating.Item
                  title='Tambah Data'
                  onPress={()=>this.props.navigation.navigate('data')}
                  >
                    <Image source={require('../../Asset/add-to-database.png')} style={styles.Button2}/>
                  </Floating.Item>
                  <Floating.Item
                  title='Detail'
                  onPress={()=>this.props.navigation.navigate('Detail')}
                  >
                    <Image source={require('../../Asset/loupe.png')} style={styles.Button2}/>
                  </Floating.Item>
            </Floating>
            </View>
        )
    }
    
}
export default App

const styles = StyleSheet.create ({
  
    Bentuk:{
        borderWidth:1,
        borderColor:"#ccc",
    },
    posisi:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:15
    },
    dalam:{
        paddingHorizontal:9,
        paddingVertical:9,
        flex:1
    },
    dalam1:{
        alignItems:'center',
        justifyContent:'center',
        height:50,
        width:50,
        borderWidth:2,
        borderColor:'#000',
        flex:1
    },
    font:{
        fontSize:20,
        color:'gray',
        fontStyle:'italic'
    },
    font1:{
        fontSize:20,
        color:'#000',
        fontWeight:'bold'
    },
    teks:{
        fontSize:23
    },
    img3:{
      height:25,
      width:25
    },
    judul:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:19,
        paddingVertical:19
    },
    teks:{
        fontSize:15,
        fontWeight:'bold'
    },
})


const actions = [
    {
      text: "Tambah Data",
      icon: require('../../Asset/add-to-database.png'),
      name: "bt_Tambah",
      position: 2,
      color:'white'
    },
    {
        text: "Update",
        icon: require('../../Asset/add-to-database.png'),
        name: "bt_Deta",
        position: 2,
        color:'white'
      },
]