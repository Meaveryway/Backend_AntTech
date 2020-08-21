--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: catalogue_component; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.catalogue_component (
    id integer NOT NULL,
    designation character varying(50),
    afnor smallint,
    criticality smallint,
    frequency smallint,
    detectability smallint,
    id_handbook integer,
    id_manufacturer integer
);


ALTER TABLE public.catalogue_component OWNER TO centraluser;

--
-- Name: catalogue_vehicle; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.catalogue_vehicle (
    id integer NOT NULL,
    id_manufacturer integer,
    designation character varying(50),
    fuel character varying(15),
    id_handbook integer
);


ALTER TABLE public.catalogue_vehicle OWNER TO centraluser;

--
-- Name: catalogue_vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.catalogue_vehicle_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.catalogue_vehicle_id_seq OWNER TO centraluser;

--
-- Name: catalogue_vehicle_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.catalogue_vehicle_id_seq OWNED BY public.catalogue_vehicle.id;


--
-- Name: component; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.component (
    id integer NOT NULL,
    id_catalogue integer,
    id_vehicle integer,
    odometer_installation integer,
    odometer_last_control integer,
    date_installation bigint
);


ALTER TABLE public.component OWNER TO centraluser;

--
-- Name: components_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.components_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_id_seq OWNER TO centraluser;

--
-- Name: components_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.components_id_seq OWNED BY public.catalogue_component.id;


--
-- Name: components_id_seq1; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.components_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.components_id_seq1 OWNER TO centraluser;

--
-- Name: components_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.components_id_seq1 OWNED BY public.component.id;


--
-- Name: driver; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.driver (
    id integer NOT NULL,
    fullname character varying(50),
    birthdate integer,
    id_unit integer
);


ALTER TABLE public.driver OWNER TO centraluser;

--
-- Name: driver_rex; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.driver_rex (
    id integer NOT NULL,
    description text,
    date bigint,
    level integer,
    id_sheet integer
);


ALTER TABLE public.driver_rex OWNER TO centraluser;

--
-- Name: driver_rex_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.driver_rex_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.driver_rex_id_seq OWNER TO centraluser;

--
-- Name: driver_rex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.driver_rex_id_seq OWNED BY public.driver_rex.id;


--
-- Name: drivers_idDriver_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public."drivers_idDriver_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."drivers_idDriver_seq" OWNER TO centraluser;

--
-- Name: drivers_idDriver_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public."drivers_idDriver_seq" OWNED BY public.driver.id;


--
-- Name: handbook; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.handbook (
    id integer NOT NULL,
    filepath character varying(100),
    releasedate integer
);


ALTER TABLE public.handbook OWNER TO centraluser;

--
-- Name: handbooks_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.handbooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.handbooks_id_seq OWNER TO centraluser;

--
-- Name: handbooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.handbooks_id_seq OWNED BY public.handbook.id;


--
-- Name: infraction; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.infraction (
    id integer NOT NULL,
    description text,
    localisation text,
    date bigint,
    level integer,
    type integer,
    id_sheet integer
);


ALTER TABLE public.infraction OWNER TO centraluser;

--
-- Name: infraction_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.infraction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.infraction_id_seq OWNER TO centraluser;

--
-- Name: infraction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.infraction_id_seq OWNED BY public.infraction.id;


--
-- Name: instruction_driving; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.instruction_driving (
    id integer NOT NULL,
    description text,
    type integer,
    date bigint
);


ALTER TABLE public.instruction_driving OWNER TO centraluser;

--
-- Name: instruction_driving_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.instruction_driving_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.instruction_driving_id_seq OWNER TO centraluser;

--
-- Name: instruction_driving_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.instruction_driving_id_seq OWNED BY public.instruction_driving.id;


--
-- Name: instruction_indicator; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.instruction_indicator (
    id integer NOT NULL,
    id_component integer,
    threshold integer,
    date bigint
);


ALTER TABLE public.instruction_indicator OWNER TO centraluser;

--
-- Name: instruction_indicator_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.instruction_indicator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.instruction_indicator_id_seq OWNER TO centraluser;

--
-- Name: instruction_indicator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.instruction_indicator_id_seq OWNED BY public.instruction_indicator.id;


--
-- Name: instruction_interchange; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.instruction_interchange (
    id integer NOT NULL,
    id_original integer,
    id_substitution integer,
    date bigint
);


ALTER TABLE public.instruction_interchange OWNER TO centraluser;

