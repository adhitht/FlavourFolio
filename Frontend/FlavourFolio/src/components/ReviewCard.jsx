
import '../styles/homepage.css';

const Card = ({data}) => {
  const { Name, picture } = data;
  // const tagsString = tags ? tags.join("•") : "";
  const rating = Number(data.average_rating).toFixed(2)
  return (
    <div className="review-card my-10 mx-6 aspect-[.9] bg-[#E8E3E3] rounded-[30px] cursor-pointer">
     <img src={picture} alt={data.hotel_name} className="rounded-t-[30px] w-full h-auto" />
      <div className="flex flex-col px-4 ml-2">
        <br/>
        <h2 className="mb-2 text-3xl font-semibold">
          {data.hotel_name}
        </h2>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-[60px] bg-[#229B44] rounded-lg text-white flex p-[2px]">
            ★ {rating}
          </span>
          <span className="h-full font-semibold leading-relaxed">
            {data.count}+ Reviews
          </span>
        </div>
        {/* <div className="pb-4 font-semibold text-sg text-slate-600">
          {tagsString}
        </div> */}
      </div>
    </div>
  );
};

export default Card;
