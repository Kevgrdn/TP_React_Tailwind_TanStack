import axios from "axios";
import {useContext} from "react";
import {CountriesContext} from "../../context/Context";

function Filters() {
  const {updateData, updateCurr, refetch, currencies} = useContext(CountriesContext);

  const handleSearchChange = (e: any) => {
    if (e.target.value === "all") {
      refetch();
      return;
    }

    axios.get("https://restcountries.com/v3.1/region/" + e.target.value).then((data) => {
      updateData(data.data);
    });
  };
  const handleMoney = (e: any) => {
    updateCurr(e.target.value);
  };

  return (
    <>
      <select
        className="w-3/12 p-2.5  text-base font-semibold text-gray-900 bg-gray-50  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Filtrer"
        onChange={handleMoney}
      >
        <option className="italic" value="all">
          Tous
        </option>
        {currencies?.map((elt: string) => {
          return (
            <option key={elt} value={elt} className="italic">
              {elt}
            </option>
          );
        })}
      </select>
      <select
        onChange={handleSearchChange}
        className="w-3/12 p-4  text-base font-semibold  text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Filtrer"
      >
        <option className="italic font-bold" value="all">
          Tous
        </option>
        <option key="Americas" value="Americas" className="italic ">
          Amérique
        </option>
        <option key="Europe" value="Europe" className="italic">
          Europe
        </option>
        <option key="Asia" value="Asia" className="italic">
          Asie
        </option>
        <option key="Oceania" value="Oceania" className="italic">
          Océanie
        </option>
        <option key="Africa" value="Africa" className="italic">
          Afrique
        </option>
      </select>
    </>
  );
}

export default Filters;