--
-- Name: instruction_interchange_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.instruction_interchange_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.instruction_interchange_id_seq OWNER TO centraluser;

--
-- Name: instruction_interchange_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.instruction_interchange_id_seq OWNED BY public.instruction_interchange.id;


--
-- Name: mechanic_rex; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.mechanic_rex (
    id integer NOT NULL,
    date bigint,
    description text,
    type integer,
    status character varying(10),
    id_sheet integer
);


ALTER TABLE public.mechanic_rex OWNER TO centraluser;

--
-- Name: machanic_rex_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.machanic_rex_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.machanic_rex_id_seq OWNER TO centraluser;

--
-- Name: machanic_rex_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.machanic_rex_id_seq OWNED BY public.mechanic_rex.id;


--
-- Name: maintenance_sheet; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.maintenance_sheet (
    id integer NOT NULL,
    id_unit integer,
    id_vehicle integer,
    date_entry bigint,
    date_exit bigint
);


ALTER TABLE public.maintenance_sheet OWNER TO centraluser;

--
-- Name: maintenance_sheet_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.maintenance_sheet_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maintenance_sheet_id_seq OWNER TO centraluser;

--
-- Name: maintenance_sheet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.maintenance_sheet_id_seq OWNED BY public.maintenance_sheet.id;


--
-- Name: maintenance_unit; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.maintenance_unit (
    id integer NOT NULL,
    designation character varying(50),
    city character varying(20),
    region character varying(30),
    address character varying(100),
    capacity integer,
    level integer
);


ALTER TABLE public.maintenance_unit OWNER TO centraluser;

--
-- Name: maintenance_unit_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.maintenance_unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.maintenance_unit_id_seq OWNER TO centraluser;

--
-- Name: maintenance_unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.maintenance_unit_id_seq OWNED BY public.maintenance_unit.id;


--
-- Name: manufacturer; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.manufacturer (
    id integer NOT NULL,
    designation character varying(50),
    phone character varying(20),
    speciality character varying(50)
);


ALTER TABLE public.manufacturer OWNER TO centraluser;

--
-- Name: manufacturer_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.manufacturer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.manufacturer_id_seq OWNER TO centraluser;

--
-- Name: manufacturer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.manufacturer_id_seq OWNED BY public.manufacturer.id;


--
-- Name: operational_unit; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.operational_unit (
    id integer NOT NULL,
    city character varying(20),
    region character varying(30),
    address character varying(100),
    capacity integer,
    id_maintenance_unit integer,
    designation character varying(50)
);


ALTER TABLE public.operational_unit OWNER TO centraluser;

--
-- Name: operational_unit_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.operational_unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operational_unit_id_seq OWNER TO centraluser;

--
-- Name: operational_unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.operational_unit_id_seq OWNED BY public.operational_unit.id;


--
-- Name: use_sheet; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.use_sheet (
    id integer NOT NULL,
    date_start bigint,
    date_end bigint,
    motive character varying(100),
    distance integer,
    id_driver integer
);


ALTER TABLE public.use_sheet OWNER TO centraluser;

--
-- Name: use_sheet_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.use_sheet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.use_sheet_id_seq OWNER TO centraluser;

--
-- Name: use_sheet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.use_sheet_id_seq OWNED BY public.use_sheet.id;


--
-- Name: vehicle; Type: TABLE; Schema: public; Owner: centraluser
--

CREATE TABLE public.vehicle (
    id integer NOT NULL,
    reg_number integer,
    odometer integer,
    state character varying(15),
    id_unit integer,
    date_release integer,
    id_catalogue integer
);


ALTER TABLE public.vehicle OWNER TO centraluser;

--
-- Name: vehicles_id_seq; Type: SEQUENCE; Schema: public; Owner: centraluser
--

CREATE SEQUENCE public.vehicles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vehicles_id_seq OWNER TO centraluser;

--
-- Name: vehicles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: centraluser
--

ALTER SEQUENCE public.vehicles_id_seq OWNED BY public.vehicle.id;


--
-- Name: catalogue_component id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_component ALTER COLUMN id SET DEFAULT nextval('public.components_id_seq'::regclass);


--
-- Name: catalogue_vehicle id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_vehicle ALTER COLUMN id SET DEFAULT nextval('public.catalogue_vehicle_id_seq'::regclass);


--
-- Name: component id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.component ALTER COLUMN id SET DEFAULT nextval('public.components_id_seq1'::regclass);


