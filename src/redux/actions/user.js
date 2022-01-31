import Axios from "axios";
import { API_URL } from "../../constans/API";

//karena axios.post merupakan sebuah method yg asych maka di return
export const registerUser = ({ fullName, username, email, password }) => {
  //otomatis men-destruct parameter yang masuk kedalam register user
  return (dispatch) => {
    //dispatch untuk mengirim action objek kepada reducer
    Axios.post(`${API_URL}/users`, {
      fullName,
      username,
      email,
      password,
      role: "user",
    })
      .then((result) => {
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
        alert("Berhasil Mendapatkan User!");
      })
      .catch(() => {
        alert("Gagal Mendaftarkan User!");
      });
  };
};

export const loginUser = ({ username, password }) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
        password,
      },
    })
      .then((result) => {
        if (result.data.length) {
          if (password === result.data[0].password) {
            delete result.data[0].password;
            localStorage.setItem(
              "userDataEmmerce",
              JSON.stringify(result.data[0])
            );
            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            //Handle error wrong password
            dispatch({
              type: "USER_ERROR",
              payload: "Wrong Password!",
            });
          }
        } else {
          //Handle error username not found
          dispatch({
            type: "USER_ERROR",
            payload: "User not found!",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Terjadi Kesalah Server");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users`, {
      params: {
        id: userData.id,
      },
    })
      .then((result) => {
        delete result.data[0].password;
        localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));
        dispatch({
          type: "USER_LOGIN",
          payload: result.data[0],
        });
      })
      .catch(() => {
        alert("Terjadi Kesalahan di server");
      });
  };
};

export const checkStorage = () => {
  return{
    type: "CHECK_STORAGE"
  }
}