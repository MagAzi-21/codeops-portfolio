#Level 3: Advanced Exercises

#8. File Reading & Writing

file_name = "students.txt"

students_data = [
    ("Abebe", 85),
    ("Kebede", 92),
    ("Tigist", 78),
    ("Dawit", 88),
    ("Marta", 95)
]

try:
    with open(file_name, "w") as f:
        for name, score in students_data:
            f.write(f"{name},{score}\n")
    print(f"Successfully wrote {len(students_data)} students to {file_name}.\n")
except IOError as e:
    print(f"Error writing to file: {e}")


try:
    total_score = 0
    count = 0

    with open(file_name, "r") as f:
        print("Student Records Read From File:")
        for line in f:
            line = line.strip()
            if line and "," in line:
                name, score_str = line.split(",")
                score = float(score_str)
                total_score += score
                count += 1
                print(f" - {name}: {score}")

    if count > 0:
        average_score = total_score / count
        print(f"\nAverage Score: {average_score:.2f}")
    else:
        print("\nNo student records found in file.")

except FileNotFoundError:
    print(f"Error: The file '{file_name}' was not found.")
except ValueError:
    print("Error: Invalid score format found in file.")



#9. Error Handling
try:
    num1_input = input("Enter the numerator (first number): ")
    num2_input = input("Enter the denominator (second number): ")

    num1 = float(num1_input)
    num2 = float(num2_input)

    result = num1 / num2
    print(f"Result: {num1} / {num2} = {result}")

except ValueError:
    print("Error: Invalid input! Please enter numeric values only.")
except ZeroDivisionError:
    print("Error: Division by zero is not allowed.")
finally:
    print("Calculation attempt completed.")