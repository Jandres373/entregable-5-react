import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TrainerProfile from "../pages/TrainerProfile.jsx";
import PublicLayout from "../layouts/PublicLayout";
import PokeInfo from "../pages/PokeInfo.jsx";
import Error404 from "../components/shared/Error404";

const RouteHandler = () => {
  return (
    <div className=" dark:bg-gradient-to-bl dark:from-gray-900 dark:to-sky-950  bg-gradient-to-tl from-slate-50 to-violet-50">
      <Routes>
        <Route path={"/"} element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path={"trainer-profile"} element={<TrainerProfile />} />
          <Route path={"poke-info/:id"} element={<PokeInfo />} />
          <Route path={"*"} element={<Error404 />} />
        </Route>
      </Routes>
    </div>
  );
};

export default RouteHandler;
