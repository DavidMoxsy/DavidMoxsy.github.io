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
    transaccion: "Compra de carro",
    monto: -2150000.0,
  },
];

function createData(id, fecha, transaccion, monto) {
  return { id, fecha, transaccion, monto };
}

const right_rows1 = [];

for (let i = 0; i < data.length; i++) {
  let saldo = currencyCol(data.at(i).monto);
  right_rows1.push(
    createData(
      data.at(i).id,
      data.at(i).fecha,
      data.at(i).transaccion,
      <Greeting col={data.at(i).monto} saldoTotal={saldo} />
    )
  );
}

export default right_rows1;
