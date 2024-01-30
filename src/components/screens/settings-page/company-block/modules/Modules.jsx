import { IonButton, IonItem, IonItemGroup, IonToggle } from "@ionic/react"

const Modules = () =>{
    return(
        <main id="main">
            <IonItemGroup>
                <IonItem>
                    <IonToggle checked={true}>Склад</IonToggle>
                </IonItem>
                <IonItem>
                    <IonToggle checked={true}>Магазин</IonToggle>
                </IonItem>
                <IonItem>
                    <IonButton class="custom">Сохранить</IonButton>
                </IonItem>
            </IonItemGroup>
        </main>
     )
}
export default Modules