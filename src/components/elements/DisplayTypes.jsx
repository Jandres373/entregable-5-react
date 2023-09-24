import React, { useEffect, useState, useCallback } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import PokemonCard from "./PokemonCard";

const DisplayTypes = ({ type }) => {
  const [paginationFrame, setPaginationFrame] = useState({
    currentPage: 1,
    rangeSearch: 20,
    lastElement: 20,
    initialElement: 0,
    totalRenderPages: 1,
  });
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
    inacvtive: 'join-item btn dark:btn-outline dark:text-white'
  })

  useEffect(() => {
    const newParameters = {
      url: "https://pokeapi.co/api/v2/",
      path: "type/",
      id: `${pokemonType}/`,
      modifiers: "",
    };
    getResponse(newParameters);
  }, [pokemonType]);

  const handleCurrentPage = (e) => {
    const value = Number(e.target.value);
    setPaginationFrame((prev) => ({
      ...prev,
      currentPage: value,
      lastElement: value * prev.rangeSearch,
      initialElement: value * prev.rangeSearch - 20,
    }));
    setCardControl(value)
  };

  useEffect(() => {
    // Calcular totalRenderPages después de recibir apiResponse
    const totalElements = apiResponse?.data.pokemon.length;
    const totalRenderPages = Math.ceil(
      totalElements / paginationFrame.rangeSearch
    );
    // Actualizar totalRenderPages en el estado
    setPaginationFrame((prev) => ({
      ...prev,
      currentPage: 1,
      lastElement: 20,
      initialElement: 0,
      totalRenderPages,
    }));
    // Asegurarse de que currentPage sea válido después de actualizar totalRenderPages
    if (paginationFrame.currentPage > totalRenderPages) {
      setPaginationFrame((prev) => ({
        ...prev,
        currentPage: totalRenderPages,
      }));
    }
  }, [apiResponse, paginationFrame.rangeSearch]);

  return (
    <div>
      <div
        id="pokemon_cards_display"
        className="flex flex-wrap justify-center gap-5"
      >
        {apiResponse?.data.pokemon
          .map((pokemon, i) => (
            <PokemonCard key={i} pokemon={pokemon.pokemon} />
          ))
          .slice(paginationFrame.initialElement, paginationFrame.lastElement)}
      </div>
      <div
        id="pagination_container"
        className="w-full flex justify-center items-center mt-10 gap-1"
      >
        {Array(
          paginationFrame.totalRenderPages
            ? paginationFrame.totalRenderPages
            : 1
        )
          .fill(null)
          .map((_, index) => (
            <button
              key={index}
              className={
                paginationFrame.currentPage === index + 1
                  ? pagStyle.active
                  : pagStyle.inacvtive
              }
              value={index + 1}
              onClick={handleCurrentPage}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default DisplayTypes;
