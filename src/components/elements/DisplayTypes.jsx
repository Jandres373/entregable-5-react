import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";
import { AnimatePresence, motion } from "framer-motion";
import { BiLeftArrow, BiRightArrow} from "react-icons/bi"

const DisplayTypes = ({ type }) => {
  const pokemonType = useSelector((_store) => _store.selectedPokeType);
  const [apiParameters, setApiParameters] = useState({
    url: "https://pokeapi.co/api/v2/",
    path: "type/",
    id: `${pokemonType}/`,
    modifiers: "",
  });

  const [apiResponse, apiError, getResponse] = useFetch(apiParameters);

  const [pagStyle, setPagStyle] = useState({
    active: 'join-item btn btn-primary',
    inactive: 'join-item btn dark:btn-outline dark:text-white'
  });

  const [paginationFrame, setPaginationFrame] = useState({
    currentPage: 1,
    rangeSearch: 5,
    lastElement: 5, 
    initialElement: 0,
    totalRenderPages: 1,
  });

  const handleCurrentPage = (value) => {
    setPaginationFrame((prev) => ({
      ...prev,
      currentPage: value,
      lastElement: value * prev.rangeSearch,
      initialElement: (value - 1) * prev.rangeSearch,
    }));
  };

  const handlePageRange = (e) => {
    const value = Number(e.target.value);
    setPaginationFrame((prev) => ({
      ...prev,
      rangeSearch: value,
      currentPage: 1, 
      lastElement: value,
      initialElement: 0,
    }));
  };

  const updatePagination = (newParameters) => {
    getResponse(newParameters);
  };

  useEffect(() => {
    const newParameters = {
      url: "https://pokeapi.co/api/v2/",
      path: "type/",
      id: `${pokemonType}/`,
      modifiers: "",
    };
    updatePagination(newParameters);
  }, [pokemonType]);

  useEffect(() => {
    if (apiResponse?.data) {
      const totalElements = apiResponse.data.pokemon.length;
      const totalRenderPages = Math.ceil(
        totalElements / paginationFrame.rangeSearch
      );
      setPaginationFrame((prev) => ({
        ...prev,
        totalRenderPages,
      }));
      if (paginationFrame.currentPage > totalRenderPages) {
        setPaginationFrame((prev) => ({
          ...prev,
          currentPage: totalRenderPages,
        }));
      }
    }
  }, [apiResponse, paginationFrame.rangeSearch]);

  useEffect(() => {
    setPaginationFrame((prev)=>(
      {
        ...prev,
        currentPage: 1,
        initialElement: 0,
        lastElement: prev.rangeSearch, 
      }
    ));
  }, [type]);

  const handleJumpPages = (increment) => {
    const newPage = paginationFrame.currentPage + increment;
    if (
      newPage >= 1 &&
      newPage <= paginationFrame.totalRenderPages
    ) {
      handleCurrentPage(newPage);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtonsToShow = 5;
    let startButton = 1;
    let endButton = paginationFrame.totalRenderPages;

    if (paginationFrame.totalRenderPages > maxButtonsToShow) {
      if (paginationFrame.currentPage <= maxButtonsToShow - 2) {
        endButton = maxButtonsToShow - 1;
      } else if (
        paginationFrame.currentPage >=
        paginationFrame.totalRenderPages - maxButtonsToShow + 2
      ) {
        startButton = paginationFrame.totalRenderPages - maxButtonsToShow + 1;
      } else {
        startButton = paginationFrame.currentPage - 2;
        endButton = paginationFrame.currentPage + 2;
      }
    }

    for (let i = startButton; i <= endButton; i++) {
      buttons.push(
        <button
          key={i}
          className={
            paginationFrame.currentPage === i
              ? pagStyle.active
              : pagStyle.inactive
          }
          value={i}
          onClick={() => handleCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  const canReducePagesByIncrement = (increment) => {
    return (
      paginationFrame.currentPage - increment >= 1
    );
  };

  const canIncreasePagesByIncrement = (increment) => {
    return (
      paginationFrame.currentPage + increment <= paginationFrame.totalRenderPages
    );
  };

  return (
    <div>
      <div className="w-full flex justify-end items-center mb-5 gap-5">
      <span className="dark:text-white font-bold">Range:</span>
        <select
          name=""
          id=""
          className="p-2 dark:bg-blue-950 dark:text-white"
          onChange={handlePageRange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div
        id="pokemon_cards_display"
        className="flex flex-wrap justify-center gap-10"
      >
        {apiResponse?.data &&
          apiResponse.data.pokemon
            .slice(
              paginationFrame.initialElement,
              paginationFrame.lastElement
            )
            .map((pokemon, i) => (
              <AnimatePresence key={i}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <PokemonCard key={i} pokemon={pokemon.pokemon} />
                </motion.div>
              </AnimatePresence>
            ))}
      </div>
      <div
        id="pagination_container"
        className="w-full flex justify-center items-center mt-10 gap-1"
      >
        <button
          className={
            paginationFrame.currentPage === 1 ||
            !canReducePagesByIncrement(5)
              ? pagStyle.inactive
              : pagStyle.active
          }
          onClick={() => handleJumpPages(-5)}
        >
          -5
        </button>
        <button
          className={
            paginationFrame.currentPage === 1 ||
            !canReducePagesByIncrement(1)
              ? pagStyle.inactive
              : pagStyle.active
          }
          onClick={() => handleJumpPages(-1)}
        >
          <BiLeftArrow />
        </button>
        {renderPaginationButtons()}
        <button
          className={
            paginationFrame.currentPage === paginationFrame.totalRenderPages ||
            !canIncreasePagesByIncrement(1)
              ? pagStyle.inactive
              : pagStyle.active
          }
          onClick={() => handleJumpPages(1)}
        >
          <BiRightArrow />
        </button>
        <button
          className={
            paginationFrame.currentPage === paginationFrame.totalRenderPages ||
            !canIncreasePagesByIncrement(5)
              ? pagStyle.inactive
              : pagStyle.active
          }
          onClick={() => handleJumpPages(5)}
        >
          +5
        </button>
      </div>
    </div>
  );
};

export default DisplayTypes;
