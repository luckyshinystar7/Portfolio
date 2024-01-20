import ContactInfo from "./ContactInfo";

export default function Contact() {
  return (
    <main className="grid grid-cols-12">
      <div>Contact Me:</div>
      <form>
        <input name="email" />
      </form>
      <div className="col-span-2 col-start-6 flex flex-row justify-around">
        <ContactInfo />
      </div>
    </main>
  );
}
