import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import { IonIcon } from '@ionic/react';
import { cubeOutline, personOutline, documentOutline, gitNetworkOutline, albumsOutline, listOutline, 
    pencilOutline, notificationsOutline, cashOutline, cardOutline, bookmarksOutline, prismOutline } from 'ionicons/icons';
import { Link, Outlet } from 'react-router-dom';
import styleTable from '../../../assets/styles/table.module.css';
const Settings = () =>{
    return(
        
        <main id="main">
            <>
            <div className={styleTable.table}>
                <div className={styleTable.row}>
                    <div className={styleTable.cell}>
                    <h4>Компания</h4>
                    <Link to='/settings/general/company'>
                        <button className="button">   
                            <IonIcon slot="start" size="large" color='light' icon={cubeOutline}></IonIcon>
                            <p className="text" >Общее</p>
                        </button>
                    </Link>
                    <Link to='/settings/profile'>
                        <button className="button">   
                            <IonIcon slot="start" size="large" color='light' icon={personOutline}></IonIcon>
                            <p className="text" >Профиль</p>
                        </button>
                    </Link>
                
                    <Link to='/settings/documents'>
                        <button className="button">   
                            <IonIcon slot="start" size="large" color='light' icon={documentOutline}></IonIcon>
                            <p className="text" >Документы</p>
                        </button>
                    </Link>
                    <Link to='/settings/integrations'>
                        <button className="button">   
                            <IonIcon slot="start" size="large" color='light' icon={gitNetworkOutline}></IonIcon>
                            <p className="text" >Интеграции</p>
                        </button>
                    </Link>
                </div>

                <div className={styleTable.cell}>
                    <h4>Заказы</h4>
                    <Link to='/settings/general/orders'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={albumsOutline}></IonIcon>
                                <p className="text" >Общее</p>
                            </button>
                    </Link>
                    <Link to='/settings/statuses'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={listOutline}></IonIcon>
                                <p className="text" >Статусы</p>
                            </button>
                    </Link>
                    <Link to='/settings/services'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={pencilOutline}></IonIcon>
                                <p className="text" >Услуги</p>
                            </button>
                    </Link>
                </div>
            </div>
            <div className={styleTable.row}>
                <div className={styleTable.cell}>
                    <h4>Клиенты</h4>
                    <Link to='/settings/notifications'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={notificationsOutline}></IonIcon>
                                <p className="text" >Уведомления</p>
                            </button>
                    </Link>
                </div>
                <div className={styleTable.cell}>
                    <h4>Платежи</h4>
                    <Link to='/settings/accounts'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={cashOutline}></IonIcon>
                                <p className="text" >Статьи движения денежных средств</p>
                            </button>
                    </Link>
                    <Link to='/settings/paymentMethods'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={cardOutline}></IonIcon>
                                <p className="text" >Методы оплаты</p>
                            </button>
                    </Link>
                </div>
            </div>
            <div className={styleTable.row}>
                <div className={styleTable.cell}>
                    <h4>Формы</h4>
                    <Link to='/settings/orderType'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={prismOutline}></IonIcon>
                                <p className="text" >Типы заказа</p>
                            </button>
                    </Link>
                    <Link to='/settings/clientType'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={prismOutline}></IonIcon>
                                <p className="text" >Типы клиентов</p>
                            </button>
                    </Link>
                    <Link to='/settings/fields/order'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={listOutline}></IonIcon>
                                <p className="text" >Поле: заказы</p>
                            </button>
                    </Link>
                    <Link to='/settings/fields/client'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={listOutline}></IonIcon>
                                <p className="text" >Поле: клиенты</p>
                            </button>
                    </Link>
                    <Link to='/settings/handbooks'>
                            <button className="button">   
                                <IonIcon slot="start" size="large" color='light' icon={bookmarksOutline}></IonIcon>
                                <p className="text" >Справочник</p>
                            </button>
                    </Link>
                    </div>
                </div>
            </div>
            
        <Outlet />
         </> 
        </main>
        
    )
}

export default Settings