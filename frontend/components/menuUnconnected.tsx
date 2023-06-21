import type { NextPage } from 'next'
import { 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} 
from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { Menu as _Menu } from '@mui/icons-material'

const MenuUnconnected = () => {          
  const { push } = useRouter()  
  return (
    <Menu>
      <MenuButton as={Button} colorScheme='purple'>
        <_Menu sx={{ color: 'white' }}/>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={()=> push('/')}>Home</MenuItem>
        <MenuItem onClick={()=> push('/login')}>Login</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuUnconnected