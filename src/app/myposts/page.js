import { authenticate } from "@/lib/auth";
import { getUserPosts } from "../actionPost";
import MainCard from "@/components/Card/MainCard";
import { Row, Col } from 'antd'

const MyPosts = async () => {
    const { user, isLoggedIn } = await authenticate();
    const posts = await getUserPosts(user?.id);
    return (
        <>
            {posts.length === 0 ? <h3>No Posts</h3> :
                <Row gutter={[16, 16]} justify="start">
                    {posts?.map((item) => (
                        <Col key={item._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <MainCard
                                img_url={item.img_url}
                                author={item.author.toString()}
                                postId={item._id.toString()}
                                postType={item.postType}
                            />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default MyPosts;