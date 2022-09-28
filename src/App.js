import './App.css';
import {useState} from "react";

const URL = "https://api.exchangerate.host/latest";

export default function App() {
  const [eur, setEur] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [rate, setRate] = useState(0);

  async function Convert(e) {
    e.preventDefault();
    try {
      const res = await fetch(URL);

      if (res.ok) {
        const json = await res.json();
        setRate(json.rates.GBP);
        setGbp(eur * json.rates.GBP);
      } else {
        alert("Failed to retrieve");
      }
    } catch (error) {
      alert("Error: " + error);
    }
  }

  return (
    <div>
      <form>
        <div>
          <label>EUR:</label>
            <input type="number" step="0.01" value={eur} onChange={e => setEur(e.target.value)}/>
            <output>{rate}</output>
        </div>

        <div>
          <label>GBP: </label>
          <output>{gbp.toFixed(2)} €</output>
        </div>

        <div>
          <input type="submit" value="Convert" onClick={Convert}/>
        </div>
      </form>
    </div>
  );
}
