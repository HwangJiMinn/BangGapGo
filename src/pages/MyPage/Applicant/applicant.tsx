import styles from './applicant.module.css'
import { Badge, Card, Modal } from "antd"
import { IdcardOutlined, CloseOutlined, WechatOutlined, FileDoneOutlined, CheckOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import { ApplicantProps } from '../../../interface/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import { userAprove, userRefuse } from '../../../api'
import { userApplicant } from '../../../api'

const Applicant: React.FC<ApplicantProps> = ({ showApply, post }) => {

  const userToken = useSelector((state : RootState) => state.user.data.token)

  // 승인
  const updateApprove = async () => {
    try {
      const response = await fetch(`/api/${userAprove}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
        body: JSON.stringify({
          "userId" : post.otherUserId,
          "articleId" : post.articleId
        }),
      })

      if (!response.ok) {
        console.log(response)
        throw new Error('매칭 승인 실패')
      } else {
        Modal.success({
          title: "룸메이트 매칭 성공!",
          content: "룸메이트 매칭을 승인하였습니다.",
        });
      }

      const approveData = await response.json()
      window.location.reload()
      console.log(approveData.data)

    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error)
    }
  }

  // 거절
  const updateRefuse = async () => {
    try {
      const response = await fetch(`/api/${userRefuse}/${post.applyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
        body: JSON.stringify(post.articleId),
      })

      if (!response.ok) {
        throw new Error('매칭 거절 실패')
      } else {
        Modal.success({
          title: "룸메이트 매칭 거절!",
          content: "룸메이트 매칭을 거절하였습니다.",
        });
      }

      const refuseData = await response.json()
      window.location.reload()
      console.log(refuseData.data)
      return refuseData

    } catch (error) {
      console.error('룸메이트 매칭 거절 오류', error)
    }
  }

  // 삭제
  const updateDelete = async () => {
    try {
      const response = await fetch(`/api/${userApplicant}/${post.applyId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken.atk.toString(), 
        },
      })

      if (response.ok) {
        Modal.confirm({
          title: "신청현황 삭제!",
          content: "룸메이트 신청현황을 삭제하였습니다.",
        })
      } else {
        throw new Error('삭제 실패')
      }

      const deleteData = await response.json()
      window.location.reload()
      console.log(deleteData.data)

    } catch (error) {
      console.error('룸메이트 신청현황 삭제 오류', error)
    }
  }

  return (
    <>
      {
        !showApply ? (
          post.matchStatus === '대기' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[
                  <IdcardOutlined title="프로필" />,  
                  <CheckOutlined onClick={updateApprove} />,
                  <CloseOutlined onClick={updateRefuse}/>,
                ]}
              >
                <Meta
                  title={`'${post.otherUserName}'님이 룸메이트 신청을 하였습니다.`}
                  description={`'${post.articleTitle}' 게시물에 신청이 도착했습니다 💌`}
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '거절' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[<CloseOutlined key="close" onClick={updateDelete}>삭제</CloseOutlined>]}
              >
                <Meta
                  title={`'${post.otherUserName}'님의 룸메이트 매칭을 거절 하였습니다.`}
                  description="다른 룸메이트를 구해보세요 🥲"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '승인' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[
                  <WechatOutlined title="채팅" />,
                  <IdcardOutlined title="프로필" />]}
              >
                <Meta
                  title={`'${post.articleTitle}' 게시물에 '${post.otherUserName}'님과 룸메이트 매칭이 되었습니다.`}
                  description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : null 
        ) : (
          post.matchStatus === '대기' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[
                  <IdcardOutlined title="프로필" />, 
                  <FileDoneOutlined key="게시물" />]}
              >
                <Meta
                  title={`'${post.articleTitle}' 게시물에 룸메이트 신청을 하였습니다.`}
                  description="룸메이트 매칭 결과를 기다리세요 🙌🏻"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '거절' ? (
            <div key={post.applyId}>
              <Card
                cover={<Badge.Ribbon text={post.matchStatus} />}
                style={{ width: 530, marginBottom: 30 }}
                actions={[<CloseOutlined key="close">삭제</CloseOutlined>]}
              >
                <Meta
                  title={`'${post.articleTitle}' 게시물 룸메이트 매칭이 거절 되었습니다.`}
                  description="아쉽네요. 다른 룸메이트를 구해보세요 🥲"
                />
                <div>
                  <p className={styles.content}></p>
                </div>
              </Card>
            </div>
          ) : post.matchStatus === '승인' ? (
            <Card
              cover={<Badge.Ribbon text={post.matchStatus} />}
              style={{ width: 530, marginBottom: 30 }}
              actions={[
                <WechatOutlined title="채팅" />,
                <IdcardOutlined title="프로필" />]}
            >
              <Meta
                title={`'${post.articleTitle}' 게시물에 '${post.otherUserName}'님과 룸메이트 매칭이 되었습니다.`}
                description="1:1 채팅으로 원활한 대화를 나눠보세요 👏🏻"
              />
              <div>
                <p className={styles.content}></p>
              </div>
            </Card>
          ) : null
        ) 
      }
    </>
  )
}

export default Applicant