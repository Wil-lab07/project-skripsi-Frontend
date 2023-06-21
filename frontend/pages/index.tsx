import { useState } from 'react'
import { useAccount } from 'wagmi'
import { 
  Flex, 
  Box,   
  Button,
  HStack
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import MenuConnected from '../components/menuConnected'
import MenuUnconnected from '../components/menuUnconnected'
import TablePemotongan from '../components/tablePemotongan'
import TableRPH from '../components/tableRPH'
import TableDistributor from '../components/tableDistributor'
import TableMakanan from '../components/tableMakanan'

const Home: NextPage = () => {
  const [ dataType, setDataType ] = useState('pemotongan')
  const { isConnected } = useAccount()
  return (
    <>
      {!isConnected ? 
        <Box
          width={'100%'}
          position={'fixed'}
          top={'0'}
        >
          <Box margin={'10px'}>
            <MenuUnconnected/>
          </Box>
        </Box>
      :
        <Box
          width={'100%'}
          position={'fixed'}
          top={'0'}
        >
          <Box margin={'10px'}>
            <MenuConnected/>
          </Box>
        </Box>
      }
      <Flex width={'100%'} alignItems={'center'} justifyContent={'center'} direction={'column'} mt={'100px'}>
        <Flex>
          <HStack spacing="10px">
            <Button
              colorScheme={dataType === 'pemotongan' ? 'purple' : 'gray'}
              onClick={() => setDataType('pemotongan')}
            >
              Pemotongan
            </Button>
            <Button
              colorScheme={dataType === 'rph' ? 'purple' : 'gray'}
              onClick={() => setDataType('rph')}
            >
              RPH
            </Button>
            <Button
              colorScheme={dataType === 'distributor' ? 'purple' : 'gray'}
              onClick={() => setDataType('distributor')}
            >
              Distributor
            </Button>
            <Button
              colorScheme={dataType === 'makanan' ? 'purple' : 'gray'}
              onClick={() => setDataType('makanan')}
            >
              Makanan
            </Button>
          </HStack>
        </Flex>
        <Flex 
          marginTop={'30px'} 
          w='100%'
          justifyContent={'center'}
          alignItems={'center'}
        >
          {dataType === 'pemotongan' && <TablePemotongan/>}
          {dataType === 'rph' && <TableRPH/>}
          {dataType === 'distributor' && <TableDistributor/>}
          {dataType === 'makanan' && <TableMakanan/>}
        </Flex>
      </Flex>
      {/* {!isConnected ? 
        <Box
          width={'100%'}
          position={'fixed'}
          top={'0'}
        >
          <Box margin={'10px'}>
            <MenuUnconnected/>
          </Box>
        </Box>
      :
        <Box
          width={'100%'}
          position={'fixed'}
          top={'0'}
        >
          <Box margin={'10px'}>
            <MenuConnected/>
          </Box>
        </Box>
      }
      <Flex width={'100%'} alignItems={'center'} justifyContent={'center'} direction={'column'} mt={'100px'}>
        <Flex>
          <HStack spacing="10px">
            <Button
              colorScheme={dataType === 'pemotongan' ? 'purple' : 'gray'}
              onClick={() => setDataType('pemotongan')}
            >
              Pemotongan
            </Button>
            <Button
              colorScheme={dataType === 'rph' ? 'purple' : 'gray'}
              onClick={() => setDataType('rph')}
            >
              RPH
            </Button>
            <Button
              colorScheme={dataType === 'distributor' ? 'purple' : 'gray'}
              onClick={() => setDataType('distributor')}
            >
              Distributor
            </Button>
            <Button
              colorScheme={dataType === 'makanan' ? 'purple' : 'gray'}
              onClick={() => setDataType('makanan')}
            >
              Makanan
            </Button>
          </HStack>
        </Flex>
        <Flex 
          marginTop={'30px'} 
          w='100%'
          justifyContent={'center'}
          alignItems={'center'}
        >
          {dataType === 'pemotongan' && <TablePemotongan/>}
          {dataType === 'rph' && <TableRPH/>}
          {dataType === 'distributor' && <TableDistributor/>}
          {dataType === 'makanan' && <TableMakanan/>}
        </Flex>
      </Flex> */}
    </>
  )
}

export default Home
