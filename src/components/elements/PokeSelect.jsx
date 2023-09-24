import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  selectionType,
  pokeTypeSelected,
} from "../../store/slices/pokeSearch.slice";
import DisplayTypes from "./DisplayTypes";

const PokeSelect = () => {
  const dispatch = useDispatch();
  const pokemonType = useSelector((_store) => _store.selectedPokeType);
  const searchType = useSelector((_store) => _store.selectedSearch);
  const selectedSearch = selectionType;
  const selectedPokeType = pokeTypeSelected;

  const { handleSubmit, control, watch } = useForm();

  const [apiParameters, setApiParameters] = useState({
    url: "https://pokeapi.co/api/v2/",
    path: "type/",
    id: "",
    modifiers: "",
  });

  const [apiResponse, apiError, getResponse] = useFetch(apiParameters);

  const onChange = (data) => {
    dispatch(selectedSearch.actions.setSelectionType("list"));
    dispatch(selectedPokeType.actions.setSelectedPokemonType(data.pokemonType));
  };

  useEffect(() => {
    getResponse(apiParameters);
  }, []);

  return (
    <div>
      <form className="w-full" action="" onChange={handleSubmit(onChange)}>
        <Controller
          name="pokemonType"
          control={control}
          defaultValue="normal"
          render={({ field }) => (
            <select className="w-full h-12 dark:bg-blue-950 dark:text-white dark:px-5 px-5 rounded-md" {...field}>
              {apiResponse?.data.results.map((e, i) => (
                <option key={i}>{e.name}</option>
              ))}
            </select>
          )}
        />
      </form>
    </div>
  );
};

export default PokeSelect;
