import { Modal, Form, Input, message, Button, Popconfirm } from 'antd';
import { crmAPI } from '@service/api';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const AddCategoryModal = ({ visible, handleOk, handleCancel, initialCategory }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false); 

  useEffect(() => {
    if (visible && initialCategory) {
      form.setFieldsValue({ category: initialCategory.name});
    }
  }, [visible, initialCategory, form]);

  const onFinish = (values) => {
    setConfirmLoading(true); 
    const requestData = initialCategory 
      ? { id: initialCategory.id, name: values.category }
      : { name: values.category };
  
    const request = initialCategory 
      ? crmAPI.updateCategory(initialCategory.id, requestData)
      : crmAPI.createCategory(values); 
  
    request
      .then((response) => {
        handleOk(response.data);
        form.resetFields();
        message.success(initialCategory ? 'Категория успешно обновлена' : 'Категория успешно добавлена');
        handleCancel();
      })
      .catch((error) => {
        console.error('Error creating/updating category:', error);
        message.error('Ошибка при добавлении/обновлении категории');
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
      title={initialCategory ?  <span>
        Редактирование категории

        <Popconfirm
            key="delete"
            title="Вы уверены, что хотите удалить этого клиента?"
            okText="Да"
            cancelText="Отмена"
        >
            <Button
            danger
            type="link"
            style={{ right: 50, position: 'absolute', marginTop: -8.5 }}
            icon={<DeleteOutlined />}
        >
            Удалить
        </Button>
        </Popconfirm>
        
    </span> : 'Добавить категорию'}
      open={visible}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading} 
      footer={[
        <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={() => form.submit()}>
            {initialCategory ? 'Сохранить' : 'Добавить'}
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
