<!-- PROJECT LOGO -->
<br />
<div align="center">
  


  <a href="https://github.com/MatthewStuckenbruck/t9-hacks-2025">
    <img src="Screenshot.png" alt="Logo" width="500">
  </a>


  <p align="center">
    An educational password strength application that aggregates multiple metrics to make more accurate strength scoring and give more personalized suggestions on how to improve it.
    <br />
    <a href="https://github.com/MatthewStuckenbruck/t9-hacks-2025"><strong>Explore the repo »</strong></a>
    <br />
    <br />
    <a href="https://github.com/MatthewStuckenbruck/t9-hacks-2025/blob/main/FinalDocumentation.pdf">View Documentation</a>
  </p>
</div>

## Inspiration:
Medtronic's Cybersecurity Workshop taught how dangerous vulnerable software can be which inspired us to tackle the issue of password security for the average person as well as medical professionals and other positions of high importance. For our project, we wanted to create an application that not only helps people develop more secure passwords to protect sensitive data and their livelihoods but also educates them on specific issues and provides specialized suggestions for their individual situations.

## What it does:
Jerrimeter brings forward a simple-to-use educational password strength application to be put in the hands of many. Users may input a prospective password into the textbox. After which, a variety of metrics will be run on the password, and then each metric score is analyzed and aggregated to form an overall score. After research and testing, we decided that calculating Shanon Entropy, Password Entropy, and sequence alignment to common passwords, as well as using Huffman Encoding, would be the optimal metrics for scoring. Additional information on each metric and their respective scores will be displayed for the user to learn more if they wish to learn more. This way, the general password strength can be measured by the overarching score while still being able to provide personalized suggestions for each individual password instead of general tips.

## How we built it:
**Languages Used:** HTML, JavaScript, CSS\
During the design process for this project, we implemented the Product Development Process. We repeatedly cycled through the phases of research, planning, design, development, testing, and analysis to constantly improve our application. We developed a prototype for the application’s interface using Figma which we later implemented in our final design. We researched multiple sources ensuring the metrics have a wide variety of measures to be the most informative when creating a strong password.

## What was learned:
We learned more about the design process and collaborating with a diverse team on a project. We created an environment where every team member was able to exhibit their strengths while working with others to mitigate their weaknesses to allow for all us of to produce our best work.

## What’s next for Jerrimeter
The next step for Jerrimeter is to fine-tune the aggregation of the metrics as well as possibly include additional metrics to produce more accurate suggestions to users. Some specific ones that we did not get the chance to fully explore were the zxcvbn password strength estimation and further implementation of some of the concepts in Shannon’s paper.

