import Swal from 'sweetalert2';
export function AlertSuccess(value = "Thêm Thành Công", timer = 2000 ) {
    return (
        Swal.fire({
            icon: "success",
            title: value,
            showConfirmButton: false,
            timer: timer,
          })
    )
  }

export function Alerterror(value, timer = 2000){
  return (
    Swal.fire({
            icon: "error",
            title: value,
            showConfirmButton: false,
            timer: timer
          })
  )
}


export async function AlertAgree(value,action,title) {
  // Showing a confirmation alert using SweetAlert2
  const result = await Swal.fire({
    title: title,
    text: value,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#30C2EC",
    cancelButtonColor: "#30C2EC",
    confirmButtonText: action,
    cancelButtonText: "Hủy YC"
  });

  // If the user confirms the action
  return result
}
