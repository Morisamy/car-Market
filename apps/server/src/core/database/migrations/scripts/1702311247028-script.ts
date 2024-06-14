import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('cccdbdf7-a5b7-4394-86fc-14402b17583a', '8Kiera38@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=10', 'cus_F8G9H0I1J2K3L4', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('a957ee16-5d92-4e32-86e1-d9f981a018c9', '15Mercedes_OConner81@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=17', 'cus_K7L8M9N0O1P2Q3', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('34c183de-d2fe-4f58-82ab-7151989a8b93', '22Aidan.Lakin@yahoo.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=24', 'cus_K7L8M9N0O1P2Q3', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('4ac32f71-7720-4142-be8a-e98a686d9907', '29Dayana.Hauck@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=31', 'cus_R4S5T6U7V8W9X0', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('d57d3188-5db8-45eb-ad4f-c873525d8b1b', '36Magnolia49@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=38', 'cus_F8G9H0I1J2K3L4', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d', '43Deondre_Swift@hotmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=45', 'cus_F8G9H0I1J2K3L4', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('55f53041-4f18-49fe-8831-4b7d36f4008f', '50Trudie56@gmail.com', 'David Wilson', 'https://i.imgur.com/YfJQV5z.png?id=52', 'cus_Y1Z2A3B4C5D6E7', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('4a4b8ac6-ab7a-4858-b790-fb995d962b42', '57Harry_Rodriguez26@hotmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=59', 'cus_Y1Z2A3B4C5D6E7', 'deleted', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "stripeCustomerId", "status", "password") VALUES ('3be7daf8-f74a-455a-922b-25774b859459', '64Sandrine63@yahoo.com', 'Emily Jones', 'https://i.imgur.com/YfJQV5z.png?id=66', 'cus_R4S5T6U7V8W9X0', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('7053ca48-cd7d-4f80-ae4f-64aada246268', 'New Rental Request', 'A spare part you listed has been sold.', 'Emily Davis', '74Korey.Howell@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=75', 'https://i.imgur.com/YfJQV5z.png?id=76', '3be7daf8-f74a-455a-922b-25774b859459');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('419e7f54-f041-43eb-b7b5-8c13b87ad48c', 'Service Reminder', 'Your payment has been successfully processed.', 'John Doe', '81Liam_Ullrich52@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=82', 'https://i.imgur.com/YfJQV5z.png?id=83', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('47fc5b0e-2d89-4982-8131-52a56bfe7c0b', 'Spare Part Sale', 'You have a new rental request for your car.', 'Jane Smith', '88Brooklyn.Schmidt-Kertzmann35@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('e094a87e-b63e-46ec-a4ae-de72b2b31863', 'Car Listing Approved', 'Your car listing has been approved and is now live.', 'Jane Smith', '95Howell.Orn63@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=96', 'https://i.imgur.com/YfJQV5z.png?id=97', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('d68a8a91-babf-4f00-9829-8cb56068be97', 'Car Listing Approved', 'Your car listing has been approved and is now live.', 'John Doe', '102Sibyl34@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=103', 'https://i.imgur.com/YfJQV5z.png?id=104', '4a4b8ac6-ab7a-4858-b790-fb995d962b42');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('7ba89d85-065e-48bc-98d9-9b798ef6d749', 'Spare Part Sale', 'Its time for your cars scheduled maintenance.', 'Emily Davis', '109Yasmeen.Franecki63@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=110', 'https://i.imgur.com/YfJQV5z.png?id=111', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('985c70bf-af54-44a0-a25f-fb59a4773328', 'New Rental Request', 'Your car listing has been approved and is now live.', 'Mike Johnson', '116Loy.Friesen24@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=117', 'https://i.imgur.com/YfJQV5z.png?id=118', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('ff5053de-30e5-4d54-b53a-60b4fde69de0', 'Spare Part Sale', 'Your car listing has been approved and is now live.', 'Emily Davis', '123Delta_DAmore4@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=124', 'https://i.imgur.com/YfJQV5z.png?id=125', '55f53041-4f18-49fe-8831-4b7d36f4008f');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('7052023f-b76f-4525-aeb8-796340428a2d', 'New Rental Request', 'Your car listing has been approved and is now live.', 'Chris Brown', '130Megane_Funk@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=131', 'https://i.imgur.com/YfJQV5z.png?id=132', 'a957ee16-5d92-4e32-86e1-d9f981a018c9');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId") VALUES ('be0e4973-225d-4b87-aab3-d8c0eb07f167', 'Spare Part Sale', 'Your payment has been successfully processed.', 'John Doe', '137Maybelle_Bergnaum@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=138', 'https://i.imgur.com/YfJQV5z.png?id=139', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d');

INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('79aece06-5667-49be-bdc1-525a8c7e1418', 'Chevrolet', 'Mustang', 997, 155, '3be7daf8-f74a-455a-922b-25774b859459');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('3fd449d8-313c-488c-9b26-f456904955e4', 'Chevrolet', 'Camry', 890, 755, 'a957ee16-5d92-4e32-86e1-d9f981a018c9');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('132a5eef-16a2-4639-82a8-9070772427b6', 'Toyota', 'Camry', 846, 273, '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('ef31d031-900b-4dff-9c0d-111c76ee49cd', 'BMW', 'Malibu', 770, 707, '4a4b8ac6-ab7a-4858-b790-fb995d962b42');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('e7eb094c-5b37-4ce1-a42b-9a9e07cd9e9e', 'Honda', 'Mustang', 163, 15, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('741c5c34-8fc8-4865-9500-6353c209fc52', 'Toyota', 'Mustang', 124, 268, '34c183de-d2fe-4f58-82ab-7151989a8b93');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('b92ab433-0804-4104-b4dd-7520476c3811', 'Ford', 'Civic', 893, 617, '3be7daf8-f74a-455a-922b-25774b859459');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('01ef53d8-0f69-4855-860b-16a516e1485d', 'BMW', 'X5', 646, 968, 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('1c7e4763-7d84-4d36-8564-6152f4f0eaea', 'Chevrolet', 'Camry', 499, 823, '4ac32f71-7720-4142-be8a-e98a686d9907');
INSERT INTO "car" ("id", "make", "model", "year", "pricePerDay", "ownerId") VALUES ('486eec74-ff6b-47f5-963f-08878432b518', 'BMW', 'Mustang', 985, 829, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('d24b7fb0-5c58-4033-825b-cdb10783648f', 'Brake Pad', 'Premium oil filter for cleaner engine oil', 436, 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('2932a3f1-3476-442c-8806-fc6a99a7a566', 'Headlight Bulb', 'Bright headlight bulb for better night visibility', 372, '4ac32f71-7720-4142-be8a-e98a686d9907');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('c4b73e32-7b62-4ce7-8160-0fa53a0dfc58', 'Headlight Bulb', 'Premium oil filter for cleaner engine oil', 775, '3be7daf8-f74a-455a-922b-25774b859459');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('fef4a46f-6f88-4259-b8d0-b9e174bab066', 'Spark Plug', 'Reliable spark plug for efficient ignition', 410, 'a957ee16-5d92-4e32-86e1-d9f981a018c9');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('11f7bb06-48a3-488d-8738-2ddc58480291', 'Oil Filter', 'Premium oil filter for cleaner engine oil', 243, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('1379f9db-5140-48a6-a136-2fc7c4b9ee69', 'Spark Plug', 'Reliable spark plug for efficient ignition', 354, 'cccdbdf7-a5b7-4394-86fc-14402b17583a');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('b0ef0aa6-d7f4-43ef-be7e-969d5834ee92', 'Air Filter', 'Reliable spark plug for efficient ignition', 655, '55f53041-4f18-49fe-8831-4b7d36f4008f');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('b1f0d3c5-77ea-45cb-8051-494a083c0f2f', 'Headlight Bulb', 'Highquality brake pad for smooth stopping', 678, '4ac32f71-7720-4142-be8a-e98a686d9907');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('45e9a7c4-6973-4dcf-aae5-0dcf4e54ea39', 'Oil Filter', 'Reliable spark plug for efficient ignition', 948, 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "spare_part" ("id", "name", "description", "price", "ownerId") VALUES ('2e5f72e1-7a8a-45e2-bc6a-18d85b817ba4', 'Brake Pad', 'Highquality brake pad for smooth stopping', 509, '4a4b8ac6-ab7a-4858-b790-fb995d962b42');

INSERT INTO "cart" ("id", "userId") VALUES ('27b1ebae-40cf-418a-b6c2-36026b0e0cf6', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d');
INSERT INTO "cart" ("id", "userId") VALUES ('58633974-1f3b-4dd9-b585-1d9a275b145a', 'a957ee16-5d92-4e32-86e1-d9f981a018c9');
INSERT INTO "cart" ("id", "userId") VALUES ('ac5720f1-a8b0-436e-9428-f2bad8bbfd7c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "cart" ("id", "userId") VALUES ('a2f40cf6-1726-4edf-905d-8693596e7de5', '4a4b8ac6-ab7a-4858-b790-fb995d962b42');
INSERT INTO "cart" ("id", "userId") VALUES ('58fb8f41-263e-4c61-8eae-9ec1aa8d167e', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "cart" ("id", "userId") VALUES ('04fd6359-d6c5-4f55-b1b4-8dbf241c6606', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "cart" ("id", "userId") VALUES ('45c4e44c-ac29-4b5c-969a-cf2d3a34eb74', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b');
INSERT INTO "cart" ("id", "userId") VALUES ('9c439c59-9e6f-4b97-bc72-32e877ae163d', 'a957ee16-5d92-4e32-86e1-d9f981a018c9');
INSERT INTO "cart" ("id", "userId") VALUES ('2e32f283-111f-4da4-ad20-042ea91204ff', '3be7daf8-f74a-455a-922b-25774b859459');
INSERT INTO "cart" ("id", "userId") VALUES ('342f339e-bd26-4f16-9a64-d88c9c898235', '4a4b8ac6-ab7a-4858-b790-fb995d962b42');

INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('a2ed0d93-624d-4770-a4ad-ef742f8b41a2', '342f339e-bd26-4f16-9a64-d88c9c898235', 'e7eb094c-5b37-4ce1-a42b-9a9e07cd9e9e', 'b0ef0aa6-d7f4-43ef-be7e-969d5834ee92');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('1aa0ff42-4d6b-408e-a044-a52010deee34', '04fd6359-d6c5-4f55-b1b4-8dbf241c6606', '79aece06-5667-49be-bdc1-525a8c7e1418', '11f7bb06-48a3-488d-8738-2ddc58480291');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('f22e4eae-3edf-47b5-866e-97b601c17ec4', '58633974-1f3b-4dd9-b585-1d9a275b145a', '01ef53d8-0f69-4855-860b-16a516e1485d', 'fef4a46f-6f88-4259-b8d0-b9e174bab066');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('f39e1b93-8f1d-413a-8b6e-3d612c7dbd24', '58633974-1f3b-4dd9-b585-1d9a275b145a', 'b92ab433-0804-4104-b4dd-7520476c3811', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('a1b5f9d7-fb5a-4ff0-96bc-9cea1cfbe124', '342f339e-bd26-4f16-9a64-d88c9c898235', '132a5eef-16a2-4639-82a8-9070772427b6', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('13b2a164-5332-4927-bf97-61deaa35dc8d', '342f339e-bd26-4f16-9a64-d88c9c898235', '741c5c34-8fc8-4865-9500-6353c209fc52', 'fef4a46f-6f88-4259-b8d0-b9e174bab066');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('60e2e37a-f236-473c-b2a4-876162ab091d', '04fd6359-d6c5-4f55-b1b4-8dbf241c6606', 'b92ab433-0804-4104-b4dd-7520476c3811', '1379f9db-5140-48a6-a136-2fc7c4b9ee69');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('64ced733-a306-4284-a0f4-3a83fe24df07', '58fb8f41-263e-4c61-8eae-9ec1aa8d167e', '1c7e4763-7d84-4d36-8564-6152f4f0eaea', '2e5f72e1-7a8a-45e2-bc6a-18d85b817ba4');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('b41533c7-ae2b-4367-8173-8608c6966c4b', 'a2f40cf6-1726-4edf-905d-8693596e7de5', '486eec74-ff6b-47f5-963f-08878432b518', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "cart_item" ("id", "cartId", "carId", "sparePartId") VALUES ('c40533db-072c-4c58-ae73-8a02bea17413', '2e32f283-111f-4da4-ad20-042ea91204ff', '1c7e4763-7d84-4d36-8564-6152f4f0eaea', '1379f9db-5140-48a6-a136-2fc7c4b9ee69');

INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('975fd56a-d795-455a-b155-ad3dbb804902', '2024-04-12T14:36:04.401Z', '2025-01-16T11:31:36.768Z', '3be7daf8-f74a-455a-922b-25774b859459', 'e7eb094c-5b37-4ce1-a42b-9a9e07cd9e9e');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('4552379f-a201-4aef-903b-b8a98fe945d1', '2023-08-07T06:36:22.997Z', '2025-05-08T16:02:46.876Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '01ef53d8-0f69-4855-860b-16a516e1485d');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('175dca04-4f18-436d-8265-0288c552579b', '2023-07-01T18:57:32.506Z', '2024-12-25T05:40:45.120Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ef31d031-900b-4dff-9c0d-111c76ee49cd');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('fcc3cf60-00a1-43e0-9993-6f134e05673d', '2023-07-31T05:53:35.175Z', '2025-04-08T22:48:15.617Z', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b', '741c5c34-8fc8-4865-9500-6353c209fc52');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('b0c0d23b-4eac-4001-84ed-25674999fd98', '2025-03-09T01:36:38.935Z', '2023-10-01T19:25:28.536Z', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d', '486eec74-ff6b-47f5-963f-08878432b518');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('6cf6f159-357e-478b-a28f-8c44dc47ef32', '2025-01-24T18:49:13.999Z', '2024-08-01T21:12:36.491Z', '55f53041-4f18-49fe-8831-4b7d36f4008f', '741c5c34-8fc8-4865-9500-6353c209fc52');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('a1c7fcf5-dab9-4efa-8797-59bc0e060edb', '2023-08-29T09:52:35.824Z', '2023-11-18T22:54:11.786Z', '4a4b8ac6-ab7a-4858-b790-fb995d962b42', '1c7e4763-7d84-4d36-8564-6152f4f0eaea');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('f7c0a069-388d-4a3e-8bf0-2483d8b063e8', '2024-04-02T20:38:38.039Z', '2025-02-10T00:07:54.851Z', 'cccdbdf7-a5b7-4394-86fc-14402b17583a', '79aece06-5667-49be-bdc1-525a8c7e1418');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('6c6a9fd7-e138-403c-acff-a431cabada83', '2024-12-09T22:07:59.395Z', '2024-10-17T11:47:35.746Z', '3be7daf8-f74a-455a-922b-25774b859459', '79aece06-5667-49be-bdc1-525a8c7e1418');
INSERT INTO "rental_history" ("id", "rentalDate", "returnDate", "userId", "carId") VALUES ('4ec8045d-b9de-4580-8485-43359be6f7f0', '2025-04-19T04:15:37.043Z', '2025-03-03T07:47:59.471Z', '55f53041-4f18-49fe-8831-4b7d36f4008f', '79aece06-5667-49be-bdc1-525a8c7e1418');

INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('f1b992b8-42e7-4246-93d4-1e2a1a392e14', '2025-02-04T14:01:44.326Z', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d', '45e9a7c4-6973-4dcf-aae5-0dcf4e54ea39');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('e6f56bcf-5742-4844-91e1-69c3444be776', '2024-11-06T09:42:56.644Z', 'cccdbdf7-a5b7-4394-86fc-14402b17583a', '1379f9db-5140-48a6-a136-2fc7c4b9ee69');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('ca4ba6cd-2fde-463d-8de0-7c416c4a2f28', '2023-11-10T00:45:39.946Z', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b', 'fef4a46f-6f88-4259-b8d0-b9e174bab066');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('aeb712f8-f99e-486a-a7bd-211f095ef68c', '2023-11-21T01:56:17.664Z', '3be7daf8-f74a-455a-922b-25774b859459', '1379f9db-5140-48a6-a136-2fc7c4b9ee69');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('a85a2fb8-fbbc-43ad-8387-2c1cbcc77b34', '2024-08-15T06:43:33.278Z', 'a957ee16-5d92-4e32-86e1-d9f981a018c9', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('d220d8f7-e897-4cd1-8403-4a009a0df6f4', '2023-11-20T19:04:35.646Z', '4ac32f71-7720-4142-be8a-e98a686d9907', 'c4b73e32-7b62-4ce7-8160-0fa53a0dfc58');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('c8db99b8-5b14-4274-bb86-99a19ad288dc', '2024-10-03T16:22:19.644Z', '4a4b8ac6-ab7a-4858-b790-fb995d962b42', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('233babf4-34e3-4d3d-a4ed-3f1c058b31a0', '2024-02-09T20:43:53.178Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '1379f9db-5140-48a6-a136-2fc7c4b9ee69');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('6f2bb647-5cbd-4d20-a92a-790abdf228e0', '2024-04-30T21:31:45.960Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '45e9a7c4-6973-4dcf-aae5-0dcf4e54ea39');
INSERT INTO "purchase_history" ("id", "purchaseDate", "userId", "sparePartId") VALUES ('d87341b5-63d3-464a-a0cd-82f2101bfe1f', '2024-12-31T05:23:39.895Z', 'a957ee16-5d92-4e32-86e1-d9f981a018c9', '11f7bb06-48a3-488d-8738-2ddc58480291');

INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('5be77707-eaa3-43d2-83c2-e655b151df09', '77c3d06f-8e7a-4eb3-8f3e-e775322d3b0d', 'b92ab433-0804-4104-b4dd-7520476c3811');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('1f99d1cc-b5e2-4a84-b6b4-9c8dd579b6a7', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '1c7e4763-7d84-4d36-8564-6152f4f0eaea');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('063bf3d2-3e1c-4122-8ef9-682319f113a6', 'cccdbdf7-a5b7-4394-86fc-14402b17583a', '741c5c34-8fc8-4865-9500-6353c209fc52');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('7a12fad5-284a-4fc7-b400-8997dd4a506b', 'd57d3188-5db8-45eb-ad4f-c873525d8b1b', '01ef53d8-0f69-4855-860b-16a516e1485d');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('5da1c395-1898-4351-bc97-67ba98e686cd', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '486eec74-ff6b-47f5-963f-08878432b518');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('f095e85d-ac0c-436b-aea9-d7d264f4da2e', '4a4b8ac6-ab7a-4858-b790-fb995d962b42', '3fd449d8-313c-488c-9b26-f456904955e4');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('ef1777b6-2a4e-4ba9-a3d4-9f343f2d8634', '34c183de-d2fe-4f58-82ab-7151989a8b93', '3fd449d8-313c-488c-9b26-f456904955e4');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('5efdf36d-01bd-466c-9de4-d91308e50afa', 'a957ee16-5d92-4e32-86e1-d9f981a018c9', '3fd449d8-313c-488c-9b26-f456904955e4');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('c8ccba1f-ec60-420f-9bbe-d32ee9c9eb9e', '34c183de-d2fe-4f58-82ab-7151989a8b93', '79aece06-5667-49be-bdc1-525a8c7e1418');
INSERT INTO "listed_car" ("id", "userId", "carId") VALUES ('974e810c-aae3-4a35-bb37-04935d1bdc5e', '4ac32f71-7720-4142-be8a-e98a686d9907', 'e7eb094c-5b37-4ce1-a42b-9a9e07cd9e9e');

INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('53a3bb06-1e8c-4455-8150-19210491bf81', 'cccdbdf7-a5b7-4394-86fc-14402b17583a', 'c4b73e32-7b62-4ce7-8160-0fa53a0dfc58');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('f342da72-1fa5-4aaf-b17f-25431c3c4d09', '4a4b8ac6-ab7a-4858-b790-fb995d962b42', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('ba2b5795-a190-4075-a886-120c3b5abd62', '4a4b8ac6-ab7a-4858-b790-fb995d962b42', 'b1f0d3c5-77ea-45cb-8051-494a083c0f2f');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('5d42121a-5f82-4f6c-bbd2-024e36164b9f', '4ac32f71-7720-4142-be8a-e98a686d9907', 'b1f0d3c5-77ea-45cb-8051-494a083c0f2f');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('9303f70d-d9e5-4938-bbd0-2566546a477b', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('7a8e40b8-82de-4ef3-af5a-c432d89a3743', '55f53041-4f18-49fe-8831-4b7d36f4008f', '45e9a7c4-6973-4dcf-aae5-0dcf4e54ea39');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('cb42d43b-ffe1-4056-bc1a-d5223f946915', '55f53041-4f18-49fe-8831-4b7d36f4008f', '2932a3f1-3476-442c-8806-fc6a99a7a566');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('9fdddd29-ac7d-4abf-8853-3f81fdcf9473', '34c183de-d2fe-4f58-82ab-7151989a8b93', '2e5f72e1-7a8a-45e2-bc6a-18d85b817ba4');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('75ccafc6-94f3-49c9-a43f-fb9dad9b3701', '4a4b8ac6-ab7a-4858-b790-fb995d962b42', 'd24b7fb0-5c58-4033-825b-cdb10783648f');
INSERT INTO "listed_spare_part" ("id", "userId", "sparePartId") VALUES ('4f331b8d-d57e-43f4-a393-3b5d4ed90fd4', '55f53041-4f18-49fe-8831-4b7d36f4008f', '2e5f72e1-7a8a-45e2-bc6a-18d85b817ba4');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
