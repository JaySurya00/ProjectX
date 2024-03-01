'use client'
import { useEffect, useState, useTransition } from 'react';
import { checkBookmarked, addBookmarkAction } from '@/app/actionModel';
import { Flex, Button, message } from 'antd';
import { BookFilled, BookOutlined } from '@ant-design/icons';


const Bookmark = ({ userId, postId }) => {
    const [isBookmarked, setBookmarked]= useState(false);
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
    }

    return (
        <Flex>
            <Button size='small' icon={isBookmarked?<BookFilled />:<BookOutlined/>} onClick={bookmarkButtonHandler} disabled={isPending} />
        </Flex>
    )
}

export default Bookmark;