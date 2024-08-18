import React , { useState, useEffect }from "react";

const SlideImgs = ({images}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [images.length]);
  return (
    <div>
      SlideImgs
      <div>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default SlideImgs;
