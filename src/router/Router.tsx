import {createBrowserRouter} from "react-router-dom";
import Home from "../home/Home";
import Error from "../home/Error";
import Detail from "../components/country/Detail";
import Country from "../components/country/Country";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/countries",
    element: <Country />,
    errorElement: <Error />,
  },
  {
    path: "/detail/:country",
    element: <Detail />,
    errorElement: <Error />,
  },
]);

export default router;
