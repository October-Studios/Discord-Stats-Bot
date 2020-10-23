import spacy
nlp = spacy.load('en_core_web_sm')


def main():
    doc = nlp(u'Tesla is looking at buying U.S. startup for $6 million')
    for token in doc:
        print(token.text, token.pos_, token.dep_)


if __name__ == "__main__":
    main()
