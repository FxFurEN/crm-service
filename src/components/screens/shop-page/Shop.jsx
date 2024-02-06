
import { useState, useEffect } from 'react';
import {
    IonButton,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonSelect,
    IonSelectOption,
  } from '@ionic/react';

import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';


import style from  '../../../assets/styles/table.module.css';

import AddButton from '../addButton/AddButton';

const fields = ['data', 'position', 'employee', 'price'];
const columnLabels = ['Дата', 'Позиция', 'Сотрудник', 'Цена'];

const Shop = () =>{
    const initialData = [
        {
          data: '07.01',
          position: 'Брусок дерева',
          employee: 'Тикита Нимошенко',
          price: '29,99',
        },
    ];

      const [filteredData, setFilteredData] = useState([...initialData]);

      useEffect(() => {
        setFilteredData(initialData);
      }, [initialData]);

    return(
        <main id="main">
            <IonButton fill="clear" style={{width: "30%"}}>
                <IonSelect aria-label="Сортировка" interface="popover" placeholder="Выберите сортировку" >
                    <IonSelectOption value="allTimes">За все время</IonSelectOption>
                    <IonSelectOption value="toDay">Сегодня</IonSelectOption>
                    <IonSelectOption value="tommorow">Вчера</IonSelectOption>
                    <IonSelectOption value="lastWeek">Последние 7 дней</IonSelectOption>
                    <IonSelectOption value="lastMonth">Последние 30 дней</IonSelectOption>
                    <IonSelectOption value="manual">Указать вручную</IonSelectOption>
                </IonSelect>
            </IonButton>
            <div className={style.tableContainer}>
              <IonItemGroup>
                <IonItem color='light' className={style.tableRow} data-hide-header="true">
                    {fields.map((field, index) => {
                    const label = columnLabels[index];
                    return (
                      <IonLabel key={index} className={style.tableColumn}>
                      {label}
                     </IonLabel>
                    );
                  })}
                </IonItem>
                {filteredData.map((item, rowIndex)  => (
                <IonItem key={rowIndex} className={style.tableRow} >
                    {fields.map((field, index) => (
                      <IonLabel key={index} className={style.tableColumn} data-label={columnLabels[index]}>
                        {item[field]}
                      </IonLabel>
                    ))}
                  </IonItem>
                ))}
              </IonItemGroup>
            </div>
            <div>
                <AddButton />
            </div>
        </main>
    )
}

export default Shop;