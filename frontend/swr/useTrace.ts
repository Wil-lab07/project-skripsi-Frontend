import useSWR from 'swr'
import { ethers } from 'ethers'
import { 
  TraceMakananResult,
  TracePemotonganResult, 
  TraceProdukDistributorResult, 
  TraceProdukRPHResult, 
  TraceRequest 
} from './types';
import { traceAddress } from '../constant/metadata';
import Trace from '../constant/TraceABI.json'

const TraceProvider = new ethers.InfuraProvider('maticmum')

const TraceFetcher = (args: TraceRequest): Promise<Array<any>> => {
  const traceabilityContract = new ethers.Contract(traceAddress, Trace.abi, TraceProvider)

  let filter = traceabilityContract.filters.TracePemotongan()
  switch (args.type) {
    case 'pemotongan':
      filter = traceabilityContract.filters.TracePemotongan();
      break;
    case 'rph':
      filter = traceabilityContract.filters.TraceProdukRPH();
      break;
    case 'distributor':
      filter = traceabilityContract.filters.TraceProdukDistributor();
      break;
    case 'makanan':
      filter = traceabilityContract.filters.TraceMakanan();
      break;
  }
  const data = traceabilityContract.queryFilter(filter)

  return data;
}

export function useTracePemotongan() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'pemotongan'},
    TraceFetcher
  )
  const result: Array<TracePemotonganResult> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const tanggal_pemotongan = new Date(item.args?.tanggal_pemotongan);
    const formatted_tanggal_pemotongan = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(tanggal_pemotongan);

    const result: TracePemotonganResult = {
      ID_Pemotongan: item.args?.ID_Pemotongan,
      Akun_RPH: item.args?.Akun_RPH,
      jenis_kelamin: item.args?.jenis_kelamin,
      tanggal_pemotongan: formatted_tanggal_pemotongan,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}

export function useTraceProdukRPH() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'rph'},
    TraceFetcher
  )
  const result: Array<any> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);
    const result: TraceProdukRPHResult = {
      ID_ProdukRPH: item.args?.ID_ProdukRPH,
      ID_Pemotongan: item.args?.ID_Pemotongan,
      Akun_RPH: item.args?.Akun_RPH,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}

export function useTraceProdukDistributor() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'distributor'},
    TraceFetcher
  )
  const result: Array<any> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const tanggal_penyimpanan = new Date(item.args?.tanggal_penyimpanan);
    const tanggal_pengiriman = new Date(item.args?.tanggal_pengiriman);
    const tanggal_penerimaan = new Date(item.args?.tanggal_penerimaan);

    const formatted_tanggal_penyimpanan = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(tanggal_penyimpanan);

    const formatted_tanggal_pengiriman = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(tanggal_pengiriman);

    const formatted_tanggal_penerimaan = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(tanggal_penerimaan);

    const result: TraceProdukDistributorResult = {
      ID_ProdukDistributor: item.args?.ID_ProdukDistributor,
      ID_ProdukRPH: item.args?.ID_ProdukRPH,
      Akun_Distributor: item.args?.Akun_Distributor,
      tanggal_penyimpanan: formatted_tanggal_penyimpanan,
      tanggal_pengiriman: formatted_tanggal_pengiriman,
      tanggal_penerimaan: formatted_tanggal_penerimaan,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}

export function useTraceMakanan() {
  const { data, error } = useSWR<Array<any>, Error>(
    {type: 'makanan'},
    TraceFetcher
  )
  const result: Array<any> = 
    data! && data?.map((item) => {
    const date = Number(`${item.args?.date}`) * 1000;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(date);

    const tanggal_pengolahan = new Date(item.args?.tanggal_pengolahan);
    const formatted_tanggal_pengolahan = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      minute: 'numeric',
    }).format(tanggal_pengolahan);

    const result: TraceMakananResult = {
      ID_Makanan: item.args?.ID_Makanan,
      ID_ProdukDistributor: item.args?.ID_ProdukDistributor,
      Akun_RumahMakan: item.args?.Akun_RumahMakan,
      nama: item.args?.nama,
      tanggal_pengolahan: formatted_tanggal_pengolahan,
      status_kehalalan: item.args?.status_kehalalan,
      date: formattedDate
    }
    return result;
  })
  
  return {
    data: result,
    isLoading: !data && !error,
    error: error
  }
}
