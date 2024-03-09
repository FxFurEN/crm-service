import { Modal, Form, Input, message } from 'antd';
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

  return (
    <Modal
      title="Добавить категорию"
      open={visible}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading} 
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="category"
          label="Категория"
          rules={[{ required: true, message: 'Пожалуйста, введите название категории!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
