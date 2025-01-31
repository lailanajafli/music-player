import React from "react";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import music1 from "../assets/images/music1.png";
import music2 from "../assets/images/music2.png";
import music3 from "../assets/images/music3.png";
import music4 from "../assets/images/music4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

const Player = () => {
  return (
    <section className="playList">
      <div className="container">
        <div className="row">
          <div className="searchBtn">
            <FiSearch className="search" />
            <input type="text" />
          </div>
          <div className="recently">
            <div className="recentlyText">
              <h2>Recently Played</h2>
              <p>See All</p> 
            </div>
            <div className="slider">
              <Swiper
                className="my-swiper"
                loop={true}
                modules={[Navigation]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={50}
                slidesPerView={1}
              >
                <SwiperSlide>
                  <div className="p-10 bg-red-500 text-white text-center text-xl slider sliderCart">
                    <div className="cart">
                      <img src={music1} alt="#" />
                      <h3>Antretor</h3>
                      <p>Yann tiarsen</p>
                    </div>
                    <div className="cart">
                      <img src={music2} alt="#" />
                      <h3>Back To Her Men</h3>
                      <p>Demien Rice</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="p-10 bg-red-500 text-white text-center text-xl slider sliderCart">
                    <div className="cart">
                      <img src={music3} alt="#" />
                      <h3>Hotling Bling</h3>
                      <p>Bellie Eilish</p>
                    </div>
                    <div className="cart">
                      <img src={music4} alt="#" />
                      <h3>Neghtmare</h3>
                      <p>Halsey</p>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="p-10 bg-red-500 text-white text-center text-xl slider sliderCart">
                    <div className="cart">
                      <img src={music1} alt="#" />
                      <h3>Antretor</h3>
                      <p>Yann tiarsen</p>
                    </div>
                    <div className="cart">
                      <img src={music2} alt="#" />
                      <h3>Back To Her Men</h3>
                      <p>Demien Rice</p>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="playlist">
              <div className="playlistText">
                <h2>RECOMMENDATION</h2>
                <p>See All</p>
              </div>
              <ul>
                <li>
                  <div className="playlistItem">
                    <img src={music1} alt="#" />
                    <div className="listText">
                      <div className="text">
                        <h3>music name</h3>
                        <p>Artist</p>
                      </div>
                      <div className="heart">
                        <FaRegHeart className="heartt" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="playlistItem">
                    <img src={music2} alt="#" />
                    <div className="listText">
                      <div className="text">
                        <h3>music name</h3>
                        <p>Artist</p>
                      </div>
                      <div className="heart">
                        <FaRegHeart className="heartt" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="playlistItem">
                    <img src={music3} alt="#" />
                    <div className="listText">
                      <div className="text">
                        <h3>music name</h3>
                        <p>Artist</p>
                      </div>
                      <div className="heart">
                        <FaRegHeart className="heartt" />
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="playlistItem">
                    <img src={music4} alt="#" />
                    <div className="listText">
                      <div className="text">
                        <h3>music name</h3>
                        <p>Artist</p>
                      </div>
                      <div className="heart">
                        <FaRegHeart className="heartt" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Player;
