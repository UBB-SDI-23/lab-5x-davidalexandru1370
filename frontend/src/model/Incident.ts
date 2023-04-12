interface Incident {
  id: string;
  vehicleId: string;
  location: string;
  cost: number;
  whenHappend: string;
  description: string;
}

export default Incident;
