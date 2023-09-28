import Navbar from "../components/Navbar";
import BgImage from "../assets/bgimage.png";
import searchIcon from "../assets/search-icon.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  FilterButtonSelec,
  FilterButtonUnselec,
} from "../components/FilterButton";
import "../styles/homepage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Rating from "../components/rating";
import ReviewCard from "../components/ReviewCard";

const HomePage = () => {
  const [filterTitles, setFilterTitles] = useState([]);
  useEffect(() => {
    axios
      .get("someapi")
      .then((response) => {
        setFilterTitles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching filter titles:", error);
      });
  }, []);

  const cardData = {
    Name: "Tatva",
    Location: "Jubilee Hills",
    Rating: 4.23,
    numberOfReviews: 250,
    tags: ["Chinese", "Continental", "Italic"],
    picture: "https://etimg.etb2bimg.com/photo/75161189.cms",
    stars:{"5": 65, "4": 90, "3": 89, "2": 76,"1": 90}
  };
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
      <div className="filters_div w-[100%] my-10 overflow-y-scroll">
        <FilterButtonSelec title="Filter" />
        <FilterButtonUnselec title="Top Rated" />
        <FilterButtonUnselec title="Most Relevancy" />
        {filterTitles.map((title, index) => {
          <FilterButtonUnselec title={title} key={index} />;
        })}
      </div>
      <div className="flex-wrap card_div">
        <ReviewCard data={cardData} />
        <ReviewCard data={cardData} />
        <ReviewCard data={cardData} />
        <ReviewCard data={cardData} />
        <ReviewCard data={cardData} />
        <ReviewCard data={cardData} />
        <ReviewCard data={cardData} />
      </div>
    </>
  );
};

export default HomePage;
