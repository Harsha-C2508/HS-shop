import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getWomensData} from '../Redux/AppRedux/action';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import FilterWomen from '../Components/FilterWomen';
import Styles from "../Styles/womens.module.css"
import { Image,Box, Button, Spinner } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';

const Womens = () => {

   const dispatch = useDispatch();
   const data4 = useSelector((store)=>store.AppRedux.womens);
   const [searchParams] = useSearchParams(); 
   const isLoading = useSelector((store)=>store.AppRedux.isLoading)
   const location = useLocation();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

  useEffect(()=>{
    fetchData();
  },[searchParams])

  const fetchData = async() =>{
    setLoading(true);
    try {
      if(location || data4.length === 0){
        const sortBy = searchParams.get("sortBy")
        const queryParams = {
          params:{
            cat: searchParams.getAll('cat'),
            _sort: sortBy && 'price',
            _order: sortBy
          }
        } 
       await dispatch(getWomensData(queryParams))
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>

    <Navbar/>
    {loading || isLoading ? <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>:
    <Box  className={Styles.main}>

    <Box className={Styles.filterpart}>
      <FilterWomen/>
    </Box>

    <Box className={Styles.box}>
    {
      !loading&&data4.map((items)=>{
        return(
          <Box key={items.id} className={Styles.innerBox}>
            <Image src={items.img} alt="" className={Styles.imgSize}/>
            <p>{items.name}</p>

            <Box className={Styles.price}>
                <p>₹{items.price}</p>
                <p>{items.offer}%</p>
            </Box>

            <Box className={Styles.buttonBox} style={{marginTop:"10px"}}>
                {/* <Button className={Styles.button1} style={{marginRight:"60px"}}><RiHandHeartLine/></Button> */}
                <Link to={`/womens/${items.id}`}><Button className={Styles.button2}>More Details</Button></Link>
            </Box>
          </Box>
        )
      })
    }
    </Box>
  </Box>     
  }       
    </>
  )
}

export default Womens