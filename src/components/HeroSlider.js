import { useState, useEffect } from "react";
import { motion , AnimatePresence} from "framer-motion";
import "../App.css"; // ✅ Go up one level to find App.css


const slides = [
  {
    
    image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1750920739963_mehfilesartaajdesktopjuly.jpg",
  },
  {
    
    image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1749204467368_krishnaamusicblissandbeyondjaipurjodhpurdesktop.jpg"},
 
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="hero-slider-carousel">
      <button className="arrow left" onClick={prevSlide}>❮</button>
      <div className="slide-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
          >
            <img src={slides[index].image} alt="slide" />
            <div className="slide-content">
              <h2>{slides[index].title}</h2>
              <p>{slides[index].description}</p>
            
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button className="arrow right" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default HeroSlider;