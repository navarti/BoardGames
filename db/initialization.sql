CREATE TABLE IF NOT EXISTS `users` (
  `user_id` VARCHAR(36) NOT NULL,
  `nickname` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `lastactive_date` TIMESTAMP NULL,
  `registration_date` TIMESTAMP NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE('email')
  );

---

CREATE TABLE IF NOT EXISTS `games` (
  `game_id` VARCHAR(36) NOT NULL,
  `game_type` VARCHAR(45) NULL,
  `fen_string` VARCHAR(45) NULL,
  `idWhite` VARCHAR(36) NULL,
  `idBlack` VARCHAR(36) NULL,
  `game_time` TIMESTAMP NULL,
  PRIMARY KEY (`game_id`),
  FOREIGN KEY ('idWhite') REFERENCES 'users'('user_id'),
  FOREIGN KEY ('idBlack') REFERENCES 'users'('user_id')
);
