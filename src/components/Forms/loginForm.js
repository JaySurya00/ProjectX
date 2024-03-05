import { loginAction } from '@/app/actionForm';
import { Form, Button, Input, Modal, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/app/auth-context';

const LoginForm = ({ isLoginFormOpen, setLoginFormOpen, setRegistrationFormOpen }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { login } = useAuth();
    const handleSubmit = async (formData) => {
        const userData = await loginAction(formData);
        if (userData) {
            const { id, name } = userData;
            login({ userId: id, name });
            setLoginFormOpen(false);
        }
        else {
            messageApi.open({
                type: 'error',
                content: 'username or password incorrect'
            })
        }
    }
    const handleCancel = () => { setLoginFormOpen(false) };
    return (
        <Modal title={'SignIn'} open={isLoginFormOpen} onCancel={handleCancel} footer={null}>
            {contextHolder}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a onClick={() => {
                        setLoginFormOpen(false);
                        setRegistrationFormOpen(true);
                    }}>register now!</a>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LoginForm;