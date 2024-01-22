import '../../../../assets/styles/modal-wind.css';
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

const NewCategory = ({ isOpen, onClose, addCategory }) => {
  
  const category_modal = useRef(null);
  const inputNameCategory = useRef(null);


  function confirm() {
    const newCategory = {
      name: inputNameCategory.current?.value || '',
    };

    addCategory(newCategory);
    category_modal.current?.dismiss(null, 'confirm'); 
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
      onClose();
    }
    
  }

  return (
      <IonContent className="ion-padding">
        <IonModal ref={category_modal} trigger="open-category-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => category_modal.current?.dismiss()}>Отмена</IonButton>
              </IonButtons>
              <IonTitle>категория</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Добавить
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput 
                label="Название" 
                labelPlacement="floating"
                ref={inputNameCategory} 
                type="text" 
                placeholder="Имя"
                class="custom"
                 />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
  );
};

export default NewCategory;
