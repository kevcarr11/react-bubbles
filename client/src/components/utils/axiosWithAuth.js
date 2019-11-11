import axios from "axios"

export function getToken() {
  return localStorage.getItem("token")
}

function AuthWithAxios() {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      Authorization: getToken(),
    }
  })
}

export default AuthWithAxios
