import '../../../../assets/styles/modal-wind.css';
import { crmAPI } from '../../../../api/api';
import { useRef, useState, useEffect } from 'react';
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

const NewClients = ({ isOpen, onClose, addClient }) => {
  const modal = useRef(null);
  const inputName = useRef(null);
  const inputPhone = useRef(null);
  const inputEmail = useRef(null);
  const selectType = useRef(null);
  
  const [clientTypes, setClientTypes] = useState([]);

  useEffect(() => {
    crmAPI.loadClientTypes()
      .then(response => {
        setClientTypes(response.data);
      })
      .catch(error => {
        console.error('Error loading client types:', error);
      });
  }, []);


  async function confirm() {
    try {
      const selectedType = clientTypes.find(type => type.typeclientid === selectType.current?.value);
  
      const newClient = {
        FioClient: inputName.current?.value || '',
        PhoneNumber: inputPhone.current?.value || '',
        Mail: inputEmail.current?.value || '',
        TypeClientID: selectedType ? selectedType.typeclientid : null,
      };
  
      await addClient(newClient);
      modal.current?.dismiss(null, 'confirm');
    } catch (error) {
      console.error('Error adding client:', error);
    }
  }
  
  

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
      onClose();
    }
    
  }

  return (
      <IonContent className="ion-padding">
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Отмена</IonButton>
              </IonButtons>
              <IonTitle>Клиент</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Добавить
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem className="custom">
              <IonInput 
                label="ФИО" 
                labelPlacement="floating"
                ref={inputName} 
                type="text" 
                placeholder="Имя"
                class="custom"
                 />
            </IonItem>
            <IonItem className="custom">
              <IonInput
                label="Телефон"
                labelPlacement="floating"
                ref={inputPhone}
                type="tel"
                placeholder="888-888-8888"
                class="custom"
                
              />
            </IonItem>
            <IonItem className="custom">
              <IonInput 
                label="Почта" 
                labelPlacement="floating" 
                ref={inputEmail} 
                type="email" 
                placeholder="email@domain.com"
                class="custom"
                 />
                
            </IonItem>
            <IonItem className="custom">
              <IonSelect
                label="Тип клиента"
                labelPlacement="floating"
                ref={selectType}
                class="custom"
                className="custom-alert"
                interface='popover'
              >
                {clientTypes.map((type, index) => (
                  <IonSelectOption key={index} value={type.typeclientid}>
                    {type.nametype}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
  );
};

export default NewClients;
