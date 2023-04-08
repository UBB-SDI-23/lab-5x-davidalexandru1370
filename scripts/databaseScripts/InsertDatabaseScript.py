from faker import Faker
from datetime import datetime
client_file_name = "InsertClient.sql"
fake = Faker()

def create_file_for_client_table():
    data = {}
    for index in range(0,10000000):
        data[index] = 1
    
if __name__ == "__main__":
    create_file_for_client_table()


