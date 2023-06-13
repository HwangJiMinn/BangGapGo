import styles from "./roomMate.module.css"
import PostCard from "../../components/PostCard/postCard"
import { Button, Pagination, message } from "antd"
import RoomMateSearch from "./roomMateSearch"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import roomMateTitle from "../../assets/RoommateTitle.svg"
import { userArticle } from "../../api"
import { Post } from "../../interface/interface"
import { RoomMateSearchProps } from "../../interface/interface"

const RoomMate: React.FC<RoomMateSearchProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showRecruiting, setShowRecruiting] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [count, setCount] = useState(0)
  const isLogged = useSelector((state: RootState) => state.user.isLogged)
  const pageSize = 9
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const [isSearched, setIsSearched] = useState(false)
  const [initialPosts, setInitialPosts] = useState<Post[]>([])

  // 검색 결과를 저장하고, 검색 여부를 업데이트
  const handleSearchResults = (results: Post[]) => {
    setPosts(results)
    setIsSearched(true) // 검색이 완료되었음을 표시
  }

  const toggleRecruitOnly = () => {
    setShowRecruiting(!showRecruiting)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const goToWritePage = () => {
    if (isLogged === true) {
      navigate("/WritePage")
    } else {
      messageApi.info("로그인 후 사용 가능합니다.")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${userArticle}/total`, {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        })

        if (!response.ok) {
          throw new Error(`서버 상태 응답 ${response.status}`)
        }

        const data = await response.json()
        setCount(data.data)

        const initialPostsResponse = await fetch(
          `${userArticle}?page=${currentPage}&size=9&isRecruiting=false`,
          {
            method: "GET",
            headers: new Headers({
              "ngrok-skip-browser-warning": "69420",
            }),
          },
        )

        if (!initialPostsResponse.ok) {
          throw new Error(`서버 상태 응답 ${initialPostsResponse.status}`)
        }

        const initialPostsData = await initialPostsResponse.json()
        setInitialPosts(initialPostsData.data)
      } catch (error) {
        console.error(error)
        messageApi.error("데이터 불러오기 오류")
      }
    }

    fetchData()
  }, [messageApi])

  return (
    <div className={styles.roomMateContainer}>
      <RoomMateSearch onSearch={handleSearchResults} />
      <div className={styles.roomMateTitle}>
        <img src={roomMateTitle} />
        <div className={styles.roomMateBtn}>
          <Button type="primary" onClick={toggleRecruitOnly}>
            {showRecruiting ? "전체보기" : "모집글만"}
          </Button>
          <Button type="primary" onClick={goToWritePage}>
            글쓰기
          </Button>
        </div>
      </div>
      <div className={styles.cardGrid}>
        <PostCard
          posts={posts}
          currentPage={currentPage}
          showRecruiting={showRecruiting}
        />
      </div>
      <Pagination
        className={styles.pagination}
        current={currentPage}
        onChange={handlePageChange}
        total={count}
        pageSize={pageSize}
      />
      {contextHolder}
    </div>
  )
}

export default RoomMate
