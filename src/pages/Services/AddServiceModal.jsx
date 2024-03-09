import { Modal, Form, Input, Select, message } from 'antd';
import { crmAPI } from '@service/api';
import { useState } from 'react';

const { Option } = Select;

const AddServiceModal = ({ visible, categories, handleOk, handleCancel }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false); 

  const onFinish = (values) => {
    setConfirmLoading(true); 
    crmAPI.createService(values)
      .then((response) => {
        handleOk(response.data);
        form.resetFields();
        message.success('Услуга успешно добавлена');
        handleCancel();
      })
      .catch((error) => {
        console.error('Error creating service:', error);
        message.error('Ошибка при добавлении услуги');
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  return (
    <Modal
      title="Добавить услугу"
      open={visible}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading} 
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="service"
          label="Название услуги"
          rules={[{ required: true, message: 'Пожалуйста, введите название услуги!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label="Категория"
          rules={[{ required: true, message: 'Пожалуйста, выберите категорию услуги!' }]}
        >
          <Select>
            {categories.map((category, index) => (
              <Option key={index} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="price"
          label="Цена"
          rules={[{ required: true, message: 'Пожалуйста, введите цену услуги!' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddServiceModal;
