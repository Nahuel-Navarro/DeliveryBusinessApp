import React from 'react'
import { clientes } from '../data/clientes'

export const clienteByID = (id) => {
  return clientes.filter( cli => cli.vendedor === id )
}
