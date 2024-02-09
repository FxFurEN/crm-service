import { IonItem, IonLabel, IonItemGroup } from '@ionic/react';
import { useState } from 'react';
import EmployeesModal from './addEmpoyees/EmployeesModal';

const Employees = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    return(
        <main id="main">
            <div>
                <IonItemGroup>
                    <IonItem button>
                        <IonLabel>Вадим</IonLabel>
                        <IonLabel>+375 29 990 58 88</IonLabel>
                        <IonLabel>davay_sdelaem@gmail.ru</IonLabel>
                    </IonItem>
                </IonItemGroup>
                <div>
                    <EmployeesModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
           
                
        </main>
    )
}

export default Employees