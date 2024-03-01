import { authenticate } from "@/lib/auth";
import { getUserPosts } from "../actionPost";
import MainCard from "@/components/Card/MainCard";
import { Row, Col } from 'antd'

const MyPosts = async () => {
    const { user, isLoggedIn } = await authenticate();
    console.log(user);
    const data = await getUserPosts(user?.id);
    return (
        <>
            {!isLoggedIn && <h1>Please Log In first</h1>}
            {
                <Row gutter={[16, 16]} justify="start">
                    {data?.map((item) => (
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