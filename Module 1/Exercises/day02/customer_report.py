customers = [
 ("Noal", 1500), ("Kale", 700), ("Lucas", 200),
 ("Abdi", 1200), ("Hale", 500), ("Weya", 100)
]
def tier(balance):
    if balance >= 1000:
        return "Premium"
    elif balance >= 500:
        return "Standard"
    return "Basic"
for name, balance in customers:
    print(f"{name}: {tier(balance)} ({balance} ETB)")