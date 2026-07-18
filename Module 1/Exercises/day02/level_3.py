# Tip Calculator
def bill_calculator(bill, tip_percent, num_people):
    tip_amount = bill * tip_percent/100
    total_amount = bill + tip_amount
    each_pays = total_amount/num_people

    return tip_amount, total_amount, each_pays 

def bill_run():
    bill_amount = float(input("Please Enter the Bill (in Birr): "))
    tip_percent = float(input("Please Enter the Tip Percent (10 0r 15 0r 20) (in %): "))
    num_people_pay = int(input("Please Enter number of People: "))

    tip, total, split_pay = bill_calculator(bill_amount, tip_percent, num_people_pay)


    print("\n Okay Here are the Results \n")
    print(f"Here is the Tip Amount: {tip} Birr")
    print(f"Here is the Total Amount: {total} Birr") 
    print(f"Here is How Much Each of You Will Pay: {split_pay} Birr\n") 

bill_run()





# The Quiz Game

# Ask Question (Math helper fun)
def AskQuestion(questions, right_answer, score):
    print(questions)
    user_answer = input("\nPlease Enter your answer: ")
   
    if user_answer.strip().lower() == right_answer.lower():
            print("Right!!")
            score += 20
    else:
        print(f"Wrong!!\nHere is the right answer: {right_answer}")   

    return score


# Show Result (Display helper fun)
def display(final_score):

    if final_score >= 80:
          print(f"Exellent!! You Know Your Country Well.\nYour score: {final_score}\n")
    elif final_score >= 60:
         print(f"very Good!! You Know Your Country Well.\nYour score: {final_score}\n")
    else:
         print(f"Good Try!! play Again to Get Good Score.\nYour score: {final_score}\n")     


# Quize Runner (Main Runner fun)    
def quiz_run():
    score = 0

    score = AskQuestion("What is the capital city of Ethiopia?", "Addis Ababa", score)
    score = AskQuestion("What currency is used in Ethiopia?", "Birr", score)
    score = AskQuestion("what is historic and walled city in Ethiopia?", "Harar", score)
    score = AskQuestion("In which Continent is Etiopia?", "Africa", score)
    score = AskQuestion("What is Ethiopian endemic animal, which is live in Semen Mount?", "Walia", score)

    display(score)
quiz_run()    




# Function with Default & Return
def cal_fin_pri(price, tax_rate=15, discount=0):
     discount_price = price * discount/100
     pri_aft_dis = price - discount_price
     tax = pri_aft_dis * tax_rate/100
     final_price = pri_aft_dis + tax

     return final_price

def fun_run():
     input_price = float(input("Please Enter the Price: "))
     final_price = cal_fin_pri(input_price, tax_rate=20, discount=10)
     print(f"The Final Price (including tax) is: {final_price} Birr")

fun_run()