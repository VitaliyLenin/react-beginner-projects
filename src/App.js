import React from "react";
import "./index.scss";

import { Collection } from "./Collections";

const cats = [
  { name: "Все" },
  { name: "Море" },
  { name: "Горы" },
  { name: "Архитектура" },
  { name: "Города" },
];

function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsloading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    setIsloading(true);

    const category = categoryId ? `category=${categoryId}` : "";

    fetch(
      `https://640a284e6ecd4f9e18c68a47.mockapi.io/collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert("Помилка при отриманні даних");
      })
      .finally(() => setIsloading(false));
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => {
              return obj.name
                .toLowerCase()
                .includes(searchValue.toLocaleLowerCase());
            })
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, index) => (
          <li
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? "active" : ""}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
