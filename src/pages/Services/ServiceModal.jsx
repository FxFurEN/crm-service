import { Modal, Form, Input, Select, message, Flex, Button, InputNumber, Popconfirm } from 'antd';
import { crmAPI } from '@service/api';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

const ServiceModal = ({ visible, categories, handleOk, handleCancel, serviceData }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false); 

  useEffect(() => {
    if (visible && serviceData) {
      form.setFieldsValue({
        service: serviceData.service,
        category: serviceData.category,
        price: serviceData.price,
      });
    } else {
      form.resetFields();
    }
  }, [visible, serviceData, form]);

  const onFinish = (values) => {
    setConfirmLoading(true); 
    const serviceAction = serviceData ? crmAPI.updateService : crmAPI.createService;
    serviceAction(serviceData ? serviceData.id : null, values)
      .then((response) => {
        handleOk(response.data);
        
        form.resetFields();
        message.success(`Услуга успешно ${serviceData ? 'отредактирована' : 'добавлена'}`);
        handleCancel();
      })
      .catch(() => {
        message.error('Ошибка при выполнении операции');
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };
  

  const handleDelete = () => {
    setConfirmLoading(true);
    crmAPI.deleteService(serviceData.id)
      .then(() => {
        message.success('Услуга успешно удалена');
        handleOk();
        handleCancel();
      })
      .catch(() => {
        message.error('Ошибка при удалении услуги');
        setConfirmLoading(false);
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
      title={serviceData ? <span>
        Редактировать услугу
        <Popconfirm
          key="delete"
          title="Вы уверены, что хотите удалить эту услугу?"
          okText="Да"
          cancelText="Отмена"
          onConfirm={handleDelete}
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
      </span> : 'Добавить услугу'}
      open={visible}
      onOk={form.submit}
      onCancel={handleCancel}
      confirmLoading={confirmLoading} 
      footer={[
        <Button key="submit" style={{ ...baseStyle }} loading={confirmLoading} onClick={() => form.submit()}>
          {serviceData ? 'Редактировать' : 'Добавить'}
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
              min={0}
              max={1000}
              step={0.01}
              stringMode
            />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ServiceModal;
