import { Modal, Form, Input } from 'antd';
import { crmAPI } from '@service/api';

const AddCategoryModal = ({ visible, handleOk, handleCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    crmAPI.createCategory(values)
      .then((response) => {
        handleOk(response.data);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Error creating category:', error);
      });
  };

  return (
    <Modal
      title="Добавить категорию"
      visible={visible}
      onOk={form.submit}
      onCancel={handleCancel}
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
