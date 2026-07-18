# Assigning Variables and Data types
full_name = "Mikiyas Abesha"
age = 19
height = 1.65
is_student = True
favorite_food = "Rice"

print(f"My name is {full_name}. I am {age} years old and my height is {height}. I am a student. My favorite food is {favorite_food}.")



# Arithimetic Oprations
num_1 = None 
num_2 = None
num_1 = int(input("Please Enter Any Two Numbers!\n\nEnter the First Number: "))
num_2 = int(input("Enter the Next Numbers: "))


sum = num_1 + num_2
sub = num_1 - num_2
pro = num_1 * num_2
if num_2 == 0:
    div = "Not defined"
    floor_div = "Not defined"
    remi = "Not defined"
else:
    div = num_1 / num_2
    floor_div = num_1 // num_2
    remi = num_1 % num_2



print(f"Here are the results.\n The sum: {sum}\n The diffrence: {sub}\n The product: {pro}\n The division: {div}\n The floor division: {floor_div}\n The remider: {remi}")



# Type Conversion
birth_year = None
birth_year = input("Please Enter Your Birth Year: ")
age = 2026 - int(birth_year)
print(f"You are {age} years old!")



# Score Grading
score = None
score = float(input("Please Enter Your Score: "))

if score >= 50:
    print("Pass")
else:
    print("Fail")
