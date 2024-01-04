import './navbar.css';
import { IonIcon } from '@ionic/react';
import { searchOutline, homeOutline, folderOpenOutline, pieChartOutline, peopleOutline, chatbubblesOutline, settingsOutline, logoHackernews } from 'ionicons/icons';

const Navbar = () => {
  return (
    <nav id="navbar">
      <ul className="navbar-items flexbox-col">
        <li className="navbar-logo flexbox-left">
          <a className="navbar-item-inner flexbox">
                <IonIcon icon={logoHackernews} />
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={searchOutline} />
            </div>
            <span className="link-text">Search</span>
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={homeOutline}></IonIcon>
            </div>
            <span className="link-text">Home</span>
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={folderOpenOutline}></IonIcon>
            </div>
            <span className="link-text">Projects</span>
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={pieChartOutline}></IonIcon>
            </div>
            <span className="link-text">Dashboard</span>
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={peopleOutline}></IonIcon>
            </div>
            <span className="link-text">Team</span>
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={chatbubblesOutline}></IonIcon>
            </div>
            <span className="link-text">Support</span>
          </a>
        </li>
        <li className="navbar-item flexbox-left">
          <a className="navbar-item-inner flexbox-left">
            <div className="navbar-item-inner-icon-wrapper flexbox">
              <IonIcon icon={settingsOutline}></IonIcon>
            </div>
            <span className="link-text">Settings</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
