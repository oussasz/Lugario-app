-- Lugario seed (cPanel/phpMyAdmin import)
-- Creates/updates an admin user and 20 demo listings (marked with [seed]).
-- Safe to re-run: deletes prior seeded listings for that admin user.

SET @seed_admin_email := 'admin@lugario.local';

INSERT INTO `User` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`)
VALUES ('seed_admin', 'admin', @seed_admin_email, '$2b$12$o7XYnZfWMEITeGOkp99lkuehvwFbUo1ZXOVn9or54vjM2KvADirWe', NOW(), NOW())
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `password` = VALUES(`password`),
  `updatedAt` = VALUES(`updatedAt`);
SELECT @seed_admin_id := `id` FROM `User` WHERE `email` = @seed_admin_email LIMIT 1;

DELETE FROM `Listing` WHERE `userId` = @seed_admin_id AND `description` LIKE '%[seed]%';

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_16', 'Modern apartment in Alger Centre', '[seed] Realistic demo listing for Alger. Ideal for tourism stays. Includes: Near Beach, Near University, Air Conditioning. Rental: Per Week.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/house.jpg', 'Tourism', 'Per Week', 'Near Beach,Near University,Air Conditioning,Accessible', 1, 1, 3, @seed_admin_id, 11400, 'Algeria', 36.700142299999996, 3.0911375999999997, 'Alger', 'Alger Centre', 'Rue des Oliviers, Alger Centre, Alger', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_31', 'Cozy studio • Oran', '[seed] Realistic demo listing for Oran. Ideal for business stays. Includes: Countryside, Downtown, No Smoking. Rental: Per Month.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/apartment.jpg', 'Business', 'Per Month', 'Countryside,Downtown,No Smoking,Near Beach', 2, 2, 5, @seed_admin_id, 9800, 'Algeria', 35.6214374, -0.62666795, 'Oran', 'Arzew', 'Rue des Oliviers, Arzew, Oran', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_25', 'Family-friendly home near Constantine', '[seed] Realistic demo listing for Constantine. Ideal for families stays. Includes: Near Airport, Parking, Pets Allowed. Rental: Long Term.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/lake.jpg', 'Families', 'Long Term', 'Near Airport,Parking,Pets Allowed,Countryside', 3, 1, 7, @seed_admin_id, 8600, 'Algeria', 36.3584155, 6.6794735, 'Constantine', 'Constantine', 'Rue des Oliviers, Constantine, Constantine', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_23', 'Bright downtown stay in Annaba', '[seed] Realistic demo listing for Annaba. Ideal for students stays. Includes: Near University, Fast WiFi, Security. Rental: By Night.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/balloons.jpg', 'Students', 'By Night', 'Near University,Fast WiFi,Security,Near Airport', 4, 2, 8, @seed_admin_id, 9200, 'Algeria', 36.8439258, 7.557456, 'Annaba', 'El Bouni', 'Rue des Oliviers, El Bouni, Annaba', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_06', 'Quiet retreat in Amizour', '[seed] Realistic demo listing for Béjaïa. Ideal for couples stays. Includes: Downtown, Air Conditioning, Accessible. Rental: Per Week.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/surf.jpg', 'Couples', 'Per Week', 'Downtown,Air Conditioning,Accessible,Near University', 1, 1, 3, @seed_admin_id, 9700, 'Algeria', 36.55677345, 4.9167085, 'Béjaïa', 'Amizour', 'Rue des Oliviers, Amizour, Béjaïa', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_15', 'Modern apartment in Ait Boumahdi', '[seed] Realistic demo listing for Tizi Ouzou. Ideal for events stays. Includes: Parking, No Smoking, Near Beach. Rental: Per Month.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/mountain.jpg', 'Events', 'Per Month', 'Parking,No Smoking,Near Beach,Downtown', 2, 2, 5, @seed_admin_id, 8600, 'Algeria', 36.68163305, 4.1841925, 'Tizi Ouzou', 'Ait Boumahdi', 'Rue des Oliviers, Ait Boumahdi, Tizi Ouzou', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_19', 'Cozy studio • Sétif', '[seed] Realistic demo listing for Sétif. Ideal for tourism stays. Includes: Fast WiFi, Pets Allowed, Countryside. Rental: Long Term.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/cafe.jpg', 'Tourism', 'Long Term', 'Fast WiFi,Pets Allowed,Countryside,Parking', 3, 1, 7, @seed_admin_id, 8000, 'Algeria', 36.105706749999996, 5.37794375, 'Sétif', 'Ain-Sebt', 'Rue des Oliviers, Ain-Sebt, Sétif', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_05', 'Family-friendly home near Boulhilat', '[seed] Realistic demo listing for Batna. Ideal for business stays. Includes: Air Conditioning, Security, Near Airport. Rental: By Night.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/bridge.jpg', 'Business', 'By Night', 'Air Conditioning,Security,Near Airport,Fast WiFi', 4, 2, 8, @seed_admin_id, 7100, 'Algeria', 35.338184, 5.7667322500000004, 'Batna', 'Boulhilat', 'Rue des Oliviers, Boulhilat, Batna', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_09', 'Bright downtown stay in Blida', '[seed] Realistic demo listing for Blida. Ideal for families stays. Includes: No Smoking, Accessible, Near University. Rental: Per Week.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/castle.jpg', 'Families', 'Per Week', 'No Smoking,Accessible,Near University,Air Conditioning', 1, 1, 3, @seed_admin_id, 7700, 'Algeria', 36.50117065, 2.8917976000000003, 'Blida', 'Chiffa', 'Rue des Oliviers, Chiffa, Blida', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_42', 'Quiet retreat in Douaouda', '[seed] Realistic demo listing for Tipaza. Ideal for students stays. Includes: Pets Allowed, Near Beach, Downtown. Rental: Per Month.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/park.jpg', 'Students', 'Per Month', 'Pets Allowed,Near Beach,Downtown,No Smoking', 2, 2, 5, @seed_admin_id, 8400, 'Algeria', 36.527279899999996, 2.23740995, 'Tipaza', 'Douaouda', 'Rue des Oliviers, Douaouda, Tipaza', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_13', 'Modern apartment in Beni Khellad', '[seed] Realistic demo listing for Tlemcen. Ideal for couples stays. Includes: Security, Countryside, Parking. Rental: Long Term.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/boat.jpg', 'Couples', 'Long Term', 'Security,Countryside,Parking,Pets Allowed', 3, 1, 7, @seed_admin_id, 8200, 'Algeria', 34.66737645, -1.4909846, 'Tlemcen', 'Beni Khellad', 'Rue des Oliviers, Beni Khellad, Tlemcen', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_18', 'Cozy studio • Jijel', '[seed] Realistic demo listing for Jijel. Ideal for events stays. Includes: Accessible, Near Airport, Fast WiFi. Rental: By Night.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/road.jpg', 'Events', 'By Night', 'Accessible,Near Airport,Fast WiFi,Security', 4, 2, 8, @seed_admin_id, 7800, 'Algeria', 36.72925945, 5.965173200000001, 'Jijel', 'Erraguene Souissi', 'Rue des Oliviers, Erraguene Souissi, Jijel', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_21', 'Family-friendly home near Djendel Saadi Mohamed', '[seed] Realistic demo listing for Skikda. Ideal for tourism stays. Includes: Near Beach, Near University, Air Conditioning. Rental: Per Week.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/skyscraper.jpg', 'Tourism', 'Per Week', 'Near Beach,Near University,Air Conditioning,Accessible', 1, 1, 3, @seed_admin_id, 7800, 'Algeria', 36.75458415, 6.82232505, 'Skikda', 'Djendel Saadi Mohamed', 'Rue des Oliviers, Djendel Saadi Mohamed, Skikda', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_27', 'Bright downtown stay in Mostaganem', '[seed] Realistic demo listing for Mostaganem. Ideal for business stays. Includes: Countryside, Downtown, No Smoking. Rental: Per Month.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/interior.jpg', 'Business', 'Per Month', 'Countryside,Downtown,No Smoking,Near Beach', 2, 2, 5, @seed_admin_id, 8300, 'Algeria', 36.002837650000004, 0.31258485, 'Mostaganem', 'Mesra', 'Rue des Oliviers, Mesra, Mostaganem', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_30', 'Quiet retreat in Ain Beida', '[seed] Realistic demo listing for Ouargla. Ideal for families stays. Includes: Near Airport, Parking, Pets Allowed. Rental: Long Term.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/restaurant.jpg', 'Families', 'Long Term', 'Near Airport,Parking,Pets Allowed,Countryside', 3, 1, 7, @seed_admin_id, 6300, 'Algeria', 30.9986065, 6.2351745, 'Ouargla', 'Ain Beida', 'Rue des Oliviers, Ain Beida, Ouargla', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_47', 'Modern apartment in Metlili', '[seed] Realistic demo listing for Ghardaïa. Ideal for students stays. Includes: Near University, Fast WiFi, Security. Rental: By Night.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/beach.jpg', 'Students', 'By Night', 'Near University,Fast WiFi,Security,Near Airport', 4, 2, 8, @seed_admin_id, 7000, 'Algeria', 32.4346935, 3.6325488, 'Ghardaïa', 'Metlili', 'Rue des Oliviers, Metlili, Ghardaïa', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_07', 'Cozy studio • Biskra', '[seed] Realistic demo listing for Biskra. Ideal for couples stays. Includes: Downtown, Air Conditioning, Accessible. Rental: Per Week.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/snow.jpg', 'Couples', 'Per Week', 'Downtown,Air Conditioning,Accessible,Near University', 1, 1, 3, @seed_admin_id, 6100, 'Algeria', 34.7842438, 5.848852, 'Biskra', 'M''chouneche', 'Rue des Oliviers, M''chouneche, Biskra', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_35', 'Family-friendly home near Leghata', '[seed] Realistic demo listing for Boumerdès. Ideal for events stays. Includes: Parking, No Smoking, Near Beach. Rental: Per Month.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/garden.jpg', 'Events', 'Per Month', 'Parking,No Smoking,Near Beach,Downtown', 2, 2, 5, @seed_admin_id, 9600, 'Algeria', 36.7358699, 3.63119965, 'Boumerdès', 'Leghata', 'Rue des Oliviers, Leghata, Boumerdès', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_02', 'Bright downtown stay in Chlef', '[seed] Realistic demo listing for Chlef. Ideal for tourism stays. Includes: Fast WiFi, Pets Allowed, Countryside. Rental: Long Term.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/room.jpg', 'Tourism', 'Long Term', 'Fast WiFi,Pets Allowed,Countryside,Parking', 3, 1, 7, @seed_admin_id, 6700, 'Algeria', 36.20342155, 1.2057315, 'Chlef', 'Oued Goussine', 'Rue des Oliviers, Oued Goussine, Chlef', NOW()
);

INSERT INTO `Listing` (
  `id`, `title`, `description`, `imageSrc`, `category`, `duration`, `features`,
  `roomCount`, `bathroomCount`, `guestCount`, `userId`, `price`,
  `country`, `latitude`, `longitude`, `region`, `municipality`, `address`, `createdAt`
) VALUES (
'seed_listing_22', 'Quiet retreat in Marhoum', '[seed] Realistic demo listing for Sidi Bel Abbès. Ideal for business stays. Includes: Air Conditioning, Security, Near Airport. Rental: By Night.', 'https://res.cloudinary.com/demo/image/upload/v1690000000/villa.jpg', 'Business', 'By Night', 'Air Conditioning,Security,Near Airport,Fast WiFi', 4, 2, 8, @seed_admin_id, 7100, 'Algeria', 34.682564, -0.5422520000000001, 'Sidi Bel Abbès', 'Marhoum', 'Rue des Oliviers, Marhoum, Sidi Bel Abbès', NOW()
);
