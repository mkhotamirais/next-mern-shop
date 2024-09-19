import SignInForm from "./sing-in-form";

export default function SignInPage() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-md mx-auto border rounded-lg p-6">
          <h1 className="text-3xl font-medium mb-4">Login</h1>
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
