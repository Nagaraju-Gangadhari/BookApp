import './index.css'
import {FaYoutube, FaInstagram, FaGoogle, FaTwitter} from 'react-icons/fa'
const Footer = () => (
  <>
    <div className="footer-container">
      <FaGoogle className="icon-contain" />
      <FaInstagram className="icon-contain" />
      <FaTwitter className="icon-contain" />
      <FaYoutube className="icon-contain" />
    </div>
    <p className="para">Contact Us</p>
  </>
)

export default Footer
