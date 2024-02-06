import '../../../../assets/styles/modal-wind.css';
import { crmAPI } from '../../../../service/api';
import { useState, useEffect } from 'react';
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

const EditClients = ({ isOpen, onClose, editClient, selectedClient }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
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

  useEffect(() => {
    if (selectedClient) {
      setName(selectedClient.fioclient || '');
      setPhone(selectedClient.phonenumber || '');
      setEmail(selectedClient.mail || '');
      setType(selectedClient.typeclientid || '');
    }
  }, [selectedClient]);

  useEffect(() => {
    if (isOpen && selectedClient) {
      // Здесь может потребоваться какая-то логика для отображения модального окна
    }
  }, [isOpen, selectedClient]);

  async function confirm() {
    try {
      const updatedClient = {
        fioclient: name,
        phonenumber: phone,
        mail: email,
        typeclientid: type,
      };

      await editClient(updatedClient);
      onClose();
    } catch (error) {
      console.error('Error updating client:', error);
    }
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
      onClose();
    }
  }

  return (
    <IonContent className="ion-padding">
      <IonModal isOpen={isOpen} onDidDismiss={() => onClose()} onWillDismiss={(ev) => onWillDismiss(ev)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => onClose()}>Отмена</IonButton>
            </IonButtons>
            <IonTitle>Клиент</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                Изменить
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem className="custom">
            <IonInput
              label="ФИО"
              labelPlacement="floating"
              className="custom"
              value={name}
              onIonChange={(e) => setName(e.detail.value)}
            />
          </IonItem>
          <IonItem className="custom">
            <IonInput
              label="Телефон"
              labelPlacement="floating"
              className="custom"
              type="tel"
              value={phone}
              onIonChange={(e) => setPhone(e.detail.value)}
            />
          </IonItem>
          <IonItem className="custom">
            <IonInput
              label="Почта"
              labelPlacement="floating"
              className="custom"
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            />
          </IonItem>
          <IonItem className="custom">
            <IonSelect
              label="Тип клиента"
              labelPlacement="floating"
              className="custom-alert"
              interface='popover'
              value={type}
              onIonChange={(e) => setType(e.detail.value)}
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

export default EditClients;
