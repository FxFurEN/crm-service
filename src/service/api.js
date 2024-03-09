import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:3001"
})

export const crmAPI = {
    getAllClientsData() {
        return instance.get('/crm/clientsData');
    },
      createClient(clientData) {
        return instance.post('/crm/createClient', clientData);
    },
    getAllServices() {
        return instance.get('/crm/services');
    },
    getAllCategories() {
        return instance.get('/crm/getCategories');
    },
    createCategory(categoryData) {
        return instance.post('/crm/createCategory', categoryData);
    },
    
    createService(serviceData) {
        return instance.post('/crm/createService', serviceData);
    },
}
