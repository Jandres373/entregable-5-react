import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import pokeBall from "../../assets/lotties/pokeBall.json"

const Lotties = () => {
  return (
    <Player
      autoplay
      src={pokeBall}
      style={{ height: "300px", width: "300px" }}
    >
    </Player>
  );
};

export default Lotties;
