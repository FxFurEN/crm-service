import { useState, useEffect } from 'react';
import { crmAPI } from '../../../service/api';
import { IonButton, IonIcon, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonText} from '@ionic/react';
import {filterOutline, cloudUploadOutline, cloudDownloadOutline, add } from 'ionicons/icons';


import "../navbar/navbar.css";
import '../../../assets/styles/global.css';
import style from  './inventory.module.css';

import SearchBox from '../../../components/screens/searchBox/SearchBox';
import AddButton from '../addButton/AddButton';
import NewCategory from './addCategory/NewCategory';
import NewGoods from './addGoods/NewGoods';

const Inventory = () =>{
    const [categories, setCategories] = useState([]);
  const [goods, setGoods] = useState([]);

  const loadCategories = async () => {
    try {
      const response = await crmAPI.loadCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };
  
  const loadGoods = async () => {
    try {
      const response = await crmAPI.loadGoods();
      setGoods(response.data);
    } catch (error) {
      console.error('Error loading goods:', error);
    }
  };
  

  useEffect(() => {
    loadCategories();
    loadGoods();
  }, []);

  

  const addCategory = (newCategory) => {
    crmAPI.addCategory(newCategory)
      .then(response => {
        loadCategories();
      })
      .catch(error => {
        console.error('Error adding category:', error);
      });
  };

  const addGoods = (newGoods) => {
    crmAPI.addGoods(newGoods)
      .then(response => {
        loadGoods();
      })
      .catch(error => {
        console.error('Error adding goods:', error);
      });
  };

      const [isNewCategoryModal, setIsNewCategoryModalOpen] = useState(false);
      const [isNewGoodsModal, setIsNewGoodsModalOpen] = useState(false);
    
      const openNewCategoryModal = () => {
        setIsNewCategoryModalOpen(true);
      };
    
      const closeNewCategoryModal = () => {
        setIsNewCategoryModalOpen(false);
      };
    
      const openNewGoodsModal = () => {
        setIsNewGoodsModalOpen(true);
      };
    
      const closeNewGoodsModal = () => {
        setIsNewGoodsModalOpen(false);
      };

      const columnLabels = ['Артикул', 'Название', 'Количество', 'Цена', 'Себестоимость', 'Категория'];


    return(
        <main id="main">
          <div style={{display: "flex"}}>
            <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel >Все категории</IonLabel> 
                      <IonButton fill="clear" onClick={openNewCategoryModal} id="open-category-modal">
                        <IonIcon slot="icon-only" color="white" icon={add} size='large'></IonIcon>
                      </IonButton>             
                    </IonItem>
                  </IonCol>
                </IonRow>
                  {categories.map((category, index) => (
                    <IonRow key={index}>
                      <IonItem className='custom'>
                      {Object.keys(category).map((field, fieldIndex) => (
                        <IonCol key={fieldIndex}>
                            {category[field] !== undefined ? category[field] : ''}
                        </IonCol>
                      ))}
                      </IonItem>
                    </IonRow>
                  ))}
            </IonGrid>
            <IonGrid>
                <IonRow>
                  <div style={{display: "flex"}}>
                    <SearchBox  />
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
                </IonRow>
                <IonGrid>
                  <IonRow className={style.tableHead}>
                  {columnLabels.map((label, index) => (
                                        <IonCol 
                                          data-label={columnLabels[index]}
                                          className={style.column} 
                                          key={index}
                                        >
                                            {label}
                                        </IonCol>
                                    ))}
                  </IonRow>
                  {goods.map((item, index) => (
                    <IonRow key={index}>
                      {Object.keys(item).map((field, fieldIndex) => (
                                            <IonCol 
                                              data-label={columnLabels[index]}
                                              className={style.column} 
                                              key={fieldIndex}
                                            >
                                                {item[field]}
                                            </IonCol>
                                        ))}
                    </IonRow>
                  ))}
                </IonGrid>
            </IonGrid>
          </div>
            <div>
                <AddButton onClick={openNewGoodsModal}/>
                <NewGoods isOpen={isNewGoodsModal} onClose={closeNewGoodsModal} addGoods={addGoods} categories={categories}/>
                <NewCategory isOpen={isNewCategoryModal} onClose={closeNewCategoryModal} addCategory={addCategory}  />
            </div>
        </main>
        
    )
}

export default Inventory