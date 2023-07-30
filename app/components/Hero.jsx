import React from "react";

const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?cs=srgb&dl=pexels-steve-johnson-1183992.jpg&fm=jpg')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
  contentWrapper: `h-screen w-screen flex relative justify-center flex-wrap items-center gap-2`,
  copyContainer: `w-3/4 m-4`,
  title: `relative text-slate-500 text-[46px] font-bold`,
  description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
  ctaContainer: `flex`,
  accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: `rounded-[3rem] my-[20px] sm:my-0`,
  infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
  author: `flex flex-col justify-center ml-4`,
  name: ``,
  infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
};

const Hero = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Welcome to Oasis
            </div>
            <div className={style.description}>
              Empowering Small Businesses, Strengthening Communities.
            </div>
            <div className={style.ctaContainer}>
              <button className={style.accentedButton}>Explore</button>
              <button className={style.button}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
