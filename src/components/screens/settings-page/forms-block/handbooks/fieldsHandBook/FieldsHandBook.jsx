import SearchBox from '../../../../searchBox/SearchBox';
import { IonItem, IonItemGroup, IonLabel} from '@ionic/react';

const FieldsHandBooks = () =>{

   const data = [
        { name: 'Field 1 Value' },
        { name: 'Field 2 Value' }
    ];

    return(
        <main id="main">
            <div>
                <SearchBox />
            </div>
            <div>
            <IonItemGroup>
                <IonItem sizr='auto'>
                    <IonLabel>Значения</IonLabel>
                </IonItem>
                 {data.map((item, index) => (
                    <IonItem button key={index}>
                        <IonLabel>{item.name}</IonLabel>
                    </IonItem>
                ))}
            </IonItemGroup>
            </div>
        </main>
    )
}
export default FieldsHandBooks