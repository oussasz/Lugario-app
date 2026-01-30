import React from "react";
import dynamic from "next/dynamic";

import Avatar from "@/components/Avatar";
import ListingCategory from "./ListingCategory";
import { Category } from "@/types";
import {
  durationCategories,
  featureCategories,
} from "@/utils/constants";

interface ListingInfoProps {
  user: {
    image: string | null;
    name: string | null;
  };
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: Category | undefined;
  duration?: string | null;
  features?: string | null;
  latitude: number | null;
  longitude: number | null;
}

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  duration,
  features,
  latitude,
  longitude,
}) => {
  // Parse features string to array
  const featuresList = features ? features.split(",").filter(Boolean) : [];
  const featureItems = featuresList
    .map((f) => featureCategories.find((fc) => fc.label === f))
    .filter(Boolean);

  // Get duration info
  const durationInfo = duration
    ? durationCategories.find((d) => d.label === duration)
    : null;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-[16px] font-semibold flex flex-row items-center gap-2">
          <span className="mr-1">Hosted by</span> <Avatar src={user?.image} />
          <span> {user?.name}</span>
        </div>
        <div
          className="flex flex-row items-center gap-4 font-light text-neutral-700
          "
        >
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>
      <hr />

      {/* Duration */}
      {durationInfo && (
        <>
          <ListingCategory
            icon={durationInfo.icon}
            label={durationInfo.label}
            description={durationInfo.description}
          />
          <hr />
        </>
      )}

      {/* Purpose/Category */}
      {category && (
        <>
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description || ""}
          />
          <hr />
        </>
      )}

      {/* Features */}
      {featureItems.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">Property Features</span>
            <div className="flex flex-wrap gap-2">
              {featureItems.map((feature) => {
                if (!feature) return null;
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.label}
                    className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-full"
                  >
                    <Icon size={18} className="text-neutral-600" />
                    <span className="text-sm text-neutral-700">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <hr />
        </>
      )}

      <p className="font-light text-neutral-500 text-[16px]">{description}</p>
      <hr />
      <div className="h-[210px]">
        <Map
          center={latitude && longitude ? [latitude, longitude] : undefined}
        />
      </div>
    </div>
  );
};

export default ListingInfo;
