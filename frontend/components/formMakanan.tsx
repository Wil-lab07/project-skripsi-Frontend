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

interface MakananSubmit {
  id_produkDistributor: string;
  nama: string;
  tanggal_pengolahan: string;
  status_kehalalan: string;
}

interface CustomToastWithLinkProps {
  link: string;
}

const FormMakanan = () => {
  const { register, handleSubmit, control } = useForm<MakananSubmit>();
  const [ isLoading, setIsLoading ] = useState(false)
  const { address } = useAccount()

  const customToastWithLink = ({link}: CustomToastWithLinkProps) => {
    return (
      <Box _hover={{color: 'green'}}>
        <NextLink href={link} target='_blank'>Input Produk Makanan Berhasil</NextLink>
      </Box>
    )
  }

  const { data: inputData, writeAsync } = useContractWrite({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'inputMakanan',
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

  const sendTransaction: SubmitHandler<MakananSubmit> = async (data) => {
    try {
      console.time('writeAsync')
      setIsLoading(true)
      await writeAsync({
        args: [
          data.id_produkDistributor,
          data.nama,
          data.tanggal_pengolahan,
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

      toast.error(`Input Makanan Gagal (${errorMessageReal})`)
    }
  }

  return (
    <>
      <Box w="400px" borderRadius="10px" border="solid white">
        <form onSubmit={handleSubmit(sendTransaction)}>
          <FormControl isRequired borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              ID ProdukDistributor
            </FormLabel>
            <Input 
              color="white" 
              placeholder="Input ID ProdukDistributor Yang Sudah Tersedia" 
              size="md" 
              type="text"
              border="solid 1px gray"
              {...register("id_produkDistributor", { required: true })}
            />
          </FormControl>
          <FormControl isRequired borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Nama Menu
            </FormLabel>
            <Input 
              color="white" 
              size="md" 
              type="text"
              border="solid 1px gray"
              {...register("nama", { required: true })}
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
              {...register("tanggal_pengolahan", { required: true })}
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

export default FormMakanan;
