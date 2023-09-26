import React, { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "react-hook-form";
import PokeSelect from "../components/elements/PokeSelect";
import { useDispatch, useSelector } from "react-redux";
import { selectionType } from "../store/slices/pokeSearch.slice";
import { Navigate } from "react-router-dom";
import PokemonDisplayScreen from "../components/elements/PokemonDisplayScreen.jsx";

const PokeDex = () => {
  const trainer = useSelector((_store) => _store.trainer);
  const searchType = useSelector((_store) => _store.selectedSearch);
  const dispatch = useDispatch();
  const selectType = selectionType.actions;
  const { register, handleSubmit } = useForm();
  const [nameSearchParameters, setNameSearchParameters] = useState({
    url: "https://pokeapi.co/api/v2/",
    path: "pokemon/",
    id: "",
    modifiers: "",
  });
  const [typeSearchParameters, setTypeSearchParameters] = useState({
    url: "https://pokeapi.co/api/v2/",
    path: "type/",
    id: "",
    modifiers: "",
  });
  const [typeResponse, typeError, getTypeResponse] =
    useFetch(typeSearchParameters);
  const [nameResponse, nameError, getNameResponse] =
    useFetch(nameSearchParameters);
  const [alertControl,setAlertControl] = useState(false)

  
  const handleSearchName = (rhfData) => {
    dispatch(selectType.setSelectionType("name"));
    const newParameters = {
      url: "https://pokeapi.co/api/v2/",
      path: "pokemon/",
      id: rhfData.name,
      modifiers: "",
    };
    setNameSearchParameters(newParameters);
  };

  const handleAlert = () => { 
    if (nameError) {
      setAlertControl(true)
      setTimeout(() => {
        setAlertControl(false)
      }, 5000);
    } else {
      setAlertControl(false)
    }
   }

  const apiResponseData = {
    typeSearch: typeResponse,
    typeError: typeError,
    nameSearch: nameResponse,
    nameError: nameError,
  };
  
  useEffect(() => {
    getNameResponse(nameSearchParameters);
  }, []);
  useEffect(() => {
    getTypeResponse(typeSearchParameters);
  }, []);
  useEffect(()=>{
    handleAlert()
  },[nameError])

  if (!trainer) {
    return <Navigate to={"/"} />;
  } else {
    return (
      <div className="relative w-full min-h-screen p-5 ">
        
        <div id="form_area" className="w-full h-12">
          <h2 className="text-2xl px-10 font-bold bg-gradient-to-bl from-slate-300 to-red-500 bg-clip-text text-transparent">
            Welcome Trainer:{" "}
            <span className="text-black dark:text-white underline">
              {trainer}!
            </span>
          </h2>
          
        </div>
        <div
          id="form_section"
          className="w-full  mt-10 h-12 px-10 items-center flex justify-between gap-2 md:gap-52"
        >
          <form
            action=""
            onSubmit={handleSubmit(handleSearchName)}
            className="w-full  flex"
          >
            <div>
            <input
              className="dark:border dark:text-white dark:pl-5 pl-5 border-black rounded-l-lg w-full h-12 dark:bg-blue-950"
              type="text"
              {...register("name")}
            />
            { <div className="w-fill bg-red-300 animate-pulse rounded-b-md">{alertControl && <p className="text-red-500 font-bold text-center">Incorrect name or id</p>}</div> }
            
            </div>

            <button className="w-28 h-12 rounded-r-lg bg-red-500 dark:bg-slate-900 text-white">
              Search
            </button>
          </form>
          <div className="w-full">
            <PokeSelect />
          </div>
        </div>
        <PokemonDisplayScreen apiResponseData={apiResponseData} />
        <div className="join w-full mt-5 flex justify-center"></div>
      </div>
    );
  }
};

export default PokeDex;
