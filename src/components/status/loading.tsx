import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface SweetAlertProps {
  loading?: boolean;
  success?: string | null;
  error?: string | null;
}

const SweetAlert: React.FC<SweetAlertProps> = ({ loading, success, error }) => {
  useEffect(() => {
    if (loading) {
      MySwal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          MySwal.showLoading();
        },
      });
    } else {
      MySwal.close();
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      MySwal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error,
        confirmButtonText: "ยืนยัน",
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      MySwal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: success,
        confirmButtonText: "ยืนยัน",
      });
    }
  }, [success]);

  return null;
};

export default SweetAlert;
