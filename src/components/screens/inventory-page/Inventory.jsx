import { IonButton, IonIcon } from '@ionic/react';
import {filterOutline, cloudUploadOutline, cloudDownloadOutline, add } from 'ionicons/icons';


import "../navbar/navbar.css";
import '../../../assets/styles/global.css';
import style from  '../../../assets/styles/table.module.css';

import SearchBox from '../../../components/screens/searchBox/SearchBox';
import AddButton from '../addButton/AddButton';

const Inventory = () =>{
    return(
        <main id="main">
            <div className={style.table}>
                    <div className={style.row}>
                        <div className={style.column}>
                            <div className={style.row}>
                                <div className={style.column} style={{width: "100%"}}>
                                    <p>Все категории</p>
                                </div>
                                <div className={style.column}>
                                    <IonButton fill="clear">
                                        <IonIcon slot="icon-only" color="white" icon={add}></IonIcon>
                                    </IonButton> 
                                </div>
                            </div>
                            
                                                                                                                                                                                                                                                           
                        </div>
                        <div className={style.column} style={{width: "80%"}}>
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
                </div>
            <div>

            </div>
            <div>
                <AddButton />
            </div>
        </main>
    )
}

export default Inventory