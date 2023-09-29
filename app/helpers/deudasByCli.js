export const deudasByCli = (deudas, cliente) => {
  console.log(cliente,'aca como viene ', deudas)
    return deudas.filter( deu => deu.cliente === cliente )
  }