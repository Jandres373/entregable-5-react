import React from "react";
import PokemonCard from "./PokemonCard";

const DisplayNames = ({ name }) => {
    
  return (
    <div className="w-full flex justify-center items-end min-h-[500px]">
      <PokemonCard pokemon={name?.nameSearch?.data}/>
    </div>
  );
};

export default DisplayNames;
