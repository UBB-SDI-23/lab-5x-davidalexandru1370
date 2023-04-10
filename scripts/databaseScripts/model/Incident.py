from Utilities import get_string_in_quotes

class Incident():
    def __init__(self, id, location, description, cost, when_happend):
        self.__id = id
        self.__location = location
        self.__description = description
        self.__cost = cost
        self.__when_happend = when_happend

    def __str__(self) -> str:
        return f"({get_string_in_quotes(self.__id)}," + \
               f"{get_string_in_quotes(self.__location)}," + \
               f"{get_string_in_quotes(self.__description)}," + \
               f"{self.__cost}," + \
               f"{get_string_in_quotes(self.__when_happend)})" 