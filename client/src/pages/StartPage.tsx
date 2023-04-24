import CreatePost from "../components/CreatePost";
import Footer from "../components/Footer";
import Header from "../components/Header";

function StartPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <CreatePost />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default StartPage;
