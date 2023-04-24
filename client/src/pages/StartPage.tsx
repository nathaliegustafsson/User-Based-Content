import ExplorePostsGrid from "../components/ExplorePostsGrid";
import Footer from "../components/Footer";
import Header from "../components/Header";

function StartPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <ExplorePostsGrid />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default StartPage;
