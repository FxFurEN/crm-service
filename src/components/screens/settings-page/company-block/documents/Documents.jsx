import '../../../../../assets/styles/global.css';
import '../../../../../assets/styles/main.css';
import { IonItem, IonLabel, IonItemGroup, IonItemDivider } from '@ionic/react';
import { caretForwardOutline } from 'ionicons/icons';

const Documents = () =>{
    return(
        <main id="main">
            <IonItemGroup>
                <IonItemDivider>
                        <IonLabel>Заказы</IonLabel>
                </IonItemDivider>
                <IonItem button detail={true} detailIcon={caretForwardOutline}>
                    <IonLabel>Акт выполненных работ</IonLabel>
                </IonItem>
                <IonItem button detail={true} detailIcon={caretForwardOutline}>
                    <IonLabel>Гарантийная квитация</IonLabel>
                </IonItem>
                <IonItem button detail={true} detailIcon={caretForwardOutline}>
                    <IonLabel>Приемная квитация</IonLabel>
                </IonItem>
            </IonItemGroup>
            <IonItemGroup>
                <IonItemDivider>
                        <IonLabel>Магазин</IonLabel>
                </IonItemDivider>
                <IonItem button detail={true} detailIcon={caretForwardOutline}>
                    <IonLabel>Товарный чек</IonLabel>
                </IonItem>
            </IonItemGroup>
            <IonItemGroup>
                <IonItemDivider>
                        <IonLabel>Склад</IonLabel>
                </IonItemDivider>
                <IonItem button detail={true} detailIcon={caretForwardOutline}>
                    <IonLabel>QR-код</IonLabel>
                </IonItem>
            </IonItemGroup>
        </main>
    )
}

export default Documents