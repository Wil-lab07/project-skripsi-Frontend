import type { NextPage } from 'next'
import { 
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} 
from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Menu as _Menu } from '@mui/icons-material'
import { useDisconnect } from 'wagmi'

const MenuConnected = () => {          
  const { push } = useRouter()  
  const { disconnect } = useDisconnect()

  const disconnectWallet = async () => {
    disconnect()
  }

  return (
    <Menu>
      <MenuButton as={Button} colorScheme='purple'>
        <_Menu sx={{ color: 'white' }}/>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={()=> push('/')}>Home</MenuItem>
        <MenuItem onClick={()=> push('/input/pemotongan')}>Input Pemotongan</MenuItem>
        <MenuItem onClick={()=> push('/input/rph')}>Input RPH</MenuItem>
        <MenuItem onClick={()=> push('/input/distributor')}>Input Distributor</MenuItem>
        <MenuItem onClick={()=> push('/input/makanan')}>Input Makanan</MenuItem>
        <MenuItem onClick={()=> disconnectWallet()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default MenuConnected