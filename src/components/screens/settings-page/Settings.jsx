import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import './settings.css'
import { IonIcon } from '@ionic/react';
import { star } from 'ionicons/icons';

const Settings = () =>{
    return(
        <main id="main">
            <h2>Настройки</h2>
            <div>
                <h4>Компания</h4>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
                <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
                </button>
            </div>

            <div>
            <h4>Заказы</h4>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            </div>

            <div>
            <h4>Клиенты</h4>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            </div>

            <div>
            <h4>Платежи</h4>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            </div>

            <div>
            <h4>Формы</h4>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            <button className="button">   
                    <IonIcon slot="start" size="large" color='light' icon={star}></IonIcon>
                    <p className="text">Left Icon</p>
            </button>
            </div>
            
        </main>
    )
}

export default Settings