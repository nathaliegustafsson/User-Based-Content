import Header from "../components/Header";
import SignInForm from "../components/SignInForm";
import Footer from "../components/Footer";

function SignInPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <SignInForm />
        <Footer />
      </main>
    </div>
  );
}

export default SignInPage;
