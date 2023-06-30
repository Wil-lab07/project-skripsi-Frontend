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
    Select,
} from "@chakra-ui/react"
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify';
import NextLink from 'next/link'
import Trace from '../constant/TraceABI.json'
import 'react-toastify/dist/ReactToastify.css';
import { NextPage } from "next";
import { 
    traceAddress,
    accessADMIN,
    accessSUPPLIER,
    accessRPH,
    accessDISTRIBUTOR,
    accessRUMAH_MAKAN,
} from '../constant/metadata'

interface StakeholderSubmit {
    account: string,
    jenis_akses: string,
    no_sertifikat: string
}

interface CustomToastWithLinkProps {
    link: string;
}

const FormStakeholder = () => {
    const { register, handleSubmit, control } = useForm<StakeholderSubmit>();
    const [ isLoading, setIsLoading ] = useState(false)
    const { address } = useAccount() 

    const customToastWithLink = ({link}: CustomToastWithLinkProps) => {
        return (
          <Box _hover={{color: 'green'}}>
            <NextLink href={link} target='_blank'>Input Stakeholder Berhasil</NextLink>
          </Box>
        )
    }

    const { data: inputData, writeAsync } = useContractWrite({
        address: traceAddress,
        abi: Trace.abi,
        functionName: 'inputStakeholder',
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

    const sendTransaction: SubmitHandler<StakeholderSubmit> = async (data) => {
        try {
          console.time('writeAsync')
          setIsLoading(true)
          console.log(data)
          await writeAsync({
            args: [
              data.account,
              data.jenis_akses,
              data.no_sertifikat
            ]
          })
        } catch (err: any) {
          console.timeEnd('writeAsync')
          setIsLoading(false)
          console.log(err)
          const error = err['shortMessage']
          console.log(error)
          const errorParts = error.split('\n');
          const errorMessage: string = errorParts[1].trim();
    
          let errorMessageReal: string = errorMessage
            
          if (errorMessage.includes('AccessControl')) {
            errorMessageReal = 'Anda tidak memiliki akses pada halaman ini'
          }
    
          toast.error(`Input Stakeholder Gagal (${errorMessageReal})`)
        }
    }

    return (
        <>
            <Box w="400px" borderRadius="10px" border="solid white">
                <form onSubmit={handleSubmit(sendTransaction)}>
                    <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
                        <FormLabel color="white">
                            Account
                        </FormLabel>
                        <Input 
                            color="white" 
                            placeholder="(0xf..493)" 
                            size="md" 
                            type="text"
                            border="solid 1px gray"
                            {...register("account", { required: true })}
                        />
                    </FormControl>
                    {/* <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
                        <FormLabel color="white">
                            Jenis Akses
                        </FormLabel>
                        <Controller
                            name="jenis_akses"
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
                                        <Radio value={accessSUPPLIER}>Supplier</Radio>
                                        <Radio value={accessRPH}>RPH</Radio>
                                        <Radio value={accessDISTRIBUTOR}>Distributor</Radio>
                                        <Radio value={accessRUMAH_MAKAN}>Rumah Makan</Radio>
                                    </HStack>  
                                </RadioGroup>
                            )}
                        />
                    </FormControl> */}
                    <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
                        <FormLabel color="white">
                            Jenis Akses
                        </FormLabel>
                        <Controller
                            name="jenis_akses"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select 
                                    placeholder="Pilih Jenis Akses" 
                                    onChange={onChange} 
                                    value={value} 
                                    color="white"
                                    border="solid 1px gray"
                                    borderRadius={'5px'}
                                    p={'5px'}
                                    required
                                >
                                    <option value={accessSUPPLIER}>Supplier</option>
                                    <option value={accessRPH}>RPH</option>
                                    <option value={accessDISTRIBUTOR}>Distributor</option>
                                    <option value={accessRUMAH_MAKAN}>Rumah Makan</option>
                                </Select>
                            )}
                        />
                    </FormControl>
                    <FormControl borderBottom="solid 1px gray" p={'20px'} my={'10px'}>
                        <FormLabel color="white">
                            Nomor Sertifikat Halal
                        </FormLabel>
                        <Input 
                            color="white" 
                            placeholder="LPPOM-00.." 
                            size="md" 
                            type="text"
                            border="solid 1px gray"
                            {...register("no_sertifikat", { required: true })}
                        />
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
            <ToastContainer/>
        </>
    )
}

export default FormStakeholder;