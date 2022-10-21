import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {createContext, PropsWithChildren, useEffect, useMemo, useReducer} from "react";
import {TStateProps, EStateEnum, IProps, IContext} from "../interfaces/Context.interface";

/**
 * Fonction permettant de mettre à jour le reducer en fonction du type d'action.
 * @param { TStateProps } state - State.
 * @param { props } action - Objet contenant le type et le payload.
 * @returns
 */
function reducer(state: TStateProps, action: IProps): TStateProps {
  switch (action.type) {
    case "data":
      return {...state, data: action.payload};
    case "currencies":
      return {...state, currencies: action.payload};
    case "currencyFilter":
      return {...state, currencyFilter: action.payload};
    case "detail":
      return {...state, detail: action.payload};
    default:
      throw new Error();
  }
}

/** Valeurs initiales du State */
const stateInitialValues: TStateProps = {
  data: [],
  currencies: [],
  currencyFilter: "all",
  detail: {},
};

/** State initial du useContext. */
const initState = {
  ...stateInitialValues,
  refetch: () => {},
  isLoading: false,
  updateData: () => {},
  updateCurr: () => {},
};

/** Création du context avec la valeur de defaut a undefined */
const CountriesContext = createContext<IContext>(initState);

/** Création du context */
function CountriesProvider({children}: PropsWithChildren): any {
  /** Initialisation du reducer. */
  const [state, dispatch] = useReducer(reducer, initState);

  /** Garde en cache les données pour la modification des filtres. */
  const filteredData = useMemo(() => {
    if (state.currencyFilter === "all") {
      return state.data;
    }
    return state.data.filter((x: any) => {
      return x.currencies && x.currencies[state.currencyFilter];
    });
  }, [state.currencyFilter, state.data]);

  /** Se déclenche au changement des données présentes dans les dépendances.  */
  useEffect(() => {
    /** Fonction permettant de récupérer tous les types de monnaies. */
    function currencies() {
      const monnaie = new Set(
        state.data
          .map((countries: Record<string, any>) => {
            return countries.currencies ? Object.keys(countries?.currencies).map((curr) => curr) : [];
          })
          .flat()
      );

      /** Affichage des monnaies dans le filtre. */
      dispatch({type: EStateEnum.currencies, payload: [...monnaie]});
    }

    currencies();
  }, [state.data]);

  /** Mise à jour des pays. */
  function updateData(data: Record<string, any>[]) {
    dispatch({type: EStateEnum.data, payload: data});
  }

  /** Affichage des monnaies dans le filtre en fonction des régions/pays selectionnés. */
  function updateCurr(data: string) {
    dispatch({type: EStateEnum.currencyFilter, payload: data});
  }

  /** Test de MaJ Detail */
  function detail(data: Record<string, any>) {
    dispatch({type: EStateEnum.detail, payload: data});
  }

  /** Fonction permettant de fetch via axios et Tanstack */
  const {refetch, isLoading} = useQuery(
    ["country"],
    async () => await axios.get("https://restcountries.com/v3.1/all"),
    {
      onSuccess(data) {
        updateData(data.data);
      },
    }
  );

  /** Retourne le composant contenant les valeurs */
  return (
    <CountriesContext.Provider value={{...state, data: filteredData, updateCurr, updateData, refetch, isLoading}}>
      {children}
    </CountriesContext.Provider>
  );
}

export {CountriesContext, CountriesProvider};
