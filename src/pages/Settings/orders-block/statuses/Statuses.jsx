import { List, Tag } from 'antd';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import Floatbutton from '@components/float-button/FloatButton';
import StatusModal from './StatusModal';

const Statuses = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([
    { id: '1', color: '#ff5252', title: 'Диагностика' },
    { id: '2', color: 'violet', title: 'Новый' },
    { id: '3', color: 'blue', title: 'В работе' },
    { id: '4', color: '#fca503', title: 'Ждет запчасть' },
    { id: '5', color: 'seagreen', title: 'Готов' },
    { id: '6', color: 'seagreen', title: 'Закрыт' },
    { id: '7', color: 'gray', title: 'Закрыт неуспешно' },
    { id: '8', color: 'yellow', title: 'На гарантии' },
  ]);

  const handlerModal = () => {
    setIsModalVisible(true);
  };


  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.id === active.id);
        const overIndex = previous.findIndex((i) => i.id === over?.id);
        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  return (
    <main id="main">
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <List
            style={{width: '50%'}}
            dataSource={dataSource}
            renderItem={(item) => (
              <SortableItem key={item.id} id={item.id}>
                <Tag color={item.color} style={{ fontSize: '15px', width: 'auto', height: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{item.title}</Tag>
              </SortableItem>
            )}
          />
        </SortableContext>
      </DndContext>
        <Floatbutton 
            text="Добавить статус" 
            onClick={handlerModal}
            icon={<PlusOutlined />} 
        />
        <StatusModal
          visible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
    </main>
  );
};

const SortableItem = ({ children, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  const style = {
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
    transition,
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    color: 'white',
    height: '3em',
    ...(isDragging ? { position: 'relative', zIndex: 1 } : {}),
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <MenuOutlined
        ref={setActivatorNodeRef}
        {...listeners}
        style={{ marginRight: '2em' }}
      />
      {children}
    </div>
  );
};

export default Statuses;
