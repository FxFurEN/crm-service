import { SmileOutlined } from '@ant-design/icons';
import { Modal, List, Typography, ConfigProvider, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { crmAPI } from '@service/api';
import dayjs from 'dayjs';

const InfoClients = ({ visible, handleOk, handleCancel, client }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (client) {
            setLoading(true);
            crmAPI.getOrdersByClient(client.id)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    console.error('Error fetching client orders:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [client]);

    if (!client) {
        return null;
    }

    const handleOkAsync = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            handleOk(client);
            setConfirmLoading(false);
        }, 2000);
    };

    const customizeRenderEmpty = () => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '8em',
          }}
        >
          <SmileOutlined
            style={{
              fontSize: 20,
            }}
          />
          <p>Данные не найдены</p>
        </div>
    );

    return (
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <Modal
                title="Информация о заказе"
                centered
                open={visible}
                onOk={handleOkAsync}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[]} 
            >
                <br/>
                <Typography.Text strong>Клиент</Typography.Text>
                <List
                    bordered
                    dataSource={[
                        { title: 'Имя', value: client.name },
                        { title: 'Телефон', value: client.phone },
                        { title: 'Почта', value: client.email },
                        { title: 'Тип клиента', value: client.clientType === '1' ? 'Физ. лицо' : 'Юр. лицо' },
                        { title: 'УНП', value: client.unp },
                        { title: 'ФИО', value: client.initials },
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text strong>{item.title}: </Typography.Text>{item.value}
                        </List.Item>
                    )}
                />
                <br/>
                <Typography.Text strong>Заказы</Typography.Text>
                {loading ? (
                    <Spin />
                ) : (
                    <List
                        bordered
                        dataSource={orders}
                        renderItem={(order) => (
                            <List.Item>
                                <Typography.Text>{order.service.name}</Typography.Text>
                                <Typography.Text>{dayjs(order.createdAt).format('DD.MM.YYYY')}</Typography.Text>
                            </List.Item>
                        )}
                    />
                )}
                <br/>
                <Typography.Text strong>Платежи</Typography.Text>
                <List bordered/>
            </Modal>
        </ConfigProvider>
    );
};

export default InfoClients;
