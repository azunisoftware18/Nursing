CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`username` varchar(100) NOT NULL,
	`first_name` varchar(100) NOT NULL,
	`last_name` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` varchar(20) NOT NULL DEFAULT 'admin',
	`is_active` boolean DEFAULT true,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_unique` UNIQUE(`email`),
	CONSTRAINT `username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `colleges` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`name` varchar(255) NOT NULL,
	`code` varchar(255) NOT NULL,
	`description` text,
	`sector` varchar(100),
	`established_year` int,
	`gender_acceptance` varchar(50),
	`state` varchar(100),
	`district` varchar(100),
	`city` varchar(100),
	`address` text,
	`google_map_link` text,
	`affiliation` text,
	`approved_by` text,
	`courses_count` int,
	`experience_years` int,
	`facilities` json,
	`thumbnail` varchar(255),
	`gallery` json,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `colleges_id` PRIMARY KEY(`id`),
	CONSTRAINT `colleges_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`college_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`code` varchar(100) NOT NULL,
	`duration` varchar(50) NOT NULL,
	`eligibility` varchar(255),
	`is_active` boolean DEFAULT true,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `course_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `blogs` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`title` varchar(255) NOT NULL,
	`code` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`image` varchar(255),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `blogs_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `leads` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`name` varchar(150) NOT NULL,
	`email` varchar(150),
	`phone` varchar(20) NOT NULL,
	`state` varchar(100) NOT NULL,
	`city` varchar(100) NOT NULL,
	`course` varchar(150),
	`college` varchar(150),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `role_index` ON `users` (`role`);