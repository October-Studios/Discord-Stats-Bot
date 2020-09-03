import robin_stocks as r
import os
import sys

temp_arr = []
for line in sys.stdin:
  temp_arr = line.split()


username = temp_arr[0]
password = os.environ.get(temp_arr[1])


def main():
    login = r.login(username, password)
    my_stocks = r.build_holdings()
    for key, value in my_stocks.items():
        print(key, value)
        sys.stdout.flush()
    r.logout()
    os.remove("/home/ubuntu/.tokens/robinhood.pickle")


if __name__ == "__main__":
    main()
