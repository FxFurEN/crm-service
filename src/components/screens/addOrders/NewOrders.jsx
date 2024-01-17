import '../../../assets/styles/modal-wind.css';
import { useRef} from 'react';
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

const NewOrders = ({ isOpen, onClose, addOrders }) => {
  const modalRef = useRef(null);
  const inputOrder = useRef(null);
  const inputUpdated = useRef(null);
  const inputStatus = useRef(null);
  const inputDeadline = useRef(null);
  const inputClient = useRef(null);
  const inputPerformer = useRef(null);
  const inputServiceName = useRef(null);


  function confirm() {
    const newOrder = {
      order: inputOrder.current?.value || '',
      updated: inputUpdated.current?.value || '',
      status: inputStatus.current?.value || '',
      deadline: inputDeadline.current?.value || '',
      client: inputClient.current?.value || '',
      performer: inputPerformer.current?.value || '',
      serviceName: inputServiceName.current?.value || '',
    };

    addOrders(newOrder); 
    modalRef.current?.dismiss(null, 'confirm');
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
        onClose();
    }
    
  }

  return (
      <IonContent className="ion-padding">
        <IonModal ref={modalRef} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modalRef.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>New Order</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Add
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Order"
                labelPlacement="floating"
                ref={inputOrder}
                type="number"
                placeholder="Order"
                class="custom"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Updated"
                labelPlacement="floating"
                ref={inputUpdated}
                type="text"
                placeholder="Updated"
                class="custom"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Status"
                labelPlacement="floating"
                ref={inputStatus}
                type="text"
                placeholder="Status"
                class="custom"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Deadline"
                labelPlacement="floating"
                ref={inputDeadline}
                type="text"
                placeholder="Deadline"
                class="custom"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Client"
                labelPlacement="floating"
                ref={inputClient}
                type="text"
                placeholder="Client"
                class="custom"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Performer"
                labelPlacement="floating"
                ref={inputPerformer}
                type="text"
                placeholder="Performer"
                class="custom"
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Service Name"
                labelPlacement="floating"
                ref={inputServiceName}
                type="text"
                placeholder="Service Name"
                class="custom"
              />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
  );
};

export default NewOrders;