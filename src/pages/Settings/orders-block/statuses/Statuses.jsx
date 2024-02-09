import {useState } from 'react';
import { IonItem, IonLabel, IonList, IonReorder, IonReorderGroup, } from '@ionic/react';
import StatusesModal from './newStatuses/NewStatuses';


const Statuses = () =>{
    const [items, setItems] = useState([1, 2, 3, 4, 5]);

    function handleReorder(event) {
        console.log('Before complete', items);
        setItems(event.detail.complete(items));
        console.log('After complete', items);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };


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
            <div>
                    <StatusesModal isOpen={isModalOpen} onClose={closeModal} />
            </div>
        </main>
    )
}

export default Statuses