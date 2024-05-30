import { HeroSection } from "../components/static/HeroSection.jsx";
import { Counter } from "../components/static/Counter.jsx";
import { PopularPosts } from "../components/PopularPosts.jsx";

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <PopularPosts />
      <Counter />
    </div>
  );
};
