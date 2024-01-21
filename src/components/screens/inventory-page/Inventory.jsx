import { IonButton, IonIcon,  } from '@ionic/react';
import {filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';

import "../navbar/navbar.css";
import '../../../assets/styles/global.css';

import SearchBox from '../../../components/screens/searchBox/SearchBox';
import AddButton from '../addButton/AddButton';

const Inventory = () =>{
    return(
        <main id="main">
            <div>
                <div>a
                </div>
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
            <div>

            </div>
            <div>
                <AddButton />
            </div>
        </main>
    )
}

export default Inventory