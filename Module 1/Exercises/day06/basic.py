# 1. Single Responsibility Principle (SRP)

from abc import ABC, abstractmethod
class Employee:

    def __init__(self, name: str, base_salary: float):
        self.name = name
        self.base_salary = base_salary


class SalaryCalculator:

    @staticmethod
    def calculate_net_salary(employee: Employee, tax_rate: float = 0.15) -> float:
        return employee.base_salary * (1 - tax_rate)


class EmployeeRepository:

    @staticmethod
    def save_to_file(employee: Employee, filename: str):
        with open(filename, "a") as f:
            f.write(f"Employee: {employee.name}, Salary: {employee.base_salary}\n")
        print(f"[SRP] Saved {employee.name} to file.")


class EmailService:

    @staticmethod
    def send_email(employee: Employee, message: str):
        print(f"[SRP] Email sent to {employee.name}: {message}")



# 2. Open/Closed Principle (OCP)


class EmployeeBonus(ABC):

    @abstractmethod
    def calculate_bonus(self, base_salary: float) -> float:
        pass


class Developer(EmployeeBonus):

    def calculate_bonus(self, base_salary: float) -> float:
        return base_salary * 0.20


class Manager(EmployeeBonus):

    def calculate_bonus(self, base_salary: float) -> float:
        return base_salary * 0.35


class Intern(EmployeeBonus):

    def calculate_bonus(self, base_salary: float) -> float:
        return base_salary * 0.05


def calculate_bonus(employee_role: EmployeeBonus, base_salary: float) -> float:
    return employee_role.calculate_bonus(base_salary)



# 3. Liskov Substitution Principle (LSP)


class Bird:

    def __init__(self, name: str):
        self.name = name


class FlyingBird(Bird, ABC):

    @abstractmethod
    def fly(self):
        pass


class Sparrow(FlyingBird):

    def fly(self):
        print(f"[LSP] {self.name} is flying high!")


class Penguin(Bird):

    def swim(self):
        print(f"[LSP] {self.name} cannot fly, but it swims gracefully!")


def make_bird_fly(bird: FlyingBird):
    bird.fly()



# 4. Identify SOLID Violations

"""
VIOLATIONS IDENTIFIED IN QUESTION 4:
------------------------------------
1. SRP (Single Responsibility Principle) Violation:
   The Account class handles business logic (withdraw), notification delivery 
   (EmailNotifier), and database persistence (save_to_db).

2. DIP (Dependency Inversion Principle) Violation:
   The Account class directly instantiates concrete EmailNotifier() inside 
   its constructor instead of depending on an abstraction/interface.

3. OCP (Open/Closed Principle) Violation:
   If we want to change notification to SMS or database storage engine, 
   we must modify the Account class code directly.
"""