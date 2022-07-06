function getBotResponse(input) {
    //rock paper scissors
    if (input == "Are donations secured?" || input == "Donation secure?") {
        return "We have end to end encryption do not worry!";
    } else if (input == "How could I contribute?" || input == "How can I contribute?" || input == "How could I contribute" || input == "How can I contribute") {
        return "Please explore through our features";
    } else if (input == "Tell me about your website" || input == "About helping hand") {
        return "This is a user friendly website that allows everyone to donate to needy organizations and create a system where in we could help every person in need and make it a better place to live in. ";
    } else if (input == "Hello?" || input == "Hello" || input == "Hi?" || input == 'Hi') {
        return "Hi How can I help you ? "
    }

    // Simple responses
    if (input == "Greetings!") {
        return "How can I help you?";
    } else if (input == "Bye") {
        return "Talk to you later!";
    } else {
        return "Try asking something else!";
    }
}