import React, { useState, useEffect } from "react";
import styles from "./mainPage.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainPostCard from "../../components/MainPostCard/mainPostCard";
import RecommendPostCard from "../../components/RecommendCard/recommendCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import PostModal from "../../components/PostModal/postModal";
import RecommendModal from "../../components/RecommendModal/recommendModal";

interface Post {
  id: number;
  title: string;
  nickname: string;
  content: string;
  gender: string;
  createdDate: string;
  region: string;
  period: string;
  price: string;
  recruit: boolean;
  message: string;
}

interface User {
  id: number;
  nickname: string;
  image: string;
  email: string;
  gender: string;
  smoke: boolean;
  MBTI: string;
  region: string;
  minAge: number;
  maxAge: number;
  myAge: number;
  activityTime: string;
  faviteTag: string;
  hateTag: string;
  myText: string;
}

const CustomRightArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customRightArrow}>
      <AiFillCaretRight className={styles.RightArrow} size={50} />
    </button>
  );
};

const CustomLeftArrow: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.customLeftArrow}>
      <AiFillCaretLeft className={styles.LeftArrow} size={50} />
    </button>
  );
};

const MainPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("src/assets/posts.json")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));

    fetch("src/assets/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data.user));
  }, []);

  const adImages = [
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
    "https://via.placeholder.com/500x130",
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4,
    },
  };

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <div className={styles.conatainer}>
      <div className={styles.adContainer}>
        <Carousel
          showThumbs={false}
          swipeable={true}
          infiniteLoop={true}
          autoPlay
          interval={3000}
          showIndicators={false}
        >
          {adImages.map((url, index) => (
            <div key={index}>
              <img src={url} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.mainPost}>
        <div className={styles.title}>룸메이트 구해요 👋</div>
        <MultiCarousel
          responsive={responsive}
          infinite={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {posts.map((post) => (
            <MainPostCard
              key={post.id}
              post={post}
              onClick={() => handlePostClick(post)}
            />
          ))}
        </MultiCarousel>
      </div>
      <div className={styles.recommendPost}>
        <div className={styles.title}>
          방갑고에서 추천하는 룸메이트를 만나보세요 💌
        </div>
        <MultiCarousel
          responsive={responsive}
          infinite={true}
          draggable={true}
          showDots={false}
          customRightArrow={<CustomRightArrow />}
          customLeftArrow={<CustomLeftArrow />}
        >
          {users.map((user) => (
            <RecommendPostCard
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </MultiCarousel>
      </div>
      {selectedPost && (
        <PostModal post={selectedPost} onClose={handleCloseModal} />
      )}
      {selectedUser && (
        <RecommendModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default MainPage;
