import { SmileOutlined } from '@ant-design/icons';
import { Modal, Button, List, Typography, ConfigProvider } from 'antd';
import { useState } from 'react';

const InfoClients = ({ visible, handleOk, handleCancel, client }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [customize] = useState(true);

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
        <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
                <Modal
                    title="Информация о заказе"
                    centered
                    open={visible}
                    onOk={handleOkAsync}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    footer={[

                    ]}
                >
                    <br/>
                    <Typography.Text strong>Клиент</Typography.Text>
                    <List
                        bordered
                        dataSource={[
                            { title: 'Имя', value: client.name },
                            { title: 'Телефон', value: client.phone },
                            { title: 'Почта', value: client.email },
                            { title: 'Тип клиента', value: client.clientType === '1' ? 'Физ. лицо' : 'Юр. лицо' }
                        ]}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text strong>{item.title}: </Typography.Text>{item.value}
                            </List.Item>
                        )}
                    />
                    <br/>
                    <Typography.Text strong>Заказы</Typography.Text>
                    <List bordered />
                    <br/>
                    <Typography.Text strong>Платежи</Typography.Text>
                    <List bordered/>
                </Modal>
        </ConfigProvider>
        
    );
};

export default InfoClients;
