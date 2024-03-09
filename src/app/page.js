import MainCard from "@/components/Card/MainCard";
import { Row, Col, Descriptions } from 'antd';
import { getPosts } from "./actionPost";

export const metadata= {
  title: 'MovieAnime App',
  description: 'A app where user can post movie and anime'
}


export default async function Home() {
  const posts = await getPosts();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Row gutter={[8, 16]} justify="start">
        {posts?.map((post) => (
          <Col key={post._id}>
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

