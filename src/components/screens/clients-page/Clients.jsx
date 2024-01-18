import { useState, useEffect } from 'react';
import { IonButton, IonIcon,  } from '@ionic/react';
import {filterOutline, cloudUploadOutline, cloudDownloadOutline } from 'ionicons/icons';

import '../../../assets/styles/main.css';
import '../../../assets/styles/global.css';
import style from  '../../../assets/styles/table.module.css';
import '../../../assets/styles/addbutton.css';
import '../../../assets/styles/button-ion.css';

import AddButton from '../addButton/AddButton';
import SearchBox from '../searchBox/SearchBox';
import NewClients from '../addClients/NewClients';



function Clients() {
    const initialData = [
        {
          name: 'Рома Аегси Хиро',
          phone: '+375(**)**-**-**',
          email: '-',
          type: 'Физ.лицо',
        },      
        {
            name: 'Рома Аегси Хиро',
            phone: '+375(**)**-**-**',
            email: '-',
            type: 'Физ.лицо',
          }, 
      ];

        const [filteredData, setFilteredData] = useState([...initialData]);
        const [clientList, setClientList] = useState([...initialData]);
        const [isNewClientsModalOpen, setIsNewClientsModalOpen] = useState(false);

        const fields = ['name', 'phone', 'email', 'type'];


        useEffect(() => {
            setFilteredData(clientList);
        }, [clientList]);

        const handleFilter = (filteredResults) => {
            setFilteredData(filteredResults);
        };

        const addClient = (newClient) => {
            setClientList((prevList) => [...prevList, newClient]);
          };

        const openNewClientsModal = () => {
            setIsNewClientsModalOpen(true);
          };
        
          const closeNewClientsModal = () => {
            setIsNewClientsModalOpen(false);
          };

    return (
    <>
        <main id="main">
            <div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <SearchBox fields={fields} data={clientList} onFilter={handleFilter} />
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" color="white" icon={filterOutline}></IonIcon>
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" icon={cloudUploadOutline}></IonIcon>
                    </IonButton>
                    <IonButton fill="clear">
                        <IonIcon slot="icon-only" icon={cloudDownloadOutline}></IonIcon>
                    </IonButton>
                </div>    
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
            <div className={style.wrapper}>
                        {/* Применение стилей к таблице */}
                        <div className={`${style.Rtable} ${style['Rtable--5cols']} ${style['Rtable--collapse']}`}>
                            {/* Применение стилей к строке заголовка */}
                            <div className={`${style['Rtable-row']} ${style['Rtable-row--head']}`}>
                                {/* Применение стилей к каждой ячейке заголовка */}
                                <div className={`${style['Rtable-cell']} ${style['date-cell']} ${style['column-heading']}`}>
                                    Имя
                                </div>
                                <div className={`${style['Rtable-cell']} ${style['topic-cell']} ${style['column-heading']}`}>
                                    Телефон
                                </div>
                                <div className={`${style['Rtable-cell']} ${style['access-link-cell']} ${style['column-heading']}`}>
                                    Почта
                                </div>
                                <div className={`${style['Rtable-cell']} ${style['replay-link-cell']} ${style['column-heading']}`}>
                                    Тип клиента
                                </div>
                            </div>

                            {filteredData.map((item, index) => (
                            <div className={style['Rtable-row']} key={index}>
                                {/* Применение стилей к каждой ячейке */}
                                <div className={`${style['Rtable-cell']} ${style['date-cell']}`}>
                                    <div className={style['Rtable-cell--heading']}>Имя</div>
                                    <div className={`${style['Rtable-cell--content']} ${style['date-content']}`}>
                                        <span className={style['webinar-date']}> 
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                                <div className={`${style['Rtable-cell']} ${style['topic-cell']}`}>
                                    <div className={`${style['Rtable-cell--content']} ${style['title-content']}`}>
                                        {item.phone}
                                    </div>
                                </div>
                                <div className={`${style['Rtable-cell']} ${style['access-link-cell']}`}>
                                    <div className={style['Rtable-cell--heading']}>Почта</div>
                                    <div className={`${style['Rtable-cell--content']} ${style['access-link-content']}`}>
                                        {item.email}
                                    </div>
                                </div>
                                <div className={`${style['Rtable-cell']} ${style['replay-link-cell']}`}>
                                    <div className={style['Rtable-cell--heading']}>Тип Клиента</div>
                                    <div className={`${style['Rtable-cell--content']} ${style['replay-link-content']}`}>
                                        {item.type}
                                    </div>
                                </div>
                                
                            </div>
                            ))}
                    </div>
                </div>
            </div>
            <div>
                <AddButton onClick={openNewClientsModal} />
                <NewClients isOpen={isNewClientsModalOpen} onClose={closeNewClientsModal}  addClient={addClient} />
            </div>
        </main>
    </>
    );
}

export default Clients;
