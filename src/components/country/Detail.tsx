import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useState} from "react";
import {useParams} from "react-router-dom";

function Detail() {
  const {country} = useParams();
  const [countryInfo, setCountryInfo] = useState<Record<string, any>>();

  const {isLoading, refetch} = useQuery(
    ["country"],
    async () => await axios.get("https://restcountries.com/v3.1/alpha?codes=" + country),
    {
      onSuccess(data) {
        console.log(data);

        setCountryInfo(data.data);
      },
      onError() {
        refetch();
      },
    }
  );

  /** Refetch car state vide ? */
  countryInfo === undefined ? refetch() : "";

  return (
    <div className="flex justify-center w-full">
      <div className="p-6 w-full flex flex-col  justify-between my-1  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        {countryInfo?.map((data: Record<string, any>) => {
          return (
            <div className="w-4/12" key={data.name.common}>
              <div> {data.name.common}</div>
              <img src={data.flags.svg} alt={`Drapeau du pays ${data.name.common}`} className="" />
              <div> {data.cca2} </div>
              <div className="my-2">
                {data.altSpellings.map((spellings: string) => {
                  return (
                    <div className="w-full" key={spellings}>
                      {spellings}
                    </div>
                  );
                })}
              </div>
              <a
                href={data.maps.googleMaps}
                className="text-white my-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              >
                Voir sur Maps
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Detail;
