import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getHomeData} from '../Redux/AppRedux/action';
import {RiHandHeartLine} from 'react-icons/ri'
import Filters from '../Components/Filters';
import { useLocation, useSearchParams } from 'react-router-dom';
import Styles from "../Styles/Home.module.css"
import { Box, Button, Image } from '@chakra-ui/react';


const Home = () => {
  const dispatch = useDispatch();
  const data2 = useSelector((store)=>store.AppRedux.home);
   const [searchParams] = useSearchParams(); 
    const location = useLocation();
  useEffect(()=>{
    if(location || data2.length === 0){
      const sortBy = searchParams.get("sortBy")
      const queryParams = {
        params:{
          cat: searchParams.getAll('cat'),
          _sort: sortBy && 'price',
          _order: sortBy
        }
      } 
      dispatch(getHomeData(queryParams))
    }
  },[location.search])

  console.log(location)
  return (
    <>
      <Box  className={Styles.main}>

      <Box className={Styles.filterpart}>
          <Filters/>
      </Box>

        <Box className={Styles.box}>
          {
            data2.map((items)=>{
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
    </>

  )
}

export default Home