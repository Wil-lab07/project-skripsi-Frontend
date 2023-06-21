import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { 
  Flex, 
  Box,
} from '@chakra-ui/react';
import MenuConnected from '../../components/menuConnected';
import FormMakanan from '../../components/formMakanan';

const Makanan : NextPage = () => {
  const { isConnected } = useAccount()
  const { push } = useRouter()
  
  useEffect(() => {
    if (!isConnected) {
      push('/login')
    }
  }, [isConnected, push])

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
        <FormMakanan/>
      </Flex>
    </>
  )
}

export default Makanan;