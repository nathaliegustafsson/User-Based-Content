import Footer from "../components/Footer";
import Header from "../components/Header";
import PostCard from "../components/PostCard";

function PostPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <PostCard />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default PostPage;
