export type TraceRequest = {
    type?: 'pemotongan' | 'rph' | 'distributor' | 'makanan';
}
  
export type TracePemotonganResult = {
    ID_Pemotongan: string,
    Akun_RPH: string,
    jenis_kelamin: string,
    tanggal_pemotongan: string,
    status_kehalalan: boolean,
    date: string
}
  
export type TraceProdukRPHResult = {
    ID_ProdukRPH: string,
    ID_Pemotongan: string,
    Akun_RPH: string,
    status_kehalalan: boolean,
    date: string
}
  
export type TraceProdukDistributorResult = {
    ID_ProdukDistributor: string,
    ID_ProdukRPH: string,
    Akun_Distributor: string,
    tanggal_penyimpanan: string,
    tanggal_pengiriman: string,
    tanggal_penerimaan: string,
    status_kehalalan: boolean,
    date: string
}
  
export type TraceMakananResult = {
    ID_Makanan: string,
    ID_ProdukDistributor: string,
    Akun_RumahMakan: string,
    nama: string,
    tanggal_pengolahan: string,
    status_kehalalan: boolean,
    date: string
}