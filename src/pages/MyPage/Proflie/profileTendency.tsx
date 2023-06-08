import styles from './profile.module.css'
import { Modal } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { Badge } from "antd"
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { Radio } from "antd"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { activityTime, age, ageGroup, gender, mbti, region, smoke, tendencyChoice } from '../../../object/profileDropdown';
import { profileTendencyDropdown, userProfileData } from '../../../interface/interface';

const ProfileTendency: React.FC = () => {

  const [tendencyModal, setTendencyModal] = useState(false)

  const [selectedGender, setSelectedGender] = useState("성별")
  const [selectedAge, setSelectedAge] = useState(0)
  const [selectedSmoke, setSelectedSmoke] = useState(false)
  const [selectedMBTI, setSelectedMBTI] = useState("MBTI")
  const [selectedregion, setSelectedregion] = useState("지역")
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("00 ~ 00")
  const [selectedActivityTime, setSelectedActivityTime] = useState("활동시간")
  const [mytext, setMytext] = useState('');

  const [boxStates, setBoxStates] = useState({
    genderBoxOpen: false,
    ageBoxOpen: false,
    smokeBoxOpen: false,
    MBTIBoxOpen: false,
    regionBoxOpen: false,
    ageGroupBoxOpen: false,
    activityTimeBoxOpen: false
  })

  const handleToggleBox = (boxName: keyof profileTendencyDropdown) => {
    setBoxStates((prevState) => ({
      ...prevState,
      [boxName]: !prevState[boxName]
    }))
  }
  // 체크박스
  const [favoriteTag, setfavoriteTag] = useState<string[]>([]);

  const handleTendencyChange = (checkedValues: CheckboxValueType[]) => {
    setfavoriteTag(checkedValues as string[]);
  };


  // 서버 연결
  // const updateProfileTendency = async (profileData: userProfileData, token: string) => {

  //   try {
  //     const response = await fetch('https://.../api/profile', { // 주소 수정
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 포함
  //       },
  //       body: JSON.stringify(profileData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('프로필 성향 정보 업데이트 실패');
  //     }

  //     const updatedProfileTendency = await response.json();
  //     return updatedProfileTendency;
  //   } catch (error) {
  //     console.error('프로필 성향 정보 업데이트 오류', error);
  //     throw error;
  //   }
  // };

  // 프로필 정보 업데이트 핸들러
  const handleUpdateProfile = async () => {
    try {
      const profileData: userProfileData = {
        gender: selectedGender === '성별' ? '' : selectedGender === '여성' ? 'F' : 'M',
        myAge: selectedAge,
        smoke: selectedSmoke ? true : false,
        MBTI: selectedMBTI,
        region: selectedregion,
        minAge: Number(selectedAgeGroup.split('-')[0]),
        maxAge: Number(selectedAgeGroup.split('-')[1]),
        activityTime: selectedActivityTime,
        myText: mytext,
        favoriteTag: favoriteTag
      };

      console.log('사용자 입력 데이터:', profileData);

      // const token = '여기에 JWT 토큰을 저장해둔다';
      // const updatedProfile = await updateProfileTendency(profileData, token); // 토큰 값 변경 필요
      // console.log('프로필 업데이트 성공', updatedProfile);
    } catch (error) {
      console.error('프로필 업데이트 오류', error);
    }
  };

  // useEffect(() => {
  //   // 선택한 정보가 변경될 때마다 프로필 정보 업데이트
  //   handleUpdateProfile();
  // }, [selectedGender, selectedAge, selectedSmoke, selectedMBTI, selectedregion, selectedAgeGroup, selectedActivityTime, favoriteTag]);
  
  return (
    <div className={styles.profileTenContainer}>
      <p>내 프로필</p>
      <span>룸메이트 신청 시 사용되는 프로필 입니다.</span>
      <div className={styles.dropdownContainer}>
        <Radio.Group onChange={(e) => {
          setSelectedGender(e.target.value)
          handleToggleBox("genderBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 성별은</p>
            <div onClick={() => handleToggleBox("genderBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{selectedGender}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {boxStates.genderBoxOpen && (
            <div className={styles.RadioBtn}>
              {gender.map((item, index) => (
                <Radio
                  key={index}
                  value={item.name}
                  className={styles.Radio}
                >
                  {item.name}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedAge(e.target.value);
          handleToggleBox("ageBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 연령대는</p>
            <div onClick={() => handleToggleBox("ageBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{selectedAge}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {boxStates.ageBoxOpen && (
            <div className={styles.RadioBtn}> 
              {age.map((item, index) => (
                <Radio
                  key={index}
                  value={item.age}
                  className={styles.Radio}>
                    {item.age}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedSmoke(e.target.value === "합니다" ? true : false);
          handleToggleBox("smokeBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저는 흡연을</p>
            <div onClick={() => handleToggleBox("smokeBoxOpen")}>
            <Badge className={styles.dropdownBadge}>{selectedSmoke ? "합니다" : "하지 않습니다"}</Badge>
            </div>
          </div>
          {boxStates.smokeBoxOpen && (
            <div className={styles.smokeRadioBtn}> 
              {smoke.map((item, index) => (
                <Radio
                  key={index}
                  value={item.smoke}
                  className={styles.smokeRadio}>
                    {item.smoke}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedMBTI(e.target.value);
          handleToggleBox("MBTIBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 저의 MBTI는</p>
            <div onClick={() => handleToggleBox("MBTIBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{selectedMBTI}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {boxStates.MBTIBoxOpen && (
            <div className={styles.mbtiRadioBtn}> 
              {mbti.map((item, index) => (
                <Radio
                  key={index}
                  value={item.mbti}
                  className={styles.mbtiRadio}>
                    {item.mbti}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedregion(e.target.value);
          handleToggleBox("regionBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}> 제가 희망하는 지역은 </p>
            <div onClick={() => handleToggleBox("regionBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{selectedregion}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {boxStates.regionBoxOpen && (
            <div className={styles.regionRadioBtn}> 
              {region.map((item, index) => (
                <Radio
                  key={index}
                  value={item.region}
                  className={styles.regionRadio}>
                    {item.region}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedAgeGroup(e.target.value);
          handleToggleBox("ageGroupBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}>제가 희망하는 연령대는</p>
            <div onClick={() => handleToggleBox("ageGroupBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{selectedAgeGroup}</Badge>
            </div>
            <p className={styles.dropdownP}> 입니다 ☺️</p>
          </div>
          {boxStates.ageGroupBoxOpen && (
            <div className={styles.ageGroupRadioBtn}> 
              {ageGroup.map((item, index) => (
                <Radio
                  key={index}
                  value={item.ageGroup}
                  className={styles.ageGroupRadio}>
                    {item.ageGroup}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
        <Radio.Group onChange={(e) => {
          setSelectedActivityTime(e.target.value);
          handleToggleBox("activityTimeBoxOpen")
        }}>
          <div className={styles.dropdownBox}> 
            <p className={styles.dropdownP}>저는 대부분</p>
            <div onClick={() => handleToggleBox("activityTimeBoxOpen")}>
              <Badge className={styles.dropdownBadge}>{selectedActivityTime}</Badge>
            </div>
            <p className={styles.dropdownP}> 에 활동합니다 ☺️</p>
          </div>
          {boxStates.activityTimeBoxOpen && (
            <div className={styles.RadioBtn}> 
              {activityTime.map((item, index) => (
                <Radio
                  key={index}
                  value={item.activityTime}
                  className={styles.Radio}>
                    {item.activityTime}
                </Radio>
              ))}
            </div>
          )}
        </Radio.Group>
      </div>
      <div className={styles.tagContainer}>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 좋아요 🥰</span>
            <Modal
              title="이런 룸메이트가 좋아요 🥰 (1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => {
                setTendencyModal(false);
                setfavoriteTag(favoriteTag);
              }}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} onChange={handleTendencyChange}/>
              </div>
            </Modal>
          </div>
          <div className={`${styles.tendencyBox} ${favoriteTag.length === 0 ? styles.tendencyNot : ''}`}>
            {favoriteTag.length === 0 ? (
              <span className={styles.tendencyNotChoice}>성향을 선택해주세요</span>
            ) : (
              favoriteTag.map((item, index) => (
                <span key={index}>#{item}</span>
              ))
            )}
          </div>
        </div>
        <div>
          <div className={styles.tendencyDesc}>
            <span>이런 룸메이트가 싫어요 😤</span>
            {/* <Button className={styles.tendencyBtn} type="primary" onClick={() => setTendencyModal(true)} style={{ width: 50, height: 25, fontSize: 10, borderRadius: 20 }}>수정</Button> */}
            <Modal
              title="이런 룸메이트가 싫어요 😤 (1개 ~ 최대 5개 선택)"
              centered
              open={tendencyModal}
              onOk={() => {
                setTendencyModal(false);
                setfavoriteTag(favoriteTag);
              }}
              onCancel={() => setTendencyModal(false)}>
              <div className={styles.tendencyModalBox}>
                <Checkbox.Group options={tendencyChoice} onChange={handleTendencyChange}/>
              </div>
            </Modal>
          </div>
          <div className={styles.tendencyBox}>
            {tendencyChoice
            .filter((option) => !favoriteTag.includes(option.value))
            .map((item, index) => (
              <span key={index}>#{item.value}</span>
            ))}
          </div>
        </div>
        <Button 
          className={styles.tendencyBtn} 
          type="primary" 
          onClick={() => setTendencyModal(true)} 
          style={{ width: 70, height: 30, fontSize: 10, borderRadius: 20 }}>
          수정
        </Button>
      </div>
      <div className={styles.IntroducContainer}>
        <p>본인 소개</p>
        <div>
          <TextArea
            showCount
            maxLength={200}
            style={{ width:330, height: 110, resize: 'none', background:'#E5E5E5' }}
            onChange={(e) => setMytext(e.target.value)}
            placeholder={`  추가로 하고 싶은 말을 자세히 적어주세요!
  예를들면 먼지 알러지가 있는지, 집에서 밥을 먹지 않는다던지
  자유롭게 얘기해보세요 :)`}
          />
          <Button 
            className={styles.textareaBtn} 
            type="primary" 
            style={{ width: 100, height: 35, fontSize: 10, borderRadius: 20 }}
            onClick={handleUpdateProfile}>
            내 프로필 수정
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProfileTendency