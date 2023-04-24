import Footer from "../components/Footer";
import Header from "../components/Header";
import ProfilePageGrid from "../components/ProfilePageGrid";
import UserInfo from "../components/UserInfo";

function ProfilePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <UserInfo />
        <ProfilePageGrid />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProfilePage;
