import { useState, useEffect } from "react";
import "../styles/awards.css";
import { awardsApi } from "../services/api";

const Awards = ({ nickname }) => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAwards = async () => {
      if (!nickname) return;
      
      try {
        setLoading(true);
        const data = await awardsApi.getAwards(nickname);
        setAwards(data.data);
      } catch (error) {
        console.error('수상 내역을 불러오는데 실패했습니다:', error);
        setAwards([
          {
            awardedAt: "2023년 5월 31일",
            name: "교내창업경진대회",
            awardRank: "동상(3위)",
            organization: "부산컴퓨터과학고등학교"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAwards();
  }, [nickname]);

  if (loading) {
    return (
      <section id="awards">
        <h1>AWARDS</h1>
        <p>로딩 중...</p>
      </section>
    );
  }

  return (
    <section id="awards">
      <h1>AWARDS</h1>
      <table>
        <thead>
          <tr>
            <th>날짜</th>
            <th>대회명 / 수상명</th>
            <th>수상 / 등급(위)</th>
            <th>수여기관</th>
          </tr>
        </thead>
        <tbody>
          {awards
            .sort((a, b) => new Date(b.awardedAt) - new Date(a.awardedAt)) // 최근 순 정렬
            .map((award, index) => (
              <tr key={index}>
                <td>{award.awardedAt}</td>
                <td>{award.name}</td>
                <td>{award.awardRank}</td>
                <td>{award.organization}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Awards;
