import React from "react";
import Navbar from "../components/Navbar";
import BgImage from "../assets/bgimage.png";
import searchIcon from '../assets/search-icon.png'
const HomePage = () => {

  return (
    <>
      <Navbar />
      <div className="main-page-content">
        <div className="content">
          <span className="black">Flavors</span>
          <span className="red">Unleashed,</span>
          <span className="black">Stories </span>
          <span className="purple">Unfolded</span>
          <div className="searchBox">
            <form method="post">
              <input type="text" name="Search" id="Search" />
              <button type="submit">
                <div className="search-icon"><img src="" alt="" /></div>
              </button>
            </form>
          </div>
        </div>
        <div className="image">
          <picture>
            <img src={BgImage} alt="bgimage" />
          </picture>
        </div>
      </div>
    </>
  );
};

export default HomePage;
