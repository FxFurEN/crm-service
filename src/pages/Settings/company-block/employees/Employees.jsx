import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { crmAPI } from '@service/api';
import Floatbutton from '@components/float-button/FloatButton';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import EmployeesModal from './EmployeesModal';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [positions, setPositions] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchPositions();
  }, []);

  const fetchEmployees = () => {
    crmAPI.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(() => {
        message.error('Ошибка при загрузке сотрудников');
      });
  };

  const fetchPositions = () => {
    crmAPI.getAllPositions()
      .then((response) => {
        setPositions(response.data);
      })
      .catch(() => {
        message.error('Ошибка при загрузке должностей');
      });
  };

  const handleSaveEmployee = async (values) => {
    try {
      setConfirmLoading(true);
      if (employee) {
        await crmAPI.updateEmployee(employee.id, values);
        message.success('Сотрудник успешно отредактирован');
      } else {
        await crmAPI.createEmployee(values);
        message.success('Сотрудник успешно добавлен');
      }
      setModalVisible(false);
      fetchEmployees();
    } catch (error) {
      message.error('Ошибка при сохранении сотрудника');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await crmAPI.deleteEmployee(employeeId);
      message.success('Сотрудник успешно удален');
      fetchEmployees();
    } catch (error) {
      message.error('Ошибка при удалении сотрудника');
    }
  };

  const handleEditEmployee = (employee) => {
    setEmployee(employee);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEmployee(null);
  };

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'initials',
      key: 'initials',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Должность',
      dataIndex: ['position', 'name'],
      key: 'position',
    },
    {
      title: 'Действия',
      key: 'action',
      render: (text, record) => (
        <Button type="link" onClick={() => handleEditEmployee(record)}>
          <EditOutlined /> Редактировать
        </Button>
      ),
    },
  ];

  return (
    <main id="main">
      <Floatbutton onClick={() => setModalVisible(true)} text="Добавить сотрудника" icon={<PlusOutlined />}>
        Добавить сотрудника
      </Floatbutton>
      <EmployeesModal
        visible={modalVisible}
        handleCancel={handleCancel}
        handleSave={handleSaveEmployee}
        handleDelete={handleDeleteEmployee}
        employee={employee}
        positions={positions}
      />
      <Table columns={columns} dataSource={employees} />
    </main>
  );
};

export default Employees;
