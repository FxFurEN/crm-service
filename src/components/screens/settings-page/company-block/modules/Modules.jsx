import { useDispatch, useSelector } from 'react-redux';
import { IonButton, IonGrid, IonItem, IonItemGroup, IonToggle } from "@ionic/react";
import { setVisibility, selectVisibility } from '../../../../../redux/visibilitySlice'; // Замените на правильный путь

const Modules = () => {
  const dispatch = useDispatch();
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = useSelector(selectVisibility);

  const handleSaveClick = () => {
    dispatch(setVisibility({ isSkladVisible, isMagazinVisible, isOrdersVisible }));
  };

  return (
    <main id="main">
      <IonGrid>
        <IonItemGroup>
          <IonItem>
            <IonToggle checked={isSkladVisible} onIonChange={() => dispatch(setVisibility({ isSkladVisible: !isSkladVisible }))}>Склад</IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle checked={isMagazinVisible} onIonChange={() => dispatch(setVisibility({ isMagazinVisible: !isMagazinVisible }))}>Магазин</IonToggle>
          </IonItem>
          <IonItem>
            <IonToggle checked={isOrdersVisible} onIonChange={() => dispatch(setVisibility({ isOrdersVisible: !isOrdersVisible }))}>Заказы</IonToggle>
          </IonItem>
          <IonItem>
            <IonButton className="custom" onClick={handleSaveClick}>Сохранить</IonButton>
          </IonItem>
        </IonItemGroup>
      </IonGrid>
    </main>
  );
};

export default Modules;
