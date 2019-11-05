# DungeonLib-JS
Final Assignment for the NHL-Stenden JS course

## The goal of this library
This library was written with one main goal in mind: **Making it easy to create a dungeon crawler**.\s\s
Doing this in JavaScript is because it's a requirement for the course. Makes sense, considering the course is called JavaScript.

## The magic it offers
This library provides the basic ~~magic~~ functionality for the components of the dungeon itself.\s\s
Rooms and their rewards, combat and health, creating the basic Floor, Map, Rooms, Chests and Equipment for you, etc.

Don't take this as creating the game for you though. While it provides a basic for any [_attackable entity_](Entity.js "The base class, Monster and Player are here")
as well as the basic [_square map_](Map.js "The Map class. This was tough"), it doesn't provide the game logic itself.\s\s
If you wanna see that, check out [**The example implementation**](https://fokjem.github.io/DungeonLib-JS/ "Don't copy this code, it's been graded.")
and the [_corresponding source_](docs/index.html "This is messy for my standards, but it gets the job done").

The goal I had in mind while writing this, was to create a library that other students could use for their assignments.\s\s
That meant I also had to take into account not writing in the most complex parts like AI and game ticks, while still providing examples of how to do so.

## How this came to be
I talked to the teachers I had for this class about not wanting to build the same thing they'd seen over and over again with someone else's code.\s\s
I'm a huge fan of open source. That includes readability and the KISS principle. Keep It Simple, Stupid.\s\s
They understood what I meant and felt it would be kinda nice to have a student write something they could grade other students on, I guess.
So after talking to them about it, they were cool enough to tell me that writing a library for it was fine so long as I included an implementation.\s\s
And it wouldn't count for extra credit. That last bit was painful, but expected.

And thus I started this. And missed my first deadline because of bugs and issues and nightmares during daydreams...\s\s
So enjoy all this library has to offer! And don't forget to create an issue if you find a bug or problem in the code.
