import { Modal, Button } from 'antd';

const InfoClients = ({ visible, onClose, client }) => {
    if (!client) {
        return null; 
    }

  return (
    <Modal
      title="Информация о заказе"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Закрыть
        </Button>,
      ]}
    >
      <p>Данные о заказе:</p>
      <p>Товар: {client.goods}</p>
      <p>Дата создания: {client.updateDate}</p>
      <p>Статус: {client.status}</p>
      <p>Клиент: {client.nameClient}</p>
      <p>Сотрудник: {client.employee}</p>
    </Modal>
  );
};

export default InfoClients;
