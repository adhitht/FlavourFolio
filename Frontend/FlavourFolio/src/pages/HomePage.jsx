import axios from "axios";
import { useEffect, useState } from "react";
import BgImage from "../assets/bgimage.png";
import searchIcon from "../assets/search-icon.png";
import Navbar from "../components/Navbar";
import ReviewCard from "../components/ReviewCard";
import "../styles/homepage.css";

const HomePage = () => {
  const [restaurants, setrestaurants] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const { data } = await axios.get(
        import.meta.env.VITE_API_URL + "/restaurants"
      );
      console.log(data);
      setrestaurants(data);
      console.log(restaurants);
    };
    fetchRestaurants();
  }, []);

  return (
    <>
      <Navbar />
      <div className="main-page-content">
        <div className="content lg:mx-16">
          <span className="black">Flavors</span>
          <span className="red">Unleashed,</span>
          <span className="black">Stories </span>
          <span className="purple">Unfolded</span>
          <div className="searchBox bg-[#D9D9D9]  flex justify-between w-full h-16 rounded-full">
            <input
              type="text"
              name="Search"
              id="Search"
              className="search-bar bg-[transparent] w-full color-[#696969] px-8"
              placeholder="Search Restaurants"
            />
            <button type="submit" className="mr-4">
              <div className="w-12 h-12 search-icon">
                <img src={searchIcon} alt="searchIcon" />
              </div>
            </button>
          </div>
        </div>
        <div className="image">
          <picture>
            <img src={BgImage} alt="bgimage" className="bgImage" />
          </picture>
        </div>
      </div>
      <div className="flex-wrap card_div">
        {restaurants &&
          restaurants.map((restaurant) => {
            return <ReviewCard data={restaurant} />;
          })}
      </div>
    </>
  );
};

export default HomePage;
