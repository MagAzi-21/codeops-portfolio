# 1. Vehicle hierarchy & 5. Abstract method
from abc import ABC, abstractmethod
class Vehicle(ABC):
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def describe(self):
        print(f"Vehicle: {self.make} {self.model} ({self.wheels()} wheels)")

    @abstractmethod
    def wheels(self):
        pass


class Car(Vehicle):
    def __init__(self, make, model):
        super().__init__(make, model)

    def wheels(self):
        return 4


# 2. Use super() & 3. Override
class Truck(Vehicle):
    def __init__(self, make, model, capacity):
        super().__init__(make, model)
        self.capacity = capacity

    def wheels(self):
        return 6

    def describe(self):
        print(f"Truck: {self.make} {self.model} ({self.wheels()} wheels) - Capacity: {self.capacity} tons")


# 4. Polymorphism
vehicles = [
    Car("Toyota", "Corolla"),
    Truck("Isuzu", "NPR", 5),
    Car("Hyundai", "Elantra"),
    Truck("Volvo", "FH16", 25)
]

for v in vehicles:
    v.describe()