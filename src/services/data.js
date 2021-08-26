const fetchByFilter = (url) => {
  const dataAPI = fetch(url).then((res) => res.json())
    .then((data) => data)
    .catch(((err) => err));
  return dataAPI;
};

export default fetchByFilter;
