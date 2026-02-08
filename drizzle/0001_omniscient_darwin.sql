CREATE TABLE `workout_exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_template_id` integer NOT NULL,
	`exercise_id` integer NOT NULL,
	`position` integer NOT NULL,
	`notes` text,
	FOREIGN KEY (`workout_template_id`) REFERENCES `workout_template`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout_template` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text
);
