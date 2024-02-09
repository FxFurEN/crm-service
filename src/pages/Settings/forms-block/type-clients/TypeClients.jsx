import {useState } from 'react';
import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, } from '@ionic/react';

const TypeClients = () =>{
    const [items, setItems] = useState([1, 2]);

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

export default TypeClients