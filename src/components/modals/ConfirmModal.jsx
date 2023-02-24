import Swal from "sweetalert2";

export default async function ModalConfirmar() {
  return Swal.fire({
    title: "Seguro que quiere eliminar?",
    text: "¡No podrá revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí, borrar",
  });
  if (result.isConfirmed) {
    props.accion;
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
  }
}
