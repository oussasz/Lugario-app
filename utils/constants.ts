import { IconType } from "react-icons";
import {
  MdNightlight,
  MdCalendarMonth,
  MdDateRange,
  MdAccessTime,
  MdBeachAccess,
  MdBusinessCenter,
  MdFamilyRestroom,
  MdSchool,
  MdFavorite,
  MdCelebration,
  MdWaves,
  MdCabin,
  MdLocalAirport,
  MdLocationCity,
  MdLocalParking,
  MdWifi,
  MdAcUnit,
  MdSmokeFree,
  MdSmokingRooms,
  MdPets,
  MdSecurity,
  MdAccessible,
} from "react-icons/md";
import { FaUniversity } from "react-icons/fa";

// ============================================
// DURATION CATEGORIES (Rental Period)
// ============================================
export const durationCategories = [
  {
    label: "By Night",
    icon: MdNightlight,
    description: "Short stay - rent by the night",
  },
  {
    label: "Per Week",
    icon: MdDateRange,
    description: "Weekly rental - 7 days minimum",
  },
  {
    label: "Per Month",
    icon: MdCalendarMonth,
    description: "Monthly rental - medium term stay",
  },
  {
    label: "Long Term",
    icon: MdAccessTime,
    description: "Long duration rental (+3 months)",
  },
];

// ============================================
// PURPOSE CATEGORIES (Who is it for?)
// ============================================
export const purposeCategories = [
  {
    label: "Tourism",
    icon: MdBeachAccess,
    description: "Perfect for tourists and travelers",
  },
  {
    label: "Business",
    icon: MdBusinessCenter,
    description: "Ideal for business travelers",
  },
  {
    label: "Families",
    icon: MdFamilyRestroom,
    description: "Family-friendly accommodation",
  },
  {
    label: "Students",
    icon: MdSchool,
    description: "Suitable for students",
  },
  {
    label: "Couples",
    icon: MdFavorite,
    description: "Romantic getaway for couples",
  },
  {
    label: "Events",
    icon: MdCelebration,
    description: "For occasions: photo shoots, engagements, birthdays...",
  },
];

// ============================================
// FEATURE CATEGORIES (Property Features)
// ============================================
export const featureCategories = [
  {
    label: "Near Beach",
    icon: MdWaves,
    description: "Close to the sea",
  },
  {
    label: "Countryside",
    icon: MdCabin,
    description: "Rural country house",
  },
  {
    label: "Near Airport",
    icon: MdLocalAirport,
    description: "Close to the airport",
  },
  {
    label: "Near University",
    icon: FaUniversity,
    description: "Close to university",
  },
  {
    label: "Downtown",
    icon: MdLocationCity,
    description: "City center location",
  },
  {
    label: "Parking",
    icon: MdLocalParking,
    description: "Parking available",
  },
  {
    label: "Fast WiFi",
    icon: MdWifi,
    description: "Strong WiFi connection",
  },
  {
    label: "Air Conditioning",
    icon: MdAcUnit,
    description: "Air conditioning available",
  },
  {
    label: "Smoking Allowed",
    icon: MdSmokingRooms,
    description: "Smoking is permitted",
  },
  {
    label: "No Smoking",
    icon: MdSmokeFree,
    description: "Smoke-free property",
  },
  {
    label: "Pets Allowed",
    icon: MdPets,
    description: "Pet-friendly property",
  },
  {
    label: "Security",
    icon: MdSecurity,
    description: "Security cameras / guarded",
  },
  {
    label: "Accessible",
    icon: MdAccessible,
    description: "Suitable for people with disabilities",
  },
];

// ============================================
// COMBINED CATEGORIES (for backward compatibility)
// These are shown in the main category bar
// ============================================
export const categories = purposeCategories;

// ============================================
// TYPE DEFINITIONS
// ============================================
export interface CategoryItem {
  label: string;
  icon: IconType;
  description: string;
}

export const LISTINGS_BATCH = 16;

export const menuItems = [
  {
    label: "My trips",
    path: "/trips",
  },
  {
    label: "My favorites",
    path: "/favorites",
  },
  {
    label: "My reservations",
    path: "/reservations",
  },
  {
    label: "My properties",
    path: "/properties",
  },
];
