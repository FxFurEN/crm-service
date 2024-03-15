import { Modal, List, Typography, Table, Flex, Tag } from 'antd';
import { useState } from 'react';

const InfoOrders = ({ visible, handleOk, handleCancel, order }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  if (!order) {
    return null;
  }

  const handleOkAsync = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleOk(order);
      setConfirmLoading(false);
    }, 2000);
  };

  const columns = [
    {
      title: 'Наименование',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Значение',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const data = [
    { title: 'Товар', value: order.goods },
    { title: 'Дата создания', value: order.updateDate },
    { title: 'Статус', value: <Tag>{order.status}</Tag> },
  ];
  const dataClient = [
    { title: 'Клиент', value: order.nameClient },
    { title: 'Телефон', value: order.phoneClient },
    { title: 'Почта', value: order.emailClient },
  ];
  const dataAdditional = [
    { title: 'Тип заказа', value: order.typeOrder },
    { title: 'Менеджер', value: order.menager },
    { title: 'Исполнить', value: order.performer },
    { title: 'Срок', value: order.deadLine },
  ];
  const historyData = [
    { title: 'Изменение 1', date: '2024-02-14', description: 'Описание изменения 1' },
    { title: 'Изменение 2', date: '2024-02-15', description: 'Описание изменения 2' },
  ];

  return (
      <Modal
        title={`Заказ № ${order?.number}`}
        centered
        open={visible}
        onOk={handleOkAsync}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={[]}
      >
        <Typography.Text strong>Товары и услуги</Typography.Text>
        <Table columns={columns} dataSource={[]} bordered />
        <br />
        <Typography.Text strong>Платежи</Typography.Text>
        <Table columns={columns} dataSource={[]} bordered />
        <br />
        <Flex wrap="wrap" gap="large" direction="row">
          <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
            <Typography.Text strong>Информация о заказе</Typography.Text>
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text strong>{item.title}: </Typography.Text>
                  {item.value}
                </List.Item>
              )}
            />
          </div>
          <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
            <Typography.Text strong>Клиент</Typography.Text>
            <List
              dataSource={dataClient}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text strong>{item.title}: </Typography.Text>
                  {item.value}
                </List.Item>
              )}
            />
          </div>
          <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
            <Typography.Text strong>Дополнительно</Typography.Text>
            <List
              dataSource={dataAdditional}
              renderItem={(item) => (
                <List.Item>
                  <Typography.Text strong>{item.title}: </Typography.Text>
                  {item.value}
                </List.Item>
              )}
            />
          </div>
        </Flex>
        <div>
          <Typography.Title level={3}>История изменений</Typography.Title>
          <List
            bordered
            dataSource={historyData}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text strong>{item.title}:</Typography.Text> {item.date} - {item.description}
              </List.Item>
            )}
          />
        </div>
      </Modal>

  );
};

export default InfoOrders;
