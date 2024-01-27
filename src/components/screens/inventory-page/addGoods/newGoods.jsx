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
  IonSelect,
  IonSelectOption,
} from '@ionic/react';

const NewGoods = ({ isOpen, onClose, addGoods, categories }) => {
  const modal = useRef(null);
  const inputArticle = useRef(null);
  const selectCategory = useRef(null);
  const inputName = useRef(null);
  const inputAmount = useRef(null);
  const inputPrice = useRef(null);
  const inputCostPrice = useRef(null);

  function confirm() {
    const newGoodsData = {
      article: inputArticle.current?.value || '',
      category: selectCategory.current?.value || '',
      name: inputName.current?.value || '',
      amount: inputAmount.current?.value || '',
      price: inputPrice.current?.value || '',
      costPrice: inputCostPrice.current?.value || '',
    };

    addGoods(newGoodsData);
    modal.current?.dismiss(null, 'confirm');
  }

  function onWillDismiss(ev) {
    if (ev.detail.role === 'confirm') {
      onClose();
    }
  }

  return (
    <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => modal.current?.dismiss()}>Отмена</IonButton>
          </IonButtons>
          <IonTitle>Товар</IonTitle>
          <IonButtons slot="end">
            <IonButton strong={true} onClick={() => confirm()}>
              Добавить
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem className="custom">
          <IonInput
            label="Артикул"
            labelPlacement="floating"
            ref={inputArticle}
            type="text"
            placeholder="Артикуль"
            class="custom"
          />
        </IonItem>
        <IonItem className="custom">  
          <IonSelect
            label="Категория"
            labelPlacement="floating"
            ref={selectCategory}
            class="custom"
            className="custom-alert"
            interface='popover'
          >
            {categories.map((category, index) => (
              <IonSelectOption key={index} value={category.name}>
                {Object.keys(category).map((field, fieldIndex) => (
                  <div key={fieldIndex}>
                    {category[field] !== undefined ? category[field] : ''}
                  </div>
                ))}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem className="custom">
          <IonInput
            label="Название"
            labelPlacement="floating"
            ref={inputName}
            type="text"
            placeholder="Название"
            class="custom"
          />
        </IonItem>
        <IonItem className="custom">
          <IonInput
            label="Количество"
            labelPlacement="floating"
            ref={inputAmount}
            type="number"
            placeholder="Количество"
            class="custom"
          />
        </IonItem>
        <IonItem className="custom">
          <IonInput
            label="Цена"
            labelPlacement="floating"
            ref={inputPrice}
            type="number"
            placeholder="Цена"
            class="custom"
          />
        </IonItem>
        <IonItem className="custom">
          <IonInput
            label="Себестоимость"
            labelPlacement="floating"
            ref={inputCostPrice}
            type="number"
            placeholder="Себестоимость"
            class="custom"
          />
        </IonItem>
      </IonContent>
    </IonModal>
  );
};

export default NewGoods;