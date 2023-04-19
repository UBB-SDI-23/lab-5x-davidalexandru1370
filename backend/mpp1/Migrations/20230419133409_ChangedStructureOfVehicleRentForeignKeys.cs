using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpp1.Migrations
{
    /// <inheritdoc />
    public partial class ChangedStructureOfVehicleRentForeignKeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_VehicleRent_ClientId",
                table: "VehicleRent",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_VehicleRent_VehicleId",
                table: "VehicleRent",
                column: "VehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleRent_Client_ClientId",
                table: "VehicleRent",
                column: "ClientId",
                principalTable: "Client",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleRent_Vehicle_VehicleId",
                table: "VehicleRent",
                column: "VehicleId",
                principalTable: "Vehicle",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VehicleRent_Client_ClientId",
                table: "VehicleRent");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleRent_Vehicle_VehicleId",
                table: "VehicleRent");

            migrationBuilder.DropIndex(
                name: "IX_VehicleRent_ClientId",
                table: "VehicleRent");

            migrationBuilder.DropIndex(
                name: "IX_VehicleRent_VehicleId",
                table: "VehicleRent");
        }
    }
}
