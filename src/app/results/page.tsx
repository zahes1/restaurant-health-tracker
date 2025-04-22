import Image from "next/image";
import { BusinessCard } from "@/app/components/layout/business-card";

export default function Home() {
  const sampleBusiness = {
    name: "Sample Restaurant",
    avg_rating: 4.5,
    review_count: 100,
    price: 2,
    categories: [{ name: "Restaurant" }],
    addresses: {
      primary_language: {
        long_form: "123 Sample Street, City, State"
      }
    },
    phone: "123-456-7890",
    localized_phone: "123-456-7890",
    primary_photo: {
      url_prefix: "https://example.com/",
      url_suffix: "sample.jpg"
    },
    photos: [],
    photo_count: 0
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-8">
      <BusinessCard business={sampleBusiness} />
      <BusinessCard business={sampleBusiness} />
      <BusinessCard business={sampleBusiness} />
      <BusinessCard business={sampleBusiness} />
      <BusinessCard business={sampleBusiness} />
    </div>
  );
}
