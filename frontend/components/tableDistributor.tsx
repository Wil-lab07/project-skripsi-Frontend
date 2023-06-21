import type { NextPage } from 'next'
import { useTraceProdukDistributor } from '../swr/useTrace'
import { Box, Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import Link from 'next/link';

const TableDistributor = () => {            
  const data = useTraceProdukDistributor()
  
  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_ProdukDistributor',
      label: 'ID',
    },
    {
      name: 'ID_ProdukRPH',
      label: 'ID Produk RPH',
    },
    {
      name: 'Akun_Distributor',
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
      name: 'tanggal_penyimpanan',
      label: 'Tanggal Penyimpanan',
    },
    {
      name: 'tanggal_pengiriman',
      label: 'Tanggal Pengiriman',
    },
    {
      name: 'tanggal_penerimaan',
      label: 'Tanggal Penerimaan',
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
    }
  ]

  return (
    <>
      <MUIDataTable
        title={"Data Produk Distributor"}
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
  
export default TableDistributor



