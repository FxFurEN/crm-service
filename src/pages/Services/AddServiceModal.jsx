import { Modal, Form, Input, Select } from 'antd';
import { crmAPI } from '@service/api';

const { Option } = Select;

const AddServiceModal = ({ visible, categories, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    crmAPI.createService(values)
      .then((response) => {
        handleOk(response.data);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Error creating service:', error);
      });
  };

  return (
    <Modal
      title="Добавить услугу"
      visible={visible}
      onOk={form.submit}
      onCancel={handleCancel}
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
