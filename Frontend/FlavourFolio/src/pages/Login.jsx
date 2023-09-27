import Navbar from "../components/Navbar";
import CherryOnTop from "../assets/cherry-on-top.png";
const Login = () => {
  return (
    <>
      <Navbar />  
      <div className="flex justify-between w-screen h-full">
        <div></div>
        <div className="flex flex-col items-center justify-center login">
          <h2 className="mb-16 text-3xl font-bold">Login</h2>
          <button type="button" className="login-with-google-btn bg-[#160044]">
            Sign in with Google
          </button>
        </div>
        <div className="cherry">
          <picture>
            <img src={CherryOnTop} alt="cherryImage" className="w-[600px] h-[890px] "/>
          </picture>
        </div>
      </div>
    </>
  );
};

export default Login;
