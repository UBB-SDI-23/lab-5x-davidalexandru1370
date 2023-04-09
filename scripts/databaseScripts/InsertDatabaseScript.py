from faker import Faker
import datetime
import uuid
from random import randint
from Utilities import get_string_in_quotes
from model.Client import Client
from model.Vehicle import Vehicle
from colorama import Fore
from Constants import counties_car_plate, car_brands

client_file_name = "InsertClient.sql"
fake = Faker()
client_ids = {}
vehicles_ids = {}    

def create_file():
    global client_ids
    file = open(client_file_name, "w")
    file.write("DELETE FROM \"Client\"\n")
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
            file.write(str(f"INSERT INTO \"Client\"(\"Id\",\"Name\",\"CardNumber\",\"CNP\",\"Birthday\",\"Nationality\") VALUES {batches[:-1]};"))
            file.write("\n")
            batches = ""    
    file.close()
    print(Fore.WHITE + "STOP INSERTING INTO CLIENT AT", datetime.datetime.now(), Fore.GREEN + "\u2713")


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
    #file.write("DROP INDEX \"PK_Vehicle\";\n")

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
        fabrication_date = datetime.date(randint(2000,2022),1,1)
        fabrication_date += datetime.timedelta(days=randint(0,364))
        vehicle = Vehicle(vid,brand,horse_power,car_plate,number_of_seats,engine_capacity,fabrication_date)
        batches += str(vehicle) + ","
        if (index + 1) % 1000 == 0:
            file.write(str(f"INSERT INTO \"Vehicle\"(\"Id\",\"Brand\",\"HorsePower\",\"CarPlate\",\"NumberOfSeats\",\"EngineCapacity\",\"FabricationDate\") VALUES {batches[:-1]};\n"))
            batches = ""
    #???
    #file.write("Cluster \"Vehicle\" using \"PK_Vehicle\"")
    file.close()
    print(Fore.WHITE +  "STOP INSERT IN VEHICLES AT: ", Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN +  "\u2713")

if __name__ == "__main__":
    #create_file()
    insert_into_vehicles()



