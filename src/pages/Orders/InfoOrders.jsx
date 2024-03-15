import { Modal, List, Typography, Table, Flex, Tag, Row, Col } from 'antd';
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
    { title: 'Услуга', value: order.service },
    { title: 'Дата создания', value: order.createdAt },
    { title: 'Статус', value: <Tag>пока нету</Tag> },
  ];
  const dataClient = [
    { title: 'Клиент', value: order.client },
    { title: 'Телефон', value: order.client },
    { title: 'Почта', value: order.client },
  ];
  const dataAdditional = [
    { title: 'Сотрудник', value: order.employee },
    { title: 'Срок', value: order.leadTime },
    { title: 'Комментарий к заказу', value: order.comments },
  ];
  const historyData = [
    { title: 'Изменение 1', date: '2024-02-14', description: 'Описание изменения 1' },
    { title: 'Изменение 2', date: '2024-02-15', description: 'Описание изменения 2' },
    { title: 'Изменение 3', date: '2024-02-14', description: 'Описание изменения 3' },
    { title: 'Изменение 4', date: '2024-02-15', description: 'Описание изменения 4' },
    { title: 'Изменение 5', date: '2024-02-14', description: 'Описание изменения 5' },
    { title: 'Изменение 6', date: '2024-02-15', description: 'Описание изменения 6' },
    { title: 'Изменение 7', date: '2024-02-15', description: 'Описание изменения 7' },
    { title: 'Изменение 8', date: '2024-02-15', description: 'Описание изменения 8' },
    { title: 'Изменение 9', date: '2024-02-15', description: 'Описание изменения 9' },
    { title: 'Изменение 10', date: '2024-02-15', description: 'Описание изменения 10' },
    { title: 'Изменение 11', date: '2024-02-15', description: 'Описание изменения 11' },
  ];

  return (
      <Modal
        title={`Заказ № ${order.key}`}
        centered
        open={visible}
        onOk={handleOkAsync}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={[]}
      >
        
        <Row gutter={[20, 20]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                  style={{ maxHeight: '40em', overflowY: 'auto' }}
                />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
                  <Typography.Title level={3}>Информация о заказе</Typography.Title>
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
                  <Typography.Title level={3}>Клиент</Typography.Title>
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
                  <Typography.Title level={3}>Дополнительно</Typography.Title>
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
            </Col>
        </Row>
      </Modal>

  );
};

export default InfoOrders;
