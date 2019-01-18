Drop table if exists companyComment;
Drop table if exists pushAlerts;
Drop table if exists companyCategories;
drop table if exists companyCounties;
Drop table if exists companyIssues;
Drop table if exists event;
Drop table if exists issues;
Drop table if exists userCounties;
Drop table if exists status;
Drop table if exists eventCategory;
Drop table if exists category3;
Drop table if exists category2;
Drop table if exists category;
Drop table if exists company;
Drop table if exists notifications;
Drop table if exists user;
Drop table if exists types;
Drop table if exists county;



CREATE TABLE county(
  countyId int not null AUTO_INCREMENT,
  name varchar(30) not null,
  active tinyint(1) not null,
  CONSTRAINT county_pk primary key(countyId)
);


CREATE TABLE types(
  typeName varchar(30) not null,
  active boolean not null,
  CONSTRAINT type_pk primary key(typeName)
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
  CONSTRAINT user_pk primary key(mail),
  CONSTRAINT type_fk foreign key(typeName) REFERENCES types(typeName),
  CONSTRAINT county_fk foreign key(countyId) REFERENCES county(countyId)
);

CREATE TABLE notifications(
  userMail varchar(30) not null,
  registered boolean,
  inProgress boolean,
  completed boolean,
  CONSTRAINT noti_pk primary key(userMail),
  CONSTRAINT userMail_fk foreign key(userMail) REFERENCES user(mail)
);



CREATE TABLE company(
  companyMail varchar(30) not null,
  companyName varchar(30),
  firstName varchar(30),
  lastName varchar(30),
  adresse varchar(30),
  postnr int,
  password text,
  phone varchar(30),
  description text,
  orgNumber varchar(30),
  CONSTRAINT company_pk primary key(companyMail, orgNumber)
);

CREATE TABLE category(
  categoryId int not null AUTO_INCREMENT,
  name varchar(30) not null,
  priority int not null,
  active boolean not null,
  CONSTRAINT category_pk primary key(categoryId)
);



CREATE TABLE category2(
  category2Id int not null AUTO_INCREMENT,
  categoryId int not null,
  name varchar(30) not null,
  active boolean not null,
  CONSTRAINT category2_pk primary key(category2Id),
  CONSTRAINT underCat_fk foreign key(categoryId) REFERENCES category(categoryId)
);

CREATE TABLE category3(
  category3Id int not null AUTO_INCREMENT,
  category2Id int not null,
  name varchar(30) not null,
  active boolean not null,
  CONSTRAINT category3_pk primary key(category3Id),
  CONSTRAINT underCat2_fk foreign key(category2Id) REFERENCES category2(category2Id)
);

CREATE TABLE eventCategory(
  eventCategoryId int not null AUTO_INCREMENT,
  name varchar(30) not null,
  active boolean not null,
  CONSTRAINT eventCat_pk primary key(eventCategoryId)
);


CREATE TABLE status(
  statusName varchar(30) not null,
  CONSTRAINT status_pk primary key(statusName)
);



CREATE TABLE companyCategories(
  companyMail varchar(30) not null,
  categoryId int not null,
  CONSTRAINT CC_pk primary key(companyMail,categoryId),
  CONSTRAINT company_fk foreign key(companyMail) REFERENCES company(companyMail),
  CONSTRAINT category_fk foreign key(categoryId) REFERENCES category(categoryId)

);

CREATE TABLE companyCounties(
   companyMail varchar(30) not null,
   countyId int not null,
   CONSTRAINT CCounties_pk primary key(companyMail,countyId),
   CONSTRAINT CCounties1_fk foreign key(companyMail) REFERENCES company(companyMail)

);

CREATE TABLE issues(
  issueId int not null AUTO_INCREMENT,
  userMail varchar(30) not null,
  latitude double not null,
  longitude double not null,
  address varchar(30),
  text text,
  pic varchar(30),
  date varchar(30),
  statusName varchar(30) not null,
  categoryId int not null,
  categoryLevel int,
  countyId int not null,
  active boolean not null,

  CONSTRAINT issues_pk primary key(issueId),
  CONSTRAINT user_fk foreign key(userMail) REFERENCES user(mail),
  CONSTRAINT status_fk foreign key(statusName) REFERENCES status(statusName),
  CONSTRAINT category1_fk foreign key(categoryId) REFERENCES category(categoryId),
  CONSTRAINT county1_fk foreign key(countyId) REFERENCES county(countyId)


);

CREATE TABLE companyIssues(
  issueId int not null,
  companyMail varchar(30) not null,
  CONSTRAINT CI_pk primary key(issueId,companyMail),
  CONSTRAINT issue_fk foreign key(issueId) REFERENCES issues(issueId)
);


CREATE TABLE userCounties(
  userMail varchar(30) not null,
  countyId int not null,
  CONSTRAINT UC_pk primary key(userMail,countyId),
  CONSTRAINT user1_fk foreign key(userMail) REFERENCES user(mail),
  CONSTRAINT county2_fk foreign key(countyId) REFERENCES county(countyId)

);

CREATE TABLE event(
  eventId int not null AUTO_INCREMENT,
  title varchar(30) not null,
  text text,
  latitude double,
  longitude double,
  date varchar(30),
  userMail varchar(30) not null,
  countyId int not null,
  active boolean not null,
  eventCategoryId int not null,
  CONSTRAINT event_pk primary key(eventId),
  CONSTRAINT eventCat_fk foreign key(eventCategoryId) REFERENCES eventCategory(eventCategoryId),
  CONSTRAINT user2_fk foreign key(userMail) REFERENCES user(mail),
  CONSTRAINT county4_fk foreign key(countyId) REFERENCES county(countyId)
);

CREATE TABLE pushAlerts(
  countyId int not null,
  categoryId int not null,
  userMail varchar(30) not null,
  CONSTRAINT PA_pk primary key(countyId,categoryId,userMail),
  CONSTRAINT county3_fk foreign key(countyId) REFERENCES county(countyId),
  CONSTRAINT category2_fk foreign key(categoryId) REFERENCES category(categoryId),
  CONSTRAINT user3_fk foreign key(userMail) REFERENCES user(mail)

);

CREATE TABLE companyComment(
  commentId int not null AUTO_INCREMENT,
  issueId int not null,
  text text,
  CONSTRAINT companyComment_fk primary key(commentId)
);

