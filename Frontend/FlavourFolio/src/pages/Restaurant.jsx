import Navbar from "../components/Navbar";

const Restaurant = () => {
  const cardData = {
    Name: "Tatva",
    Location: "Jubilee Hills",
    Rating: 4.23,
    numberOfReviews: 250,
    tags: ["Chinese", "Continental", "Italic"],
    picture: "https://etimg.etb2bimg.com/photo/75161189.cms",
    stars: { 5: 65, 4: 90, 3: 89, 2: 76, 1: 90 },
  };

  const { Name, Location, Rating, numberOfReviews, tags, picture, stars } =
    cardData;
  const tagsString = tags ? tags.join(" • ") : "";

  // Calculate the total number of reviews from the stars object
  let reviewTotal = 0;
  for (const star in stars) {
    reviewTotal += stars[star];
  }

  console.log(reviewTotal);

  

  

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-around w-screen h-3/4">
        <div className="flex flex-col justify-between w-[600px]">
          <section>
            <span className="text-2xl font-bold ">
              {Name}, {Location}
            </span>
            <div className="flex items-center gap-3 mt-4 mb-2">
              <span className="w-[60px] bg-[#229B44] rounded-lg text-white flex p-[2px]">
                ★ {Rating}
              </span>
              <span className="h-full font-semibold leading-relaxed">
                {numberOfReviews}+ Reviews
              </span>
            </div>
            <div className="flex flex-col justify-start">
            <span className="my-2 font-semibold">
              😄 {(Rating * 20).toFixed(1)}% people liked this restaurant
            </span>
            <span className="my-2 mb-4 font-semibold">{tagsString}</span>             
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold">Reviews</h2>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">Excellent</span>
                <div className="w-[300px] h-2 bg-[#D9D9D9] rounded-md ml-2  ">
                  <div
                    className="h-full bg-[#31962F] rounded-s-md"
                    style={{ width: `${(stars[5] / reviewTotal) * 600}px` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">Good</span>
                <div className="w-[300px] h-2 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#7DB77C] rounded-s-md"
                    style={{ width: `${(stars[4] / reviewTotal) * 600}px` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">Average</span>
                <div className="w-[300px] h-2 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#E7DD00] rounded-s-md"
                    style={{ width: `${(stars[3] / reviewTotal) * 600}px` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">Below Average</span>
                <div className="w-[300px] h-2 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#DA7314] rounded-s-md"
                    style={{ width: `${(stars[2] / reviewTotal) * 600}px` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="font-semibold">Poor</span>
                <div className="w-[300px] h-2 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#DF0000] rounded-s-md"
                    style={{ width: `${(stars[1] / reviewTotal) * 600}px` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <picture className="w-[643px] h-[429px] block">
            <img src={picture} alt="image.png" className="rounded-[23px]" />
          </picture>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
