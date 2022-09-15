import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getMensData} from '../Redux/AppRedux/action';
import {RiHandHeartLine} from 'react-icons/ri'
import FilterMens from '../Components/FilterMens';
import { useLocation, useSearchParams } from 'react-router-dom';
import Styles from "../Styles/mens.module.css"
import { Link } from 'react-router-dom';
import { Image,Box,Button } from '@chakra-ui/react';
const Mens = () => {

  const dispatch = useDispatch();
  const data3 = useSelector((store)=>store.AppRedux.mens);
   const [searchParams] = useSearchParams(); 
    const location = useLocation();


  useEffect(()=>{
    if(location || data3.length === 0){
      const sortBy = searchParams.get("sortBy")
      const queryParams = {
        params:{
          dis: searchParams.getAll('dis'),
          _sort: sortBy && 'price',
          _order: sortBy
        }
      } 
      dispatch(getMensData(queryParams))
    }
  },[location.search,dispatch,location,searchParams,data3.length])
  return (
    <Box  className={Styles.main}>

      <Box className={Styles.filterpart}>
       <FilterMens/>
      </Box>

    <Box className={Styles.box}>
      {
        data3.map((items)=>{
          return(
            <Box key={items.id} className={Styles.innerBox}>
              <Image src={items.img} alt="" className={Styles.imgSize}/>
              <p>{items.name}</p>

              <Box className={Styles.price}>
                  <p>₹{items.price}</p>
                  <p>{items.offer}%</p>
              </Box>

              <Box className={Styles.buttonBox}>
                  <Button className={Styles.button1} style={{marginRight:"20px"}}><RiHandHeartLine/></Button>
                  <Button className={Styles.button2}> <Link to={`/mens/${items.id}`}>More Details</Link> </Button>
              </Box>
            </Box>
          )
        })
      }
    </Box>
    </Box>
  )
}

export default Mens