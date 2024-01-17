import { IonButton, IonIcon,  } from '@ionic/react';
import {filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';

import '../../../assets/styles/main.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/global.css';
import '../../../assets/styles/addbutton.css';
import '../../../assets/styles/button-ion.css';

import AddButton from '../addButton/AddButton';
import SearchBox from '../searchBox/SearchBox';



const Orders = () =>{
    return(
        <main id="main">
            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <SearchBox/>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" color="white" icon={filterOutline}></IonIcon>
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" icon={cloudUploadOutline}></IonIcon>
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" icon={cloudDownloadOutline}></IonIcon>
                    </IonButton>
                </div>    
            </div>
            <div>
                <div className={style.wrapper}>
                    <div className={style.table} style={{ boxShadow: '0 10px 13px 2px rgba(0, 0, 0, 0.2)' }}>
                        
                        <div className={style.row + ' ' + style.header}>
                            <div className={style.cell}>
                                Заказ
                            </div>
                            <div className={style.cell}>
                                Обновлен
                            </div>
                            <div className={style.cell}>
                                Статус
                            </div>
                            <div className={style.cell}>
                                Срок
                            </div>
                            <div className={style.cell}>
                                Клиент
                            </div>
                            <div className={style.cell}>
                                Исполнитель
                            </div>
                            <div className={style.cell}>
                                Наименование услуги
                            </div>
                            
                        </div>
                        
                        <div className={style.row}>
                            <div className={style.cell} data-title="Номер">
                                1
                            </div>
                            <div className={style.cell} data-title="Обновлен">
                                07.01
                            </div>
                            <div className={style.cell} data-title="Статус">
                                В работе
                            </div>
                            <div className={style.cell} data-title="Срок">
                                3 дн
                            </div>
                            <div className={style.cell} data-title="Клиент">
                                Рома Аегис Хиро
                            </div>
                            <div className={style.cell} data-title="Исполнитель">
                                Тикита Нимошенко
                            </div>
                            <div className={style.cell} data-title="Наименование услуги">
                                Ремонт ноутбука
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div>
                <AddButton/>
            </div>
                
        </main>
    )
}

export default Orders