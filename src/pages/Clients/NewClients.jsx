import { useState } from 'react';
import { Modal, Input, Flex, Button, Radio, Form, message } from 'antd';
import MaskedInput from 'antd-mask-input';
import { crmAPI } from '@service/api'; 

const NewClients = ({ visible, handleOk, handleCancel }) => {
    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [clientData, setClientData] = useState({ name: '', phone: '', email: '', initials: '', unp: '', isLegalEntity: false });

    const handleOkAsync = async () => {
        try {
            await form.validateFields();
            setConfirmLoading(true);
            await crmAPI.createClient(clientData); 
            message.success('Клиент успешно добавлен'); 
            handleOk(clientData);
        } catch (errorInfo) {
            console.error('Error creating client:', errorInfo);
            message.error('Пожалуйста, заполните обязательные поля.');
        } finally {
            setConfirmLoading(false);
        }
    };

    const baseStyle = {
        width: 'clamp(200px, 100%, 500px)',
        height: 40,
    };

    const handleChange = (field, value) => {
        setClientData({ ...clientData, [field]: value });
    };

    return (
        <Modal
            title="Добавить клиента"
            centered
            visible={visible} // Change 'open' to 'visible'
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={handleOkAsync}>
                    Добавить
                </Button>
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleOkAsync}
            >
                <Flex vertical gap={5}>
                    <Flex horizontal>
                        <Radio.Group onChange={(e) => {
                            handleChange('isLegalEntity', e.target.value);
                            form.resetFields(['name', 'unp', 'initials']);
                        }} value={clientData.isLegalEntity}>
                            <Radio value={false}>Физ. лицо</Radio>
                            <Radio value={true}>Юр.лицо</Radio>
                        </Radio.Group>
                    </Flex>
                    {clientData.isLegalEntity ? (
                        <>
                            <Form.Item
                                name="name"
                                label="Название организации"
                                rules={[{ required: true, message: 'Пожалуйста, введите название организации' }]}
                                style={{ marginBottom: -5 }} 
                            >
                                <Input
                                    style={{ ...baseStyle }}
                                    placeholder="Название организации"
                                    value={clientData.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="unp"
                                label="УНП"
                                rules={[{ required: true, message: 'Пожалуйста, введите УНП' }]}
                                style={{ marginBottom: -5 }} 
                            >
                                <Input
                                    style={{ ...baseStyle }}
                                    placeholder="УНП"
                                    value={clientData.unp}
                                    onChange={(e) => handleChange('unp', e.target.value)}
                                    maxLength={9}
                                />
                            </Form.Item>
                        </>
                    ) : (
                        <Form.Item
                            name="initials"
                            label="ФИО"
                            rules={[{ required: true, message: 'Пожалуйста, введите ФИО' }]}
                            style={{ marginBottom: -5 }} 
                        >
                            <Input
                                style={{ ...baseStyle }}
                                placeholder="ФИО"
                                value={clientData.initials}
                                onChange={(e) => handleChange('initials', e.target.value)}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                    label="Телефон"
                    name="phone"
                    initialValue={clientData.phone}
                    rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
                    >
                    <MaskedInput
                        mask="+375 (00) 000-00-00"
                        onChange={(e) => handleChange('phone', e.target.value)}
                        style={{ width: '100%' }}
                        placeholder="Телефон"
                    />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Почта" 
                    >
                        <Input
                            style={{ ...baseStyle }}
                            placeholder="Почта"
                            value={clientData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    );
};

export default NewClients;
