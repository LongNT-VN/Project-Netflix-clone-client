import {axiosInstance } from  '../../config.js';
import { updateUserStart, updateUserSuccess, updateUserFailure} from "./UserAction"
//update User
export const updateUser = async (user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await axiosInstance.put("/user/update/" + user._id, user, { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken } });
    dispatch(updateUserSuccess(res.data));
    console.log(res.data)
  } catch (err) {
    dispatch(updateUserFailure());
  }
};


