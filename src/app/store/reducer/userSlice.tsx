import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  loading?: boolean;
  error?: string | null;
  success?: string | null;
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  loading: false,
  error: null,
  success: null,
};

// todo: สร้าง async action สำหรับส่งข้อมูลผู้ใช้ไปยัง API
export const submitUser = createAsyncThunk(
  "user/submitUser",
  async (userData: { firstName: string; lastName: string; email: string }) => {
    const response = await axios.post("/api/user", userData);
    return response.data;
  }
);

// todo: สร้าง async action สำหรับดึงข้อมูลผู้ใช้จาก API
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  // Mockup data สำหรับแสดงผลลัพธ์
  const response = await new Promise<{ data: UserState }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
          },
        }),
      1000
    )
  );
  return response.data;
});

// todo: สร้าง slice สำหรับจัดการ state ของผู้ใช้
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFirstName: (state, action: PayloadAction<string>) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // todo: กำหนดสถานะ loading เป็น true เมื่อเริ่มส่งข้อมูล
      .addCase(submitUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // todo: กำหนดสถานะ loading เป็น false เมื่อส่งข้อมูลสำเร็จ
      .addCase(submitUser.fulfilled, (state) => {
        state.loading = false;
        state.success = "User submitted successfully";
      })
      // todo: กำหนดสถานะ loading เป็น false และบันทึก error เมื่อส่งข้อมูลไม่สำเร็จ
      .addCase(submitUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to submit user";
      })
      // todo: กำหนดสถานะ loading เป็น true เมื่อเริ่มดึงข้อมูล
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // todo: กำหนดสถานะ loading เป็น false เมื่อดึงข้อมูลสำเร็จ
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.loading = false;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.email = action.payload.email;
          state.success = "User fetched successfully";
        }
      )
      // todo: กำหนดสถานะ loading เป็น false และบันทึก error เมื่อดึงข้อมูลไม่สำเร็จ
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { setFirstName, setLastName, setEmail } = userSlice.actions;
export default userSlice.reducer;
