import { useDispatch, useSelector } from 'react-redux';
import { setVisibility, selectVisibility } from '@store/visibilitySlice';
import { useState } from 'react';
import { Flex, Switch } from 'antd';

const Modules = () => {
  const dispatch = useDispatch();
  const { isSkladVisible, isMagazinVisible, isOrdersVisible } = useSelector(selectVisibility);

  // Временное состояние, которое будет обновляться по мере изменения тумблеров
  const [tempVisibility, setTempVisibility] = useState({
    isSkladVisible,
    isMagazinVisible,
    isOrdersVisible,
  });

  // Обработчики изменения тумблеров
  const handleSkladToggle = () => {
    setTempVisibility(prev => ({ ...prev, isSkladVisible: !prev.isSkladVisible }));
  };

  const handleMagazinToggle = () => {
    setTempVisibility(prev => ({ ...prev, isMagazinVisible: !prev.isMagazinVisible }));
  };

  const handleOrdersToggle = () => {
    setTempVisibility(prev => ({ ...prev, isOrdersVisible: !prev.isOrdersVisible }));
  };

  // Обработчик сохранения
  const handleSaveClick = () => {
    dispatch(setVisibility(tempVisibility));
  };
  const switchStyle = {
    width: 'clamp(20px, 100%, 50px)',
  };
       

  return (
    <main id="main">
            <Flex gap="middle" vertical justify="center" align='center'>
            <p>Заказы</p><Switch defaultChecked  style={{...switchStyle}}/> 
            <p>Магазин</p><Switch defaultChecked  style={{...switchStyle}}/>
            <p>Склад</p> <Switch defaultChecked  style={{...switchStyle}}/>

            </Flex>
       
    </main>
  );
};

export default Modules;
