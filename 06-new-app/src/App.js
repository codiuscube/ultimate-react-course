import { useState } from "react";

const petname = [
  { name: "ClaraBee", ID: 320981 },
  { name: "BelleClare", ID: 764201 },
  { name: "LaraBelle", ID: 850349 },
  { name: "Claraboo", ID: 567812 },
  { name: "Bellaclara", ID: 432908 },
  { name: "Clariebell", ID: 691274 },
  { name: "Clarella", ID: 213455 },
  { name: "BelleCaraBoo", ID: 384120 },
  { name: "ClaraBella", ID: 902183 },
  { name: "Clarabellini", ID: 518364 },
  { name: "Clarabelle", ID: 518364 },
  { name: "CB", ID: 518364 },
];

export default function App() {
  const [generatedPetName, setGeneratedPetName] = useState([]);
  const [usedIDs, setUsedIDs] = useState(new Set());
  const [errorMessage, setErrorMessage] = useState("");

  function Header() {
    return (
      <div>
        <h1 className="text-3xl">Petname Wizard</h1>
        <p className="text-lg pt-3">
          Use this app to better create pet names for your wonderful pets.
        </p>
      </div>
    );
  }

  function TitleInput() {
    return (
      <form
        className="flex rounded w-full max-w-xl mx-auto mt-6"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          className="text-lg border-2 border-gray-200 flex-grow p-2 rounded outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-400 mr-2"
          placeholder="Enter pet name ideas"
        />
        <button
          type="submit"
          className="text-lg bg-black text-white p-2 rounded hover:bg-gray-800"
        >
          Let's go
        </button>
      </form>
    );
  }

  function onSubmit(e) {
    e.preventDefault();
    if (usedIDs.size === petname.length) {
      setErrorMessage("All names have been used.");
      return;
    }
    const newPetName = GeneratePetName();
    setGeneratedPetName((prevNames) => [...prevNames, newPetName]);
  }

  function onDelete(index) {
    setGeneratedPetName((prevNames) =>
      prevNames.filter((_, idx) => idx !== index)
    );
  }

  function GeneratePetName() {
    let randomIndex;
    let potentialName;
    do {
      randomIndex = Math.floor(Math.random() * petname.length);
      potentialName = petname[randomIndex];
    } while (usedIDs.has(potentialName.ID));

    setUsedIDs(new Set(usedIDs).add(potentialName.ID));
    return potentialName.name;
  }

  function PetNamesList() {
    return (
      <div className="pt-4">
        {generatedPetName.map((name, index) => (
          <PetName key={index} onDelete={() => onDelete(index)}>
            {name}
          </PetName>
        ))}
      </div>
    );
  }
  function PetName({ children, onDelete }) {
    return (
      <div className="inline-flex items-center bg-gray-200 rounded-full px-4 py-2 my-2 m-2">
        <span className="text-lg mr-2">{children}</span>
        <button
          onClick={onDelete}
          className="ml-auto bg-black hover:bg-gray-800 text-white rounded-full h-6 w-6 flex justify-center items-center"
        >
          &#10007;
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white w-full max-w-md mx-auto shadow rounded p-6">
        <Header />
        <TitleInput />
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <PetNamesList />
      </div>
    </div>
  );
}
