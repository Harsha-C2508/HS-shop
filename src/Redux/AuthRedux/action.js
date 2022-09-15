import * as types from '../AuthRedux/actionType'
import axios from 'axios'

const login =(payload)=>(dispatch)=>{
    dispatch({ type: types.LOGIN_REQUEST });
    return axios({
        method: 'post',
        url: '/api/login',
        baseURL: 'https://reqres.in',
        data: payload
    })
    .then(r=> dispatch({
        type: types.LOGIN_SUCCESS,payload:r.data
    }))
    .catch(e=>
        dispatch({ 
            type: types.LOGIN_FAILURE
        }))
}


 const signUp = (payload)=>(dispatch)=>{
    dispatch({type:types.SIGN_UP_REQUEST})
    return axios({
        method:"POST",
        url:"https://reqres.in/api/register",
        data:{
           ...payload
        }
    })
    .then(res=>{ 
        console.log(res.data)
     dispatch({type:types.SIGN_UP_SUCCESS,payload:res.data})
    })
    .catch(error=>{
     dispatch({type:types.SIGN_UP_FAILURE})
    })
}
 export { login,signUp }