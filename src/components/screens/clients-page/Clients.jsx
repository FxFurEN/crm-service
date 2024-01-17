import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        }
      ];

        const [filteredData, setFilteredData] = useState([...initialData]);
        const [clientList, setClientList] = useState([...initialData]);
        const [isNewClientsModalOpen, setIsNewClientsModalOpen] = useState(false);
        const navigate = useNavigate();

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
            navigate('/clients/new');
          };
        
          const closeNewClientsModal = () => {
            setIsNewClientsModalOpen(false);
            navigate('/clients');
          };

    return (
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
            <div>
                <div className={style.wrapper}>
                    <div className={style.table} style={{ boxShadow: '0 10px 13px 2px rgba(0, 0, 0, 0.2)' }}>
                        <div className={style.row + ' ' + style.header}>
                            <div className={style.cell}>
                                Имя
                            </div>
                            <div className={style.cell}>
                                Телефон
                            </div>
                            <div className={style.cell}>
                                Почта
                            </div>
                            <div className={style.cell}>
                                Тип
                            </div>
                        </div>
                        {filteredData.map((item, index) => (
                            <div className={style.row} key={index}>
                                <div className={style.cell} data-title="Имя">
                                {item.name}
                                </div>
                                <div className={style.cell} data-title="Телефон">
                                {item.phone}
                                </div>
                                <div className={style.cell} data-title="Почта">
                                {item.email}
                                </div>
                                <div className={style.cell} data-title="Тип">
                                {item.type}
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
    );
}

export default Clients;
