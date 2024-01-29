import SearchBox from '../../../searchBox/SearchBox';
import { IonItem, IonItemGroup, IonLabel, IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';


const Handbooks = () =>{
    const data = [
        { name: '1'  },
        { name: '2'}
      ];

    return(
        <main id="main">
            <div>
                <SearchBox />
            </div>
            <div>
            <IonItemGroup>
                <IonItem sizr='auto'>
                    <IonLabel>Имя</IonLabel>
                    <IonLabel style={{textAlign: 'right'}}>Действие</IonLabel>
                </IonItem>
                 {data.map((item, index) => (
                    <IonItem button key={index}>
                        <IonLabel>{item.name}</IonLabel>
                        <IonIcon icon={pencilOutline} color="white" style={{textAlign: 'right'}} />
                    </IonItem>
                ))}
            </IonItemGroup>
            </div>
        </main>
    )
}

export default Handbooks