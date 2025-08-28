export default function CountryCard({ item }) {
  const {
    name, flag, capital, region, population, languages
  } = item;

  return (
    <article className="card">
      {flag ? (
        <img src={flag} alt={`Flagga för ${name}`} loading="lazy" />
      ) : (
        <div style={{height:140}} aria-hidden />
      )}

      <h3>{name}</h3>

      <dl>
        <dt>Huvudstad</dt><dd>{capital}</dd>
        <dt>Region</dt><dd>{region}</dd>
        <dt>Befolkning</dt><dd>{population.toLocaleString("sv-SE")}</dd>
        <dt>Språk</dt><dd>{languages}</dd>
      </dl>
    </article>
  );
}