import robin_stocks as r
import os


password = os.environ.get("ROBINHOOD")


def main():
    login = r.login("crhowell3@gmail.com", password)
    my_stocks = r.build_holdings()
    for key, value in my_stocks.items():
        print(key, value)


if __name__ == "__main__":
    main()
