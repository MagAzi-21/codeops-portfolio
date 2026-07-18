# Temptrature Lable
temp = None 
temp = input("Please Enter Temprature in C: ")
int_temp = float(temp)

if int_temp < 15:
    print("Cold")
elif int_temp >= 15 and int_temp <= 28:
    print("Warm")
else:
    print("Hot")





# Receipt Loop
for receipt in range(1, 11):
    print(f"Receipt #{receipt}")




# Even Numbers in while loop
num =  1
while num < 21:
    if num%2 == 0:
        print(num)
    num += 1



# Another option in for loop
for num in range(1,21):
    if num%2 == 0:
        print(num)



# Discount Function
def apply_discount(price, percent=10/100):
    return price -(price*percent)
    
print(apply_discount(100))
print(apply_discount(100, 20/100))

    

# Countdown
count = 5
while count > 0:
    print(count)
    count -= 1
print("Liftoff!")    