from faker import Faker
import datetime
import uuid
from random import randint
from Utilities import get_string_in_quotes
from model.Client import Client
from model.Vehicle import Vehicle
from model.VehicleRent import VehicleRent
from model.Incident import Incident
from model.User import User
from colorama import Fore
from Constants import counties_car_plate, car_brands, cities, descriptions, bios
import random
import bcrypt

client_file_name = "InsertClient.sql"
fake = Faker()
user_ids = {}
client_ids = {}
vehicles_ids = {}
incident_ids = {}
rent_ids = {}


def drop_constrains_from_all_tables():
    file = open("DropConstraints.sql", "w")
    print(Fore.WHITE + "START DROPPING CONSTRAINTS")
    file.write(
        "ALTER TABLE \"User\" DROP CONSTRAINT IF EXISTS \"PK_User\" CASCADE;\n")
    file.write(
        "ALTER TABLE \"Client\" DROP CONSTRAINT IF EXISTS \"PK_Client\" CASCADE;\n")
    file.write(
        "ALTER TABLE \"Client\" DROP CONSTRAINT IF EXISTS \"FK_Client_UserId\" CASCADE;\n")
    file.write(
        "ALTER TABLE \"Vehicle\" DROP CONSTRAINT IF EXISTS \"PK_Vehicle\" CASCADE;\n ")
    file.write(
        "ALTER TABLE \"Vehicle\" DROP CONSTRAINT IF EXISTS \"FK_Vehicle_UserId\" CASCADE;\n")
    file.write(
        "ALTER TABLE \"Incidents\" DROP CONSTRAINT IF EXISTS \"PK_Incidents\" CASCADE;\n")
    file.write(
        "ALTER TABLE \"Incidents\" DROP CONSTRAINT IF EXISTS \"FK_Incidents_VehicleId\" Cascade;\n")
    file.write(
        "ALTER TABLE \"Incidents\" DROP CONSTRAINT IF EXISTS \"FK_Incidents_UserId\" CASCADE;\n")
    file.write("DROP INDEX IF EXISTS \"IX_Incidents_VehicleId\";\n")
    file.write("DROP INDEX IF EXISTS \"IX_Client_UserId\"; \n")
    file.write("DROP INDEX IF EXISTS \"IX_Incidents_UserId\"; \n")
    file.write(
        "ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"PK_VehicleRent\" Cascade;\n")
    file.write(
        "ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"FK_VehicleRent_ClientId\" Cascade;\n")
    file.write(
        "ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"FK_VehicleRent_VehicleId\" Cascade;\n")
    file.write(
        "ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"FK_VehicleRent_UserId\" Cascade;\n")
    file.write("DROP INDEX IF EXISTS \"IX_VehicleRent_VehicleId\";\n")
    file.write("DROP INDEX IF EXISTS \"IX_VehicleRent_UserId\"; \n")
    file.write("DROP INDEX IF EXISTS \"IX_VehicleRent_ClientId\";\n")

    print(Fore.WHITE + "STOP DROPPING CONSTRAINTS")
    file.close()


