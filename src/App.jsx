import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'



const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: white;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;
  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen =  styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(()=>{
    if (Object.keys(monedas).length > 0) {
      setCargando(true)
      setResultado({})
      const { moneda, criptomoneda } = monedas
      const cotizarCripto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const cotizacion = await respuesta.json()
        setResultado(cotizacion.DISPLAY[criptomoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
    }
  },[monedas])

  return (
    <>
      <Contenedor>
        <Imagen
          src={ImagenCripto}
          alt='Imagenes criptomonedas'
        ></Imagen>
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario
            setMonedas={setMonedas}
          ></Formulario>
          {cargando && <Spinner></Spinner>}
          {resultado.PRICE && <Resultado resultado={resultado}></Resultado>}
        </div>
      </Contenedor>
    </>
  )
}

export default App
