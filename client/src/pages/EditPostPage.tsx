import EditPost from "../components/EditPost";
import Footer from "../components/Footer";
import Header from "../components/Header";

function EditAndDeletePostPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <EditPost />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default EditAndDeletePostPage;
