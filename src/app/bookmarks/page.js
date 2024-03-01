import { authenticate } from "@/lib/auth";
import { getUserBookmarks } from "../actionModel";;
import MainCard from "@/components/Card/MainCard";
import {Row, Col} from 'antd'

const Bookmarks = async () => {
    const { user, isLoggedIn } = await authenticate();
    const bookmarks = await getUserBookmarks(user?.id);
    return (
        <>
            {!isLoggedIn && <h1>Please Log In first</h1>}
            {
                isLoggedIn &&
                <Row gutter={[16, 16]} justify="start">
                    {bookmarks.map((post) => (
                        <Col key={post._id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <MainCard
                                title={post.title}
                                author={post.author}
                                img_url={post.img_url}
                                year={post.year}
                                genre={post.genre}
                                description={post.description}
                                likes={post.likes}
                                postId={(post._id).toString()}
                            />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default Bookmarks;