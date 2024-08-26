import { Button, TextArea } from '@radix-ui/themes';
import axios from "axios";
import { useState } from "react";
import "../styles/Modal.css";

const Modal=({closeModal, res_name})=>{
    const [rating, setRating] = useState(0)
    const handleClick = (newRating) => {
        setRating(newRating);
      };
    const [review, setreview] = useState("")
 
    const handleFormSubmit= async(e)=>{
        e.preventDefault();
        try {
            const postData = {
                user_id: 1,
                hotel_name: res_name,
                review: review,
                rating: rating
            }
            const response = await axios.post(import.meta.env.VITE_API_URL+'/review', postData);
            console.log(response, response.data, response.success, response.data.success)
            if(response.data.success){
                closeModal()
            }
        }
        catch(error){
            console.log(error)
        }
    }
    const ratingChanged = (newRating) => {
        console.log(newRating);
      };
          
    return(
        <div className="right-10 fixed bottom-32 shadow-2xl px-16 py-10 bg-white rounded-xl">
        <div className="text-xl font-bold">
            <div><h2>Rating</h2>
            {/* <StarRating initialRating={0}/> */}
                <button className="w-10" onClick={()=> {console.log("adding");if(rating > 0) {console.log("adding");setRating(rating-1)}}} >-</button>                
                    {rating}
                <button className="w-10" onClick={()=> {if(rating < 5) {console.log("adding");setRating(rating+1)}}}>+</button>                

            </div>
            <br/>
            <div><h2>Review</h2>
            <TextArea placeholder="Review"  onChange={(e)=>{setreview(e.target.value)}} name={review}/>
            </div>
            <br/>
            <Button className="" onClick={handleFormSubmit}>
            Submit
            </Button>
        </div>
        </div>
    )
}
export default Modal


  