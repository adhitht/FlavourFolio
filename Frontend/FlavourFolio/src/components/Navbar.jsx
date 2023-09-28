import {Link} from 'react-router-dom';
import {BsFillPersonFill} from 'react-icons/bs'
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookie] = useCookies()
  const authcookie = cookies.authtoken
  console.log(authcookie)
  return (
    <nav className='navbar h-[72px]'>
      
      <Link to ='/'>  
        <div className='logo'>
        <h2>Flavourfolio</h2>
        </div>
      </Link>
      <Link to='/Login'>
        {authcookie ? 
        <div className="profile-icon-main-page">
          <BsFillPersonFill size={'90%'} color='rgb(0,0,0,0.3)'/> 
        </div>
          : <div className='FilterButtonSelec'>Sign in</div>}
      </Link>
    </nav>
  )
}

export default Navbar
