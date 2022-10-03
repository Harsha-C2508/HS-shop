import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getWomensData} from '../Redux/AppRedux/action';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import FilterWomen from '../Components/FilterWomen';
import Styles from "../Styles/womens.module.css"
import { Image,Box, Button } from '@chakra-ui/react';
import Navbar from '../Components/Navbar';

const Womens = () => {

   const dispatch = useDispatch();
   const data4 = useSelector((store)=>store.AppRedux.womens);
   const [searchParams] = useSearchParams(); 
  //  const isLoading = useSelector((store)=>store.AppRedux.isLoading)
    const location = useLocation();
  useEffect(()=>{
    if(location || data4.length === 0){
      const sortBy = searchParams.get("sortBy")
      const queryParams = {
        params:{
          cat: searchParams.getAll('cat'),
          _sort: sortBy && 'price',
          _order: sortBy
        }
      } 
      dispatch(getWomensData(queryParams))
    }
  },[location.search,data4.length,dispatch,location,searchParams])
  return (
    <>

    <Navbar/>
    <Box  className={Styles.main}>

    <Box className={Styles.filterpart}>
      <FilterWomen/>
    </Box>

    <Box className={Styles.box}>
    {
      data4.map((items)=>{
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

       
           
    </>
  )
}

export default Womens