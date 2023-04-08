from faker import Faker
import datetime
import uuid
from random import randint
from Utilities import get_string_in_quotes
from model.Client import Client
from colorama import Fore
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

    print("STARTING INSERTING AT TIME: ", Fore.YELLOW +  datetime.datetime.now())
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
    print("STOP INSERTING AT", datetime.datetime.now(), Fore.GREEN + "\u2713")


def insert_into_vehicles():
    file = open("InsertVehicles.sql","w")

    print(Fore.WHITE +  "START INSERT IN VEHICLES AT:", Fore.YELLOW + str(datetime.datetime.now()))

    file.close()
    print(Fore.WHITE +  "STOP INSERT IN VEHICLES AT: ", Fore.YELLOW + str(datetime.datetime.now()), Fore.GREEN +  "\u2713")

if __name__ == "__main__":
    #create_file()
    insert_into_vehicles()