--
-- Name: driver id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.driver ALTER COLUMN id SET DEFAULT nextval('public."drivers_idDriver_seq"'::regclass);


--
-- Name: driver_rex id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.driver_rex ALTER COLUMN id SET DEFAULT nextval('public.driver_rex_id_seq'::regclass);


--
-- Name: handbook id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.handbook ALTER COLUMN id SET DEFAULT nextval('public.handbooks_id_seq'::regclass);


--
-- Name: infraction id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.infraction ALTER COLUMN id SET DEFAULT nextval('public.infraction_id_seq'::regclass);


--
-- Name: instruction_driving id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_driving ALTER COLUMN id SET DEFAULT nextval('public.instruction_driving_id_seq'::regclass);


--
-- Name: instruction_indicator id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_indicator ALTER COLUMN id SET DEFAULT nextval('public.instruction_indicator_id_seq'::regclass);


--
-- Name: instruction_interchange id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_interchange ALTER COLUMN id SET DEFAULT nextval('public.instruction_interchange_id_seq'::regclass);


--
-- Name: maintenance_sheet id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.maintenance_sheet ALTER COLUMN id SET DEFAULT nextval('public.maintenance_sheet_id_seq'::regclass);


--
-- Name: maintenance_unit id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.maintenance_unit ALTER COLUMN id SET DEFAULT nextval('public.maintenance_unit_id_seq'::regclass);


--
-- Name: manufacturer id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.manufacturer ALTER COLUMN id SET DEFAULT nextval('public.manufacturer_id_seq'::regclass);


--
-- Name: mechanic_rex id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.mechanic_rex ALTER COLUMN id SET DEFAULT nextval('public.machanic_rex_id_seq'::regclass);


--
-- Name: operational_unit id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.operational_unit ALTER COLUMN id SET DEFAULT nextval('public.operational_unit_id_seq'::regclass);


--
-- Name: use_sheet id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.use_sheet ALTER COLUMN id SET DEFAULT nextval('public.use_sheet_id_seq'::regclass);


--
-- Name: vehicle id; Type: DEFAULT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.vehicle ALTER COLUMN id SET DEFAULT nextval('public.vehicles_id_seq'::regclass);


--
-- Data for Name: catalogue_component; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (3, 'Bougies d''allumage', 2, 2, 3, 2, NULL, NULL);
INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (2, 'Plaquettes', 1, 3, 3, 1, NULL, NULL);
INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (1, 'Moteur', 3, 3, 1, 4, NULL, NULL);
INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (11, 'Piston', 3, 2, 1, 5, NULL, NULL);
INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (12, 'Piston', 3, 2, 1, 5, NULL, NULL);
INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (15, 'Filtre à huile', 2, 1, 3, 3, NULL, NULL);
INSERT INTO public.catalogue_component (id, designation, afnor, criticality, frequency, detectability, id_handbook, id_manufacturer) VALUES (17, 'Filtre à huile', 2, 1, 3, 3, NULL, NULL);


--
-- Data for Name: catalogue_vehicle; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.catalogue_vehicle (id, id_manufacturer, designation, fuel, id_handbook) VALUES (3, NULL, 'Duster', 'Essence', NULL);
INSERT INTO public.catalogue_vehicle (id, id_manufacturer, designation, fuel, id_handbook) VALUES (1, NULL, '207', 'Diesel', NULL);
INSERT INTO public.catalogue_vehicle (id, id_manufacturer, designation, fuel, id_handbook) VALUES (5, NULL, '207', 'Diesel', NULL);


--
-- Data for Name: component; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.component (id, id_catalogue, id_vehicle, odometer_installation, odometer_last_control, date_installation) VALUES (3, 3, 1, 3750, 12345, 1589825173);


--
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.driver (id, fullname, birthdate, id_unit) VALUES (1, 'Hohenheim', NULL, NULL);
INSERT INTO public.driver (id, fullname, birthdate, id_unit) VALUES (2, 'Nullius Fillius', 0, NULL);
INSERT INTO public.driver (id, fullname, birthdate, id_unit) VALUES (4, 'Nullius Fillius', 1000000, NULL);


--
-- Data for Name: driver_rex; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.driver_rex (id, description, date, level, id_sheet) VALUES (3, 'idle blabla', 123456789, NULL, NULL);
INSERT INTO public.driver_rex (id, description, date, level, id_sheet) VALUES (4, 'idle blabla', 123456789, NULL, NULL);


