import "../styles/Modal.css"
import { useState } from "react"
import axios from "axios"
const Modal=({closeModal})=>{
    const [formData,setFormData]=useState({
        ratings:"",
        review:""})
    const handleInputChange=(e)=>{
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value});
          }
    const handleFormSubmit= async(e)=>{
        e.preventDefault();
        try {
            
            const postData = {
              rating: formData.ratings,
              review: formData.review,
             
            };
        
            
            const response = await axios.post('/api/your-post-endpoint', postData);
        }
        catch(error){
            console.log(error)
        }
    }
          
    return(
        <>
        <form onSubmit={handleFormSubmit}>
        <div className="main_Modal">
            <button className="button_modal" onClick={closeModal}>Close</button>
            <div><h2>Rating</h2>
                <input name={formData.ratings} type="number" onChange={handleInputChange}/>
            </div>
            <div><h2>Review</h2>
                <input name={formData.review} type="text" onChange={handleInputChange}/>
            </div>
            <button className="submit_button" type="submit">Submit</button>
        </div>
        </form>
        </>
    )
}
export default Modal

