import '../../../../../assets/styles/global.css';
import '../../../../../assets/styles/main.css';
import '../../../../../assets/styles/ion-style.css';

import { IonItemGroup, IonItem, IonInput, IonButton } from '@ionic/react';

const Profile = () =>{
    return(
        <main id="main">
            <>
                <IonItemGroup>
                    <IonItem >
                        <IonInput 
                            label="ФИО" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>
                    <IonItem >
                        <IonInput 
                            label="Телефн" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>
                    <IonItem >
                        <IonInput 
                            label="Почта" 
                            labelPlacement="stacked" 
                            class="custom"
                        ></IonInput>
                    </IonItem>
                    <IonButton class="custom">Сохранить</IonButton>
                </IonItemGroup>
                <IonItemGroup>
                    <IonItem >
                        <IonInput 
                            label="Новый пароль" 
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

export default Profile