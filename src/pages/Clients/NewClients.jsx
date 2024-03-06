import { useState } from 'react';
import { Modal, Input, Flex, Button, Radio } from 'antd';
import InputMask from 'react-input-mask';

const NewClients = ({ visible, handleOk, handleCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [clientData, setClientData] = useState({ name: '', phone: '', email: '', initials: '' });
    const [isLegalEntity, setIsLegalEntity] = useState(false); 

    const handleOkAsync = () => {
        setConfirmLoading(true);
        setTimeout(() => { 
            handleOk(clientData); 
            setConfirmLoading(false);
        }, 2000);
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
            open={visible}
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={handleOkAsync}>
                    Добавить
                </Button>
            ]}
        >
            <Flex vertical gap={20}>
                <Flex horizontal>
                    <Radio.Group onChange={(e) => setIsLegalEntity(e.target.value)} value={isLegalEntity}>
                        <Radio value={false}>Физ. лицо</Radio>
                        <Radio value={true}>Юр.лицо</Radio>
                    </Radio.Group>
                </Flex>
                {isLegalEntity ? (
                    <>
                        <Input
                            style={{ ...baseStyle }}
                            placeholder="Название организации"
                            value={clientData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                        />
                        <Input
                            count={{
                                show: true,
                                max: 9,
                              }}
                            maxLength={9}
                            style={{ ...baseStyle }}
                            placeholder="УНП"
                            value={clientData.inn}
                            onChange={(e) => handleChange('inn', e.target.value)}
                        />
                    </>
                ) : (
                    <Input
                        style={{ ...baseStyle }}
                        placeholder="ФИО"
                        value={clientData.initials}
                        onChange={(e) => handleChange('initials', e.target.value)}
                    />
                )}
                <InputMask
                    mask="+375 (99) 999-99-99"
                    value={clientData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                >
                    {(inputProps) => <Input {...inputProps} style={{ ...baseStyle }} placeholder="Телефон" />}
                </InputMask>
                <Input
                    style={{ ...baseStyle }}
                    placeholder="Почта"
                    value={clientData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
            </Flex>
        </Modal>
    );
};

export default NewClients;
