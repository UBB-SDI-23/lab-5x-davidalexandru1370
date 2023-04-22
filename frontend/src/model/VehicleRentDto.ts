export default interface VehicleRentDto {
  vehicleId: string;
  clientId: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  comments?: string;
}
