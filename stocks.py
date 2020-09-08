import robin_stocks as r
import os
import sys

stock_list = ["TSLA", "AAPL", "NVDA", "GOOGL", "INTC", "AMD", "MSFT", "IBM"]

temp_arr = []
for line in sys.stdin:
    temp_arr = line.split()

username = temp_arr[0]
password = os.environ.get(temp_arr[1])
ticker = temp_arr[2]


def main():
    if ticker == 'list':
        total_list = ""
        for symbol in stock_list:
            total_list += symbol + " "
        print(total_list)
        sys.stdout.flush()
    elif stock_list.count(ticker) == 0:
        print("Invalid/unsupported symbol!")
        sys.stdout.flush()
    else:
        login = r.login(username, password)
        my_stocks = r.stocks.get_latest_price(ticker)
        print("$" + my_stocks[0])
        sys.stdout.flush()
        r.logout()


if __name__ == "__main__":
    main()
