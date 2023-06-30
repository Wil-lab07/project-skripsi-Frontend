import { NextPage } from "next";
import { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowDownwardRounded } from '@mui/icons-material';
import { traceAddress } from "../../constant/metadata";
import { ethers } from 'ethers'
import { useRouter } from "next/router";
import Trace from '../../constant/TraceABI.json';
import MenuConnected from '../../components/menuConnected';
import MenuUnconnected from '../../components/menuUnconnected';
import { useAccount } from "wagmi";
import TraceMakanan from '../../components/traceMakanan';
import TraceDistributor from '../../components/traceDistributor';
import TraceRPH from '../../components/traceRPH';
import TracePemotongan from '../../components/tracePemotongan';
import TraceSupply from '../../components/traceSupply';

const Spesific: NextPage = () => {
    const router = useRouter()
    const { id } = router.query;
    const TraceProvider = new ethers.InfuraProvider('maticmum')
    const contract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)
    const [alur, setAlur] = useState([])
    const { isConnected } = useAccount()
    const [active, setActive] = useState(false)

    const traceDetail = async (id: string | string[] | undefined) => {
        try {
            const trace = await contract.getRelatedData(id)
            setAlur(trace)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        traceDetail(id)
        setActive(true)
    }, [id, traceDetail])
    
    if(!active) {
        return null
    }

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
            {alur.length == 0 ? 
                <>
                    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
                        <Text color='white'>Loading</Text>
                    </Flex>
                </>
            :
            alur[0][0] == '' ?
                <>
                    <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
                        <Text color='white'>Data Tidak Tersedia</Text>
                    </Flex>
                </>
            :
                <>
                    <Flex
                        direction={'column'}
                        py={'100px'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <TraceMakanan data={alur[0]}/>
                        <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
                        <TraceDistributor data={alur[1]}/>
                        <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
                        <TraceRPH data={alur[2]}/>
                        <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
                        <TracePemotongan data={alur[3]}/>
                        <ArrowDownwardRounded sx={{ fontSize: '70px' }} color='primary'/>
                        <TraceSupply data={alur[4]}/>
                    </Flex>
                </>
            }
        </>
    )
}

export default Spesific;