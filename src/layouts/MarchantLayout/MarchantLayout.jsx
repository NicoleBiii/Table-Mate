import MarchantHeader from "../../components/MarchantHeader/MarchantHeader";
import MarchantSideNav from "../../components/MarchantSideNav/MarchantSideNav";
import "./MarchantLayout.scss"

function MarchantLayout({ children }) {
  return (
    <div>
      <MarchantHeader />
      <div className="marchant_content">
        <MarchantSideNav />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default MarchantLayout
