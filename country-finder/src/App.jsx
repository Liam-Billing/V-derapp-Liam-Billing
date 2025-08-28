import { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import CountryCard from "./components/CountryCard.jsx";
import { searchCountries } from "./services/countries.js";
import { validateQuery } from "./utils/validation.js";

export default function App() {
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(""); // för aria-live

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("");
    setItems([]);

    const check = validateQuery(q);
    if (!check.ok) {
      setError(check.message);
      return;
    }

    try {
      setBusy(true);
      setStatus("Söker…");
      const data = await searchCountries(check.value);
      setItems(data);
      setStatus(
        data.length === 0
          ? "Inga träffar."
          : `Hittade ${data.length} ${data.length === 1 ? "träff" : "träffar"}.`
      );
    } catch (err) {
      setError("Tekniskt fel. Försök igen.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <a href="#results" className="skip-link">Hoppa till resultat</a>

      <header>
        <h1>Country Finder</h1>
        <p className="subtitle">Sök efter länder och se flagga, huvudstad, region m.m.</p>
      </header>

      <SearchForm
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onSubmit={handleSubmit}
        disabled={busy}
        error={error}
      />

      <div role="status" aria-live="polite" className="helper" style={{marginTop: ".5rem"}}>
        {status}
      </div>

      <section id="results" className="results" aria-label="Sökresultat">
        {items.map((it) => (
          <CountryCard key={it.id} item={it} />
        ))}
      </section>

      <footer>
        <p>
          Data via{" "}
          <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">
            REST Countries
          </a>. Inga nycklar sparas i klienten.
        </p>
      </footer>
    </div>
  );
}