# Google Maps 

## Betyg: VG 

# React, React Router, Firebase Firestore, Authentication, React Hook Form, Google Maps API, 
# Beskrivning
Ni ska skapa en app som ska fungera som en matguide när man är hangry men inte vet var
man ska käka eller när man bara måste ha en kaffe/fika (som efter den här genomgången). Man ska kunna se restauranger/caféer på vald (eller nuvarande) ort.
Samtliga data ska hämtas/skapas/ändras med Firebase. Google Maps ska endast visa de matställen som finns i Firebase Firestore-databasen.

# Hygienkrav
Nedan hygienkrav ska vara uppfyllda oavsett betygsnivå.
● Responsiv (mobile first)
● Versionshanterad 

# Teknisk kravspecifikation
● Komponentbaserad
● Använder React Router
● Använder Firebase Firestore och Auth
● Använder React Hook Form
● Använder Google Maps (alt. OpenStreetMap, men Google Maps rekommenderas å det starkaste)
● Kommunikationen med API:et ska ske via mellanlager (komponenter som renderar innehåll ska alltså inte innehålla logik för datahämtning utan bara anropa en hook för att få datan)
Självklart får ni lov att använda dig av fler bibliotek om ni behöver/vill. Layout-ramverk bestämmer ni själv, men jag rekommenderar att använda Bootstrap och istället fokusera på koden.

# Kravspecifikation
Användare (besökare) ska kunna
● Ange ort att se matställen för i en karta samt i en lista.
● Klicka på ett matställe och få mer information om det (adress, ort, beskrivning,
kategori, utbud, telefon, e-post, webbplats, Facebook, Instagram).
 ● Sortera lista efter namn (kan vara standard).
● Se sin egen position på kartan.
● Ange ort att söka efter matställen i (med autocomplete). Kartan ska zooma till vald
ort.
● Tipsa om nya matställen (beskrivning + tipsarens e-postadress).
Administratörer ska kunna
● skapa, se, uppdatera och radera restauranger.
● se, uppdatera och radera inskickade tips.
Sökningar ska endast göras inom vald ort.
Matställen ska visas i admin som tabeller.
Webbläsarens bakåt/framåt-knappar ska fungera för att navigera på sidan, och vid omladdning av sidan ska man komma tillbaka till samma vy.

## VG-krav
● Filtrera lista och kartmarkörer efter kategori och utbud.
● Slå upp orten att visa restauranger för ifrån användarens position.
● Adress och ort ska automatiskt geo-kodas och latitud + longitud ska sparas för varje
restaurang.
● Administratören ska kunna uppdatera sin egen profil med namn, URL till bild,
e-postadress och lösenord.
● Administratörer ska kunna se alla administratörer (inklusive deras profilbild om sådan
finns) i en tabell.
● Få vägbeskrivning till det valda matstället (via Google Maps-länk).
Datamodeller
Matställe
Obligatoriska fält
● Namn
● Gatuadress (och nummer så klart)
● Ort
● (G) Latitud och longitud
● Beskrivning
● (VG) Kategori
○ Café
○ Restaurang
 
 ○ Snabbmat
○ Foodtruck ● (VG) Utbud
○ Fika
○ Lunch
○ After Work
○ Middag/Á la carte
Ej obligatoriska fält
(för administratören att fylla i, dock obligatoriska för er att ha med!)
● E-post
● Telefon
● Hemsida ● Facebook ● Instagram
(VG) Adress och ort ska automatiskt geo-kodas och latitud + longitud ska sparas för varje restaurang.
(VG) Administratör Obligatoriska fält
● E-post
Ej obligatoriska fält
(för användaren att fylla i, dock obligatoriska för er!)
● Namn
● Profilbild (endast URL)
Exempel på användning Se www.vegolund.se.
Inlämning
Senast torsdag 28 september kl. 23.59. Redovisning/demo inför klassen sker fredag 29 september.
