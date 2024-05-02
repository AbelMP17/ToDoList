import { useEffect, useState } from "react";

export default function Thing({ item, removeThing, updateThingName }) {
  const [checked, setChecked] = useState(false);
  const [wantDelete, setWantDelete] = useState(false);
  const [wantSee, setWantSee] = useState(false);
  const [editingName, setEditingName] = useState(false);

  const [inputName, setInputName] = useState("");
  const MAX_NAME_LENGTH = 25;

  const handleInputNameChange = (event) => {
    const newValue = event.target.value;
    setInputName(newValue);
  };

  useEffect(() => {
    setChecked(item.status);
  });

  const handleCheckboxChange = () => {
    item.status = !checked
    updateThingName(item, item.name, item.additionalInputs)
    setChecked(!checked);
  };

  const handleEditName = () => {
    const newName = document.getElementById("newNameInput").value;
    if (newName.length <= 25 && newName !== "") {
      item.name = newName;
      setEditingName(false);
      updateThingName(item, newName, item.additionalInputs);
    } else {
      alert(
        "Solo se pueden escribir nombres de 25 letras max. Y no puede estár vacío"
      );
      return;
    }
  };

  const handleCheckboxChangeInput = (input) => {
    const updatedInputs = item.additionalInputs.map((inputItem) => {
      if (inputItem === input) {
        return {
          ...inputItem,
          status: !inputItem.status,
        };
      }
      return inputItem;
    });

    updateThingName(item, item.name, updatedInputs);
  };

  return (
    <div className="grid grid-cols-3 justify-between items-center p-5 bg-[#f8bb37] mt-5 rounded-md">
      {!editingName ? (
        <p
          className="bg-white p-5 rounded-md cursor-pointer max-w-[150px] text-center break-all"
          onDoubleClick={() => setEditingName(true)}
        >
          {item.name}
        </p>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 m-auto">
          <span
            className={`${
              inputName.length <= 25 ? "text-gray-500" : "text-red-500"
            }`}
          >
            {inputName.length}/{MAX_NAME_LENGTH}
          </span>
          <input
            type="text"
            id="newNameInput"
            placeholder={item.name}
            onChange={handleInputNameChange}
            name="editingName"
            className="p-3 rounded-md"
          />
          <div className="flex gap-2">
            <button
              className="p-3 bg-yellow-200 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
              onClick={handleEditName}
            >
              Editar
            </button>
            <button
              className="p-3 bg-red-400 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
              onClick={() => setEditingName(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
      {!editingName && (
        <>
          <label className="flex items-center cursor-pointer m-auto">
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={handleCheckboxChange}
            />
            <div
              className={`w-12 h-6 rounded-full ${
                checked ? "bg-blue-500" : "bg-gray-400"
              } 
            relative transition-colors duration-300`}
            >
              <div
                className={`w-6 h-6 rounded-full shadow-md transform ${
                  checked ? "translate-x-6" : "translate-x-0"
                } 
              bg-white border-2 border-gray-300 transition-transform duration-300`}
              />
            </div>
          </label>
          <div className="flex gap-2 m-auto">
            <button
              className="p-2 bg-blue-300 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
              onClick={() => setWantSee(true)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3208/3208786.png"
                className="w-[30px]"
                alt="Ver"
                title="Ver"
              />
            </button>
            <button
              className="p-2 bg-red-500 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
              onClick={() => setWantDelete(true)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3143/3143497.png"
                className="w-[30px] "
                alt="Eliminar"
                title="Eliminar"
              />
            </button>
          </div>
        </>
      )}
      {wantDelete && (
        <div className="flex justify-center items-center fixed left-0 top-0 h-full w-full bg-black bg-opacity-65 backdrop-blur-md z-40">
          <div className="flex flex-col justify-center items-center gap-3 bg-white w-[80%] md:w-[60%] rounded-xl">
            <h1 className="flex justify-center items-center gap-5 text-lg font-bold border-b-2 w-full text-center rounded-md bg-[#fdd47c] p-2">
              ¿Desea eliminar esta tarea?
            </h1>
            <div className="flex gap-5">
              <button
                className="px-6 py-2 bg-pink-300 mb-5 rounded-md hover:shadow-md hover:shadow-gray-600 transition-all duration-500"
                onClick={() => removeThing(this)}
              >
                Sí
              </button>
              <button
                className="px-6 py-2 bg-red-300 mb-5 rounded-md hover:shadow-md hover:shadow-gray-600 transition-all duration-500"
                onClick={() => setWantDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {wantSee && (
        <div className="flex justify-center items-center fixed left-0 top-0 h-full w-full bg-black bg-opacity-65 backdrop-blur-md z-40">
          <div className="flex flex-col justify-center items-center gap-3 bg-white w-[80%] md:w-[60%] rounded-xl pb-5">
            <h1 className="flex justify-center items-center gap-5 text-lg font-bold border-b-2 w-full text-center rounded-md bg-[#fdd47c] p-2">
              Tarea:{" "}
              <span className="bg-white p-5 rounded-md">{item.name}</span>{" "}
              <button
                className="p-3 bg-red-400 rounded-md hover:shadow-md hover:shadow-[#a88d52] transition-all duration-500"
                onClick={() => setWantSee(false)}
              >
                X
              </button>
            </h1>
            {item.additionalInputs.map((input, i) => {
              return (
                <div
                  className="flex justify-center items-center gap-3 mt-5"
                  key={i}
                >
                  <p>{input.name}</p>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="hidden"
                      onChange={() => handleCheckboxChangeInput(input)}
                      checked={input.status}
                    />
                    <div
                      className={`w-12 h-6 rounded-full ${
                        input.status ? "bg-blue-500" : "bg-gray-400"
                      } 
              relative transition-colors duration-300`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full shadow-md transform ${
                          input.status ? "translate-x-6" : "translate-x-0"
                        } 
                bg-white border-2 border-gray-300 transition-transform duration-300`}
                      />
                    </div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
