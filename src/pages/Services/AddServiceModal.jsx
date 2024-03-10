import { Modal, Form, Input, Select, message, Flex, Button, InputNumber } from 'antd';
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

  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };

  return (
    <Modal
      title="Добавить услугу"
      centered
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
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Flex vertical gap={5}>
          <Form.Item
              name="service"
              label="Услуга"
              rules={[{ required: true, message: 'Пожалуйста, введите название услуги!' }]}
              style={{ marginBottom: -5 }} 
            >
              <Input 
               style={{ ...baseStyle }}
               placeholder="Название услуги"
              />
            </Form.Item>
            <Form.Item
              name="category"
              label="Категория"
              rules={[{ required: true, message: 'Пожалуйста, выберите категорию услуги!' }]}
              style={{ marginBottom: -5 }} 
            >
              <Select
                style={{ ...baseStyle }}
              >
                {categories.map((category, index) => (
                  <Option key={index} value={category.name}>{category.name}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="price"
              label="Цена"
              rules={[{ required: true, message: 'Пожалуйста, введите цену услуги!' }]}
              style={{ marginBottom: -5 }} 
            >
               <InputNumber
                  style={{ ...baseStyle }}
                  placeholder="Цена услуги"
                  min="0"
                  max="1000"
                  step="0.01"
                  stringMode
              />
            </Form.Item>
        </Flex>
        
      </Form>
    </Modal>
  );
};

export default AddServiceModal;
