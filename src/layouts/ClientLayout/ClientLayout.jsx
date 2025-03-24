import ClientHeader from "../../components/ClientHeader/ClientHeader";
import ClientNavBar from "../../components/ClientNavBar/ClientNavBar";

function ClientLayout({ children }) {
  return (
    <div className="client-layout">
      <ClientHeader />
      <main>{children}</main>
      <ClientNavBar />      
    </div>
  )
}

export default ClientLayout
