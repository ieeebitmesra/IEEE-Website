import React from 'react';

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <div className="bg-gradient-to-bl from-[#320c35] via-[#03152c] to-[#000818] text-white flex flex-col items-center">
      
      <div
        className="w-full bg-cover bg-center h-[10rem] flex items-center justify-center"
        style={{ backgroundImage: `url('/title.svg')` }}
      >
        <h1
          className="text-3xl font-montserrat border-l-8 border-[#494cff] md:text-5xl font-bold px-4 py-2 rounded"
          style={{
            background: `linear-gradient(to right, rgba(55,59,120,0.6), rgba(18,22,49,0.5), rgba(12,18,34,0.1))`,
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Title;