def add_constrains_to_all_tables():
    file = open("AddConstraints.sql", "w")
    print(Fore.WHITE + "START ADDING CONSTRAINTS")
    file.write(
        "ALTER TABLE \"User\" ADD CONSTRAINT \"PK_User\" PRIMARY KEY(\"Id\");\n")
    file.write(
        "ALTER TABLE \"Client\" ADD CONSTRAINT \"PK_Client\" PRIMARY KEY(\"Id\");\n")
    file.write("ALTER TABLE \"Client\" ADD CONSTRAINT \"FK_Client_UserId\" FOREIGN KEY(\"UserId\") REFERENCES \"User\"(\"Id\") ON DELETE CASCADE;\n")
    file.write(
        "ALTER TABLE \"Vehicle\" ADD CONSTRAINT \"PK_Vehicle\" PRIMARY KEY(\"Id\");\n")
    file.write("ALTER TABLE \"Vehicle\" ADD CONSTRAINT \"FK_Vehicle_UserId\" FOREIGN KEY(\"UserId\") REFERENCES \"User\"(\"Id\") ON DELETE CASCADE;\n")
    file.write(
        "ALTER TABLE \"Incidents\" ADD CONSTRAINT \"PK_Incidents\" PRIMARY KEY(\"Id\");\n")
    file.write("ALTER TABLE \"Incidents\" ADD CONSTRAINT \"FK_Incidents_UserId\" FOREIGN KEY(\"UserId\") REFERENCES \"User\"(\"Id\") ON DELETE CASCADE;\n")
    file.write("ALTER TABLE \"Incidents\" ADD CONSTRAINT \"FK_Incidents_VehicleId\" FOREIGN KEY(\"VehicleId\") REFERENCES \"Vehicle\"(\"Id\") ON DELETE CASCADE;\n")
    file.write(
        "ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"PK_VehicleRent\" PRIMARY KEY (\"Id\");\n")
    file.write("ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"FK_VehicleRent_ClientId\" FOREIGN KEY(\"ClientId\") REFERENCES \"Client\"(\"Id\") ON DELETE CASCADE;\n")
    file.write("ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"FK_VehicleRent_VehicleId\" FOREIGN KEY(\"VehicleId\") REFERENCES \"Vehicle\"(\"Id\") ON DELETE CASCADE;\n")
    file.write("ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"FK_VehicleRent_UserId\" FOREIGN KEY(\"UserId\") REFERENCES \"User\"(\"Id\") ON DELETE CASCADE;\n")
    file.write(
        "CREATE INDEX \"IX_VehicleRent_ClientId\" on \"VehicleRent\"(\"ClientId\");\n")
    file.write(
        "CREATE INDEX \"IX_VehicleRent_VehicleId\" on \"VehicleRent\"(\"VehicleId\");\n")
    file.write(
        "CREATE INDEX \"IX_Incidents_VehicleId\" on \"Incidents\"(\"Id\");\n")
    print(Fore.WHITE + "STOP ADDING CONSTRAINTS")
    file.close()


def clear_all_tables():
    file_name = "ClearAllTables.sql"

    file = open(file_name, "w")

    file.write("DELETE FROM \"Incidents\";\n")
    file.write("DELETE FROM \"VehicleRent\";\n")
    file.write("DELETE FROM \"Client\";\n")
    file.write("DELETE FROM \"Vehicle\";\n")
    file.write("DELETE FROM \"UserProfile\";\n")
    file.write("DELETE FROM \"User\";\n")
    file.close()


def insert_into_user():
    global user_ids

    user_file_name = "InsertUser.sql"
    file = open(user_file_name, "w")
    # file.write("DELETE FROM \"User\";\n")
    # file.write("DELETE FROM \"UserProfile\";\n")
    number_of_users = 10000
    user_batches = ""
    user_profile_batches = ""
    print("STARTING INSERTING INTO USER AT TIME: ",
          Fore.YELLOW + str(datetime.datetime.now()))

    def get_random_birthday():
        start_date = datetime.date(2000, 1, 1)
        days = randint(0, 4) * 365
        start_date += datetime.timedelta(days=days)
        return start_date

    for index in range(number_of_users):
        uid = uuid.uuid4()
        while uid in user_ids.keys():
            uid = uuid.uuid4()
        user_ids[uid] = 1
        username = "david" + str(index)
        password = b"parola"
        # hashed_password = bcrypt.hashpw(password, bcrypt.gensalt()).decode()
        hashed_password = "$2b$12$mb/tpPRgOpKvc6n4xAapButZQnc0LTGO.6vqdx.zmnWNKNnoEylRK"
        bio = random.choice(bios)
        location = random.choice(cities)
        birthday = get_random_birthday()
        gender = randint(0, 1)
        marital_status = randint(0, 3)
        user = User(uid, username, hashed_password, bio, location,
                    birthday, gender, marital_status)
        user_batches += user.get_user_string() + ","
        user_profile_batches += user.get_user_profile_string() + ","
        # print(f"Iteration [{index}]/[{number_of_users}]")
        if (index + 1) % 1000 == 0:
            file.write(str(
                f"INSERT INTO \"User\"(\"Id\", \"Name\", \"Password\") VALUES {user_batches[:-1]};\n"))
            file.write(str(
                f"INSERT INTO \"UserProfile\"(\"UserId\", \"Bio\", \"Location\",\"Birthday\",\"Gender\",\"MaritalStatus\") VALUES {user_profile_batches[:-1]};\n"))
            user_batches = ""
            user_profile_batches = ""

    file.close()
    print(Fore.WHITE + "STOP INSERTING INTO USER AT: ", Fore.YELLOW +
          str(datetime.datetime.now()), Fore.GREEN + "\u2713")

    pass


