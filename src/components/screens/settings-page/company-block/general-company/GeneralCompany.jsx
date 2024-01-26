import '../../../../../assets/styles/global.css';
import '../../../../../assets/styles/main.css';
import '../../../../../assets/styles/ion-style.css';

import { IonItemGroup, IonItem, IonInput, IonButton } from '@ionic/react';

const General = () =>{
    return(
        <main id="main">
            <>
                <IonItemGroup>
                    <IonItem >
                        <IonInput 
                            label="Название компании" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>
                    <IonItem >
                        <IonInput 
                            label="Реквизиты" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>
                    <IonItem >
                        <IonInput 
                            label="Адрес" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>

                    <IonItem >
                        <IonInput 
                            label="Валюта" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>
                    <IonButton class="custom">Сохранить</IonButton>
                </IonItemGroup>
            </>
           
        </main>
    )
}

export default General