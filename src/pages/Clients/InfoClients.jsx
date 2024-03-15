import { Modal, Table, Typography, Spin, List } from 'antd';
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

    const columns = [
        {
            title: 'Название услуги',
            dataIndex: 'service.name',
            key: 'serviceName',
            render: (text, record) => (
                <Typography.Text>{record.service.name}</Typography.Text>
            ),
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) => dayjs(createdAt).format('DD.MM.YYYY'),
        },
    ];
    const isIndividual = !client.sign;

    const clientFields = [
        { title: 'Тип клиента', value: isIndividual ? 'Физ. лицо' : 'Юр. лицо' },
        ...(isIndividual
            ? [{ title: 'ФИО', value: client.initials }]
            : [{ title: 'Имя', value: client.name }, { title: 'УНП', value: client.unp }])
    ];

    return (
            <Modal
                title="Информация о клиенте"
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
                    dataSource={clientFields}
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
                    <Table dataSource={orders} columns={columns} pagination={false} scroll={{ y: 100 }}/>
                )}
                <br/>
                <Typography.Text strong>Платежи</Typography.Text>
                <List bordered/>
            </Modal>
    );
};

export default InfoClients;
