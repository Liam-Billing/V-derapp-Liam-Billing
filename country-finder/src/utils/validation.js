// Enkel validering: 2–40 tecken, bokstäver (inkl. åäö), mellanslag och bindestreck
export function validateQuery(input) {
  const value = (input ?? "").trim();

  if (value.length < 2 || value.length > 40) {
    return { ok: false, message: "Skriv mellan 2 och 40 tecken." };
  }

  // Tillåt latinska bokstäver + åäö ÅÄÖ, mellanslag och bindestreck
  const allowed = /^[A-Za-zÀ-ÿÅÄÖåäö\s-]+$/u;
  if (!allowed.test(value)) {
    return { ok: false, message: "Endast bokstäver, mellanslag och bindestreck." };
  }

  return { ok: true, value };
}
