import { UserCircle, History, CalendarDays, User, Heart } from 'lucide-react';
import "./UserProfile.scss";
import { useTranslation } from "react-i18next";

function UserProfile() {
  const { t } = useTranslation();
  return (
    <div className="user-profile">
      <div className="user-profile__header">
        <UserCircle />
        <h1>John Doe</h1>
      </div>

      <div className="user-profile__grid">
        <a href="#" className="user-profile__grid-item">
          <History />
          <span>{t("order_history")}</span>
        </a>
        
        <a href="#" className="user-profile__grid-item">
          <CalendarDays />
          <span>{t("my_bookings")}</span>
        </a>
        
        <a href="#" className="user-profile__grid-item">
          <User />
          <span>{t("my_profile")}</span>
        </a>
        
        <a href="#" className="user-profile__grid-item">
          <Heart />
          <span>{t("my_favorites")}</span>
        </a>
      </div>
    </div>
  )
}

export default UserProfile;