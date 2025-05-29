export interface Branch {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
  manager: string;
  salePrice: number;
  razonSocial: string;
  rfc: string;
  regimenFiscal: string;
  codigoPostal: string;
  usoCfdi: string;
  clientId: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
