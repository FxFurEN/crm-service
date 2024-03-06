import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3001"
})

export const crmAPI = {
    getAllClientsData() {
        return instance.get('/clientsData');
      },
}
