'use client'
import { useTransition } from 'react';
import { deletePostAction } from '@/app/actionPost';
import { Flex, Button } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import { useRouter } from 'next/navigation'


const Delete = ({postId }) => {
  const router= useRouter();
  const [isPending, startTransition] = useTransition();
  const deleteButtonHandler = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    startTransition(async () => {
        deletePostAction(postId);
    });
    router.refresh();
  }

  return (
    <Flex>
      <Button size='small' icon={<DeleteOutlined />} onClick={deleteButtonHandler} disabled={isPending}/>
    </Flex>
  )
}

export default Delete;