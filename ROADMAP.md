# Roadmap Info
A roadmap for the future of p5.sound.js! Here is a [link](https://docs.google.com/spreadsheets/d/1WhT1O8w8PgejLP-2jtbT69rTGcTsYK4yTz9xq1KTcj8/edit?usp=sharing) to a more frequently updated list of planned changes and features.

## Effect Superclass
There are several dozen duplicate methods in the code base which are there only because I haven’t been able to think of a way to create a super class for all of the effects and sound making classes. For example, several effects currently have their own wet and dry methods. They also have disconnect and connect methods which all do the same exact thing and really should only exist once in an effect superclass that they all effects inherit and extend. This pattern exists already in the original p5.sound.js library but it wasn't clear to me at the time that I should have started that way. The architecture I would like to have implemented would be to import the effect class from tone.js and use that to provide the methods shared by effects like reverb, delay, biquad, etc… 

## Soundfile
Make documentation for the sound file that exhibits polyphonic voices, something which exists by default in the original sound file class but I feel adds a complexity to the code base to create behavior that can be achieved with vanilla JavaScript (by for example, by creating multiple soundfile instances in an array and starting them one after another via a wrapping index). 

## Classes to Add
There are several classes which I feel are missing from the original library and a few that should be modified or added to. Distortion should exist, as should the sound recorder. There should be a separate fft class, and let the waveform just handle realtime generating wave shapes. The waveform class currently is doing double duty by importing the corresponding waveform and fft class from tone.js, solely to replicate original behavior. If the original library will continue to exist however a more streamlined behavior should be implemented with separate classes for waveform and fft. 

# Methods to Add
Orient x y and z behavior should be brought back to the 3D panner though initialized in their current omnidirectional setting so that it is an optional property that more advanced users can choose to modify to create more complex spatial experiences. 

# Functionality to Add
Arithmetic nodes for adding and multiplying signals, allowing for more cross modulation of signals. 

Finally all effect properties such as wet dry, delay time and filter cutoffs should be modulatable with signals, some are implemented  

Disconnect from specific nodes.