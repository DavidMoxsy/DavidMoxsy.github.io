import Typography from "@mui/material/Typography";

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

let data = [
  {
    id: 1,
    fecha: "25/12/2022",
    transaccion: "Compra de cena navideña",
    monto: -15000.0,
  },
  {
    id: 2,
    fecha: "25/12/2022",
    transaccion: "Compra de cena navideña",
    monto: 15000.0,
  },
  {
    id: 3,
    fecha: "25/12/2022",
    transaccion: "Compra de cena navideña",
    monto: 15000.0,
  },
  {
    id: 4,
    fecha: "25/12/2022",
    transaccion: "Compra de cena navideña",
    monto: 15000.0,
  },
  {
    id: 5,
    fecha: "25/12/2022",
    transaccion: "Compra de cena navideña",
    monto: 15000.0,
  },
];

function createData(id, fecha, transaccion, monto) {
  return { id, fecha, transaccion, monto };
}

const right_rows = [];

for (let i = 0; i < data.length; i++) {
  let saldo = currencyCol(data.at(i).monto);
  right_rows.push(
    createData(
      data.at(i).id,
      data.at(i).fecha,
      data.at(i).transaccion,
      <Greeting col={data.at(i).monto} saldoTotal={saldo} />
    )
  );
}

export default right_rows;
