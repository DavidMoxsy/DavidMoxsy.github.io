import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import RightTable from "@/components/rightTable/RightTableReact";
import LeftTable from "@/components/leftTable/LeftTableReact";
import { right_columns } from "./hooks/Right_UseColumns";
import { left_columns } from "./hooks/Left_UseColumns";
import Typography from "@mui/material/Typography";
import axios from "redaxios";

const currencyCol = function (number) {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  }).format(number);
};

function Greeting(props) {
  const val = props.col;
  if (val > 0) {
    return (
      <Typography
        style={{
          textAlign: "left",
          float: "right",
          color: "#00FF20",
        }}
      >
        {props.saldoTotal}
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
      {props.saldoTotal}
    </Typography>
  );
}

const BancoNacionalColones = () => {
  let monto = 0;
  let saldoTotal = 0;

  const [num, setNum] = useState(0);
  const [gasto, setGasto] = useState(0);
  const [gastosTot, setGastoTot] = useState([]);

  useEffect(() => {
    obtenerGastos();
  }, []);

  //procedimineto para mostrar todos los gastos
  const obtenerGastos = async () => {
    const res = await axios.get("http://localhost:8000/gastos/moneda/" + 1);
    setGastoTot(res.data);
  };

  for (let i = 0; i < gastosTot.length; i++) {
    monto += gastosTot[i].saldoTotal;
  }

  saldoTotal = currencyCol(monto);

  return (
    <Container onload={obtenerGastos()}>
      <Box className="nacionalColones_Box">
        <h2>Banco Nacional Colones </h2>
        <Typography
          style={{
            textAlign: "left",
            display: "block",
            float: "left",
          }}
        >
          Saldo total en la cuenta:
        </Typography>

        <Typography
          style={{
            textAlign: "right",
            display: "block",
            float: "right",
            color: "lime",
          }}
        >
          <Greeting col={monto} saldoTotal={saldoTotal} />
        </Typography>
      </Box>

      <Box className="nacionalColones_Box" display="flex">
        <div
          className="nacionalColones_div"
          style={{
            maxWidth: "35%",
            marginRight: "10px",
            width: "100%",
          }}
        >
          <LeftTable
            rows={[]}
            columns={left_columns}
            num={(value) => setNum(value)}
            gasto={(value) => setGasto(value)}
            moneda={1}
          />
        </div>
        <div
          className="nacionalColones_div"
          style={{ marginLeft: "10px", minWidth: "65%" }}
        >
          <RightTable
            rows={[]}
            columns={right_columns}
            moneda={1}
            gasto={gasto}
          />
        </div>
      </Box>
    </Container>
  );
};

export default BancoNacionalColones;
