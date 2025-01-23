import random

# User input
userName = input("Enter your name: ")
print("Welcome to the Fruit Word Game, " + userName + "!")

# Define the list of words
word_list = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", 
             "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", "plum",
             "quince", "raspberry", "strawberry", "tangerine", "watermelon"]

# Randomly choose a word
chosen_word = random.choice(word_list)
hidden_word = "_" * len(chosen_word)  # Display blanks for the word
guesses = ""  # Track guesses
turns = 10  # Number of attempts

print(f"Guess the word: {hidden_word}")

# Game loop
while turns > 0:
    failed = 0  # Count incorrect guesses
    display_word = ""

    # Check guessed characters
    for char in chosen_word:
        if char in guesses:
            display_word += char  # Reveal correct guess
        else:
            display_word += "_"
            failed += 1

    print("Current word: " + display_word)

    # Check if the player has guessed the word
    if failed == 0:
        print("You Win!")
        print("The word is: " + chosen_word)
        break

    # Ask for user input
    guess = input("Guess a character: ").lower()

    if guess in guesses:
        print("You already guessed that letter.")
        continue

    guesses += guess  # Add guess to the list

    # Check if guess is correct
    if guess not in chosen_word:
        turns -= 1
        print("Wrong guess!")
        print(f"You have {turns} more guesses left.")

        if turns == 0:
            print("You Lose!")
            print("The word was: " + chosen_word)
