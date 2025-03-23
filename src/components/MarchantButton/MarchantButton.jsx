import "./MarchantButton.scss";

function MarchantButton({ children, onClick }) {
  return (
    <div 
      className="marchant-button"
      onClick={onClick}
      role="button"
      tabIndex={0}
      >
      {children}
    </div>
  )
}

export default MarchantButton
