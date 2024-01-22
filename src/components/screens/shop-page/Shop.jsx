
import { useState, useEffect } from 'react';
import {
    IonButton,
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
            <div className={style.table}>
            <div className={`${style.tableHead} ${style.row}`}>
              {fields.map((field, index) => {
                const label = columnLabels[index];
                return (
                  <div
                    className={`${style.column}`}
                    data-label={label}
                    key={index}
                  >
                    {label}
                  </div>
                );
              })}
            </div>

            {filteredData.map((item, rowIndex) => (
              <div className={style.row} key={rowIndex}>
                {fields.map((field, colIndex) => {
                  const label = columnLabels[colIndex];
                  return (
                    <div
                      className={`${style.column}`}
                      data-label={label}
                      key={colIndex}
                    >
                      {item[field]}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
            <div>
                <AddButton />
            </div>
        </main>
    )
}

export default Shop;