import App from '../../App.jsx'
import Clients from '../screens/clients-page/Clients.jsx'
import Home from '../screens/home/Home.jsx'
import Navbar from '../screens/navbar/Navbar.jsx'
import Settings from '../screens/settings-page/Settings.jsx'
import Inventory from '../screens/inventory-page/Inventory.jsx'
import Report from '../screens/report-page/Report.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Orders from '../screens/orders-page/Orders.jsx'

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
               <Route element={<App/>} path="*"/>
             </Route>
         </Routes>
       </BrowserRouter>
    )
}

export default Router

