import { IonGrid, IonItem, IonItemGroup, IonLabel, IonList, IonReorder, IonReorderGroup} from "@ionic/react"
import { useState } from "react";
import style from  '@assets/styles/table.module.css';

const fields = ['Name', 'Type', 'HandBooks', 'Required'];
const columnLabels = ['Название', 'Тип', 'Справочник', 'Обязательное']; 

const FieldOrders = () =>{
    const [filteredData, setFilteredData] = useState([]);
    const [items, setItems] = useState([
        { id: 1, name: "Item 1", type: "Type 1", reference: "Reference 1", required: true },
        { id: 2, name: "Item 2", type: "Type 2", reference: "Reference 2", required: false },
        { id: 3, name: "Item 3", type: "Type 3", reference: "Reference 3", required: true },
      ]);

  function handleReorder(event) {
    console.log('Before complete', items);
    setItems(event.detail.complete(items));
    console.log('After complete', items);
  }

  const handleFilter = (filteredResults) => {
    setFilteredData(filteredResults);
  };

    return(
        <main id="main">
            <div className={style.tableContainer}>
                <IonItemGroup>
                    <IonItem color='light' className={style.tableRow} data-hide-header="true">
                        {fields.map((field, index) => (
                            <IonLabel key={index} className={style.tableColumn}>
                            {columnLabels[index]}
                            </IonLabel>
                        ))}
                    </IonItem>
                    <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
                        {items.map((item) => (
                        <IonItem key={item.id}>
                           <IonReorder slot="start" />
                            <IonLabel>{item.name}</IonLabel>
                            <IonLabel>{item.type}</IonLabel>
                            <IonLabel>{item.reference}</IonLabel>
                            <IonLabel>{item.required ? "Да" : "Нет"}</IonLabel>
                        </IonItem>
                        ))}
                        
                    </IonReorderGroup>
                </IonItemGroup>
                
            </div>
        </main>
    )
}

export default FieldOrders