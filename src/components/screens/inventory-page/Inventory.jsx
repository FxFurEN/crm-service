import { useState} from 'react';

import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import {filterOutline, cloudUploadOutline, cloudDownloadOutline, add } from 'ionicons/icons';


import "../navbar/navbar.css";
import '../../../assets/styles/global.css';
import style from  './inventory.module.css';

import SearchBox from '../../../components/screens/searchBox/SearchBox';
import AddButton from '../addButton/AddButton';
import NewCategory from './addCategory/NewCategory';

const Inventory = () =>{
    
    const [isNewCategoryModal, setIsNewClientsModalOpen] = useState(false);
    const openNewCategoryModal = () => {
        setIsNewClientsModalOpen(true);
      };
    
      const closeNewCategoryModal = () => {
        setIsNewClientsModalOpen(false);
      };


    return(
        <main id="main">
            <div className={style.table}>
                    <div className={style.row}>
                        <div className={style.column}>
                                <IonItem>
                                    <IonLabel>Все категории</IonLabel>
                                    <IonButton fill="clear" onClick={openNewCategoryModal} id="open-modal">
                                        <IonIcon slot="icon-only" color="white" icon={add} size='large'></IonIcon>
                                    </IonButton> 
                                </IonItem>
                        </div>                                                                                                                                                                                                                                            
                        <div className={style.column}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <SearchBox  />
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
                    </div>
                    <div className={style.row}>
                        <div className={style.column}>
                            <IonItem>
                                <IonLabel>Дерево</IonLabel>
                            </IonItem>
                        </div>
                        <div className={style.column}>
                             <div className={style.table}>
                                <div className={style.tableHead}>
                                    <div className={style.column}>
                                        Артикул
                                    </div>
                                    <div className={style.column}>
                                        Название
                                    </div>
                                    <div className={style.column}>
                                        Количество
                                    </div>
                                    <div className={style.column}>
                                        Цена
                                    </div>
                                    <div className={style.column}>
                                        Себестоимость
                                    </div>
                                </div>
                                <div className={style.row}>
                                    <div className={style.column}>
                                        23231312
                                    </div>
                                    <div className={style.column}>
                                        брусок
                                    </div>
                                    <div className={style.column}>
                                        87
                                    </div>
                                    <div className={style.column}>
                                        1,99
                                    </div>
                                    <div className={style.column}>
                                        1,48
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            <div>

            </div>
            <div>
                <AddButton/>
                <NewCategory isOpen={isNewCategoryModal} onClose={closeNewCategoryModal} />
            </div>
        </main>
    )
}

export default Inventory