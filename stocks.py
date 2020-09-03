import robin_stocks as r
import os
import sys

username = sys.stdin[0]
password = os.environ.get(sys.stdin[1])


def main():
    login = r.login(username, password)
    my_stocks = r.build_holdings()
    for key, value in my_stocks.items():
        print(key, value)
        sys.stdout.flush()


if __name__ == "__main__":
    main()
