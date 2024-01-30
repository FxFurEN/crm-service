import { IonGrid, IonItem, IonLabel, IonList, IonReorder, IonReorderGroup } from '@ionic/react';
import '../../../../../assets/styles/global.css';
import '../../../../../assets/styles/main.css';
import { useState } from 'react';

const FieldClients = () =>{
    const [items, setItems] = useState([
        { id: 1, name: "Item 1", type: "Type 1", reference: "Reference 1", required: true },
        { id: 2, name: "Item 2", type: "Type 2", reference: "Reference 2", required: false },
        { id: 3, name: "Item 3", type: "Type 3", reference: "Reference 3", required: true },
      ]);

  function handleReorder(event) {
    console.log('Before complete', items);
    setItems(event.detail.complete(items));
    console.log('After complete', items);
  }

    return(
        <main id="main">
             <IonList style={{ background: 'hsl(var(--background))'}}>
                <IonGrid>
                        <IonItem>
                                <IonLabel>Название</IonLabel>
                                <IonLabel>Тип</IonLabel>
                                <IonLabel>Справочник</IonLabel>
                                <IonLabel>Обязательное</IonLabel>
                        </IonItem>

                        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                            {items.map((item) => (
                            <IonItem key={item.id} button>
                                <IonReorder slot="end" />
                                <IonLabel>{item.name}</IonLabel>
                                <IonLabel>{item.type}</IonLabel>
                                <IonLabel>{item.reference}</IonLabel>
                                <IonLabel>{item.required ? "Да" : "Нет"}</IonLabel>
                            </IonItem>
                            ))}
                        </IonReorderGroup>
                    </IonGrid>
              </IonList>
        </main>
    )
}

export default FieldClients