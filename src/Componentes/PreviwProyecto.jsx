import React from 'react'

const PreviwProyecto = ({proyecto}) => {
    const{nombre,_id, cliente}=proyecto;

  return (
    <div>{nombre}</div>
  )
}

export default PreviwProyecto