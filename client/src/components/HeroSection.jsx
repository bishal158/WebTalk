import hero_section from "../assets/images/Hero.gif";
import { socials } from "../constants/constants.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const HeroSection = () => {
  return (
    <div
      className={
        "w-full h-screen flex justify-around items-center flex-wrap px-2 "
      }
    >
      <div className={"flex flex-col justify-center items-center "}>
        <h5 className="animate-character text-6xl text-start mb-3 md:text-8xl">
          Web Talk
        </h5>
        <div className={"w-full h-full flex flex-wrap mb-5"}>
          <q className={"font-normal  text-2xl"}>
            Knowledge speaks, but wisdom listens.
          </q>
          <span className={" text-xl font-bold"}>- Jimi Hendrix</span>
        </div>
        <div
          className={
            "w-full h-full flex flex-wrap justify-start items-center mb-3"
          }
        >
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.links}
              target={"_blank"}
              rel={"noopener noreferrer"}
              className={
                "w-25 h-25 flex justify-center items-center bg-black rounded-full hover:animate-bounce"
              }
            >
              <FontAwesomeIcon
                icon={social.icon}
                style={{ color: social.color, fontSize: 25 }}
              />
            </a>
          ))}
        </div>
        <div className={"w-full h-full flex justify-start items-center"}>
          <button
            className={
              "w-25 h-25 p-2 flex justify-center items-center bg-indigo-950 text-white px-3 rounded"
            }
          >
            Get Started !!!
          </button>
        </div>
      </div>
      <img src={hero_section} alt={"...."} />
    </div>
  );
};
