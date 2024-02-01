import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonItemDivider, IonLabel, IonModal, IonSearchbar, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { useRef, useState, useEffect } from "react";

import '../../../../../../assets/styles/ion-style.css';

const EmployeesModal = ({ isOpen, onClose}) =>{
    const modal = useRef(null);
    const [invitationCode, setInvitationCode] = useState(null);
    const [timer, setTimer] = useState(300); 


    function generateInvitationCode() {
        const code = Math.random().toString(36).substr(2, 6).toUpperCase();
        setInvitationCode(code);
        // Установка таймера на 5 минут для удаления кода
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