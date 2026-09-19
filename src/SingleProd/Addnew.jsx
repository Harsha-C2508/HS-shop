import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../Components/AdminNav';
import { addNewProduct, getDataAtAdminPage } from '../Redux/AppRedux/action';

const initial = {
  name: '',
  img: '',
  price: '',
  dis: '',
  cat: 'Shirt',
  offer: '',
  star: '',
  category: 'home',
};

const reducer = (state, action) => ({ ...state, [action.field]: action.value });

const Addnew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [prod, setProd] = useReducer(reducer, initial);

  const set = (field) => (e) => setProd({ field, value: e.target.value });

  const addHandler = () => {
    if (!prod.name || !prod.img || !prod.price) {
      toast({ title: 'Name, image URL, and price are required', status: 'warning' });
      return;
    }
    dispatch(
      addNewProduct({
        ...prod,
        price: Number(prod.price),
        offer: Number(prod.offer) || 0,
        star: Number(prod.star) || 0,
      })
    ).then(() => {
      dispatch(getDataAtAdminPage());
      toast({ title: 'Product added', status: 'success' });
      navigate('/admin');
    });
  };

  return (
    <Box>
      <AdminNav />
      <Box maxW="560px" mx="auto" px={4} py={8}>
        <Heading mb={6}>Add New Product</Heading>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input value={prod.name} onChange={set('name')} placeholder="Premium Linen Shirt" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Image URL</FormLabel>
            <Input value={prod.img} onChange={set('img')} placeholder="https://..." type="url" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Price (₹)</FormLabel>
            <Input value={prod.price} onChange={set('price')} type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea value={prod.dis} onChange={set('dis')} placeholder="Product description" />
          </FormControl>
          <FormControl>
            <FormLabel>Store Section</FormLabel>
            <Select value={prod.category} onChange={set('category')}>
              <option value="home">Home (Featured)</option>
              <option value="mens">Mens</option>
              <option value="womens">Womens</option>
              <option value="painting">Paintings</option>
              <option value="accessories">Accessories</option>
              <option value="footwear">Footwear</option>
              <option value="homeDecor">Home Decor</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Product Type</FormLabel>
            <Select value={prod.cat} onChange={set('cat')}>
              <option value="Shirt">Shirt</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Jeans">Jeans</option>
              <option value="Shorts">Shorts</option>
              <option value="Sports Shorts">Sports Shorts</option>
              <option value="Joggers">Joggers</option>
              <option value="Sweaters">Sweaters</option>
              <option value="Top">Top</option>
              <option value="Skirts">Skirts</option>
              <option value="Palazzo Pants">Palazzo Pants</option>
              <option value="painting">Painting</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Electronics">Electronics</option>
              <option value="Beauty">Beauty</option>
              <option value="Formal">Formal</option>
              <option value="Dress">Dress</option>
              <option value="Sports">Sports</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Offer (%)</FormLabel>
            <Input value={prod.offer} onChange={set('offer')} type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Rating (1–5)</FormLabel>
            <Input value={prod.star} onChange={set('star')} type="number" step="0.1" min="1" max="5" />
          </FormControl>
          <Button colorScheme="blue" onClick={addHandler}>
            Add Product
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Addnew;
