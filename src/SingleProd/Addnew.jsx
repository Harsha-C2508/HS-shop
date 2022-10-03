import { Box, Button, Heading, Input, Select, Text } from '@chakra-ui/react'
import React from 'react'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminNav from '../Components/AdminNav'
import { addNewProduct, getHomeData } from '../Redux/AppRedux/action'

const initial = {
    name: "",
    img: "",
    price: 0,
    dis: "",
    cat: "",
    offer: "",
    star: ""
}

const reducerFun =(state,action)=>{
switch(action.type){
  case "name":
    return {
      ...state,
      name: action.payload
    }
  case "img":
    return {
      ...state,
      img: action.payload
    }
  case "price":
    return {
      ...state,
      price: action.payload
    }  
  case "dis":
    return {
      ...state,
      dis: action.payload
    }
  case "cat":
    return {
      ...state,
      cat: action.payload
    } 
  case "offer":
    return {
      ...state,
      offer: action.payload
    }
  case "star":
    return {
      ...state,
      star: action.payload
    }  
    
   default:
    return state 
 }
}
const Addnew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [prodState,setProdState] = useReducer(
    reducerFun,
    initial
  )

  const addHandler= ()=>{
    if(JSON.stringify(prodState)!== JSON.stringify(initial)){
      dispatch(addNewProduct(prodState))
      .then(()=> dispatch(getHomeData()))
      .then(()=>{
        navigate("/")
      });
    }
  }
  return (
    <Box >
      <AdminNav/>
        <Heading>New Item</Heading>

        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Text style={{ width:"170px" }}>Product Name:</Text>
            <Input 
            type='text'
            placeholder='Name of the product'
            width='270px'
            value={prodState.name}
            onChange={(e)=>
              setProdState({
                type:"name",payload: e.target.value
              })
            }
            />
        </Box>

        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Text style={{ width:"170px" }}>Product Image:</Text>
            <Input 
            type='url'
            placeholder='Image URL of the product'
            width='270px'
            value={prodState.img}
            onChange={(e)=>
              setProdState({
                type:"img",payload: e.target.value
              })
            }
            />
        </Box>

        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Text style={{ width:"170px" }}>Product Price:</Text>
            <Input 
            type='number'
            placeholder='Price of the product'
            width='270px'
            value={prodState.price}
            onChange={(e)=>
              setProdState({
                type:"price",payload: e.target.value
              })
            }
            />
        </Box>

        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Text style={{ width:"170px" }}>Product Description:</Text>
            <Input 
            type='text'
            placeholder='Description of the product'
            width='270px'
            value={prodState.dis}
            onChange={(e)=>
              setProdState({
                type:"dis",payload: e.target.value
              })
            }
            />
        </Box>

        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Text style={{ width:"170px" }}>Product Offer:</Text>
            <Input 
            type='text'
            placeholder='Offer of the product'
            width='270px'
            value={prodState.offer}
            onChange={(e)=>
              setProdState({
                type:"offer",payload: e.target.value
              })
            }
            />
        </Box>

        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Text style={{ width:"170px" }}>Product Rating:</Text>
            <Input 
            type='text'
            placeholder='Rating of the product'
            width='270px'
            value={prodState.star}
            onChange={(e)=>
              setProdState({
                type:"star",payload: e.target.value
              })
            }
            />
        </Box>

        <Box style={{ display:"flex",width:"40%",padding:"5px 0",justifyContent:"center",marginTop:"15px",margin:"auto" }}>
            <Text style={{ width:"200px" }}>Product Category:</Text>
           <Select  width='270px'  value={prodState.cat}
            onChange={(e)=>
              setProdState({
                type:"cat",payload: e.target.value
              })
            }>
                <option value='painting'>Painting</option>
                <option value='Skirts'>Skirts</option>
                <option value='Sweaters'>Sweaters</option>
                <option value='T-shirt'>T-shirt</option>
                <option value=' Shorts'>Shorts</option>
                <option value='Jeans'>Jeans</option>
                <option value='Sports Shorts'>Sports Shorts</option>
                <option value='Shirt'>Shirt</option>
                <option value='Top'>Top</option>
                <option value='Joggers'>Joggers</option>
                <option value='Palazzo Pants'>Palazzo Pants</option>
           </Select>
        </Box>
      
        <Box style={{ display:"flex",padding:"5px 0",justifyContent:"center",marginTop:"15px" }}>
            <Button onClick={addHandler}>Add New</Button>
        </Box>

    </Box>
  )
}

export default Addnew