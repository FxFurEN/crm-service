import { IonButton, IonGrid, IonItem, IonItemGroup, IonToggle } from "@ionic/react"
import { useState } from "react";

const Modules = ({ setVisibility }) => {
    const [isSkladVisible, setIsSkladVisible] = useState(true);
    const [isMagazinVisible, setIsMagazinVisible] = useState(true);
    const [isOrdersVisible, setIsOrdersVisible] = useState(true);
  
    const handleSaveClick = () => {
      setVisibility({
        isSkladVisible,
        isMagazinVisible,
        isOrdersVisible,
      });
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
  