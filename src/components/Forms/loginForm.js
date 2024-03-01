import { loginAction } from '@/app/actionForm';
import { Form, Button, Input, Modal, message } from 'antd';
import { useAuth } from '@/app/auth-context';


const LoginForm = ({ isLoginFormOpen, setLoginFormOpen, setRegistrationFormOpen }) => {
    const [ messageApi, contextHolder ]= message.useMessage();
    const {login}= useAuth();
    const handleSubmit = async (formData) => {
        const userData= await loginAction(formData);
        if(userData)
        {
            const {id, name}= userData;
            login({userId: id, name});
            setLoginFormOpen(false);
        }
        else
        {
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
                name="login-form"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
                    Submit
                </Button>
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button onClick={()=>{
                    setRegistrationFormOpen(true);
                    setLoginFormOpen(false);
                    }}>
                    Create New Account
                </Button>
            </Form>
        </Modal>
    )
}

export default LoginForm;