from Utilities import get_string_in_single_quotes

class Incident():
    def __init__(self, id, vehicle_id, location, description, cost, when_happend, user_id):
        self.__id = id
        self.__vehicle_id = vehicle_id
        self.__location = location
        self.__description = description
        self.__cost = cost
        self.__when_happend = when_happend
        self.__user_id = user_id

    def __str__(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__vehicle_id)}," + \
               f"{get_string_in_single_quotes(self.__location)}," + \
               f"{get_string_in_single_quotes(self.__description)}," + \
               f"{self.__cost}," + \
               f"{get_string_in_single_quotes(self.__when_happend)}," + \
               f"{get_string_in_single_quotes(self.__user_id)})"
