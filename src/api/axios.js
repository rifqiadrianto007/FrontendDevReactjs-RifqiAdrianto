import axios from "axios"

// base URL mock API
const api = axios.create({
  baseURL: "https://698c251e21a248a273609b21.mockapi.io/restaurants"
})

export default api
