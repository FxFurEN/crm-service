import { IonItem, IonItemGroup, IonLabel, IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom';


const Handbooks = () =>{
    const data = [
        { id: '1', name: 'Handbook 1' },
        { id: '2', name: 'Handbook 2'}
      ];

    return(
        <main id="main">
            <div>
            <IonItemGroup>
                <IonItem sizr='auto'>
                    <IonLabel>Имя</IonLabel>
                    <IonLabel style={{textAlign: 'right'}}>Действие</IonLabel>
                </IonItem>
                {data.map((item, index) => (
                        <Link to={`../settings/handbooks/${item.id}`} key={index}>
                            <IonItem button>
                                <IonLabel>{item.name}</IonLabel>
                                <IonIcon icon={pencilOutline} color="white" style={{textAlign: 'right'}} />
                            </IonItem>
                        </Link>
                ))}
            </IonItemGroup>
            </div>
        </main>
    )
}

export default Handbooks