import { 
    FunctionComponent,
    SetStateAction, 
    Dispatch, 
    useState,
    useEffect
  } from "react"
  import {
    Flex,
    Text,
    ListItem,
    UnorderedList,
    HStack,
  } from '@chakra-ui/react'
  import { TraceProdukDistributorResult } from "../swr/types"
  import { traceAddress } from "../constant/metadata"
  import { ethers } from "ethers"
  import Trace from "../constant/TraceABI.json"
  import { CheckCircle, LocalShipping } from "@mui/icons-material"
  
  type TraceDistributorProps = {
    data: never[]
  }
  
  const TraceDistributor: FunctionComponent<TraceDistributorProps> = ({ data }) => {  
    const convertDate = (date: string | undefined) => {
      if (date != undefined) {
        const dateObj = new Date(date)
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          minute: 'numeric',
        }).format(dateObj);
        return formattedDate
      }
      return date
    }
  
    const convertUnixDate = (date: string | undefined) => {
      if (date != undefined) {
        const dateObj = Number(`${date}`) * 1000;
        const formattedDate = new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          minute: 'numeric',
        }).format(dateObj);
        return formattedDate
      }
    
      return date
    }
  
    return (
      <Flex
        border="solid white" w='500px'
        borderRadius='10px'
        p='10px'
        flexDirection='column'
      >
        <HStack>
          <Text color='white' fontSize='xl' fontWeight='bold'>Distributor</Text>
          <LocalShipping sx={{ color: 'white' }}/>
        </HStack>
        <UnorderedList color='white' spacing={'10px'} mt='10px'>
          <ListItem>ID: {data[0]}</ListItem>
          <ListItem>ID Produk RPH: {data[1]}</ListItem>
          <ListItem>Penginput: {data[2]}</ListItem>
          <ListItem>Tanggal Penyimpanan: {convertDate(data[3])}</ListItem>
          <ListItem>Tanggal Pengiriman: {convertDate(data[4])}</ListItem>
          <ListItem>Tanggal Penerimaan: {convertDate(data[5])}</ListItem>
          <ListItem>
            <HStack>
              <Text>Halal:</Text>
              <CheckCircle sx={{ color: '#3c9a5d' }}/>
            </HStack>
          </ListItem>
          <ListItem>Tanggal Input: {convertUnixDate(data[7])}</ListItem>
        </UnorderedList>
      </Flex>
    )
  }
  
  export default TraceDistributor;