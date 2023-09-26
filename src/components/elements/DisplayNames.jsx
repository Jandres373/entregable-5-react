import React from "react";
import PokemonCard from "./PokemonCard";

const DisplayNames = ({ nameResponse }) => {
  if (nameResponse?.nameSearch?.data?.name) {
    return (
      <div className="w-full flex justify-center items-end min-h-[500px]">
        <PokemonCard pokemon={nameResponse?.nameSearch?.data} />
        {console.log(nameResponse.nameSearch.data)}
      </div>
    );
  } else {
    return (
      <div className="p-10">
        <h3 className="text-center text-2xl font-bold dark:text-white ">Please look for a pokemon by name, id or type.</h3>
        <p className="text-red-500 text-center">The name field allows you to enter either a name or id</p>
      </div>
    );
  }
};

export default DisplayNames;
