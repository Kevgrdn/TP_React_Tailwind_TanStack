import axios from "axios";
import {useContext, useState} from "react";
import {CountriesContext} from "../../context/Context";
import Filters from "./Filters";

function SearchBar() {
  const {refetch, updateData} = useContext(CountriesContext);

  const handleSearchChange = (e: any) => {
    if (e.target.value.length > 2) {
      axios.get("https://restcountries.com/v3.1/name/" + e.target.value).then((data) => {
        updateData(data.data);
      });
    }
    if (e.target.value === "") {
      refetch();
    }
  };

  return (
    <div className="my-4 flex flex-col">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
        Recherche
      </label>
      <div className="flex w-full flex-col justify-center">
        <div className="flex flex-row justify-between w-full my-2 ">
          <input
            onChange={handleSearchChange}
            type="search"
            name="fetch"
            id="default-search"
            className="flex w-5/6 grow-3 p-4 pl-10 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Recherche de pays ..."
          />
          <Filters />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
