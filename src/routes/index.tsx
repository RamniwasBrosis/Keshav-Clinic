import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUp,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  HeartPulse,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroImage from "../assets/clinic-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Physiotherapy Clinic in Jaipur | Dr. Keshav" },
      { name: "description", content: "Advanced physiotherapy for neck pain, sciatica and lower back pain in Mahesh Nagar, Jaipur. Book Dr. Keshav Chaudhary's clinic." },
      { property: "og:title", content: "Dr. Keshav Chaudhary Physiotherapy Clinic" },
      { property: "og:description", content: "Advanced, well-explained physiotherapy in Mahesh Nagar, Jaipur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClinicPage,
});

const phone = "919413308082";
const displayPhone = "+91 94133 08082";
const address = "117A, Bhagwati Nagar 1st Road, Saini Colony I, Kartarpur, Mahesh Nagar, Jaipur, Rajasthan 302006";
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

const painItems = [
  { key: "Neck", tag: "Patient-Verified", title: "Neck & Cervical Pain", recovery: "Some patients recover fully within 2 weeks", conditions: ["Cervical stiffness", "Chronic neck pain", "Tension-related pain"], treats: ["Advanced manual therapy", "Guided exercise therapy", "Clear explanation of the cause"] },
  { key: "Sciatica", tag: "Patient-Verified", title: "Sciatica", recovery: "Advanced treatment methods used", conditions: ["Sciatic nerve pain", "Radiating leg pain", "Lower back and leg discomfort"], treats: ["Root-cause assessment", "Advanced treatment techniques", "Structured relief plan"] },
  { key: "Back", tag: "Patient-Verified", title: "Lower Back Pain", recovery: "Patients report relief after months of unresolved pain elsewhere", conditions: ["Long-standing lower back pain", "Postural back pain", "Pain not resolved by other doctors"], treats: ["Detailed assessment", "Structured session plan", "Self-management guidance"] },
  { key: "Joint", tag: "Common Concern", title: "Joint & Muscle Pain", recovery: "Varies by condition", conditions: ["Joint stiffness", "Muscular pain", "General aches"], treats: ["Personalised evaluation", "Targeted exercises", "Home exercise plan"] },
  { key: "Post-Injury", tag: "Common Concern", title: "Post-Injury Recovery", recovery: "Varies by injury", conditions: ["Recovery after injury", "Reduced mobility", "Muscle weakness"], treats: ["Progressive rehab plan", "Guided strengthening", "Home exercise guidance"] },
  { key: "General", tag: "Common Concern", title: "General Physiotherapy Assessment", recovery: "Assessed individually", conditions: ["Unclear source of pain", "General stiffness", "First-time physiotherapy visit"], treats: ["Full-body assessment", "Clear diagnosis and explanation", "Personalised treatment plan"] },
];

const services = [
  ["Neck & Cervical Pain", "Advanced, well-explained treatment for chronic neck pain and cervical stiffness.", ["Personalised assessment", "Advanced manual therapy", "Clear explanation of the cause"]],
  ["Sciatica", "A particular area of focus for the clinic, using advanced treatment methods for lasting relief.", ["Root-cause assessment", "Advanced treatment techniques", "Structured relief plan"]],
  ["Lower Back Pain", "Structured care for long-standing back pain, including cases other doctors haven't been able to resolve.", ["Detailed assessment", "Structured session plan", "Self-management guidance"]],
  ["Joint & Muscle Pain", "Personalised treatment for general joint stiffness and muscular pain.", ["Personalised evaluation", "Targeted exercises", "Home exercise plan"]],
  ["Post-Injury Recovery", "Structured rehab plans to rebuild strength and mobility after an injury.", ["Injury assessment", "Progressive rehab plan", "Home exercise guidance"]],
  ["General Physiotherapy Assessment", "A clear, well-explained assessment before any treatment plan begins.", ["Full-body evaluation", "Clear treatment explanation", "Ongoing progress checks"]],
] as const;

