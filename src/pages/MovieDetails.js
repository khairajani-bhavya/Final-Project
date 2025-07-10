import { useParams, Link, useNavigate } from "react-router-dom";
import "./MovieDetails.css";
import Footer from "../components/Footer";
export const staticMovieData = {
  "Housefull 5": {
    title: "Housefull 5",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZmIzMThjNTYtNjkwZi00NmM3LTliNGItZWIxYTUwMGU1YzM0XkEyXkFqcGc@._V1_.jpg",
    genre: ["Comedy", "Drama"],
    year: 2025,
    duration: "2h 15m",
    rating: 4.2,
    description:
      "A hilarious comedy where chaos and confusion unfold as all the wives and ex-wives of the main characters meet unexpectedly.",
    language: "Hindi",
    trailerUrl: "https://youtu.be/xGQuT1wm2qk",
     cast: [
    { name: "Akshay Kumar", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Akshay_Kumar_National_Award_for_Padman_%28cropped%29.jpg/640px-Akshay_Kumar_National_Award_for_Padman_%28cropped%29.jpg" },
    { name: "Riteish Deshmukh", image:"https://m.media-amazon.com/images/M/MV5BYmNhNjJjYTQtMjc4Ni00NTRlLTk3YTgtNjAxMjM4YjM4NzNjXkEyXkFqcGc@._V1_.jpg" },
    { name: "Abhishek Bachchan", image: "https://images.indianexpress.com/2025/01/Abhishek-Bachchan-edited_20241115093304_20250120073347.jpg" }
  ]
  },
  Titanic: {
    title: "Titanic",
    poster:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/titanic-et00008457-1676022504.jpg",
    genre: ["Romance", "Drama"],
    year: 1997,
    duration: "3h 14m",
    rating: 4.8,
    description:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    language: "English",
    trailerUrl: "https://youtu.be/kVrqfYjkTdQ",
     cast: [
    { name: "Kate Winslet", image:"https://m.media-amazon.com/images/M/MV5BODgzMzM2NTE0Ml5BMl5BanBnXkFtZTcwMTcyMTkyOQ@@._V1_FMjpg_UX1000_.jpg" },
    { name: "Kate Winslet", image: "https://m.media-amazon.com/images/M/MV5BMTI5NzA2NTE0NF5BMl5BanBnXkFtZTcwNzAxMTUxMw@@._V1_FMjpg_UX1000_.jpg" },
  
  ]
  },
  "Raid 2": {
    title: "Raid 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNjQyOTRiYTQtNzU0MS00ZGM2LWE4MTktODI5ZjZiN2NkYjYyXkEyXkFqcGc@._V1_.jpg",
    genre: ["Fantasy", "Thriller"],
    year: 2024,
    duration: "2h 5m",
    rating: 4.0,
    description:
      "A brave officer returns to take down corrupt powers as the sequel unfolds even deeper conspiracies.",
    language: "Hindi",
    trailerUrl: "https://youtu.be/kQF1gl7nLaU",
     cast: [
    { name: "Ajay Devgn", image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Ajay_Devgn_at_the_launch_of_MTV_Super_Fight_League.jpg" },
    { name: "Vanni Kapoor", image: "https://resizing.flixster.com/0hsVqnGCyEZ4MYlXP8BgLfbU4B8=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/730305_v9_aa.jpg" }
  ]
  },
  "Bhool Chuk Maaf": {
    title: "Bhool Chuk Maaf",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYjlhZTI1YmEtZDMyYi00YTM5LWI4ZGEtMzYwMjYxZjUyNzQzXkEyXkFqcGc@._V1_.jpg",
    genre: ["Action", "Sci-Fi"],
    year: 2023,
    duration: "2h 10m",
    rating: 4.8,
    description:
      "A high-tech revenge saga where a woman with a past uses futuristic tools to unravel the truth and rewrite her fate.",
    language: "Hindi",
    trailerUrl: "https://youtu.be/8E_IeWynvnc",
    cast: [
    { name: "RajKumar Rao", image: "https://bookingagentinfo.com/wp-content/uploads/2022/06/Rajkummar-Rao-Contact-Information.jpg" },
    { name: "Wamiqa Gabbi", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Wamiqa_Gabbi_snapped_at_Kalayanaraman_Family%E2%80%99s_Navrati_2024_celebrations_%28cropped%29.jpg/250px-Wamiqa_Gabbi_snapped_at_Kalayanaraman_Family%E2%80%99s_Navrati_2024_celebrations_%28cropped%29.jpg" }
  ]
  },
  "Sitaare Zameen Par": {
    title: "Sitaare Zameen Par",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZjdjODdiMTQtYWIwZi00NTQyLWE0YWItMzk3MTBhOGUyNDY3XkEyXkFqcGc@._V1_.jpg",
    genre: ["Family", "Drama"],
    year: 2024,
    duration: "2h 20m",
    rating: 4.3,
    description:
      "An inspiring journey of children who chase their dreams despite societal pressures, supported by a compassionate teacher.",
    language: "Hindi",
    trailerUrl: "https://youtu.be/YH6k5weqwy8",
    cast: [
    { name: "Aamir Khan", image: "https://static.toiimg.com/thumb/msid-122219219,imgsize-18942,width-400,resizemode-4/122219219.jpg" },
    { name: "Genelia Deshmukh", image: "https://static.toiimg.com/thumb/msid-117945086,width-400,resizemode-4/117945086.jpg" }
  ]
  },
  "Mission Impossible": {
    title: "Mission Impossible",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_.jpg",
    genre: ["Action", "Adventure"],
    year: 2023,
    duration: "2h 27m",
    rating: 4.5,
    description:
      "Ethan Hunt and his team must prevent a global catastrophe as they uncover a dangerous conspiracy threatening humanity.",
    language: "English",
    trailerUrl: "https://youtu.be/fsQgc9pCyDU",
     cast: [
    { name: "Tom Cruise", image: "https://hips.hearstapps.com/hmg-prod/images/tom-cruise-attends-the-australian-premiere-of-mission-news-photo-1723493931.jpg" },
    { name: "Emmanuelle Béart", image:"https://m.media-amazon.com/images/M/MV5BMzdhNjE5NmYtMWVmYi00MDUxLWFmOWEtMjkxOTk3OWJmNDk0XkEyXkFqcGc@._V1_QL75_UX364_.jpg" }
  ]
  },
  "Maa": {
    title: "Maa",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny4zLzEwICAxMS42SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00437726-mudtdfmjff-portrait.jpg",
    genre: ["Drama", "Emotional"],
    year: 2022,
    duration: "2h 18m",
    rating: 4.2,
    description:
      "A mother's unconditional love and sacrifice form the soul of this touching story of resilience and faith.",
    language: "Punjabi",
    trailerUrl: "https://youtu.be/lVvMbXiJjko",
    cast: [
    { name: "Kajol Devgan", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Kajol_snapped_promoting_Maa_%28cropped%29_%28cropped%29.jpg/250px-Kajol_snapped_promoting_Maa_%28cropped%29_%28cropped%29.jpg" },
    { name: "Ronit Roy", image: "https://m.media-amazon.com/images/M/MV5BMjQzMjEyMDY1Nl5BMl5BanBnXkFtZTgwNTM3OTczOTE@._V1_FMjpg_UX1000_.jpg" }
  ]
  },
  "How to Train Your Dragon": {
    title: "How to Train Your Dragon",
    poster:
      "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/how-to-train-your-dragon-et00420723-1739523360.jpg",
    genre: ["Animation", "Adventure"],
    year: 2010,
    duration: "1h 38m",
    rating: 4.7,
    description:
      "A young Viking defies tradition and befriends a dragon, proving that friendship is more powerful than fear.",
    language: "English",
    trailerUrl: "https://youtu.be/22w7z_lT6YM",
     cast: [
    { name: "Mason Thames", image: "https://m.media-amazon.com/images/M/MV5BOTVhODVmMjEtNTE2Ny00NWNjLThjNWMtYWUyNzZhYTdlYTFiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { name: "Nico Parker", image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Nico_Parker%2C_MovieZine_interview_%28cropped%29.png" }
  ]
  },
  "Metro... In Dino": {
  title: "Metro... In Dino",
  poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4yLzEwICAxMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00363553-bsunksefvn-portrait.jpg",
  genre: ["Drama", "Romance"],
  year: 2024,
  duration: "2h 15m",
  rating: 4.3,
  description: "An urban tale exploring bittersweet human connections in modern-day metropolitan life.",
  language: "Hindi",
  trailerUrl: "https://youtu.be/Wm2R3aJPY2M",
   cast: [
    { name: "Aditya Roy Kapur", image: "https://img.etimg.com/thumb/width-1200,height-1200,imgsize-46526,resizemode-75,msid-92570678/magazines/panache/it-can-be-draining-if-you-do-same-films-repeatedly-says-aditya-roy-kapur.jpg" },
    { name: "Sara Ali Khan", image: "https://ntvb.tmsimg.com/assets/assets/1208870_v9_aa.jpg" }
  ]
},

"Jurassic World: Rebirth": {
  title: "Jurassic World: Rebirth",
  poster:  "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny42LzEwICAyMy40SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00432498-tgbdztungl-portrait.jpg",
  genre: ["Sci-Fi", "Adventure"],
  year: 2025,
  duration: "2h 10m",
  rating: 4.6,
  description: "Dinosaurs rule again as humanity faces extinction and an epic battle for survival begins.",
  language: "English",
  trailerUrl: "https://youtu.be/jan5CFWs9ic",
   cast: [
    { name: "Bryce Dallas Howard", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bryce_Dallas_Howard_Cannes_2019.jpg/250px-Bryce_Dallas_Howard_Cannes_2019.jpg" },
    { name: "Chris Pratt", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Chris_Pratt_2018.jpg/1200px-Chris_Pratt_2018.jpg" }
  ]
},

"F1: The Movie": {
  title: "F1: The Movie",
  poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS41LzEwICA2Mi42SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00403839-mjfgpwurbn-portrait.jpg",
  genre: ["Sports", "Biography"],
  year: 2024,
  duration: "1h 58m",
  rating: 4.5,
  description: "A high-octane story of passion, rivalry, and speed in the world of Formula 1 racing.",
  language: "English",
  trailerUrl: "https://youtu.be/DyIeofKksXQ",
  cast: [
    { name: "Brad Pitt", image: "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_.jpg" },
    { name: "kerry condon", image: "https://deadline.com/wp-content/uploads/2021/08/Kerry-Condon-e1628593690642.jpeg" }
  ]
},

"Kannappa": {
  title: "Kannappa",
  poster: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-Ny4xLzEwICAyNC41SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00377025-mntpnwlvtn-portrait.jpg",
  genre: ["Mythological", "Action"],
  year: 2025,
  duration: "2h 20m",
  rating: 4.7,
  description: "The epic tale of Kannappa, a devoted Shiva follower whose faith is tested in divine ways.",
  language: "Telugu",
  trailerUrl: "https://youtu.be/IhGG2EM33mw",
   cast: [
    { name: "Vishnu Manchu", image: "https://m.media-amazon.com/images/M/MV5BOWU5ODg0MGMtODRmMi00NjBjLThmZDQtZDE5OTViMmNhZWI4XkEyXkFqcGc@._V1_.jpg" },
    { name: "Prabhas", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Prabhas_at_Saaho_Pre_release_event_%28cropped%29.jpg/250px-Prabhas_at_Saaho_Pre_release_event_%28cropped%29.jpg" }
  ]
}
};

const MovieDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();

  if (!title) {
    return <div className="movie-details-page">Loading...</div>;
  }

  const decodedTitle = decodeURIComponent(title);
  const movie = staticMovieData[decodedTitle];

  if (!movie) {
    return (
      <div className="movie-details-page">
        ❌ Movie not found.
        <div>
          <Link to="/" className="back-btn">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="movie-details-page">
      <div className="movie-info-container">
        <div className="poster-section">
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-poster-img"
          />
        </div>

        <div className="movie-text-content">
          <p className="movie-lang">{movie.language?.toUpperCase()}</p>
          <h2 className="movie-title-detail">{movie.title}</h2>

          <p className="rating">⭐ {movie.rating} User Rating</p>

          <p className="description">{movie.description}</p>

          <p className="sub-info">
            {movie.duration} • {movie.genre.join(", ")} • {movie.year}
          </p>

          <div className="trailer-btns">
            {movie.trailerUrl && (
              <a
                className="trailer-button"
                href={movie.trailerUrl}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ Watch Trailer
              </a>
            )}
            <button
              className="book-btn"
              onClick={() => navigate(`/book?movie=${encodeURIComponent(movie.title)}`)}
            >
              🎟️ Buy Tickets
            </button>
          </div>
        </div>
       
      </div>
 {movie.cast && movie.cast.length > 0 && (
  <div className="cast-section">
    <h3>Cast</h3>
    <div className="cast-scroll-container">
      {movie.cast.map((member, index) => (
        <div className="cast-card" key={index}>
          <img src={member.image} alt={member.name} />
          <p className="cast-name">{member.name}</p>
        </div>
      ))}
    </div>
  </div>
)}

      <div className="back-home">
        <Link to="/" className="back-btn">
          ⬅ Back to home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
