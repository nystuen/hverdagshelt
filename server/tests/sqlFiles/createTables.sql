CREATE TABLE category(
  categoryId int not null AUTO_INCREMENT,
  name varchar(30) not null,
  priority int not null,
  active boolean not null,
  CONSTRAINT category_pk primary key(categoryId)
);


CREATE TABLE types(
  typeName varchar(30) not null,
  active boolean not null,
  CONSTRAINT type_pk primary key(typeName)
);


CREATE TABLE county(
  countyId int not null AUTO_INCREMENT,
  name varchar(30) not null,
  active tinyint(1) not null,
  CONSTRAINT county_pk primary key(countyId)
);

CREATE TABLE status(
  statusName varchar(30) not null,
  CONSTRAINT status_pk primary key(statusName)
);

CREATE TABLE company(
  typeName varchar(30) not null,
  companyMail varchar(30) not null,
  companyName varchar(30),
  description text,
  CONSTRAINT company_pk primary key(typeName,companyMail)
);

CREATE TABLE companyCategories(
  companyMail varchar(30) not null,
  categoryId int not null,
  CONSTRAINT CC_pk primary key(companyMail,categoryId)
);


CREATE TABLE user(
  mail varchar(30) not null,
  firstName varchar(30) not null,
  lastName varchar(30) not null,
  password varchar(30) not null,
  typeName varchar(30) not null,
  phone varchar(30) not null,
  points int,
  countyId int not null,
  active boolean not null,
  CONSTRAINT user_pk primary key(mail)
);

CREATE TABLE issues(
  issueId int not null AUTO_INCREMENT,
  userMail varchar(30) not null,
  latitude double not null,
  longitude double not null,
  text text,
  pic varchar(30),
  date varchar(30),
  statusName varchar(30) not null,
  categoryId int not null,
  countyId int not null,
  active boolean not null,
  CONSTRAINT issues_pk primary key(issueId)
);

CREATE TABLE companyIssues(
  issueId int not null,
  typeName varchar(30) not null,
  companyMail varchar(30) not null,
  CONSTRAINT CI_pk primary key(issueId,typeName,companyMail)
);


CREATE TABLE event(
  eventId int not null AUTO_INCREMENT,
  title varchar(30) not null,
  text text,
  date varchar(30),
  userMail varchar(30) not null,
  countyId int not null,
  active boolean not null,
  CONSTRAINT event_pk primary key(eventId)
);

CREATE TABLE pushAlerts(
  countyId int not null,
  categoryId int not null,
  userMail varchar(30) not null,
  CONSTRAINT PA_pk primary key(countyId,categoryId,userMail)
);

CREATE TABLE companyComment(
  commentId int not null AUTO_INCREMENT,
  issueId int not null,
  text text,
  CONSTRAINT companyComment_fk primary key(commentId)
);

CREATE TABLE userCounties(
  userMail varchar(30) not null,
  countyId int not null,
  CONSTRAINT UC_pk primary key(userMail,countyId)
);

ALTER TABLE user
ADD CONSTRAINT type_fk foreign key(typeName) REFERENCES types(typeName);

ALTER TABLE user
ADD CONSTRAINT county_fk foreign key(countyId) REFERENCES county(countyId);

ALTER TABLE company
ADD CONSTRAINT type1_fk foreign key (typeName) REFERENCES types(typeName);

ALTER TABLE companyIssues
ADD CONSTRAINT type2_fk foreign key(typeName) REFERENCES types(typeName);

ALTER TABLE companyIssues
ADD CONSTRAINT issue_fk foreign key(issueId) REFERENCES issues(issueId);

ALTER TABLE companyCategories
ADD CONSTRAINT company_fk foreign key(companyMail) REFERENCES company(companyMail);

ALTER TABLE companyCategories
ADD CONSTRAINT category_fk foreign key(categoryId) REFERENCES category(categoryId);

ALTER TABLE issues
ADD CONSTRAINT user_fk foreign key(userMail) REFERENCES user(mail);

ALTER TABLE issues
ADD CONSTRAINT status_fk foreign key(statusName) REFERENCES status(statusName);

ALTER TABLE issues
ADD CONSTRAINT category1_fk foreign key(categoryId) REFERENCES category(categoryId);

ALTER TABLE issues
ADD CONSTRAINT county1_fk foreign key(countyId) REFERENCES county(countyId);

ALTER TABLE userCounties
ADD CONSTRAINT user1_fk foreign key(userMail) REFERENCES user(mail);

ALTER TABLE userCounties
ADD CONSTRAINT county2_fk foreign key(countyId) REFERENCES county(countyId);

ALTER TABLE event
ADD CONSTRAINT user2_fk foreign key(userMail) REFERENCES user(mail);

ALTER TABLE event
ADD CONSTRAINT county3_fk foreign key(countyId) REFERENCES county(countyId);

ALTER TABLE pushAlerts
ADD CONSTRAINT county3_fk foreign key(countyId) REFERENCES county(countyId);

ALTER TABLE pushAlerts
ADD CONSTRAINT category2_fk foreign key(categoryId) REFERENCES category(categoryId);

ALTER TABLE pushAlerts
ADD CONSTRAINT user3_fk foreign(userMail) REFERENCES user(mail);

ALTER TABLE company
 ADD COLUMN orgNumber varchar(30) after description;

ALTER TABLE event
ADD COLUMN longitude double after text;

ALTER TABLE event
  ADD COLUMN latitude double after text;


