import MainFooter from "../components/mainFooter";
import MainHeader from "../components/mainHeader";
import MainPageContent from "../components/mainPageContent";

function MainPage({ mykurlyService }) {
  return (
    <div>
      <MainHeader />
      <MainPageContent mykurlyService={mykurlyService} />
      <MainFooter />
    </div>
  );
}
export default MainPage;
