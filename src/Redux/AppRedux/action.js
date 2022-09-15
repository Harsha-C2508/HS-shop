import axios from 'axios'
import * as types from './actionType'


const getPaintingData=(params)=>(dispatch)=>{
dispatch({type:types.GET_DATA_PAINTING_REQUEST})
return axios
.get("https://api-myntra.herokuapp.com/painting",params)
.then((r)=>{
    return dispatch({
         type:types.GET_DATA_PAINTING_SUCCESS,
         payload:r.data
    })
})
.catch((e)=>{
    return dispatch({type:types.GET_DATA_PAINTING_FAILURE})
})
};

const getHomeData=(params)=>(dispatch)=>{
    dispatch({type:types.GET_HOME_DATA_REQUEST1})
    return axios
    .get("https://api-myntra.herokuapp.com/home",params)
    .then((r)=>{
        return dispatch({
             type:types.GET_HOME_DATA_SUCCESS1,
             payload:r.data
        })
    })
    .catch((e)=>{
        return dispatch({type:types.GET_HOME_DATA_FAILURE1})
    })
    };

    const getMensData=(params)=>(dispatch)=>{
        dispatch({type:types.GET_MENS_DATA_REQUEST2})
        return axios
        .get("https://api-myntra.herokuapp.com/mensMeterial",params)
        .then((r)=>{
            return dispatch({
                 type:types.GET_MENS_DATA_SUCCESS2,
                 payload:r.data
            })
        })
        .catch((e)=>{
            return dispatch({type:types.GET_MENS_DATA_FAILURE2})
        })
        };
    
        const getWomensData=(params)=>(dispatch)=>{
            dispatch({type:types.GET_WOMENS_DATA_REQUEST3})
            return axios
            .get("https://api-myntra.herokuapp.com/women",params)
            .then((r)=>{
                return dispatch({
                     type:types.GET_WOMENS_DATA_SUCCESS3,
                     payload:r.data
                })
            })
            .catch((e)=>{
                return dispatch({type:types.GET_WOMENS_DATA_FAILURE3})
            })
            };
          
         const getDataAtAdminPage=()=>(dispatch)=>{
            dispatch({type:types.ADMIN_PAGE_PRODUCT_REQUEST})
            return axios
            .get("https://api-myntra.herokuapp.com/home")
            .then((r)=>{
                return dispatch({
                    type:types.ADMIN_PAGE_PRODUCT_SUCCESS,
                    payload:r.data
                })
            })
            .catch((e)=>{
                return dispatch({type:types.ADMIN_PAGE_PRODUCT_FAILURE})
            })
         }   

         const editProdData = ({dispatch,img,price,offer,star,params})=>{
   
            dispatch({ type:types.EDIT_PRODUCT_REQUEST })
            axios({
                url:`https://api-myntra.herokuapp.com/home/${params.id}`,
                method:"PATCH",
                data:{
                    img,
                    price,
                    offer,
                    star
                }
            })
            .then(r=>{
                dispatch({ type:types.EDIT_PRODUCT_SUCCESS })
            })
            .catch(e=>{
                dispatch({type:types.EDIT_PRODUCT_FAILURE})
            })
        }

export{ getPaintingData,
        getHomeData,
        getMensData,
        getWomensData,
        getDataAtAdminPage,
        editProdData
     }