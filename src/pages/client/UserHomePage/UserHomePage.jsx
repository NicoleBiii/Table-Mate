import React from 'react';
import "./UserHomePage.scss"
import logo from "../../../assets/images/logo_bright.PNG";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import '../../../i18n';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChefHat, ListEnd, X } from 'lucide-react';

function UserHomePage() {
    const { tableNumber } = useParams();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [showWaitlistModal, setShowWaitlistModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        partySize: 2
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // add waitlist logic
        alert('Waitlist joined successfully!');
        setShowWaitlistModal(false);
    };

    useEffect(() => {
        if(!tableNumber) {
            navigate('/scan');
        }
    },[tableNumber, navigate]);

  return (
    <div className="u-home">

      <img src={logo} alt="logo" className="u-home__logo" />
      <Link
        to={`/user/${tableNumber}/menu`} 
        className='u-home__link'
      >
        {t("order")}
        <ChefHat className='u-home__icon'/>
      </Link>
      <Link 
        className='u-home__link'
        onClick={() => setShowWaitlistModal(true)}
      >
        {t("waitlist")}
        <ListEnd className='u-home__icon'/>
      </Link>
          {/* Waitlist Modal */}
          {showWaitlistModal && (
        <div className="waitlist-modal" onClick={() => setShowWaitlistModal(false)}>
            <div className="waitlist-content" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="close-button"
                    onClick={() => setShowWaitlistModal(false)}
                >
                    <X size={24} />
                </button>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{t("name")}</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t("phone")}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>{t("party_size")}</label>
                        <select
                            name="partySize"
                            value={formData.partySize}
                            onChange={handleInputChange}
                        >
                            {[...Array(10).keys()].map(n => (
                                <option key={n+1} value={n+1}>{n+1}</option>
                            ))}
                        </select>
                    </div>
                    
                    <button type="submit" className="submit-button">
                        {t("join_waitlist")}
                    </button>
                </form>
            </div>
        </div>
    )}
    </div>
  )
}

export default UserHomePage;
