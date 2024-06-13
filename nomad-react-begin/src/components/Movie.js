import { Link } from "react-router-dom";

function Movie({id, coverImg, title, summary, genres }) { /* id 추가 */
  return (
    <>
      <div>
        <img src={coverImg} />
        <h2>
          <Link to={`/movie/${id}`}>{title}</Link> {/* 동적 페이지 이동 */}
          {/* Home에서 제목을 클릭 시, 해당 링크로 이동한다는 것 */}
          {/* 해당 링크 (무비/id)가 어디로 가는지는 App에서 라우팅해놨음 */}
        </h2>
        <p>{summary}</p>
        <ul>
          {genres.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Movie;
