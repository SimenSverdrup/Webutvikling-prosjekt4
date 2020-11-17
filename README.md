# Webutvikling prosjekt 4

## Kjøreinstruksjoner
1. Last ned Expo applikasjonen på Google Play eller Apple Store.
2. Installer Expo CLI med `npm install --global expo-cli`, se Expo dokumentasjonen for mer informasjon.
3. Kjør `npm install` i prosjekt-directory.
4. Pass på at du er på samme nettverk med PC og mobil.
5. Kjør `expo start` og scan QR-koden med Expo-applikasjonen på mobilen for å kjøre prosjektet.

Dersom ingen filmer skulle vises, skyldes dette sannsynligvis ustabil VM.



## Oppsett av backend
For at mobilapplikasjonen skulle kunne benytte seg av backenden og tilkoblingen til databasen, måtte vi flytte backended til VMen som kjørte på NTNU, samt sørge for at den kjørte kontinuerlig. Vi gjorde dette ved å installere Git på VMen, klone prosjekt 3 og endre på index.ts manuelt gjennom terminalen. Deretter brukte vi npm pakken forever (https://www.npmjs.com/package/forever) for å kjøre “npm start” kommandoen kontinuerlig, selv etter at vi logget ut av VMen. Dette fungerte godt, men er noe sårbart for en potensiell kræsj på VMen.


## Omgjøring av komponenter til Native
Vi prøvde så langt det lot seg gjøre å gjenbruke komponentene fra prosjekt 3. Det viste seg at dette var noe mer komplisert enn å kun endre <div> til <View> og sette style istedenfor å bruke CSS. En del logikk måtte endres og noen av material-ui-komponentene var ikke kompatible med React Native. Spesielt ble MovieInfo ganske annerledes, da det ikke var plass til å vise ytterligere informasjon om filmene til høyre for listen, grunnet smal skjermstørrelse på mobile plattformer. Vi løste dette ved å wrappe komponenten i en Modal, slik at den la seg oppå resten av appen. Dette førte til en del ekstra arbeid med styling, for å tilpasse applikasjonen til mobilvisning. I tillegg måtte Paginater endres ganske omfattende, da Material-UI komponenten vi brukte i prosjekt 3 ikke støttes i React Native. Vi endte opp med å lage komponentene nesten fra bunnen av, ved å kombinere en Dots komponent med to trekanter (piler) til navigering. Klikk på disse inkrementerer eller dekrementerer siden brukeren er på - og trigger ny fetching av filmer fra REST APIet. Likevel ble mesteparten av kodebasen gjenbrukt og vi sparte utvilsomt mye tid på å allerede ha på plass logikken bak applikasjonen, mtp state management og dataflyt. Komponentene sort og filter utnyttet også material.ui, men med Native som nytt utgangspunkt var det nødvendig å finne alternativer. Dermed bestemte vi oss for å bruke NativeBase.io som gir en cross-platform UI for React Native.


## Styling og responsivitet
For å style grensesnittet har vi brukt StyleSheet.create til å lage spesifikke regler for hvordan de ulike komponentene skal plasseres og se ut. Hver native-komponent referer til stylingen som skal gjelde ved style={styles.navnPåRegelsett}. For å sørge for responsivitet har vi brukt flexbox rundt elementene slik at blant annet bredden på innholdet justeres avhengig av hvor stor skjermen er. Vi har testet grensesnittet på både iPhone 8 og Samsung Galaxy S9 for å sikre at grensesnittet ser bra ut på både iOS og Android. I tillegg har vi tatt i bruk Native Base til å få tak i generelle ikoner som tilpasser seg operativsystemet det er på. Dette vil si at f.eks. krysset i venstre hjørne av MovieList vil ha et standard iOS-utseende når appen kjøres på en iOS-enhet, og standard Android-utseende når appen kjøres på en Android-enhet.


## Endringer iht tilbakemeldinger på prosjekt 3
Vi benyttet sjansen til å fikse noen av tingene vi fikk tilbakemelding på i prosjekt 3. Det første vi fikset var en useEffect-løkke i MovieList hvor useEffect både oppdaterte state og var avhengig av samme state. Dermed ble komponenten re-rendret hele tiden, noe som førte til noe redusert ytelse. Vi løste dette ved å flytte state-endringene til useCallback-metoder, som kun oppdateres state dersom den er endret siden sist gang.

I tillegg oppdaterte vi MovieInfo til å bli en async funksjon, slik at kallet til REST APIet for å hente ut ytterligere informasjon om den valgte filmen også gjøres i en async funksjon, med cleanup i useEffect. Vi oppdaterte også Paginater til å kun vise korrekt antall sider. F.eks. hvis et søk resulterte i 16 filmer og vi viser 5 filmer på hver side - så vil Paginater kun vise Math.ceil(16/5)=4 sider.


## Filtrering og sortering
Appen vår mangler grensesnitt-biten av filtrering og sortering fordi personen som hadde ansvar for denne oppgaven trakk seg noen timer før leveringsfristen. Da var det så liten tid igjen at vi to andre ikke rakk å fikse det. Hele backend-logikken og andre komponenter som muliggjør filtrering og sortering er imidlertid på plass, det er bare ikke mulig å gjennomføre handlingen siden grensesnittet ikke er oppdatert.
