import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPaintingData } from '../Redux/AppRedux/action';
import FilterPaints from '../Components/FilterPaints';
import { useLocation, useSearchParams,Link } from 'react-router-dom';
import Styles from "../Styles/painting.module.css"
import { Image,Box,Button, Spinner } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';
const Paintings = () => {
  
   const dispatch = useDispatch();
   const data1 = useSelector((store)=>store.AppRedux.painting);
   const [searchParams] = useSearchParams(); 
   const location = useLocation();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

    useEffect(() => {
      fetchData();
    }, [searchParams]);
  
    const fetchData = async () => {
      setLoading(true);
      try {
      if (location || data1.length === 0) {
        setError(null);
  
        const sortBy = searchParams.get("sortBy");
        const queryParams = {
          params: {
            cat: searchParams.getAll('cat'),
            _sort: sortBy ? 'price' : undefined,
            _order: sortBy
          }
        };
        await dispatch(getPaintingData(queryParams));
      }
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
    };

  return (
    <>
    <Navbar/>
    {loading? <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>:

      <Box  className={Styles.main}>

          <Box className={Styles.filterpart}>
          <FilterPaints/>
          </Box>
  
          <Box className={Styles.box}>
          {
            !loading&&data1.map((items)=>{
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
                        <Link to={`/paintings/${items.id}`}><Button className={Styles.button2}>More Details</Button></Link>
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

export default Paintings