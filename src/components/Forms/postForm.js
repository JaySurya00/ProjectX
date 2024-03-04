import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select, message, DatePicker, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { addPostAction } from '@/app/actionForm';
import { useRouter } from 'next/navigation'

const { Option } = Select;


const PostForm = ({ isPostFormOpen, setPostFormOpen }) => {
    const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    const router = useRouter();
    const [postType, setPostType] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const handleFinish = async (postData) => {
        const { title, description, releaseYear: year, img_url, postType, genre } = postData;
        await addPostAction({ title, description, year: year.$y, img_url, postType, genre });
        setPostFormOpen(false);
        messageApi.success('Post Added');
        setPostType('');
        router.refresh();
    };

    const handleCancel = () => {
        setPostFormOpen(false);
    };

    return (
        <Modal forceRender title="Add Post" open={isPostFormOpen} onCancel={handleCancel} footer={null}>
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
                    <Select style={{ width: '100%' }} onChange={(value) => setPostType(value)}>
                        <Option value="Movie">Movie</Option>
                        <Option value="Anime">Anime</Option>
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
                    label="Release Year"
                    name="releaseYear"
                    rules={[{ required: true, message: 'Please select the year of release!' }]}
                >
                    <DatePicker picker="year" />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input the short description of the film' }]}
                >
                    <TextArea rows={5}/>
                </Form.Item>
                {postType === 'Movie' && (
                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: 'Please select the genre!' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select movie genres"
                        >
                            {/* Movie genre options */}
                            <Option value="Action">Action</Option>
                            <Option value="Adventure">Adventure</Option>
                            <Option value="Comedy">Comedy</Option>
                            <Option value="Drama">Drama</Option>
                            <Option value="Fantasy">Fantasy</Option>
                            <Option value="Horror">Horror</Option>
                            <Option value="SciFi">SciFi</Option>
                            <Option value="Thriller">Thriller</Option>
                            {/* Add more movie genres as needed */}
                        </Select>
                    </Form.Item>
                )}

                {postType === 'Anime' && (
                    <Form.Item
                        label="Genre"
                        name="genre"
                        rules={[{ required: true, message: 'Please select the genre!' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select anime genres"
                        >
                            {/* Anime genre options */}
                            <Option value="Kodomomuke">Kodomomuke</Option>
                            <Option value="Shonen">Shonen</Option>
                            <Option value="Shoujo">Shoujo</Option>
                            <Option value="Seinen">Seinen</Option>
                            <Option value="Josei">Josei</Option>
                            {/* Add more anime genres as needed */}
                        </Select>
                    </Form.Item>
                )}

                <Form.Item
                    label="Image URL"
                    name="img_url"
                    rules={[{ required: true, message: 'Please input the image URL!' },
                    {
                        validator: (_, value) => {
                            if (isImage(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Invalid image URL. Please provide a valid image URL.');
                        },
                    },
                ]}
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

