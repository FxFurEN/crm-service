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
  IonInput,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useMaskito } from '@maskito/react';

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
  const phoneMask = useMaskito({
    options: {
      mask: ['+', '3','7','5', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/,'-', /\d/, /\d/],
    },
  });

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
          <IonInput
              fill='outline'
              label="ФИО"
              labelPlacement="stacked"
              className="custom"
              placeholder={name}
              onIonChange={(e) => setName(e.detail.value)}
            />
            <br/>
          <IonInput
              fill='outline'
              label="Телефон"
              labelPlacement="stacked"
              className="custom"
              type="tel"
              placeholder={phone}
              onIonChange={(e) => setPhone(e.detail.value)}
              ref={async (phoneInput) => {
                if (phoneInput) {
                  const input = await phoneInput.getInputElement();
                  phoneMask(input);
                }
              }}
            />
            <br/>
            <IonInput
              fill='outline'
              label="Почта"
              labelPlacement="stacked"
              className="custom"
              type="email"
              placeholder={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            />
            <br/>
            <IonSelect
              fill='outline'
              label="Тип клиента"
              labelPlacement="stacked"
              className="custom-alert"
              interface='popover'
              placeholder={type}
              onIonChange={(e) => setType(e.detail.value)}
            >
              {clientTypes.map((type, index) => (
                <IonSelectOption key={index} value={type.typeclientid}>
                  {type.nametype}
                </IonSelectOption>
              ))}
            </IonSelect>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default EditClients;
