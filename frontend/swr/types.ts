export type TraceRequest = {
    type?: 'supplier' | 'pemotongan' | 'rph' | 'distributor' | 'makanan';
}
  
export type TraceSupplierResult = {
    ID_Supplier: string,
    Akun_Supplier: string,
    jenis_kelamin: string,
    berat_sapi: string,
    tanggal_pengiriman: string,
    status_kehalalan: boolean,
    date: string
}

export type TracePemotonganResult = {
    ID_Pemotongan: string,
    ID_Supplier: string,
    Akun_RPH: string,
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