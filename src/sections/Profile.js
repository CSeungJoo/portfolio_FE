import { useState, useEffect } from "react";
import "../styles/profile.css";
import profileImage from "../img/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { profileApi } from "../services/api";

const Profile = ({ nickname }) => {
  const [profileData, setProfileData] = useState({

    imgUrl: profileImage,
    name: "홍길동",
    engName: "GilDongHong",
    role: "Backend Developer",
    email: "test@test.test",
    phoneNumber: "010-1234-5678",
    github: "https://github.com/CSeungJoo",
    blog: "https://velog.io/@seungjoo13579"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!nickname) return;
      
      try {
        setLoading(true);
        const data = await profileApi.getProfile(nickname);
        setProfileData(data.data);
      } catch (error) {
        console.error('프로필 데이터를 불러오는데 실패했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [nickname]);

  if (loading) {
    return (
      <section className="profile" id="profile">
        <h1>PROFILE</h1>
        <div className="profile-container">
          <p>로딩 중...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile" id="profile">
      <h1>PROFILE</h1>
      <div className="profile-container">
        <img src={profileData.imgUrl} alt="Profile" />
      <div className="profile-info">
        <h3>
          {profileData.name} <span className="eng-name">{profileData.engName}</span>
        </h3>
        <span className="role">{profileData.role}</span>
        <div className="profile-contact">
          <p><FontAwesomeIcon icon={faEnvelope} />{profileData.email}</p>
          <p><FontAwesomeIcon icon={faPhone} />{profileData.phoneNumber}</p>
          <p><FontAwesomeIcon icon={faGithub} />{profileData.github}</p>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Profile;
