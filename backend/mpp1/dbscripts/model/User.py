from Utilities import get_string_in_single_quotes
class User():
    def __init__(self, id, username, password, bio, location, birthday, gender,marital_status):
        self.__id = id
        self.__username = username
        self.__password = password
        self.__bio = bio
        self.__location = location
        self.__birthday = birthday
        self.__gender = gender
        self.__marital_status = marital_status

    def get_user_string(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__username)}," + \
               f"{get_string_in_single_quotes(self.__password)})"

    
    def get_user_profile_string(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__bio)}," + \
               f"{get_string_in_single_quotes(self.__location)}," + \
               f"{get_string_in_single_quotes(self.__birthday)}," + \
               f"{self.__gender}," + \
               f"{self.__marital_status})"


    def __str__(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__username)}," + \
               f"{get_string_in_single_quotes(self.__password)}," + \
               f"{get_string_in_single_quotes(self.__bio)}," + \
               f"{get_string_in_single_quotes(self.__location)}," + \
               f"{get_string_in_single_quotes(self.__birthday)}," + \
               f"{self.__gender}," + \
               f"{self.__marital_status})"
