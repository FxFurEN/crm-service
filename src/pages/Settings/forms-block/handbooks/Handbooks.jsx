import { EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    width: 500,
    key: 'name',
  },
  {
    title: 'Действие',
    key: 'operation',
    width: 100,
    render: (text, record) => ( 
      <Link to={`/settings/handbooks/${record.key}`}> 
        <EditOutlined />
      </Link>
    ),
  },
];

const data = [];
for (let i = 1; i < 5; i++) {
  data.push({
    key: i,
    name: `Справочник ${i}`,
  });
}

const Handbooks = () => {
  return (
    <main id="main">
      <Table columns={columns} dataSource={data} />
    </main>
  );
};

export default Handbooks;
