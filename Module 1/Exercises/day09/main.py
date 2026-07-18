# import heapq

# payment = []
# heapq.heappush(payment, (1, "basketball"))
# heapq.heappush(payment, (2, "football"))
# heapq.heappush(payment, (3, "handball"))

# heapq.heappop(payment)


import heapq
payments = []
heapq.heappush(payments, (1, "Rent")) # priority 1
heapq.heappush(payments, (5, "Snacks")) # priority 5
heapq.heappush(payments, (2, "Salary")) # priority 2
heapq.heappop(payments) # (1, "Rent") — most urgent