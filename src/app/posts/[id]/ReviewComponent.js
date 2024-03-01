'use client'

import { useState , useRef} from 'react';
import TextArea from 'antd/es/input/TextArea';
import { Button, Space } from 'antd';
import { addReviewAction } from '@/app/actionModel';
import { useAuth } from '@/app/auth-context';
import {message} from 'antd'

export default function Review({postId}) {
    const [value, setValue] = useState('');
    const {AuthState}= useAuth();
    const [messageApi, contextHolder]= message.useMessage();
    const addReviewHandler= async ()=>{
        const reviewBody= {
            author:AuthState.user.id,
            review: value,
        }
        console.log(reviewBody);
        await addReviewAction(postId, reviewBody);
        messageApi.info('Review Added');
        setValue('');
    }
    return (
        <>
            {contextHolder}
            <TextArea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Write Review"
                autoSize={{
                    minRows: 5,
                    maxRows: 8,
                }}
            />
            <Button type={'primary'} style={{marginTop: '2px'}} onClick={addReviewHandler} disabled={!AuthState.isLoggedIn}>Add Review</Button>
        </>
    )
}