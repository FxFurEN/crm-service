import { List, Tag, message } from 'antd';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import Floatbutton from '@components/float-button/FloatButton';
import StatusModal from './StatusModal';
import { crmAPI } from '@service/api';

const Stages = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStage, setSelectedStage] = useState({});
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages = () => {
    crmAPI.getAllStages()
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error('Error fetching stages:', error);
        message.error('Ошибка при загрузке этапов');
      });
  };

  const handlerModal = () => {
    setSelectedStage({});
    setIsModalVisible(true);
  };

  const handleStageClick = (stage) => {
    setSelectedStage(stage);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    fetchStages();
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
            style={{ width: '50%' }}
            dataSource={dataSource}
            renderItem={(item) => (
              <SortableItem key={item.id} id={item.id}>
                <Tag
                  color={item.color}
                  style={{
                    fontSize: '15px',
                    width: 'auto',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer', 
                  }}
                  onClick={() => handleStageClick(item)}
                >
                  {item.name}
                </Tag>
              </SortableItem>
            )}
          />
        </SortableContext>
      </DndContext>
      <Floatbutton
        text="Добавить этап"
        onClick={handlerModal}
        icon={<PlusOutlined />}
      />
      <StatusModal
          visible={isModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          selectedStage={selectedStage} 
          selectedColor={selectedStage.color}
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

export default Stages;
