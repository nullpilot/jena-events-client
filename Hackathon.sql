CREATE TABLE `Event` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `GoogleID` varchar(255),
  `InternalInfos` varchar(255),
  `CreatorID` int,
  `ParentEvent` int
);

CREATE TABLE `Organizer` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `HeadquarterID` int,
  `URL` varchar(255)
);

CREATE TABLE `Location` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `Lat` double,
  `Long` double,
  `Image` text,
  `Area` int,
  `MaxGuests` int
);

CREATE TABLE `User` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Name` varchar(255),
  `Password` varchar(255),
  `OrganizerID` int,
  `active` bit
);

CREATE TABLE `SupportSearch` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `EventID` int,
  `Type` varchar(255),
  `Description` text,
  `Closed` bit
);

CREATE TABLE `AdditionalFiles` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `EventID` int,
  `File` text,
  `UploaderID` int,
  `Uploaded` datetime
);

CREATE TABLE `SupportComment` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Title` varchar(255),
  `SupportID` int,
  `UserID` int,
  `Posted` datetime
);

CREATE TABLE `Event2Location` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `EventID` int,
  `LocationID` int
);

CREATE TABLE `EventComment` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `UserIDn` int,
  `EventID` int,
  `Description` varchar(255),
  `Posted` datetime
);

CREATE TABLE `Event2Organizer` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `EventID` int,
  `OrganizerID` int
);

CREATE TABLE `Messages` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `Message` text,
  `SenderID` int,
  `RecipientID` int
);

CREATE TABLE `Location2Organizer` (
  `ID` int PRIMARY KEY AUTO_INCREMENT,
  `LocationID` int,
  `OrganizerID` int
);

ALTER TABLE `Event` ADD FOREIGN KEY (`CreatorID`) REFERENCES `Organizer` (`ID`);

ALTER TABLE `Event` ADD FOREIGN KEY (`ParentEvent`) REFERENCES `Event` (`ID`);

ALTER TABLE `Organizer` ADD FOREIGN KEY (`HeadquarterID`) REFERENCES `Location` (`ID`);

ALTER TABLE `User` ADD FOREIGN KEY (`OrganizerID`) REFERENCES `Organizer` (`ID`);

ALTER TABLE `SupportSearch` ADD FOREIGN KEY (`EventID`) REFERENCES `Event` (`ID`);

ALTER TABLE `AdditionalFiles` ADD FOREIGN KEY (`EventID`) REFERENCES `Event` (`ID`);

ALTER TABLE `AdditionalFiles` ADD FOREIGN KEY (`UploaderID`) REFERENCES `User` (`ID`);

ALTER TABLE `SupportComment` ADD FOREIGN KEY (`SupportID`) REFERENCES `SupportSearch` (`ID`);

ALTER TABLE `SupportComment` ADD FOREIGN KEY (`UserID`) REFERENCES `User` (`ID`);

ALTER TABLE `Event2Location` ADD FOREIGN KEY (`EventID`) REFERENCES `Event` (`ID`);

ALTER TABLE `Event2Location` ADD FOREIGN KEY (`LocationID`) REFERENCES `Location` (`ID`);

ALTER TABLE `EventComment` ADD FOREIGN KEY (`UserIDn`) REFERENCES `User` (`ID`);

ALTER TABLE `EventComment` ADD FOREIGN KEY (`EventID`) REFERENCES `Event` (`ID`);

ALTER TABLE `Event2Organizer` ADD FOREIGN KEY (`EventID`) REFERENCES `Event` (`ID`);

ALTER TABLE `Event2Organizer` ADD FOREIGN KEY (`OrganizerID`) REFERENCES `Organizer` (`ID`);

ALTER TABLE `Messages` ADD FOREIGN KEY (`SenderID`) REFERENCES `User` (`ID`);

ALTER TABLE `Messages` ADD FOREIGN KEY (`RecipientID`) REFERENCES `User` (`ID`);

ALTER TABLE `Location2Organizer` ADD FOREIGN KEY (`LocationID`) REFERENCES `Location` (`ID`);

ALTER TABLE `Location2Organizer` ADD FOREIGN KEY (`OrganizerID`) REFERENCES `Organizer` (`ID`);
