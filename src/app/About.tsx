import React from "react";
import Title from "./Title";

const About: React.FC = () => {
  return (
    <>
    <Title title='About Us' />
    <section className="relative bg-gradient-to-br from-[#000818]  to-[#320c35]  text-white py-16 px-8">
      
      <div className="container  p-[0%] mx-auto flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
        
        <div className="flex-shrink-0 mx-auto p-[5%]">
          <div className="w-80 h-80 rounded-lg overflow-hidden shadow-lg  border-indigo-800">
            <img
              src="/about.svg" 
              alt="Our Team"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        
        <div className="lg:max-w-2xl p-[7%] mx-auto  text-center lg:text-left ">
          <h2  className="text-4xl  w-[17rem]  text-skyBlue h-[2rem] font-bold mb-4 mx-auto ">Who are we?</h2>
          <p className=" text-white mt-6  mb-6  text-2xl font-semibold h-[4.5rem">
            At IEEE, we believe in disseminating what  we know and learning what we don't.
          </p>
          <p className=" opacity-80 font-light leading-relaxed mb-6">
            Institute of Electrical and Electronics Engineers (IEEE) is a non-profit
            professional association headquartered in New York City, dedicated to advancing
            technological innovation. Founded on 1st January 1963, IEEE is the amalgamation
            of the American Institute of Electrical Engineers (AIEE) and the Institute of
            Radio Engineers (IRE). IEEE is one of the leading organizations in the field of
            electrical, electronics, telecommunication, and computing with over 1100 active
            standards.
          </p>
          <button type="button" className="bg-gradient-to-r bg-opacity-80 from-[#1b5786] to-[#12436c]   hover:bg-indigo-700 text-white font-medium py-0 px-6 rounded-full  transition-all duration-300  border-2 border-solid border-[#00aff5] ">
            Meet our team &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &#x203A;
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;

