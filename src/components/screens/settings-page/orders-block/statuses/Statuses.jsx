import {useState } from 'react';
import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, } from '@ionic/react';

import '../../../../../assets/styles/global.css';
import '../../../../../assets/styles/main.css';
import '../../../../../assets/styles/ion-style.css';

const Statuses = () =>{
    const [items, setItems] = useState([1, 2, 3, 4, 5]);

  function handleReorder(event) {
    console.log('Before complete', items);
    setItems(event.detail.complete(items));
    console.log('After complete', items);
  }

    return(
        <main id="main">
            <IonList style={{ background: 'hsl(var(--background))'}}>
                <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                    {items.map((item) => (
                    <IonItem key={item}>
                        <IonLabel>Item {item}</IonLabel>
                        <IonReorder slot="end"></IonReorder>
                    </IonItem>
                    ))}
                </IonReorderGroup>
            </IonList>
        </main>
    )
}

export default Statuses