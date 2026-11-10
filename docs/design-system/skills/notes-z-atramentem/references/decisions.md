# Ustalenia i pochodzenie

## Decyzje z rozmowy z 10 listopada 2026

Użytkowniczka wybrała **B („Notes z atramentem”) z układem informacji C**, szkicowego drwala oraz możliwość drobnych szkicowych detali. Kolejna iteracja w lokalnym DoRoboty.ai doprecyzowała:

| Ustalenie                            | Zakres                                                                                                                                                                                  |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stylizacja zachowuje treść           | Wcześniejsze samowolne przepisanie hero zostało wycofane. Przykładowe copy skilla nie jest treścią do wdrożenia.                                                                        |
| IBM Plex Serif                       | Najpierw nagłówki, potem wyraźnie cały interfejs: także opisy, dane, stanowiska i kontrolki. Zastępuje wcześniejsze Georgia + systemowy sans.                                           |
| Ciemniejsze tło hero ofert           | Papierowy beż `#E8DDCE` w sekcji „Dobra robota. Z AI w środku.” z wyszukiwaniem.                                                                                                        |
| Ten sam beż w kolejnych obszarach    | Metodologia, Dla firm, aplikowanie, aplikacje, profil, konto oraz wspólne obszary workspace; z jasnymi kartami i nawigacją. Zakres nie obejmuje globalnej zmiany body wszystkich stron. |
| Rozpoznawalna wyszukiwarka aplikacji | Lupa i placeholder; zachowane label, szerokość, zakres filtrowania i lokalny stan.                                                                                                      |
| Dokumentacja                         | Przygotowana dokumentacja dla designerów v1 do oceny, obejmująca bieżący interfejs, dowody, rekomendacje i pytania. Nie oznacza finalnego zatwierdzenia ani publikacji.                 |
| Aktualizacja skilla                  | Użytkowniczka następnie zleciła zapisanie tych ustaleń w tym skillu.                                                                                                                    |

Nagłówki home i listingu są różnymi tekstami. W aktualnej próbce home: „Praca dla ludzi, którzy dowożą z AI.”; listing: „Dobra robota. Z AI w środku.”. To kontekst DoRoboty.ai, nie szablony do narzucania innemu produktowi. Przy dalszej pracy źródłem copy jest projekt i aktualne instrukcje użytkownika.

## Status wartości i pytań

Paleta, lokalne rozmiary, promienie i odstępy w regułach odzwierciedlają obecną iterację. Wybór fontu jest decyzją użytkowniczki; nie przedstawiaj go nadal jako nieustalonej propozycji. Nie zamrażaj przez to wszystkich wartości geometrycznych ani nie ogłaszaj całej biblioteki zaakceptowaną.

Otwarte: lokalne deklaracje wagi 650 wobec plików 400/500/600/700; miejsce na zapis przy bardzo długim tytule na mobile; pełny katalog stanów; audyt czytników i pozostałych kombinacji dostępności; ewentualne daty/następny krok w procesie. To pytania, nie instrukcja automatycznego refaktoru.

Plan rozmowy przewiduje iteracje, finalną dokumentację i GitHub. Dokumentacja v1 została wykonana na prośbę użytkowniczki. Zlecenie aktualizacji skilla nie oznacza publikacji, nowego repozytorium ani dodatkowego pakietu dla agenta.

## Źródła aktualnej iteracji

Dołączone listingi i aplikacje desktop/mobile pochodzą z lokalnego prototypu DoRoboty.ai, przechwyconego 10.11.2026, i zawierają wyłącznie syntetyczne dane. Są kopiami S03/S04/S23/S24 z dokumentacji projektu `docs/design-system/notes-z-atramentem/`. Pokazują wybrane stany, nie kompletny katalog i nie dowód działania każdej interakcji. Skill pozostaje samodzielny — nie wymaga tej ścieżki, poprzedniego czatu ani lokalnego serwera.

Fonty IBM Plex Serif 400/500/600/700 skopiowano bez modyfikacji z zasobów tego projektu wraz z licencją. Ich pierwotne źródło to oficjalny pakiet IBM Plex Serif, complete/woff2. Nie są wariantem variable ani sztucznie pogrubioną jedną odmianą.

## Historyczne badanie kierunku

- [Jane Song — Mailchimp Illustration System](https://www.jane-song.com/mailchimp-illustration-system): historyczne autorskie case study swobodnej kreski, czarnych plam, żółtych akcentów i redakcyjnego tonu. Nie jest deklaracją obecnego UI Mailchimp.
- [Welcome to the Jungle](https://www.welcometothejungle.com/en/jobs): źródło organizacji wejścia, katalogu firm, listingu i detalu, nie system do skopiowania.

Pierwotne badanie obejmowało 6 typów stron i 13 klatek, m.in. desktop 1280×720 i mobilny detal 390×844. Nie obejmowało wtedy zalogowanych kandydatur; późniejsze aktualne zrzuty aplikacji są osobną próbą z implementacji.

Stare `listing-preview.jpg` i `sketches-preview.jpg` pozostają studiami wizualnymi. Pierwotny podział Georgia/sans, mocniejsze ramki i twardy cień są zastąpione późniejszymi ustaleniami. Fikcyjne „IT / PRACA”, firmy, kwoty i daty z tych plansz nie stanowią zatwierdzonej marki ani copy. Drwal-study powstał w image_gen; cztery szkicowe SVG są oryginalnymi studiami detali. Cudze logotypy i screeny nie są grafikami produktu.
