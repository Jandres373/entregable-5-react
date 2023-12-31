import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { AnimatePresence, motion } from "framer-motion";

const PokemonCard = ({ pokemon }) => {
  const [apiParameters, setApiParameters] = useState({
    url: "https://pokeapi.co/api/v2/",
    path: "pokemon/",
    id: `${pokemon.name}/`,
    modifiers: "",
  });
  const [apiResponse, apiError, getResponse] = useFetch(apiParameters);

  useEffect(() => {
    const newParameters = {
      url: "https://pokeapi.co/api/v2/",
      path: "pokemon/",
      id: `${pokemon.name}/`,
      modifiers: "",
    };
    getResponse(newParameters);
  }, [pokemon]);

  const pokemonInfo = apiResponse?.data;

  const colorization = {
    normal: "bg-gradient-to-t from-slate-50 to-neutral-600",
    fighting: "bg-gradient-to-t  from-black to-gray-700",
    poison: "bg-gradient-to-t  from-violet-500 to-violet-900",
    ground: "bg-gradient-to-t  from-red-500 to-red-900",
    rock: "bg-gradient-to-t  from-gray-100 to-gray-400",
    bug: "bg-gradient-to-t  from-green-300 to-green-700",
    ghost: "bg-gradient-to-t  from-violet-500 to-violet-950",
    steel: "bg-gradient-to-t  from-slate-100 to-slate-400",
    fire: "bg-gradient-to-t  from-red-300 to-red-700",
    water: "bg-gradient-to-t  from-blue-200 to-blue-500",
    grass: "bg-gradient-to-t  from-green-100 to-green-400",
    electric: "bg-gradient-to-t  from-yellow-100 to-yellow-400",
    psychic: "bg-gradient-to-t  from-violet-100 to-violet-400",
    ice: "bg-gradient-to-t  from-blue-100 to-blue-200",
    dragon: "bg-gradient-to-t  from-red-500 to-red-900",
    dark: "bg-gradient-to-t  from-black to-black",
    fairy: "bg-gradient-to-t  from-rose-100 to-rose-400",
  };

  const textColorization = {
    normal: "text-gray-500",
    fighting: "text-gray-600",
    poison: "text-violet-800",
    ground: "text-red-800",
    rock: "text-gray-600",
    bug: "text-green-600",
    ghost: "text-violet-600",
    steel: "text-slate-500",
    fire: "text-red-500",
    water: "text-blue-500",
    grass: "text-green-500",
    electric: "text-yellow-500",
    psychic: "text-violet-500",
    ice: "text-blue-200",
    dragon: "btextred-800",
    dark: "text-violet-800",
    flying: "text-blue-300",
    fairy: "text-rose-500",
  };

  return (
    <motion.div className="" initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}>
      <Link to={`/poke-info/${apiResponse?.data.id}`}>
        <div
          className={`card relative w-96 shadow-xl p-2 ${
            colorization[pokemonInfo?.types[0]?.type?.name]
          } dark:text-white dark:bg-gradient-to-t dark:from-transparent dark:to-transparent`}
        >
          <figure>
            {pokemonInfo?.sprites?.other ? (
               <AnimatePresence key={pokemon.id}>
                <motion.img
                  className="absolute top-11 w-h-36 h-36"
                  src={
                    pokemonInfo?.sprites?.other["official-artwork"]
                      .front_default
                  }
                  alt="Pokemon image"
                />
             </AnimatePresence>
            ) : (
              <AnimatePresence key={pokemon.id}><div className="bg-gray-300 w-32 h-32 animate-pulse rounded"></div></AnimatePresence>
            )}
          </figure>
          <div className="card-body mt-36  bg-white dark:bg-transparent dark:bg-gradient-to-bl dark:from-transparent dark:to-transparent rounded-b-lg">
            <h2
              className={`card-title mt-9 uppercase ${
                textColorization[pokemonInfo?.types[0]?.type?.name]
              }`}
            >
              {pokemonInfo?.name}
              <div
                className={`badge ${
                  colorization[pokemonInfo?.types[0]?.type?.name]
                }`}
              ></div>
              <div className="badge badge-ghost">
                {pokemonInfo?.types[0]?.type?.name}
              </div>
              {pokemonInfo?.types[1]?.type?.name && (
                <div className="badge badge-ghost">
                  {pokemonInfo?.types[1]?.type?.name}
                </div>
              )}
            </h2>
            <div className="grid grid-rows-3 grid-flow-col gap-4 mt-5">
              {pokemonInfo?.stats.map((stat, index) => (
                <div key={index}>
                  <p
                    className={`flex items-center justify-center text-gray-500 uppercase text-sm  ${
                      textColorization[pokemonInfo?.types[0]?.type?.name]
                    }`}
                  >
                    {stat?.stat.name}
                  </p>
                  <p className="flex items-center justify-center font-bold">
                    {stat?.base_stat}
                  </p>
                </div>
              ))}
            </div>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PokemonCard;
