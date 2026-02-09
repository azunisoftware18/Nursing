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
	`code` varchar(100) NOT NULL,
	`description` text,
	`sector` enum('Private','Government','Semi-Govt') DEFAULT 'Private',
	`gender_acceptance` enum('Co-ed','Boys','Girls') DEFAULT 'Co-ed',
	`established_year` int,
	`state` varchar(100),
	`district` varchar(100),
	`city` varchar(100),
	`address` text,
	`google_map_link` text,
	`affiliation` text,
	`approved_by` text,
	`courses_count` int,
	`experience_years` int,
	`students_count` int,
	`facilities` json DEFAULT ('[]'),
	`gallery` json DEFAULT ('[]'),
	`thumbnail` varchar(255),
	`youtube_video` text,
	`course_ids` json DEFAULT (JSON_ARRAY()),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `colleges_id` PRIMARY KEY(`id`),
	CONSTRAINT `colleges_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
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
	`name` varchar(150),
	`email` varchar(150),
	`phone` varchar(20) NOT NULL,
	`state` varchar(100),
	`city` varchar(100),
	`course` varchar(150),
	`college` varchar(150),
	`message` varchar(500),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`action` varchar(100) NOT NULL,
	`module` varchar(100) NOT NULL,
	`description` text,
	`user_agent` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `role_index` ON `users` (`role`);--> statement-breakpoint
CREATE INDEX `college_name_idx` ON `colleges` (`name`);--> statement-breakpoint
CREATE INDEX `college_city_idx` ON `colleges` (`city`);--> statement-breakpoint
CREATE INDEX `college_code_idx` ON `colleges` (`code`);