import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/ion-style.css';
import { IonCol, IonGrid, IonIcon, IonLabel, IonRow, IonItem, IonButton} from '@ionic/react';
import { 
    cubeOutline, personOutline, documentOutline, albumsOutline, listOutline, 
    pencilOutline, peopleOutline, bookmarksOutline, prismOutline, caretForwardOutline } from 'ionicons/icons';
import { Link, Outlet } from 'react-router-dom';
const Settings = () =>{
    return(
        
        <main id="main">
            <>
                <IonGrid >
                    <IonRow>
                        <IonCol size="auto">
                            <h4>Компания</h4>
                            <Link to='/settings/general/company'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={cubeOutline}></IonIcon>
                                    <IonLabel>Общее</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/profile'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={personOutline}></IonIcon>
                                    <IonLabel>Профиль</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/documents'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={documentOutline}></IonIcon>
                                    <IonLabel>Документы</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/employees'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={peopleOutline}></IonIcon>
                                    <IonLabel>Сотрудники</IonLabel>
                                </IonItem>
                            </Link>
                        </IonCol>
                        <IonCol size="auto"> 
                            <h4>Заказы</h4>
                            <Link to='/settings/general/orders'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={albumsOutline}></IonIcon>
                                    <IonLabel>Общее</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/statuses'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={listOutline}></IonIcon>
                                    <IonLabel>Статусы</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/services'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={pencilOutline}></IonIcon>
                                    <IonLabel>Услуги</IonLabel>
                                </IonItem>
                            </Link>
                        </IonCol>
                        <IonCol size="auto">
                            <h4>Формы</h4>
                            <Link to='/settings/orderType'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={prismOutline}></IonIcon>
                                    <IonLabel>Типы заказа</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/clientType'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={prismOutline}></IonIcon>
                                    <IonLabel>Типы клиентов</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/fields/order'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={listOutline}></IonIcon>
                                    <IonLabel>Поле: заказы</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/fields/client'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={listOutline}></IonIcon>
                                    <IonLabel>Поле: клиенты</IonLabel>
                                </IonItem>
                            </Link>
                            <Link to='/settings/handbooks'>
                                <IonItem button>
                                    <IonIcon slot="start" size="large" color='light' icon={bookmarksOutline}></IonIcon>
                                    <IonLabel>Справочник</IonLabel>
                                </IonItem>
                            </Link>
                        </IonCol>
                        <IonCol>
                            
                        </IonCol>
                    </IonRow>
                </IonGrid>        
        <Outlet />
         </> 
        </main>
        
    )
}

export default Settings