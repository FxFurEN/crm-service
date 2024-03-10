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
    getAllPositions() {
        return instance.get('/crm/positions');
    },
      createPosition(positionData) {
        return instance.post('/crm/createPosition', positionData);
    },
      updatePosition(positionId, positionData) {
        return instance.put(`/crm/positions/${positionId}`, positionData);
    },
}
