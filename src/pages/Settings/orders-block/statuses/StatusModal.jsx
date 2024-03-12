import { Modal, Typography, Space, Input, ColorPicker, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { crmAPI } from '@service/api';

const StatusModal = ({ visible, handleOk, handleCancel, selectedStage }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    if (selectedStage && selectedStage.id) {
      setName(selectedStage.name);
      setColor(selectedStage.color);
    } else {
      setName('');
      setColor('');
    }
  }, [selectedStage]);

  const handleOkAsync = () => {
    setConfirmLoading(true);
    const stageData = {
      name,
      color,
    };

    if (selectedStage && selectedStage.id) {
      crmAPI.updateStage(selectedStage.id, stageData)
        .then(() => {
          setConfirmLoading(false);
          handleOk();
          message.success('Этап успешно обновлен');
        })
        .catch((error) => {
          console.error('Error updating stage:', error);
          message.error('Не удалось обновить этап');
          setConfirmLoading(false);
        });
    } else {
      crmAPI.createStage(stageData)
        .then(() => {
          setConfirmLoading(false);
          handleOk();
          message.success('Этап успешно создан');
        })
        .catch((error) => {
          console.error('Error creating stage:', error);
          message.error('Не удалось создать этап');
          setConfirmLoading(false);
        });
    }
  };

  const handleColorChange = (color) => {
    setColor(color.toHexString());
  };

  return (
    <Modal
      title={`${selectedStage && selectedStage.id ? 'Редактировать' : 'Добавить'} этап`}
      centered
      open={visible}
      onOk={handleOkAsync}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={[
        <Button
          key="submit"
          loading={confirmLoading}
          onClick={handleOkAsync}
          style={{ width: 'clamp(200px, 100%, 500px)', height: 40 }}
        >
          {selectedStage && selectedStage.id ? 'Сохранить' : 'Добавить'}
        </Button>,
      ]}
    >
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        <br />
        <Input
          placeholder="Наименование"
          style={{ width: 'clamp(200px, 100%, 500px)', height: 40 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Typography.Text>Цвет</Typography.Text>
        <ColorPicker
          value={color}
          defaultValue={'white'}
          size="large"
          showText={(color) => <span>Цвет: ({color.toHexString()})</span>}
          onChange={handleColorChange}
        />
      </Space>
    </Modal>
  );
};

export default StatusModal;