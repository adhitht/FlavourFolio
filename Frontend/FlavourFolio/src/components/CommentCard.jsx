const CommentCard = (review, index) => {
  const { content, photo, name, rating, emoji } = review;
  return (
    <>
      <div key={index} className="container w-3/4 bg-[#EFEFEF]">
        <div>
          <img src={photo} alt="image.png" className="w-16 h-16 rounded-full" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold ">{name}</span>
            <span className="w-[60px] bg-[#229B44] rounded-lg text-white flex p-[2px]">
                ★ {rating}
            </span>
          </div>
        </div>
        <div className="flex justify-center w-[90%] h-12">
            {content}
        </div>
        <span className="font-italic">{emoji} feels good about the place</span>
      </div>
    </>
  );
};

export default CommentCard;
