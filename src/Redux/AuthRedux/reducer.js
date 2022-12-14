
import * as types from "./actionType"
const initialState = {
  isAuth: false,
  isAuthen: false,
  token: "",
  tokens:"",
  isLoading: false,
  isError: false,
};

const reducer = (state = initialState,action) => {
  const {type,payload} = action;
  switch(type){
    case types.LOGIN_REQUEST:
      return{
        ...state,
        isLoading:true,
        isError:false
      }
    case types.LOGIN_SUCCESS:
      return{
        ...state,
        isAuth:true,
        token:payload,
        isLoading:false,
        isError:false
      }
    case types.LOGIN_FAILURE:
      return{
        ...state,
        isLoading:false,
        isError:true
      }




    case types.SIGN_UP_REQUEST:
      return{
        ...state,
        isLoading:true,
        isError:false
      }  
    case types.SIGN_UP_SUCCESS:
      return{
        ...state,
        isAuth:true,
        token: payload
      }
    case types.SIGN_UP_FAILURE:
      return{
        ...state,
        isLoading:false,
        isError:true
      } 




      
    case types.LOGIN_TO_ADMIN_REQUEST:
      return{
        ...state,
        isLoading: true,
        isError:false
      }
    case types.LOGIN_TO_ADMIN_SUCCESS:
      return{
        ...state,
        isAuthen:true,
        tokens:payload,
        isLoading: false,
        isError:false
      } 
    case types.LOGIN_TO_ADMIN_FAILURE:
      return{
        ...state,
        isLoading: false,
        isError:true
      }      
    default:
      return state;
  }
};

export { reducer };
