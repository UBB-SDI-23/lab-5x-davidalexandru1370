#!/bin/bash
cat DropConstraints.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q
cat ClearAllTables.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q
cat InsertUser.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q
cat InsertClient.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q 
cat InsertVehicle.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q
cat InsertIncident.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q
cat InsertRent.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q
cat AddConstraints.sql | sudo docker exec -i backend-db psql -U postgres RentACar -q 