def insert_into_client():
    global client_ids
    global user_ids
    user_ids_list = list(user_ids.keys())
    file = open(client_file_name, "w")
    # file.write("DELETE FROM \"Client\";\n")
    number_of_clients = 1000000
    batches = ""
    cnp_taken = {}
    nationalities = ['romanian', 'hungarian', 'french', 'german']

    def generate_card_number():
        card_number = ""
        for _ in range(4):
            number = randint(1000, 9999)
            card_number += str(number) + "-"
        return card_number[:-1]

    def generate_birthday():
        start_date = datetime.date(2004, 1, 1)
        random_days = 365 * randint(1, 44)
        return start_date - datetime.timedelta(days=random_days)

    def generate_cnp():
        cnp = randint(10000000, 99999999)
        while (cnp in cnp_taken.keys()):
            cnp = randint(10000000, 99999999)
        cnp_taken[cnp] = 1
        return cnp

    print("STARTING INSERTING INTO CLIENT AT TIME: ",
          Fore.YELLOW + str(datetime.datetime.now()))
    for index in range(number_of_clients):
        cid = uuid.uuid4()
        while (id in client_ids.keys()):
            cid = uuid.uuid4()
        client_ids[cid] = 1
        name = fake.name()
        card_number = generate_card_number()
        cnp = str(generate_cnp())
        user_id = user_ids_list[randint(1, 9000)]
        birthday = str(generate_birthday())
        nationality = random.choice(nationalities)
        client = Client(cid, name, card_number, cnp,
                        birthday, nationality, user_id)
        batches += str(client) + ","
        # print(f"Iteration [{index}]/[{number_of_clients}]")
        if (index + 1) % 1000 == 0:
            file.write(str(
                f"INSERT INTO \"Client\"(\"Id\",\"Name\",\"CardNumber\",\"CNP\",\"Birthday\",\"Nationality\",\"UserId\") VALUES {batches[:-1]};\n"))
            batches = ""

    file.close()
    print(Fore.WHITE + "STOP INSERTING INTO CLIENT AT: ", Fore.YELLOW +
          str(datetime.datetime.now()), Fore.GREEN + "\u2713")


def insert_into_vehicles():
    global vehicles_ids
    global user_ids
    car_plates = {}
    number_of_vehicles = 1000000
    user_ids_list = list(user_ids.keys())

    def generate_car_plate():
        car_plate = ""
        while car_plate == "" or car_plate in car_plates.keys():
            car_plate = counties_car_plate[randint(0, len(counties_car_plate) - 1)] + \
                str(randint(10, 99)) + \
                chr(randint(ord('A'), ord('Z'))) + \
                chr(randint(ord('A'), ord('Z'))) + \
                chr(randint(ord('A'), ord('Z')))
        car_plates[car_plate] = 1

        return car_plate

    file = open("InsertVehicle.sql", "w")
    # file.write("DELETE FROM \"Vehicle\";\n")

    print(Fore.WHITE + "START INSERT IN VEHICLES AT:",
          Fore.YELLOW + str(datetime.datetime.now()))
    batches = ""
    for index in range(number_of_vehicles):
        vid = uuid.uuid4()

        while vid in vehicles_ids.keys():
            vid = uuid.uuid4()

        vehicles_ids[vid] = 1
        brand = car_brands[randint(0, len(car_brands) - 1)]
        horse_power = randint(70, 400)
        car_plate = generate_car_plate()
        number_of_seats = randint(2, 6)
        engine_capacity = randint(10, 30)*100
        user_id = user_ids_list[randint(1, 9000)]
        fabrication_date = datetime.date(randint(2000, 2021), 1, 1)
        fabrication_date += datetime.timedelta(days=randint(0, 364))
        vehicle = Vehicle(vid, brand, horse_power, car_plate,
                          number_of_seats, engine_capacity, fabrication_date, user_id)
        batches += str(vehicle) + ","
        # print(f"Iteration [{index}]/[{number_of_vehicles}]")
        if (index + 1) % 10 == 0:
            file.write(str(
                f"INSERT INTO \"Vehicle\"(\"Id\",\"Brand\",\"HorsePower\",\"CarPlate\",\"NumberOfSeats\",\"EngineCapacity\",\"FabricationDate\",\"UserId\") VALUES {batches[:-1]};\n"))
            batches = ""
    file.close()
    print(Fore.WHITE + "STOP INSERT IN VEHICLES AT: ", Fore.YELLOW +
          str(datetime.datetime.now()), Fore.GREEN + "\u2713")


