import React from "react";
import AuthUser from "./AuthUser";
import { useSelector } from 'react-redux';
import { _store } from "../store/_store";
import { trainerSlice } from "../store/slices/trainer.slice";
import PokeDex from "./PokeDex";

const Home = () => {
  const user = useSelector(_store => _store.trainer);


  if (!user) {
    return <AuthUser />;
  } else {
    return <PokeDex />;
  }
};

export default Home;
