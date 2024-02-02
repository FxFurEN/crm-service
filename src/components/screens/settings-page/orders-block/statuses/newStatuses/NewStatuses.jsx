import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonText, IonTitle, IonToolbar, IonToast, IonInput } from "@ionic/react";
import { useRef} from "react";

import '../../../../../../assets/styles/ion-style.css';

const StatusesModal = ({ isOpen, onClose }) => {
    const modal = useRef(null);
    
    function onWillDismiss(ev) {
        if (ev.detail.role === 'confirm') {
            onClose();
        }
    }

    return (
        <IonContent className="ion-padding">
            <IonModal id="example-modal" ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => modal.current?.dismiss()}>Отмена</IonButton>
                        </IonButtons>
                        <IonTitle>Добавить статус</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonInput 
                        label="Название" 
                        labelPlacement="floating" 
                        fill="outline"
                    ></IonInput>
                    <IonItem>
                    </IonItem>
                </IonContent>
            </IonModal>
        </IonContent>
    );
}

export default StatusesModal;
