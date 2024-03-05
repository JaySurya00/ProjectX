'use client'
import { useTransition } from 'react';
import { deletePostAction, deletePostReview } from '@/app/actionPost';
import { Flex, Button } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation'


const DeleteReview = ({postId, reviewId }) => {
  const router= useRouter();
  const [isPending, startTransition] = useTransition();
  const deleteButtonHandler = async () => {
    startTransition(async () => {
        await deletePostReview(postId, reviewId);
    });
    router.refresh();
  }

  return (
    <Flex>
      <Button size='small' icon={<DeleteOutlined style={{ fontSize: '14px' }}/>} onClick={deleteButtonHandler} disabled={isPending}/>
    </Flex>
  )
}

export default DeleteReview;