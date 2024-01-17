import { setupIonicReact, IonApp} from '@ionic/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';



import App from '../../App.jsx'
import Clients from '../screens/clients-page/Clients.jsx'
import Home from '../screens/home/Home.jsx'
import Navbar from '../screens/navbar/Navbar.jsx'
import Settings from '../screens/settings-page/Settings.jsx'
import Inventory from '../screens/inventory-page/Inventory.jsx'
import Report from '../screens/report-page/Report.jsx'

import Orders from '../screens/orders-page/Orders.jsx'
import Profile from '../screens/settings-page/company-block/profile/Profile.jsx'
import GeneralCompany from '../screens/settings-page/company-block/general-company/GeneralCompany.jsx'
import Documents from '../screens/settings-page/company-block/documents/Documents.jsx'
import Integrations from '../screens/settings-page/company-block/integrations/Integrations.jsx'
import GeneralOrders from '../screens/settings-page/orders-block/general-orders/GeneralOrders.jsx'
import Statuses from '../screens/settings-page/orders-block/statuses/Statuses.jsx'
import Services from '../screens/settings-page/orders-block/services/Services.jsx'
import Notifications from '../screens/settings-page/clients-block/notifications/Notifications.jsx'
import Accounts from '../screens/settings-page/payments-block/accounts/Accounts.jsx'
import PaymentMethods from '../screens/settings-page/payments-block/payment-methods/PaymentMethods.jsx'
import FieldOrders from '../screens/settings-page/forms-block/field-orders/FieldOrders.jsx'
import TypeOrders from '../screens/settings-page/forms-block/type-orders/TypeOrders.jsx'
import FieldClients from '../screens/settings-page/forms-block/field-clients/FieldClients.jsx'
import TypeClients from '../screens/settings-page/forms-block/type-clients/TypeClients.jsx'
import Handbooks from '../screens/settings-page/forms-block/handbooks/Handbooks.jsx'
import NewClients from '../screens/addClients/NewClients.jsx';


setupIonicReact({ mode: 'md' });  
const Router = () => {

    return (
      <IonApp>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />} >
                <Route path="/home" element={<Home />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/report" element={<Report />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/clients/new" element={<NewClients />} />

                <Route path="/settings/general/company" element={<GeneralCompany />} />
                <Route path="/settings/profile" element={<Profile />} />
                <Route path="/settings/documents" element={<Documents />} />
                <Route path="/settings/integrations" element={<Integrations/>} />
                <Route path="/settings/general/orders" element={<GeneralOrders />} />
                <Route path="/settings/statuses" element={<Statuses />} />
                <Route path='/settings/services' element={<Services />} />
                <Route path='/settings/notifications' element={<Notifications />} />
                <Route path='/settings/accounts' element={<Accounts />} />
                <Route path='/settings/paymentMethods' element={<PaymentMethods />} />
                <Route path='/settings/fields/order' element={<FieldOrders />} />
                <Route path='/settings/fields/client' element={<FieldClients />} />
                <Route path='/settings/orderType' element={<TypeOrders />} />
                <Route path='/settings/clientType' element={<TypeClients />} />
                <Route path='/settings/handbooks' element={<Handbooks />} />

                <Route path="*" element={<App/>} />
              </Route>
          </Routes>
        </BrowserRouter>
      </IonApp>
         
    )
}

export default Router

