---
name: notes-z-atramentem
description: "Projektuj i rozwijaj UI w kierunku Notes z atramentem: jasny papier, brąz, atrament, żółty akcent, IBM Plex Serif i szkicowy drwal, z czytelnymi ofertami oraz kandydaturami. Używaj przy wywołaniu tego stylu lub kontynuacji interfejsu, który już go stosuje."
---

# Notes z atramentem

Zastosuj zapisany kierunek portalu pracy IT: **ilustracyjna osobowość B + uporządkowanie informacji C**. Buduj ekrany, komponenty lub specyfikacje w zakresie zadania użytkownika. Skill zapisuje język projektu; nie wymaga konkretnego frameworka.

## Najważniejsze ustalenia

- **Zmieniaj styl, zachowuj treść.** Zmiana fontu, tła lub kompozycji nie upoważnia do przepisywania sloganów, opisów ani etykiet. Teksty w przykładach skilla nie zastępują tekstów produktu. Nowe copy dodawaj w zakresie wyraźnej prośby użytkownika, jak placeholder wyszukiwarki.
- **IBM Plex Serif we wszystkich rolach:** nagłówki, akapity, stanowiska, liczby, warunki, nawigacja, etykiety i kontrolki. To zastępuje wcześniejszy podział Georgia / sans. Korzystaj z rzeczywistych odmian 400/500/600/700.
- **Ciemniejsze tło to ciepły beż `#E8DDCE`.** Wyróżnia hero z wyszukiwaniem i uzgodnione obszary stron; karty, pola i nawigacja pozostają jasne. Nie jest to ciemny motyw ani zgoda na globalne przemalowanie każdej strony.
- **Atramentowy kontur, brązowe nagłówki i żółte zaznaczenia.** Główne CTA ma atramentowe tło z jasnym tekstem, alternatywa — obrys. Bez odsuniętych plakatowych cieni. Ilustracja: jeden spójny szkicowy drwal i pojedyncze drobne motywy.
- **Wyszukiwarka ma rozpoznawalny cel, lupę i kontekstowy placeholder.** Zachowaj dotychczasową etykietę i nazwę dostępną; w aplikacjach widoczny label pozostaje nad polem. Ikona jest dekoracyjna, a zakres i sposób filtrowania pozostają zgodne z produktem.

## Właściwe materiały

- Przy pracy nad UI przeczytaj [reguły systemu](references/design-rules.md): fundamenty, powierzchnie, komponenty i responsywność.
- Dla wyglądu obejrzyj [aktualne przykłady](references/visual-examples.md). Starsze studia są oznaczone jako historyczne; nie nadpisują późniejszych ustaleń.
- Przy użyciu lub rozwijaniu postaci przeczytaj [zasady ilustracji](references/illustration.md) i obejrzyj planszę drwala.
- Gdy istotny jest status decyzji lub kontekst DoRoboty.ai, przeczytaj [ustalenia i pochodzenie](references/decisions.md).

## Status kierunku

Kierunek marki oraz wybór IBM Plex Serif dla całego interfejsu wynikają z instrukcji użytkowniczki. Pozostałe wartości zapisują bieżącą iterację; nie przedstawiaj ich jako zamrożonego wydania. Późniejsze instrukcje użytkownika i uzgodnione tokeny projektu mają pierwszeństwo.

Rozróżniaj istniejący wzorzec, rekomendację i nieprzetestowany stan. Obecna dokumentacja dla designerów jest v1 do oceny. Nie oznacza akceptacji wszystkich komponentów, publikacji na GitHubie ani polecenia tworzenia dodatkowego pakietu dla agenta. Kontynuuj zadanie zlecone przez użytkownika.

## Zasoby i integracja

[assets/tokens.css](assets/tokens.css) zawiera opcjonalne fundamenty i lokalne fonty z [licencją](assets/fonts/LICENSE.txt). Przenieś role do istniejących tokenów projektu; wykorzystaj jego komponenty i semantykę zamiast wprowadzać równoległą bibliotekę. Jeśli projekt już ładuje te fonty, zachowaj jedno źródło deklaracji.

[Plansza drwala](assets/drwal-study.png) to koncepcja tej samej postaci w trzech pozach, nie gotowa mała ikona. [Motywy SVG](assets/sketches/) stosuj punktowo, poza tekstem i kontrolkami. Robot w przykładach jest znakiem konkretnego produktu, a drwal ilustracją — nie zamieniaj ich ról ani marki innego projektu.

## Kontrola rezultatu

Obejrzyj zmieniony UI na desktopie i wąskim ekranie. Sprawdź pełny tytuł, wynagrodzenie lub jego jawny brak, fallback logo, zawijanie i widoczny focus. Na mobile zostaw miejsce na ikonę zapisu, a pensję przenieś do osobnego wiersza, jeśli kolumny konkurują z tytułem. Testuj przypadki danych rzeczywiście obsługiwane przez produkt; przykład nie upoważnia do dodawania technologii, dat czy nowych akcji.

Podsumuj zastosowane decyzje i otwarte kwestie. Do małej zmiany nie dopisuj obowiązkowych badań, publikacji ani eksportu do Figma/PDF.
