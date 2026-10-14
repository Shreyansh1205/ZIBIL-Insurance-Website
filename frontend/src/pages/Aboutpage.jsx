import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import heroImg from "../assets/heroImg.png";
import { Counter } from "../components/dynamic-bits";
import { ArrowRight, X } from "lucide-react";
import Footer from '../components/Footer';
import atharImg from '../assets/LeaderImg/Athar.jpg';
import sarojImg from '../assets/LeaderImg/Saroj.jpg'

const leadership = [
  {
    name: "Saroj Kumar Poddar",
    role: "Chairman",
    image: sarojImg,
    bio: [
      "Mr. Saroj Kumar Poddar is the Chairman of the Board of Zuari Industries Limited and the Adventz Group. He holds a gold medal in Commerce from Calcutta University and is a renowned patron of art, culture, and sports. He has served on the Board of Trade, the Court of the Indian Institute of Science, Bangalore, and was the President of FICCI and International Chamber of Commerce in India. He has also been a member of the Board of Governors of the Indian Institute of Technology, Kharagpur, and the Board of the Reserve Bank of India. Mr. Poddar's finance and investment expertise has been recognized by his appointment to the Advisory Board of Messrs N M Rothschild & Sons.",
      "He was awarded the Rashtriya Samman award and appointed Commander in the National Order of Merit by the President of the French Republic in 2011. He is a member of the Indo-French CEO Forum and Chairman of the India-Saudi Arabia Joint Business Council. He received the \"Lifetime Achievement Award 2017\" by Economic Times for his contribution to business growth and exemplary industrial trends.",
    ],
  },
  {
    name: "Athar Shahab",
    role: "Managing Director",
    image: atharImg,
    bio: [
      "Mr. Athar Shahab is the Managing Director of Zuari Industries Limited and has over 33 years of experience in project finance, investments and general management. He has held leadership positions at renowned companies such as L&T, Vedanta, IDFC, AES and ICICI. He serves as a board member of several subsidiaries and joint venture companies of the Group.",
      "Mr. Shahab holds a Bachelor's Degree in Civil Engineering from VSS University of Technology, Burla, and a Post Graduate Diploma in Business Management from XLRI, Jamshedpur. He was awarded the Maxi Gold Medal for excellence in marketing. ",
    ],
  },
];
const Aboutpage = () => {

  const [selectedLeader, setSelectedLeader] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main>
      <Navbar />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="animate-reveal">
            <span className="text-sm font-semibold uppercase tracking-wider text-(--coral)">Our story</span>
            <h1 className="mt-3 font-display text-5xl leading-tight md:text-6xl">
              We started Zuari Insurance Brokers Limited because insurance <span className="italic">should</span> feel like assurance.
            </h1>
            {/* <p className="mt-4 text-lg text-(--muted-foreground)">
              Zuari Insurance Brokers Limited is IRDAI-licensed, independent, and answers only to the companies and people it protects.
            </p> */}
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-grad-warm opacity-25 blur-2xl animate-blob" />
            <img
              src={heroImg}
              alt="Zuari Insurance Brokers Limited team"
              loading="lazy"
              className="h-125 w-full rounded-4xl object-cover shadow-soft" />
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {[
            { n: 2003, l: "Founded" },
            { n: 100, l: "Companies", s: "+" },
            { n: 10000, l: "Customers served", s: "+" },
            // { n: 2000, l: "Clients", s: "+" },
          ].map((s, i) => (
            <div key={s.l} className="rounded-3xl border border-(--border)/60 bg-(--card) p-8 text-center" style={{ animation: `reveal-up 0.6s ${i * 100}ms both` }}>
              <p className="font-display text-4xl font-semibold text-grad"><Counter to={s.n} suffix={s.s ?? ""} /></p>
              <p className="mt-2 text-sm text-(--muted-foreground)">{s.l}</p>
            </div>
          ))}
        </div>

        
        <div className="mt-24">
          <div className="text-center">
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Meet Our Leaders
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {leadership.map((person, index) => (
              <div
                key={person.name}
                onClick={() => setSelectedLeader(person)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setSelectedLeader(person);
                }}
                className="flex items-center gap-6 rounded-4xl border border-(--border)/60 bg-(--card) p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  animation: `reveal-up 0.7s ${index * 150}ms both`,
                }}>
                <img
                  src={person.image}
                  alt={person.name}
                  className="h-52 w-52 rounded-3xl object-cover flex-shrink-0"
                />

                <div>
                  <h3 className="font-display text-3xl">
                    {person.name}
                  </h3>

                  <p className="mt-2 text-xl italic text-(--coral)">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        
      </div>

      {selectedLeader && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-(--foreground)/40 p-4 backdrop-blur-sm animate-reveal"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-(--border)/60 bg-(--card) p-8 shadow-soft"
          >
            <button
              onClick={() => setSelectedLeader(null)}
              className="absolute right-4 top-4 rounded-full bg-(--foreground) p-1.5 text-(--background) transition hover:opacity-80"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <img
                src={selectedLeader.image}
                alt={selectedLeader.name}
                className="h-40 w-40 flex-shrink-0 rounded-2xl object-cover"
              />
              <div>
                <h3 className="font-display text-3xl">{selectedLeader.name}</h3>
                <p className="mt-1 text-lg italic text-(--coral)">{selectedLeader.role}</p>
              </div>
            </div>

            <hr className="mt-6 border-(--border)/60" />

            <div className="mt-6 space-y-4 text-(--muted-foreground)">
              {selectedLeader.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}

        <Footer />

    </main>
  )
}


export default Aboutpage