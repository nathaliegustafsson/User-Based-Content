import Header from "../components/Header";
import Footer from "../components/Footer";
import ExplorePostsGrid from "../components/ExplorePostsGrid";

function StartPage() {
  return (
    <div>
      <header>
        <Header/>
      <header/>
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
