import { IonButton, IonGrid, IonItem, IonItemGroup, IonToggle } from "@ionic/react"
import { useEffect, useState } from "react";

const Modules = ({ setVisibility }) => {
    const [isSkladVisible, setIsSkladVisible] = useState(true);
  const [isMagazinVisible, setIsMagazinVisible] = useState(true);
  const [isOrdersVisible, setIsOrdersVisible] = useState(true);

  useEffect(() => {
    // Загружаем состояние из localStorage при монтировании компонента
    const storedVisibility = JSON.parse(localStorage.getItem('visibility')) || {};
    setIsSkladVisible(storedVisibility.isSkladVisible ?? true);
    setIsMagazinVisible(storedVisibility.isMagazinVisible ?? true);
    setIsOrdersVisible(storedVisibility.isOrdersVisible ?? true);
  }, []);

  const handleSaveClick = () => {
    // Сохраняем состояние в localStorage при изменении
    const visibility = {
      isSkladVisible,
      isMagazinVisible,
      isOrdersVisible,
    };
    localStorage.setItem('visibility', JSON.stringify(visibility));

    // Обновляем видимость в родительском компоненте
    setVisibility(visibility);
  };
  
    return (
      <main id="main">
        <IonGrid>
          <IonItemGroup>
            <IonItem>
              <IonToggle checked={isSkladVisible} onIonChange={() => setIsSkladVisible(!isSkladVisible)}>Склад</IonToggle>
            </IonItem>
            <IonItem>
              <IonToggle checked={isMagazinVisible} onIonChange={() => setIsMagazinVisible(!isMagazinVisible)}>Магазин</IonToggle>
            </IonItem>
            <IonItem>
              <IonToggle checked={isOrdersVisible} onIonChange={() => setIsOrdersVisible(!isOrdersVisible)}>Заказы</IonToggle>
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
  