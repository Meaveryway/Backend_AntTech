# PostgreSQL Scripts - Techant
|Version | Status |Last update | Updater |
:---: | :---: | :---: | :---: |
| 2.1.0 | complete until further needs | June 25th | Meave |

---
# Initial scripts
> Login to PostgreSQL first. If first time run this from command line:

1. `psql postgres`  to access pg commandline.
2. `CREATE ROLE centraluser WITH LOGIN PASSWORD ‘chalal’;` to create the user that is used with the DB for this project (if you use different username/password make sure you make changes in databaseAccess.js file (and don’t forget they’ll revert back each time you pull, with a merge conflict too…just use these x))
3. `ALTER ROLE centraluser createdb;`
4. `\q`  quit to login with new user.
5. `psql -d postgres -U centraluser`
6. `create database techant;`
7. `\c techant`  to move to the new DB

> Then just run the creation scripts below, in order, to avoid foreign key errors.
> - You may also directly use the dumb.sql provided.
---
# Table creation scripts
### Handbook
```
create table handbook
(
    id           serial not null,
    filepath     varchar(100),
    date_release integer,
    constraint handbooks_pk
        primary key (id)
);
```
---
### Manufacturer
```
create table manufacturer
(
    id          serial not null,
    designation varchar(50),
    phone       varchar(20),
    speciality  varchar(50),
    constraint manufacturer_pk
        primary key (id)
);
```
---
### Catalogue of Vehicles
```
create table catalogue_vehicle
(
    id              serial not null,
    id_manufacturer integer,
    designation     varchar(50),
    fuel            varchar(15),
    id_handbook     integer,
    category        varchar(50),
    constraint catalogue_vehicle_pk
        primary key (id),
    constraint catalogue_vehicle_manufacturer_id_fk
        foreign key (id_manufacturer) references manufacturer,
    constraint catalogue_vehicle_handbook_id_fk
        foreign key (id_handbook) references handbook
);
```
---
### Vehicle
```
create table vehicle
(
    id           serial not null,
    reg_number   varchar(15),
    odometer     integer,
    state        varchar(15),
    id_unit      integer,
    date_release integer,
    id_catalogue integer,
    constraint vehicles_pk
        primary key (id),
    constraint vehicle_operational_unit_id_fk
        foreign key (id_unit) references operational_unit,
    constraint vehicle_catalogue_vehicle_id_fk
        foreign key (id_catalogue) references catalogue_vehicle
);
create unique index vehicles_regnumber_uindex
    on vehicle (reg_number);
```
---
### Catalogue of Components
```
create table catalogue_component
(
    id                 serial not null,
    designation        varchar(50),
    afnor              smallint,
    criticality        smallint,
    frequency          smallint,
    detectability      smallint,
    id_handbook        integer,
    id_manufacturer    integer,
    threshold_handbook integer,
    threshold_rex      integer,
    threshold_used     boolean,
    constraint components_pk
        primary key (id),
    constraint components_handbooks_id_fk
        foreign key (id_handbook) references handbook
            on update cascade on delete set null,
    constraint components_manufacturers_id_fk
        foreign key (id_manufacturer) references manufacturer
);
```
---
### Component
```
create table component
(
    id                    serial not null,
    id_catalogue          integer,
    id_vehicle            integer,
    odometer_installation integer,
    odometer_last_control integer,
    date_installation     bigint,
    constraint components_pk_2
        primary key (id),
    constraint components_catalogue_id_fk
        foreign key (id_catalogue) references catalogue_component,
    constraint components_vehicles_id_fk
        foreign key (id_vehicle) references vehicle
);
``` 
---
### Operational Unit
```
create table operational_unit
(
    id                  serial not null,
    city                varchar(20),
    region              varchar(30),
    address             varchar(100),
    capacity            integer,
    id_maintenance_unit integer,
    designation         varchar(50),
    constraint operational_unit_pk
        primary key (id),
    constraint operational_unit_maintenance_unit_id_fk
        foreign key (id_maintenance_unit) references maintenance_unit
);
```
---
### Maintenance Unit
```
create table maintenance_unit
(
    id          serial not null,
    designation varchar(50),
    city        varchar(20),
    region      varchar(30),
    address     varchar(100),
    capacity    integer,
    level       integer,
    constraint maintenance_unit_pk
        primary key (id)
);
```
---
### Driver
```
create table driver
(
    id        serial not null,
    fullname  varchar(50),
    birthdate integer,
    id_unit   integer,
    constraint drivers_pk
        primary key (id),
    constraint driver_operational_unit_id_fk
        foreign key (id_unit) references operational_unit
);
```
---
### Use Sheet
```
create table use_sheet
(
    id         serial not null,
    date_start bigint,
    date_end   bigint,
    motive     varchar(100),
    distance   integer,
    id_driver  integer,
    constraint use_sheet_pk
        primary key (id),
    constraint use_sheet_driver_id_fk
        foreign key (id_driver) references driver
);
```
---
### Maintenance sheet
```
create table maintenance_sheet
(
    id         serial not null,
    id_unit    integer,
    id_vehicle integer,
    date_entry bigint,
    date_exit  bigint,
    constraint maintenance_sheet_pk
        primary key (id),
    constraint maintenance_sheet_vehicle_id_fk
        foreign key (id_vehicle) references vehicle,
    constraint maintenance_sheet_maintenance_unit_id_fk
        foreign key (id_unit) references maintenance_unit
);
```
---
### Infraction
```
create table infraction
(
    id           serial not null,
    description  text,
    localisation text,
    date         bigint,
    level        integer,
    type         integer,
    id_sheet     integer,
    constraint infraction_pk
        primary key (id),
    constraint infraction_use_sheet_id_fk
        foreign key (id_sheet) references use_sheet,
    constraint infraction_instruction_driving_id_fk
        foreign key (type) references instruction_driving
);
```
---
### Driver REX
```
create table driver_rex
(
    id          serial not null,
    description text,
    date        bigint,
    level       integer,
    id_sheet    integer,
    status      varchar(10),
    constraint driver_rex_pk
        primary key (id),
    constraint driver_rex_use_sheet_id_fk
        foreign key (id_sheet) references use_sheet
);
```
---
### Mechanic REX
```
create table mechanic_rex
(
    id          serial not null,
    date        bigint,
    description text,
    type        integer,
    status      varchar(10),
    id_sheet    integer,
    constraint machanic_rex_pk
        primary key (id),
    constraint machanic_rex_maintenance_sheet_id_fk
        foreign key (id_sheet) references maintenance_sheet
);
```
---
### Driving Instruction
```
create table instruction_driving
(
    id          serial not null,
    description text,
    type        integer,
    date        bigint,
    constraint instruction_driving_pk
        primary key (id)
);
```
---
### Indicator Instruction 
```
create table instruction_indicator
(
    id           serial not null,
    id_component integer,
    threshold    integer,
    date         bigint,
    constraint instruction_indicator_pk
        primary key (id),
    constraint instruction_indicator_catalogue_id_fk
        foreign key (id_component) references catalogue_component
);
```
---
### Interchange Instruction
```
create table instruction_interchange
(
    id              serial not null,
    id_original     integer,
    id_substitution integer,
    date            bigint,
    constraint instruction_interchange_pk
        primary key (id),
    constraint instruction_interchange_catalogue_id_fk
        foreign key (id_original) references catalogue_component,
    constraint instruction_interchange_catalogue_id_fk_2
        foreign key (id_substitution) references catalogue_component
);
```
---
### Control Operation
```
create table control
(
    id           serial not null,
    odometer     integer,
    date         bigint,
    id_componant integer,
    id_sheet     integer,
    duration     bigint,
    constraint control_pk
        primary key (id),
    constraint control_component_id_fk
        foreign key (id_componant) references component,
    constraint control_maintenance_sheet_id_fk
        foreign key (id_sheet) references maintenance_sheet
);

comment on column control.duration is 'is a duration in milliseconds so convert.';

create unique index control_id_uindex
    on control (id);
```
---
### Use Speed
```
create table use_speed
(
    id           serial not null,
    id_use_sheet integer,
    time         bigint,
    speed        integer,
    constraint usespeed_pk
        primary key (id),
    constraint use_speed_use_sheet_id_fk
        foreign key (id_use_sheet) references use_sheet
);

comment on column use_speed.time is 'timestamp';

create unique index usespeed_id_uindex
    on use_speed (id);
```
---
### Default Component
```
create table default_component
(
    id_vehicle   integer,
    id_component integer not null,
    id           serial  not null,
    constraint default_component_pk
        primary key (id),
    constraint default_component_catalogue_component_id_fk
        foreign key (id_component) references catalogue_component,
    constraint default_component_catalogue_vehicle_id_fk
        foreign key (id_vehicle) references catalogue_vehicle
);

comment on column default_component.id_vehicle is 'From catalogue of vehicles';

comment on column default_component.id_component is 'From catalogue of components';

create unique index default_component_id_uindex
    on default_component (id);

```
---
