import {useState} from "react";
import {Link} from "react-router-dom";

function Item({country}: Record<string, any>) {
  const [toggle, setToggle] = useState(false);

  return (
    <div className=" p-6 flex flex-col  justify-between my-1 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex justify-center p-0">
        <img
          className="w-full my-0 object-fill"
          src={country.flags.svg}
          loading="lazy"
          alt={`Drapeau du pays ${country.name.common}`}
          width={50}
        />
      </div>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white underline my-1">
        {country.name.common}
      </h5>
      {toggle === true ? (
        <>
          <div> {country.population} habitants</div>
          <div> Région : {country.region}</div>
          <div> Capitale : {country.capital}</div>
          <ul className="my-2 font-bold	 ">
            <b className="underline">Langue(s) :</b>
            {country.languages ? (
              Object.values(country.languages).map((elt: any) => {
                return (
                  <li key={elt} className="font-thin	no-underline">
                    {elt}
                  </li>
                );
              })
            ) : (
              <></>
            )}
          </ul>
          <ul className="my-2 font-bold	 ">
            <b className="underline">Monnaie :</b>
            {country.currencies ? (
              Object.values(country.currencies).map((elt: any) => {
                return (
                  <li key={elt.name} className="font-thin	no-underline">
                    {elt.name} / {elt.symbol}
                  </li>
                );
              })
            ) : (
              <></>
            )}
          </ul>
          <ul className="my-2 font-bold	 ">
            <b className="underline">Nom de la Population :</b>
            {country.demonyms ? (
              Object.values(country.demonyms).map((elt: any) => {
                return (
                  <li key={elt.f + elt.m} className="font-thin no-underline">
                    {elt.f} / {elt.m}
                  </li>
                );
              })
            ) : (
              <></>
            )}
          </ul>
          <div>
            <Link to={`/detail/${country.cca2}`} key={country.cca2}>
              <button className="text-white my-1  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Détail
              </button>
            </Link>
            <button
              onClick={() => setToggle(!toggle)}
              className="text-white my-1 mx-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Cacher
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={() => setToggle(!toggle)}
          className="text-white my-1  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Afficher plus
        </button>
      )}
    </div>
  );
}

export default Item;
