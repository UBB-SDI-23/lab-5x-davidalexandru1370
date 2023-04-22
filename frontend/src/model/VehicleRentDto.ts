export default interface VehicleRentDto {
  id: string;
  vehicleId: string;
  clientId: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  comments?: string;
}
