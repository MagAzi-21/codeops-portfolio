# 7. Modules & Import Test
from utils import add_tax

item_price = 1000.00
final_price = add_tax(item_price)

print(f"Base Price: {item_price} ETB")
print(f"Price with Tax (15%): {final_price} ETB")


custom_tax_price = add_tax(item_price, rate=0.10)
print(f"Price with 10% Tax: {custom_tax_price} ETB")