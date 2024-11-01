+++
title = "RAG-power"
date = "2024-10-22"
author = "JurassikLizard"
cover = "cover.png"
description = "Adding RAG to LLM powered Minecraft bots."
+++
This is a little log of my progress adding to the [Mindcraft](https://github.com/kolbytn/mindcraft/) project. \
It's a really cool project that uses Large Language Models to control mineflayer.js based Minecraft agents. \
Luckily, the project supports local models using Ollama. If any of you know me, you would know that I hate API AI, and I love local AI. \
Currently I've found the best results using the ``Qwen2.5 32B`` model, because it seems to be incredibly well finetuned on using commands. \


To mention: \
The agents interact with Minecraft by chatting "commands". Command use !thisSyntax, and allow them to accomplish many tasks. \
For example there are commands to !craftRecipe() for making an item, or !collectBlocks() to mine resources. \


Alright enough talking, time for the update.


I've added a [PR](https://github.com/kolbytn/mindcraft/pull/270) to the project that provides tips to the LLM models whenever they get a crafting recipe wrong, or don't have enough materials to craft something. \
I've also been working on adding a ``!wiki`` command that lets the model query the Minecraft wiki whenever it's confused. \
Using RAG, I created a vector database that contains many short-paragraphs containing information, it is indexed and retrieved using a vector from the ``all-minilm`` embedding model. \
I've found it provides the best performance, while keeping a lot of quality results and large embedding dimensions, a whole 384 of them. \
