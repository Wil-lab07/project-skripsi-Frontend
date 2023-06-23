import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { 
  Flex, 
  Box,
} from '@chakra-ui/react';
import MenuConnected from '../../components/menuConnected';
import FormRPH from '../../components/formRPH';

const RPH : NextPage = () => {
  const { isConnected } = useAccount()
  const { push } = useRouter()
  const [active, setActive] = useState(false)
  
  useEffect(() => {
    if (!isConnected) {
      push('/login')
    }
    setActive(true)
  }, [isConnected, push])

  if(!active) {
    return null
  }

  return (
    <>
      <Box
        width={'100%'}
        position={'fixed'}
        top={'0'}
      >
        <Box margin={'10px'}>
          <MenuConnected/>
        </Box>
      </Box>
      <Flex 
        direction={'column'} 
        justifyContent={'center'} 
        alignItems={'center'}
        height={'100vh'}
      >
        <FormRPH/>
      </Flex>
    </>
  )
}

export default RPH;