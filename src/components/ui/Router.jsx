import App from '../../App.jsx'
import Clients from '../screens/clients-page/Clients.jsx'
import Home from '../screens/home/Home.jsx'
import Navbar from '../screens/navbar/Navbar.jsx'
import Settings from '../screens/settings-page/Settings.jsx'
import Inventory from '../screens/inventory-page/Inventory.jsx'
import Report from '../screens/report-page/Report.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Orders from '../screens/orders-page/Orders.jsx'
import Profile from '../screens/settings-page/profile/Profile.jsx'
import GeneralCompany from '../screens/settings-page/general-company/GeneralCompany.jsx'
import Documents from '../screens/settings-page/documents/Documents.jsx'
import Integrations from '../screens/settings-page/integrations/Integrations.jsx'
import GeneralOrders from '../screens/settings-page/general-orders/GeneralOrders.jsx'

const Router = () => {

    return (
         <BrowserRouter>
         <Routes>
           <Route path="/" element={<Navbar />} >
               <Route path="/home" element={<Home />} />
               <Route path="/clients" element={<Clients />} />
               <Route path="/report" element={<Report />} />
               <Route path="/orders" element={<Orders />} />
               <Route path="/inventory" element={<Inventory />} />
               <Route path="/settings" element={<Settings />} />

               <Route path="/settings/general/company" element={<GeneralCompany />} />
               <Route path="/settings/profile" element={<Profile />} />
               <Route path="/settings/documents" element={<Documents />} />
               <Route path="/settings/integrations" element={<Integrations/>} />
               <Route path="/settings/general/orders" element={<GeneralOrders />} />
               <Route path="*" element={<App/>} />
             </Route>
         </Routes>
       </BrowserRouter>
    )
}

export default Router

