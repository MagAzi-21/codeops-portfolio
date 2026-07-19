#Basic Exercises

#1. Lists & Tuples
foods = ["Tibs", "Shiro", "Doro Wat", "Injera", "Pasta", "Burger"]
cities = ["Addis Ababa", "Hawassa", "Adama", "Bahir Dar", "Gondar"]

print("First city:", cities[0])
print("Last city:", cities[-1])

cities.append("Diredawa")
print("After append:", cities)


removed_city = cities.pop(1)
print(f"Removed '{removed_city}':", cities)

ethiopia_coords = (9.145, 40.4896) 
lat, lon = ethiopia_coords
print(f"Unpacked Coordinates -> Latitude: {lat}, Longitude: {lon}\n")


#2. Dictionaries
student = {
    "name": "Abebe",
    "age": 20,
    "grade": "A",
    "city": "Addis Ababa",
    "department": "Computer Science"
}


print("Student Name:", student["name"])
print("Department:", student["department"])
print("Grade:", student["grade"])


student["phone"] = "0987654321"


student["grade"] = "A+"

print("Updated Student Dict:", student)
print()


#3.Sets
names_with_duplicates = ["Mickey", "Abebe", "Kebede", "Mickey", "Tigist", "Abebe"]


unique_names = set(names_with_duplicates)
print("Unique names set:", unique_names)


unique_names.add("Sara")
print("After adding 'Sara':", unique_names)