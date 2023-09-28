import Navbar from "../components/Navbar";
import ReviewList from "../components/reviewComponent";
import {AiOutlineMessage} from 'react-icons/ai'
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Restaurant = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { restaurant_name } = useParams();
  const openModal = () => {setIsModalOpen(true); };
  const changeModal = () => {setIsModalOpen(!isModalOpen); };
  const [res_details, setres_details] = useState()
  const [reviews, setreviews] = useState()

useEffect(()=> {
  const fetchDetails = async () => {
    const {data} = await axios.get(`http://localhost:8000/getrestaurant?hotel_name=${restaurant_name}`)
    console.log(data);
    setres_details(data[0]);
  }
  const fetchReviews = async () => {
    const {data} = await axios.get(`http://localhost:8000/getreviews?hotel_name=${restaurant_name}`)
    console.log(data);
    setreviews(data);
  }
  fetchDetails();
  fetchReviews();
}, [])


  const reviews2 = [
    {
      content:
        "Great food and great atmosphere! The chicken tikka masala and garlic naan tasted as if they had come straight from India itself. Because I was so pleased with the entrie I ended up ordering the gulab jamun desert and mango lassi beverage and again I was nothing but pleased! Also the employees and management were all very attentive and they made sure we had everything we needed from beginning to end. The manager Matt personally came around even to check on our experience!",
      photo:
        "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
      name: "Riya",
      rating: 4.5,
      emoji: "😊",
    },
    {
      content:
        "Great food and great atmosphere! The chicken tikka masala and garlic naan tasted as if they had come straight from India itself. Because I was so pleased with the entrie I ended up ordering the gulab jamun desert and mango lassi beverage and again I was nothing but pleased! Also the employees and management were all very attentive and they made sure we had everything we needed from beginning to end. The manager Matt personally came around even to check on our experience!",
      photo:
        "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
      name: "Riya",
      rating: 4.5,
      emoji: "😊",
    },
    {
      content:
        "Great food and great atmosphere! The chicken tikka masala and garlic naan tasted as if they had come straight from India itself. Because I was so pleased with the entrie I ended up ordering the gulab jamun desert and mango lassi beverage and again I was nothing but pleased! Also the employees and management were all very attentive and they made sure we had everything we needed from beginning to end. The manager Matt personally came around even to check on our experience!",
      photo:
        "https://images.unsplash.com/photo-1576828831022-ca41d3905fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1923&q=80",
      name: "Riya",
      rating: 4.5,
      emoji: "😊",
    },
    //add
  ];

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-around w-screen mt-32 h-3/4">
        <div className="flex flex-col justify-between w-[600px]">
          <section>
            <div className="pb-8 text-5xl font-bold mt-[-100px]">
              {res_details && res_details.hotel_name}
            </div>
            <div className="flex items-center gap-3 mt-4 mb-2">
              <span className="w-[60px] bg-[#229B44] rounded-lg text-white flex p-[2px] ">
                ★ {res_details && (Number(res_details.rating)).toFixed(2)}
              </span>
              <span className="h-full text-2xl font-semibold leading-relaxed">
                {res_details && res_details.numberofreviews}+ Reviews
              </span>
            </div>
            <div className="flex flex-col justify-start">
              <span className="my-2 text-xl font-semibold">
                😄 {res_details && (Number(res_details.sentimental_score) * 100).toFixed(2)}% people liked this restaurant
              </span>
            </div>
          </section>
          <section>
            <h2 className="text-4xl font-bold">Reviews</h2>
            <div className="flex flex-col">
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-semibold">Excellent</span>
                <div className="w-[300px] h-3 bg-[#D9D9D9] rounded-md ml-2  ">
                  <div
                    className="h-full bg-[#31962F] rounded-s-md"
                    style={{ width: `${ res_details && (Number(res_details.count_rating_5) / Number(res_details.numberofreviews)) * 600}px` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-semibold">Good</span>
                <div className="w-[300px] h-3 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#7DB77C] rounded-s-md"
                    style={{ width: `${ res_details && (Number(res_details.count_rating_4) / Number(res_details.numberofreviews)) * 600}px` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-semibold">Average</span>
                <div className="w-[300px] h-3 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#E7DD00] rounded-s-md"
                    style={{ width: `${ res_details && (Number(res_details.count_rating_3) / Number(res_details.numberofreviews)) * 600}px` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-semibold">Below Average</span>
                <div className="w-[300px] h-3 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#DA7314] rounded-s-md"
                    style={{ width: `${ res_details && (Number(res_details.count_rating_2) / Number(res_details.numberofreviews)) * 600}px` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xl font-semibold">Poor</span>
                <div className="w-[300px] h-3 bg-[#D9D9D9] rounded-md ml-2">
                  <div
                    className="h-full bg-[#DF0000] rounded-s-md"
                    style={{ width: `${ res_details && (Number(res_details.count_rating_1) / Number(res_details.numberofreviews)) * 600}px` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div>
          <picture className="w-[643px] h-[429px] block">
            <img src={res_details &&res_details.picture} alt="image.png" className="rounded-[23px]" />
          </picture>
        </div>
      </div>

      {/* Reviews */}
      <div >
        {reviews && <ReviewList reviews={reviews} />}
      </div>

      <div  onClick={changeModal} className="select-none cursor-pointer	right-10 fixed bottom-10 flex gap-3 text-2xl items-center	bg-sky-500 pd-10 text-white rounded-lg p-3 shadow-2xl">
    
      <AiOutlineMessage size={40} />
        Post Review
      </div>
     
      {isModalOpen && <Modal res_name={restaurant_name} closeModal={()=> {setIsModalOpen(false)}} />}
     
    </>
    
  );
};
  
export default Restaurant;
