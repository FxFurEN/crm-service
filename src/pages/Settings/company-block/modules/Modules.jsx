import { useDispatch, useSelector } from 'react-redux';
import { setVisibility, selectVisibility } from '@store/visibilitySlice';
import { useState } from 'react';

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

  return (
    <main id="main">
    </main>
  );
};

export default Modules;
