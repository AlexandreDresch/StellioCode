import Banner from "@/components/whatwedo-page/banner";
import FeaturedProjects from "@/components/whatwedo-page/FeaturedProjects";
import CallToAction from "@/components/whatwedo-page/CallToAction";

const WhatWeDo = () => {
  return (
    <div className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Banner />
      <FeaturedProjects />
      <CallToAction />
    </div>
  );
};

export default WhatWeDo;
