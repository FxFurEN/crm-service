import { IonItemGroup, IonItem, IonInput, IonButton, IonItemDivider, IonLabel } from '@ionic/react';

const Profile = () =>{
    return(
        <main id="main">
            <>
                <IonItemGroup>
                    <IonItemDivider сlass="custom ">
                        <IonLabel>Информация</IonLabel>
                    </IonItemDivider>
                    <IonItem class="custom">
                        <IonInput 
                            label="ФИО" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom">
                        <IonInput 
                            label="Телефн" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom">
                        <IonInput 
                            label="Почта" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom">
                        <IonButton class="custom">Сохранить</IonButton>
                    </IonItem>
                    
                </IonItemGroup>
                    <IonItemDivider сlass="custom">
                        <IonLabel>Безопасность</IonLabel>
                    </IonItemDivider>
                <IonItemGroup>
                    <IonItem class="custom" >
                        <IonButton class="custom">Установить новый пароль</IonButton>
                    </IonItem>
                    <IonItem class="custom" >
                        <IonButton class="custom">Завершить все сессии кроме текущей</IonButton>
                    </IonItem>
                   
                </IonItemGroup>
            </>
           
        </main>
    )
}

export default Profile