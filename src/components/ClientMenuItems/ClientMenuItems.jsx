import "./ClientMenuItems.scss";
import AlterImage from "../../assets/images/logo_withbg.PNG";
import { Plus } from 'lucide-react';

function ClientMenuItems({ selectedCategory, menuItems}) {
  return (
    <div className="c-dishes">
      
      {menuItems[selectedCategory]?.map((item, index) => (
        <div className="c-dish">
            <div className="c-dish__photo">
            <img 
                src={item.image ? item.image: AlterImage} 
                alt="menuitem photo" 
            />
            </div>
            <div className="c-dish__bottom">
                <h3 className="c-dish__name">{item.name}</h3>
                <p className="c-dish__description">{item.description}</p>
                <div className="c-dish__order">
                <h3 className="c-dish__price">${item.price}</h3>
                <button className="c-dish__add"><Plus className="c-dish__icon"/></button>
                </div>
            </div>

        </div>



      ))}
    </div>
  )
}

export default ClientMenuItems
