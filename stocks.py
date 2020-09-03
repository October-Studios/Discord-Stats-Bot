import robin_stocks as r
import os
import sys

password = os.environ.get("ROBINHOOD")


def main():
    login = r.login("crhowell3@gmail.com", password)
    my_stocks = r.build_holdings()
    for key, value in my_stocks.items():
      print(key, value)
      sys.stdout.flush()


if __name__ == "__main__":
    main()
