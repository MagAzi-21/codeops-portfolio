# Grade Classifier

score = None
score = float(input("Please Enter Your Score: "))

if 90 <= score <= 100:
    print("Exellent!")
elif 80 <= score <= 89:
    print("Very Good!")
elif 70 <= score <= 79:
    print("Good!")
elif 60 <= score <= 69:
    print("Pass!")
else:
    print("Fail")    




# Number Pattern
for num in range(1, 21):
    if num%2 != 0 and num%5 == 0:
        print(num)