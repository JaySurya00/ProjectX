'use client'
import { useEffect, useState, useTransition } from 'react';
import { checkBookmarked, addBookmarkAction } from '@/app/actionModel';
import { Flex, Button, message } from 'antd';
import { BookFilled, BookOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'



const Bookmark = ({ userId, postId }) => {
    const [isBookmarked, setBookmarked]= useState(false);
    const router= useRouter();
    useEffect(()=>{
        const checkIfBookmarked= async ()=>{
            const state= await checkBookmarked(userId, postId);
            setBookmarked(state);
        }
        checkIfBookmarked();
    },[userId])
    const [isPending, startTransition] = useTransition();
    const bookmarkButtonHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        startTransition(async () => {
            await addBookmarkAction(userId, postId);
            const state= await checkBookmarked(userId, postId);
            setBookmarked(state);
        });
        router.refresh();
    }

    return (
        <Flex>
            <Button size='small' icon={isBookmarked?<BookFilled />:<BookOutlined/>} onClick={bookmarkButtonHandler} disabled={isPending} />
        </Flex>
    )
}

export default Bookmark;