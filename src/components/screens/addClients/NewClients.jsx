import { useState, useRef } from 'react';
import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';

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
  IonSelectOption
} from '@ionic/react';


const NewClients = ({ isOpen, onClose }) => {
  const modal = useRef(null);
  const input = useRef(null);

  const [message, setMessage] = useState(
    'This modal example uses triggers to automatically open a modal when the button is clicked.'
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, 'confirm');
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
                        label="Введите имя"
                        labelPlacement="stacked"
                        ref={input}
                        type="text"
                        placeholder="Имя"
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                        label="Введите телефон"
                        labelPlacement="stacked"
                        ref={input}
                        type="tel"
                        placeholder="Телефон"
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                        label="Введите почту"
                        labelPlacement="stacked"
                        ref={input}
                        type="email" 
                        placeholder="Почта"
                        />
                    </IonItem>
                        <IonSelect 
                        label="Тип клиента" 
                        labelPlacement="floating" 
                        style={{paddingLeft: '2vh', Width: '2'}}>
                            <IonSelectOption value="apple">Физ лицо</IonSelectOption>
                            <IonSelectOption value="banana">Юр лицо</IonSelectOption>
                        </IonSelect>
                    </IonContent>
                </IonModal>
            </IonContent>
    </main>
  );
};

export default NewClients;
