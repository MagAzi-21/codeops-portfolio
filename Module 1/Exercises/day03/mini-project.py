#Exercise 10: Full Program – Inventory Manager

DEFAULT_FILENAME = "inventory_data.txt"

def display_menu():
    print("      INVENTORY MANAGER MENU      ")
    print("1. Add new product")
    print("2. Update quantity")
    print("3. View all products")
    print("4. Save to file")
    print("5. Load from file")
    print("6. Exit")
   

def add_product(inventory):
    product = input("Enter product name: ").strip().capitalize()
    if not product:
        print("Product name cannot be empty.")
        return
    if product in inventory:
        print(f"'{product}' already exists! Use Option 2 to update quantity.")
        return
    
    try:
        qty = int(input(f"Enter initial quantity for '{product}': "))
        if qty < 0:
            print("Quantity cannot be negative.")
            return
        inventory[product] = qty
        print(f"Successfully added '{product}' with quantity {qty}.")
    except ValueError:
        print("Error: Quantity must be a valid integer.")

def update_quantity(inventory):
    product = input("Enter product name to update: ").strip().capitalize()
    if product not in inventory:
        print(f"Error: '{product}' was not found in inventory.")
        return
    
    try:
        new_qty = int(input(f"Enter new quantity for '{product}' (Current: {inventory[product]}): "))
        if new_qty < 0:
            print("Quantity cannot be negative.")
            return
        inventory[product] = new_qty
        print(f"Updated '{product}' quantity to {new_qty}.")
    except ValueError:
        print("Error: Quantity must be a valid integer.")

def view_products(inventory):
    if not inventory:
        print("\nInventory is currently empty.")
        return
    
   
    print(f"{'PRODUCT':<18} | {'QUANTITY':<8}")
  
    for product, qty in sorted(inventory.items()):
        print(f"{product:<18} | {qty:<8}")

def save_to_file(inventory, filename=DEFAULT_FILENAME):
    try:
        with open(filename, "w") as f:
            for product, qty in inventory.items():
                f.write(f"{product},{qty}\n")
        print(f"Successfully saved {len(inventory)} items to '{filename}'.")
    except IOError as e:
        print(f"Error saving to file: {e}")

def load_from_file(filename=DEFAULT_FILENAME):
    inventory = {}
    try:
        with open(filename, "r") as f:
            for line in f:
                line = line.strip()
                if line and "," in line:
                    product, qty_str = line.split(",", 1)
                    try:
                        inventory[product.strip().capitalize()] = int(qty_str.strip())
                    except ValueError:
                        continue
        print(f"Successfully loaded {len(inventory)} items from '{filename}'.")
    except FileNotFoundError:
        print(f"File '{filename}' not found. Starting with an empty inventory.")
    return inventory

def main():
    
    inventory = {}
    
    inventory = load_from_file()

    while True:
        display_menu()
        choice = input("Enter choice (1-6): ").strip()

        if choice == "1":
            add_product(inventory)
        elif choice == "2":
            update_quantity(inventory)
        elif choice == "3":
            view_products(inventory)
        elif choice == "4":
            save_to_file(inventory)
        elif choice == "5":
            inventory = load_from_file()
        elif choice == "6":
            print("\nExiting Inventory Manager. Goodbye!")
            break
        else:
            print("Invalid choice! Please select a number from 1 to 6.")

if __name__ == "__main__":
    main()