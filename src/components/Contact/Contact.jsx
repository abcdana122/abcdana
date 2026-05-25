import { contact } from "../../data/portfolioData";
import "./Contact.css";

export function Contact() {
  return (
    <section id="contact" className="contact snap-section" data-reveal>
      <p>{contact.eyebrow}</p>
      <h2>{contact.title}</h2>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </section>
  );
}
