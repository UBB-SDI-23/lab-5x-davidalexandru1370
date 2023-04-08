from Utilities import get_string_in_single_quotes
class Client():
    def __init__(self,id,name,card_number,cnp,birthday,nationality):
        self.__id = id
        self.__name = name
        self.__card_number = card_number
        self.__cnp = cnp
        self.__birthday = birthday
        self.__nationality = nationality


    def __str__(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__name)}," + \
               f"{get_string_in_single_quotes(self.__card_number)}," + \
               f"{get_string_in_single_quotes(self.__cnp)}," + \
               f"{get_string_in_single_quotes(self.__birthday)}," + \
               f"{get_string_in_single_quotes(self.__nationality)})"
        