import type {NextPage} from 'next'
import { useTraceSupplier } from '../swr/useTrace'
import { 
    Box, 
    Button, 
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    HStack
} from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import Link from 'next/link';
import { ethers } from 'ethers'
import { traceAddress } from '../constant/metadata';
import Trace from '../constant/TraceABI.json'
import { useState } from 'react';

interface StakeholderType {
    account: string;
    jenis_akses: string;
    no_sertifikat: string;
    date: string;
}

const TableSupplier = () => {
    const data = useTraceSupplier()
    const [stakeholder, setStakeholder] = useState<StakeholderType>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const TraceProvider = new ethers.InfuraProvider('maticmum')
    const traceabilityContract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)


    const column: MUIDataTableColumn[] = [
        {
            name: 'ID_Supplier',
            label: 'ID',
        },
        {
            name: 'Akun_Supplier',
            label: 'Penginput',
            options: {
                customBodyRender: (value) => {
                    return (
                    <>
                        <Button onClick={onOpen}>
                            {value}
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Detail Stakeholder</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <Text>Akses: SUPPLIER</Text>
                                    <HStack>
                                        <Text>Nomor Sertifikat: </Text>
                                        <Link href={`https://halalmuikalbar.or.id/searchh?query=LPPOM-21230013281222&pilihan=2`} target='_blank'><Text color={'green'}>LPPOM-21230013281222</Text></Link>
                                    </HStack>
                                    
                                    <Link href={`https://mumbai.polygonscan.com/address/${value}`} target='_blank'><Text color={'purple'}>List Transaksi</Text></Link>
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                        {/* <Box color='purple'>
                            <Link href={`https://mumbai.polygonscan.com/address/${value}`} target='_blank'>{value}</Link>
                        </Box> */}
                    </>
                    )
                }
            }
        },
        {
            name: 'jenis_kelamin',
            label: 'Jenis Kelamin',
        },
        {
            name: 'berat_sapi',
            label: 'Berat (Kg)',
        },
        {
            name: 'tanggal_pengiriman',
            label: 'Tanggal Pengiriman'
        },
        {
            name: 'status_kehalalan',
            label: 'Halal',
            options: {
                customBodyRender: () => {
                    return (
                        <>
                            <CheckCircle sx={{ color: '#3c9a5d' }}/>
                        </>
                    )
                }
            }
        },
        {
            name: 'date',
            label: 'Tanggal Input',
        },
    ]

    return (
        <>
            <MUIDataTable
                title={"Data Supply"}
                columns={column}
                data={data?.data?.reverse()}
                options={{
                    rowsPerPage: 5,
                    selectableRows: 'none',
                    elevation: 1,
                    textLabels: {
                        body: {
                        noMatch: data.isLoading ? (
                            <Text>Loading...</Text>
                        ) : (
                            "Maaf, belum ada data yang tersedia"
                        )
                    }
                    }
                }}
            />
        </>
    )
}

export default TableSupplier