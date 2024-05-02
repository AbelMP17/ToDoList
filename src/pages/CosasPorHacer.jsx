import React, { useEffect, useState } from "react";
import Thing from "../components/Thing";

export default function CosasPorHacer() {
  const [inputName, setInputName] = useState("");
  const MAX_NAME_LENGTH = 25;

  const [cosas, setCosas] = useState([]);
  const [isAddingOne, setIsAddingOne] = useState({
    name: "",
    status: false,
    additionalInputs: [],
  });
  const [cosaSearched, setCosaSearched] = useState("");
  const [filteredThings, setFilteredThings] = useState([]);
  const [filterCosasHechas, setFilterCosasHechas] = useState("Todas");

  useEffect(() => {
    if (
      cosas !== localStorage.getItem("cosasPorHacer") &&
      cosas.length > localStorage.getItem("cosasPorHacer")
    ) {
      localStorage.setItem("cosasPorHacer", JSON.stringify(cosas));
    }
  });

  useEffect(() => {
    const cosasPorHacer = localStorage.getItem("cosasPorHacer");
    if (cosasPorHacer) {
      setCosas(JSON.parse(cosasPorHacer));
    }
  }, []);

  useEffect(() => {
    let filtered = cosas; // Copia de todas las tareas
  
    // Filtrar por nombre de tarea si se ha ingresado algo en el campo de búsqueda
    if (cosaSearched.trim() !== "") {
      filtered = filtered.filter((cosa) =>
        cosa.name.toLowerCase().includes(cosaSearched.toLowerCase())
      );
    }
  
    // Filtrar por estado de la tarea (hecha/pendiente)
    if (filterCosasHechas === "Hechas") {
      filtered = filtered.filter((cosa) => cosa.status === true);
    } else if (filterCosasHechas === "Pendientes") {
      filtered = filtered.filter((cosa) => cosa.status === false);
    }
  
    // Actualizar el estado de las tareas filtradas
    setFilteredThings(filtered);
  }, [cosaSearched, filterCosasHechas, cosas]);
  

  const handleInputNameChange = (event) => {
    const newValue = event.target.value;
    setInputName(newValue);
  };

  const handleIsAddingCosas = (cosaName) => {
    if (cosaName.length > MAX_NAME_LENGTH) {
      alert("El nombre de la tarea no puede tener más de 50 caracteres");
      return;
    }

    if (
      cosas.filter((cosa) => cosa.name.toLowerCase() === cosaName.toLowerCase())
        .length === 0
    ) {
      setIsAddingOne({
        name: cosaName,
        status: false,
        additionalInputs: [],
      });
    } else {
      alert("Esta tarea ya existe");
    }
  };

  const handleThingSearched = (event) => {
    setCosaSearched(event.target.value);
  };

  const handleAddThing = () => {
    const inputElements = document.querySelectorAll(".inputs");
    let allInputsFilled = true;

    inputElements.forEach((input) => {
      if (input.value.trim() === "") {
        allInputsFilled = false;
        return;
      }
    });

    if (!allInputsFilled) {
      alert("Por favor, llene todos los campos antes de agregar la tarea.");
      return;
    }

    const newThing = {
      ...isAddingOne,
      description: document.getElementById("input1").value,
      additionalInputs: [
        { name: document.getElementById("input1").value, status: false },
        ...isAddingOne.additionalInputs.map((input, index) => {
          return {
            name: document.getElementById(`input${index + 2}`).value,
            status: false,
          };
        }),
      ],
    };
    document.getElementById("inputName").value = "";
    setInputName("");
    setCosas([...cosas, newThing]);

    localStorage.setItem("cosasPorHacer", JSON.stringify([...cosas, newThing]));

    setIsAddingOne({
      name: "",
      status: false,
      additionalInputs: [],
    });
  };

  const handleRemoveThing = (thing) => {
    const newCosas = cosas.filter((cosa) => cosa !== thing);
    setCosas(newCosas);
    localStorage.setItem("cosasPorHacer", JSON.stringify(newCosas));
  };

  const updateThingName = (updatedItem, newName, updatedInputs) => {
    const updatedCosas = cosas.map((thing) => {
      if (thing === updatedItem) {
        return {
          ...thing,
          name: newName,
          additionalInputs: updatedInputs,
        };
      }
      return thing;
    });
    setCosas(updatedCosas);
    localStorage.setItem("cosasPorHacer", JSON.stringify(updatedCosas));
  };

  const handleAddInput = () => {
    setIsAddingOne((prevState) => ({
      ...prevState,
      additionalInputs: [
        ...prevState.additionalInputs,
        { name: "", status: false },
      ],
    }));
  };

  const handleRemoveInput = () => {
    setIsAddingOne((prevState) => ({
      ...prevState,
      additionalInputs: prevState.additionalInputs.slice(
        0,
        prevState.additionalInputs.length - 1
      ),
    }));
  };

  const handleQuit = () => {
    setIsAddingOne({
      name: "",
      status: false,
      additionalInputs: [],
    });

    document.getElementById("inputName").value = "";
  };

  return (
    <div className="flex flex-col bg-[#fdd47c] p-10 rounded-tr-xl rounded-b-xl">
      <div className="flex flex-wrap justify-between items-center w-full bg-[#f8da99] gap-3 p-5 rounded-xl">
        <div className="flex justify-center items-center flex-grow gap-2 text-center">
          <input
            type="search"
            placeholder="Search..."
            list="datos"
            className="p-3 rounded-md"
            onChange={handleThingSearched}
          />
          <datalist id="datos">
            {filteredThings.length > 0 &&
              filteredThings.map((item) => (
                <option key={item.name} value={item.name} />
              ))}
          </datalist>
          <select
            className="p-3 rounded-md"
            onChange={(event) => setFilterCosasHechas(event.target.value)}
          >
            <option value="Todas">Todas</option>
            <option value="Hechas">Hechas</option>
            <option value="Pendientes">Pendientes</option>
          </select>
          <p className="text-gray-500">{filteredThings.length +' / '+ cosas.length}</p>
        </div>

        <div className="flex flex-grow justify-center items-center gap-3">
          <span
            className={`${
              inputName.length <= 25 ? "text-gray-500" : "text-red-500"
            }`}
          >
            {inputName.length}/{MAX_NAME_LENGTH}
          </span>
          <input
            type="text"
            id="inputName"
            className="p-3 rounded-md"
            onChange={handleInputNameChange}
            placeholder="Nombre nueva tarea"
          />
          <button
            className="p-3 rounded-md bg-pink-300 hover:bg-opacity-70 transition-all duration-500"
            onClick={() =>
              !cosas.includes(document.getElementById("inputName").value)
                ? handleIsAddingCosas(
                    document.getElementById("inputName").value
                  )
                : alert
            }
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredThings.length > 0 ?
          filteredThings.map((item) => {
            return (
              <Thing
                key={item.name}
                item={item}
                removeThing={() => handleRemoveThing(item)}
                updateThingName={updateThingName}
              />
            );
          }): <div className="bg-red-400 p-8 mt-2 col-span-3 text-center w-full text-white text-xl font-bold rounded-lg"> No tienes trabajo. ¡Trabaja vago!</div>}
      </div>
      {isAddingOne.name !== "" && (
        <div className="flex justify-center items-center fixed left-0 top-0 h-full w-full bg-black bg-opacity-65 backdrop-blur-md z-40">
          <div className="flex flex-col justify-center items-center gap-3 bg-white w-[80%] md:w-[60%] rounded-xl">
            <h1 className="flex justify-center items-center gap-5 text-lg font-bold border-b-2 w-full text-center rounded-md bg-[#fdd47c] p-2">
              Título:{" "}
              <span className="px-16 py-2 bg-white rounded-md">
                {isAddingOne.name}
              </span>
              <button
                className="p-3 bg-red-400 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
                onClick={handleQuit}
              >
                X
              </button>
            </h1>
            <input
              type="text"
              id="input1"
              placeholder="Input 1"
              className="border-2 rounded-md p-2"
            />
            {isAddingOne.additionalInputs.map((input, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  id={`input${index + 2}`}
                  placeholder={`Input ${index + 2}`}
                  className="inputs border-2 rounded-md p-2"
                />
                {isAddingOne.additionalInputs.length - 1 === index && (
                  <button
                    className="p-2 bg-red-500 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
                    onClick={handleRemoveInput}
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button
              className="px-6 py-2 bg-blue-300 mb-5 rounded-md hover:shadow-md hover:shadow-gray-600 transition-all duration-500"
              onClick={handleAddInput}
            >
              Agregar Input
            </button>
            <button
              className="px-6 py-2 bg-pink-300 mb-5 rounded-md hover:shadow-md hover:shadow-gray-600 transition-all duration-500"
              onClick={handleAddThing}
            >
              Hecho
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
