import { Player } from '@lottiefiles/react-lottie-player'
import error404 from "../../assets/lotties/error404.json"

const Error404 = () => {
  return (
    <div className='w-full h-screen grid place-items-center'>
        <h3 className='text-3xl font-bold text-red-500 dark:text-white'>This page doesn't exist</h3>
        <div className='w-96 h-96'>
        <Player 
        src={error404}
        loop
        autoplay
        >

        </Player>
    </div>
    </div>
  )
}

export default Error404