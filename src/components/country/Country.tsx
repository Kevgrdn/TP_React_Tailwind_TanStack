import {CircularProgress} from "@mui/material";
import {useContext} from "react";
import {CountriesContext} from "../../context/Context";
import Item from "./Item";
import SearchBar from "../filters/SearchBar";

function Country() {
  const {data, isLoading} = useContext(CountriesContext);

  return (
    <>
      {isLoading === true ? (
        <CircularProgress
          color="secondary"
          className="absolute top-1/2 transition-opacity ease-in-out delay-150  duration-1000"
        />
      ) : (
        <div className="flex flex-col mx-4   ">
          <SearchBar />
          <div className="grid  grid-cols-6 gap-3  ">
            {data?.map((country: Record<string, any>) => {
              return <Item country={country} key={country.name.common} />;
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Country;
