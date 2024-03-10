import { Modal, Form, Input, message, Button } from 'antd';
import { crmAPI } from '@service/api';
import { useState } from 'react';

const AddCategoryModal = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false); 

  const onFinish = (values) => {
    setConfirmLoading(true); 
    crmAPI.createCategory(values)
      .then((response) => {
        handleOk(response.data);
        form.resetFields();
        message.success('Категория успешно добавлена');
        handleCancel();
      })
      .catch((error) => {
        console.error('Error creating category:', error);
        message.error('Ошибка при добавлении категории');
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };

  return (
    <Modal
      centered
      title="Добавить категорию"
      open={visible}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading} 
      footer={[
        <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={() => form.submit()}>
            Добавить
        </Button>
    ]}
    >
      <Form form={form} onFinish={onFinish}    layout="vertical">
        <Form.Item
          name="category"
          label="Категория"
          rules={[{ required: true, message: 'Пожалуйста, введите название категории!' }]}
          style={{ marginBottom: -5 }} 
          
        >
          <Input
               style={{ ...baseStyle }}
               placeholder="Название категории" 
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
