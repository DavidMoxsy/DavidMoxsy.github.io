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
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "redaxios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import $ from "jquery";

const URI = "http://localhost:8000/transacciones/";

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

function alignTableHead(numeric, center) {
  if (!numeric && !center) {
    return "left";
  } else if (numeric && !center) {
    return "right";
  } else if (!numeric && center) {
    return "center";
  }
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
        <TableCell padding="checkbox" className="right_table_head">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
            className="right_table_checkbox"
          />
        </TableCell>
        {props.columns?.map((columns) => (
          <TableCell
            key={columns.id}
            align={alignTableHead(columns.numeric, columns.center)}
            padding={columns.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === columns.fecha ? order : false}
            className="right_table_head"
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
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && { backgroundColor: "#363e8d" }),
      }}
      className="right_table_toolbar"
    >
      <Tooltip title="Agregar" onClick={props.create}>
        <IconButton style={{ color: "#FDF1DB" }}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Seleccionado
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Transacciones
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Eliminar" onClick={props.delete}>
          <IconButton style={{ color: "#FDF1DB" }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Lista de Filtros">
          <IconButton
            style={{ color: "#FDF1DB" }}
            className="right_table_IconButton"
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
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

export default function RightTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [transacciones, setTransaccion] = useState([]);
  const [rowId, setRowId] = useState(0);
  const [transaccionSeleccionada, setTransaccionesSeleccionada] = useState([]);
  const [todasTransacciones, setTodasTransacciones] = useState([]);

  useEffect(() => {
    obtenerTransacciones();
    obtenerTodasTransacciones();
  }, []);

  //procedimineto para mostrar todos los Transacciones totales
  const obtenerTodasTransacciones = async () => {
    const res = await axios.get("http://localhost:8000/transacciones/");
    setTodasTransacciones(res.data);
  };

  //procedimineto para mostrar todos los Transacciones
  const obtenerTransacciones = async () => {
    const res = await axios.get(
      "http://localhost:8000/transacciones/moneda/" +
        props.moneda +
        "/gasto/" +
        props.gasto
    );

    setTransaccion(res.data);
  };

  //procedimineto para eliminar un Transaccion
  const borrarTransaccion = async () => {
    for (let i = 0; i < selected.length; i++) {
      console.log();
      await axios.delete(`${URI}${selected.at(i)}`);
    }
    for (let i = 0; i < todasTransacciones.length; i++) {
      await axios.put(URI + todasTransacciones[i].id, {
        id: i,
        idMoneda: 1,
        nombre: todasTransacciones[i].nombre,
        saldoTotal: todasTransacciones[i].saldoTotal,
      });
    }

    setSelected([]);
    obtenerTransacciones();
    obtenerTodasTransacciones();
  };

  //procedimiento para agregar un Transaccion
  const agregarTransaccion = async (fecha, transaccion, monto) => {
    await axios.post(URI, {
      id: todasTransacciones.length,
      idMoneda: 1,
      idGasto: props.gasto,
      fecha: fecha,
      transaccion: transaccion,
      monto: monto,
    });

    for (let i = 0; i < todasTransacciones.length; i++) {
      await axios.put(URI + todasTransacciones[i].id, {
        id: i,
        idMoneda: 1,
        idGasto: todasTransacciones[i].gasto,
        fecha: todasTransacciones[i].fecha,
        transaccion: todasTransacciones[i].transaccion,
        monto: todasTransacciones[i].monto,
      });
    }

    obtenerTransacciones();
    obtenerTodasTransacciones();
  };

  //procedimiento para editar un Transaccion
  const editarTransaccion = async (id, nombre) => {
    await axios.put(URI + id, {
      idMoneda: 1,
      nombre: nombre,
      saldoTotal: 0,
    });
    obtenerTransacciones();
  };

  const modalBorrarTransaccion = () => {
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
        borrarTransaccion(rowId);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const modalCrearTransaccion = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = "";
    if (month < 10) {
      currentDate = `${year}-0${month}-${day}`;
    } else {
      currentDate = `${year}-${month}-${day}`;
    }
    `${year}-${month}-${day}`;
    console.log(currentDate); // "17-6-2022"

    Swal.fire({
      title: "Ingrese una nueva transacción",
      html:
        '<label for="swal-input1">Fecha</label><br>' +
        '<input type="date" value="' +
        currentDate +
        '". id="swal-input1" class="swal2-input" style="width: 70%">' +
        "<br /><br />" +
        '<label for="swal-input2">Motivo de la transacción</label><br>' +
        '<textarea id="swal-input2" class="swal2-input" style="width: 70%; height: 100px; padding: 10px"></textarea>' +
        "<br /><br />" +
        '<label for="swal-input3">Monto de la transacción</label><br>' +
        '<input type="number" id="swal-input3" class="swal2-input" style="width: 70%">',
      preConfirm: function () {
        return new Promise(function (resolve) {
          resolve([
            $("#swal-input1").val(),
            $("#swal-input2").val(),
            $("#swal-input3").val(),
          ]);
        });
      },
      onOpen: function () {
        $("#swal-input1").focus();
      },
    }).then(function (result) {
      agregarTransaccion(
        result.value.at(0),
        result.value.at(1),
        result.value.at(2)
      );
      Swal.fire("La transaccion fue creada correctamente!", "", "success");
    });
  };

  const modalEditarTransaccion = () => {
    const inputValue = transaccionSeleccionada.nombre;

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
          editarTransaccion(transaccionSeleccionada.id, value);
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
      const newSelected = transacciones.map((n) => n.id);

      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    let numSelected = 0;

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      numSelected = newSelected.length;
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      numSelected = newSelected.length;
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      numSelected = newSelected.length;
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      numSelected = newSelected.length;
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  return (
    <Paper className="right_table_paper" onload={obtenerTransacciones()}>
      <EnhancedTableToolbar
        delete={() => modalBorrarTransaccion()}
        create={() => modalCrearTransaccion()}
        edit={() => modalEditarTransaccion()}
        numSelected={selected.length}
        className="right_table_head"
      />
      <TableContainer className="right_table_container">
        <Table
          className="right_table_table"
          stickyHeader
          aria-label="sticky table"
        >
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={transacciones.length}
            columns={props.columns}
          />
          <TableBody>
            {stableSort(transacciones, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;
                let saldoTotal = currencyCol(row.monto);
                const fecha = new Date(row.fecha);
                fecha.setMinutes(
                  fecha.getMinutes() + fecha.getTimezoneOffset()
                );

                return (
                  <TableRow
                    hover
                    onClick={(event) => {
                      handleClick(event, row.id);
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    className="right_table_row"
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                        className="right_table_checkbox"
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      className="right_table_body"
                    >
                      {fecha.toLocaleDateString("es-Es")}
                    </TableCell>
                    <TableCell align="center" className="right_table_body">
                      {row.transaccion}
                    </TableCell>
                    <TableCell align="right" className="right_table_body">
                      <Greeting col={row.monto} saldoTotal={saldoTotal} />
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
        count={transacciones.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="right_table_pagination"
      />
    </Paper>
  );
}
