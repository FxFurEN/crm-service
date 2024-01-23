import { useState, useEffect } from 'react';
import { crmAPI } from '../../../api/api';
import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
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

  const loadCategories = () => {
    crmAPI.loadCategories()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error loading categories:', error);
      });
  };

  const loadGoods = () => {
    crmAPI.loadGoods()
      .then(response => {
        setGoods(response.data);
      })
      .catch(error => {
        console.error('Error loading goods:', error);
      });
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


    return(
        
        <main id="main">
            <div className={style.table}>
                    <div className={style.row}>
                        <div className={style.column}>
                                <IonItem>
                                    <IonLabel>Все категории</IonLabel>
                                    <IonButton fill="clear" onClick={openNewCategoryModal} id="open-category-modal">
                                        <IonIcon slot="icon-only" color="white" icon={add} size='large'></IonIcon>
                                    </IonButton> 
                                    
                                </IonItem>
                        </div>                                                                                                                                                                                                                                            
                        <div className={style.column}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
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
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style.column}>
                            {categories.map((category, index) => (
                                <IonItem key={index}>
                                    <IonLabel>{category.name}</IonLabel>
                                </IonItem>
                            ))}
                        </div>
                        <div className={style.column}>
                             <div className={style.table}>
                                <div className={style.tableHead}>
                                    <div className={style.column}>
                                        Артикул
                                    </div>
                                    <div className={style.column}>
                                        Название
                                    </div>
                                    <div className={style.column}>
                                        Количество
                                    </div>
                                    <div className={style.column}>
                                        Цена
                                    </div>
                                    <div className={style.column}>
                                        Себестоимость
                                    </div>
                                </div>
                                {goods.map((item, index) => (
                                    <div className={style.row} key={index}>
                                        <div className={style.column}>
                                            {item.article}
                                        </div>
                                        <div className={style.column}>
                                            {item.name}
                                        </div>
                                        <div className={style.column}>
                                            {item.amount}
                                        </div>
                                        <div className={style.column}>
                                            {item.price}
                                        </div>
                                        <div className={style.column}>
                                            {item.costPrice}
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    </div>
                </div>
            <div>

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