--
-- Data for Name: handbook; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.handbook (id, filepath, releasedate) VALUES (2, 'books/audi/moteur/34951.pdf', NULL);


--
-- Data for Name: infraction; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.infraction (id, description, localisation, date, level, type, id_sheet) VALUES (2, 'accident', 'Batna', 10000, NULL, 1, NULL);
INSERT INTO public.infraction (id, description, localisation, date, level, type, id_sheet) VALUES (1, 'accident', 'Batna', 10000, NULL, 1, NULL);


--
-- Data for Name: instruction_driving; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.instruction_driving (id, description, type, date) VALUES (2, 'idle blabla', 2, 34567890);
INSERT INTO public.instruction_driving (id, description, type, date) VALUES (3, 'idle blabla', 2, 34567890);
INSERT INTO public.instruction_driving (id, description, type, date) VALUES (4, 'idle blabla', 2, 34567890);
INSERT INTO public.instruction_driving (id, description, type, date) VALUES (5, 'idle blabla', 2, 34567890);


--
-- Data for Name: instruction_indicator; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.instruction_indicator (id, id_component, threshold, date) VALUES (2, NULL, 3500, 1234567);
INSERT INTO public.instruction_indicator (id, id_component, threshold, date) VALUES (3, NULL, 35, 1234567);
INSERT INTO public.instruction_indicator (id, id_component, threshold, date) VALUES (4, NULL, 35, 1234567);
INSERT INTO public.instruction_indicator (id, id_component, threshold, date) VALUES (5, NULL, 35, 1234567);
INSERT INTO public.instruction_indicator (id, id_component, threshold, date) VALUES (6, 3, 35, 1234567);


--
-- Data for Name: instruction_interchange; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.instruction_interchange (id, id_original, id_substitution, date) VALUES (2, 1, 3, 876543);
INSERT INTO public.instruction_interchange (id, id_original, id_substitution, date) VALUES (3, 1, 3, 876543);
INSERT INTO public.instruction_interchange (id, id_original, id_substitution, date) VALUES (4, 1, 3, 876543);


--
-- Data for Name: maintenance_sheet; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.maintenance_sheet (id, id_unit, id_vehicle, date_entry, date_exit) VALUES (2, NULL, NULL, NULL, NULL);
INSERT INTO public.maintenance_sheet (id, id_unit, id_vehicle, date_entry, date_exit) VALUES (3, NULL, NULL, NULL, NULL);


--
-- Data for Name: maintenance_unit; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.maintenance_unit (id, designation, city, region, address, capacity, level) VALUES (2, 'null', 'null', 'null', 'null', 34, 1);
INSERT INTO public.maintenance_unit (id, designation, city, region, address, capacity, level) VALUES (3, 'null', 'null', 'null', 'null', 34, 1);


--
-- Data for Name: manufacturer; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.manufacturer (id, designation, phone, speciality) VALUES (2, 'Audi', NULL, '+331');


--
-- Data for Name: mechanic_rex; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.mechanic_rex (id, date, description, type, status, id_sheet) VALUES (2, 2345678, 'idle blabla', 0, NULL, NULL);
INSERT INTO public.mechanic_rex (id, date, description, type, status, id_sheet) VALUES (3, 2345678, 'idle blabla', 0, NULL, NULL);
INSERT INTO public.mechanic_rex (id, date, description, type, status, id_sheet) VALUES (4, 2345678, 'idle blabla', 0, NULL, NULL);


--
-- Data for Name: operational_unit; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.operational_unit (id, city, region, address, capacity, id_maintenance_unit, designation) VALUES (2, 'null', 'null', 'null', 0, NULL, 'null');
INSERT INTO public.operational_unit (id, city, region, address, capacity, id_maintenance_unit, designation) VALUES (1, 'null', 'null', 'null', 0, NULL, 'null');


--
-- Data for Name: use_sheet; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.use_sheet (id, date_start, date_end, motive, distance, id_driver) VALUES (1, 987654321, 987654328, 'attack', 750, NULL);


--
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: centraluser
--

INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (60, 156839, 1300, 'En maintenance', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (61, 156439, 1000, 'Disponible', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (64, 156435, 1000, 'HS', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (26, 764321, 1432, 'Hors service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (28, 146773, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (68, 156422, 1000, 'HS', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (1, 146542, 10000, 'En Service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (45, 163890, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (46, 163895, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (47, 163892, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (49, 163692, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (50, 163292, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (51, 163291, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (52, 163298, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (53, 163295, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (54, 163234, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (55, 163231, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (56, 163238, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (57, 163232, 1432, 'En service', NULL, NULL, NULL);
INSERT INTO public.vehicle (id, reg_number, odometer, state, id_unit, date_release, id_catalogue) VALUES (58, 163347, 1432, 'En service', NULL, NULL, NULL);


--
-- Name: catalogue_vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.catalogue_vehicle_id_seq', 5, true);


--
-- Name: components_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.components_id_seq', 18, true);


--
-- Name: components_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.components_id_seq1', 5, true);


--
-- Name: driver_rex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.driver_rex_id_seq', 4, true);


--
-- Name: drivers_idDriver_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public."drivers_idDriver_seq"', 4, true);


--
-- Name: handbooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.handbooks_id_seq', 2, true);


--
-- Name: infraction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.infraction_id_seq', 2, true);


--
-- Name: instruction_driving_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.instruction_driving_id_seq', 5, true);


--
-- Name: instruction_indicator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.instruction_indicator_id_seq', 6, true);


--
-- Name: instruction_interchange_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.instruction_interchange_id_seq', 4, true);


--
-- Name: machanic_rex_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.machanic_rex_id_seq', 4, true);


--
-- Name: maintenance_sheet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.maintenance_sheet_id_seq', 3, true);


--
-- Name: maintenance_unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.maintenance_unit_id_seq', 3, true);


--
-- Name: manufacturer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.manufacturer_id_seq', 2, true);


--
-- Name: operational_unit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.operational_unit_id_seq', 2, true);


--
-- Name: use_sheet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.use_sheet_id_seq', 2, true);


--
-- Name: vehicles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: centraluser
--

SELECT pg_catalog.setval('public.vehicles_id_seq', 68, true);


--
-- Name: catalogue_vehicle catalogue_vehicle_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_vehicle
    ADD CONSTRAINT catalogue_vehicle_pk PRIMARY KEY (id);


--
-- Name: catalogue_component components_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_component
    ADD CONSTRAINT components_pk PRIMARY KEY (id);


--
-- Name: component components_pk_2; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT components_pk_2 PRIMARY KEY (id);


--
-- Name: driver_rex driver_rex_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.driver_rex
    ADD CONSTRAINT driver_rex_pk PRIMARY KEY (id);


--
-- Name: driver drivers_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT drivers_pk PRIMARY KEY (id);


--
-- Name: handbook handbooks_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.handbook
    ADD CONSTRAINT handbooks_pk PRIMARY KEY (id);


--
-- Name: infraction infraction_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.infraction
    ADD CONSTRAINT infraction_pk PRIMARY KEY (id);


--
-- Name: instruction_driving instruction_driving_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_driving
    ADD CONSTRAINT instruction_driving_pk PRIMARY KEY (id);


--
-- Name: instruction_indicator instruction_indicator_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_indicator
    ADD CONSTRAINT instruction_indicator_pk PRIMARY KEY (id);


--
-- Name: instruction_interchange instruction_interchange_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_interchange
    ADD CONSTRAINT instruction_interchange_pk PRIMARY KEY (id);


--
-- Name: mechanic_rex machanic_rex_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.mechanic_rex
    ADD CONSTRAINT machanic_rex_pk PRIMARY KEY (id);


--
-- Name: maintenance_sheet maintenance_sheet_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.maintenance_sheet
    ADD CONSTRAINT maintenance_sheet_pk PRIMARY KEY (id);


--
-- Name: maintenance_unit maintenance_unit_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.maintenance_unit
    ADD CONSTRAINT maintenance_unit_pk PRIMARY KEY (id);


--
-- Name: manufacturer manufacturer_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.manufacturer
    ADD CONSTRAINT manufacturer_pk PRIMARY KEY (id);


--
-- Name: operational_unit operational_unit_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.operational_unit
    ADD CONSTRAINT operational_unit_pk PRIMARY KEY (id);


--
-- Name: use_sheet use_sheet_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.use_sheet
    ADD CONSTRAINT use_sheet_pk PRIMARY KEY (id);


--
-- Name: vehicle vehicles_pk; Type: CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicles_pk PRIMARY KEY (id);


--
-- Name: vehicles_regnumber_uindex; Type: INDEX; Schema: public; Owner: centraluser
--

CREATE UNIQUE INDEX vehicles_regnumber_uindex ON public.vehicle USING btree (reg_number);


--
-- Name: catalogue_vehicle catalogue_vehicle_handbook_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_vehicle
    ADD CONSTRAINT catalogue_vehicle_handbook_id_fk FOREIGN KEY (id_handbook) REFERENCES public.handbook(id);


--
-- Name: catalogue_vehicle catalogue_vehicle_manufacturer_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_vehicle
    ADD CONSTRAINT catalogue_vehicle_manufacturer_id_fk FOREIGN KEY (id_manufacturer) REFERENCES public.manufacturer(id);


--
-- Name: component components_catalogue_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT components_catalogue_id_fk FOREIGN KEY (id_catalogue) REFERENCES public.catalogue_component(id);


--
-- Name: catalogue_component components_handbooks_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_component
    ADD CONSTRAINT components_handbooks_id_fk FOREIGN KEY (id_handbook) REFERENCES public.handbook(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: catalogue_component components_manufacturers_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.catalogue_component
    ADD CONSTRAINT components_manufacturers_id_fk FOREIGN KEY (id_manufacturer) REFERENCES public.manufacturer(id);


--
-- Name: component components_vehicles_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.component
    ADD CONSTRAINT components_vehicles_id_fk FOREIGN KEY (id_vehicle) REFERENCES public.vehicle(id);


--
-- Name: driver driver_operational_unit_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_operational_unit_id_fk FOREIGN KEY (id_unit) REFERENCES public.operational_unit(id);


--
-- Name: driver_rex driver_rex_use_sheet_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.driver_rex
    ADD CONSTRAINT driver_rex_use_sheet_id_fk FOREIGN KEY (id_sheet) REFERENCES public.use_sheet(id);


--
-- Name: infraction infraction_use_sheet_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.infraction
    ADD CONSTRAINT infraction_use_sheet_id_fk FOREIGN KEY (id_sheet) REFERENCES public.use_sheet(id);


--
-- Name: instruction_indicator instruction_indicator_catalogue_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_indicator
    ADD CONSTRAINT instruction_indicator_catalogue_id_fk FOREIGN KEY (id_component) REFERENCES public.catalogue_component(id);


--
-- Name: instruction_interchange instruction_interchange_catalogue_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_interchange
    ADD CONSTRAINT instruction_interchange_catalogue_id_fk FOREIGN KEY (id_original) REFERENCES public.catalogue_component(id);


--
-- Name: instruction_interchange instruction_interchange_catalogue_id_fk_2; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.instruction_interchange
    ADD CONSTRAINT instruction_interchange_catalogue_id_fk_2 FOREIGN KEY (id_substitution) REFERENCES public.catalogue_component(id);


--
-- Name: mechanic_rex machanic_rex_maintenance_sheet_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.mechanic_rex
    ADD CONSTRAINT machanic_rex_maintenance_sheet_id_fk FOREIGN KEY (id_sheet) REFERENCES public.maintenance_sheet(id);


--
-- Name: maintenance_sheet maintenance_sheet_maintenance_unit_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.maintenance_sheet
    ADD CONSTRAINT maintenance_sheet_maintenance_unit_id_fk FOREIGN KEY (id_unit) REFERENCES public.maintenance_unit(id);


--
-- Name: maintenance_sheet maintenance_sheet_vehicle_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.maintenance_sheet
    ADD CONSTRAINT maintenance_sheet_vehicle_id_fk FOREIGN KEY (id_vehicle) REFERENCES public.vehicle(id);


--
-- Name: operational_unit operational_unit_maintenance_unit_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.operational_unit
    ADD CONSTRAINT operational_unit_maintenance_unit_id_fk FOREIGN KEY (id_maintenance_unit) REFERENCES public.maintenance_unit(id);


--
-- Name: use_sheet use_sheet_driver_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.use_sheet
    ADD CONSTRAINT use_sheet_driver_id_fk FOREIGN KEY (id_driver) REFERENCES public.driver(id);


--
-- Name: vehicle vehicle_catalogue_vehicle_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_catalogue_vehicle_id_fk FOREIGN KEY (id_catalogue) REFERENCES public.catalogue_vehicle(id);


--
-- Name: vehicle vehicle_operational_unit_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: centraluser
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_operational_unit_id_fk FOREIGN KEY (id_unit) REFERENCES public.operational_unit(id);


--
-- PostgreSQL database dump complete
--

