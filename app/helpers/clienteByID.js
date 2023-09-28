// import { clientes } from '../data/clientes';

export const clienteByID = (clientes, id) => {
  return clientes.filter( cli => cli.vendedor === id )
}