const methods = [
  ["01", "Personalised Assessment", "A close look at your history, pain pattern and goals before anything else."],
  ["02", "Structured Session Plan", "A session plan built around your specific condition and schedule."],
  ["03", "Guided Exercise", "Close, hands-on support through every exercise for long-term relief, not a temporary fix."],
  ["04", "Home Exercise Programs", "A simple, specific routine so progress made in-clinic doesn't reset between visits."],
];

const journey = [
  ["Initial Consultation", "The team listens to your history and what's already been tried before"],
  ["Assessment", "Movement, strength and function are measured — the baseline every future session is compared against"],
  ["Treatment Plan", "A realistic recovery plan, clearly explained, tailored to your condition"],
  ["Hands-On Sessions", "Advanced manual therapy combined with exercise, progressed as your body allows"],
  ["Home Program", "A simple exercise routine to keep progress moving between visits"],
];

const reviews = [
  "A patient calls Dr. Pavan one of the best physiotherapists in Jaipur — highly knowledgeable, humble, and genuinely caring, with a polite and supportive staff.",
  "A patient is impressed by the advanced treatment methods used at the clinic, especially for neck and sciatica pain.",
  "A patient who had sought treatment overseas for three months of lower back pain says it was the expertise and dedication here that finally made the difference, alleviating the pain and offering lasting guidance.",
  "A patient says the team of supportive doctors at Dr. Keshav's clinic provides thorough consultations and effective results.",
  "A patient with neck pain says Keshav Sir recommended a two-week treatment course, after which they were completely cured.",
];

const faqs = [
  ["Do I need an appointment before visiting?", "An appointment is recommended so the team can reserve enough time for your assessment. You can book instantly through WhatsApp or call the clinic."],
  ["How much does a consultation cost?", "Please call or message the clinic for the latest consultation fee, as the treatment needed is assessed individually."],
  ["What are the clinic's hours?", "The clinic is open Monday to Saturday, 8:00 AM–2:00 PM and 4:30 PM–9:30 PM. Sunday has limited hours; please call before visiting."],
  ["Do you treat sciatica and neck pain?", "Yes. Neck, cervical and sciatica pain are particular areas of focus, using advanced methods and a clearly explained treatment plan."],
  ["Do you see patients visiting from outside Jaipur?", "Yes. Patient feedback includes people who travelled specifically for treatment, including a patient visiting after unresolved pain overseas."],
  ["What should I bring to my first visit?", "Bring any relevant scans, reports, prescriptions and a list of treatments you have already tried. Wear comfortable clothing suitable for movement assessment."],
];

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return <MessageCircle className={className} aria-hidden="true" />;
}

