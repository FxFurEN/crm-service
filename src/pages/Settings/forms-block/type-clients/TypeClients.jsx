import { List } from 'antd';
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
import { MenuOutlined } from '@ant-design/icons';

const TypeClients = () => {
  const [dataSource, setDataSource] = useState([
    { id: '1', title: 'Физ. лицо' },
    { id: '2', title: 'Юр. лицо' },
  ]);

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
            dataSource={dataSource}
            renderItem={(item) => (
              <SortableItem key={item.id} id={item.id}>
                {item.title} {/* Обычный текст вместо компонента Tag */}
              </SortableItem>
            )}
          />
        </SortableContext>
      </DndContext>
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
    width: '50%',
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
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

export default TypeClients;
