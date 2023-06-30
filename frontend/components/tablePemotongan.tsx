import type { NextPage } from 'next'
import { useTracePemotongan } from '../swr/useTrace'
import { Box, Text } from '@chakra-ui/react';
import { CheckCircle } from '@mui/icons-material';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import Link from 'next/link';

const TablePemotongan = () => {          
  const data = useTracePemotongan()
  
  const column: MUIDataTableColumn[] = [
    {
      name: 'ID_Pemotongan',
      label: 'ID',
    },
    {
      name: 'ID_Supplier',
      label: 'ID Supply',
    },
    {
      name: 'Akun_RPH',
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
      name: 'tanggal_pemotongan',
      label: 'Tanggal Pemotongan',
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
        title={"Data Pemotongan"}
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
  
export default TablePemotongan



