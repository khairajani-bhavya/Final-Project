import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

const allMovies = [
  {
    title: "Housefull 5",
    poster: "https://m.media-amazon.com/images/M/MV5BZmIzMThjNTYtNjkwZi00NmM3LTliNGItZWIxYTUwMGU1YzM0XkEyXkFqcGc@._V1_.jpg",
    genre: "Comedy",
    rating: 4.2,
    votes: "12K Votes",
  },
  {
    title: "Bhool Chuk Maaf",
    poster: "https://m.media-amazon.com/images/M/MV5BYjlhZTI1YmEtZDMyYi00YTM5LWI4ZGEtMzYwMjYxZjUyNzQzXkEyXkFqcGc@._V1_.jpg",
    genre: "Action/Sci-Fi",
    rating: 4.8,
    votes: "250K Votes",
  },
  {
    title: "Sitaare Zameen Par",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdjODdiMTQtYWIwZi00NTQyLWE0YWItMzk3MTBhOGUyNDY3XkEyXkFqcGc@._V1_.jpg",
    genre: "Family",
    rating: 4.3,
    votes: "90K Votes",
  },
  {
    title: "Raid 2",
    poster: "https://m.media-amazon.com/images/M/MV5BNjQyOTRiYTQtNzU0MS00ZGM2LWE4MTktODI5ZjZiN2NkYjYyXkEyXkFqcGc@._V1_.jpg",
    genre: "Fantasy",
    rating: 4.0,
    votes: "18K Votes",
  },
  {
    title: "Mission Impossible",
    poster: "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_.jpg",
    genre: "Action",
    rating: 4.5,
    votes: "300K Votes",
  },
  {
    title: "Titanic",
    poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00008457-1676022504.jpg",
    genre: "Romance",
    rating: 4.8,
    votes: "1M+ Votes",
  },
  {
    title: "Maa",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny4zLzEwICAxMS42SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00437726-mudtdfmjff-portrait.jpg",
    genre: "Drama",
    rating: 4.2,
    votes: "3K Votes",
  },
  {
    title: "How to Train Your Dragon",
    poster: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/how-to-train-your-dragon-et00420723-1739523360.jpg",
    genre: "Animation",
    rating: 4.7,
    votes: "750K Votes",
  },
  {
    title: "Metro... In Dino",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAxMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00363553-bsunksefvn-portrait.jpg",
    genre: "Drama",
    rating: 4.3,
    votes: "9.1K Votes",
  },
  {
    title: "Jurassic World: Rebirth",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny42LzEwICAyMy40SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00432498-tgbdztungl-portrait.jpg",
    genre: "Sci-Fi",
    rating: 4.6,
    votes: "21K Votes",
  },
  {
    title: "F1: The Movie",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA2Mi42SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00403839-mjfgpwurbn-portrait.jpg",
    genre: "Sports",
    rating: 4.5,
    votes: "6.7K Votes",
  },
  {
    title: "Kannappa",
    poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny4xLzEwICAyNC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00377025-mntpnwlvtn-portrait.jpg",
    genre: "Mythological",
    rating: 4.7,
    votes: "5.2K Votes",
  }
];

const AllMovies = () => {
  return (
    <>
      <div className="all-movies-page">
        <h2>All Popular Movies</h2>

        <div className="movie-list">
          {allMovies.map((movie, idx) => (
            <MovieCard
              key={idx}
              title={movie.title}
              poster={movie.poster}
              genre={movie.genre}
              rating={movie.rating}
              votes={movie.votes}
            />
          ))}
        </div>

        <a href="/" className="back-home-fixed">← Back to Home</a>
      </div>

      <Footer />
    </>
  );
};

export default AllMovies;
