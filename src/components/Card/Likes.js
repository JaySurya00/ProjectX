'use client'
import { useState, useTransition, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { getLikesForPost, likesAction } from '@/app/actionPost';

const Likes = ({ postId, userId = null, isLoggedIn }) => {
  const [localLikes, setLocalLikes] = useState(0);
  const [isUserLiked, setUserLiked] = useState(false);
  useEffect(() => {
    const getLikes = async () => {
      const { likes, isUserLiked } = await getLikesForPost(postId, userId);
      setLocalLikes(likes);
      setUserLiked(isUserLiked);
    }
    getLikes();
  }, [userId,postId])

  const [isPending, startTransition] = useTransition();

  const likeButtonHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isLoggedIn) {
      startTransition(async () => {
        await likesAction(postId, userId);
        const { likes, isUserLiked } = await getLikesForPost(postId, userId);
        setLocalLikes(likes);
        setUserLiked(isUserLiked);
      });
    }
  }

  return (
    <>
      <Tooltip title={isLoggedIn ? `${localLikes} liked this` : 'Please Sign In'} mouseEnterDelay={isLoggedIn ? 0.8 : 0} mouseLeaveDelay={0.1} style={{ fontSize: '8px', background: '#1890ff' }}>
        <Button size='small' icon={isUserLiked && isLoggedIn? <LikeFilled /> : <LikeOutlined />} onClick={likeButtonHandler} disabled={isPending}>
          {localLikes}
        </Button>
      </Tooltip>
    </>
  )
}

export default Likes;