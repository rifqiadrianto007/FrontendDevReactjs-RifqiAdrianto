import axios from "axios"

const api = axios.create({
  baseURL: "https://698c251e21a248a273609b21.mockapi.io/restaurants"
})

export default api
