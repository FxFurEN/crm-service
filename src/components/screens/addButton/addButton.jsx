import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import style from '../../../assets/styles/addbutton.module.css';
import '@ionic/react/css/core.css';

import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';


const Clients = () =>{
    return(
        <button className={style.Btn}>
            <IonIcon icon={addOutline} size='large' className={style.logoIcon} />
         </button>
    )
}

export default Clients