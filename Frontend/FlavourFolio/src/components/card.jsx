import {AiTwotoneStar} from 'react-icons/ai'

const Card = (data) => {
  
  const tagsString = data.tags ? data.tags.join(', ') : '';
    console.log("data:",data);
  return (
    <div className="card ">
        <img src={data.picture} alt="image.png" />
        {console.log("picture:",data.picture)}
      <div className="flex flex-col">
        <h2>{data.Name}+,+{data.Location}</h2>
        <div className="flex">
        <span className='w-2 h-4 bg-[#229B44]'>
            <AiTwotoneStar/>
            {data.Rating}
        </span>
        <span>
            {data.numberOfReviews}+ Reviews
        </span>
        </div>
        <div>
            {tagsString}
        </div>
      </div>
    </div>
  )
}

export default Card
