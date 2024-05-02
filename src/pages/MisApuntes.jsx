import React, { useEffect, useState } from "react";
import Apunte from "../components/Apunte";
export default function CosasPorHacer() {
  
  /*const [misApuntes, setMisApuntes] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("misApuntes") === null) {
      localStorage.setItem("misApuntes", JSON.stringify(misApuntes));
    }
    setMisApuntes(JSON.parse(localStorage.getItem("misApuntes")));
  });

  const handleAddApunte = (nombre, apunte) => {
    setMisApuntes([...misApuntes, { name: nombre, apunte: apunte }]);
    localStorage.setItem("misApuntes", JSON.stringify(misApuntes));
  };*/

  return (
  <div className="w-full text-center">Im Working on this Page... See you later.</div>
    /*<div className="flex flex-col bg-[rgb(253,212,124)] p-10 rounded-tr-xl rounded-b-xl">
      {misApuntes.length > 0 ? (
        misApuntes.map((apunte) => {
          return <Apunte name={apunte.name} apunte={apunte.apunte} />;
        })
      ) : (
        <div></div>
      )}
    </div>*/
  );
}
