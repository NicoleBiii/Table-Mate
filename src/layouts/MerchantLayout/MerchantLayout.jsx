import MerchantHeader from "../../components/MerchantHeader/MerchantHeader";
import MerchantSideNav from "../../components/MerchantSideNav/MerchantSideNav";
import "./MerchantLayout.scss"

function MerchantLayout({ children }) {
  return (
    <div>
      <MerchantHeader />
      <div className="merchant_content">
        <MerchantSideNav />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default MerchantLayout
