import type { NextPage } from 'next';
import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  RadioGroup,
  HStack,
  Radio,
  Button,
  Text,
  Box,
} from "@chakra-ui/react"
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { traceAddress } from '../constant/metadata';
import { ToastContainer, toast } from 'react-toastify';
import NextLink from 'next/link'
import Trace from '../constant/TraceABI.json'
import 'react-toastify/dist/ReactToastify.css';

interface DistributorSubmit {
  id_produkRPH: string;
  tanggal_penyimpanan: string;
  tanggal_pengiriman: string;
  tanggal_tiba: string;
  status_kehalalan: string;
}

interface CustomToastWithLinkProps {
  link: string;
}

const FormDistributor = () => {
  const { register, handleSubmit, control } = useForm<DistributorSubmit>();
  const [ isLoading, setIsLoading ] = useState(false)
  const { address } = useAccount()

  const customToastWithLink = ({link}: CustomToastWithLinkProps) => {
    return (
      <Box _hover={{color: 'green'}}>
        <NextLink href={link} target='_blank'>Input Produk Distributor Berhasil</NextLink>
      </Box>
    )
  }

  const { data: inputData, writeAsync } = useContractWrite({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'inputProdukDistributor',
  })

  const { isLoading: isInputLoading } = useWaitForTransaction({
    hash: inputData?.hash,
    confirmations: 1,
    onSuccess: () => {
      console.timeEnd('writeAsync') // Menghitung waktu transaksi
      setIsLoading(false)
      toast.success(customToastWithLink({link: `https://mumbai.polygonscan.com/tx/${inputData?.hash}`}))
    }
  })

  const sendTransaction: SubmitHandler<DistributorSubmit> = async (data) => {
    try {
      console.time('writeAsync')
      setIsLoading(true)
      await writeAsync({
        args: [
          data.id_produkRPH,
          data.tanggal_penyimpanan,
          data.tanggal_pengiriman,
          data.tanggal_tiba,
          data.status_kehalalan
        ]
      })
    } catch (err: any) {
      console.timeEnd('writeAsync')
      setIsLoading(false)

      const error = err['shortMessage']
      const errorParts = error.split('\n');
      const errorMessage: string = errorParts[1].trim();

      let errorMessageReal: string = errorMessage
        
      if (errorMessage.includes('AccessControl')) {
        errorMessageReal = 'Anda tidak memiliki akses pada halaman ini'
      }

      toast.error(`Input Produk Distributor Gagal (${errorMessageReal})`)
    }
  }

  return (
    <>
      <Box w="400px" borderRadius="10px" border="solid white">
        <form onSubmit={handleSubmit(sendTransaction)}>
          <FormControl isRequired borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              ID ProdukRPH
            </FormLabel>
            <Input 
              color="white" 
              placeholder="Input ID ProdukRPH Yang Sudah Tersedia" 
              size="md" 
              type="text"
              border="solid 1px gray"
              {...register("id_produkRPH", { required: true })}
            />
          </FormControl>
          <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Tanggal Penyimpanan
            </FormLabel>
            <Input 
              color="white" 
              placeholder="Select Date and Time" 
              size="md" 
              type="datetime-local"
              border="solid 1px gray"
              {...register("tanggal_penyimpanan", { required: true })}
            />
          </FormControl>
          <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Waktu Pengiriman
            </FormLabel>
            <Input 
              color="white" 
              placeholder="Select Date and Time" 
              size="md" 
              type="datetime-local"
              border="solid 1px gray"
              {...register("tanggal_pengiriman", { required: true })}
            />
          </FormControl>
          <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Waktu Tiba
            </FormLabel>
            <Input 
              color="white" 
              placeholder="Select Date and Time" 
              size="md" 
              type="datetime-local"
              border="solid 1px gray"
              {...register("tanggal_tiba", { required: true })}
            />
          </FormControl>
          <FormControl p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Status Kehalalan
            </FormLabel>
            <Checkbox color="white" {...register("status_kehalalan", { required: false })} >Halal</Checkbox>
            <Text color="whiteAlpha.600">Status pada produk wajib halal</Text>
          </FormControl>
          <Button 
            colorScheme='blue' 
            type="submit" 
            value="Submit"
            my={'10px'}
            mx={'20px'}
            isLoading={isInputLoading || isLoading}
          >
            Submit
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </>
  )
}

export default FormDistributor;
