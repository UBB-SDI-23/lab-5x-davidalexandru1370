from faker import Faker
import datetime
import uuid
from random import randint
from Utilities import get_string_in_quotes
from model.Client import Client
from model.Vehicle import Vehicle
from model.VehicleRent import VehicleRent
from model.Incident import Incident
from colorama import Fore
from Constants import counties_car_plate, car_brands, cities
import random

client_file_name = "InsertClient.sql"
fake = Faker()
client_ids = {}
vehicles_ids = {}    
incident_ids = {}
rent_ids = {}

def drop_constrains_from_all_tables():
    file = open("DropConstraints.sql", "w")
    print(Fore.WHITE + "START DROPPING CONSTRAINTS")

    file.write("ALTER TABLE \"Client\" DROP CONSTRAINT IF EXISTS \"PK_Client\" CASCADE;\n")
    file.write("ALTER TABLE \"Vehicle\" DROP CONSTRAINT IF EXISTS \"PK_Vehicle\" CASCADE;\n ")
    file.write("ALTER TABLE \"Incidents\" DROP CONSTRAINT IF EXISTS \"PK_Incidents\" CASCADE;\n")
    file.write("ALTER TABLE \"Incidents\" DROP CONSTRAINT IF EXISTS \"FK_Incidents_VehicleId\" Cascade;\n")
    file.write("DROP INDEX IF EXISTS \"IX_Incidents_VehicleId\";\n")
    file.write("ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"PK_VehicleRent\" Cascade;\n")
    file.write("ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"FK_VehicleRent_ClientId\" Cascade;\n")
    file.write("ALTER TABLE \"VehicleRent\" DROP CONSTRAINT IF EXISTS \"FK_VehicleRent_VehicleId\" Cascade;\n")
    file.write("DROP INDEX IF EXISTS \"IX_VehicleRent_VehicleId\";\n")
    file.write("DROP INDEX IF EXISTS \"IX_VehicleRent_ClientId\";\n")

    print(Fore.WHITE + "STOP DROPPING CONSTRAINTS")
    file.close()


def add_constrains_to_all_tables():
    file = open("AddConstraints.sql", "w")
    
    print(Fore.WHITE + "START ADDING CONSTRAINTS")

    file.write("ALTER TABLE \"Client\" ADD CONSTRAINT \"PK_Client\" PRIMARY KEY(\"Id\");\n")
    file.write("ALTER TABLE \"Vehicle\" ADD CONSTRAINT \"PK_Vehicle\" PRIMARY KEY(\"Id\");\n")
    file.write("ALTER TABLE \"Incidents\" ADD CONSTRAINT \"PK_Incidents\" PRIMARY KEY(\"Id\");\n")
    file.write("ALTER TABLE \"Incidents\" ADD CONSTRAINT \"FK_Incidents_VehicleId\" FOREIGN KEY(\"VehicleId\") REFERENCES \"Vehicle\"(\"Id\");\n")
    file.write("ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"PK_VehicleRent\" PRIMARY KEY (\"Id\");\n")
    file.write("ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"FK_VehicleRent_ClientId\" FOREIGN KEY(\"ClientId\") REFERENCES \"Client\"(\"Id\");\n")
    file.write("ALTER TABLE \"VehicleRent\" ADD CONSTRAINT \"FK_VehicleRent_VehicleId\" FOREIGN KEY(\"VehicleId\") REFERENCES \"Vehicle\"(\"Id\");\n")
    file.write("CREATE INDEX \"IX_VehicleRent_ClientId\" on \"VehicleRent\"(\"ClientId\");\n")
    file.write("CREATE INDEX \"IX_VehicleRent_VehicleId\" on \"VehicleRent\"(\"VehicleId\");\n")
    file.write("CREATE INDEX \"IX_Incidents_VehicleId\" on \"Incidents\"(\"Id\");\n")
    print(Fore.WHITE + "STOP ADDING CONSTRAINTS")
    file.close()

def insert_into_client():
    global client_ids
    file = open(client_file_name, "w")
    file.write("DELETE FROM \"Client\";\n")
    number_of_clients = 1000000
    batches = ""
    cnp_taken = {}

    def generate_card_number():
        card_number = ""
        for _ in range(4):
            number = randint(1000,9999)
            card_number += str(number) + "-"
        return card_number[:-1]

    def generate_birthday():
        start_date = datetime.date(2004,1,1)
        random_days = 365 * randint(1,44)
        return start_date - datetime.timedelta(days=random_days)

    def generate_cnp():
        cnp = randint(10000000, 99999999)
        while(cnp in cnp_taken.keys()):
            cnp = randint(10000000, 99999999)
        cnp_taken[cnp] = 1
        return cnp

    print("STARTING INSERTING INTO CLIENT AT TIME: ", Fore.YELLOW +  str(datetime.datetime.now()))
    for index in range(number_of_clients):
        cid = uuid.uuid4()
        while(id in client_ids.keys()):
            cid = uuid.uuid4()
        client_ids[cid] = 1
        name = fake.name()
        card_number = generate_card_number()
        cnp = str(generate_cnp())
        birthday = str(generate_birthday())
        nationality = "romanian"
        client = Client(cid,name,card_number,cnp,birthday,nationality)
        batches += str(client) + ","
        if (index + 1) % 1000 == 0:
            file.write(str(f"INSERT INTO \"Client\"(\"Id\",\"Name\",\"CardNumber\",\"CNP\",\"Birthday\",\"Nationality\") VALUES {batches[:-1]};\n"))
            batches = ""    

    file.close()
    print(Fore.WHITE + "STOP INSERTING INTO CLIENT AT: ",Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN + "\u2713")


