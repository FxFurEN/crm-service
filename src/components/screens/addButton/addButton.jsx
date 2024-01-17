import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/addbutton.css';
import '@ionic/react/css/core.css';

import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';


const Clients = () =>{
    return(
        <IonFab className='ion-posting-buuton'> 
            <IonFabButton id="open-modal" expand="block">
                <IonIcon icon={addOutline} size='large'/>
            </IonFabButton>
        </IonFab>
    )
}

export default Clients