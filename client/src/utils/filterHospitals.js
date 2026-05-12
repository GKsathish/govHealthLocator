const includes = (value, query) => String(value || '').toLowerCase().includes(String(query || '').toLowerCase());

export const filterHospitals = (hospitals, filters) => {
  return hospitals.filter((hospital) => {
    const searchMatch =
      !filters.search ||
      [hospital.name, hospital.address, hospital.village, hospital.city, hospital.state, hospital.country].some((field) =>
        includes(field, filters.search)
      );

    return (
      searchMatch &&
      (!filters.village || hospital.village === filters.village) &&
      (!filters.city || hospital.city === filters.city) &&
      (!filters.state || hospital.state === filters.state) &&
      (!filters.country || hospital.country === filters.country)
    );
  });
};

export const getUniqueOptions = (hospitals, key) => [...new Set(hospitals.map((hospital) => hospital[key]).filter(Boolean))].sort();

export const getSuggestions = (hospitals) =>
  [...new Set(hospitals.flatMap((hospital) => [hospital.name, hospital.village, hospital.city, hospital.state, hospital.country]))].filter(Boolean);
