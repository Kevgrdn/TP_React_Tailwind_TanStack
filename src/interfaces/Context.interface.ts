/** Type de props */
export type TStateProps = {
  data: Record<string, any>[];
  currencies: string[];
  currencyFilter: string;
  detail: Record<string, any>;
};

/** Enumération des différentes actions */
export enum EStateEnum {
  data = "data",
  currencies = "currencies",
  currencyFilter = "currencyFilter",
  detail = "detail",
}

/** Interface représentant les données necessaires au dispatch pour mettre à jour les données. */
export interface IProps {
  type: EStateEnum;
  payload: any;
}

/** Interface représentant le useContext */
export interface IContext extends TStateProps {
  refetch: Function;
  isLoading: boolean;
  updateData: Function;
  updateCurr: Function;
}
