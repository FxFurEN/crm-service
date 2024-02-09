import { IonItemGroup, IonItem, IonInput, IonButton } from '@ionic/react';

const GeneralOrders = () =>{
    return(
        <main id="main">
            <>
                <IonItemGroup>
                    <IonItem class="custom" >
                        <IonInput 
                            label="Срок по умолчанию, дн." 
                            labelPlacement="stacked" 
                            class="custom-input"
                        ></IonInput>
                    </IonItem>
                    <IonItem class="custom">
                        <IonInput 
                            label="Гарантия по умолчанию, дн." 
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

export default GeneralOrders