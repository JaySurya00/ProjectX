// RegistrationForm.js
import React from 'react';
import { Form, Button, Input, Modal, message } from 'antd';
import { registrationAction } from '@/app/actionForm';
import { useAuth } from '@/app/auth-context';

const RegistrationForm = ({ isRegistrationFormOpen, setRegistrationFormOpen }) => {
    const { login } = useAuth();
    const [messageApi, contextHolder] = message.useMessage();
    const handleFinish = async (values) => {
        try {
            const {user, error} = JSON.parse(await registrationAction(values));
            if(error)
            {
                return messageApi.error('Username already in use');
            }
            const { _id: id, firstName, lastName } = user;
            login({ id: id.toString(), name: firstName + ' ' + lastName });
            setRegistrationFormOpen(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    const handleCancel = () => {
        setRegistrationFormOpen(false);
    };

    return (
        <>
            {contextHolder}
            <Modal title="Create New Account" open={isRegistrationFormOpen} onCancel={handleCancel} footer={null}>
                <Form
                    name="registration-form"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={handleFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                            Register
                        </Button>
                        <Button onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default RegistrationForm;
