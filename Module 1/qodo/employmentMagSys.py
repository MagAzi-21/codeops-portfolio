from abc import ABC, abstractmethod

class Employee(ABC):

    def __init__ (self, empid, name, salary):
        self.empid = empid
        self.name = name
        self.__salary = salary

    @property
    def salary(self):
        return self.__salary

    #Qodo test this method
    @salary.setter
    def salary(self, salary):
        if salary <= 0:
            print("Salary cannot be negative or zero.")
        self.__salary = salary

    #Qodo test this method
    def display(self):
        print(f"Employee Id: {self.empid}")
        print(f"Employee Name: {self.name}")
        print(f"Employee Salary: {self.salary}")

    #Qodo test this method
    @abstractmethod
    def calculate_salary(self):
        ...


class FTEmployee(Employee):
    def calculate_salary(self):
        return self.salary

    

class PTEmployee(Employee):
    def __init__(self, empid, name, salary, hours):
        super().__init__(empid, name, salary)
        self.hours = hours

    def calculate_salary(self):
            return self.salary * self.hours


abe = FTEmployee("0101", "Abebe Kebede", 50000)
alm = FTEmployee("0102", "Alemayehu Kebede", 70000)


alm.display()
print(alm.calculate_salary())

        


    
        