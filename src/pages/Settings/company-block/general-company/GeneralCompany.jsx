import { IonItemGroup, IonItem, IonInput, IonButton } from '@ionic/react';

const General = () =>{
    return(
        <main id="main">
            <>
                <IonItemGroup>
                    <IonItem class="custom" >
                        <IonInput 
                            label="Название компании" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom">
                        <IonInput 
                            label="Реквизиты" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom">
                        <IonInput 
                            label="Адрес" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>

                    <IonItem class="custom" >
                        <IonInput 
                            label="Валюта" 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom" >
                        <IonButton class="custom">Сохранить</IonButton>
                    </IonItem>
                    
                </IonItemGroup>
            </>
           
        </main>
    )
}

export default General