# pw_automation_on_youtube
This project realized in Playwright aims to create automated tests on YouTube to practice diverse features of Playwright
📘 README (GitHub)
🇬🇧 English Version
🎯 Project Title

YouTube Test Automation Framework with Playwright

📌 Overview

This project is an end-to-end test automation framework built with Playwright (TypeScript), designed to simulate real user interactions on YouTube.

It demonstrates how to build a scalable, maintainable, and realistic automation architecture using modern QA practices.

🚀 Objectives
Showcase strong automation testing skills for technical interviews
Build a real-world testing framework (not just simple scripts)
Demonstrate clean architecture and best practices
Handle dynamic web behaviors (ads, loading states, errors)
🧱 Tech Stack
Playwright (TypeScript)
Node.js
Page Object Model (POM)
JSON for data-driven testing
⚙️ Features
🔎 Search Automation
Perform YouTube searches dynamically
Validate URL parameters and results page
🎬 Video Interaction
Play / Pause videos
Mute / Unmute
Handle fullscreen
📺 Ad Handling
Detect ads dynamically
Skip ads when possible
Mute ads automatically
🌐 Network Validation
Wait for API responses (/search)
Validate HTTP status codes (200 OK)
⚡ Dynamic Behavior Handling
Use of Promise.race() for competing UI states
Smart waiting strategies
Error detection during playback
📊 Data-Driven Testing
Test scenarios loaded from JSON files
Flexible and reusable test design
🧩 Project Structure
📦 project
 ┣ 📂 tests
 ┣ 📂 pages (POM classes)
 ┣ 📂 utils (helpers: network, parsing, etc.)
 ┣ 📂 data (JSON test data)
 ┣ 📜 playwright.config.ts
🧠 Key Concepts Demonstrated
Page Object Model design
Async control & race conditions
Robust selectors strategy
Reusable test utilities
Separation of concerns
▶️ How to Run
npm install
npx playwright test

Run in UI mode:

npx playwright test --ui
📈 Why This Project?

This project goes beyond basic automation by focusing on:

Realistic user scenarios
Handling unpredictable UI behavior
Simple but clean and professional test architecture
📬 Author

QA Automation Engineer passionate about building reliable and scalable test frameworks.

🇫🇷 Version française
🎯 Titre du projet

Framework d'automatisation de tests YouTube avec Playwright

📌 Présentation

Ce projet est un framework d’automatisation de tests end-to-end développé avec Playwright (TypeScript), visant à simuler des interactions réelles d’un utilisateur sur YouTube.

Il met en avant une architecture maintenable, scalable et professionnelle basée sur les bonnes pratiques QA.

🚀 Objectifs
Mettre en valeur des compétences en test automatisé
Construire un framework réaliste (pas seulement des scripts simples)
Appliquer les bonnes pratiques d’architecture
Gérer des comportements dynamiques (pubs, chargement, erreurs)
🧱 Stack technique
Playwright (TypeScript)
Node.js
Page Object Model (POM)
Tests pilotés par données (JSON)
⚙️ Fonctionnalités
🔎 Recherche
Recherche dynamique sur YouTube
Vérification des paramètres URL
🎬 Interaction vidéo
Lecture / pause
Activation / désactivation du son
Mode plein écran
📺 Gestion des publicités
Détection automatique des pubs
Skip automatique si possible
Mise en mute des pubs
🌐 Validation réseau
Attente des réponses API (/search)
Vérification des statuts HTTP
⚡ Gestion du dynamique
Utilisation de Promise.race()
Attentes intelligentes
Détection d’erreurs vidéo
📊 Tests data-driven
Scénarios via fichiers JSON
Tests réutilisables et flexibles
🧩 Structure du projet
📦 projet
 ┣ 📂 tests
 ┣ 📂 pages
 ┣ 📂 utils
 ┣ 📂 data
 ┣ 📜 playwright.config.ts
🧠 Concepts clés
Page Object Model
Gestion de l’asynchrone
Sélecteurs robustes
Helpers réutilisables
Séparation des responsabilités
▶️ Lancer le projet
npm install
npx playwright test

Mode UI :

npx playwright test --ui
📈 Pourquoi ce projet ?

Ce projet va au-delà des tests simples en mettant l’accent sur :

Des scénarios réalistes
La gestion d’interfaces dynamiques
Une architecture simple mais professionnelle
