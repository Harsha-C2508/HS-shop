import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addWish, getDataDetailsMens, getDataFromWish, getHomeData} from '../Redux/AppRedux/action';
import {RiHandHeartLine} from 'react-icons/ri'
import Filters from '../Components/Filters';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Styles from "../Styles/Home.module.css"
import { Box, Button, Image } from '@chakra-ui/react';
import Coursel from '../Styles/Coursel';
import Navbar from '../Components/Navbar';


const Home = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams(); 
  const location = useLocation();
  const data2 = useSelector((store)=>store.AppRedux.home);
  useEffect(()=>{
    if(location || data2.length === 0){
      const sortBy = searchParams.get("sortBy")
      const queryParams = {
        params:{
          cat: searchParams.getAll('cat'),
          _sort: sortBy && 'price',
          _order: sortBy,
        }
      } 
      dispatch(getHomeData(queryParams))
    }
  },[location.search])

  return (
   <>
    <Navbar/>
    <Coursel/> 
    <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/9/22/d246ea0a-af18-4a62-a8ef-25e02df352871663841721199-1222.jpg" alt="logo" style={{ height:'100px'  }}/>
    <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/9/19/e5887c61-8682-4c49-b785-f2fe37ae91d31663583200397-Budget-Buys.jpg" alt="secLogo" style={{ marginTop:"10px"  }} />
      <Box>
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

                  <Box className={Styles.buttonBox} style={{marginTop:"10px"}}>
                      {/* <Button className={Styles.button1} style={{marginRight:"60px"}}><RiHandHeartLine/></Button> */}
                      <Link to={`/home/${items.id}`}><Button className={Styles.button2} mt='5px'>More Details</Button></Link>
                  </Box>
                </Box>
              )
            })
          }
        </Box>
        {/* className={Styles.main} */}
        {/* <Box border='2px solid'>
          <Button onClick={()=>setPage(page + 1)}>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </Box> */}
      </Box>
    </>

  )
}

export default Home