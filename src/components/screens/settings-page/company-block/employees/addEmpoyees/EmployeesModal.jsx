import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonText, IonTitle, IonToolbar, IonToast } from "@ionic/react";
import { useRef, useState, useEffect } from "react";
import clipboardCopy from 'clipboard-copy';

import '../../../../../../assets/styles/ion-style.css';

const EmployeesModal = ({ isOpen, onClose }) => {
    const modal = useRef(null);
    const [invitationCode, setInvitationCode] = useState(null);
    const [timer, setTimer] = useState(300);
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
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
        setCopied(false);
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

    function copyToClipboard() {
        if (invitationCode) {
            clipboardCopy(invitationCode);
            setCopied(true);
            setShowToast(true);

            setTimeout(() => {
                setCopied(false);
                setShowToast(false);
            }, 500);
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
                        <IonTitle>Добавить сотрудника</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonItem>
                        {invitationCode && (
                            <>
                                <IonText color='dark'>Код приглашения: </IonText>
                                <IonLabel
                                    onClick={() => copyToClipboard()}
                                    color='dark'
                                    style={{ cursor: 'pointer', backgroundColor: copied ? '#4caf50' : 'transparent', transition: 'background-color 0.5s ease' }}
                                >
                                    {invitationCode}
                                </IonLabel>
                                <IonText color='dark'>Время действия кода: {formatTime(timer)}</IonText>
                                <p style={{ color: 'black' }}>Отправьте этот код сотруднику для присоединения к вашей CRM</p>
                            </>
                        )}
                    </IonItem>
                    <IonItem>
                        <IonButton onClick={() => generateInvitationCode()}>Сгенерировать код приглашения</IonButton>
                    </IonItem>
                </IonContent>
            </IonModal>
            <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Код скопирован"
                duration={3000}
            />
        </IonContent>
    );
}

export default EmployeesModal;
