import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Movements from "../components/elements/Movements.jsx";
import { BsArrowUp, BsArrowUpCircle } from "react-icons/bs";
import { motion } from "framer-motion";
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
    fighting: "bg-gray-400",
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

  const textColorizationText = {
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

  const goToTop = () => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollIntoView({ behavior: "smooth" });
  };

  if (!trainer) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <div
        id="pokemon_info_page_container"
        className="w-full min-h-screen p-10 md:py-20 md:px-52 scroll-smooth"
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
                src={
                  pokemonInfo?.sprites?.other["official-artwork"].front_default
                }
                alt="Pokemon image"
              />
            </figure>
          </div>
          <div id="pokemon_info_content" className="py-10 px-12 md:px-24">
            <h2 className="text-center mt-16">
              <span className="border-2 rounded-full shadow-sm p-2 text-2xl font-bold dark:text-white">
                #{pokemonInfo?.id}
              </span>
            </h2>
            <div className="flex gap-5 justify-center items-center mt-10">
              <hr className="flex-grow  border-gray-400 border" />
              <h3
                className={`text-4xl text-center ${
                  textColorizationText[pokemonInfo?.types[0]?.type?.name]
                } leading-3 font-bold first-letter:uppercase text-overflow`}
                // Hace que el h3 ocupe todo el espacio disponible
              >
                {pokemonInfo?.name}
              </h3>
              <hr className="flex-grow border-gray-400 border" />
            </div>

            <div
              id="general_info"
              className="flex justify-center items-center gap-5 mt-10"
            >
              <p className="text-sm font-bold text-gray-400 text-center">
                HEIGHT
                <span className="text-2xl text-black font-bold dark:text-white ">
                  {" "}
                  <br />
                  {pokemonInfo?.height}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-400 text-center">
                EXP
                <span className="text-2xl text-black font-bold dark:text-white">
                  {" "}
                  <br />
                  {pokemonInfo?.base_experience}
                </span>
              </p>
            </div>
            <div
              id="pokemon_info_badges"
              className="md:flex justify-center gap-5 mt-10"
            >
              <div className="w-full flex  flex-col justify-center">
                <h3 className="text-center font-bold text-2xl dark:text-white">
                  Types
                </h3>
                <div className="flex gap-1 md:gap-5 mb-10 md:mb-0 mt-5 justify-center">
                  <div
                    className={` w-36 md:w-full h-10  ${
                      textColorization[pokemonInfo?.types[0]?.type?.name]
                    } flex justify-center items-center p-2 rounded-lg md:h-12`}
                  >
                    <p className=" text-sm md:text-lg font-bold uppercase">
                      {pokemonInfo?.types[0]?.type?.name}
                    </p>
                  </div>
                  {pokemonInfo?.types[1] && (
                    <div
                      className={` w-36 md:w-full h-10  ${
                        textColorization[pokemonInfo?.types[1]?.type?.name]
                      } flex justify-center items-center p-2 rounded-lg md:h-12`}
                    >
                      <p className="text-sm md:text-lg font-bold uppercase">
                        {pokemonInfo?.types[1]?.type?.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex  flex-col justify-center">
                <h3 className="text-center font-bold text-2xl dark:text-white">
                  Abilities
                </h3>
                <div className="flex gap-5 mt-5">
                  <div className="w-full h-12 ">
                    {" "}
                    <p className=" px-5  rounded-lg border-2 h-12 flex justify-center items-center backdrop-blur backdrop-filter bg-white bg-opacity-10 text-sm md:text-lg font-bold text-center dark:text-white uppercase">
                      {pokemonInfo?.abilities[0]?.ability?.name}
                    </p>{" "}
                  </div>
                  <div className="w-full h-12 ">
                    <p className=" px-5  rounded-lg border-2 h-12 flex justify-center items-center backdrop-blur backdrop-filter bg-white bg-opacity-10 text-sm md:text-lg font-bold text-center dark:text-white uppercase">
                      {pokemonInfo?.abilities[1]?.ability?.name}
                    </p>
                  </div>{" "}
                </div>
              </div>
            </div>
            <div id="stats_title_container" className="flex">
              <h3 className="text-4xl text-black font-bold mt-20 dark:text-white mb-5 w-full flex items-center gap-2">
                {" "}
                <p>Stats</p>{" "}
                <span className="w-full">
                  <hr className="w-full  border-gray-400 border" />
                </span>{" "}
              </h3>
            </div>

            <div
              id="progress_bars"
              className="w-full flex flex-col gap-5 uppercase"
            >
              {pokemonInfo?.stats.map((_, index) => (
                <div key={index}>
                  <motion.p className="text-gray-400 font-bold">
                    {pokemonInfo?.stats[index]?.stat.name}
                  </motion.p>
                  <motion.progress
                    className={`progress progress-error dark:progress-accent  w-full h-8 shadow-md hover:backdrop-hue-rotate-60 hover:backdrop-brightness-110`}
                    value={pokemonInfo?.stats[index]?.base_stat}
                    max="100"
                  ></motion.progress>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Movements pokemonInfo={pokemonInfo} />

        <motion.div
          className="w-full flex justify-end"
          initial={{ x : 30, y:100 }}
          whileInView={{ x : 15, y:15 }}
          onClick={goToTop}
        >
          <BsArrowUpCircle
            className={`text-2xl w-14 h-14 rounded-full animate-pulse  cursor-pointer ${
              textColorizationText[pokemonInfo?.types[0]?.type?.name]
            }`}
          />
        </motion.div>
      </div>
    );
  }
};

export default PokeInfo;
