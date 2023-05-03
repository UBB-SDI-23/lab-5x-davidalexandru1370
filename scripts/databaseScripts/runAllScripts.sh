#!/bin/bash
psql -h localhost -d RentACar -U postgres -p 5432 -q -f DropConstraints.sql
psql -h localhost -d RentACar -U postgres -p 5432 -q -f InsertUser.sql
psql -h localhost -d RentACar -U postgres -p 5432 -q -f InsertClient.sql
psql -h localhost -d RentACar -U postgres -p 5432 -q -f InsertVehicle.sql
psql -h localhost -d RentACar -U postgres -p 5432 -q -f InsertIncident.sql
psql -h localhost -d RentACar -U postgres -p 5432 -q -f InsertRent.sql
psql -h localhost -d RentACar -U postgres -p 5432 -q -f AddConstraints.sql
