// @flow

class User {
    mail: string;
    firstName: string;
    lastName: string;
    typeName: string;
    phone: string;
    points: number;
    countyId: number;
    active: number;

    constructor(mail: string, firstName: string, lastName: string, typeName: string, phone: string, points: number, countyId: number, active: number) {
        this.mail = mail;
        this.firstName = firstName;
        this.lastName = lastName;
        this.typeName = typeName;
        this.phone = phone;
        this.points = points;
        this.countyId = countyId;
        this.active = active;
    }
}

class Issue {
    issueId: number;
    userMail: string;
    latitude: number;
    longitude: number;
    text: string;
    pic: string;
    date: string;
    statusName: string;
    categoryId: number;
    countyId: number;
    active: number;

    constructor(issueId: number, userMail: string, latitude: number, longitude: number, text: string, pic: string, date: string, statusName: string, categoryId: number, countyId: number, active: number) {
        this.issueId = issueId;
        this.userMail = userMail;
        this.latitude = latitude;
        this.longitude = longitude;
        this.text = text;
        this.pic = pic;
        this.date = date;
        this.statusName = statusName;
        this.categoryId = categoryId;
        this.countyId = countyId;
        this.active = active;
    }

}

class Type {
    typeName: string;
    active: number;

    constructor(typeName: string, active: number) {
        this.typeName = typeName;
        this.active = active;
    }
}

class Company extends Type {
    companyMail: string;
    companyName: string;
    description: string;


    constructor(typeName: string, active: number, companyMail: string, companyName: string, description: string) {
        super(typeName, active);
        this.companyMail = companyMail;
        this.companyName = companyName;
        this.description = description;
    }
}

class Category {
    categoryId: number;
    name: string;
    priority: number;
    active: number;


    constructor(categoryId: number, name: string, priority: number, active: number) {
        this.categoryId = categoryId;
        this.name = name;
        this.priority = priority;
        this.active = active;
    }
}

class Event {
    eventId: number;
    title: string;
    text: string;
    date: string;
    userMail: string;
    active: number;


    constructor(eventId: number, title: string, text: string, date: string, userMail: string, active: number) {
        this.eventId = eventId;
        this.title = title;
        this.text = text;
        this.date = date;
        this.userMail = userMail;
        this.active = active;
    }
}