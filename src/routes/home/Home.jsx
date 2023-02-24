import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ColumnGroupingTable from "./Table";

const Item = styled(Paper)(() => ({}));

const currencyCol = function (number) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  }).format(number);
};

const currencyDol = function (number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
};

const val = 6000000;
const col = currencyCol(val);
const val2 = 6000;
const dol = currencyDol(val2);

function Greeting(props) {
  const val = props.val;
  if (val > 0) {
    return (
      <Typography
        style={{
          textAlign: "left",
          float: "right",
          color: "#00FF20",
        }}
      >
        {col}
      </Typography>
    );
  }
  return (
    <Typography
      style={{
        textAlign: "left",
        float: "right",
        color: "red",
      }}
    >
      {col}
    </Typography>
  );
}

function GreetingDol(props) {
  const val = props.val;
  if (val > 0) {
    return (
      <Typography
        style={{
          textAlign: "left",
          float: "right",
          color: "#00FF20",
        }}
      >
        {dol}
      </Typography>
    );
  }
  return (
    <Typography
      style={{
        textAlign: "left",
        float: "right",
        color: "red",
      }}
    >
      {dol}
    </Typography>
  );
}

const Home = () => {
  return (
    <Container>
      <Box className="home_box">
        <h2>Bienvenido Luis González Zúñiga</h2>
        <Typography>Hoy es un muy lindo día!!!</Typography>
      </Box>

      <Box className="home_box" display="flex" style={{ minHeight: "600px" }}>
        <div
          className="home_div"
          style={{ marginRight: "10px", minWidth: "40%" }}
        >
          <Stack spacing={2}>
            <Item className="home_item">
              <div>
                <h3 style={{ marginBottom: "15px" }}>
                  <a href={"banco-nacional-colones"}>Banco Nacional Colones</a>
                </h3>
                <Typography
                  style={{
                    textAlign: "left",
                    float: "left",
                  }}
                >
                  Saldo total en la cuenta:
                </Typography>
                <Greeting val={val} />
              </div>
            </Item>
            <Item className="home_item">
              <div>
                <h3 style={{ marginBottom: "15px" }}>
                  <a href={"banco-nacional-dolares"}>Banco Nacional Dolares</a>
                </h3>
                <Typography
                  style={{
                    textAlign: "left",
                    float: "left",
                  }}
                >
                  Saldo total en la cuenta:
                </Typography>
                <GreetingDol val={val2} />
              </div>
            </Item>
            <Item className="home_item">
              <div>
                <h3 style={{ marginBottom: "15px" }}>
                  <a href={"banco-popular-colones"}>Banco Popular Colones</a>
                </h3>
                <Typography
                  style={{
                    textAlign: "left",
                    float: "left",
                  }}
                >
                  Saldo total en la cuenta:
                </Typography>
                <Greeting val={val} />
              </div>
            </Item>
            <Item className="home_item">
              <div>
                <h3 style={{ marginBottom: "15px" }}>
                  <a href={"banco-popular-dolares"}>Banco Popular Dolares</a>
                </h3>
                <Typography
                  style={{
                    textAlign: "left",
                    float: "left",
                  }}
                >
                  Saldo total en la cuenta:
                </Typography>
                <GreetingDol val={val2} />
              </div>
            </Item>
            <Item className="home_item">
              <div>
                <h3 style={{ marginBottom: "15px" }}>
                  <a href={"banco-promerica-colones"}>
                    Banco Promerica Colones
                  </a>
                </h3>
                <Typography
                  style={{
                    textAlign: "left",
                    float: "left",
                  }}
                >
                  Saldo total en la cuenta:
                </Typography>
                <Greeting val={val} />
              </div>
            </Item>
            <Item className="home_item">
              <div>
                <h3 style={{ marginBottom: "15px" }}>
                  <a href={"banco-promerica-dolares"}>
                    Banco Promerica Dolares
                  </a>
                </h3>
                <Typography
                  style={{
                    textAlign: "left",
                    float: "left",
                  }}
                >
                  Saldo total en la cuenta:
                </Typography>
                <GreetingDol val={val2} />
              </div>
            </Item>
          </Stack>
        </div>
        <div className="home_div" style={{ maxWidth: "60%" }}>
          <ColumnGroupingTable />
        </div>
      </Box>
    </Container>
  );
};

export default Home;
