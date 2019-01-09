Insert into magnusrm.category(categoryId, name, priority, active) values (1,'Strøm',1,1);
Insert into magnusrm.category(categoryId, name, priority, active) values (2,'Vann og avløp',2,1);

Insert into magnusrm.types(typeName, active) values('Company', 1);
Insert into magnusrm.types(typeName, active) values('Admin', 1);
Insert into magnusrm.types(typeName, active) values('Employee', 1);

Insert into magnusrm.county(name, active) values ('Oslo', 1);
Insert into magnusrm.county(name, active) values('Trondheim', 1);
Insert into magnusrm.county(name, active) values('Kristiansand', 1);


Insert into magnusrm.status(statusName) values('Registered');
Insert into magnusrm.status(statusName) values('In progress');
Insert into magnusrm.status(statusName) values('Completed');

Insert into magnusrm.company(typeName, companyMail, companyName, description, orgNumber) values ('Company','Company1','company1@company.com','this is a company',1234);
Insert into magnusrm.company(typeName, companyMail, companyName, description, orgNumber) values ('Company','Company2','company2@company.com','a description',3456);


Insert into magnusrm.companyCategories(companyMail, categoryId) values ('company1@company.com',1);
Insert into magnusrm.companyCategories(companyMail, categoryId) values ('company2@company.com',2);

Insert into magnusrm.user(mail, firstName, lastName, password, typeName, phone, points, countyId, active) values ('ola@usermail.com', 'Ola', 'Nordman','password1' , 'Admin', 97723342, 0, 1,1);
Insert into magnusrm.user(mail, firstName, lastName, password, typeName, phone, points, countyId, active) values ('kari@usermail.com', 'Kari', 'Olsen', 'password2' , 'Admin', 97766641, 0, 2,1);

Insert into magnusrm.issues(issueId, userMail, latitude, longitude, text, pic, date, statusName, categoryId, countyId, active) values (1, 'ola@usermail.com', 23.432, 43.12, 'en tekst', 'picture', '2001-01-01', 'In progress', 1, 1, 1);
Insert into magnusrm.issues(issueId, userMail, latitude, longitude, text, pic, date, statusName, categoryId, countyId, active) values (2, 'kari@usermail.com', 73.432, 54.12, 'this is a text', 'picture2', '2019-01-01', 'Registered', 1, 1, 1);


Insert into magnusrm.companyIssues(issueId, typeName, companyMail) values (1, 'Company' ,'company1@company.com');
Insert into magnusrm.companyIssues(issueId, typeName, companyMail) values (2, 'Company' ,'company2@company.com');





Insert into magnusrm.event(title, text, latitude, longitude, date, userMail, countyId, active) values ('Veiarbeid i midtbyen', 'Veiarbeid i midtbyen torsdag kveld', 0, 0, '10.01.2019', 'ola@usermail.com', 2, 1);
Insert into magnusrm.event(title, text, latitude, longitude, date, userMail, countyId, active) values ('Konsert', 'Konsert kan skape kø ut av byen mellom 20.00 og 23.00', 0, 0, '13.01.2019', 'kari@usermail.com', 3, 1);




Insert into magnusrm.pushAlerts(countyId, categoryId, userMail) values(1, 1, 'kari@usermail.com');


Insert into magnusrm.userCounties(userMail, countyId) values('ola@usermail.com', 1);
Insert into magnusrm.userCounties(userMail, countyId) values('ola@usermail.com', 2);
Insert into magnusrm.userCounties(userMail, countyId) values('kari@usermail.com', 1);


