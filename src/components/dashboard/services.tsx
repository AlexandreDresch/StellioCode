import { Globe, Smartphone, Wrench, MessageCircle } from "lucide-react";
import { ServiceCard } from "./service-card";
import { Service } from "@/types";
import { ServiceCardSkeleton } from "../skeletons/service-card-skeleton";

export function Services({
  services,
  isLoading,
}: {
  services: Service[];
  isLoading: boolean;
}) {
  const icons = [<Globe />, <Smartphone />, <MessageCircle />, <Wrench />];
  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <ServiceCardSkeleton key={index} index={index} />
          ))
        : services.map((service, index) => (
            <div>
              <ServiceCard
                key={service.title}
                service={service}
                icon={icons[index] || icons[0]}
                index={index}
              />
            </div>
          ))}
    </div>
  );
}
