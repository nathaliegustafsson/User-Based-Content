import CreateProfileForm from "../components/CreateProfileForm";
import Footer from "../components/Footer";
import Header from "../components/Header";

function CreateProfilePage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <CreateProfileForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default CreateProfilePage;
