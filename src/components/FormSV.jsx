import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const FormSV = ({ handleAddData }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        handleAddData(values);
        form.resetFields();
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Form validation failed:', error);
      });
  };

  return (
    <>
      <Button onClick={showModal}>Add</Button>
      <Modal
        title="Student"
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form}>
          <Form.Item label="FullName" name="fullName" rules={[{ required: true, message: 'Please input full name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="DayOfBirth" name="dateOfBirth" rules={[{ required: true, message: 'Please input date of birth!' }]}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Major" name="major" rules={[{ required: true, message: 'Please input major!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Avatar" name="avatar">
            <Input type="file" />
          </Form.Item>
          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender!' }]}>
            <Select>
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={handleOk}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FormSV;
