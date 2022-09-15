import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getWomensData} from '../Redux/AppRedux/action';
import {RiHandHeartLine} from 'react-icons/ri'
import { useLocation, useSearchParams } from 'react-router-dom';
import FilterWomen from '../Components/FilterWomen';
import Styles from "../Styles/womens.module.css"
import { Image,Box, Button } from '@chakra-ui/react';

const Womens = () => {

  const dispatch = useDispatch();
  const data4 = useSelector((store)=>store.AppRedux.womens);
   const [searchParams] = useSearchParams(); 
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

              <Box className={Styles.buttonBox}>
                  <Button className={Styles.button1} style={{marginRight:"20px"}}><RiHandHeartLine/></Button>
                  <Button className={Styles.button2}>More Details</Button>
              </Box>
            </Box>
          )
        })
      }
    </Box>
    </Box>
  )
}

export default Womens