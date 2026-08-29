"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw65sw_1vb-42_OhiXKMKw9kd_zo3R5tXpIFHrSgm1-hsCW012vWPrpP6HDKJ891IQizQ/exec";

function GrowthTransition() {
  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden md:h-52">
      <motion.div
        className="relative flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
      >
        <svg
          viewBox="0 0 240 150"
          className="h-28 w-52 md:h-36 md:w-60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Growth"
        >
          <motion.path
            d="M30 125 C55 115 60 90 82 82 C105 74 105 55 130 52 C155 49 162 30 190 28"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            variants={{
              hidden: {
                pathLength: 0,
                opacity: 0,
              },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: {
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: {
                    duration: 0.25,
                  },
                },
              },
            }}
          />

          <motion.path
            d="M168 28 H190 V50"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: {
                pathLength: 0,
                opacity: 0,
              },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: {
                  pathLength: {
                    delay: 1.15,
                    duration: 0.4,
                    ease: "easeOut",
                  },
                  opacity: {
                    delay: 1.15,
                    duration: 0.2,
                  },
                },
              },
            }}
          />
        </svg>

        <motion.div
          className="mt-[-8px] text-[10px] uppercase tracking-[0.28em]"
          variants={{
            hidden: {
              opacity: 0,
              y: 8,
            },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 1.45,
                duration: 0.5,
                ease: "easeOut",
              },
            },
          }}
        >
          Growth
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const closeMenu = () => setMenuOpen(false);

  const chooseService = (service: string) => {
    setForm((current) => ({
      ...current,
      service,
    }));

    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setFormStatus("idle");

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });

      setFormStatus("success");
    } catch (error) {
      console.error("Enquiry submission error:", error);
      setFormStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#AFDDE5] text-black">

      {/* Navigation */}

      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-14">

          <a
            href="#top"
            onClick={closeMenu}
            className="display-font text-[25px] tracking-[-0.04em]"
          >
            SCALORANT
          </a>

          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#work"
              className="nav-link text-[12px] uppercase tracking-[0.08em]"
            >
              Work
            </a>

            <a
              href="#services"
              className="nav-link text-[12px] uppercase tracking-[0.08em]"
            >
              Services
            </a>

            <a
              href="#about"
              className="nav-link text-[12px] uppercase tracking-[0.08em]"
            >
              About
            </a>

            <a
              href="#contact"
              className="nav-link text-[12px] uppercase tracking-[0.08em]"
            >
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-black px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.06em] transition hover:bg-black hover:text-[#AFDDE5] md:block"
          >
            Start a Project
          </a>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative z-[60] flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-5 w-6">
              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-black transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />

              <span
                className={`absolute left-0 top-1/2 h-px w-full bg-black transition-transform duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}

        <div
          className={`fixed inset-0 z-50 flex flex-col justify-center bg-[#AFDDE5] px-8 transition-opacity duration-500 md:hidden ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-6">

            <a
              href="#work"
              onClick={closeMenu}
              className="display-font text-5xl tracking-[-0.04em]"
            >
              Work
            </a>

            <a
              href="#services"
              onClick={closeMenu}
              className="display-font text-5xl tracking-[-0.04em]"
            >
              Services
            </a>

            <a
              href="#about"
              onClick={closeMenu}
              className="display-font text-5xl tracking-[-0.04em]"
            >
              About
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="display-font text-5xl tracking-[-0.04em]"
            >
              Contact
            </a>

          </nav>
        </div>
      </header>

      {/* Hero */}

      <section
        id="top"
        className="relative flex min-h-[100svh] items-end px-6 pb-20 pt-36 md:px-10 md:pb-24 lg:px-14"
      >
        <div className="mx-auto w-full max-w-[1400px]">

          <div className="reveal mb-8 flex items-center gap-4">
            <span className="h-px w-14 bg-black" />

            <span className="text-[11px] uppercase tracking-[0.18em]">
              Digital studio
            </span>
          </div>

          <h1 className="display-font reveal reveal-delay-1 max-w-[1150px] text-[clamp(58px,9.5vw,140px)] leading-[0.82] tracking-[-0.065em]">
            We build digital
            <br />
            experiences that
            <br />
            move businesses
            <br />
            forward.
          </h1>

          <div className="reveal reveal-delay-2 mt-16 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">

            <p className="max-w-[430px] text-[16px] leading-7 text-black/65 md:text-[17px]">
  Scalorant is a digital marketing and web development studio
  helping businesses build stronger brands, reach the right
  audiences and grow online.
</p>

            <a
              href="#contact"
              className="editorial-link w-fit"
            >
              Start a project
              <span className="text-xl leading-none">
                →
              </span>
            </a>

          </div>

          <div className="mt-20 flex items-center justify-between border-t border-black/20 pt-5 text-[10px] uppercase tracking-[0.16em] text-black/50">
            <span>
              Scroll to explore
            </span>

            <span>
              ↓
            </span>
          </div>

        </div>
      </section>

      {/* Growth Transition */}

      <GrowthTransition />

      {/* Selected Work */}

      <section
        id="work"
        className="border-t border-black/20 px-6 py-28 md:px-10 lg:px-14 lg:py-36"
      >
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-16 grid gap-8 md:grid-cols-[220px_1fr]">

            <div className="flex items-start gap-4 text-[11px] uppercase tracking-[0.15em]">
              <span>
                01
              </span>

              <span className="mt-1 h-px w-20 bg-black/40" />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-black/50">
                Selected work
              </p>

              <h2 className="display-font mt-5 max-w-[700px] text-5xl leading-[0.95] tracking-[-0.05em] md:text-7xl">
                Work that moves
                <br />
                ideas forward.
              </h2>
            </div>

          </div>

          <div className="border-t border-black/20">

            <div className="project-row border-b border-black/20 py-9">

  <div>
    <h3 className="display-font text-4xl tracking-[-0.04em] md:text-5xl">
      Thershub
    </h3>

    <p className="mt-2 text-sm text-black/55">
      Digital experience
    </p>
  </div>

</div>

            <div className="project-row border-b border-black/20 py-9">

  <div>
    <h3 className="display-font max-w-[500px] text-4xl leading-[0.95] tracking-[-0.04em] md:text-5xl">
      Rudra Babu Pulao House
    </h3>

    <p className="mt-2 text-sm text-black/55">
      Digital experience
    </p>
  </div>

</div>

          </div>

          <p className="mt-8 max-w-[520px] text-sm leading-6 text-black/50">
            More work will be added as we continue building with ambitious
            businesses.
          </p>

        </div>
      </section>

      {/* Services */}

      <section
        id="services"
        className="border-t border-black/20 px-6 py-28 md:px-10 lg:px-14 lg:py-36"
      >
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-16 grid gap-8 md:grid-cols-[220px_1fr]">

            <div className="flex items-start gap-4 text-[11px] uppercase tracking-[0.15em]">
              <span>
                02
              </span>

              <span className="mt-1 h-px w-20 bg-black/40" />
            </div>

            <div>

              <p className="text-[11px] uppercase tracking-[0.18em] text-black/50">
                What we do
              </p>

              <h2 className="display-font mt-5 max-w-[760px] text-5xl leading-[0.95] tracking-[-0.05em] md:text-7xl">
                Digital work for
                <br />
                growing businesses.
              </h2>

            </div>

          </div>

          <div className="grid border-t border-black/20 md:grid-cols-2">

            {/* Digital Marketing */}

            <button
              type="button"
              onClick={() => chooseService("Digital Marketing")}
              className="service-item group w-full border-b border-black/20 px-0 py-9 text-left md:px-7 md:py-12"
            >

              <div className="grid grid-cols-[50px_1fr] gap-5">

                <span className="text-[11px] text-black/45">
                  01
                </span>

                <div>

                  <h3 className="display-font text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                    Digital Marketing
                  </h3>

                  <p className="mt-5 max-w-[420px] text-[15px] leading-6 text-black/60">
                    Google Ads, Meta Ads, LinkedIn Ads and other platforms
                    to reach the right audience.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                    Explore service
                    <span className="text-base">
                      ↗
                    </span>
                  </div>

                </div>

              </div>

            </button>

            {/* Catalogue Management */}

            <button
              type="button"
              onClick={() => chooseService("Catalogue Management")}
              className="service-item group w-full border-b border-black/20 px-0 py-9 text-left md:border-l md:px-7 md:py-12"
            >

              <div className="grid grid-cols-[50px_1fr] gap-5">

                <span className="text-[11px] text-black/45">
                  02
                </span>

                <div>

                  <h3 className="display-font text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                    Catalogue Management
                  </h3>

                  <p className="mt-5 max-w-[420px] text-[15px] leading-6 text-black/60">
                    We manage and optimize your product catalogue across
                    marketplaces and digital channels.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                    Explore service
                    <span className="text-base">
                      ↗
                    </span>
                  </div>

                </div>

              </div>

            </button>

            {/* Web Development */}

            <button
              type="button"
              onClick={() => chooseService("Web Development")}
              className="service-item group w-full border-b border-black/20 px-0 py-9 text-left md:px-7 md:py-12"
            >

              <div className="grid grid-cols-[50px_1fr] gap-5">

                <span className="text-[11px] text-black/45">
                  03
                </span>

                <div>

                  <h3 className="display-font text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                    Web Development
                  </h3>

                  <p className="mt-5 max-w-[420px] text-[15px] leading-6 text-black/60">
                    Fast, modern and purposeful websites that represent
                    your brand and convert.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                    Explore service
                    <span className="text-base">
                      ↗
                    </span>
                  </div>

                </div>

              </div>

            </button>

            {/* Brand Growth Advisory */}

            <button
              type="button"
              onClick={() => chooseService("Brand Growth Advisory")}
              className="service-item group w-full border-b border-black/20 px-0 py-9 text-left md:border-l md:px-7 md:py-12"
            >

              <div className="grid grid-cols-[50px_1fr] gap-5">

                <span className="text-[11px] text-black/45">
                  04
                </span>

                <div>

                  <h3 className="display-font text-4xl leading-none tracking-[-0.04em] md:text-5xl">
                    Brand Growth Advisory
                  </h3>

                  <p className="mt-5 max-w-[420px] text-[15px] leading-6 text-black/60">
                    Strategic guidance to help your business grow with
                    clarity and better digital decisions.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] opacity-0 transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-100">
                    Explore service
                    <span className="text-base">
                      ↗
                    </span>
                  </div>

                </div>

              </div>

            </button>

          </div>
        </div>
      </section>

      {/* About */}

      <section
        id="about"
        className="border-t border-black/20 px-6 py-28 md:px-10 lg:px-14 lg:py-36"
      >
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-16 grid gap-8 md:grid-cols-[220px_1fr]">

            <div className="flex items-start gap-4 text-[11px] uppercase tracking-[0.15em]">
              <span>
                03
              </span>

              <span className="mt-1 h-px w-20 bg-black/40" />
            </div>

            <p className="text-[11px] uppercase tracking-[0.18em] text-black/50">
              About Scalorant
            </p>

          </div>

          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">

            <h2 className="display-font max-w-[850px] text-5xl leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-[88px]">
              A small studio with a big focus on making businesses better at
              digital.
            </h2>

            <div className="max-w-[420px] text-[15px] leading-7 text-black/60">

              <p>
                Scalorant is a new startup founded by Prakash Burra and W
                Pratyush.
              </p>

              <p className="mt-6">
                We work with businesses to build stronger digital experiences,
                reach the right audiences and create systems that support
                growth.
              </p>

              <p className="mt-6">
                Our work has already begun with clients including Thershub and
                Rudra Babu Pulao House.
              </p>

            </div>

          </div>

          <div className="mt-24 grid grid-cols-2 border-t border-black/20">

          <div className="border-b border-black/20 py-6 pr-4 md:py-8 md:border-r md:pr-10">

             <div className="mb-6 overflow-hidden border border-black/20">
  <img
    src="/images/prakash.jpg"
    alt="Prakash Burra"
    className="block h-auto w-full"
  />
</div>

              <h3 className="display-font text-3xl tracking-[-0.03em]">
                Prakash Burra
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-black/50">
                Co-Founder
              </p>

            </div>

           <div className="border-b border-black/20 py-6 pl-4 md:py-8 md:pl-10">

              <div className="mb-6 overflow-hidden border border-black/20">
  <img
    src="/images/pratyush.png"
    alt="W Pratyush"
    className="block h-auto w-full"
  />
</div>

              <h3 className="display-font text-3xl tracking-[-0.03em]">
                W Pratyush
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.12em] text-black/50">
                Co-Founder
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* Contact / Enquiry */}

      <section
        id="contact"
        className="border-t border-black/20 px-6 py-28 md:px-10 lg:px-14 lg:py-40"
      >
        <div className="mx-auto max-w-[1400px]">

          <div className="mb-14 grid gap-8 md:grid-cols-[220px_1fr]">

            <div className="flex items-start gap-4 text-[11px] uppercase tracking-[0.15em]">
              <span>
                04
              </span>

              <span className="mt-1 h-px w-20 bg-black/40" />
            </div>

            <p className="text-[11px] uppercase tracking-[0.18em] text-black/50">
              Let&apos;s work together
            </p>

          </div>

          <div className="grid gap-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

            <div>

              <h2 className="display-font max-w-[700px] text-6xl leading-[0.88] tracking-[-0.065em] md:text-8xl lg:text-[92px]">
                Have a project
                <br />
                in mind?
              </h2>

              <div className="mt-12 text-sm leading-7 text-black/60">

                <a
                  href="mailto:scalorant@gmail.com"
                  className="block transition hover:text-black"
                >
                  scalorant@gmail.com
                </a>

                <a
                  href="tel:+919059170809"
                  className="block transition hover:text-black"
                >
                  +91 9059170809
                </a>

                <span>
                  Hyderabad, India
                </span>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="w-full"
            >

              <div className="border-t border-black/25">

                <div className="border-b border-black/25 py-5">

                  <label
                    htmlFor="name"
                    className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-black/50"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Your name"
                    className="w-full bg-transparent text-lg outline-none placeholder:text-black/30 md:text-xl"
                  />

                </div>

                <div className="border-b border-black/25 py-5">

                  <label
                    htmlFor="email"
                    className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-black/50"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-lg outline-none placeholder:text-black/30 md:text-xl"
                  />

                </div>

                <div className="border-b border-black/25 py-5">

                  <label
                    htmlFor="phone"
                    className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-black/50"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        phone: event.target.value,
                      })
                    }
                    placeholder="+91"
                    className="w-full bg-transparent text-lg outline-none placeholder:text-black/30 md:text-xl"
                  />

                </div>

                <div className="border-b border-black/25 py-5">

                  <label
                    htmlFor="service"
                    className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-black/50"
                  >
                    What do you need?
                  </label>

                  <select
                    id="service"
                    name="service"
                    required
                    value={form.service}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        service: event.target.value,
                      })
                    }
                    className="w-full appearance-none bg-transparent text-lg outline-none md:text-xl"
                  >

                    <option value="" disabled>
                      Select a service
                    </option>

                    <option value="Digital Marketing">
                      Digital Marketing
                    </option>

                    <option value="Catalogue Management">
                      Catalogue Management
                    </option>

                    <option value="Web Development">
                      Web Development
                    </option>

                    <option value="Brand Growth Advisory">
                      Brand Growth Advisory
                    </option>

                    <option value="Multiple Services">
                      Multiple Services
                    </option>

                    <option value="Not Sure">
                      Not Sure Yet
                    </option>

                  </select>

                </div>

                <div className="border-b border-black/25 py-5">

                  <label
                    htmlFor="message"
                    className="mb-3 block text-[10px] uppercase tracking-[0.16em] text-black/50"
                  >
                    Tell us about your project
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        message: event.target.value,
                      })
                    }
                    placeholder="Tell us a little about what you're looking to build or grow."
                    className="w-full resize-none bg-transparent text-lg leading-7 outline-none placeholder:text-black/30 md:text-xl"
                  />

                </div>

              </div>

              {formStatus === "success" && (
                <div className="mt-6 border-l border-black pl-4 text-sm">
                  Enquiry received. We&apos;ll get back to you soon.
                </div>
              )}

              {formStatus === "error" && (
                <div className="mt-6 border-l border-red-700 pl-4 text-sm text-red-700">
                  Something went wrong. Please try again or contact us
                  directly.
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-6">

                <p className="max-w-[300px] text-[11px] leading-5 text-black/45">
                  By submitting this form, you&apos;re giving Scalorant the
                  information needed to respond to your enquiry.
                </p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="editorial-link shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting
                    ? "Sending..."
                    : "Send enquiry"}

                  <span className="text-xl leading-none">
                    →
                  </span>
                </button>

              </div>

            </form>

          </div>

        </div>
      </section>

      {/* Footer */}

      <footer className="border-t border-black/20 px-6 py-8 md:px-10 lg:px-14">

        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 text-[11px] uppercase tracking-[0.12em] md:flex-row md:items-center md:justify-between">

          <div>
            <span>
              © 2026 Scalorant
            </span>
          </div>

          <div className="flex flex-wrap gap-6">

  <a
    href="mailto:scalorant@gmail.com"
    className="transition hover:opacity-60"
  >
    Email
  </a>

  <a
    href="tel:+919059170809"
    className="transition hover:opacity-60"
  >
    Call
  </a>

  <a
  href="https://www.instagram.com/scalorant/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Follow Scalorant on Instagram"
  className="group flex items-center gap-3 transition-opacity hover:opacity-60"
>
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    aria-hidden="true"
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
    />
  </svg>

  <span>Follow the build</span>

  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
    ↗
  </span>
</a>

  <a
    href="#top"
    className="transition hover:opacity-60"
  >
    Back to top ↑
  </a>

</div>

        </div>

      </footer>

    </main>
  );
}