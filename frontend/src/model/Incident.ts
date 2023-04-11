interface Incident {
  id: string;
  vehicleId: string;
  location: string;
  description: string;
  cost: number;
  whenHappend: string;
}

export default Incident;
