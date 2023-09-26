import React, { useState } from 'react';
import { FaGithub } from "react-icons/fa6"

const Footer = () => {

  return (
    <div id='footer' className='w-full h-44 bg-red-500 dark:bg-slate-900 rounded-t-2xl text-gray-200 p-5 flex flex-col gap-5'>
     <h3 className='w-full text-center text-2xl font-bold'>Designed by:</h3>
     <div className='w-full  flex justify-center items-center gap-2'>
       <a href="enlace-a-GitHub" className='flex flex-col justify-center items-center'> Joseph Cardenas <FaGithub className='text-center'/></a>
       <a href="https://github.com/Jandres373" className='flex flex-col justify-center items-center'> Julian Mosquera <FaGithub className='text-center'/></a>
       <a href="https://github.com/maomejia2993" className='flex flex-col justify-center items-center'> Mau Mejía<FaGithub className='text-center'/></a>
     </div>
        <p className='w-full text-center text-2xl font-bold'>Academlo</p>
    </div>
  );
}

export default Footer;