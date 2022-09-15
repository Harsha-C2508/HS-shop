import * as types from './actionType'

const initial={
    isLoading: false,
    isError:false,
    painting:[],
    home:[],
    mens:[],
    womens:[],
    adminProd:[]
}

const reducer=(state=initial,action)=>{
 const {type,payload} = action;

 switch(type){
    case types.GET_DATA_PAINTING_REQUEST:
        return{
            ...state,
            isLoading: true,
            isError:false
        }

    case types.GET_DATA_PAINTING_SUCCESS:
        return{
            ...state,
            painting:payload,
            isLoading: false,
            isError:false,
        }  
        
    case types.GET_DATA_PAINTING_FAILURE:
        return{
            ...state,
            isError:true,
            isLoading: false,
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
    default:{
        return state;
    }
 }
}

export{ reducer}