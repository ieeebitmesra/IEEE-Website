"use client"

import React, { useState } from 'react';
import Title from "./Title";
import Link from 'next/link';

const Contact: React.FC = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState({ ...formState, [event.target.id]: event.target.value });
      };
    
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formState.name && formState.email && formState.message) {
          // Send email logic here
          console.log('Email sent!');
          setFormState({ name: '', email: '', message: '' });
        } else {
          console.log('Please fill out all fields.');
        }
      };
  return (
    <>
     <Title title='Contact Us' /> 
    <div className="bg-gradient-to-bl from-[#320c35] via-[#03152c] to-[#000818] min-h-screen text-white flex flex-col items-center ]">
       

      {/* Content Section */}
      <div className="container mt-20 mb-20 mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-gradient-to-r from-[#00153c]  to-[#090b21] bg-opacity-80 p-[8%] rounded-xl border-r-[4px] border-r-[#18233b] shadow-lg">
        <div className="flex gap-3 p-3">
        <img
              src="/message.svg" 
              alt="Our Team"
              className="w-[2rem] h-[2rem]"
            />
          <h2 className="text-xl md:text-3xl font-semibold text-blue-400 mb-4">Send us a message</h2>
        </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="name" className='ml-3 opacity-90'>Name</label>
            <input
              type="text"
              placeholder="Julliete NIcholas"
              id='name'
              value={formState.name}
        onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gradient-to-l from-[#0f2144] via-[#111e3c] to-[#141c36] border border-[#1a253e] text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <label htmlFor="email" className='ml-3 opacity-90'>Email</label>
            <input
              type="email"
              placeholder="mail@gmail.com"
              id="email"
              value={formState.email}
        onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gradient-to-l from-[#0f2144] via-[#111e3c] to-[#141c36] border border-[#1a253e] text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <label htmlFor="message" className='ml-3 opacity-90'>Message</label>
            <textarea
              placeholder="Message"
              id='message'
              value={formState.message}
        onChange={handleInputChange}
              className="w-full p-3 rounded-md bg-gradient-to-l from-[#0f2144] via-[#111e3c] to-[#141c36] border border-[#1a253e] text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#26B1FC] hover:bg-blue-600 text-white font-semibold transition"
            >
              Send
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="flex flex-col p-[5%] gap-6">
          <div>
            <h2 className="text-xl  md:text-3xl font-semibold text-blue-400 mb-2">Contact</h2>
            <p  className="opacity-70 mt-1 text-lg">Phone Number</p>
            <p className="opacity-70 mt-1 text-lg">mail@bitmesra.ac.in</p>
            <p className="opacity-70 mt-1 text-lg">Address, BIT Mesra</p>
            <p className="opacity-70 mt-1 text-lg">Ranchi, Jharkhand</p>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-semibold text-blue-400 mb-2">Connect</h2>
            <div className="flex gap-4 mt-3 text-xl">
              <Link href="#" className="hover:text-blue-400 h-[2rem] w-[2rem]">
              <img
              src="/instagram.svg" 
              alt="Our Team"
              className="object-cover w-full h-full"
            />
              </Link>
              <Link href="#" className="hover:text-blue-400 h-[2rem] w-[2rem]">
              <img
              src="/twitter.svg" 
              alt="Our Team"
              className="object-cover w-full h-full"
            />
              </Link>
              <Link href="#" className="hover:text-blue-400 h-[2rem] w-[2rem]">
              <img
              src="/linkedin.svg" 
              alt="Our Team"
              className="object-cover w-full h-full"
            />
              </Link>
              <Link href="#" className="hover:text-blue-400 h-[2rem] w-[2rem]">
              <img
              src="/facebook.svg" 
              alt="Our Team"
              className="object-cover w-full h-full"
            />
              </Link>
              <Link href="#" className="hover:text-blue-400 h-[2rem] w-[2rem]">
              <img
              src="/link.svg" 
              alt="Our Team"
              className="object-cover w-full h-full"
            />
              </Link>
              
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-4 h-[10rem] bg-[#0d0f3d] text-2xl opacity-50 flex items-center justify-center">
        &copy; 2025 IEEE, BIT Mesra. All rights reserved.
      </footer>
    </div>
    </>
  );
};

export default Contact;
