import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../assets/favicon/favicon-32x32.png";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollThreshold = 10; // Adjust this value to control visibility trigger point

  const handleScroll = () => {
    const currentScrollY =
      window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(currentScrollY > scrollThreshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <>
      <footer
        className={
          "w-full h-full md:h-80 bg-[#282529] text-white flex md:flex-row flex-wrap justify-center items-center md:px-10 py-4 px-3"
        }
      >
        <div
          className={
            "md:w-4/12 w-full h-full flex flex-col justify-center items-center mb-3 border-b-[1px] border-gray-400  md:border-none"
          }
        >
          <h1
            className={
              "w-full text-3xl text-white flex justify-center items-center mb-3 md:justify-start md:items-start"
            }
          >
            <span className={"text-[#328A8A]"}>Web</span> Talk
          </h1>
          <div
            className={
              "w-full flex flex-wrap justify-center items-center mb-3 md:justify-start md:items-start"
            }
          >
            <Link
              to={"/"}
              className={
                "mr-2 font-medium hover:underline hover:underline-offset-2 text-white text-[18px] "
              }
            >
              Home
            </Link>
            |
            <Link
              to={"/"}
              className={
                "mr-2 font-medium hover:underline hover:underline-offset-2 text-white text-[18px] ml-1"
              }
            >
              About
            </Link>
            |
            <Link
              to={"/"}
              className={
                "mr-2 font-medium hover:underline hover:underline-offset-2 text-white text-[18px] ml-1"
              }
            >
              Contact
            </Link>
            |
            <Link
              to={"/"}
              className={
                "mr-2 font-medium hover:underline hover:underline-offset-2 text-white text-[18px] ml-1"
              }
            >
              Blogs
            </Link>
          </div>
          <p
            className={
              "w-full text-center flex justify-center items-center font-normal mb-3 text-fuchsia-50 text-[16px] md:justify-start md:items-start"
            }
          >
            Copyright &copy;{" "}
            <a href="https://www.webtalk.com"> Web Talk 2024</a>
          </p>
          <p
            className={
              "w-full text-center flex justify-center items-center font-normal mb-3 text-fuchsia-50 text-[16px] md:justify-start md:items-start"
            }
          >
            All rights are reserved
          </p>
        </div>
        <div
          className={
            "md:w-4/12 w-full h-full flex flex-col justify-center items-center mb-3 border-b-[1px] border-gray-400  md:border-none"
          }
        >
          <h1
            className={
              "w-full text-3xl text-white flex justify-center items-center mb-3 md:justify-start md:items-start"
            }
          >
            Contact Us
          </h1>
          <div
            className={
              "w-full flex flex-col flex-wrap justify-center items-center mb-3 md:justify-start md:items-start list-none"
            }
          >
            <li
              className={
                "w-full flex justify-center items-center md:justify-start md:mb-1"
              }
            >
              <span
                className={
                  "w-8 h-8 bg-gray-900 rounded-full flex justify-center items-center md:mr-2"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-phone" />
              </span>
              <span>+880 1798541625</span>
            </li>
            <li
              className={
                "w-full flex justify-center items-center md:justify-start md:mb-1"
              }
            >
              <span
                className={
                  "w-8 h-8 bg-gray-900 rounded-full flex justify-center items-center md:mr-2"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-envelope" />
              </span>
              <a href={"mailto:afnanmafuj22@gmail.com"}>
                afnanmafuj22@gmail.com
              </a>
            </li>
            <li
              className={
                "w-full flex justify-center items-center md:justify-start"
              }
            >
              <span
                className={
                  "w-8 h-8 bg-gray-900 rounded-full flex justify-center items-center md:mr-2"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-location-dot" />
              </span>
              <span>Mirpur 12, Eastern Housing, Dhaka</span>
            </li>
          </div>
        </div>
        <div
          className={
            "md:w-4/12 w-full h-full flex flex-col justify-center items-center mb-3  border-gray-400  md:border-none"
          }
        >
          <h1
            className={
              "w-full text-3xl text-white flex justify-center items-center mb-3 md:justify-start md:items-start"
            }
          >
            About Us
          </h1>
          <p
            className={
              "w-full  flex text-justify flex-wrap justify-center items-center mb-3 md:justify-start md:items-start "
            }
          >
            Web Talk is a blogging website where many author write blogs on many
            topics like Geo-politics, Global warming, Modern technologies,
            Science, Fictions, Gaming industry etc. Users can read blog be a
            author and write blogs give feedback to others blogs etc.
          </p>
          <div
            className={
              "w-full flex md:justify-start justify-center items-center "
            }
          >
            <a
              className={
                "w-10 h-10  flex justify-center items-center bg-gray-800 hover:animate-bounce hover:shadow-gray-950 cursor-pointer mr-2"
              }
              href={""}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon="fa-brands fa-facebook"
                size={"xl"}
                color={"#1877F2"}
              />
            </a>
            <a
              className={
                "w-10 h-10 flex justify-center items-center bg-gray-800 hover:animate-bounce hover:shadow-gray-950 cursor-pointer mr-2"
              }
              href={""}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon="fa-brands fa-youtube"
                size={"xl"}
                color={"#FF0000"}
              />
            </a>
            <a
              className={
                "w-10 h-10  flex justify-center items-center bg-gray-800 hover:animate-bounce hover:shadow-gray-950 cursor-pointer mr-2"
              }
              href={""}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon="fa-brands fa-instagram"
                size={"xl"}
                color={"#fbad50"}
              />
            </a>
            <a
              className={
                "w-10 h-10  flex justify-center items-center bg-gray-800 hover:animate-bounce hover:shadow-gray-950 cursor-pointer mr-2"
              }
              href={""}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon="fa-brands fa-github"
                size={"xl"}
                color={"#1877F2"}
              />
            </a>
          </div>
        </div>
        <div
          className={`transition-opacity duration-400 ease-in-out fixed bottom-4 right-4 w-10 h-10 flex justify-center items-center bg-black text-white rounded-full cursor-pointer hover:shadow-2xl hover:shadow-gray-950 ${
            isVisible ? "opacity-1" : "opacity-0"
          }
          }`}
          onClick={scrollTop}
        >
          <FontAwesomeIcon icon="fa-solid fa-arrow-up" size={"lg"} />
        </div>
      </footer>
    </>
  );
};
