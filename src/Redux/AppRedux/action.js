import axios from 'axios'
import * as types from './actionType'

// taking data for painting page
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

// taking data for home page
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

// taking data for mens page
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
    
// taking data for womens page
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



// taking data for admins page      
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

// part that adding,getting,and deleteing the data to from cart page
         const addCart = (data)=>(dispatch)=>{
            dispatch({type:types.ADD_TO_CART_REQUEST})
            return axios({
                method:"POST",
                url:"https://api-myntra.herokuapp.com/cart",
                data:{
                   ...data
                }
            })
            .then(res=>{ 
             dispatch({type:types.ADD_TO_CART_SUCCESS})
            })
            .catch(error=>{
             dispatch({type:types.ADD_TO_CART_FAILURE})
            })
        }

        const getDataFromCart =() => (dispatch)=>{
            dispatch({type:types.GET_DATA_FROM_CART_REQUEST})
            return axios({
                method:"GET",
                url:"https://api-myntra.herokuapp.com/cart"
              
            })
            .then(res=>{ 
             dispatch({
                type:types.GET_DATA_FROM_CART_SUCCESS,
                payload:res.data
             })
            })
            .catch(error=>{
             dispatch({type:types.GET_DATA_FROM_CART_FAILURE})
            })
        }

        const deleteCart = (data)=>(dispatch)=>{
            dispatch({type:types.DELETE_THE_CART_ITEM_REQUEST})
            return axios({
                method:"DELETE",
                url:`https://api-myntra.herokuapp.com/cart/${data}`,
            })
            .then(res=>{ 
                
             dispatch({
                type:types.DELETE_THE_CART_ITEM_SUCCESS,
                payload:res.data
            })
             dispatch({
                type:types.GET_DATA_FROM_CART_SUCCESS,
                payload:res.data
             })
            })
            .catch(error=>{
             dispatch({type:types.DELETE_THE_CART_ITEM_FAILURE})
            })
        }

