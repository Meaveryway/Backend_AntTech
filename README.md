# Backend Application - Project 2CS - Techant

Application backend d'un projet d'étude d'un systeme d'aide à la maintenance preventive. Le projet utilise Node.js et PostgreSQL comme SGBD. 
## Setting up the Project
- Run `npm i`

## Running the Server
- `Production environment:` run this command `npm run prod`.
- `Development environment:` run this command `npm run dev`.
  - Nodemon is used as a monitor for the dev env for now, might move to PM2 later.
- `Testing environment:` run this command `npm run test` to run the full suite of unit tests. Mocha & Chai were used as a testing framework and an assertion library respectively.

# Database Scheme
* Version: `2.1.0 - Scheme is complete until further needs	(client's newest needs were integrated).`
* Last edited by: `Meave` on `June 26th`
* Check PostgreSQL_Scripts.md for ready to use creation scripts and dumb. 
![DB Class Diagram](https://i.ibb.co/1z77pcf/DB-Scheme.png" "Techant DB Scheme")

Les classes et leurs champs qui peuvent être ambigüs seront présentés:

Catalogue of vehicles
------
Un modéle de vehicule, générique. Sera instancié en Vehicle.
- **Fuel**: Le type de carburant utilisé par ce modéle de véhicule [?,?,?,?]

Vehicle
------
- **Reg_number**: Le matricule du véhicule.
- **Odometer**: kilométrage relevé sur le véhicule.
- **State**: État actuel du véhicule [?,?,?,?].
- **Date_release**: Date de début d'exploitation du véhicule. 

Catalogue of components
------
Un modéle de pièce, générique, n'est pas encore installé dans un véhicule. Sera instancié en Component lors de l'installation dans un véhicule.
- **Afnor**: Le niveau de maintenance du guide d'AFNOR auquel appartient la pièce: [1,2,3,4,5].
- **Criticality**: Le niveau de criticité selon l'analyse AMDEC de la pièce: [????].
- **Frequency**: Le niveau de fréquence selon l'analyse AMDEC de la pièce: [????].
- **Detectability**: Le niveau de détéctabilité selon l'analyse AMDEC de la pièce: [????].
- **Used_Threshold**: Un booléen qui spécifie si on utilise le seuil indiqué sur le manuel (TRUE) ou bien celui issue d'une Indicator_Instruction (FALSE) pour ce composant uniquement. 
- **Handbook_Threshold**: le seuil indiqué sur le manuel constructeur. 
- **REX_Threshold**: le seuil issu des retours d'expérience.

Component
------
Une piéce du catalogue qui est installeé dans un véhicule (référence une modèle du catalogue des pièces).
- **Odometer_installation**: Kilométrage du véhicule relevé lors de l'installation du component.
- **Odometer_last_control**: Kilométrage du véhicule relevé lors du dernier contrôle du component.  
Handbook
------
Un guide operationnel/manuel d'un component ou vehicle.
- **filepath**: Lien vers le guide.

Manufacturer
------
Un fabriquant ou marque de pièces ou de véhicules.
- **Speciality**: Domaine de fabrication du constructeur..

Driver
------
Un conducteur affilié à l'organisation.
- **Id_unit**: Unité opérationnelle dans laquelle est inscrit le conducteur.

Infraction
------
Une infraction d'une instruction de conduite commise par un conducteur suite à l'utilisation d'un véhicule prouvée par un Use Sheet.
- **Level**: Niveau de gravité de l'infraction [?,?,?,?].
- **Type**: Type de l'infraction, référencie un conseil/règle de conduite qui fut non respectée. 

Operational_unit
------
Une division opérationnelle de l'organisation à laquelle on associe conducteurs et véhicules. Il lui est associé une unique unité de maintenance (why?).
- **Capacity**: Capacité d'acceuil du parking automobile.

Maintenance_unit
------
Une division de maintenance des véhicules de l'organisation, a un niveau de compétence et peut être spécialisé.
- **Capacity**: Capacité de maintenance de l'unité en terme de nombre de véhicules.
- **Level**: Niveau de compétence de l'unité [?,?,?,?].

Control
------
Une opération de contrôle/maintenance associée à une fiche de maintenance et un composant.
- **Odometer**: Kilométrage du véhicule relevé lors de cette opération de control.
- **Duration**: Temps nécessaire (approximatif) pour finir cette opération de contrôle.

Use Sheet
------
Un document renseingé à chaque fois qu'un véhicule est exploité par un conducteur.
- **Date_start**: Date de prise du véhicule.
- **Date_end**: Date de remise du véhicule.
- **Motive**: Motif de l'exploitation du véhicule.
- **Distance**: Distance parcouru avec le véhicule au cours de la mission (simple lecture de l'odométre).

Maintenance Sheet
------
Un document renseingé par les mécaniciens à chaque opération de maintenance.
- **Id_unit**: Unité de maintenance ayant effectué l'opération.
- **Date_entry**: Date de mise du véhicule en hors servise (indisponibilité).
- **Date_exit**: Date de remise en service du véhicule.

Driver REX
------
Un retour d'expérience exprimé par un conducteur suite à l'exploitation d'un véhicule.
- **Level**: Degré d'importance de la remarque. [?,?,?,?].
- **Id_sheet**: Indique le Use Sheet associé à l'exploitation du véhicule.

Mechanic REX
------
Un retour d'expérience exprimé par un mécanicien suite à une opération de maintenance.
- **Type**: Classe du retour, entre Conseil de Conduite, Consigne d'interchangeabilité ou bien Règle d'Indicateur [?,?,?,?].
- **Status**: Statut de validation du retour avant son insertion en tant qu'intruction [?,?,?,?].

Driving Instruction
------
Un retour d'un mécanicien validé en conseil de conduite.
- **Type**: Le genre auquel appartient l'instruction. [?,?,?,?].
 
Indicator Instruction
------
Un retour d'un mécanicien validé en règle d'indicateur.
- **Id_component**: Réfere au modèle de composant (du catalogue de composant) à laquelle l'instruction est associée [?,?,?,?].
- **Threshold**: Le seuil indiqué par le mécanicien et vérifié.

Interchange Instruction
------
Un retour d'un mécanicien validé en consigne d'interchangeabilité.
- **Id_original**: Reference au modèle de composant (du catalogue de composant) qui peut être substitué.
- **Id_substitution**: Reference au modèle de composant (du catalogue de composant) avec lequel on peut substituer en cas d'indisponibilité du modèle original

Use Speed
------
Relevé de la vitesse d'un véhicule lors d'une sortie, est donc associé à une fiche de sortie (use sheet), on retrouve donc une série de Use_Speeds pour une unique Use_Sheet.
- **Time**: Heure de la lecture.
- **Speed**: Vitesse du véhicule lors de la lecture.

Default Component
------
Définit la composition de base d'un véhicule du catalogue en terme de pièces du catalogue. Est donc une table d'association qui facilite l'instanciation des véhicules du catalogue avec les pièces par défaut qui viennent avec.  

------
`PS: la présence du [?,?,?,?] indique que l'attribut appartient à une plage de valeur bien limitée, non citées dans cette documentation car elle appartient à priori au domaine métier.`

------
#Request URLs & API Documentation
You can find the whole documentation of the Techant API in this link:
[Techant API documentation](https://documenter.getpostman.com/view/8372357/T17J9Sxh)

#Managing URLs (URLParser)
All HTTP URL and Body parameters are being retrieved centrally through the utility function URLParser in [./utilities/urlAttributeExtractor.js](./utilities/urlAttributeExtractor.js "Techant DB Scheme")

------
#Tests
Unit tests were written for the server basic startup protocols as well as for the whole suite of HTTP requests managed by this server (+100 unit tests).
- Find tests under [tests folder](./test)
- Run tests (under the testing environment) simply with `npm run test`
###List of implemented tests:
####On Server
- ✓ starts successfully on port 3030
- ✓ accesses local database with URL postgres://centraluser:chalal@localhost:5432/techant (54ms)
####On Catalogues of components
- ✓ it should GET a list of all catalogue components or nocontent if DB is empty (57ms)
- ✓ it should POST a catalogue component and return its ID (164ms)
- ✓ it should GET a catalogue component based on its ID
- ✓ it should NOT GET a catalogue component with an erroneous ID
- ✓ it should UPDATE a catalogue component based on its ID
- ✓ it should PATCH a catalogue component's used threshold (REX/Handbook) based on its ID
- ✓ it should PATCH a catalogue component's handbook threshold based on its ID
- ✓ it should PATCH a catalogue component's rex threshold based on its ID
- ✓ it should DELETE an existing catalogue component based on its ID
####On Catalogues of vehicles
- ✓ it should GET a list of all catalogue vehicles or nocontent if DB is empty
- ✓ it should POST a catalogue vehicle and return its ID
- ✓ it should GET a catalogue vehicle based on its ID
- ✓ it should NOT GET a catalogue vehicle with an erroneous ID
- ✓ it should UPDATE a catalogue vehicle based on its ID
- ✓ it should DELETE an existing catalogue vehicle based on its ID
####On Components
- ✓ it should GET a list of all components or nocontent if DB is empty
- ✓ it should POST a component and return its ID
- ✓ it should GET a component based on its ID
- ✓ it should NOT GET a component with an erroneous ID
- ✓ it should UPDATE a component based on its ID
- ✓ it should PATCH a component's odometer based on its ID
- ✓ it should DELETE an existing component based on its ID
####On Controls
- ✓ it should GET a list of all controls or nocontent if DB is empty
- ✓ it should POST a control and return its ID
- ✓ it should GET a control based on its ID
- ✓ it should NOT GET a control with an erroneous ID
- ✓ it should UPDATE a control based on its ID
- ✓ it should DELETE an existing control based on its ID
####On Default Vehicles' Components
- ✓ it should GET a list of all default components or nocontent if DB is empty
- ✓ it should POST a default component and return its ID
- ✓ it should GET a default component based on a vehicle ID
- ✓ it should NOT GET a default component with an erroneous ID
- ✓ it should DELETE an existing default component based on its ID
- ✓ it should DELETE an existing default component based on a vehicle ID
- ✓ it should DELETE an existing default component based on a component ID
####On Drivers
- ✓ it should GET a list of all drivers or nocontent if DB is empty
- ✓ it should POST a driver and return its ID
- ✓ it should GET a driver based on its ID
- ✓ it should NOT GET a driver with an erroneous ID
- ✓ it should UPDATE a driver based on its ID
- ✓ it should DELETE an existing driver based on its ID
####On Infractions
- ✓ it should GET a list of all infractions or nocontent if DB is empty
- ✓ it should POST an infraction and return its ID
- ✓ it should GET an infraction based on its ID
- ✓ it should NOT GET an infraction with an erroneous ID
- ✓ it should UPDATE an infraction based on its ID
- ✓ it should DELETE an existing infraction based on its ID
####On Maintenance units
- ✓ it should GET a list of all maintenance units or nocontent if DB is empty
- ✓ it should POST a maintenance unit and return its ID
- ✓ it should GET a maintenance unit based on its ID
- ✓ it should NOT GET a maintenance unit with an erroneous ID
- ✓ it should UPDATE a maintenance unit based on its ID
- ✓ it should DELETE an existing maintenance unit based on its ID
####On Manufacturers
- ✓ it should GET a list of all manufacturers or nocontent if DB is empty
- ✓ it should POST a manufacturer and return its ID
- ✓ it should GET a manufacturer based on its ID
- ✓ it should NOT GET a manufacturer with an erroneous ID
- ✓ it should UPDATE a manufacturer based on its ID (48ms)
- ✓ it should DELETE an existing manufacturer based on its ID
####On Operational units
- ✓ it should GET a list of all operational units or nocontent if DB is empty
- ✓ it should POST an operational unit and return its ID
- ✓ it should GET an operational unit based on its ID
- ✓ it should NOT GET an operational unit with an erroneous ID
- ✓ it should UPDATE an operational unit based on its ID
- ✓ it should DELETE an existing operational unit based on its ID
####On Vehicles
- ✓ it should GET a list of all vehicles or nocontent if DB is empty
- ✓ it should POST a vehicle and return its ID
- ✓ it should GET a vehicle based on its ID
- ✓ it should NOT GET a vehicle with an erroneous ID
- ✓ it should UPDATE a vehicle based on its ID
- ✓ it should PATCH a vehicle's odometer value based on its ID
- ✓ it should PATCH a vehicle's status based on its ID (48ms)
- ✓ it should DELETE an existing vehicle based on its ID
####On Drivers' Returns of Experience
- ✓ it should GET a list of all driver REXs or nocontent if DB is empty
- ✓ it should POST a driver REX and return its ID
- ✓ it should GET a driver REX based on its ID
- ✓ it should NOT GET a driver REX with an erroneous ID
- ✓ it should UPDATE a driver REX based on its ID
- ✓ it should PATCH a driver REX's status based on its ID
- ✓ it should DELETE an existing driver REX based on its ID
####On Handbooks
- ✓ it should GET a list of all handbooks or nocontent if DB is empty
- ✓ it should POST a handbook and return its ID
- ✓ it should GET a handbook based on its ID
- ✓ it should NOT GET a handbook with an erroneous ID
- ✓ it should UPDATE a handbook based on its ID
- ✓ it should DELETE an existing handbook based on its ID
####On Driving instructions
- ✓ it should GET a list of all driving instructions or nocontent if DB is empty
- ✓ it should POST a driving instruction and return its ID
- ✓ it should GET a driving instruction based on its ID
- ✓ it should NOT GET a driving instruction with an erroneous ID
- ✓ it should UPDATE a driving instruction based on its ID (236ms)
- ✓ it should DELETE an existing driving instruction based on its ID
####On Indicator instructions
- ✓ it should GET a list of all indicator instructions or nocontent if DB is empty
- ✓ it should POST a indicator instruction and return its ID
- ✓ it should GET a indicator instruction based on its ID
- ✓ it should NOT GET an indicator instruction  with an erroneous ID
- ✓ it should UPDATE a indicator instruction based on its ID (46ms)
- ✓ it should DELETE an existing indicator instruction based on its ID
####On Interchange instructions
- ✓ it should GET a list of all interchange instructions or nocontent if DB is empty
- ✓ it should POST a interchange instruction and return its ID
- ✓ it should GET a interchange instruction based on its ID
- ✓ it should NOT GET an interchange instruction with an erroneous ID
- ✓ it should UPDATE a interchange instruction based on its ID
- ✓ it should DELETE an existing interchange instruction based on its ID
####On Maintenance sheets
- ✓ it should GET a list of all maintenance sheets or nocontent if DB is empty
- ✓ it should POST a maintenance sheet and return its ID
- ✓ it should GET a maintenance sheet based on its ID
- ✓ it should NOT GET a maintenance sheet with an erroneous ID
- ✓ it should UPDATE a maintenance sheet based on its ID
- ✓ it should DELETE an existing maintenance sheet based on its ID
####On Mechanic Returns of Experience
- ✓ it should GET a list of all mechanic REXs or nocontent if DB is empty
- ✓ it should POST a mechanic REX and return its ID
- ✓ it should GET a mechanic REX based on its ID
- ✓ it should NOT GET a mechanic REX with an erroneous ID
- ✓ it should UPDATE a mechanic REX based on its ID
- ✓ it should PATCH a mechanic REX's status based on its ID
- ✓ it should DELETE an existing mechanic REX based on its ID
####On Use Sheets
- ✓ it should GET a list of all use sheets or nocontent if DB is empty
- ✓ it should POST a use sheet and return its ID
- ✓ it should GET a use sheet based on its ID
- ✓ it should NOT GET a use sheet with an erroneous ID
- ✓ it should UPDATE a use sheet based on its ID
- ✓ it should DELETE an existing use sheet based on its ID
####On Use Speeds
- ✓ it should GET a list of all speed sheets or nocontent if DB is empty
- ✓ it should POST a speed sheet and return its ID
- ✓ it should GET a speed sheet based on the ID of a use sheet
- ✓ it should NOT GET a speed sheet with an erroneous use sheet ID
- ✓ it should DELETE an existing speed sheet based on its ID


------
#Used Node modules
1. `express`: a lightweight framework for developing web apps and servers in Node.js. 
2. `nodemon`: a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. En gros ça nous évite juste de devoir rebooter le serveur à chaque changement, quite handy.
3. `body-parser`: parses incoming request bodies in a middleware before handlers can references params or attributes from them. Can parse JSON loaded requests too.
4. `pg`: for PostgreSQL intergration with Node.js.
5. `mocha`: test runner, offer test procedures automation.
6. `chai`: assertion and expectation library (used besides mocha for unit tests).
7. `moment`: just a date parser and formater 
   - **Use timestamps in milliseconds in code but save them in seconds (/1000) (PostgreSQL value limits).** 
   - **Usage sample:** 
    ```
    moment(timestamp).format('format-string');
    var date_formated = moment(2147483647000).format("DD-MMM-YYYY"); 
   //gives Date = 19-Jan-2038 (this is the last supported date, need to change to bigint in database to handle later dates).
   ```