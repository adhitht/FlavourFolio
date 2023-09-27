import {AiTwotoneStar} from 'react-icons/ai'

const card = (Name,Location,Rating,numberOfReviews,tags,picture) => {
    const tagsString = tags.join(".");
  return (
    <div className="card ">
      <picture>
        <img src={picture} alt="image.png" />
      </picture>
      <div className="flex flex-col">
        <h2>{Name}+,+{Location}</h2>
        <div className="flex">
        <span className='w-2 h-4 bg-[#229B44]'>
            <AiTwotoneStar/>
            {Rating}
        </span>
        <span>
            {numberOfReviews}+ Reviews
        </span>
        </div>
        <div>
            {tagsString}
        </div>
      </div>
    </div>
  )
}

export default card
