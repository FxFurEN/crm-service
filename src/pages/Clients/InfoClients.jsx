import { Modal, Table, Typography, Spin, List, Row, Col, Button, Popconfirm, message } from 'antd';
import { useState, useEffect } from 'react';
import { crmAPI } from '@service/api';
import dayjs from 'dayjs';
import EditClientModal from './EditClient'; 

const InfoClients = ({ visible, handleOk, handleCancel, client }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        if (client) {
            setLoading(true);
            crmAPI.getOrdersByClient(client.id)
                .then(response => {
                    setOrders(response.data);
                })
                .catch(error => {
                    message.error('Error fetching client orders:', error);
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

    const handleDeleteClient = () => {
        crmAPI.deleteClient(client.id)
            .then(() => {
                message.success('Клиент успешно удален');
                handleOk(client);
            })
            .catch(() => {
                message.error('Ошибка при удалении клиента');
            });
    };

    const handleEditClient = () => {
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
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
        <>
            <Modal
                title="Информация о клиенте"
                centered
                open={visible}
                onOk={handleOkAsync}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={[
                    <Popconfirm
                        key="delete"
                        title="Вы уверены, что хотите удалить этого клиента?"
                        onConfirm={handleDeleteClient}
                        okText="Да"
                        cancelText="Отмена"
                    >
                        <Button>Удалить клиента</Button>
                    </Popconfirm>,
                    <Button key="edit" type="primary" onClick={handleEditClient}>
                        Редактировать клиента
                    </Button>,
                ]}
                width={1000}
            >
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Typography.Text strong>Клиент</Typography.Text>
                        {loading ? (
                            <Spin />
                        ) : (
                            <>
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
                            <Typography.Text strong>Платежи</Typography.Text>
                            <List bordered />
                            </>
                            
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Typography.Text strong>Заказы</Typography.Text>
                        {loading ? (
                            <Spin />
                        ) : (
                            <Table dataSource={orders} columns={columns} pagination={false} />
                        )}
                        <br/>
                    </Col>
                </Row>
            </Modal>
            <EditClientModal
                visible={editModalVisible}
                client={client}
                handleOk={() => {
                    handleOk(client);
                    handleCloseEditModal();
                }}
                handleCancel={handleCloseEditModal}
            />
        </>
    );
};

export default InfoClients;
