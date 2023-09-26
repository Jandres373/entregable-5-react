import React from "react";

const Movements = ({ pokemonInfo }) => {
  const moves = pokemonInfo?.moves;
  return (
    <div className="mt-10 flex gap-5 flex-wrap justify-center p-5 md:p-20 shadow-lg">
      <div className="mb-10 flex-grow w-full text-3xl font-bold dark:text-white">Movements <hr /></div>
      {pokemonInfo?.moves.map((move, index) => (
        <div key={index} className="">
          <p className="bg-gray-200 w-fit text-sm  md:text-lg p-1 md:p-3 px-5 md:px-10 rounded-full shadow-md">
            {move.move.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Movements;
