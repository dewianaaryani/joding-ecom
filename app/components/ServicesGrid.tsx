// ServicesGrid.tsx
import { ArrowRight, ArrowUp } from "lucide-react";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import SelectedServices from "./SelectedServices";
import BugFixingCard from "./BugFixingCard";

export default function ServicesGrid() {
  const isMobileOrTab = useMediaQuery({ maxWidth: 1024 });
  const services = [
    { name: "Website App", slug: "website-app" },
    { name: "Modern Landing Page", slug: "modern-landing-page" },
    { name: "Perbaikan Bug", slug: "perbaikan-bug" },
    { name: "Deployment Website", slug: "deployment-website" },
  ];

  // null = nothing selected on mobile/tab
  const [selectedService, setSelectedService] = React.useState<string | null>(
    null,
  );
  useEffect(() => {
    if (!isMobileOrTab && !selectedService) {
      setSelectedService(services[0].slug);
    }
  }, [isMobileOrTab]);

  if (isMobileOrTab) {
    return (
      <div className="flex flex-col w-full gap-4">
        {services.map((service) => {
          const isSelected = selectedService === service.slug;
          return (
            <div
              key={service.slug}
              onClick={() =>
                setSelectedService(isSelected ? null : service.slug)
              }
              className={`flex flex-col gap-4 p-5 w-full rounded-2xl cursor-pointer transition-all
                ${
                  isSelected
                    ? "shadow-[inset_0_0_0_1px_rgba(105,107,162,0.4)]"
                    : "shadow-[inset_0_0_0_1px_rgba(105,107,162,0.15)]"
                }`}
            >
              <div className="flex justify-between items-center">
                <h5>{service.name}</h5>
                <ArrowUp
                  className={`size-5 transition-transform ${isSelected ? "rotate-180" : ""}`}
                />
              </div>
              {isSelected && (
                <>
                  <hr className="border-white/20" />
                  <div className="flex justify-center items-center">
                    <SelectedServices slug={service.slug} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="gap-4 w-full grid grid-cols-6 items-stretch">
      {/* Left column */}
      <div className="flex flex-col col-span-2 xl:col-span-2 w-full gap-4">
        {services.map((service) => {
          const isSelected = selectedService === service.slug;
          return (
            <div
              key={service.slug}
              onClick={() => setSelectedService(service.slug)}
              className={`flex flex-col gap-4 p-5 w-full rounded-2xl cursor-pointer transition-all
            ${
              isSelected
                ? "shadow-[inset_0_0_0_1px_rgba(105,107,162,0.4)]"
                : "shadow-[inset_0_0_0_1px_rgba(105,107,162,0.15)]"
            }`}
            >
              <div className="flex justify-between items-center">
                <h5
                  className={`${isSelected ? "text-white" : "text-white/40"}`}
                >
                  {service.name}
                </h5>
                <ArrowRight
                  className={`${isSelected ? "text-white" : "text-white/40"} size-5`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Right panel */}
      <div className="flex card-outline p-5 col-span-4 xl:col-span-4 h-[50vh] justify-center items-center">
        {selectedService && <SelectedServices slug={selectedService} />}
      </div>
    </div>
  );
}
