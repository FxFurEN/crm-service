import { Modal, Button } from 'antd';
import { useState } from 'react';

const NewOrders = ({ visible, handleOk, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOkAsync = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleOk();
      setConfirmLoading(false);
    }, 2000);
  };

  return (
    <Modal
      title="Добавить заказ"
      centered
      open={visible}
      onOk={handleOkAsync}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" loading={confirmLoading} onClick={handleOkAsync}>
          Добавить
        </Button>,
      ]}
    >
    </Modal>
  );
};

export default NewOrders;
