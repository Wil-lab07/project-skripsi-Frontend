import type { NextPage } from 'next'
import { ethers } from 'ethers'
import { useRouter } from 'next/navigation';
import { Flex, Button, Text, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { 
    traceAddress,
    accessRPH,
    accessDISTRIBUTOR,
    accessRUMAH_MAKAN,
} from '../constant/metadata'
import MenuUnconnected from '../components/menuUnconnected';
import Trace from '../constant/TraceABI.json'
import 'react-toastify/dist/ReactToastify.css';

const Provider = new ethers.InfuraProvider('maticmum')
const contract = new ethers.Contract(traceAddress, Trace.abi, Provider)

const Login : NextPage = () => {
    const { push } = useRouter()
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

    const verify = async () => {
        if (isConnected) {
            const RPH = await contract.hasRole(accessRPH, address)
            const DISTRIBUTOR = await contract.hasRole(accessDISTRIBUTOR, address)
            const MAKANAN = await contract.hasRole(accessRUMAH_MAKAN, address)
            console.log(address)
            console.log(RPH)
            console.log(DISTRIBUTOR)
            console.log(MAKANAN)
            if (!RPH && !DISTRIBUTOR && !MAKANAN) {
                disconnect()
                toast.error('Maaf, akun anda tidak memiliki akses')
            } else {
                push('/')
            }
        }
    }

    useEffect(() => {
        verify()
    }, [address, isConnected])
    
    return (
        <>
            <ToastContainer/>
            <Box
                width={'100%'}
                position={'fixed'}
                top={'0'}
            >
                <Box margin={'10px'}>
                    <MenuUnconnected/>
                </Box>
            </Box>
            <Flex
                h="100vh"
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                {connectors.map((connector) => (
                    <Button
                        colorScheme='purple'
                        size='lg'
                        disabled={!connector.ready}
                        isLoading={isLoading && connector.id === pendingConnector?.id}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        Connect Wallet
                    </Button>
                ))}
            </Flex>
        </>
    )
}

export default Login



