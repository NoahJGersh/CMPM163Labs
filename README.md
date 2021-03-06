# CMPM163Labs

## Lab 2
### Part 1
Video: https://drive.google.com/file/d/15GTVrQrh1DBBSV1GhE9M-6rei60TxTuJ/view?usp=sharing

NOTE: Link is only visible to students and faculty at University of California, Santa Cruz.

The lab assignment only called for the cubes' rotations, though I added some orbiting behavior to the magenta cube to spice things up a bit.

### Part 2
![Lab 2, Part 2 Render](lab2/l2p2render.PNG)

Notes: I decided to experiment a little bit here. I chose a simple model to start (the cone) and two more complicated models, one of which was very low poly, and the other was high poly. The arrangement is simple: the dragon and monster are merely admiring the cone. I added some fill lights to flesh out the models, though. Particularly I chose a cyan to make the monster more aquatic seeming, a brighter white fill off to the back left, and a leftward greyish yellow green for the last bits.

Model Sources:
- Cone is attributed to Emmanuel PUYBARET / eTeks <info@eteks.com> and Scopia Visual Interfaces Systems, s.l. (http://www.scopia.es).
- Dragon is attributed to user 3dhaupt on Free3d (https://www.free3d.com/user/3dhaupt).
- Monster is attributed to user fatihayaz on Free3d (https://www.free3d.com/user/fatihayaz).

## Lab 3
Video: https://drive.google.com/file/d/1mRXQXgjN-JNhvBmhg186EWhUC1UlPFgv/view?usp=sharing

NOTE: Link is only visible to students and faculty at University of California, Santa Cruz.

### Cube Materials

**Center Cube:** The original Phong shaded cube from the assignment.

**Left Cube:** Lambert shaded cube with linear opacity modulation.

**Right Cube:** Additional Phong shaded cube with different diffuse, spec, and shininess values.

**Top Cube:** Original cube with depth-based linear interpolation.

**Bottom Cube:** Cube with modified shader code from the top cube. Specified color values are modified by a sine wave function, resulting in depth-based striations.

## Lab 4
Video: https://drive.google.com/file/d/1nlD_R_Hrbx4D9NhsaYFJJCVEN5S5U7_N/view?usp=sharing

NOTE: Link is only visible to students and faculty at University of California, Santa Cruz.

### Cube Creation

**Top & Bottom Left & Center:** ThreeJS Phong Material cubes with simple texture (left) and matching normal map (center).

**Right Top:** ThreeJS Shader Material cube with texture.

**Right Bottom:** ThreeJS Shader Material cube with tiled texture. Tiling was achieved with a modulo; I noticed that justifying the texture with a different size required a multiplication by some coefficient. By performing a modulo with the reciprocal of that coefficient, one gets the correct sizing and a complete coverage of the model via the remainder.

### Question Answers

Assuming mapping is uv(0, 0) -> xy(0, 7), or orientation correct:

a. x = 7 * u

b. y = 7 - (7 * u)

c. Grey is sampled.

Otherwise, assuming mapping is uv(0, 0) -> xy(0, 0), or coordinate correct:

a. x = 7 * u

b. y = 7 * u

c. White is sampled.

## Lab 5

Cube Explosion Video: https://drive.google.com/file/d/1OLcHz70Ze54nLrKeSPaDhM0gi4axEZ9k/view?usp=sharing

Custom Effect Video: https://drive.google.com/file/d/1Yh8PRmaHbb5_s-v9M2-6fkWD3jaHy_xT/view?usp=sharing

NOTE: Links are only visible to students and faculty at University of California, Santa Cruz.

## Lab 6

### Definitions

- Point Light: A light source that casts light equally in all directions from its origin.

- Spotlight: A light source that casts light in a specified cone from its origin.

- Directional Light: A light source that casts light globally in a single direction.

- Area Light: A light source that casts light from one side of a plane, in all directions.  

### Material Replication

Reference Image: 

![Lab 6 Material Reference](lab6/images/reference.jpg)

Reproduction: 

![Lab 6 Material Reproduction](lab6/images/materials.png)

Process: To go about creating some basic materials for my Nintendo Switch, I took three reference points: the left, red Joycon; the right, blue Joycon; and the center, black screen. I started with the screen, and determined that a smooth, highly specular, and very reflective material would work great. I applied these properties and found quick, positive results. For the Joycons, I noticed that their material was vibrant, but somewhat diffuse. I decided to apply a non-metallic approach to these, with low smoothness, and changed the Albedo color to represent their color differences.

### Textures

Pebbles and Sapphire texture maps were made by Joao Paulo. (https://3dtextures.me/2020/05/08/pebbles-020/, https://3dtextures.me/2018/10/04/sapphire-001/). 

I merely applied these textures to spheres, respectively, using their Albedo, Normal, Ambient Occlusion, and Height maps for a metallic-approach Standard Shader-based material.

### Skybox

I created a custom, procedural skybox with a large Sun, as well as cooler blue and lavender colors to evoke the sense of some distant planet, and to play well with the magenta of the area light. I think it ties the whole scene together in a nice way.

### Scene

Setup: 

![Scene Setup in Unity](lab6/images/scene.png)

Final: 

![Scene Preview](lab6/images/preview.png)

## Lab 7

I completed the Unity portion of this lab assignment. I took some creative liberties with it, going for a minimalist/low-poly aesthetic, and somewhat reinterpreting the scene. Though the assignment itself called for a mountain and *water* scene, I used the wave shader to actually represent a slow rolling fog through the peaks instead. I additionally used the initial displacement mesh and applied it to an unlit and emissive shader, to represent a sort of sun. To tie the scene together, I added some Voronoi displacement-based clouds as well, with sinusoidal time-based displacement scaling. 

I was not able to get into contact with my lab partner, and as such cannot complete that portion of the assignment.

Scene Video: https://drive.google.com/file/d/1f4iyWfLzZmn7u7B_ygbe1XMeR1TcdBuD/view?usp=sharing

NOTE: Link is only visible to students and faculty at University of California, Santa Cruz.

## Lab 8

Inspiration:

![ArcCorp's Area18](lab8/images/area18.png)

Final:

![My final procedural city, inspired by Area18](lab8/images/scene.png)

This was a pretty fun lab to complete. I'd been playing a lot of Star Citizen lately, and one of the currently implemented planets is essentially the Star Citizen version of Coruscant: a mega-city that sprawls across the entire planet, called ArcCorp. Obviously the sheer amount of detail and generation required for that planet goes *far* beyond the scope of this assignment, but I took some general color pointers from it. ArcCorp, though an entire city, has certain regions with more concentrated commercial buildings and skyscrapers, with the main one called "Area18." The vaulting buildings of Area18 are most notably red, cream, and dark grey. I used these colors (along with some metallic and diffuse variants) to create distinct buildings to populate the city. I also adjusted the skybox gradient to fit with a more orange-beige atmosphere, and chose a very dark red to serve as a ground plane. For variety, the buildings generate with a random rotation each time.

My partner completed Part 2, the ThreeJS portion of the lab assignment. I did not have a chance to ask the questions when they were submitting, as I had not yet begun the lab. We did not assist each other with our lab assignments.
