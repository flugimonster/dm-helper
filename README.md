DM Helper is an app designed to help DM's run their games, keeping score of a multitude of things during battles, and showing the players exactly what they want them to see.

Written in Electron, JS and React, DM Helper has two components - a control panel for the DM and a display component for the players.

DM Helper was designed to run in two seperate windows to allow it to be cast to a secondary screen.

Adding a character:



https://user-images.githubusercontent.com/33065842/124391360-f0823f80-dcf8-11eb-8efc-93db63ffdd0a.mp4




This can be made and saved in advanced, then loaded at the table in order to save time.

Saving an encounter \ character \ party \ enemies:


https://user-images.githubusercontent.com/33065842/124391370-03950f80-dcf9-11eb-89a2-66d22b0380cf.mp4



Loading an encounter:


https://user-images.githubusercontent.com/33065842/124391377-07c12d00-dcf9-11eb-9c43-996170aff50f.mp4



You can load several files into one encounter, making customizing encounters a breeze.


Running a fight:
Balloo and his friends were treading in the fabled uncharted territory of the leaving room, when suddenly they encountered a living Statue.
Balloo, the party's leader was quick on his feet and was the first one to react, he cast Bark at 3rd level, the Statue 15 points of damage and ending his turn.


https://user-images.githubusercontent.com/33065842/124391387-14de1c00-dcf9-11eb-8cbf-b0a14f203cd3.mp4




The fight continued for several more rounds.
The Statue used his strength and wit to cause the party much angst.
He saw Cactus lying on the ground, grasping for air, fighting for his life.
Without hesitation, the srtacture blew past Pinky, who took an attack of opportunity against him, dealing 15 points of damage and causing the statue start deteriorating, then, with a swift swing of his massive hands, squished poor old Cactus.


https://user-images.githubusercontent.com/33065842/124391662-6a66f880-dcfa-11eb-9f43-ef0b1f0a92b9.mp4



Action buttons can be used to differantiate between states.
When the Statue took damage that made him bloodied, it was shown to the Players only after the DM wanted them to see it.
Wehn Cactus was dying and making saving throws his condition was shown to the players as his image was blinking in and out of existance, and a skull was shown behind. Wehn he was dead, with 1 push of a button the players saw their friend becoming a body.

There are many more features (Conditions, different factions that manifest in different ways, changing the players component's variant from horizontal to vertical and vice versa, deleting a row, hiding a row, duplicating a row and many more) to be explored.

TODOs:

* Buglog
    * ~~uuid - strip from save, add when loading json~~
        * NICETOHAVE - if names already exists, add indication
    * ~~Save images and json should work with %APPDATA%~~
    * ~~On loadImage - should compress and save the image on a local folder and use that~~
    * ~~verify file type~~
        * ~~loadImage~~
        * ~~load and save encounter~~
    * ~~Add a button to reset the table~~
    * ~~Make filePaths constants~~
    * ~~Adjust table window size~~
    * ~~Add scroll to table window~~
    * ~~Clean all rows, add encounter => no one has initiative~~
    * ~~Can't refresh or use dev tools from app~~
    * ~~focus loss on remove row (may fix itself after UI overhaul) (DID FIX ITSELF AFTER OVERHAUL)~~
    * ~~Bloody animation vertical~~
    * Change variant
    * Table sort is inconsistent with initiative order
    * Check if picture doesn't exist
    * Change font and avatar size
    * Change badges to appear on top and beneath the avatar and not on corners
    * Improve visibility of the input boxes while hidden

* FEATURES
    * ~~Handle empty table \ add "add row" button~~
    * ~~UX Overhaul~~
    * Multi line edit. The ability to chose a bunch of characters and remove x hp from all of them.
    * battle log
        * crashlog
    * Bestiary
        * Nice To Have, autocomplete.
    * add executable
    * NICE TO HAVE - Keybindings
    * NICE TO HAVE - Condition details on cursor hover
    * Hide entire Battle Page
    * Auto resize through window frame (drag)
    * Add the ability to show different stats (like AC) and edit the format shown to the players
