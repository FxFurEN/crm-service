import '../../../../../assets/styles/global.css';
import '../../../../../assets/styles/main.css';
import '../../../../../assets/styles/ion-style.css';
import { IonItem, IonLabel, IonItemGroup } from '@ionic/react';

const Employees = () =>{
    return(
        <main id="main">
            <IonItemGroup>
                <IonItem button>
                    <IonLabel>Вадим</IonLabel>
                    <IonLabel>+375 29 990 58 88</IonLabel>
                    <IonLabel>davay_sdelaem@gmail.ru</IonLabel>
                </IonItem>
            </IonItemGroup>
                
        </main>
    )
}

export default Employees