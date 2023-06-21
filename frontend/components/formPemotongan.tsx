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
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { traceAddress } from '../constant/metadata';
import { ToastContainer, toast } from 'react-toastify';
import NextLink from 'next/link'
import Trace from '../constant/TraceABI.json'
import 'react-toastify/dist/ReactToastify.css';

interface PemotonganSubmit {
  jenis_kelamin: string;
  tanggal_pemotongan: string;
  status_kehalalan: string;
}

interface CustomToastWithLinkProps {
  link: string;
}

const FormPemotongan = () => {
  const { register, handleSubmit, control } = useForm<PemotonganSubmit>();
  const [ isLoading, setIsLoading ] = useState(false)

  const customToastWithLink = ({link}: CustomToastWithLinkProps) => {
    return (
      <Box _hover={{color: 'green'}}>
        <NextLink href={link} target='_blank'>Input Pemotongan Berhasil</NextLink>
      </Box>
    )
  }

  const { data: inputData, writeAsync } = useContractWrite({
    address: traceAddress,
    abi: Trace.abi,
    functionName: 'inputPemotongan',
  })

  const { isLoading: isInputLoading } = useWaitForTransaction({
    hash: inputData?.hash,
    confirmations: 1,
    onSuccess: () => {
      console.timeEnd('writeAsync')
      setIsLoading(false)
      toast.success(customToastWithLink({link: `https://mumbai.polygonscan.com/tx/${inputData?.hash}`}))
    }
  })

  const sendTransaction: SubmitHandler<PemotonganSubmit> = async (data) => {
    try {
      console.time('writeAsync')
      setIsLoading(true)
      await writeAsync({
        args: [
          data.jenis_kelamin,
          data.tanggal_pemotongan,
          data.status_kehalalan,
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

      toast.error(`Input Pemotongan Gagal (${errorMessageReal})`)
    }
  }

  return (
    <>
      <Box w="400px" borderRadius="10px" border="solid white">
        <form onSubmit={handleSubmit(sendTransaction)}>
          <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Jenis Kelamin Sapi
            </FormLabel>
            <Controller
              name="jenis_kelamin"
              control={control}
              render={({ field: { onChange, value } }) => (
                <RadioGroup 
                  onChange={onChange} 
                  value={value} 
                  color="white"
                  border="solid 1px gray"
                  borderRadius={'5px'}
                  p={'5px'}
                >
                  <HStack spacing="54px" >
                    <Radio value="Jantan">Jantan</Radio>
                    <Radio value="Betina">Betina</Radio>
                  </HStack>  
                </RadioGroup>
              )}
            />
          </FormControl>
          <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Tanggal Pemotongan
            </FormLabel>
            <Input 
              color="white" 
              placeholder="Select Date and Time" 
              size="md" 
              type="datetime-local"
              border="solid 1px gray"
              {...register("tanggal_pemotongan", { required: true })}
            />
          </FormControl>
          <FormControl p={'20px'} my={'10px'}>
            <FormLabel color="white">
              Status Kehalalan
            </FormLabel>
            <Checkbox {...register("status_kehalalan", { required: false })} color="white">Halal</Checkbox>
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

export default FormPemotongan;
