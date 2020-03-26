import api from './api'
import axios from 'axios'

const ListarPaises = async () => {
  return await axios.get(api.url + 'pais/all')
}

const ListarOrigenes = async () => {
  return await axios.get(api.url + 'origen/4')
}
const ListarEstados = async (pais) => {
  return await axios.get(api.url + 'ciudad/pais?pais=' + pais)
}
const ListarCiudades = async (estado) => {
  return await axios.get(api.url + 'ciudad?estado=' + estado)
}
const ListarProductos = async () => {
  return await axios.get(api.url + 'box/all')
}
const GetSeguro = async () => {
  return await axios.get(api.url + 'seguro')
}

const GetPaymentMethods = async () => {
  return await axios.get(api.url + 'payment/all')
}
const DownloadPdf = async (data) => {
  return await axios.post(api.url + 'pdf', data, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/pdf'
    },
    responseType: 'blob'
  })
}
export default {
  ListarPaises,
  ListarOrigenes,
  ListarEstados,
  ListarCiudades,
  ListarProductos,
  GetSeguro,
  GetPaymentMethods,
  DownloadPdf
}