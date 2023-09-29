export const deudasByCli = (deudas, cliente) => {
    return deudas.filter( deu => deu.cliente === cliente )
  }