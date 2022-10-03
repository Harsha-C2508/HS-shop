import { Box,MenuList,IconButton,Menu,MenuButton,MenuOptionGroup,MenuItemOption } from '@chakra-ui/react'
import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const AdminNav = () => {
  return (
    <Box justifyContent='right' mt='20px'>
        <Menu closeOnSelect={false} >
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
            marginLeft='70rem'
            border='0px solid white'
          />
            <MenuList minWidth='240px'>
              <MenuOptionGroup title='More' type='checkbox'>
                <Link to='/'> <MenuItemOption>Shop</MenuItemOption></Link>
                <Link to='/admin'> <MenuItemOption>Products</MenuItemOption></Link>
                <Link to='/customer'>  <MenuItemOption>Customer Details</MenuItemOption></Link>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
    </Box>
  )
}

export default AdminNav