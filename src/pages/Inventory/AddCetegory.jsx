import { Modal,Space,Input } from 'antd';
import { useState } from 'react';

const InfoClients = ({ visible, handleOk, handleCancel, }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOkAsync = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            handleOk();
            setConfirmLoading(false);
        }, 2000);
    };

    const baseStyle = {
        width: 'clamp(200px, 100%, 500px)',
        height: 40,
      };
    return (
        <Modal
            title="Добавить категорию"
            centered
            open={visible}
            onOk={handleOkAsync}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[

            ]}
            >
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Input
                            style={{...baseStyle} }
                            placeholder="Название"
                        />
                </Space>
        </Modal>
               
        
    );
};

export default InfoClients;
