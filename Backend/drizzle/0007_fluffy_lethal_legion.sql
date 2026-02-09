CREATE TABLE `audit_logs` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`action` varchar(100) NOT NULL,
	`module` varchar(100) NOT NULL,
	`description` text,
	`user_agent` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
