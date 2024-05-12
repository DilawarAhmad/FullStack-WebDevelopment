
import './Topbar.css';

export const Topbar = () => {
  
  return (
    <div className='top'>
      <div className='top-left'>
        <i className='topIcon fab fa-facebook-square'></i>
        <i className='topIcon fab fa-instagram-square'></i>
        <i className='topIcon fab fa-twitter-square'></i>
        <i className='topIcon fab fa-pinterest-square'></i>
      </div>

      <div className='top-center'>
        <ul className='topList'>
          <li className='topListItem'>Home</li>
          <li className='topListItem'>ABOUT</li>
          <li className='topListItem'>CONTACT</li>
          <li className='topListItem'>WRITE</li>
          <li className='topListItem'>LOGOUT</li>
        </ul> 
      </div>
      
      <div className='top-right'>
        <img className='topImg' src='https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=600' alt='not found' />
        
        
        <i className="topSearchIcon fas fa-search"></i>
        <ul className='topList'>
          <li className='topListItem'>
            LOGIN
          </li>
          <li className='topListItem'>
            REGISTER
          </li>
        </ul>
      </div>
      

    </div>
  )
}
