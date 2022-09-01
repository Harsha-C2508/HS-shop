import axios from 'axios'
import * as types from './actionType'

const getdata1Painting=()=>(dispatch)=>{
dispatch({type:types.GET_DATA_REQUEST})
return axios.get("https://api-myntra.herokuapp.com/painting")
.then((r)=>{
    return dispatch({
         type:types.GET_DATA_SUCCESS,
         payload:r.data
})
})
.catch((e)=>{
    dispatch({type:types.GET_DATA_FAILURE})
})
};

export{ getdata1Painting }