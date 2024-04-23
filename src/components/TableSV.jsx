import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space } from 'antd';
import FormSV from './FormSV';

const { Option } = Select;

const TableSV = () => {
  const [dataSource, setDataSource] = useState(data);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState(null); 

  const handleView = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const handleDelete = (record) => {
    const newData = dataSource.filter(item => item.id !== record.id);
    setDataSource(newData);
  };

  const handleUpdate = (record) => {
    setUpdateData(record); 
    setModalVisible(true);
  };

  const handleAddData = (data) => {
    const newData = [...dataSource, { ...data, id: dataSource.length + 1 }];
    setDataSource(newData);
  };
  const handleFormReset = () => {
    setUpdateData(null); 
  };
  const columns = [
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Date of Birth', dataIndex: 'dateOfBirth', key: 'dateOfBirth' },
    { title: 'Major', dataIndex: 'major', key: 'major' },
    { title: 'Avatar', dataIndex: 'avatar', key: 'avatar', render: (avatar) => <img src={avatar} alt="Avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleView(record)}>View</Button>
          <Button type="link" onClick={() => handleDelete(record)}>Delete</Button>
          <Button type="link" onClick={() => handleUpdate(record)}>Update</Button> 
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
      <FormSV handleAddData={handleAddData} handleFormReset={handleFormReset}/>
      <Modal
        title={updateData ? "Update Student" : "View Student"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {updateData ? (
          <UpdateForm
            initialValues={updateData}
            handleUpdate={(updatedData) => {
              const newData = dataSource.map(item => item.id === updatedData.id ? updatedData : item);
              setDataSource(newData);
              setModalVisible(false);
            }}
          />
        ) : ( 
          selectedRecord && (
            <div>
              <p>Full Name: {selectedRecord.fullName}</p>
              <p>Date of Birth: {selectedRecord.dateOfBirth}</p>
              <p>Major: {selectedRecord.major}</p>
              <p>Gender: {selectedRecord.gender}</p>
              <p>Avatar: <img src={selectedRecord.avatar} alt="Avatar" style={{ width: '100px', height: '100px' }} /></p>
            </div>
          )
        )}
        
      </Modal>
    </div>
  );
};

const UpdateForm = ({ initialValues, handleUpdate }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        handleUpdate({ ...initialValues, ...values }); 
      })
      .catch(error => {
        console.error('Form validation failed:', error);
      });
  };
  return (
    <Form form={form} initialValues={initialValues}>
      <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please input full name!' }]}>
        <Input />
      </Form.Item>
      {/* <Form.Item label="Date of Birth" name="dateOfBirth" rules={[{ required: true, message: 'Please input date of birth!' }]}>
        <DatePicker />
      </Form.Item> */}
      <Form.Item label="Major" name="major" rules={[{ required: true, message: 'Please input major!' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Avatar" key="avatar">
        <Input />
      </Form.Item>
      <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender!' }]}>
        <Select>
          <Option value="Nam">Nam</Option>
          <Option value="Nữ">Nữ</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleOk}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

const data = [
  {
    id: 1,
    fullName: 'John Brown',
    dateOfBirth: '2002-09-12',
    major: 'CNTT',
    avatar: '',
    gender: 'Nữ',
  },
  {
    id: 2,
    fullName: 'Tuan Cuong',
    dateOfBirth: '2000-05-15',
    major: 'CNTT',
    avatar: '',
    gender: 'Nam',
  },
  {
    id: 3,
    fullName: 'Cong Dai',
    dateOfBirth: '2001-11-20',
    major: 'CNTT',
    avatar: '',
    gender: 'Nam',
  },
];

export default TableSV;
