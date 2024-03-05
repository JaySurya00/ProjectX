
import React, { Fragment } from 'react';
import { Col, Row, Card, Flex, Divider, Space } from 'antd';
import { getBookmarkCount } from '@/app/actionModel';
import { getLikesForPost } from '@/app/actionPost';
import { getPostbyId } from '@/app/actionPost';
import { LikeFilled, BookFilled, MessageFilled } from '@ant-design/icons';
import Review from './ReviewComponent';

import { Roboto } from 'next/font/google'
import { authenticate } from '@/lib/auth';
import DeleteReview from '../DeleteReview';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})



export default async function Posts({ params }) {
    const {user}= await authenticate();
    const postId = params.id;
    const post = await getPostbyId(postId);
    const reviews = post?.reviews?.map((reviewData) => {
        return (
            {
                authorId: reviewData.author._id.toString(),
                authorName: reviewData.author.firstName + ' ' + reviewData.author.lastName,
                review: reviewData.review,
                date:reviewData.date,
                id: reviewData._id
            }
        )

    })
    const { likes } = await getLikesForPost(postId)
    const bookmarksCount = await getBookmarkCount(postId);
    const reviewCount= reviews.length;

    const cardStyle = {
        width: 250,
        height: 350,
        backgroundImage: `url(${post.img_url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
    const verticalDividerStyle = {
        display: 'inline-block',
        margin: '0 8px', // Adjust the margin as needed
        borderRight: '1px solid #ccc', // Divider line color
        height: '12px', // Adjust the height of the divider line
    };
    return (
        <Row justify={'start'}>
            <Col offset={3} style={{ marginRight: '12px' }}>
                <Card style={cardStyle} />
                <Flex justify='start'>
                    <div style={{ marginRight: '8px' }}>{likes}<LikeFilled /></div>
                    <div style={{ marginRight: '8px' }}>{bookmarksCount}<BookFilled /></div>
                    <div style={{ marginRight: '8px' }}>{reviewCount} <MessageFilled /></div>
                </Flex>
            </Col>
            <Col xs={24} sm={16} md={12} lg={8} >
                <div className={roboto.className}>
                    <h1>{post.title}</h1>
                    <p> <span style={{ fontWeight: 'bold' }}>Year</span>: {post.year} <span style={verticalDividerStyle}></span> <span style={{ fontWeight: 'bold' }}>Genre</span>: {post.genre}</p>
                    <p>{post.description}</p>
                </div>
                <p style={{ marginBottom: '0', fontWeight: 'bold', fontSize: '15px' }}>Reviews</p>
                <Divider style={{ marginTop: '0' }} />
                {reviews?.map((review) => {
                    return (
                        <Fragment key={review.id}>
                            <Flex justify='space-between'>
                                <p style={{ color: 'GrayText', fontFamily: 'Roboto' }}>Review by:<span style={{ color: 'black', fontFamily: 'Roboto' }}> {review.authorName}</span><span style={{ color: 'GrayText', fontFamily: 'Roboto' }}>{' '+review.date.getDate()+'/'+review.date.getMonth()+'/'+review.date.getFullYear()}</span></p>
                                {user?.id===review?.authorId && <DeleteReview reviewId={review.id.toString()} postId={postId}/>}
                            </Flex>
                            <p style={{ fontFamily: 'Roboto' }}>{review.review}</p>
                            <Divider />
                        </Fragment>
                    )
                })}
            </Col>
            <Col span={6} offset={1} style={{}}>
                <Review postId={postId} />
            </Col>
        </Row>
    )
}