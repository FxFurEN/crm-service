import '../../../assets/styles/modal-wind.css';
import { useRef, useState } from 'react';
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

  const [message, setMessage] = useState('');

  function confirm() {
    const newClient = {
      name: inputName.current?.value || '',
      phone: inputPhone.current?.value || '',
      email: inputEmail.current?.value || '',
      type: selectType.current?.value || '',
    };

    addClient(newClient); // Add the new client to the list
    modal.current?.dismiss(null, 'confirm'); // Dismiss the modal
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
    onClose();
  }

  return (
    <main id="main">
      <IonContent className="ion-padding">
        <p>{message}</p>
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
            <IonItem>
              <IonInput 
                label="ФИО" 
                labelPlacement="floating"
                ref={inputName} 
                type="text" 
                placeholder="Имя"
                class="custom"
                 />
            </IonItem>
            <IonItem>
              <IonInput
                label="Телефон"
                labelPlacement="floating"
                ref={inputPhone}
                type="tel"
                placeholder="888-888-8888"
                class="custom"
                
              />
            </IonItem>
            <IonItem>
              <IonInput 
                label="Почта" 
                labelPlacement="floating" 
                ref={inputEmail} 
                type="email" 
                placeholder="email@domain.com"
                class="custom"
                 />
                
            </IonItem>
            <IonItem>
              <IonSelect
                label="Тип клиента"
                labelPlacement="floating"
                ref={selectType}
                class="custom"
                className="custom-alert"
                interface='popover'
                
              >
                <IonSelectOption value="Физ.лицо">Физ лицо</IonSelectOption>
                <IonSelectOption value="Юр.лицо">Юр лицо</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </main>
  );
};

export default NewClients;
