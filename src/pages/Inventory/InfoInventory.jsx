import { Modal, Button,Typography, List } from 'antd';
import { useState } from 'react';

const historyData = [
    { title: 'Изменение 1', date: '2024-02-14', description: 'Описание изменения 1' },
    { title: 'Изменение 2', date: '2024-02-15', description: 'Описание изменения 2' },
  ];

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
            title={item?.good}
            centered
            open={visible}
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[

            ]}
        >
            <br/>
                    <Typography.Text strong>Информация</Typography.Text>
            <List
                bordered
                dataSource={[
                    { title: 'Артикул', value: item.article },
                    { title: 'Категория', value: '' },
                    { title: 'Количество', value: item.amount },
                    { title: 'Цена', value: '' },
                    { title: 'Примечание', value: '' },
                ]}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text strong>{item.title}: </Typography.Text>{item.value}
                    </List.Item>
                )}
            />
            <br/>
                <Typography.Text strong>История</Typography.Text>
            <List
                bordered
                dataSource={historyData}
                renderItem={(item) => (
                <List.Item>
                    <Typography.Text strong>{item.title}:</Typography.Text> {item.date} - {item.description}
                </List.Item>
                )}
            />
        </Modal>
    );
};

export default InfoInventory;
