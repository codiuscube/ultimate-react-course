import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [price, setPrice] = useState(null);
  const [perc1, setPerc1] = useState(15);
  const [perc2, setPerc2] = useState(15);
  const tip = Math.round(price * ((perc1 + perc2) / 2 / 100) * 100) / 100;

  // const [serviceA, setServiceA] = useState(null);
  // const [serviceFB, setServiceFB] = useState(null);

  // const serviceArray = [
  //   { answer: "I was dissatisfied (10%)", perc: 0.1 },
  //   { answer: "It was ok (15%)", perc: 0.15 },
  //   { answer: "I was satisfied (20%)", perc: 0.2 },
  //   { answer: "The service was primo (25%)", perc: 0.25 },
  // ];

  // const serviceFArray = [
  //   { answer: "They were dissatisfied (10%)", perc: 0.1 },
  //   { answer: "They said it was ok (15%)", perc: 0.15 },
  //   { answer: "They were satisfied (20%)", perc: 0.2 },
  //   { answer: "They said excellent! (25%)", perc: 0.25 },
  // ];

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to reset the calculator?"
    );

    if (confirmed) setPrice(null);
    setPerc1(15);
    setPerc2(15);
  }

  return (
    <div className="page">
      <Title />
      <Bill price={price} setPrice={setPrice} />
      <SelectPercentage percentage={perc1} onSelect={setPerc1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={perc2} onSelect={setPerc2}>
        How did your friend like the service?
      </SelectPercentage>
      {/* <Service
        service={serviceArray}
        serviceA={serviceA}
        onServiceA={setServiceA}
      /> */}
      {/* <ServiceF
        serviceF={serviceFArray}
        serviceFB={serviceFB}
        onServiceFB={setServiceFB}
      /> */}
      <Total
        price={price}
        tip={tip}
        // serviceA={serviceA}
        // serviceFB={serviceFB}
      />
      <Reset onClearList={handleClearList} />
    </div>
  );
}

function Title() {
  return <h1>Epic tip calculator</h1>;
}

function Bill({ price, setPrice }) {
  return (
    <div className="divider">
      <label>About how much was the bill?</label>
      <input
        type="number"
        placeholder="Bill amount"
        value={price !== null ? price : ""}
        onChange={(e) => setPrice(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, percentage, onSelect }) {
  return (
    <div className="divider">
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value="10">Dissatisfied (10%)</option>
        <option value="15">A-ok (15%)</option>
        <option value="20">Satisfied (20%)</option>
        <option value="25">Primo!! (25%)</option>
      </select>
    </div>
  );
}

// function Service({ service, serviceA, onServiceA }) {
//   return (
//     <div className="divider">
//       <label>How did you like the service?</label>
//       <select
//         value={serviceA != null ? serviceA : ""}
//         onChange={(e) =>
//           onServiceA(e.target.value === "" ? null : Number(e.target.value))
//         }
//       >
//         <option value="" disabled>
//           Select an option
//         </option>
//         {service.map((service, index) => (
//           <option key={index} value={service.perc}>
//             {service.answer}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function ServiceF({ serviceF, serviceFB, onServiceFB }) {
//   return (
//     <div className="divider">
//       <span>How did your friend like the service?</span>
//       <select
//         value={serviceFB != null ? serviceFB : ""}
//         onChange={(e) =>
//           onServiceFB(e.target.value === "" ? null : Number(e.target.value))
//         }
//       >
//         <option value="" disabled>
//           Select an option
//         </option>
//         {serviceF.map((serviceF, index) => (
//           <option key={index} value={serviceF.perc}>
//             {serviceF.answer}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function Total({ price, serviceA, serviceFB }) {
//   // Calculate the average tip percentage
//   const averageTipPercentage =
//     serviceA != null && serviceFB != null ? (serviceA + serviceFB) / 2 : 0;

//   // Calculate the tip amount based on the average tip percentage
//   const tipAmount =
//     price != null ? Math.round(price * averageTipPercentage) : 0;

//   // Calculate the final bill
//   const finalBill = price + tipAmount;

//   return (
//     <div>
//       {price == null ? (
//         <h2>🤪 Please enter the bill amount</h2>
//       ) : (
//         <h3>
//           You pay ${finalBill} (${price} + ${tipAmount} tip)
//         </h3>
//       )}
//     </div>
//   );
// }

function Total({ price, tip }) {
  const finalPrice = tip + price;

  return (
    <div>
      {price == null ? (
        <h2>🤪 Please enter the bill amount</h2>
      ) : (
        <h3>
          You pay ${finalPrice} (${price} + ${tip} tip)
        </h3>
      )}
    </div>
  );
}

function Reset({ onClearList }) {
  return <button onClick={onClearList}>Reset</button>;
}
