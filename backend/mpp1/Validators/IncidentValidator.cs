using mpp1.Exceptions;
using mpp1.Model;

namespace mpp1.Validators;

public static class IncidentValidator
{
    public static void ValidateIncident(Incident incident, Vehicle vehicle)
    {
        if (incident.WhenHappend < vehicle.FabricationDate)
        {
            throw new ValidationException("Incident date can not be earlier than vehicle fabrication date!");
        }
    }
}