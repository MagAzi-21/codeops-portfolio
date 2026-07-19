stock = {}
try:
    with open("stock.txt", "r") as f:
        for line in f:
            if line.strip():  
                item, qty = line.strip().split(",")
                stock[item] = int(qty)
except FileNotFoundError:
    print("No stock file yet — starting empty")

# function to adjust stock quantity
def adjust(item, amount):
    stock[item] = stock.get(item, 0) + amount

#test updates
adjust("Paracetamol", 15)
adjust("Amoxicillin", -5)
adjust("Ibuprofen", 8)


low = [item for item, qty in stock.items() if qty < 10]
print("Low stock:", low)

# sstock.txt
with open("stock.txt", "w") as f:
    for item, qty in stock.items():
        f.write(f"{item},{qty}\n")

print("Stock updated and saved to stock.txt successfully!")