import _ from "lodash";
import { useState, useEffect } from "react";

const useFetchCountries = (search: string) => {
  const [countries, setCountries] = useState<any[]>([]);

  const fetchCountries = _.debounce((query: string) => {
    if (query) {
      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((res) => res.json())
        .then((response) => {
          const filtered = response.filter((country: any) =>
            country.name.common.toLowerCase().startsWith(query.toLowerCase()),
          );
          setCountries(filtered);
        })
        .catch((error) => {
          console.error(error);
          setCountries([]);
        });
    } else {
      setCountries([]);
    }
  }, 1000);

  useEffect(() => {
    fetchCountries(search);
    return () => {
      fetchCountries.cancel();
    };
  }, [search]);

  return countries;
};

export default useFetchCountries;
