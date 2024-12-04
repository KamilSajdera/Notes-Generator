import "./mobile-error.css";

import image from "../assets/img/oops.png";
import rotate from "../assets/img/rotate.png"

export default function MobileError() {
  return (
    <div className="wrapper">
        <h1>Sheet Music Generator</h1>
      <img src={image} alt="Oops!" />
      <h2 className="mobile-title">Hi! We're glad you are here. But...</h2>
      <p className="mobile-description">
        For now, we do not share this app for mobile devices. The reason is this
        kind of app is hard to use by phone and might be illegible. However we prepare solution for
        you. If you don't have posibility to use app by computer, you can rotate your phone!
      </p>

      <img src={rotate} alt="Rotating phone" className="rotating-phone"/>
    </div>
  );
}
