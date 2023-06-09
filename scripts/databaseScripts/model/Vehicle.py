from Utilities import get_string_in_single_quotes

class Vehicle():
    def __init__(self, id, brand, horse_power, car_plate, number_of_seats, engine_capacity, fabrication_date, user_id) -> None:
        self.__id = id
        self.__brand = brand
        self.__horse_power = horse_power
        self.__car_plate = car_plate
        self.__number_of_seats = number_of_seats
        self.__engine_capacity = engine_capacity
        self.__fabrication_date = fabrication_date
        self.__user_id = user_id

    def __str__(self) -> str:
        return f"({get_string_in_single_quotes(self.__id)}," + \
               f"{get_string_in_single_quotes(self.__brand)},"+ \
               f"{self.__horse_power}," + \
               f"{get_string_in_single_quotes(self.__car_plate)}," + \
               f"{self.__number_of_seats}," + \
               f"{self.__engine_capacity}," + \
               f"{get_string_in_single_quotes(self.__fabrication_date)}," + \
               f"{get_string_in_single_quotes(self.__user_id)})"
               
        