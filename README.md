DM Helper is an app designed to help DM's run their games, keeping score of a multitude of things during battles, and showing the players exactly what they want them to see.
DM Helper has two components - a control panel for the DM and a display component for the players.
DM Helper was designed to run in two seperate windows to allow it to be cast to a secondary screen.

Adding a character:
https://user-images.githubusercontent.com/33065842/124372814-f2ff7d80-dc95-11eb-99f4-8fc2c83f15c7.mp4
This can be made and saved in advanced, then loaded at the table in order to save time.

Saving an encounter \ character \ party \ enemies:
https://user-images.githubusercontent.com/33065842/124372844-3823af80-dc96-11eb-991a-2a2803f4156e.mp4

Loading an encounter:
https://user-images.githubusercontent.com/33065842/124372861-5be6f580-dc96-11eb-8724-cdd14346c728.mp4
You can load several files into one encounter, making customizing encounters a breeze.

Starting an encounter:
https://user-images.githubusercontent.com/33065842/124372882-7620d380-dc96-11eb-89a0-de510c4c693a.mp4

Running a fight:
The party encountered an old, grizzled fighter whom they knew and had a long standing fued with.
JonJon, the Halfling Druid was quick on his feet and was the first one to react, he cast Call Lightning at 3rd level, causing Dormund 21 points of damage.
https://user-images.githubusercontent.com/33065842/124372999-7a99bc00-dc97-11eb-876e-fbb8857fd9df.mp4

The fight continued for several more rounds.
Dormund used his items and wit to cause the party much angst.
He saw Dez lying on the ground, grasping for air, fighting for his life.
Without hesitation, the old veteran blew past Reginald, who took the attack of opportunity, dealing 16 points of damage and causing Dormund to become bloodied, then, with a swift swing of his massive sword, he detached Dez-Mon's head.
https://user-images.githubusercontent.com/33065842/124373080-1fb49480-dc98-11eb-8a1d-a6a9d2c31caa.mp4

Action buttons can be used to differantiate between states.
When Dormund took damage that made him bloodied, it was shown to the Players only after the DM wanted them to see it.
Wehn Dez was dying and making saving throws his condition was shown to the players as his image was blinking in and out of existance, and a skull was shown behind. Wehn he was dead, with 1 push of a button the players saw their friend becoming a body.

There are many more features (like changing the players component's variant from horizontal to vertical and vice versa, deleting a row, hiding a row, duplicating a row and many more) to be explored.


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
    * Table sort is inconsistent with initiative order
    * Check if picture doesn't exist

* FEATURES
    * ~~Handle empty table \ add "add row" button~~
    * ~~UX Overhaul~~
    * battle log
        * crashlog
    * Bestiary
        * Nice To Have, autocomplete.
    * add executable
    * NICE TO HAVE - Keybindings
    * NICE TO HAVE - Condition details on cursor hover
