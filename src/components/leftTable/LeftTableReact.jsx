import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "redaxios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";

const URI = "http://localhost:8000/gastos/";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" className="left_table_head"></TableCell>
        {props.columns?.map((columns) => (
          <TableCell
            key={columns.id}
            align={columns.numeric ? "right" : "left"}
            padding={columns.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === columns.fecha ? order : false}
            className="left_table_head"
          >
            <TableSortLabel
              active={orderBy === columns.fecha}
              direction={orderBy === columns.id ? order : "asc"}
              onClick={createSortHandler(columns.id)}
            >
              {columns.label}
              {orderBy === columns.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
      }}
      className="left_table_toolbar"
    >
      <Tooltip title="Agregar" onClick={props.create}>
        <IconButton style={{ color: "#FDF1DB" }}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Cuentas
      </Typography>
      <Tooltip title="Editar" onClick={props.edit}>
        <IconButton style={{ color: "#FDF1DB" }}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {numSelected > 0 ? (
        <Tooltip title="Eliminar" onClick={props.delete}>
          <IconButton style={{ color: "#FDF1DB" }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div />
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

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

export default function LeftTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [gastos, setGasto] = useState([]);
  const [rowId, setRowId] = useState(0);
  const [gastoSeleccionado, setGastoSeleccionado] = useState([]);
  const [todosGastos, setTodosGastos] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  useEffect(() => {
    obtenerGastos();
    obtenerTodosGastos();
  }, []);

  //procedimineto para mostrar todos los gastos totales
  const obtenerTodosGastos = async () => {
    const res = await axios.get("http://localhost:8000/gastos/");
    setTodosGastos(res.data);
  };

  const setMontoTotal = async () => {
    for (let i = 0; i < gastos.length; i++) {
      let monto = 0;
      const res = await axios.get(
        "http://localhost:8000/transacciones/moneda/" +
          props.moneda +
          "/gasto/" +
          gastos[i].id
      );

      for (let j = 0; j < res.data.length; j++) {
        monto += monto = res.data[j].monto;
      }
      await axios.put(URI + i, {
        idMoneda: 1,
        nombre: gastos[i].nombre,
        saldoTotal: monto,
      });
    }
  };

  //procedimineto para mostrar todos los gastos
  const obtenerGastos = async () => {
    const res = await axios.get(
      "http://localhost:8000/gastos/moneda/" + props.moneda
    );
    setGasto(res.data);
    setMontoTotal();
  };

  //procedimineto para eliminar un gasto
  const borrarGasto = async (id) => {
    await axios.delete(`${URI}${id}`);

    for (let i = 0; i < todosGastos.length; i++) {
      await axios.put(URI + todosGastos[i].id, {
        id: i,
      });
    }

    obtenerGastos();
    obtenerTodosGastos();
  };

  //procedimiento para agregar un gasto
  const agregarGasto = async (nombre) => {
    console.log(todosGastos.length);

    await axios.post(URI, {
      id: todosGastos.length,
      idMoneda: 1,
      nombre: nombre,
      saldoTotal: 0,
    });

    for (let i = 0; i < todosGastos.length; i++) {
      await axios.put(URI + todosGastos[i].id, {
        id: i,
      });
    }

    obtenerGastos();
    obtenerTodosGastos();
  };

  //procedimiento para editar un gasto
  const editarGasto = async (id, nombre) => {
    await axios.put(URI + id, {
      idMoneda: 1,
      nombre: nombre,
      saldoTotal: 0,
    });
    obtenerGastos();
  };

  const modalBorrarGasto = (id) => {
    Swal.fire({
      title: "Seguro que quiere eliminar?",
      text: "¡No podrá revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        borrarGasto(rowId);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const modalCrearGasto = () => {
    const inputValue = "";

    Swal.fire({
      title: "Ingrese el nombre de la cuenta",
      input: "text",
      inputValue: inputValue,
      showCancelButton: true,
      style: { backgroundColor: "red" },
      inputValidator: (value) => {
        if (!value) {
          return "Necesita escribir el nombre de la cuenta!";
        } else {
          agregarGasto(value);
          Swal.fire("La cuenta fue creada correctamente!", "", "success");
        }
      },
    });
  };

  const modalEditarGasto = () => {
    const inputValue = gastoSeleccionado.nombre;

    Swal.fire({
      title: "Ingrese el nuevo nombre de la cuenta",
      input: "text",
      inputValue: inputValue,
      showCancelButton: true,
      style: { backgroundColor: "red" },
      inputValidator: (value) => {
        if (!value) {
          return "Necesita escribir el nuevo nombre de la cuenta!";
        } else {
          editarGasto(gastoSeleccionado.id, value);
          Swal.fire("La cuenta fue editada correctamente!", "", "success");
        }
      },
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = props.rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClicks = (event, id) => {
    const selectedIndex = selected.indexOf(selected);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(id);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Paper className="left_table_paper" onload={obtenerGastos()}>
      <EnhancedTableToolbar
        delete={() => modalBorrarGasto()}
        create={() => modalCrearGasto()}
        edit={() => modalEditarGasto()}
        numSelected={selected.length}
        className="left_table_head"
      />
      <TableContainer className="left_table_container">
        <Table
          className="left_table_table"
          stickyHeader
          aria-label="sticky table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={props.rows.length}
            columns={props.columns}
          />
          <TableBody>
            {stableSort(gastos, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                let saldoTotal = currencyCol(row.saldoTotal);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    className="left_table_row"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => {
                          handleClicks(event, row.id), props.gasto(row.id);
                        }}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        className="left_table_checkbox"
                      />
                    </TableCell>
                    <TableCell
                      onClick={(event) => {
                        props.num(row.id),
                          props.gasto(row.id),
                          handleClicks(event, row.id),
                          setRowId(row.id),
                          setGastoSeleccionado(row);
                      }}
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      className="left_table_body"
                    >
                      {row.nombre}
                    </TableCell>
                    <TableCell
                      align="right"
                      className="left_table_body"
                      onClick={(event) => {
                        props.num(row.id),
                          props.gasto(row.id),
                          handleClicks(event, row.id),
                          setRowId(row.id),
                          setGastoSeleccionado(row);
                      }}
                    >
                      {
                        <Greeting
                          col={row.saldoTotal}
                          saldoTotal={saldoTotal}
                        />
                      }
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage={"Filas por página"}
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={gastos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="left_table_pagination"
      />
    </Paper>
  );
}
