CREATE SCHEMA IF NOT EXISTS PerioClass;

USE PerioClass;

CREATE TABLE IF NOT EXISTS Users (
	id bigint not null auto_increment,
    name varchar(64) not null,
    password text not null,
    email varchar(64) unique not null,
    phone varchar(24) default null,
    level integer not null default 7,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp,
    PRIMARY KEY(id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Patients (
	id bigint not null auto_increment,
    name varchar(64) not null,
    email varchar(64) not null unique,
    gender enum('male', 'female') not null,
    birth_date datetime not null,
    created_by bigint not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp,
    PRIMARY KEY(id),
    FOREIGN KEY(created_by) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Addresses (
    id bigint not null auto_increment,
    patient_id bigint not null unique,
    state varchar(32) not null,
    city varchar(32) default null,
    district varchar(32) default null,
    country varchar(32) not null,
    created_by bigint not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp,
    PRIMARY KEY(id),
    FOREIGN KEY(patient_id) REFERENCES Patients(id) ON DELETE CASCADE,
    FOREIGN KEY(created_by) REFERENCES Users(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Appointments (
    id bigint not null auto_increment,
    tooth_loss int not null,
    interdental_cal_loss double not null,
    maximum_probing_depth double not null,
    furcation enum('none', 'class1', 'class2', 'class3') not null default 'none',
    bone_lenght double not null,
    bone_loss double not null,
    bone_loss_type enum('none', 'Mostly horizontal bone loss.', 'Vertical bone loss.') not null,
    smoking enum('0', '<10', '>=10') not null,
    hemoglobine_glycated enum('0', '<7%', '>=7%') not null,
    loss_historical_in_five_years double not null,
    extension enum('<30%', '>=30%', 'molar/incisive') not null,
    text_box text default null,
    biofilm enum('compatible', 'incompatible') default null,
    patient_id bigint not null,
    created_by bigint not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp,
    PRIMARY KEY(id),
    FOREIGN KEY(created_by) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY(patient_id) REFERENCES Patients(id) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS Analytics (
    id bigint not null auto_increment,
    patient_age int not null,
    patient_gender enum('male', 'female') not null,
    state varchar(32) not null,
    country varchar(32) not null,
    grade enum('A', 'B', 'C') not null,
    stage enum('I', 'II', 'III', 'IV') not null,
    created_by bigint not null,
    created_at datetime not null default current_timestamp,
    updated_at datetime not null default current_timestamp on update current_timestamp,
    PRIMARY KEY(id)
) ENGINE = InnoDB;
