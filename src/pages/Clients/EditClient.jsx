import { Modal, Input, Form, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { crmAPI } from '@service/api';

const EditClient = ({ visible, client, handleOk, handleCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && client) {
            form.setFieldsValue(client);
        }
    }, [visible, client, form]);

    const handleOkAsync = async () => {
        try {
            await form.validateFields();
            setConfirmLoading(true);
            const values = await form.getFieldsValue();
            await crmAPI.updateClient(client.id, values);
            message.success('Данные клиента успешно обновлены');
            handleOk();
        } catch (error) {
            message.error('Ошибка при обновлении данных клиента');
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleCancelClick = () => {
        form.resetFields();
        handleCancel();
    };

    const baseStyle = {
        width: 'clamp(200px, 100%, 500px)',
        height: 40,
    };

    return (
        <Modal
            title="Редактировать клиента"
            centered
            open={visible}
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancelClick}
            footer={[
                <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={handleOkAsync}>
                    Сохранить
                </Button>
            ]}
        >
            <Form form={form} layout="vertical">
                {client && (
                    <>
                        {client.sign ? (
                            <>
                                <Form.Item name="name" label="Название организации" rules={[{ required: true, message: 'Введите название организации' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введите номер телефона' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email" label="Почта" rules={[{ type: 'email', message: 'Введите корректный email' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="unp" label="УНП">
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item name="initials" label="Имя" rules={[{ required: true, message: 'Введите имя клиента' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введите номер телефона' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name="email" label="Почта" rules={[{ type: 'email', message: 'Введите корректный email' }]}>
                                    <Input />
                                </Form.Item>
                            </>
                        )}
                    </>
                )}
            </Form>
        </Modal>
    );
};

export default EditClient;
