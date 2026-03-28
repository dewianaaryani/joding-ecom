import React from "react";
import StackedImage from "./StackedImage";
import BugFixing from "./BugFixing";
import Deployment from "./Deployment";

interface Props {
  slug: string;
}

export default function SelectedServices({ slug }: Props) {
  if (slug === "website-app")
    return (
      <StackedImage
        src1="/img/catalog/web-app1.png"
        src2="/img/catalog/web-app2.png"
        alt="Web App"
      />
    );
  if (slug === "modern-landing-page")
    return (
      <StackedImage
        src1="/img/catalog/lp-2.png"
        src2="/img/catalog/lp-1.png"
        alt="Modern Landing Page"
      />
    );
  if (slug === "perbaikan-bug") return <BugFixing start={true} />;
  if (slug === "deployment-website") return <Deployment start={true} />;
  return null; // return null instead of "Undefined"
}
