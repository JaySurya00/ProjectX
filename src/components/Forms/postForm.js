import React from 'react';
import { Form, Button, Input, Modal, Select, message, DatePicker, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addPostAction } from '@/app/actionForm';
import {useDropzone} from 'react-dropzone'

const { Option } = Select;

const PostForm = ({ isPostFormOpen, setPostFormOpen }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const handleFinish = async (postData) => {
        const {title, description, releaseYear: year, img_url, postType, genre}=postData;
        await addPostAction({title, description, year:year.$y, img_url, postType, genre});
        setPostFormOpen(false);
        messageApi.success('Post Added');
    };

    const handleCancel = () => {
        setPostFormOpen(false);
    };

    return (
        <Modal title="Add Post" open={isPostFormOpen} onCancel={handleCancel} footer={null}>
            {contextHolder}
            <Form
                name="post-form"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 400, margin: 'auto' }}
                onFinish={handleFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Post Type"
                    name="postType"
                    rules={[{ required: true, message: 'Please select the Post type!' }]}
                >
                    <Select style={{ width: '100%' }}>
                        <Option value="Movie">Movie</Option>
                        <Option value="Anime">Anime</Option>
                        <Option value="TV">TV/OTT Series</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input the title!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Year of Release"
                    name="releaseYear"
                    rules={[{ required: true, message: 'Please select the year of release!' }]}
                >
                    <DatePicker picker="year" style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the short description of film' }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Genre"
                    name="genre"
                    rules={[{ required: true, message: 'Please select the genre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Poster Image URL"
                    name="img_url"
                    rules={[{ required: true, message: 'Please input the image URL!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default PostForm;
