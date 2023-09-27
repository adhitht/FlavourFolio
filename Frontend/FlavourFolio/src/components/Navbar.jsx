import {Link} from 'react-router-dom';
import {BsFillPersonFill} from 'react-icons/bs'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link to ='/'>  
        <div className='logo'>
        <h2>Falvourfolio</h2>
        </div>
      </Link>
      <Link to='/Login'>
        <div className="profile-icon-main-page">
          <BsFillPersonFill size={'90%'} color='rgb(0,0,0,0.3)'/>
        </div>
      </Link>
    </nav>
  )
}

export default Navbar
