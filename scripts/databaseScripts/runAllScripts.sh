#!/bin/bash

psql -h localhost -d RentACar -U postgres -p 5432 -f DropConstraints.sql
psql -h localhost -d RentACar -U postgres -p 5432 -f InsertClient.sql
psql -h localhost -d RentACar -U postgres -p 5432 -f InsertVehicle.sql
psql -h localhost -d RentACar -U postgres -p 5432 -f InsertClient.sql
psql -h localhost -d RentACar -U postgres -p 5432 -f InsertRent.sql
psql -h localhost -d RentACar -U postgres -p 5432 -f AddConstraints.sql

