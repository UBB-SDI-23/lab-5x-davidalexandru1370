using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpp1.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionFieldInIncident : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Incidents",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Incidents");
        }
    }
}
