import React, { useState } from 'react'

const Footer = () => {
  const [estado, setEstado] = useState(()=>{
    const nombre = 'Joseph'
    if (nombre==='Mau') {
      return 5
    }
    return 0
  })

  return (
    <div id='footer' className='w-full h-44 flex justify-center bg-red-500 rounded-t-2xl text-gray-200'>
aqui debe ir toda la info del footer
<br />
{estado}
    </div>
  )
}

export default Footer