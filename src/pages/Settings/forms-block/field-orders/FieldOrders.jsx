import { MenuOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React, { useState } from 'react';
import { Table } from 'antd';
const columns = [
  {
    key: 'sort',
  },
  {
    title: 'Название',
    dataIndex: 'name',
  },
  {
    title: 'Тип',
    dataIndex: 'type',
    responsive: ['md'],
  },
  {
    title: 'Справочник',
    dataIndex: 'handbook',
    responsive: ['md'],
  },
  {
    title: 'Обязательное',
    dataIndex: 'required',
    responsive: ['md'],
  },
];
const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    ),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};


const FieldOrders = () =>{
    const [dataSource, setDataSource] = useState([
        {
          key: '1',
          name: 'Тип процедуры',
          type: 'Однострочный поле',
          handbook: '-',
          required: 'Нет',
        },
        {
            key: '2',
            name: 'Наименование услуги',
            type: 'Однострочный поле',
            handbook: '-',
            required: 'Нет',
        },
        {
            key: '3',
            name: 'Ориентированная цена',
            type: 'Однострочный поле',
            handbook: '-',
            required: 'Нет',
        },
      ]);
      const onDragEnd = ({ active, over }) => {
        if (active.id !== over?.id) {
          setDataSource((previous) => {
            const activeIndex = previous.findIndex((i) => i.key === active.id);
            const overIndex = previous.findIndex((i) => i.key === over?.id);
            return arrayMove(previous, activeIndex, overIndex);
          });
        }
      };

    return(
        <main id="main">
            <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                    // rowKey array
                    items={dataSource.map((i) => i.key)}
                    strategy={verticalListSortingStrategy}
                >
                    <Table
                    components={{
                        body: {
                        row: Row,
                        },
                    }}
                    rowKey="key"
                    columns={columns}
                    dataSource={dataSource}
                    />
                </SortableContext>
                </DndContext>
        </main>
    )
}

export default FieldOrders