import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react"
import { useRef } from "react";
import SearchBox from "../../../../searchBox/SearchBox";
import '../../../../../../assets/styles/ion-style.css';

const EmployeesModal = ({ isOpen, onClose}) =>{
    const modal = useRef(null);


    function onWillDismiss(ev) {
        if (ev.detail.role === 'confirm') {
          onClose();
        }
    }
    return(
        <IonContent className="ion-padding">
        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Отмена</IonButton>
              </IonButtons>
              <IonTitle>Сотрудник</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Добавить
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem className="custom">
                <IonSearchbar 
                    showCancelButton="never"
                    debounce={500}
                    class="modal-search"
                >
                </IonSearchbar>
            </IonItem>
            <IonItem className="custom">
              <IonInput 
                label="Имя" 
                labelPlacement="floating" 
                type="text" 
                placeholder="Имя"
                class="custom"
                 />
            </IonItem>
            <IonItem className="custom">
              <IonInput
                label="Телефон"
                labelPlacement="floating"
                type="tel"
                placeholder="888-888-8888"
                class="custom"
                
              />
            </IonItem>
            <IonItem className="custom">
              <IonInput 
                label="Почта" 
                labelPlacement="floating" 
                type="email" 
                placeholder="email@domain.com"
                class="custom"
                 />
                
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    )
}
export default EmployeesModal