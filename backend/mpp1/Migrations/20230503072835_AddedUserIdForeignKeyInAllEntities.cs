using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpp1.Migrations
{
    /// <inheritdoc />
    public partial class AddedUserIdForeignKeyInAllEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "VehicleRent",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Vehicle",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Incidents",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "Client",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_VehicleRent_UserId",
                table: "VehicleRent",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicle_UserId",
                table: "Vehicle",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Incidents_UserId",
                table: "Incidents",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Client_UserId",
                table: "Client",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Client_User_UserId",
                table: "Client",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Incidents_User_UserId",
                table: "Incidents",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicle_User_UserId",
                table: "Vehicle",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VehicleRent_User_UserId",
                table: "VehicleRent",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_User_UserId",
                table: "Client");

            migrationBuilder.DropForeignKey(
                name: "FK_Incidents_User_UserId",
                table: "Incidents");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicle_User_UserId",
                table: "Vehicle");

            migrationBuilder.DropForeignKey(
                name: "FK_VehicleRent_User_UserId",
                table: "VehicleRent");

            migrationBuilder.DropIndex(
                name: "IX_VehicleRent_UserId",
                table: "VehicleRent");

            migrationBuilder.DropIndex(
                name: "IX_Vehicle_UserId",
                table: "Vehicle");

            migrationBuilder.DropIndex(
                name: "IX_Incidents_UserId",
                table: "Incidents");

            migrationBuilder.DropIndex(
                name: "IX_Client_UserId",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "VehicleRent");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Vehicle");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Incidents");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Client");
        }
    }
}
