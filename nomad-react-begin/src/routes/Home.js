import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
    const [loading, setLoading] = useState(true);

    const [movies, setMovies] = useState([]);
  
    const getMovies = async () => {
      const json = await (
        await fetch(
          "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
        )
      ).json();
      setMovies(json.data.movies);
      setLoading(false);
    };
  
    useEffect(() => getMovies(), []);
  
    return (
      <>
        {loading ? (
          <h1>now loading...</h1>
        ) : (
          movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id} /* 클릭시 Movie에서 이동시킬 id 추가 */
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))
        )}
      </>
    );
}

export default Home;