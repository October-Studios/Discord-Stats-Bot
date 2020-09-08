import robin_stocks as r
import os
import sys

temp_arr = []
for line in sys.stdin:
    temp_arr = line.split()


username = temp_arr[0]
password = os.environ.get(temp_arr[1])
ticker = temp_arr[2]


def main():
    login = r.login(username, password)
    my_stocks = r.stocks.get_latest_price(ticker)
    print(my_stocks)
    sys.stdout.flush()
    r.logout()


if __name__ == "__main__":
    main()
