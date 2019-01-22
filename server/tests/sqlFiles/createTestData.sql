Insert into aadneny.category(categoryId, name, priority, active) values (1,'Strøm',1,1);
Insert into aadneny.category(categoryId, name, priority, active) values (2,'Vann og avløp',2,1);

Insert into aadneny.category2(category2Id,categoryId, name, active) values (1,1,'Strømbrudd',1);
Insert into aadneny.category2(category2Id,categoryId, name, active) values (2,2,'Vannstopp',1);

Insert into aadneny.category3(category3Id,category2Id, name, active) values (1,2,'Vannmangel',1);

Insert into aadneny.eventCategory(eventCategoryId, name, active) values (1,'Konsert',1);


Insert into aadneny.types(typeName, active) values('Company', 1);
Insert into aadneny.types(typeName, active) values('Admin', 1);
Insert into aadneny.types(typeName, active) values('Employee', 1);
Insert into aadneny.types(typeName, active) values('Private-user', 1);


Insert into aadneny.county(name, active) values ('Oslo', 1);
Insert into aadneny.county(name, active) values('Trondheim', 1);
Insert into aadneny.county(name, active) values('Kristiansand', 1);


Insert into aadneny.status(statusName) values('Registered');
Insert into aadneny.status(statusName) values('In progress');
Insert into aadneny.status(statusName) values('Completed');

Insert into aadneny.company(companyMail, companyName, firstName, lastName,adresse, postnr, password, phone, description, orgNumber) values ('company1@company.com','Company1','Ola','Pettersen','Adresse1', 2020, 'fghj','123456','this is a company',1234);
Insert into aadneny.company(companyMail, companyName, firstName, lastName, adresse, postnr, password, phone, description, orgNumber) values ('company2@company.com','Company2','Ola','Pettersen','Adresse2',4040, 'fghj','123456','a description',3456);

Insert into aadneny.companyCategories(companyMail, categoryId) values ('company1@company.com',1);
Insert into aadneny.companyCategories(companyMail, categoryId) values ('company2@company.com',2);

Insert into aadneny.user(mail, firstName, lastName, password, typeName, phone, points, countyId, active) values ('ola@usermail.com', 'Ola', 'Nordman','password1' , 'Admin', 97723342, 0, 1,1);
Insert into aadneny.user(mail, firstName, lastName, password, typeName, phone, points, countyId, active) values ('kari@usermail.com', 'Kari', 'Olsen', 'password2' , 'Admin', 97766641, 0, 2,1);

Insert into aadneny.issues(issueId, userMail, latitude, longitude,address, text, pic, date, statusName, categoryId, categoryLevel,countyId, active) values (1, 'ola@usermail.com', 23.432, 43.12,'Dette er en adresse', 'en tekst', 'picture', '2001-01-01', 'In progress', 1, 1, 1, 1);
Insert into aadneny.issues(issueId, userMail, latitude, longitude,address, text, pic, date, statusName, categoryId,categoryLevel, countyId, active) values (2, 'kari@usermail.com', 73.432, 54.12,'Dette er en adresse2', 'this is a text', 'picture2', '2019-01-01', 'Registered', 1, 1, 1, 1);

Insert into aadneny.companyIssues(issueId, companyMail) values (1 ,'company1@company.com');
Insert into aadneny.companyIssues(issueId, companyMail) values (2 ,'company2@company.com');

Insert into aadneny.event(eventId,title, text, latitude, longitude, date, userMail, countyId, active,eventCategoryId) values (1,'Veiarbeid i midtbyen', 'Veiarbeid i midtbyen torsdag kveld', 0, 0, '10.01.2019', 'ola@usermail.com', 2, 1,1);
Insert into aadneny.event(eventId,title, text, latitude, longitude, date, userMail, countyId, active,eventCategoryId) values (2,'Konsert', 'Konsert kan skape kø ut av byen mellom 20.00 og 23.00', 0, 0, '13.01.2019', 'kari@usermail.com', 3, 1,1);

Insert into aadneny.pushAlerts(countyId, categoryId, userMail) values(1, 1, 'kari@usermail.com');


Insert into aadneny.userCounties(userMail, countyId) values('ola@usermail.com', 1);
Insert into aadneny.userCounties(userMail, countyId) values('ola@usermail.com', 2);
Insert into aadneny.userCounties(userMail, countyId) values('kari@usermail.com', 1);


