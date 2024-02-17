import { Modal, Button, Flex, Typography, Space, Select, Spin, List, Tag, Input, DatePicker, Checkbox} from 'antd';
import { useMemo, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';



const NewOrders = ({ visible, handleOk, handleCancel }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState([]);
  const handleOkAsync = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      handleOk();
      setConfirmLoading(false);
    }, 2000);
  };
  const baseStyle = {
    width: 'clamp(200px, 100%, 500px)',
    height: 40,
  };
  return (
    <Modal
      title="Добавить заказ"
      centered
      open={visible}
      onOk={handleOkAsync}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={1000}
      footer={[
        <Button key="submit" loading={confirmLoading} onClick={handleOkAsync} style={{...baseStyle, width: '100%'} }>
          Добавить
        </Button>,
      ]}
    >
        <Flex wrap="wrap" gap="large" direction="row">
          <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
            <Typography.Text strong>Клиент</Typography.Text>
                 <DebounceSelect
                     showSearch
                    value={value}
                    placeholder="Имя"
                    style={{...baseStyle} }
                    fetchOptions={fetchUserList}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
          </div>
          <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
            <Typography.Text strong>Информация о заказе</Typography.Text>
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Input
                            style={{...baseStyle} }
                            placeholder="Наименование услуги"
                        />
                    <DatePicker
                    placeholder="Дата проведения"
                    style={{...baseStyle} }/>
                    <Input
                            style={{...baseStyle} }
                            placeholder="Ориентированная стоимость"
                        />
                    <Input
                            style={{...baseStyle} }
                            placeholder="Заметки администрации"
                        />
                </Space>
          </div>
          <div style={{ flex: 1, minWidth: 200, maxWidth: '100%' }}>
            <Typography.Text strong>Дополнительно</Typography.Text>
                <Space direction="vertical" size="small" style={{ display: 'flex' }}>
                    <Input
                            style={{...baseStyle} }
                            placeholder="Исполнитель"
                        />
                    <Input
                            style={{...baseStyle} }
                            placeholder="Менеджер"
                        />
                   <DatePicker
                    placeholder="Срок"
                    defaultValue={dayjs('2024-03-01')}
                    style={{...baseStyle} }/>
                </Space>
           
          </div>
        </Flex>
    </Modal>
  );
};

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };
      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
      />
    );
}

async function fetchUserList(username) {
    console.log('fetching user', username);
    return fetch('https://randomuser.me/api/?results=5')
      .then((response) => response.json())
      .then((body) =>
        body.results.map((user) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        })),
      );
  }

export default NewOrders;
