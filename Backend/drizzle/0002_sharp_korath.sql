ALTER TABLE `colleges` MODIFY COLUMN `code` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `colleges` MODIFY COLUMN `sector` enum('Private','Government','Semi-Govt') DEFAULT 'Private';--> statement-breakpoint
ALTER TABLE `colleges` MODIFY COLUMN `gender_acceptance` enum('Co-ed','Boys','Girls') DEFAULT 'Co-ed';--> statement-breakpoint
ALTER TABLE `colleges` MODIFY COLUMN `facilities` json DEFAULT ('[]');--> statement-breakpoint
ALTER TABLE `colleges` MODIFY COLUMN `gallery` json DEFAULT ('[]');--> statement-breakpoint
CREATE INDEX `college_name_idx` ON `colleges` (`name`);--> statement-breakpoint
CREATE INDEX `college_city_idx` ON `colleges` (`city`);--> statement-breakpoint
CREATE INDEX `college_code_idx` ON `colleges` (`code`);