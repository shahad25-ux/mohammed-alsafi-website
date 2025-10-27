CREATE TABLE `analytics` (
	`id` text PRIMARY KEY NOT NULL,
	`page` text NOT NULL,
	`userAgent` text,
	`referrer` text,
	`timestamp` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text,
	`coverImage` text,
	`authorId` text NOT NULL,
	`isPublished` integer DEFAULT 0 NOT NULL,
	`publishedAt` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`clientName` text NOT NULL,
	`clientPhone` text NOT NULL,
	`clientEmail` text,
	`sessionType` text NOT NULL,
	`sessionDate` integer,
	`notes` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`price` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `books` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`description` text NOT NULL,
	`price` integer NOT NULL,
	`coverImage` text,
	`badge` text,
	`whatsappMessage` text,
	`isActive` integer DEFAULT 1 NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pageContent` (
	`id` text PRIMARY KEY NOT NULL,
	`pageName` text NOT NULL,
	`sectionName` text NOT NULL,
	`content` text NOT NULL,
	`updatedAt` integer NOT NULL,
	`updatedBy` text
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`duration` integer NOT NULL,
	`price` integer NOT NULL,
	`features` text,
	`type` text NOT NULL,
	`isActive` integer DEFAULT 1 NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `siteSettings` (
	`id` text PRIMARY KEY NOT NULL,
	`settingKey` text NOT NULL,
	`settingValue` text NOT NULL,
	`settingType` text NOT NULL,
	`category` text,
	`updatedAt` integer NOT NULL,
	`updatedBy` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `siteSettings_settingKey_unique` ON `siteSettings` (`settingKey`);--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` text PRIMARY KEY NOT NULL,
	`clientName` text NOT NULL,
	`clientRole` text,
	`content` text NOT NULL,
	`rating` integer DEFAULT 5 NOT NULL,
	`isActive` integer DEFAULT 1 NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`loginMethod` text,
	`role` text DEFAULT 'user' NOT NULL,
	`createdAt` integer NOT NULL,
	`lastSignedIn` integer NOT NULL
);
