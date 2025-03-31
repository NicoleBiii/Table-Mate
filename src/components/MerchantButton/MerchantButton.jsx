import "./MerchantButton.scss";

function MerchantButton({ children, onClick }) {
  return (
    <div 
      className="merchant-button"
      onClick={onClick}
      role="button"
      tabIndex={0}
      >
      {children}
    </div>
  )
}

export default MerchantButton
