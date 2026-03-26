CREATE TABLE `workout_exercise_set_target` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_exercise_id` integer NOT NULL,
	`set_number` integer NOT NULL,
	`target_set` integer,
	`target_weight` float,
	`set_type` text NOT NULL,
	FOREIGN KEY (`workout_exercise_id`) REFERENCES `workout_exercise`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_exercise`("id", "name", "description") SELECT "id", "name", "description" FROM `exercise`;--> statement-breakpoint
DROP TABLE `exercise`;--> statement-breakpoint
ALTER TABLE `__new_exercise` RENAME TO `exercise`;--> statement-breakpoint
PRAGMA foreign_keys=ON;