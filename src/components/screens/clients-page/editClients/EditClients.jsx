import '../../../../assets/styles/modal-wind.css';
import { crmAPI } from '../../../../service/api';
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

const EditClients = ({ isOpen, onClose, editClient, selectedClient, rowIndex }) => {
    const edit_modal = useRef(null);
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
  
    useEffect(() => {
      if (selectedClient) {
        inputName.current && (inputName.current.value = selectedClient.FioClient || '');
        inputPhone.current && (inputPhone.current.value = selectedClient.PhoneNumber || '');
        inputEmail.current && (inputEmail.current.value = selectedClient.Mail || '');
        selectType.current && (selectType.current.value = selectedClient.TypeClientID || '');
      }
    }, [selectedClient]);

    useEffect(() => {
      if (isOpen && selectedClient) {
        edit_modal.current && edit_modal.current.present();
      }
    }, [isOpen, selectedClient]);
  
    async function confirm() {
      try {
        const updatedClient = {
          FioClient: inputName.current?.value || '',
          PhoneNumber: inputPhone.current?.value || '',
          Mail: inputEmail.current?.value || '',
          TypeClientID: selectType.current?.value || '',
        };
  
        await editClient(updatedClient);
        edit_modal.current && edit_modal.current.dismiss(null, 'confirm');
      } catch (error) {
        console.error('Error updating client:', error);
      }
    }
  
    function onWillDismiss(ev) {
      if (ev.detail.role === 'confirm') {
        onClose();
      }
    }

    const { triggerId } = selectedClient || {};

  return (
    <IonContent className="ion-padding">
      <IonModal ref={edit_modal} trigger={triggerId} onWillDismiss={(ev) => onWillDismiss(ev)}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => edit_modal.current?.dismiss()}>Отмена</IonButton>
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

export default EditClients;
