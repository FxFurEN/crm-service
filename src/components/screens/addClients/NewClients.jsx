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
                        <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                        </IonButtons>
                        <IonTitle>Welcome</IonTitle>
                        <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()}>
                            Confirm
                        </IonButton>
                        </IonButtons>
                    </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                    <IonItem>
                        <IonInput
                        label="Enter your name"
                        labelPlacement="stacked"
                        ref={input}
                        type="text"
                        placeholder="Your name"
                        />
                    </IonItem>
                    </IonContent>
                </IonModal>
            </IonContent>
    </main>
  );
};

export default NewClients;