def insert_into_incidents():
    global incident_ids
    global user_ids

    file = open("InsertIncident.sql", "w")
    vehicle_ids_list = list(vehicles_ids.keys())
    user_ids_list = list(user_ids.keys())
    number_of_incidents = 1000000
    batches = ""
    print(Fore.WHITE + "START INSERTING INTO INCIDENTS AT: ",
          Fore.YELLOW + str(datetime.datetime.now()))
    # file.write("DELETE FROM \"Incidents\";\n")

    for index in range(number_of_incidents):
        iid = uuid.uuid4()

        while id in incident_ids:
            iid = uuid.uuid4()

        incident_ids[iid] = 1
        vehicle_id = random.choice(vehicle_ids_list)
        location = random.choice(cities)
        description = random.choice(descriptions)
        cost = randint(100, 10000)
        user_id = user_ids_list[randint(1, 9000)]
        incident_date = datetime.date(2022, 1, 1)
        incident_date += datetime.timedelta(days=randint(0, 364))
        incident = Incident(iid, vehicle_id, location,
                            description, cost, incident_date, user_id)
        batches += str(incident) + ","
        # print(f"Iteration [{index}]/[{number_of_incidents}]")
        if (index + 1) % 1000 == 0:
            file.write(str(
                f"INSERT INTO \"Incidents\"(\"Id\",\"VehicleId\",\"Location\",\"Description\",\"Cost\",\"WhenHappend\",\"UserId\") VALUES{batches[:-1]};\n"))
            batches = ""
    print(Fore.WHITE + "STOP INSERTING INTO INCIDENTS AT: ",
          Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN + "\u2713")

    file.close()


def insert_into_rents():
    global vehicles_ids
    global client_ids
    global rent_ids
    global user_ids
    number_of_rents = 10000000
    batches = ""
    vehicle_ids_list = list(vehicles_ids.keys())
    client_ids_list = list(client_ids.keys())
    user_ids_list = list(user_ids.keys())
    file = open("InsertRent.sql", "w")

    def get_random_start_date():
        start_date = datetime.date(2022, 1, 1)
        start_date += datetime.timedelta(days=randint(0, 364))
        return start_date

    print("STARTING INSERTING INTO RENTS AT TIME: ",
          Fore.YELLOW + str(datetime.datetime.now()))

    # file.write("DELETE FROM \"VehicleRent\";\n")

    for index in range(number_of_rents):
        rid = uuid.uuid4()

        while rid in rent_ids.keys():
            rid = uuid.uuid4()

        client_id = client_ids_list[randint(0, len(client_ids_list) - 1)]
        vehicle_id = vehicle_ids_list[randint(0, len(vehicle_ids_list) - 1)]

        start_date = get_random_start_date()
        end_date = start_date + datetime.timedelta(days=randint(0, 4))
        total_cost = randint(200, 1000)
        comments = ""
        user_id = user_ids_list[randint(1, 9000)]

        rent = VehicleRent(rid, client_id, vehicle_id,
                           start_date, end_date, total_cost, comments, user_id)
        batches += str(rent) + ","
        rent_ids[rid] = 1
        # print(f"Iteration [{index}]/[{number_of_rents}]")
        if (index + 1) % 1000 == 0:
            file.write(str(
                f"INSERT INTO \"VehicleRent\"(\"Id\",\"ClientId\",\"VehicleId\",\"StartDate\",\"EndDate\",\"TotalCost\",\"Comments\",\"UserId\") VALUES {batches[:-1]};\n"))
            batches = ""

    print(Fore.WHITE + "STOP INSERT IN RENTS AT: ", Fore.YELLOW +
          str(datetime.datetime.now()), Fore.GREEN + "\u2713")

    file.close()


if __name__ == "__main__":
    drop_constrains_from_all_tables()
    clear_all_tables()
    insert_into_user()
    insert_into_client()
    insert_into_vehicles()
    insert_into_incidents()
    insert_into_rents()
    add_constrains_to_all_tables()
