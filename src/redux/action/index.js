import {USERNAME, EMAILADD, PASSWORD, TELPADD,GETDATA,NAME} from '../type/index'

export const Username = payload =>{
    return{
        type :USERNAME,
        payload:payload
    }
}
export const Emailadd =payload =>{
    return{
        type:EMAILADD,
        payload:payload
    }
}
export const Password = payload =>{
    return{
        type:PASSWORD,
        payload:payload
    }
}
export const Telpadd = payload =>{
    return{
        type:TELPADD,
        payload:payload
    }
}
export const getdata= payload =>{
    return{
        type:GETDATA,
        payload:payload
    }
}
export const Name= payload =>{
    return{
        type:NAME,
        payload:payload
    }
}