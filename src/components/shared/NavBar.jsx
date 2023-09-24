import React, { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { trainerSlice } from "../../store/slices/trainer.slice";
import homeIcon from "../../assets/homeIcon.png"
import { Link } from "react-router-dom";
const NavBar = () => {
  const trainer = useSelector((_store) => _store.trainer);
  const trainerActions = trainerSlice.actions;
  const dispatch = useDispatch()
  const [tooltip,setTooltip] = useState('close');
  const [theme, setTheme] = useState(() => {
    const selectedTheme = window.localStorage.getItem("theme");
    if (selectedTheme) {
      return window.localStorage.getItem("theme");
    }
    return "light";
  });

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const themeController = document.querySelector("html");
    if (theme === "dark") {
      themeController.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
    }
    if (theme === "light") {
      themeController.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const activateToltip = () => { 
    setTooltip('open')
   }
   const deactivateToltip = () => { 
    setTooltip(false)
   }

   const logOutrainer = () => { 
      dispatch(trainerActions.setTrainer(''))
      window.localStorage.removeItem('trainer');
    }


  return (
    <div className="sticky top-0 w-full h-16 bg-red-500 dark:bg-slate-950 flex justify-between px-5 items-center dark:text-white z-50">
      <div> <Link to={'/'}><figure><img src={homeIcon} alt="" className="w-10 h-10"/></figure></Link></div>
      <div className="flex items-center gap-5">
        {trainer
          && <div className={`tooltip tooltip-bottom tooltip-${tooltip}`} data-tip="Click to log out">
          <p className="text-lg text-white underline cursor-pointer" onMouseEnter={activateToltip} onMouseLeave={deactivateToltip} onClick={logOutrainer}>Log out</p>
        </div>
        }
        <button
          className="w-8 h-8 bg-white px-2 py-2 rounded-lg flex justify-center items-center"
          onClick={changeTheme}
        >
          <BsFillMoonStarsFill className="dark:text-slate-950" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
