import * as types from './actionType'

const initial={
    isLoading: false,
    isError:false,
    data1:[]
}

const reducer=({state=initial,action})=>{
 const {type,payload} = action;

 switch(type){
    case types.GET_DATA_REQUEST:
        return{
            ...state,
            isLoading: true
        }

    case types.GET_DATA_SUCCESS:
        return{
            ...state,
            data1:payload
        }  
        
    case types.GET_DATA_FAILURE:
        return{
            ...state,
            isError:true,
        }   
    
    default:
        return state    
 }
}

export{ reducer}