import { useEffect, useState } from "react";
import "./index.css";

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [query, setQuery] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NZD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState({});

  function copyFormulaToClipboard() {
    const formula = `=GOOGLEFINANCE("CURRENCY:${fromCurrency}${toCurrency}")`;

    navigator.clipboard
      .writeText(formula)
      .then(() => {
        console.log("Formula copied to clipboard");

        // Check if Notification permission is granted
        if (Notification.permission === "granted") {
          new Notification("Copied to Clipboard", {
            body: `Formula copied: ${formula}`,
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
              new Notification("Copied to Clipboard", {
                body: `Formula copied: ${formula}`,
              });
            }
          });
        }
      })
      .catch((err) => {
        console.error("Failed to copy formula: ", err);
      });
  }

  useEffect(() => {
    // Fetching currencies when the component mounts
    fetch("https://api.frankfurter.app/currencies")
      .then((response) => response.json())
      .then((data) => setCurrencies(data));
  }, []);

  useEffect(
    function () {
      async function fetchCurrencyExchangeRate() {
        setIsLoading(true);

        try {
          if (!query) return;
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${query}&from=${fromCurrency}&to=${toCurrency}`
          );
          if (!res.ok) throw new Error("Unable to fetch currency data");
          const data = await res.json();
          console.log(data);
          setConverted(Number(data.rates[toCurrency]).toFixed(2));
          setIsLoading(false); // Dynamically use toCurrency
        } catch (error) {
          console.error("Error:", error);
        }
      }

      if (fromCurrency === toCurrency) return setConverted(query).toFixed(2);
      fetchCurrencyExchangeRate();
    },
    [query, fromCurrency, toCurrency]
  );

  return (
    <div className="App">
      <CurrencyBar query={query} setQuery={setQuery} />
      <CurrencyDropdown
        currency={fromCurrency}
        setCurrency={setFromCurrency}
        isLoading={isLoading}
        currencies={currencies}
      />
      <CurrencyDropdown
        currency={toCurrency}
        setCurrency={setToCurrency}
        isLoading={isLoading}
        currencies={currencies}
      />
      {/* <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="NZD">NZD</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="NZD">NZD</option>
      </select> */}
      <p>
        ${converted} {toCurrency}
      </p>
      <button onClick={copyFormulaToClipboard}>
        🏓 Copy {fromCurrency}:{toCurrency} formula
      </button>
    </div>
  );
}

function CurrencyBar({ query, setQuery, isLoading }) {
  return (
    <input
      type="text"
      placeholder=""
      value={query}
      onChange={(e) => setQuery(Number(e.target.value))}
      disabled={isLoading}
    />
  );
}

function CurrencyDropdown({ currency, setCurrency, currencies, isLoading }) {
  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      disabled={isLoading}
    >
      {Object.entries(currencies).map(([code, name]) => (
        <option key={code} value={code}>
          {code} - {name}
        </option>
      ))}
    </select>
  );
}
