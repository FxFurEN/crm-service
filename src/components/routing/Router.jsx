import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@store/store.js'; 

import Navbar from '@components/layout/navbar/Navbar.jsx';
import Home from '@pages/Home/Home.jsx';
import Clients from '@pages/Clients/Clients.jsx';
import Report from '@pages/Report/Report.jsx';
import Orders from '@pages/Orders/Orders.jsx';
import Inventory from '@pages/Inventory/Inventory.jsx';
import Shop from '@pages/Shop/Shop.jsx';
import Settings from '@pages/Settings/Settings.jsx';
import Profile from '@pages/Settings/company-block/profile/Profile.jsx';
import Modules from '@pages/Settings/company-block/modules/Modules.jsx';
import Documents from '@pages/Settings/company-block/documents/Documents.jsx';
import StatementOfWork from '@pages/Settings/company-block/documents/statementOfWork/StatementOfWork.jsx';
import Employees from '@pages/Settings/company-block/employees/Employees.jsx';
import GeneralOrders from '@pages/Settings/orders-block/general-orders/GeneralOrders.jsx';
import GeneralCompany from '@pages/Settings/company-block/general-company/GeneralCompany.jsx'
import Statuses from '@pages/Settings/orders-block/statuses/Statuses.jsx';
import Services from '@pages/Settings/orders-block/services/Services.jsx';
import FieldOrders from '@pages/Settings/forms-block/field-orders/FieldOrders.jsx';
import FieldClients from '@pages/Settings/forms-block/field-clients/FieldClients.jsx';
import TypeOrders from '@pages/Settings/forms-block/type-orders/TypeOrders.jsx';
import TypeClients from '@pages/Settings/forms-block/type-clients/TypeClients.jsx';
import Handbooks from '@pages/Settings/forms-block/handbooks/Handbooks.jsx';
import FieldsHandBooks from '@pages/Settings/forms-block/handbooks/fieldsHandBook/FieldsHandBook.jsx';
import Notification from '@pages/Settings/notification-block/Notification.jsx';
import NonPage from '@pages/NonPage';




const Router = () => {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Navbar/>} >
                    <Route path="/home" element={<Home />} />
                    <Route path="/clients" element={<Clients />} />
                    <Route path="/report" element={<Report />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/settings" element={<Settings />} />


                    <Route path="/settings/general/company" element={<GeneralCompany />} />
                    <Route path="/settings/profile" element={<Profile />} />
                    <Route path="/settings/modules" element={<Modules />} />
                    <Route path="/settings/documents" element={<Documents />} />
                    <Route path="/settings/documents/statementOfWork" element={<StatementOfWork/>} />
                    <Route path="/settings/employees" element={<Employees/>} />
                    <Route path="/settings/general/orders" element={<GeneralOrders />} />
                    <Route path="/settings/statuses" element={<Statuses />} />
                    <Route path='/settings/services' element={<Services />} />
                    <Route path='/settings/fields/order' element={<FieldOrders />} />
                    <Route path='/settings/fields/client' element={<FieldClients />} />
                    <Route path='/settings/orderType' element={<TypeOrders />} />
                    <Route path='/settings/clientType' element={<TypeClients />} />
                    <Route path='/settings/handbooks' element={<Handbooks />} />
                    <Route path='/settings/handbooks/:id' element={<FieldsHandBooks />} />
                    <Route path="/settings/notifications" element={<Notification/>} />

                    <Route path="*" element={<NonPage />} />
                    <Route path="" element={<Navigate to={'/home'} />}/>
                  </Route>
              </Routes>
            </BrowserRouter>
        </PersistGate>
          
      </Provider>
      
         
    )
}

export default Router

