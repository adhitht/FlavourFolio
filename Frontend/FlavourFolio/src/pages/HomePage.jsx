import Navbar from "../components/Navbar";
import BgImage from "../assets/bgimage.png";
import searchIcon from "../assets/search-icon.png";
import FilterButton from "../components/FilterButton";
import "../styles/homepage.css"
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
          <div className="searchBox w-[400px]  bg-[#D9D9D9] rounded-full">
            <form
              method="post"
              className="flex justify-between w-full h-16 rounded-full"
            >
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
            </form>
          </div>
        </div>
        <div className="image">
          <picture>
            <img src={BgImage} alt="bgimage" />
          </picture>
        </div>
      </div>
      <div className="main-page2">
        <FilterButton title="Buy"/>
        <div className="card_div">
            <div className="card1"></div>
            <div className="card2"></div>
            <div className="card3"></div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
