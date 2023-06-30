import type {NextPage} from 'next'
import { useTraceSupplier } from '../swr/useTrace'
import { Box, Button, Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import Link from 'next/link';

const TableSupplier = () => {
    const data = useTraceSupplier()

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
                        <Box color='purple'>
                            <Link href={`https://mumbai.polygonscan.com/address/${value}`} target='_blank'>{value}</Link>
                        </Box>
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