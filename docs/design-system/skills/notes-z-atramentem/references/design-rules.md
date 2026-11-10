# Fundamenty i anatomia ekranów

Bieżąca iteracja po ustaleniach z 10 listopada 2026. Zapisuj osobno decyzje użytkowniczki, wartości implementacji i propozycje dalszych zmian. Rozszerzaj istniejący system projektu.

## Kolor i powierzchnie

| Rola                   | Wartość   | Zastosowanie                                |
| ---------------------- | --------- | ------------------------------------------- |
| Papier                 | `#FAF6EE` | Bazowe jasne tło                            |
| Karta / kontrolka      | `#FFFDF8` | Karty, pola, panel czytania, nawigacja      |
| Zacieniony papier      | `#E8DDCE` | Ciemniejsze hero i uzgodnione obszary stron |
| Atrament               | `#171411` | Tekst, kontur i główna akcja                |
| Brąz marki             | `#71472E` | Redakcyjne nagłówki i szkicowe akcenty      |
| Żółty akcent           | `#F5CF49` | Aktywny wybór i mały wyróżnik               |
| Tekst pomocniczy       | `#665A50` | Firma, daty, metadane                       |
| Delikatna linia        | `#C5BDB1` | Separatory wewnętrzne                       |
| Neutralna powierzchnia | `#F2EDE4` | Etykiety i pomocniczy fragment              |

Utrzymuj jedną wartość zacienionego papieru. Hero może mieć alias do niej. W DoRoboty.ai zastosowano ją do hero ofert oraz metodologii, widoku „Dla firm” (obecnie wybór pracodawcy), aplikowania i obszarów konta: przeglądu, profilu, aplikacji, szczegółów, ustawień i strefy pracodawcy. Karty i nawigacja pozostają jasne. Pozostały papier strony nie został globalnie zastąpiony. W innych produktach dobierz zakres do zadania, zamiast kopiować nazwy tras.

Główna akcja: atrament / jasny tekst. Alternatywa: jasna powierzchnia i obrys. Żółć łączy się z tekstem i programowym stanem wybrania. Status ma nazwę; nie zastępuj semantyki błędów i sukcesów paletą marki. Kontrast oceniaj dla rzeczywistej pary tekst/tło, także w hover, focus i błędzie; jasny separator nie jest zamiennikiem potrzebnego konturu pola.

## Typografia

**IBM Plex Serif w całym UI.** Rozdzielaj role rozmiarem, wagą, interlinią i przestrzenią. Dane mogą być gęste i uporządkowane przy tej samej rodzinie pisma.

| Rola                    | Aktualny przykład DoRoboty.ai                             | Zasada                                                        |
| ----------------------- | --------------------------------------------------------- | ------------------------------------------------------------- |
| Hero ofert              | 48 px / 1.08, 400; 44 px w węższym układzie, 36 px mobile | Brąz, pełna treść, bez ściskania obok ilustracji              |
| Nagłówek obszaru konta  | 48 px desktop / 36 px mobile                              | Redakcyjny serif                                              |
| Tytuł oferty w detalu   | 28 px desktop / 26 px mobile, 700                         | Nadal IBM Plex Serif, możliwe kilka linii                     |
| Tytuł oferty na liście  | 20 px desktop / 18 px mobile, 700                         | Pierwszeństwo nad metadanymi i zapisem                        |
| Treść arkusza aplikacji | 16 px / 1.75 desktop, 14 px / 1.75 mobile                 | Wygodne czytanie, nie uniwersalny rozmiar wszystkich akapitów |
| Wspólne pole / przycisk | 15 px / 21 px; 400 / 600                                  | Lokalny wariant może mieć inny rozmiar                        |
| Metadane                | Zwykle 11–14 px, zależnie od rodziny                      | Ważne warunki nie giną w drobnym druku                        |

Lokalne WOFF2 w `assets/fonts/`: Regular 400, Medium 500, SemiBold 600, Bold 700, pełne upstreamowe zestawy znaków z polskimi znakami. Fallback: Georgia, Times New Roman, serif. Georgia to fallback, a nie obecny font marki. Bez ponownego wprowadzania systemowego sans do danych. Dołącz licencję przy przenoszeniu zasobów.

Deklaracja CSS 650 występuje w części aktualnych reguł produktu, lecz nie jest osobnym plikiem fontu. Nie wymyślaj odmiany 650 ani nie normalizuj jej przy okazji innego zadania; to otwarta decyzja. Sprawdź cyfry, polskie znaki i zawijanie po zmianie kroju.

## Geometria

