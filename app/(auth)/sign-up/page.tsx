import SignUpForm from "./sing-up-form";

export default function SignUpPage() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="max-w-md mx-auto border rounded-lg p-6">
          <h1 className="text-3xl font-medium mb-4">Register</h1>
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
