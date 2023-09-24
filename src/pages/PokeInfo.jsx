import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Movements from "../components/elements/Movements.jsx"

const PokeInfo = () => {
  const trainer = useSelector((_store) => _store.trainer);
  let { id } = useParams();
  const [apiParameters, setApiParameters] = useState({
    url: "https://pokeapi.co/api/v2/",
    path: "pokemon/",
    id: `${id}/`,
    modifiers: "",
  });
  const [apiResponse, apiError, getResponse] = useFetch(apiParameters);

  useEffect(() => {
    const newParameters = {
      url: "https://pokeapi.co/api/v2/",
      path: "pokemon/",
      id: `${id}/`,
      modifiers: "",
    };
    setApiParameters;
    getResponse(newParameters);
  }, []);
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
    normal: "bg-gray-500",
    fighting: "bg-red-600",
    poison: "bg-violet-800",
    ground: "bg-red-800",
    rock: "bg-gray-600",
    bug: "bg-green-600",
    ghost: "bg-violet-600",
    steel: "bg-slate-500",
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-500",
    psychic: "bg-violet-500",
    ice: "bg-blue-200",
    dragon: "bg-red-800",
    dark: "bg-violet-800",
    flying: "bg-blue-300",
    fairy: "bg-rose-500",
  };

  if (!trainer) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <div
        id="pokemon_info_page_container"
        className="w-full min-h-screen p-10 md:py-20 md:px-52"
      >
        <div className="w-full shadow-md ">
          <div
            id="colored_frame"
            className={`relative w-full h-32 rounded-t-xl ${
              colorization[pokemonInfo?.types[0]?.type?.name]
            } shadow-md`}
          >
            <figure>
              <img
                className="absolute top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-56 h-56"
                src={pokemonInfo?.sprites?.other['official-artwork'].front_default}
                alt="Pokemon image"
              />
            </figure>
          </div>
          <div id="pokemon_info_content" className="py-10 px-12 md:px-24">
            <h2 className="text-center mt-16">
              <span className="border-2 rounded-full shadow-sm p-2 text-2xl font-bold">
                #{pokemonInfo?.id}
              </span>
            </h2>
            <div
              id="pokemon_name_container"
              className="flex gap-5 justify-center items-center mt-10"
            >
              <hr className="w-full  border-gray-400 border-2" />
              <h3 className="text-4xl text-gray-400 leading-3 font-bold">
                aqui agregar la logica para el color del texto
                {pokemonInfo?.name}
              </h3>
              <hr className="w-full  border-gray-400 border-2" />
            </div>

            <div
              id="general_info"
              className="flex justify-center items-center gap-5 mt-10"
            >
              <p className="text-sm font-bold text-gray-400 text-center">
                height
                <span className="text-2xl text-black font-bold">
                  {" "}
                  <br />
                  {pokemonInfo?.height}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-400 text-center">
                EXP
                <span className="text-2xl text-black font-bold">
                  {" "}
                  <br />
                  {pokemonInfo?.base_experience}
                </span>
              </p>
            </div>
            <div id="pokemon_info_badges" className="flex justify-center gap-5 mt-10">
              <div className="w-full flex  flex-col justify-center">
                <h3 className="text-center font-bold text-2xl">Types</h3>
                <div className="flex gap-1 md:gap-5 mt-5">
                  <div
                    className={`w-full h-10 ${
                      textColorization[pokemonInfo?.types[0]?.type?.name]
                    } flex justify-center items-center p-2 rounded-lg`}
                  >
                    <p className=" text-sm md:text-lg font-bold">
                      {pokemonInfo?.types[0]?.type?.name}
                    </p>
                  </div>
                  {pokemonInfo?.types[1] && (
                    <div
                      className={`w-full h-10 ${
                        textColorization[pokemonInfo?.types[1]?.type?.name]
                      } flex justify-center items-center p-2 rounded-lg`}
                    >
                      <p className="text-sm md:text-lg font-bold">
                        {pokemonInfo?.types[1]?.type?.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex  flex-col justify-center">
                <h3 className="text-center font-bold text-2xl">Abilities</h3>
                <div className="flex gap-5 mt-5">
                  <div className="w-full h-10 ">
                    {" "}
                    <p className=" px-5  rounded-lg border-2 h-10 flex justify-center items-center backdrop-blur backdrop-filter bg-white bg-opacity-10 text-sm md:text-lg font-bold text-center">
                      {pokemonInfo?.abilities[0]?.ability?.name}
                    </p>{" "}
                  </div>
                  <div className="w-full h-10 ">
                    <p className=" px-5  rounded-lg border-2 h-10 flex justify-center items-center backdrop-blur backdrop-filter bg-white bg-opacity-10 text-sm md:text-lg font-bold text-center">
                      {pokemonInfo?.abilities[1]?.ability?.name}
                    </p>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div id="stats_title_container" className="flex">
            <h3 className="text-4xl text-black font-bold mt-20">Stats</h3>
           <span> <hr className="border-2 w-full"/></span>
            </div>
            <div id="progress_bars" className="w-full flex flex-col gap-5">
            {pokemonInfo?.stats.map((_,index)=> <div key={index}>
              <p className="text-gray-400 font-bold">{pokemonInfo?.stats[index]?.stat.name}</p>
              <progress className={`progress progress-error w-full h-8 shadow-md hover:backdrop-hue-rotate-60 hover:backdrop-brightness-110`} value={pokemonInfo?.stats[index]?.base_stat} max="100"></progress>
            </div> )}
            </div>
          </div>
        </div>

        <Movements />
      </div>
    );
  }
};

export default PokeInfo;
