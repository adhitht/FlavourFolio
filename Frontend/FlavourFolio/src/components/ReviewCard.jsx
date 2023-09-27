import {Link} from 'react-router-dom';


const Card = (data) => {
  const { Name, Location, Rating, numberOfReviews, tags, picture } = data.data;
  const tagsString = tags ? tags.join(".") : "";
  return (
    <Link className="container card w-[20vw] aspect-[.9] bg-[#E8E3E3] rounded-[30px]">
      <img src={picture} alt="image.png" className="rounded-t-[30px] w-full h-auto" />
      <div className="flex flex-col ml-2">
        <h2 className="mb-2 text-3xl font-semibold">
          {Name},{Location}
        </h2>
        <div className="flex items-center justify-between mb-2">
          <span className="w-[60px] bg-[#229B44] rounded-lg text-white flex p-[2px] ">
            &nbsp;★&nbsp;
            {Rating}
          </span>
          <span className="h-full font-semibold leading-relaxed">{numberOfReviews}+ Reviews</span>
          <span></span>
        </div>
        <div
        className="font-semibold text-sg text-slate-600 "
        >{tagsString}</div>
      </div>
    </Link>
  );
};

export default Card;
