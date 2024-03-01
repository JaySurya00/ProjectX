'use client'
import { useTransition } from 'react';
import { deletePostAction } from '@/app/actionPost';
import { Flex, Button } from 'antd';
import {DeleteOutlined} from '@ant-design/icons';


const Delete = ({postId }) => {
  const [isPending, startTransition] = useTransition();
  const deleteButtonHandler = async () => {
    startTransition(async () => {
        deletePostAction(postId);
    });
  }

  return (
    <Flex>
      <Button size='small' icon={<DeleteOutlined />} onClick={deleteButtonHandler} disabled={isPending}/>
    </Flex>
  )
}

export default Delete;