using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpp1.Migrations
{
    /// <inheritdoc />
    public partial class AddedPreferencesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Preferences",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    NumberOfItemsPerPage = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferences", x => x.Id);
                });
            // migrationBuilder.Sql(
            //     "INSERT INTO Preferences(Id,NumberOfItemsPerPage) values ('dbf328b9-f53d-4908-818b-802e5a4c4ab4',12)");
            //migrationBuilder.InsertData(table: "Preferences", columns:["Id", "NumberOfItemsPerPage"], values: ["dbf328b9-f53d-4908-818b-802e5a4c4ab4",12]);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Preferences");
        }
    }
}
