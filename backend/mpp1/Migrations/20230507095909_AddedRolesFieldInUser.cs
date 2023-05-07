using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mpp1.Migrations
{
    /// <inheritdoc />
    public partial class AddedRolesFieldInUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Role",
                table: "UserProfile",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "UserProfile");
        }
    }
}
