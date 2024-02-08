import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Movie {
  id: number;
  backdrop_path: string;
  original_title: string;
  overview: string;
}

const MovieList: React.FC = () => {
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const fetchMovieDetails = async (movieId: number) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
        },
      };
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        config
      );
      console.log(response);
      setSelectedMovie(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="bg-gray-200 w-full p-8">
      {!isLoading && moviesData.length > 0 ? (
        <div className="flex gap-4 justify-between w-4/5 mx-auto flex-wrap">
          {moviesData.map((data) => (
            <div key={data?.id} className="bg-white p-4">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}${data?.backdrop_path}`}
                width={250}
                height={150}
                alt="movieImg"
              />
              <p
                className="text-black cursor-pointer"
                onClick={() => fetchMovieDetails(data.id)}
              >
                {data?.original_title}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {selectedMovie && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">
              {selectedMovie.original_title}
            </h2>
            <p className="text-black">{selectedMovie.overview}</p>
            <button
              className="mt-4 bg-gray-400 px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
