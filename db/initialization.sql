CREATE TABLE IF NOT EXISTS `users` (
  `user_id` VARCHAR(36) NOT NULL,
  `nickname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `lastactive_date` TIMESTAMP NULL,
  `registration_date` TIMESTAMP NULL,
  PRIMARY KEY (`user_id`));

---

CREATE TABLE IF NOT EXISTS `games` (
  `game_id` VARCHAR(36) NOT NULL,
  `game_type` VARCHAR(45) NULL,
  `fen_string` VARCHAR(45) NULL,
-- Make foreign KEYS!!!!
  `player1` VARCHAR(36) NULL,
  `player2` VARCHAR(36) NULL,
  `game_time` TIMESTAMP NULL,
  PRIMARY KEY (`game_id`));
