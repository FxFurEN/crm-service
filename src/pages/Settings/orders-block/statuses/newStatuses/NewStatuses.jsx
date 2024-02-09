import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonModal, IonText, IonTitle, IonToolbar, IonToast, IonInput, IonCheckbox } from "@ionic/react";
import { useRef, useState} from "react";
import { HexColorPicker } from "react-colorful";

import '../../../../../../assets/styles/ion-style.css';

const StatusesModal = ({ isOpen, onClose }) => {
    const [color, setColor] = useState("#aabbcc");
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
                            <IonButton>Архив</IonButton>
                        </IonButtons>
                        <IonTitle>Добавить статус</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={() => modal.current?.dismiss()}>Добавить</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" >
                    <br/>
                        <IonInput 
                            label="Название" 
                            labelPlacement="floating" 
                            fill="outline"
                        ></IonInput>
                    <br/>
                        <IonCheckbox labelPlacement="end">Закрывает заказ</IonCheckbox>
                    <br/>
                        <IonCheckbox labelPlacement="end">Вызывакт окно оплаты</IonCheckbox>
                    <br/>
                        <IonCheckbox labelPlacement="end">Начисляет зарплатау</IonCheckbox>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <HexColorPicker style={{width: '100em'}} color={color} onChange={setColor} />
                    </div>
                </IonContent>
            </IonModal>
        </IonContent>
    );
}

export default StatusesModal;