def insert_into_vehicles():
    global vehicles_ids
    car_plates = {}
    number_of_vehicles = 1000000

    def generate_car_plate():
        car_plate = ""
        while car_plate == "" and car_plate in car_plates.keys():
            car_plate = counties_car_plate[randint(0,len(counties_car_plate) - 1)] + \
            str(randint(10,99)) + \
            chr(randint(ord('A'),ord('Z'))) + \
            chr(randint(ord('A'),ord('Z'))) + \
            chr(randint(ord('A'),ord('Z')))
        car_plates[car_plate] = 1
        
        return car_plate

    file = open("InsertVehicle.sql","w")
    file.write("DELETE FROM \"Vehicle\";\n")

    print(Fore.WHITE +  "START INSERT IN VEHICLES AT:", Fore.YELLOW + str(datetime.datetime.now()))
    batches = ""
    for index in range(number_of_vehicles):
        vid = uuid.uuid4()
        
        while vid in vehicles_ids.keys():
            vid = uuid.uuid4()

        vehicles_ids[vid] = 1
        brand = car_brands[randint(0,len(car_brands) - 1)]
        horse_power = randint(70,400)
        car_plate = generate_car_plate()
        number_of_seats = randint(2,6)
        engine_capacity = randint(10,30)*100
        fabrication_date = datetime.date(randint(2000,2021),1,1)
        fabrication_date += datetime.timedelta(days=randint(0,364))
        vehicle = Vehicle(vid,brand,horse_power,car_plate,number_of_seats,engine_capacity,fabrication_date)
        batches += str(vehicle) + ","
        if (index + 1) % 1000 == 0:
            file.write(str(f"INSERT INTO \"Vehicle\"(\"Id\",\"Brand\",\"HorsePower\",\"CarPlate\",\"NumberOfSeats\",\"EngineCapacity\",\"FabricationDate\") VALUES {batches[:-1]};\n"))
            batches = ""
    file.close()
    print(Fore.WHITE +  "STOP INSERT IN VEHICLES AT: ", Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN +  "\u2713")

def insert_into_incidents():
    global incident_ids
    file = open("InsertIncident.sql","w")
    vehicle_ids_list = list(vehicles_ids.keys())
    number_of_incidents = 1000000
    batches = ""
    print(Fore.WHITE + "START INSERTING INTO INCIDENTS AT: ", Fore.YELLOW +  str(datetime.datetime.now()))
    file.write("DELETE FROM \"Incidents\";\n")

    for index in range(number_of_incidents):
        iid = uuid.uuid4()


        while id in incident_ids:
            iid = uuid.uuid4()

        incident_ids[iid] = 1
        vehicle_id = random.choice(vehicle_ids_list)
        location = random.choice(cities)
        description = f"The car driver crashed the car in {location}  by hitting another car because he was not paying attention to the road because he was looking at his phone"
        cost = randint(100,10000)
        incident_date = datetime.date(2022,1,1)
        incident_date += datetime.timedelta(days=randint(0,364))
        incident = Incident(iid, vehicle_id, location, description, cost, incident_date)
        batches += str(incident) + ","
        if (index + 1) % 1000 == 0:
            file.write(str(f"INSERT INTO \"Incidents\"(\"Id\",\"VehicleId\",\"Location\",\"Description\",\"Cost\",\"WhenHappend\") VALUES{batches[:-1]};\n"))
            batches = ""
    print(Fore.WHITE + "STOP INSERTING INTO INCIDENTS AT: ", Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN + "\u2713")

    file.close()


def insert_into_rents():
    global vehicles_ids
    global client_ids
    global rent_ids
    number_of_rents = 10000000
    batches = ""
    vehicle_ids_list = list(vehicles_ids.keys())
    client_ids_list = list(client_ids.keys())
    file = open("InsertRent.sql","w")

    def get_random_start_date():
        start_date = datetime.date(2022,1,1)
        start_date += datetime.timedelta(days=randint(0,364))
        return start_date
    
    print("STARTING INSERTING INTO RENTS AT TIME: ", Fore.YELLOW +  str(datetime.datetime.now()))
    
    file.write("DELETE FROM \"VehicleRent\";\n")

    for index in range(number_of_rents):
        rid = uuid.uuid4()

        while rid in rent_ids.keys():
            rid = uuid.uuid4()

        client_id = client_ids_list[randint(0,len(client_ids_list) -1)]
        vehicle_id = vehicle_ids_list[randint(0,len(vehicle_ids_list) -1)]

        start_date = get_random_start_date()
        end_date = start_date + datetime.timedelta(days=randint(0,4))
        total_cost = randint(200,1000)
        comments = ""
        rent = VehicleRent(rid,client_id,vehicle_id,start_date,end_date,total_cost,comments)
        batches += str(rent) + ","
        rent_ids[rid] = 1
        if (index + 1) % 1000 == 0:
            file.write(str(f"INSERT INTO \"VehicleRent\"(\"Id\",\"ClientId\",\"VehicleId\",\"StartDate\",\"EndDate\",\"TotalCost\",\"Comments\") VALUES {batches[:-1]};\n"))
            batches = ""
        
    print(Fore.WHITE +  "STOP INSERT IN RENTS AT: ", Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN +  "\u2713")

    file.close()

if __name__ == "__main__":
    drop_constrains_from_all_tables()
    insert_into_client()
    insert_into_vehicles()
    insert_into_incidents()
    insert_into_rents()
    add_constrains_to_all_tables()



