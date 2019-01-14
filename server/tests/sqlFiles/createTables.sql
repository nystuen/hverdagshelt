
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