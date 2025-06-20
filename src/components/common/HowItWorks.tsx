'use client';

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { steps } from "@/constants";
import { FC } from "react";

const HowItWorks: FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="px-6 py-12 max-container text-center">
      <h3 className="font-bold mb-2">How It Works</h3>
      <h2 className="mb-6 text-xl">Find out how to get started</h2>

      <div className="flex-row md:flex justify-center items-center gap-12">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-[#2B2B2B] p-6 rounded-lg text-center mx-auto p-12"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <img src={step.imgURL} alt={step.title} className="mx-auto transition delay-150 duration-300 ease-in-out hover:scale-110 cursor-pointer" />
            <h4 className="text-white font-semibold">{step.title}</h4>
            <p className="text-white">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
