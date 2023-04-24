import Footer from "../components/Footer";
import Header from "../components/Header";
import SignInForm from "../components/SignInForm";

function SignInPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <SignInForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default SignInPage;
