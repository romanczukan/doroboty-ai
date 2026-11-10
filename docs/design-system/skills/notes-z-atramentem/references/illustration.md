# Drwal i szkicowe detale

## Tożsamość

Obejrzyj [planszę drwala](../assets/drwal-study.png) przed użyciem lub rozwijaniem postaci. To koncepcja wygenerowana AI dla tego projektu; użytkowniczka zaakceptowała jej szkicowy charakter. Zawiera tę samą postać w trzech pozach. Nie jest gotową siatką ikon ani wyciętymi assetami z przezroczystością.

Zachowaj przyjaznego dorosłego drwala z ciemną brodą, dzianinową czapką, brązową koszulą w kratę, ciemnymi spodniami i solidnymi butami. Kontur jest czarny i lekko nierówny, kreskowanie oszczędne, broda i buty tworzą zwarte czarne plamy. Twarz, proporcje i ubiór pozostają spójne między pozami. Laptop łączy postać z kontekstem portalu IT.

Styl nie jest realistycznym renderem, kreskówką 3D ani grupą stockowych abstrakcyjnych ludzi. Krajobraz lasu i narzędzia drwala nie są automatycznym motywem całego UI.

## Role

| Sytuacja               | Rola postaci                           |
| ---------------------- | -------------------------------------- |
| Wejście / wyszukiwanie | Wskazuje kierunek i pomaga rozpocząć   |
| Puste zapisane oferty  | Towarzyszy komunikatowi i jednej akcji |
| Puste kandydatury      | Pracuje lub porządkuje materiały       |
| Wysłana kandydatura    | Spokojne potwierdzenie, gest dłoni     |
| Błąd lub brak wyników  | Pomocny, rzeczowy ton                  |
| Wypełniona lista       | Wycofuje się na rzecz danych           |

Duży moduł może użyć ilustracji ok. 240–320 px wysokości. Dla 120–180 px opracuj uproszczenie: mniej kraty i kreskowania, zachowana sylwetka, twarz i gest. Nie zmniejszaj całej planszy trzech póz do jednej małej ilustracji. Kadry w studium demonstrują kompozycję, nie obowiązkową metodę assetów produkcyjnych.

Gdy potrzebna jest nowa poza lub edycja obrazu, użyj dostępnego narzędzia obrazowego i planszy jako referencji tożsamości. Obejrzyj wynik. Nowy zasób zapisuj z projektem, bez nadpisywania plików zainstalowanego skilla. Brak narzędzia obrazowego nie blokuje reszty ekranu: użyj istniejącej pozy lub opisz potrzebny asset bez udawania, że został wykonany.

## Drobne motywy

W [assets/sketches/](../assets/sketches/) są oryginalne motywy projektu:

- `arrow.svg`: luźna strzałka dla pojedynczego wskazania.
- `underline.svg`: podkreślenie krótkiego fragmentu nagłówka.
- `spark.svg`: mały akcent sukcesu lub tytułu.
- `twig.svg`: gałązka dla notatki, stopki lub pustego stanu.

Kontur ma orientacyjnie 1,5–2,5 px, a szerokość motywu zwykle 32–80 px. Dobierz skalę do sąsiedniej typografii. Stosuj punktowo, domyślnie jeden mały motyw w module. Brąz albo czarny tusz, opcjonalnie żółta plama. Zachowaj odstęp od tekstu, pól i celów kliknięcia. Podkreślenie leży poniżej liter; przy zawijaniu nagłówka zmień układ lub je usuń.

Dekoracje mają `aria-hidden="true"` przy inline SVG lub pusty `alt` przy obrazie. Znaczenie przekazywane grafiką musi być dostępne również tekstowo. Motywy używają `currentColor`; zewnętrzny `<img>` nie dziedziczy koloru z rodzica — użyj wariantu w pliku lub inline SVG.

Ikony użytkowe tworzą osobny, prosty zestaw. Nie zastępuj checkboxa szkicem ani ikony usuwania siekierą. Ruch nie jest domyślny; ewentualna animacja ma być dyskretna i opcjonalna.
