import Lottie from "lottie-react";

import successAnimation from "../../animations/success-animation.json";

export default function SuccessAnimation() {
  return <Lottie animationData={successAnimation} loop={false} />;
}
