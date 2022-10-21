import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col top-1/2 justify-center">
      <div className="my-4">
        <h1 className="text-black font-sans  my-3 font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          REST Countries
        </h1>
      </div>
      <Link
        to="/countries"
        className="text-white rounded-lg py-2 self-center my-1 w-2/12 bg-gradient-to-r from-purple-400 to-pink-600 hover:text-white hover:to-pink-700"
      >
        Voir les pays
      </Link>
    </div>
  );
}

export default Home;
