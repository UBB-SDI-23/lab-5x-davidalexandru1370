ALTER TABLE "Client" ADD CONSTRAINT "PK_Client" PRIMARY KEY("Id");
ALTER TABLE "Vehicle" ADD CONSTRAINT "PK_Vehicle" PRIMARY KEY("Id");
ALTER TABLE "VehicleRent" ADD CONSTRAINT "PK_VehicleRent" PRIMARY KEY ("Id");
ALTER TABLE "VehicleRent" ADD CONSTRAINT "FK_VehicleRent_ClientId" FOREIGN KEY("ClientId") REFERENCES "Client"("Id");
ALTER TABLE "VehicleRent" ADD CONSTRAINT "FK_VehicleRent_VehicleId" FOREIGN KEY("VehicleId") REFERENCES "Vehicle"("Id");
CREATE INDEX "IX_VehicleRent_ClientId" on "VehicleRent"("ClientId");CREATE INDEX "IX_VehicleRent_VehicleId" on "VehicleRent"("VehicleId");