// part where we get the data with Id to single item details page

        const getDataDetailshome =(id) => (dispatch)=>{
            dispatch({type:types.GET_SINGLE_DATA_REQUEST})
         
            return axios({
                method:"GET",
                url:`https://api-myntra.herokuapp.com/home/${id}`
            })
            .then(res=>{ 
             dispatch({
                type:types.GET_SINGLE_DATA_SUCCESS,
                payload:res.data
                })
            })
            .catch(error=>{
             dispatch({type:types.GET_SINGLE_DATA_FAILURE})
            })
        }

        const getDataDetailsMens =(id) => (dispatch)=>{
            dispatch({type:types.GET_SINGLE_DATA_MEN_REQUEST})
         
            return axios({
                method:"GET",
                url:`https://api-myntra.herokuapp.com/mensMeterial/${id}`
            })
            .then(res=>{ 
             dispatch({
                type:types.GET_SINGLE_DATA_MEN_SUCCESS,
                payload:res.data
                })
            })
            .catch(error=>{
             dispatch({type:types.GET_SINGLE_DATA_MEN_FAILURE})
            })
        }

        const getDataDetailsWomens =(id) => (dispatch)=>{
            dispatch({type:types.GET_SINGLE_DATA_WOMEN_REQUEST})
         
            return axios({
                method:"GET",
                url:`https://api-myntra.herokuapp.com/women/${id}`
            })
            .then(res=>{ 
             dispatch({
                type:types.GET_SINGLE_DATA_WOMEN_SUCCESS,
                payload:res.data
                })
            })
            .catch(error=>{
             dispatch({type:types.GET_SINGLE_DATA_WOMEN_FAILURE})
            })
        }


        const getDataDetailsPaint =(id) => (dispatch)=>{
            dispatch({type:types.GET_SINGLE_DATA_PAINT_REQUEST})
         
            return axios({
                method:"GET",
                url:`https://api-myntra.herokuapp.com/painting/${id}`
            })
            .then(res=>{ 
             dispatch({
                type:types.GET_SINGLE_DATA_PAINT_SUCCESS,
                payload:res.data
                })
            })
            .catch(error=>{
             dispatch({type:types.GET_SINGLE_DATA_PAINT_FAILURE})
            })
        }

        //  //  taking the data for edit it 
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


        // adding new product to data

        const addNewProduct=(payload)=>(dispatch)=>{
            dispatch({type:types.ADD_NEW_PRODUCT_REQUEST})

            return axios
            .post("https://api-myntra.herokuapp.com/home",payload)
            .then((r)=>{
                dispatch({
                    type:types.ADD_NEW_PRODUCT_SUCCESS,
                    payload:r.data
                })
            })
            .catch((e)=>{
                dispatch({
                    type:types.ADD_NEW_PRODUCT_FAILURE,
                    payload:e
                })
            })
        }

        // costomer details part 

        const customerDataAddress=(payload)=>(dispatch)=>{
            dispatch({type:types.ADD_DATA_SHOP_CUSTOMER_REQUEST})

            return axios
            .post("https://newshop-1.herokuapp.com/userDetailShop",payload)
            .then((r)=>{
                dispatch({
                    type:types.ADD_DATA_SHOP_CUSTOMER_SUCCESS,
                    payload:r.data
                })
            })
            .catch((e)=>{
                dispatch({
                    type:types.ADD_DATA_SHOP_CUSTOMER_FAILURE,
                    payload:e
                })
            })
        }

        const getCustomerDataAddress=()=>(dispatch)=>{
            dispatch({type:types.GET_DATA_SHOP_CUSTOMER_REQUEST})

            return axios
            .get("https://newshop-1.herokuapp.com/userDetailShop")
            .then((r)=>{
                dispatch({
                    type:types.GET_DATA_SHOP_CUSTOMER_SUCCESS,
                    payload:r.data
                })
            })
            .catch((e)=>{
                dispatch({
                    type:types.GET_DATA_SHOP_CUSTOMER_FAILURE,
                    payload:e
                })
            })
        }

        // home delivery get and post part
        const customerDataAddressOnline=(payload)=>(dispatch)=>{
            dispatch({type:types.ADD_DATA_HOME_CUSTOMER_REQUEST})
                console.log("payload",payload)
            return axios
            .post("https://newshop-1.herokuapp.com/userDetails",payload)
            .then((r)=>{
                dispatch({
                    type:types.ADD_DATA_HOME_CUSTOMER_SUCCESS,
                    payload:r.data
                })
            })
            .catch((e)=>{
                dispatch({
                    type:types.ADD_DATA_HOME_CUSTOMER_FAILURE,
                    payload:e
                })
            })
        }

        const getCustomerDataAddressOnline=(payload)=>(dispatch)=>{
            dispatch({type:types.GET_DATA_HOME_CUSTOMER_REQUEST})

            return axios
            .get("https://newshop-1.herokuapp.com/userDetails",payload)
            .then((r)=>{
                dispatch({
                    type:types.GET_DATA_HOME_CUSTOMER_SUCCESS,
                    payload:r.data
                })
            })
            .catch((e)=>{
                dispatch({
                    type:types.GET_DATA_HOME_CUSTOMER_FAILURE,
                    payload:e
                })
            })
        }


        // editing part for status

        const editStatusHome = ({dispatch,status,params})=>{  
            console.log("params",params)
            dispatch({ type:types.EDIT_STATUS_HOME_REQUEST })
            axios({
                url:`https://newshop-1.herokuapp.com/userDetails/${params.id}`,
                method:"PATCH",
                data:{
                    status
                }
            })
            .then(r=>{
                dispatch({ type:types.EDIT_STATUS_HOME_SUCCESS })
            })
            .catch(e=>{
                dispatch({type:types.EDIT_STATUS_HOME_FAILURE})
            })
        }

        const editStatusShop = ({dispatch,Sstatus,params})=>{  
            dispatch({ type:types.EDIT_STATUS_SHOP_REQUEST })
            axios({
                url:`https://newshop-1.herokuapp.com/userDetailShop/${params.no}`,
                method:"PATCH",
                data:{
                    Sstatus
                }
            })
            .then(r=>{
                dispatch({ type:types.EDIT_STATUS_SHOP_SUCCESS })
            })
            .catch(e=>{
                dispatch({type:types.EDIT_STATUS_SHOP_FAILURE})
            })
        }


        // wish List part
        const addWish = (data)=>(dispatch)=>{
            dispatch({type:types.ADD_TO_WISH_REQUEST})
            return axios({
                method:"POST",
                url:"https://api-myntra.herokuapp.com/wish",
                data:{
                   ...data
                }
            })
            .then(res=>{ 
             dispatch({type:types.ADD_TO_WISH_SUCCESS})
            })
            .catch(error=>{
             dispatch({type:types.ADD_TO_WISH_FAILURE})
            })
        }

        const getDataFromWish =() => (dispatch)=>{
            dispatch({type:types.GET_DATA_FROM_WISH_REQUEST})
            return axios({
                method:"GET",
                url:"https://api-myntra.herokuapp.com/wish"
              
            })
            .then(res=>{ 
             dispatch({
                type:types.GET_DATA_FROM_WISH_SUCCESS,
                payload:res.data
             })
            })
            .catch(error=>{
             dispatch({type:types.GET_DATA_FROM_WISH_FAILURE})
            })
        }

        const deleteWish = (data)=>(dispatch)=>{
            dispatch({type:types.DELETE_THE_WISH_ITEM_REQUEST})
            return axios({
                method:"DELETE",
                url:`https://api-myntra.herokuapp.com/wish/${data}`,
            })
            .then(res=>{ 
                
             dispatch({
                type:types.DELETE_THE_WISH_ITEM_SUCCESS,
                payload:res.data
            })
             dispatch({
                type:types.GET_DATA_FROM_WISH_SUCCESS,
                payload:res.data
             })
            })
            .catch(error=>{
             dispatch({type:types.DELETE_THE_WISH_ITEM_FAILURE})
            })
        }

export{ getPaintingData,
        getHomeData,
        getMensData,
        getWomensData,
        getDataAtAdminPage,
        editProdData,
        addCart,
        getDataFromCart,
        deleteCart,
        getDataDetailshome,
        getDataDetailsMens,
        getDataDetailsWomens,
        getDataDetailsPaint,
        addNewProduct,
        customerDataAddress,
        getCustomerDataAddress,
        customerDataAddressOnline,
        getCustomerDataAddressOnline,
        editStatusHome,
        editStatusShop,
        addWish,
        getDataFromWish,
        deleteWish
     }