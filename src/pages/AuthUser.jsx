import React from "react";
import { useForm } from "react-hook-form";
import { trainerSlice } from "../store/slices/trainer.slice";
import { useDispatch, useSelector } from "react-redux";
import Lotties from "../components/elements/Lotties";
const AuthUser = () => {
  const trainer = useSelector((_store) => _store.trainer);
  const dispatch = useDispatch();
  const trainerActions = trainerSlice.actions;

  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    dispatch(trainerActions.setTrainer(data.name));
    window.localStorage.setItem('trainer', data.name);
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center gap-5">
      <Lotties />
      <h2 className="text-2xl font-bold bg-gradient-to-bl from-slate-500 to-red-500 bg-clip-text text-transparent">Welcome Trainer </h2>
        <h3 className="text-xl dark:text-white">In order to continue you must enter your trainer name.</h3>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="w-96 flex">
          <input
            {...register("name")}
            className="border-2 rounded-l-md h-12 shadow-sm w-full"
          ></input>
          <button className="border-5 rounded-md rounded-l-none p-3  bg-red-500 text-white">
            submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthUser;
