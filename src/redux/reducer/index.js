//Call the index Type
import {USERNAME, EMAILADD, PASSWORD, TELPADD, GETDATA, NAME} from '../type/index'
import {combineReducers}  from 'redux'

const istate ={
    username:'',
    email:'',
    password:'',
    telp:'',
    name:'',
    GetData:[]
}
const reduc = (state= istate, action) =>{
    switch(action.type){
        case USERNAME:
            return{...state, username: action.payload}
        case EMAILADD:
            return{...state, email:action.payload}
        case PASSWORD:
            return{...state, password:action.payload}
        case TELPADD:
            return{...state, telp:action.payload}
        case GETDATA:
            return{...state, GetData:action.payload}
        case NAME :
            return {...state, name :action.payload}
        default:
            return state
    }
}
export default combineReducers({reduc})