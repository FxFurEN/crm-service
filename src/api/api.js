import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3300"
})

export const crmAPI = {
    getAllOrders() {
      return instance.get('/loadOrders');
    },
    addOrder(formData) {
      return instance.post('/addOrder', formData);
    },
   
    getAllClientsData() {
        return instance.get('/loadClientsData');
      },
    addClient(formData) {
        return instance.post('/addClient', formData);
    },
    loadClientTypes() {
        return instance.get('/loadClientTypes');
    },
}