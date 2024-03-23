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
    getAllEmployees() {
        return instance.get('/crm/employees');
    },
    createEmployee(employeeData) {
        return instance.post('/crm/createEmployee', employeeData);
    },
    deleteEmployee(id) {
        return instance.delete(`/crm/employees/${id}`);
    },
    getAllStages() {
        return instance.get('/crm/stages');
    },
    createStage(stageData) {
        return instance.post('/crm/stages', stageData);
    },
    updateStage(stageId, stageData) {
        return instance.put(`/crm/stages/${stageId}`, stageData);
    },
    getOrders() {
        return instance.get('/crm/orders');
    },
    
    createOrder(orderData) {
        return instance.post('/crm/orders', orderData);
    },
    getOrdersByClient(clientId) {
        return instance.get(`/crm/client/${clientId}/orders`);
    },
    deleteClient(clientId) {
        return instance.delete(`/crm/deleteClient/${clientId}`);
    },
    updateClient(clientId, clientData) {
        return instance.put(`/crm/updateClient/${clientId}`, clientData);
    },
    deletePosition(positionId) {
        return instance.delete(`/crm/positions/${positionId}`);
    },
    updateEmployee(id, employeeData) {
        return instance.put(`/crm/updateEmployee/${id}`, employeeData);
    },     
    updateCategory(categoryId, categoryData) {
        return instance.put(`/crm/updateCategory/${categoryId}`, categoryData);
    },
    deleteCategory(categoryId) {
        return instance.delete(`/crm/deleteCategory/${categoryId}`);
    },
    updateService(serviceId, serviceData) {
        return instance.put(`/crm/updateService/${serviceId}`, serviceData);
    },
    deleteService(serviceId) {
        return instance.delete(`/crm/deleteService/${serviceId}`);
    },
    getOrdersByCategory(){
        return instance.get('/crm/ordersByCategory');
    },
    getCompletedOrdersByEmployee(){
        return instance.get('/crm/completedOrdersByEmployee');
    },
    getClientsWithMostOrders(){
        return instance.get('/crm/clientsWithMostOrders');
    },
}
