import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3300"
})

export const crmAPI = {
    getAllOrders() {
      return instance.get('/crm/loadOrders');
    },
    addOrder(formData) {
      return instance.post('/crm/addOrder', formData);
    },
   
    getAllClientsData() {
        return instance.get('/crm/loadClientsData');
      },
    addClient(formData) {
        return instance.post('/crm/addClient', formData);
    },
    loadClientTypes() {
        return instance.get('/crm/loadClientTypes');
    },
    loadCategories() {
        return instance.get('/crm/loadCategories');
    },
    addCategory(formData) {
        return instance.post('/crm/addCategory', formData);
    },
    loadGoods() {
        return instance.get('/crm/loadGoods');
    },
    addGoods(formData) {
        return instance.post('/crm/addGoods', formData);
    },
}