- Promienie: panel 16 px, karta/arkusz 10 px, kontrolka 8 px, mała etykieta 5 px — role startowe, z lokalnymi wyjątkami.
- Cienki atramentowy kontur, zwykle 1 px. Kontur może być borderem lub wewnętrznym obrysem; nie nakładaj ich podwójnie.
- Bez odsuniętego twardego cienia. Rozdzielaj powierzchnie tłem, konturem i odstępem.
- Bazowy rytm: 4 / 8 / 12 / 16 / 24 / 32 / 48 px. Aktualne przepisy mają także 20/22/28/30 px; nie są automatycznie nowymi tokenami ani zgodą na refaktor.
- Breakpointy wynikają z kompozycji i kodu, nie z pojedynczej miniatury. 390 px to przykład, nie dowód działania przy 320 px i powiększeniu.

## Wyszukiwanie i wybór

Zachowaj istniejącą etykietę i nazwę dostępną. W aplikacjach widoczny label pozostaje nad polem. Do pola wyszukiwania dodaj regularną lupę i krótki placeholder opisujący obsługiwany zakres. W aplikacjach kandydata: „Wpisz nazwę stanowiska…”. W liście rekrutera: „Imię, nazwisko lub stanowisko…”. To kontekstowe teksty uzgodnione dla DoRoboty.ai, nie obowiązkowe copy innych produktów.

Lupka dekoracyjna: poza Tab i nazwą dostępną, nie przechwytuje kliknięć. W obecnym polu aplikacji ma 16 px, left 10 px, padding-left pola 34 px i minimum 48 px wysokości. Zachowaj odstęp od wpisanego tekstu, pełną szerokość i widoczny focus. Placeholder nie zastępuje etykiety.

Zmiana wyglądu nie zmienia filtrowania. Obecna lista aplikacji filtruje lokalnie nazwisko/imię oraz stanowisko, nie firmę; query nie jest utrwalone w URL. Publiczna wyszukiwarka ofert ma własny zakres i wysyłanie query/lokalizacji. Kategorie Build/Apply/Lead są filtrami z zaznaczeniem, nie zakładkami arkusza. W DoRoboty.ai jest jeden warunek na grupę checkboxów filtrów, nie dowolny wielokrotny wybór.

## Oferty i zapisane

Karta: tożsamość firmy → stanowisko i firma → warunki → etykieta funkcji → wynagrodzenie z podstawą/okresem → otwarcie i zapis. Zachowaj właściwą anatomię między listingiem a zapisanymi. W detalu porządek służy dłuższemu czytaniu i aplikowaniu.

Na desktopie pensja może być po prawej; na mobile przechodzi do osobnego wiersza. Długi tytuł nie wchodzi pod zakładkę zapisu. Brak pensji opisuj istniejącym tekstem produktu (w DoRoboty.ai: „Nie podano wynagrodzenia”), bez zmyślonej kwoty lub sugerowanej podstawy. Logo ma fallback z inicjałami, a pełna nazwa firmy pozostaje tekstem.

Obecny model DoRoboty.ai pokazuje jedną etykietę funkcji, nie listę technologii. Nie dodawaj mechanizmu +N, dat zapisu ani wygasania jako części samej stylizacji. Jeśli inny produkt rzeczywiście ma wiele tagów, dobierz czytelne zawijanie lub osobno uzgodniony dostęp do reszty.

## Aplikacje i praca z rekordem

Kandydat i rekruter mają odrębne zadania. Kandydat widzi rolę i firmę; rekruter osobę, rolę i kontekst. Etap ma etykietę tekstową. Match Score jest nieinteraktywną informacją z liczbą, nie przyciskiem ani samodzielną rekomendacją zatrudnienia.

Obecna lista kandydata nie zawiera daty i następnego kroku. Detal ma datę, historię, podsumowanie i arkusz z zakładkami Odpowiedź/CV. Dodanie kolejnych pól jest osobną propozycją, nie wdrożonym standardem.

Nie łącz różnych mechanizmów potwierdzenia: wycofanie aplikacji rozwija potwierdzenie inline w arkuszu; reset danych jest modalnym AlertDialog; mobilne filtry — Dialog; rozwinięta nawigacja konta — aside, nie modal. Dobierz semantykę i zarządzanie focusem do rzeczywistego mechanizmu.

## Stany i kontrola

Regularne ikony użytkowe, tekstowe etykiety, focus odróżniony od wyboru, błędy z objaśnieniem i powiązaniem z polem. Zgoda, wysłanie i zapis szkicu pozostają różnymi operacjami. Nie zastępuj dotychczasowych zasad formularza nowym wyglądem.

Dla zmiany sprawdź istotne przypadki: pełny długi tytuł, brak pensji/logo, dłuższe nazwy i pliki, pusty wynik, zawijanie, klawiaturę i wąski ekran. Starsza plansza ani screenshot nie dowodzi wszystkich stanów. Gęsty zestaw danych, czytniki, reflow i wszystkie kombinacje kontrolek mogą wymagać dalszych testów — zapisuj je jawnie, bez deklarowania pełnej zgodności na podstawie obrazu.
