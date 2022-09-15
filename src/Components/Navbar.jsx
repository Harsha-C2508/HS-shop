import React from 'react'
import Styles from '../Styles/navbar.module.css' 
import { Link, useNavigate } from 'react-router-dom'
import { MenuList,IconButton,Box,Menu,MenuButton,MenuOptionGroup,MenuItemOption } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
const Navbar = () => {
  const navigate = useNavigate();
  const gotoHome=()=>{
    navigate("/")
  }

  return (
    <Box className={Styles.main}>
       <img src="https://img.freepik.com/premium-vector/sh-logo_590037-89.jpg?w=2000" alt="" className={Styles.logo} onClick={gotoHome}/>
      <Box className={Styles.main_inner}>
         <Link to='/mens' className={Styles.head}><h3>Mens</h3></Link>
         <Link to='/womens' className={Styles.head}> <h3>Womens</h3></Link>
         <Link to='/paintings' className={Styles.head}><h3>Paitings</h3></Link>
         <Link to='/' className={Styles.head}><h3>Cart</h3></Link>
         <Link to='/' className={Styles.head}><h3>Wishlist</h3></Link>
          <Menu closeOnSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
            <MenuList minWidth='240px'>
              
              <MenuOptionGroup title='More' type='checkbox'>
                <Link to='/login'><MenuItemOption>LogIn</MenuItemOption></Link>
                <Link to='/sigIn'><MenuItemOption>Register</MenuItemOption></Link>
               <Link to='/admin'> <MenuItemOption>Admin</MenuItemOption></Link>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
      </Box>
    </Box>
  )
}

export default Navbar