import * as types from './actionType'

const initial={
    isLoading: false,
    isError:false,
    painting:[],
    home:[],
    mens:[],
    womens:[],
    adminProd:[],
    cart:[],
    homeDetails:[],
    mensDetails:[],
    womensDetails:[],
    paintDetails:[],
    wish:[],
    shopCust:[],
    deliveryCust:[],
}

const reducer=(state=initial,action)=>{
 const {type,payload} = action;

 switch(type){
    case types.GET_DATA_PAINTING_REQUEST:
        return{
            ...state,
            isLoading1: true,
            isError1:false
        }

    case types.GET_DATA_PAINTING_SUCCESS:
        return{
            ...state,
            painting:payload,
            isLoading1: false,
            isError1:false,
        }  
        
    case types.GET_DATA_PAINTING_FAILURE:
        return{
            ...state,
            isError1:true,
            isLoading1: false,
        }   


    case types.GET_HOME_DATA_REQUEST1:
        return{
            ...state,
            isLoading: true,
            isError:false
        }
    
    case types.GET_HOME_DATA_SUCCESS1:
        return{
            ...state,
            home:payload,
            isLoading: false,
            isError:false,
        }  
            
    case types.GET_HOME_DATA_FAILURE1:
        return{
            ...state,
            isError:true,
            isLoading: false,
        }   


    case types.GET_MENS_DATA_REQUEST2:
        return{
            ...state,
            isLoading: true,
            isError:false
        }
        
    case types.GET_MENS_DATA_SUCCESS2:
        return{
            ...state,
            mens:payload,
            isLoading: false,
            isError:false,
        }  
                
    case types.GET_MENS_DATA_FAILURE2:
        return{
            ...state,
            isError:true,
            isLoading: false,
        }     
                
    case types.GET_WOMENS_DATA_REQUEST3:
         return{
            ...state,
            isLoading: true,
            isError:false
        }
            
    case types.GET_WOMENS_DATA_SUCCESS3:
        return{
            ...state,
            womens:payload,
            isLoading: false,
            isError:false,
        }  
                    
    case types.GET_WOMENS_DATA_FAILURE3:
        return{
        ...state,
        isError:true,
        isLoading: false,
        } 
        
    case types.ADMIN_PAGE_PRODUCT_REQUEST:
        return{
            ...state,
            isLoading:true,
            isError:false
        } 
    case types.ADMIN_PAGE_PRODUCT_SUCCESS:
        return{
            ...state,
            adminProd:payload,
            isLoading:false,
            isError:false
        } 
    case types.ADMIN_PAGE_PRODUCT_FAILURE:
        return{
            ...state,
            isError:true
        } 
    case types.ADD_TO_CART_REQUEST:
        return{
            ...state,
            isLoading:true
        }                 
    case types.ADD_TO_CART_SUCCESS:
        return{
            ...state,
            isLoading:false,
            isError:false
        }
    case types.ADD_TO_CART_FAILURE:
        return{
            ...state,
            isError:true
        } 
    case types.GET_SINGLE_DATA_REQUEST:
        return{
            ...state,
            isLoading:true
        }                 
    case types.GET_SINGLE_DATA_SUCCESS:
        return{
            ...state,
            homeDetails:payload
        } 
    case types.GET_SINGLE_DATA_FAILURE:
        return{
            ...state,
            isError:true
        }            
    case types.GET_DATA_FROM_CART_REQUEST:
        return{
            ...state,
            isLoading: true
        }            
    case types.GET_DATA_FROM_CART_SUCCESS:
        return{
            ...state,
            cart:payload,
            isLoading:false,
            isError:false
        }    
    case types.GET_DATA_FROM_CART_FAILURE:
        return{
            ...state,
            isError:true
        }    
    case types.DELETE_THE_CART_ITEM_REQUEST:
        return{
            ...state,
            isLoading:true
        }    
    case types.DELETE_THE_CART_ITEM_SUCCESS:
        return{
            ...state,
            cart:payload
        }    
    case types.DELETE_THE_CART_ITEM_FAILURE:
        return{
            ...state,
            isError:true
        } 
    case types.GET_SINGLE_DATA_MEN_REQUEST:
        return{
            ...state,
            isLoading:true
        }                 
    case types.GET_SINGLE_DATA_MEN_SUCCESS:
        return{
            ...state,
            mensDetails:payload
        } 
    case types.GET_SINGLE_DATA_MEN_FAILURE:
        return{
            ...state,
            isError:true
        }     
    case types.GET_SINGLE_DATA_WOMEN_REQUEST:
        return{
            ...state,
            isLoading:true
        }                 
    case types.GET_SINGLE_DATA_WOMEN_SUCCESS:
        return{
            ...state,
            womensDetails:payload
        } 
    case types.GET_SINGLE_DATA_WOMEN_FAILURE:
        return{
            ...state,
            isError:true
        }     
        
    case types.GET_SINGLE_DATA_PAINT_REQUEST:
        return{
            ...state,
            isLoading:true
        }                 
    case types.GET_SINGLE_DATA_PAINT_SUCCESS:
        return{
            ...state,
            paintDetails:payload
        } 
    case types.GET_SINGLE_DATA_PAINT_FAILURE:
        return{
            ...state,
            isError:true
        } 
    case types.ADD_TO_WISH_REQUEST:
        return{
            ...state,
            isLoading:true
        }                 
    case types.ADD_TO_WISH_SUCCESS:
        return{
            ...state,
            isLoading:false,
            isError:false
        }
    case types.ADD_TO_WISH_FAILURE:
        return{
            ...state,
            isError:true
        }
    case types.GET_DATA_FROM_WISH_REQUEST:
        return{
            ...state,
            isLoading: true
        }            
    case types.GET_DATA_FROM_WISH_SUCCESS:
        return{
            ...state,
            wish:payload,
            isLoading:false,
            isError:false
        }    
    case types.GET_DATA_FROM_WISH_FAILURE:
        return{
            ...state,
            isError:true
        }    
    case types.DELETE_THE_WISH_ITEM_REQUEST:
        return{
            ...state,
            isLoading:true
        }    
    case types.DELETE_THE_WISH_ITEM_SUCCESS:
        return{
            ...state,
            wish:payload
        }    
    case types.DELETE_THE_WISH_ITEM_FAILURE:
        return{
            ...state,
            isError:true
        } 
    
    case types.GET_DATA_SHOP_CUSTOMER_REQUEST:
        return{
            ...state,
            isError:false,
            isLoading:true
        }
    case types.GET_DATA_SHOP_CUSTOMER_SUCCESS:
        return{
            ...state,
            shopCust:payload,
            isError:false,
            isLoading:false
        }
    case types.GET_DATA_SHOP_CUSTOMER_FAILURE:
        return{
            ...state,
            isError:true,
            isLoading:false
        }
    case types.GET_DATA_HOME_CUSTOMER_REQUEST:
        return{
            ...state,
            isError:false,
            isLoading:true
        }
    case types.GET_DATA_HOME_CUSTOMER_SUCCESS:
        return{
            ...state,
            deliveryCust:payload,
            isError:false,
            isLoading:false
        }
    case types.GET_DATA_HOME_CUSTOMER_FAILURE:
        return{
            ...state,
            isError:true,
            isLoading:false
        }
    default:{
        return state;
    }
 }
}

export{ reducer}