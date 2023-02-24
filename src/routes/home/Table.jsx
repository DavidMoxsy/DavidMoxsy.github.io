import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "fecha", label: "Fecha", minWidth: 140 },
  { id: "transaccion", label: "Transacción", minWidth: 170 },
  { id: "cuenta", label: "Cuenta", minWidth: 142 },
  {
    id: "gasto",
    label: "Gasto",
    minWidth: 170,
    align: "right",

    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(fecha, transaccion, cuenta, gasto) {
  return { fecha, transaccion, cuenta, gasto };
}

const rows = [
  createData("27/02/2022", "Compra de Ropa", "Banco Nacional", "100.253,00"),
  createData(
    "27/02/2022",
    "Compra de Patillas",
    "Banco Nacional",
    "100.253,00"
  ),
  createData(
    "27/02/2022",
    "Pago de los créditos de la universidad",
    "Banco Nacional",
    "100.253,00"
  ),
  createData("27/02/2022", "Pago de agua", "Banco Nacional", "100.253,00"),
  createData("27/02/2022", "Pago de luz", "Banco Popular", "100.253,00"),
  createData("27/02/2022", "Pago de teléfono", "Banco Promerica", "100.253,00"),
  createData("27/02/2022", "Deposito Roberth", "Banco Popular", "100.253,00"),
  createData("27/02/2022", "Pago de gas", "Banco Nacional", "100.253,00"),
  createData("27/02/2022", "Compra de útiles", "Banco Nacional", "100.253,00"),
  createData(
    "27/02/2022",
    "Compra de comedera",
    "Banco Promerica",
    "100.253,00"
  ),
  createData("27/02/2022", "Regalo", "Banco Nacional", "100.253,00"),
  createData("27/02/2022", "Compra de Ropa", "Banco Nacional", "100.253,00"),
  createData("27/02/2022", "Compra de Ropa", "Banco Nacional", "100.253,00"),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{ width: "100%", borderRadius: "8px", backgroundColor: "#454A72" }}
    >
      <TableContainer
        sx={{ height: 500, borderRadius: "28px", backgroundColor: "#454A72" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={4}
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  backgroundColor: "#454A72",
                  color: "#FDF1DB",
                }}
              >
                Últimos Movimientos Realizados
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    backgroundColor: "#454A72",
                    color: "#FDF1DB",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            color: "#FDF1DB",
                            backgroundColor: "#454A72",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ color: "#FDF1DB" }}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
