import React from "react";
import {
  FaQuoteLeft,
  FaUserAlt,
  FaUserTie,
  FaUserGraduate,
} from "react-icons/fa";
import FeedbackSlider from "./FeedbackSlider";
import customer from "../../../assets/customer-top.png";

const FeedbackData = () => {
  const feedbackData = [
    {
      id: 1,
      icon: <FaQuoteLeft />,
      feedback:
        "Posture Pro helped me get rid of my back pain in just two weeks. Amazing!",
      avatar: "https://img.icons8.com/?size=48&id=KICzEAXp0VMR&format=png",
      name: "Alice Rahman",
      role: "Fitness Enthusiast",
    },
    {
      id: 2,
      icon: <FaQuoteLeft />,
      feedback:
        "Our entire office uses it during breaks. Productivity (and posture) up!",
      avatar: "https://img.icons8.com/?size=48&id=KICzEAXp0VMR&format=png",
      name: "Bob Karim",
      role: "Operations Manager",
    },
    {
      id: 3,
      icon: <FaQuoteLeft />,
      feedback:
        "As a student I sit long hours. Posture Pro keeps me aligned and focused.",
      avatar: "https://img.icons8.com/?size=48&id=KICzEAXp0VMR&format=png",
      name: "Chitra Islam",
      role: "Computer-Science Student",
    },
    {
      id: 4,
      icon: <FaQuoteLeft />,
      feedback:
        "Thanks to Posture Pro, I can sit and work for hours without discomfort. It's a game-changer!",
      avatar: "https://img.icons8.com/?size=48&id=KICzEAXp0VMR&format=png",
      name: "David Hossain",
      role: "Freelance Developer",
    },
    {
      id: 5,
      icon: <FaQuoteLeft />,
      feedback:
        "I recommend Posture Pro to my clients every day. It’s simple, powerful, and effective.",
      avatar: "https://img.icons8.com/?size=48&id=KICzEAXp0VMR&format=png",
      name: "Sadia Akter",
      role: "Physical Therapist",
    },
    {
      id: 6,
      icon: <FaQuoteLeft />,
      feedback:
        "As a teacher, I stand and sit a lot — this tool has improved my posture noticeably.",
      avatar: "https://img.icons8.com/?size=48&id=KICzEAXp0VMR&format=png",
      name: "Rakib Khan",
      role: "School Teacher",
    },
  ];

  return (
    <section className="py-14 px-4 md:px-8 bg-base-100">
      {/* Section heading */}
      <div className="max-w-3xl mx-auto text-center mb-10 flex flex-col gap-8 items-center">
        <img className="w-64" src={customer} alt="customer.png" />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            What our customers are sayings
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, and strengthen your body
            with ease!
          </p>
        </div>
      </div>
      {/* Feedback slider */}
      <FeedbackSlider feedbackData={feedbackData}></FeedbackSlider>
    </section>
  );
};

export default FeedbackData;
