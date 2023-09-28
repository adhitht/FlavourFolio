
import '../styles/homepage.css';

const Card = ({data}) => {
  const { Name, Location, Rating, numberOfReviews, tags, picture } = data;
  const tagsString = tags ? tags.join("•") : "";

  return (
    <div className="review-card my-10 card mx-6 aspect-[.9] bg-[#E8E3E3] rounded-[30px] cursor-pointer">
     <img src={picture} alt={Name} className="rounded-t-[30px] w-full h-auto" />
      <div className="flex flex-col px-4 ml-2">
        <br/>
        <h2 className="mb-2 text-3xl font-semibold">
          {Name}, {Location}
        </h2>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-[60px] bg-[#229B44] rounded-lg text-white flex p-[2px]">
            ★ {Rating}
          </span>
          <span className="h-full font-semibold leading-relaxed">
            {numberOfReviews}+ Reviews
          </span>
        </div>
        <div className="pb-4 font-semibold text-sg text-slate-600">
          {tagsString}
        </div>
      </div>
    </div>
  );
};

export default Card;
