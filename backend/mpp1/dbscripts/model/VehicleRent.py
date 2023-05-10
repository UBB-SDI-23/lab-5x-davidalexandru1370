from Utilities import get_string_in_single_quotes
class VehicleRent():
    def __init__(self, id, client_id, vehicle_id, start_date, end_date, total_cost, comments, user_id):
        self.__id = id
        self.__client_id = client_id
        self.__vehicle_id = vehicle_id
        self.__start_date = start_date
        self.__end_date = end_date
        self.__total_cost = total_cost
        self.__comments = comments
        self.__user_id = user_id

    def __str__(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__client_id)}," + \
               f"{get_string_in_single_quotes(self.__vehicle_id)}," + \
               f"{get_string_in_single_quotes(self.__start_date)}," + \
               f"{get_string_in_single_quotes(self.__end_date)}," + \
               f"{self.__total_cost}," + \
               f"{get_string_in_single_quotes(self.__comments)}," + \
               f"{get_string_in_single_quotes(self.__user_id)})"
               