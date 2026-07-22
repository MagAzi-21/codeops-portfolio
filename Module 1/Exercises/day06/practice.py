from abc import ABC, abstractmethod
from typing import List

# 1. Spot the SRP Violation


class Report:
    """Handles report data and content generation."""
    def __init__(self, title: str, content: str):
        self.title = title
        self.content = content

    def generate(self) -> str:
        return f"=== {self.title} ===\n{self.content}"


class ReportSaver:
    """Handles saving reports to disk."""
    @staticmethod
    def save_to_file(report: Report, filename: str):
        with open(filename, "w") as f:
            f.write(report.generate())
        print(f"[SRP Saver] Report saved successfully to '{filename}'.")


class ReportEmailer:
    """Handles emailing reports to recipients."""
    @staticmethod
    def send_email(report: Report, recipient: str):
        print(f"[SRP Emailer] Emailing report '{report.title}' to {recipient}...")



# 2. Refactor to OCP

class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass


class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * (self.radius ** 2)


class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height


class Square(Shape):
    def __init__(self, side: float):
        self.side = side

    def area(self) -> float:
        return self.side ** 2


class Triangle(Shape):
    def __init__(self, base: float, height: float):
        self.base = base
        self.height = height

    def area(self) -> float:
        return 0.5 * self.base * self.height


def print_area(shape: Shape):
    """Open for extension (new shapes), closed for modification."""
    print(f"[OCP Shape] Area of {type(shape).__name__}: {shape.area():.2f}")



# 3. Write a Singleton

class AppSettings:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AppSettings, cls).__new__(cls)
            cls._instance.currency = "ETB"
        return cls._instance



# 4. Write a Factory

class ShapeFactory:
    @staticmethod
    def create(kind: str, **kwargs) -> Shape:
        kind = kind.lower().strip()
        if kind == "circle":
            return Circle(radius=kwargs.get("radius", 1.0))
        elif kind == "square":
            return Square(side=kwargs.get("side", 1.0))
        elif kind == "triangle":
            return Triangle(base=kwargs.get("base", 1.0), height=kwargs.get("height", 1.0))
        elif kind == "rectangle":
            return Rectangle(width=kwargs.get("width", 1.0), height=kwargs.get("height", 1.0))
        else:
            raise ValueError(f"Unknown shape type: '{kind}'")


# 5. Write an Observer Pair

class Subscriber(ABC):
    @abstractmethod
    def update(self, news: str):
        pass


class NewsAgency:
    """Subject / Publisher"""
    def __init__(self):
        self._subscribers: List[Subscriber] = []

    def attach(self, subscriber: Subscriber):
        self._subscribers.append(subscriber)

    def detach(self, subscriber: Subscriber):
        self._subscribers.remove(subscriber)

    def notify(self, news: str):
        for subscriber in self._subscribers:
            subscriber.update(news)


class EmailSubscriber(Subscriber):
    def __init__(self, email: str):
        self.email = email

    def update(self, news: str):
        print(f"[Email to {self.email}] BREAKING NEWS: {news}")


class SMSSubscriber(Subscriber):
    def __init__(self, phone: str):
        self.phone = phone

    def update(self, news: str):
        print(f"[SMS to {self.phone}] ALERT: {news}")


if __name__ == "__main__":

    
  #1. TESTING SRP
    report = Report("Q3 Financial Overview", "Overall revenue grew by 18% in Q3.")
    ReportSaver.save_to_file(report, "q3_report.txt")
    ReportEmailer.send_email(report, "finance@addisbank.et")

    
  #2. TESTING OCP
    shapes = [Circle(5), Square(4), Triangle(10, 6)]
    for s in shapes:
        print_area(s)



  #3. TESTING SINGLETON
    app1 = AppSettings()
    app2 = AppSettings()
    print(f"app1 Currency: {app1.currency}")
    print(f"app2 Currency: {app2.currency}")
    print(f"Are app1 and app2 the exact same instance? {app1 is app2}")


    
   # 4. TESTING FACTORY
    c = ShapeFactory.create("circle", radius=7)
    s = ShapeFactory.create("square", side=3)
    t = ShapeFactory.create("triangle", base=4, height=5)
    print(f"Created via Factory: {type(c).__name__} (Area: {c.area()})")
    print(f"Created via Factory: {type(s).__name__} (Area: {s.area()})")
    print(f"Created via Factory: {type(t).__name__} (Area: {t.area()})")

    
   # 5. TESTING OBSERVER PAIR
   
    agency = NewsAgency()
    sub1 = EmailSubscriber("user@example.com")
    sub2 = SMSSubscriber("+251911002233")

    agency.attach(sub1)
    agency.attach(sub2)

    agency.notify("Addis Bank launches new digital system!")