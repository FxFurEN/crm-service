import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import './report.css';
import { IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';
import { caretForwardOutline } from 'ionicons/icons';

const Report = () =>{
    return(
        <main id="main">
            <div style={{ flex: 1, overflow: 'auto' }}>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Финансы</IonLabel>
                    </IonItemDivider>

                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Прибыль по заказам</IonLabel>
                    </IonItem>
                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Прибыль от продаж</IonLabel>
                    </IonItem >
                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Сводка платежей</IonLabel>
                    </IonItem >
                    <IonItem lines="none" button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Возвраты</IonLabel>
                    </IonItem>
                </IonItemGroup>

                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Товары и услуги</IonLabel>
                    </IonItemDivider>

                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Отчет по товара и услугам</IonLabel>
                    </IonItem>
                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Отчет по товарам</IonLabel>
                    </IonItem>
                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Отчет по услугам</IonLabel>
                    </IonItem>
                    <IonItem lines="none" button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Отчет по услугам по дням</IonLabel>
                    </IonItem>
                </IonItemGroup>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Заказы</IonLabel>
                    </IonItemDivider>

                    <IonItem lines="none" button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Заказы по полю</IonLabel>
                    </IonItem>
                </IonItemGroup>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Склад</IonLabel>
                    </IonItemDivider>

                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>Остатки на складе</IonLabel>
                    </IonItem>
                    <IonItem button detail={true} detailIcon={caretForwardOutline}>
                        <IonLabel>История</IonLabel>
                    </IonItem>
                </IonItemGroup>
            </div>
           
        </main>
    )
}

export default Report