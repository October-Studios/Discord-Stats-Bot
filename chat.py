from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer


def main():
    chatbot = ChatBot('New Bot')
    trainer = ChatterBotCorpusTrainer(chatbot)
    trainer.train("chatterbot.corpus.english")
    print(chatbot.get_response("Hello, how are you today?"))


if __name__ == "__main__":
    main()
