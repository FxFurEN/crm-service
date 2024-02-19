import { Modal, Button,Typography } from 'antd';
import { useState } from 'react';

const InfoInventory = ({ visible, handleOk, handleCancel, item }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOkAsync = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            handleOk(item);
            setConfirmLoading(false);
        }, 2000);
    };

    if (!item) {
        return null; // Если информация о товаре не передана, просто вернем null
    }

    return (
        <Modal
            title="Информация о товаре"
            centered
            visible={visible}
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOkAsync}>
                    OK
                </Button>,
            ]}
        >
            <br />
            <Typography.Text strong>Артикул: </Typography.Text>{item.article}
            <br />
            <Typography.Text strong>Товар: </Typography.Text>{item.good}
            <br />
            <Typography.Text strong>Количество: </Typography.Text>{item.amount}
        </Modal>
    );
};

export default InfoInventory;
