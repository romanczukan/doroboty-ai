# Weryfikacja dokumentacji v1

Wykonano lokalnie 10.11.2026. Dokument pozostaje wersją do oceny.

## Kompletność i spójność

- 30 rodzin × 11 obszarów: 330 sekcji kart, 398 unikalnych kotwic.
- 1386 odwołań HTML; lokalne cele HTML i Markdown istnieją.
- SHA-256 potwierdza 83 materiały wizualne. 29 plików aplikacji ujętych w rejestrze źródeł nie zmieniło się podczas dokumentowania. Kopie fontów są identyczne ze źródłami aplikacji.
- Sprawdzono zachowanie dokładnych wartości tokenów oraz identyfikatora stanu źródłowego.

Wyniki: [kontrola dokumentu](verification/document.json), [rejestr źródeł](evidence/source-annotations.json).

## Render i obsługa dokumentu

Chrome: 1440, 390 i 320 CSS px. Wszystkie karty mają widoczną strukturę i komplet 11 sekcji, bez poziomego przepełnienia całej strony. Szerokie tabele mają własny przewijany obszar.

Sprawdzono odnośniki, font, wczytanie ilustracji, wyszukiwanie (trafienie, brak wyników, wyczyszczenie), dostęp klawiaturą do indeksu i otwarcie bez serwera przez plik lokalny. Brak błędów skryptu i odpowiedzi HTTP 4xx/5xx w raporcie. Axe dla WCAG A/AA nie zgłosił naruszeń w tym dokumencie.

Osobny przegląd wizualny objął źródła wszystkich rodzin oraz reprezentatywne części gotowego dokumentu: okładkę, fundamenty, kontrast, wyszukiwanie, kartę oferty, arkusz aplikacji, pytania i końcowy rejestr. Skorygowano czytelność tekstu, zapis wartości technicznych i odstęp w nazwie na mobile. Ponownie uchwycono pustą listę zapisanych oraz popup przy widocznym polu, aby usunąć artefakty przechwycenia. E22/E31 opisano jako kolejne stany scenariusza.

Wyniki: [kontrola przeglądarkowa](verification/browser.json), [desktop](verification/desktop.png), [mobile](verification/mobile.png).

To weryfikacja dokumentacji. Nie oznacza pełnego audytu dostępności aplikacji, czytników ekranu ani wszystkich kombinacji stanów. Testy wymagane dla produktu pozostają oznaczone [T] w kartach.

## Bramka repozytorium

Wykonano `CI=1 PLAYWRIGHT_CHANNEL=chrome ./scripts/verify` z lokalnym Node.js 24.22.2:

- formatowanie, ESLint, TypeScript, build: wynik pozytywny;
- 27 testów jednostkowych i 34 scenariusze przeglądarkowe: wszystkie przeszły;
- integralność historycznego zestawu: 67 plików zgodnych, 6 testów renderera przeszło;
- pakiet bazowy: 120 ścieżek, zgodny rejestr plików i kolumn.

Build zgłasza istniejące nieblokujące uwagi o komentarzach adnotacji Zod i wielkości bundla. Nie dotyczą nowego dokumentu. Po końcowych korektach dokumentacyjnych powtórzono odpowiednie kontrole treści/renderu i formatowania; kod produktu nie był zmieniany.

Powyższa weryfikacja dokumentuje stan lokalny sprzed publikacji. Następnie użytkowniczka zleciła commit i push tej iteracji; zapis wykonania znajduje się w [rekordzie publikacji](../../tasks/notes-github-publication.md). Wersja pozostaje v1 do oceny.
