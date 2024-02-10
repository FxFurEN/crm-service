import {  Table } from 'antd';
const columns = [
  {
    title: 'ФИО',
    dataIndex: 'name',
  },
  {
    title: 'Должность',
    dataIndex: 'doljnost',
  },
  {
    title: 'Почта',
    dataIndex: 'email',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    doljnost: 'Администратор',
    email: '123@gmail.com',
  },
  {
    key: '2',
    name: 'Jim Green',
    doljnost: 'Менеджер',
    email: '123@gmail.com',
  },
  {
    key: '3',
    name: 'Joe Black',
    doljnost: 'Менеджер',
    email: '123@gmail.com',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};

const Employees = () =>{
    return(
        <main id="main">   
            <Table
                rowSelection={{
                type: 'checkbox',
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
            />         
        </main>
    )
}

export default Employees