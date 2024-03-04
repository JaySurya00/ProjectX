import { queryPosts } from "@/app/actionPost";
import MainCard from "@/components/Card/MainCard";
import { Row, Col } from 'antd';

export default async function Home({ params }) {
    const posts = await queryPosts({ postType: 'Movie', genre: { $regex: params.genre, $options: 'i' } });
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Row gutter={[8, 16]} justify="start">
                {posts?.map((post) => (
                    <Col key={post._id} >
                        <MainCard
                            img_url={post.img_url}
                            author={post.author.toString()}
                            postId={post._id.toString()}
                            postType={post.postType}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
}