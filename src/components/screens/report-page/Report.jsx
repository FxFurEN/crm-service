import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import './report.css';
import { IonItem, IonItemDivider, IonItemGroup, IonLabel } from '@ionic/react';

const Report = () =>{
    return(
        <main id="main">
            <div style={{ flex: 1, overflow: 'auto' }}>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Финансы</IonLabel>
                    </IonItemDivider>

                    <IonItem>
                        <IonLabel>Прибыль по заказам</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Прибыль от продаж</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Сводка платежей</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>Возвраты</IonLabel>
                    </IonItem>
                </IonItemGroup>

                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Товары и услуги</IonLabel>
                    </IonItemDivider>

                    <IonItem>
                        <IonLabel>Отчет по товара и услугам</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Отчет по товарам</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Отчет по услугам</IonLabel>
                    </IonItem>
                    <IonItem lines="none">
                        <IonLabel>Отчет по услугам по дням</IonLabel>
                    </IonItem>
                </IonItemGroup>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Заказы</IonLabel>
                    </IonItemDivider>

                    <IonItem lines="none">
                        <IonLabel>Заказы по полю</IonLabel>
                    </IonItem>
                </IonItemGroup>
                <IonItemGroup>
                    <IonItemDivider>
                        <IonLabel>Склад</IonLabel>
                    </IonItemDivider>

                    <IonItem>
                        <IonLabel>Остатки на складе</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>История</IonLabel>
                    </IonItem>
                </IonItemGroup>
            </div>
           
        </main>
    )
}

export default Report