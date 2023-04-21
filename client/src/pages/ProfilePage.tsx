import Footer from "../components/Footer";
import Header from "../components/Header";
import UserInfo from "../components/UserInfo";

function ProfilePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <UserInfo />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProfilePage;
