import { Modal, Button } from 'antd';
import { useState } from 'react';

const InfoClients = ({ visible, handleOk, handleCancel, client }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

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

    const baseStyle = {
        width: 'clamp(200px, 100%, 500px)',
        height: 40,
    };

    return (
        <Modal
            title="Информация о заказе"
            centered
            open={visible}
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={handleOkAsync}>
                    Изменить
                </Button>
            ]}
        >
            <p>Имя: {client.name}</p>
            <p>Телефон: {client.phone}</p>
            <p>Почта: {client.email}</p>
            <p>Тип клиента: {client.clientType === '1' ? 'Физ. лицо' : 'Юр. лицо'}</p>
        </Modal>
    );
};

export default InfoClients;
