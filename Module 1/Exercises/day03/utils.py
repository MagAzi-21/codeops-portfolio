"""
Utility module for Day 3 exercises.
"""

def add_tax(price, rate=0.15):
    """
    Accepts a base price and a tax rate (default 15%).
    Returns the final price including tax.
    """
    return price * (1 + rate)