import { Routes, Route } from "react-router-dom";
import Home from "../../routes/home/Home";
import Layout from "../layout/Layout";
import BancoNacional from "../../routes/bancoNacional/BancoNacional";
import BancoNacionalColones from "../../routes/bancoNacional/colones";
import BancoNacionalDolares from "../../routes/bancoNacional/dolares";
import BancoPopular from "../../routes/bancoPopular/BancoPopular";
import BancoPopularColones from "../../routes/bancoPopular/colones";
import BancoPopularDolares from "../../routes/bancoPopular/dolares";
import BancoPromerica from "../../routes/bancoPromerica/BancoPromerica";
import BancoPromericaColones from "../../routes/bancoPromerica/colones";
import BancoPromericaDolares from "../../routes/bancoPromerica/dolares";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="banco-nacional" element={<BancoNacional />} />
          <Route
            path="banco-nacional-colones"
            element={<BancoNacionalColones />}
          />
          <Route
            path="banco-nacional-dolares"
            element={<BancoNacionalDolares />}
          />
          <Route path="banco-popular" element={<BancoPopular />} />
          <Route
            path="banco-popular-colones"
            element={<BancoPopularColones />}
          />
          <Route
            path="banco-popular-dolares"
            element={<BancoPopularDolares />}
          />
          <Route path="banco-promerica" element={<BancoPromerica />} />
          <Route
            path="banco-promerica-colones"
            element={<BancoPromericaColones />}
          />
          <Route
            path="banco-promerica-dolares"
            element={<BancoPromericaDolares />}
          />
          <Route path="*" element={<p>Not found!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
