import EditAndDeletePost from "../components/EditAndDeletePost";
import Footer from "../components/Footer";
import Header from "../components/Header";

function EditAndDeletePostPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <EditAndDeletePost />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default EditAndDeletePostPage;
