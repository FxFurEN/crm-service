import { useState } from 'react';
import { Modal, Input, Flex, Select, Button } from 'antd';

const NewClients = ({ visible, handleOk, handleCancel }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [clientData, setClientData] = useState({ name: '', phone: '', email: '', clientType: '' });

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
                <Button key="submit" style={{...baseStyle}} loading={confirmLoading} onClick={handleOkAsync}>
                  Добавить
                </Button>
              ]}
        >
            <Flex vertical gap={20}>
                <Input
                    style={{...baseStyle} }
                    placeholder="Имя"
                    value={clientData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <Input
                    style={{...baseStyle} }
                    placeholder="Телефон"
                    value={clientData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                />
                <Input
                    style={{...baseStyle} }
                    placeholder="Почта"
                    value={clientData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <Select
                    style={{...baseStyle}}
                    placeholder="Тип клиента"
                    onChange={handleChange}
                    options={[
                        { value: '1', label: 'Физ. лицо' },
                        { value: '2', label: 'Юр. лицо' },
                    ]}
                />
                <br/>
               
            </Flex>
            
        </Modal>
    );
};

export default NewClients;
