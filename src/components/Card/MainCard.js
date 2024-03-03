import React from 'react';
import { Card, Flex, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Likes from './Likes';
import Delete from './Delete';
import Bookmark from './Bookmark';
import { authenticate } from '@/lib/auth';
import Link from 'next/link';

const MainCard = async ({ postType, img_url, postId, author }) => {
  const cardStyle = {
    width: 240,
    height: 325,
    backgroundImage: `url(${img_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const { user, isLoggedIn } = await authenticate();
  return (
    <Link href={`/posts/${postId}`} target='_blank'>
      <Card
        hoverable
        style={cardStyle}
      >
        {author === user?.id && <div style={{ position: 'absolute', top: 0, left: 0, padding: '8px' }}>
          <UserOutlined />
        </div>}
        <Flex
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '8px',
            background: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          <Space>
            <Likes userId={user?.id.toString()} isLoggedIn={isLoggedIn} postId={postId} />
            {isLoggedIn && <Bookmark userId={user.id} postId={postId}/>}
            {user?.id === author && <Delete postId={postId}/>}
          </Space>
        </Flex>
        <div style={{ position: 'absolute', bottom: 0, right: 0, padding: '5px', background: 'rgba(255, 255, 255, 0.8)' }}>
          <p style={{ margin: '0', padding: '0' }}>{postType}</p>
        </div>
      </Card>
    </Link>
  )
};
export default MainCard;