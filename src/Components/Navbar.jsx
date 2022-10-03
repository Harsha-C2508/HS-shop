import React from 'react'
import Styles from '../Styles/navbar.module.css' 
import { Link, useNavigate } from 'react-router-dom'
import { MenuList,IconButton,Box,Menu,MenuButton,MenuOptionGroup,MenuItemOption } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'

const Navbar = () => {
  const navigate = useNavigate();
  const cart = useSelector((store)=>store.AppRedux.cart)
  const [cartLength,setCartLength] = useState(cart.length)

  const gotoHome=()=>{
    navigate("/")
  }

  useEffect(()=>{
    if(cart){
      setCartLength(cart.length)
    }
  },[cart])

  return (
    <Box className={Styles.main}>
       <img src="https://img.freepik.com/premium-vector/sh-logo_590037-89.jpg?w=2000" alt="" className={Styles.logo} onClick={gotoHome}/>
      <Box className={Styles.main_inner}>
        <>  <Link to='/mens' className={Styles.head}><h3>Mens</h3></Link>
            <Link to='/womens' className={Styles.head}> <h3>Womens</h3></Link>
            <Link to='/paintings' className={Styles.head}><h3>Paitings</h3></Link>
            <Link to='/wish' className={Styles.head}><h3>🧡</h3></Link>
            <Link to='/cart' className={Styles.head}>{cartLength>0? <h3>Cart <p className={Styles.length}>{cartLength}</p></h3>:<h3>Cart</h3>}</Link>
            <Link to='/login' className={Styles.head}><h3>Login</h3></Link>
            {/* <Link to='/myOrders' className={Styles.head}><h3>🚚</h3></Link> */}
          </>
  
          <Menu closeOnSelect={false} className={Styles.menuBox}>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            className={Styles.menuBox}
          />
            <MenuList minWidth='240px'>             
              <MenuOptionGroup title='More' type='checkbox'>

               <Link to='/'><MenuItemOption>Home</MenuItemOption></Link>
               <Link to='/mens'><MenuItemOption>Mens</MenuItemOption></Link>
               <Link to='/womens'> <MenuItemOption>Womens</MenuItemOption></Link>
               <Link to='/paintings'><MenuItemOption>Paitings</MenuItemOption></Link>
               <Link to='/wish'><MenuItemOption>Wishlist</MenuItemOption></Link>
               <Link to='/cart' >{cartLength>0? <MenuItemOption>Cart <p className={Styles.length}>{cartLength}</p></MenuItemOption>:<MenuItemOption>Cart</MenuItemOption>}</Link>
               <Link to='/login'><MenuItemOption>LogIn</MenuItemOption></Link>
               {/* <Link to='/myOrders'>  <MenuItemOption>My Orders</MenuItemOption></Link> */}

              </MenuOptionGroup>
            </MenuList>
          </Menu>
      </Box>
    </Box>
  )
}

export default Navbar