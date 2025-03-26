import Banner from "@/components/whatwedo-page/Banner";
import FeaturedProjects from "@/components/whatwedo-page/FeaturedProjects";
import CallToAction from "@/components/whatwedo-page/CallToAction";
import Header from "@/components/header";
import Footer from "@/components/Footer";

const WhatWeDo = () => {
  return (
    <div className="flex flex-col gap-6 bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <Banner />
      <FeaturedProjects />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default WhatWeDo;
