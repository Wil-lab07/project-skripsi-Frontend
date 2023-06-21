import type { NextPage } from 'next'
import { useTraceMakanan } from '../swr/useTrace'
import { Box, Button, Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import Link from 'next/link';

const TableMakanan = () => {          
  const data = useTraceMakanan()

  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_Makanan',
      label: 'ID',
    },
    {
      name: 'ID_ProdukDistributor',
      label: 'ID Produk Distributor',
    },
    {
      name: 'Akun_RumahMakan',
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
      name: 'nama',
      label: 'Nama Makanan',
    },
    {
      name: 'tanggal_pengolahan',
      label: 'Tanggal Pengolahan',
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
    {
      name: 'ID_Makanan',
      label: '  ',
      options: {
        customBodyRender: (value: string) => {
          return (
            <Link href={`/trace/${value}`} passHref>
              <Button 
                colorScheme='purple' 
                size='sm'
              >
                Detail
              </Button>
            </Link>
          )
        }
      }
    }
  ]

  return (
    <>
      <MUIDataTable
        title={"Data Makanan"}
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
  
export default TableMakanan