function ClinicPage() {
  const [activePain, setActivePain] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", phone: "", concern: "Neck / Cervical Pain", note: "" });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = painItems[activePain];

  useEffect(() => {
    if (bookingOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [bookingOpen]);

  const openBooking = (concern?: string) => {
    if (concern) setForm((current) => ({ ...current, concern }));
    setBookingOpen(true);
  };

  const submitWhatsApp = (event: React.FormEvent) => {
    event.preventDefault();
    const message = `Hello Dr. Keshav Chaudhary Physiotherapy Clinic,\n\nI'd like to book an appointment.\nName: ${form.name}\nWhatsApp Number: ${form.phone}\nConcern: ${form.concern}${form.note ? `\nNote: ${form.note}` : ""}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  if (!selected) return null;

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-header-border bg-header/90 text-primary-foreground backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Clinic home">
            <span className="grid size-10 place-items-center rounded-full border border-gold/60 text-gold"><HeartPulse className="size-5" /></span>
            <span className="leading-tight"><strong className="block font-display text-lg font-medium">Dr. Keshav Chaudhary</strong><span className="text-xs text-primary-foreground/70">Physiotherapy Clinic</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="Main navigation">
            <a href="#pain-guide">Pain Guide</a><a href="#services">Services</a><a href="#approach">Approach</a><a href="#reviews">Reviews</a><a href="#visit">Visit</a>
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <a href={`tel:+${phone}`} className="icon-button" aria-label={`Call ${displayPhone}`}><Phone className="size-4" /></a>
            <button className="button-gold" onClick={() => openBooking()}><CalendarDays className="size-4" /> Book Appointment</button>
          </div>
          <button className="icon-button lg:!hidden" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="grid gap-1 border-t border-header-border bg-header px-5 py-4 lg:hidden" aria-label="Mobile navigation">{[["Pain Guide", "pain-guide"], ["Services", "services"], ["Approach", "approach"], ["Reviews", "reviews"], ["Visit", "visit"]].map(([label,id]) => <a key={id} href={`#${id}`} className="py-3" onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>

      <section id="top" className="relative flex min-h-[92svh] items-end overflow-hidden pt-20">
        <img src={heroImage} alt="Refined physiotherapy treatment room" width={1600} height={1000} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-12 pt-24 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:pb-16">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary/35 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary-foreground backdrop-blur"><MapPin className="size-3.5 text-gold" /> Mahesh Nagar · Jaipur</div>
            <h1 className="max-w-3xl font-display text-5xl font-medium leading-[1.04] text-primary-foreground sm:text-6xl lg:text-7xl">Physiotherapy that patients travel for</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-primary-foreground/80 sm:text-lg">Dr. Keshav Chaudhary's clinic in Mahesh Nagar is known for advanced, well-explained treatment for neck pain, sciatica and lower back pain — trusted by patients from Jaipur and beyond, including one who flew in from overseas after months of unresolved pain.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="button-gold" onClick={() => openBooking()}><CalendarDays className="size-4" /> Book Appointment</button>
              <a className="button-glass" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer"><WhatsAppIcon className="size-4" /> Message on WhatsApp</a>
              <a className="button-link-light" href={`tel:+${phone}`}><Phone className="size-4" /> Call Now ({displayPhone})</a>
            </div>
          </div>
          <div className="self-end rounded-lg border border-primary-foreground/20 bg-primary/30 p-5 text-primary-foreground backdrop-blur-xl lg:justify-self-end">
            <div className="flex items-center gap-2 text-gold"><Star className="size-5 fill-current" /><strong className="text-lg">4.9★ Google Rating</strong></div>
            <p className="mt-1 text-sm text-primary-foreground/75">102 Patient Reviews</p>
            <div className="my-4 h-px bg-primary-foreground/15" />
            <div className="flex gap-3"><Clock3 className="mt-0.5 size-5 text-gold" /><div><strong className="block text-sm">Open 6 days/week</strong><p className="mt-1 text-xs leading-5 text-primary-foreground/70">Mon–Sat 8:00 AM–2:00 PM<br />& 4:30 PM–9:30 PM<br />Sunday limited hours</p></div></div>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/15 lg:col-span-2 lg:grid-cols-4">
            {[[4.9, "★", "Google Rating", 1], [102, "+", "Verified Reviews", 0], [6, " Days", "Open Weekly", 0], [100, "%", "Personalised Care", 0]].map(([value,suffix,label,decimals]) => <div key={String(label)} className="bg-primary/55 px-5 py-5 backdrop-blur-md"><div className="font-display text-3xl text-gold"><CountUp value={Number(value)} suffix={String(suffix)} decimals={Number(decimals)} /></div><div className="mt-1 text-xs uppercase tracking-widest text-primary-foreground/65">{label}</div></div>)}
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-secondary py-4 text-sm font-medium text-primary">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-5 gap-y-2 px-5 text-center"><span>4.9★ Google · 102 Reviews</span><i>◆</i><span>Advanced, Well-Explained Treatment</span><i>◆</i><span>Neck, Sciatica & Back Pain Focus</span><i>◆</i><span>Mahesh Nagar, Jaipur</span></div>
      </div>

      <section id="pain-guide" className="section-shell">
        <SectionIntro eyebrow="Interactive pain guide" title="Tap where it hurts, get your next step" text="A quick pointer to what we treat and how — jump straight to WhatsApp with your concern already filled in." />
        <div className="mt-10 grid overflow-hidden rounded-lg border border-border bg-card shadow-elegant lg:grid-cols-[.38fr_.62fr]">
          <div className="border-b border-border bg-muted p-3 lg:border-b-0 lg:border-r">
            <div role="tablist" aria-label="Pain areas" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {painItems.map((item, index) => <button key={item.key} role="tab" aria-selected={activePain === index} aria-controls="pain-panel" className={`pain-tab ${activePain === index ? "pain-tab-active" : ""}`} onClick={() => setActivePain(index)}><span className="grid size-8 place-items-center rounded-full border border-current/20 text-xs">{String(index + 1).padStart(2,"0")}</span>{item.key}</button>)}
            </div>
          </div>
          <div id="pain-panel" role="tabpanel" className="p-6 sm:p-9" key={selected.key}>
            <div className="flex flex-wrap items-start justify-between gap-4"><div><span className="tag">{selected.tag}</span><h3 className="mt-4 font-display text-4xl text-primary">{selected.title}</h3></div><span className="rounded-md bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground">{selected.recovery}</span></div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <ListBlock title="Conditions" items={selected.conditions} />
              <ListBlock title="How we treat it" items={selected.treats} />
            </div>
            <button className="button-primary mt-8" onClick={() => openBooking(selected.title)}><WhatsAppIcon className="size-4" /> Ask about {selected.key.toLowerCase()} pain</button>
          </div>
        </div>
      </section>

      <section id="approach" className="bg-primary text-primary-foreground">
        <div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow text-gold">Our approach</p><h2 className="section-title text-primary-foreground">Care that's explained, not just delivered</h2></div>
          <div><p className="text-lg leading-8 text-primary-foreground/78">Based in Mahesh Nagar, the clinic is led by Dr. Keshav Chaudhary alongside a supportive team of physiotherapists. Patients consistently mention how clearly the treatment and its reasoning are explained — and how it holds up even after pain that other doctors, in India and abroad, couldn't resolve.</p>
            <div className="mt-8 grid gap-4">{["A 4.9★ rating from 102 patients, including some who travelled specifically for treatment", "Advanced treatment methods, particularly for neck and sciatica pain", "Open 6 days a week, with morning and evening slots"].map((text) => <div key={text} className="flex gap-3 border-t border-primary-foreground/15 pt-4"><Check className="mt-0.5 size-5 shrink-0 text-gold" /><span>{text}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section id="services" className="section-shell">
        <SectionIntro eyebrow="Specialist care" title="Physiotherapy built around the person" text="Focused care for persistent pain, restricted movement and stronger recovery." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{services.map(([title,description,items], index) => <article className="service-card" key={title}><div className="flex items-center justify-between"><span className="font-display text-xl text-gold">0{index+1}</span><HeartPulse className="size-5 text-primary/45" /></div><h3 className="mt-7 font-display text-2xl text-primary">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{description}</p><ListBlock items={[...items]} compact /></article>)}</div>
      </section>

      <section className="bg-secondary">
        <div className="section-shell"><SectionIntro eyebrow="Our methods" title="Methodical care, from first assessment to lasting progress" />
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{methods.map(([number,title,text]) => <article key={number} className="bg-background p-6"><span className="font-display text-4xl text-gold">{number}</span><h3 className="mt-8 font-display text-xl text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="section-shell">
        <SectionIntro eyebrow="How it works" title="A clear path from pain to progress" text="Every stage is measured, explained and adjusted around how your body responds." />
        <ol className="mt-12 grid gap-7 lg:grid-cols-5">{journey.map(([title,text],index) => <li key={title} className="relative border-t border-border pt-6"><span className="absolute -top-4 left-0 grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{index+1}</span><h3 className="font-display text-xl text-primary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></li>)}</ol>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="section-shell"><SectionIntro eyebrow="Meet the team" title="Knowledgeable care, delivered with humility" dark />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <article className="team-card"><div className="monogram">KC</div><div><p className="text-xs uppercase tracking-widest text-gold">Lead Physiotherapist</p><h3 className="mt-2 font-display text-3xl">Dr. Keshav Chaudhary</h3><p className="mt-4 leading-7 text-primary-foreground/72">Patients describe treatment here as clearly explained and genuinely effective — including one who travelled from overseas after months of unresolved lower back pain.</p></div></article>
            <article className="team-card"><div className="monogram">DP</div><div><p className="text-xs uppercase tracking-widest text-gold">Physiotherapist</p><h3 className="mt-2 font-display text-3xl">Dr. Pavan</h3><p className="mt-4 leading-7 text-primary-foreground/72">Described by patients as highly knowledgeable and humble, known for patiently explaining treatment and for encouraging physiotherapy students who visit the clinic.</p></div></article>
          </div>
        </div>
      </section>

      <section id="reviews" className="section-shell">
        <SectionIntro eyebrow="Verified Google reviews" title="What patients remember" text="4.9★ Google Rating · 102 Patient Reviews" />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{reviews.map((review,index) => <figure className={`review-card ${index === 2 ? "lg:col-span-1 lg:row-span-2" : ""}`} key={review}><Quote className="size-8 text-gold/60" /><div className="mt-5 flex gap-1 text-gold" aria-label="5 out of 5 stars">{Array.from({length:5}).map((_,i)=><Star key={i} className="size-4 fill-current" />)}</div><blockquote className="mt-5 font-display text-xl leading-8 text-primary">“{review}”</blockquote><figcaption className="mt-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Verified Google patient story</figcaption></figure>)}</div>
      </section>

      <section className="bg-secondary">
        <div className="section-shell grid gap-12 lg:grid-cols-[.4fr_.6fr]"><div><p className="eyebrow">Questions, answered</p><h2 className="section-title">Before your first visit</h2><p className="mt-5 text-muted-foreground">For anything else, call {displayPhone} or message the clinic.</p></div>
          <div className="divide-y divide-border border-y border-border">{faqs.map(([question,answer],index) => <div key={question}><button className="flex w-full items-center justify-between gap-4 py-5 text-left font-semibold text-primary" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}>{question}<ChevronDown className={`size-5 shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <p className="animate-reveal pb-6 pr-10 text-sm leading-7 text-muted-foreground">{answer}</p>}</div>)}</div>
        </div>
      </section>

      <section id="visit" className="section-shell">
        <SectionIntro eyebrow="Location & visit" title="Find us in Mahesh Nagar, Jaipur" />
        <div className="mt-10 grid overflow-hidden rounded-lg border border-border shadow-elegant lg:grid-cols-[1.15fr_.85fr]">
          <iframe title="Dr. Keshav Chaudhary Physiotherapy Clinic location" src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} className="h-96 w-full border-0 lg:h-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="bg-primary p-7 text-primary-foreground sm:p-10"><MapPin className="size-7 text-gold" /><h3 className="mt-5 font-display text-3xl">Dr. Keshav Chaudhary Physiotherapy Clinic</h3><p className="mt-4 leading-7 text-primary-foreground/72">{address}</p><a href={directionsUrl} target="_blank" rel="noreferrer" className="button-gold mt-6">Get Directions <ExternalLink className="size-4" /></a>
            <div className="my-8 h-px bg-primary-foreground/15" /><div className="flex items-start gap-3"><Clock3 className="mt-1 size-5 text-gold" /><div><strong>Monday–Saturday</strong><p className="mt-2 text-sm leading-6 text-primary-foreground/72">Morning: 8:00 AM–2:00 PM<br />Evening: 4:30 PM–9:30 PM</p><p className="mt-3 text-sm text-gold">Sunday: Limited hours</p></div></div>
          </div>
        </div>
      </section>

      <section className="bg-gold text-gold-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center lg:px-8"><div><p className="text-sm font-semibold uppercase tracking-widest">Ready when you are</p><h2 className="mt-2 font-display text-3xl">Start with a conversation about your pain.</h2></div><button className="button-primary" onClick={() => openBooking()}><CalendarDays className="size-4" /> Book Appointment</button></div></section>
      <footer className="bg-header pb-24 pt-10 text-primary-foreground sm:pb-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 sm:flex-row lg:px-8"><div><strong className="font-display text-xl">Dr. Keshav Chaudhary Physiotherapy Clinic</strong><p className="mt-2 text-sm text-primary-foreground/60">Mahesh Nagar · Jaipur</p></div><div className="text-sm text-primary-foreground/70"><a href={`tel:+${phone}`}>{displayPhone}</a><p className="mt-2">Open 6 days/week</p></div></div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-primary-foreground/15 px-5 pt-6 text-center text-xs text-primary-foreground/60 lg:px-8">© {new Date().getFullYear()} Dr. Keshav Chaudhary Physiotherapy Clinic. All rights reserved. · <a href="https://www.brosistech.com/" target="_blank" rel="noreferrer" className="underline-offset-2 hover:underline">Developed and Designed by Brosis Technologies</a></div>
      </footer>

      <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 rounded-lg border border-border bg-background/95 p-2 shadow-elegant backdrop-blur sm:hidden"><a href={`tel:+${phone}`} className="button-outline"><Phone className="size-4" /> Call</a><a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer" className="button-primary"><WhatsAppIcon className="size-4" /> WhatsApp</a></div>
      <a href="#top" className="fixed bottom-24 right-4 z-20 grid size-11 place-items-center rounded-full border border-border bg-background text-primary shadow-elegant sm:bottom-5" aria-label="Back to top"><ArrowUp className="size-4" /></a>

      <dialog ref={dialogRef} onClose={() => setBookingOpen(false)} onClick={(e) => { if (e.target === dialogRef.current) setBookingOpen(false); }} className="booking-dialog">
        <form onSubmit={submitWhatsApp} className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Book a consultation</p><h2 className="mt-2 font-display text-3xl text-primary">Tell us what's bothering you</h2></div><button type="button" className="dialog-close" onClick={() => setBookingOpen(false)} aria-label="Close booking form"><X className="size-5" /></button></div>
          <div className="mt-7 grid gap-5"><label className="field-label">Full Name<input required value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="field" placeholder="Your name" /></label><label className="field-label">WhatsApp Phone Number<input required type="tel" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="field" placeholder="Your phone number" /></label><label className="field-label">What's bothering you?<select value={form.concern} onChange={(e)=>setForm({...form,concern:e.target.value})} className="field"><option>Neck / Cervical Pain</option><option>Sciatica</option><option>Lower Back Pain</option><option>Joint / Muscle Pain</option><option>Post-Injury Recovery</option><option>General Wellness Consultation</option></select></label><label className="field-label">Optional Note<textarea value={form.note} onChange={(e)=>setForm({...form,note:e.target.value})} className="field min-h-24 resize-y" placeholder="Anything else?" /></label></div>
          <button type="submit" className="button-primary mt-6 w-full"><WhatsAppIcon className="size-4" /> Continue on WhatsApp</button><p className="mt-3 text-center text-xs text-muted-foreground">This opens a pre-filled message to {displayPhone}.</p>
        </form>
      </dialog>
    </main>
  );
}

function SectionIntro({ eyebrow, title, text, dark = false }: { eyebrow: string; title: string; text?: string; dark?: boolean }) {
  return <div className="max-w-3xl"><p className={`eyebrow ${dark ? "text-gold" : ""}`}>{eyebrow}</p><h2 className={`section-title ${dark ? "text-primary-foreground" : ""}`}>{title}</h2>{text && <p className={`mt-5 max-w-2xl leading-7 ${dark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{text}</p>}</div>;
}

function ListBlock({ title, items, compact = false }: { title?: string; items: string[]; compact?: boolean }) {
  return <div>{title && <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h4>}<ul className={`${title ? "mt-4" : compact ? "mt-5 border-t border-border pt-5" : "mt-3"} grid gap-3`}>{items.map((item) => <li key={item} className="flex gap-2.5 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-gold" /><span>{item}</span></li>)}</ul></div>;
}

function CountUp({ value, suffix, decimals }: { value: number; suffix: string; decimals: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      const started = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - started) / 1100, 1);
        setCount(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: .5 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}