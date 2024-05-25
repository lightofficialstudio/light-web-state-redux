import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import {
  setFirstName,
  setLastName,
  setEmail,
  submitUser,
  fetchUser,
} from "@/app/store/reducer/userSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import SweetAlert from "@/components/status/loading";
// validation
import { useFormik } from "formik";
import * as Yup from "yup";

/**
 * กำหนด schema สำหรับการตรวจสอบข้อมูล (Validation) โดยใช้ Yup
 * firstName และ lastName ต้องไม่เป็นค่าว่าง
 * email ต้องมีรูปแบบอีเมลที่ถูกต้อง
 */
const validationSchema = Yup.object({
  firstName: Yup.string().required("กรุณากรอกชื่อ"),
  lastName: Yup.string().required("กรุณากรอกนามสกุล"),
  email: Yup.string().email("รูปแบบอีเมลไม่ถูกต้อง").required("กรุณากรอกอีเมล"),
});

const UserForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  /**
   * ดึงข้อมูล state จาก Redux store
   * รวมถึง firstName, lastName, email, loading, และ error
   */
  const state = useSelector((state: RootState) => state.user);
  const { firstName, lastName, email, loading, error, success } = state;

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้เมื่อ component ถูก mount
    dispatch(fetchUser());
  }, [dispatch]);

  /**
   * ใช้ useFormik สำหรับจัดการฟอร์มและการตรวจสอบข้อมูล
   * initialValues: กำหนดค่าเริ่มต้นของฟอร์ม
   * enableReinitialize: อนุญาตให้ formik รับค่าจาก initialValues ใหม่เมื่อ state เปลี่ยน
   * validationSchema: ใช้ schema ที่กำหนดข้างต้นสำหรับการตรวจสอบข้อมูล
   * onSubmit: ฟังก์ชันที่ทำงานเมื่อฟอร์มถูก submit
   */
  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      // ส่งข้อมูลเมื่อฟอร์มถูก submit
      dispatch(submitUser(values));
    },
  });

  /**
   * ฟังก์ชันสำหรับการเปลี่ยนค่าในฟอร์มและอัพเดท Redux state
   * formik.handleChange: อัพเดทค่าใน formik
   * dispatch(setFirstName/LastName/Email): อัพเดทค่าใน Redux state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const { name, value } = e.target;
    if (name === "firstName") dispatch(setFirstName(value));
    if (name === "lastName") dispatch(setLastName(value));
    if (name === "email") dispatch(setEmail(value));
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      {/* แสดง SweetAlert เมื่อมีการโหลดหรือเกิดข้อผิดพลาด */}
      <SweetAlert loading={loading} error={error} success={success} />

      <Typography variant="h6" component="div" gutterBottom>
        ข้อมูลผู้ใช้
      </Typography>
      {/* ฟิลด์ชื่อ */}
      <TextField
        fullWidth
        margin="normal"
        label="ชื่อ"
        name="firstName"
        value={formik.values.firstName}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
        variant="outlined"
      />
      {/* ฟิลด์นามสกุล */}
      <TextField
        fullWidth
        margin="normal"
        label="นามสกุล"
        name="lastName"
        value={formik.values.lastName}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
        variant="outlined"
      />
      {/* ฟิลด์อีเมล */}
      <TextField
        fullWidth
        margin="normal"
        label="อีเมล"
        name="email"
        value={formik.values.email}
        onChange={handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        variant="outlined"
        type="email"
      />
      {/* ปุ่มส่งข้อมูล */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ mt: 2 }}
      >
        ส่งข้อมูล
      </Button>
    </Box>
  );
};

export default UserForm;
