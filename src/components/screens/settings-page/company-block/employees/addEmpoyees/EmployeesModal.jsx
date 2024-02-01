import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal,IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useRef, useState, useEffect } from "react";

import '../../../../../../assets/styles/ion-style.css';

const EmployeesModal = ({ isOpen, onClose}) =>{
    const modal = useRef(null);
    const [invitationCode, setInvitationCode] = useState(null);
    const [timer, setTimer] = useState(300);
    const secretKey = "f1k71v3-s3cr3t-k3y"; 

    function generateInvitationCode() {
        const payload = {
            code: Math.random().toString(36).substr(2, 6).toUpperCase(),
            exp: Math.floor(Date.now() / 1000) + 300,
        };
        const encodedHeader = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
        const encodedPayload = btoa(JSON.stringify(payload));
        const signature = btoa(
            new TextEncoder().encode(encodedHeader + "." + encodedPayload + secretKey)
        );
        const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

        setInvitationCode(jwt);
        setTimer(300);
    }

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [timer]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    function onWillDismiss(ev) {
        if (ev.detail.role === 'confirm') {
          onClose();
        }
    }
    return(
        <IonContent className="ion-padding">
        <IonModal id="example-modal" ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Отмена</IonButton>
              </IonButtons>
              <IonTitle>Добавить сотрудника</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
                {invitationCode && (
                        <>
                            <IonLabel color='dark'>Код приглашения: {invitationCode}</IonLabel>
                            <IonText color='dark'>Время действия кода: {formatTime(timer)}</IonText>
                            <p style={{color: 'black'}}>Отправьте этот код сотруднику для присоединения к вашей crm</p>
                        </>
                    )}
            </IonItem>
            <IonItem>
                <IonButton  onClick={() => generateInvitationCode()}>Сгенерировать код приглашения</IonButton>
            </IonItem>
            
          </IonContent>
        </IonModal>
      </IonContent>
    )
}
export default EmployeesModal