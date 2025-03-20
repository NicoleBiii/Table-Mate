import "./ClientMenuBar.scss";

function ClientMenuBar({ categories, selectedCategory, onCategorySelect }) {

  return (
    <div className="c-menubar">
      {categories.map((category, index) => (
        <div 
            key={index}
            className={`c-menubar__item ${selectedCategory === category ? "c-menubar__item--active" : ""}`}
            onClick={() => onCategorySelect(category)}
        >{category}</div>
      ))
      }
    </div>
  )
}

export default ClientMenuBar
