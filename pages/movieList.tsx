import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface MovieScheme {
  id: any;
}
const MovieList = () => {
  const [moviesData, setMoviesData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
          },
        };
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          config
        );

        console.log(response);
        setMoviesData(response.data.results);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ background: "#eee", width: "100%" }}>
      {!isLoading && moviesData !== null ? (
        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "spaceBetween",
            height: "100vh",
            width: "80%",
            margin: "0 auto",
          }}
        >
          {moviesData.map((data: any) => {
            return (
              <div
                key={data?.id}
                style={{ backgroundColor: "#fefefe", width: "100%" }}
                className="flex-1 w-32"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}${data?.backdrop_path}`}
                  style={{ width: "250px", height: "150px" }}
                  alt="movieImg"
                />
                <p>{data?.original_title}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MovieList;
