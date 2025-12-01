import countries from "world-countries"

export const getCountriesWithFlags = () => {
  return countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: `https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`,
  }))
}
