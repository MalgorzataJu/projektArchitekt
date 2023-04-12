
 <h3 align="center">RCP ARCHITEKT</h3>
 <div align="center" ><img  src="https://user-images.githubusercontent.com/41152177/231270014-b6cbfdc3-9281-4721-bb3d-3d2a0f20cc53.jpg"/></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->
## About The Project


Opis projektu:
 
Dostęp do aplikacji jest wyłącznie dla zarejestrowanych pracowników.
Aplikacja ma za zadanie ułatwić rejestrację czasu pracy pracwonikom biura projektowego.  
Godziny pracy mają związek z odpowiednim projektem ale też są kategoryzowane i przypisane do odpowiedniego pracownika.

CELE Zrealizowanie: 
  - rejeatracja czasu pracy,
  - zarządzanie pracownikami,
  - zarządanie projektami,
  
Umożliwia:
- dodawanie, usuwanie i edycję pracowników
- dodawanie, usuwanie i edycję projektów
- dodawanie i usuwanie godzin pracy


CELE do zrealizowania w dalszym rozwoju: 
  - przydzielanie zadań i pilnowanie założonych godzin pracy,
  - statystyki pracowników i projektów, zliczanie ilości godzin itp.
  - ograniczenie dostępności zasobów na user i admin
  
  

<img href= "[https://user-images.githubusercontent.com/41152177/230640791-853ad331-54e0-4333-9fe1-36f07ac25411.pn](https://user-images.githubusercontent.com/41152177/230631870-780a95be-418f-461f-aae7-f9b15b848817.png)g"/>


### Built With

Aplikacja została zbudowana w oparciu o:

Backend:
- "@nestjs/common": "^9.0.0",
- "typescript": "^4.7.4",
- "typeorm": "^0.3.12",
- "passport": "^0.6.0",
- "passport-jwt": "^4.0.1",

Frontend:
- "react": "^18.2.0",
- "react-bootstrap": "^2.7.2",
- "axios": "^1.3.4",
- "bootstrap": "^5.2.3",

Baza danych:
- MySQL 


## Demo


![React-App-—-Osobisty-—-Microsoft_-Edge-2023-04-12-12-57-56](https://user-images.githubusercontent.com/41152177/231442253-3d80edf6-34c7-4555-a07c-3840939c2837.gif)

Wersja Demo: 
- email and password: test@test
- https://crparchitekt.4pages.pl

Okno startowe:
<img src = "https://user-images.githubusercontent.com/41152177/231267953-4f9c9a31-c1e3-4ae4-a4b9-0e33836a7ff4.jpg"/>

Lista Pracowników:
![lista pracownikow](https://user-images.githubusercontent.com/41152177/231268392-c3f5e82b-5e97-4b44-bc61-6d4894bb01b1.jpg)

WIDOK TABEL I REALACJI: 

![Baza danych](https://user-images.githubusercontent.com/41152177/231252712-8b3aa105-518c-4096-803f-e0b04b9117f1.png)


### Installation

1. Clone repozytorium
   ```sh
   git clone https://github.com/MalgorzataJu/projektArchitekt
   ```
2. Wejdz do folderu z backendem i frontendem oddzielnie wykonaj:
   ```sh
   npm install
   ```
3. Stwórz bazę danych na postawie config.js
   ```js
   export const config = {
    dbHost: 'localhost',
    dbUser: 'root',
    dbPassword: 'password',
    dbDatabase: 'database',}
   ```

4. Uruchom backend
   ```js
   nest start
   ```
   
5. Uruchom frontend
   ```js
   react-app-rewired start
   ```



<!-- CONTACT -->
## Contact

-Małgorzata Jurczak: gmjurczak@gmail.com

* Zdjęcie użyte jako tło w projekcie jest własnością biura projektowego "Emilia Bogdanowicz Architekt"
