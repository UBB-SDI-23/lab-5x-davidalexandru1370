export default interface VehicleRentDto {
  id: string;
  vehicleId: string;
  clientId: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  comments?: string;
}
