import { useDispatch, useSelector } from 'react-redux';
import { IonButton, IonGrid, IonItem, IonItemGroup, IonToggle } from "@ionic/react";
import { setVisibility, selectVisibility } from '@store/visibilitySlice';
import { useState } from 'react';

const Modules = () => {
  const dispatch = useDispatch();
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = useSelector(selectVisibility);

  // Временное состояние, которое будет обновляться по мере изменения тумблеров
  const [tempVisibility, setTempVisibility] = useState({
    isSkladVisible,
    isMagazinVisible,
    isOrdersVisible,
  });

  // Обработчики изменения тумблеров
  const handleSkladToggle = () => {
    setTempVisibility(prev => ({ ...prev, isSkladVisible: !prev.isSkladVisible }));
  };

  const handleMagazinToggle = () => {
    setTempVisibility(prev => ({ ...prev, isMagazinVisible: !prev.isMagazinVisible }));
  };

  const handleOrdersToggle = () => {
    setTempVisibility(prev => ({ ...prev, isOrdersVisible: !prev.isOrdersVisible }));
  };

  // Обработчик сохранения
  const handleSaveClick = () => {
    dispatch(setVisibility(tempVisibility));
  };

  return (
    <main id="main">
      <IonGrid>
        <IonItemGroup>
          <IonItem>
            <IonToggle checked={tempVisibility.isSkladVisible} onIonChange={handleSkladToggle}>
              Склад
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle checked={tempVisibility.isMagazinVisible} onIonChange={handleMagazinToggle}>
              Магазин
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle checked={tempVisibility.isOrdersVisible} onIonChange={handleOrdersToggle}>
              Заказы
            </IonToggle>
          </IonItem>
          <IonItem>
            <IonButton className="custom" onClick={handleSaveClick}>
              Сохранить
            </IonButton>
          </IonItem>
        </IonItemGroup>
      </IonGrid>
    </main>
  );
};

export default Modules;
