import React from 'react'
import { useSelector } from 'react-redux';
import DisplayTypes from './DisplayTypes';
import DisplayNames from './DisplayNames';

const PokemonDisplayScreen = ({apiResponseData}) => {
    const searchType = useSelector((_store) => _store.selectedSearch);
  return (
    <section id='pokemons_container' className='px-10'>
        <div className='w-full mt-10'>
            {searchType === 'list' && (
                <div>
                    {apiResponseData?.typeSearch &&<DisplayTypes typeResponse={apiResponseData?.typeSearch?.data.results} />}
                </div>
            )}
            {searchType === 'name' && (
                <div>
                    {apiResponseData?.nameSearch && <DisplayNames nameResponse={apiResponseData}  /> }
                </div>
            )}
        </div>
    </section>
  )
}

export default PokemonDisplayScreen