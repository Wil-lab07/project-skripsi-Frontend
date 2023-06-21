import type { NextPage } from 'next';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { 
  Flex, 
  Box,
} from '@chakra-ui/react';
import MenuConnected from '../../components/menuConnected';
import FormDistributor from '../../components/formDistributor';

const Distributor : NextPage = () => {
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
        m={'50px'}
      >
        <FormDistributor/>
      </Flex>
    </>
  )
}

export default Distributor;