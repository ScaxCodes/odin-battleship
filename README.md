<div style="display: flex; align-items: center; justify-content: center; gap: 10px;" align="center">
    <img src="readme-img/battleship-small.png" alt="Bildschirmfoto des Spiels">
</div>

# Battleship Spiel ⛴️💥

Das Spiel ist eine Implementierung des klassischen Schiffeversenken-Spiels. Es bietet Spielern die Möglichkeit, ihre Flotten zufällig auf einem Gitter zu platzieren und dann abwechselnd Felder zu beschießen, um die Schiffe des Gegners zu versenken. Das Spiel beinhaltet sowohl einen menschlichen Spieler als auch einen Computergegner, der zufällige, aber gültige Züge macht.

## Funktionen

- **Schiff-Klasse:** Schiffe werden als Objekte erstellt, die ihre Länge, die Anzahl der Treffer und ihren Zustand (gesunken oder nicht) speichern.
- **Spielbrett-Klasse:** Spielbretter verwalten die Platzierung der Schiffe und verfolgen Treffer und Fehlversuche. Sie melden auch, ob alle Schiffe eines Spielers gesunken sind.
- **Spieler-Klasse:** Beinhaltet sowohl menschliche als auch Computer-Spieler, wobei Computer-Spieler zufällige Züge ausführen können.
- **Benutzeroberfläche:** Die Benutzeroberfläche ermöglicht es den Spielern, ihre Schiffe zufällig zu platzieren und Angriffe durchzuführen, wobei das Spielbrett nach jedem Zug aktualisiert wird.

## Live-Demo

- https://scaxcodes.github.io/odin-battleship/

## Nutzung

- Drücke den Button "Randomize Ship Placement", um die Positionen deiner Schiffe zufällig zu ändern, bis sie dir gefallen.
- Nachdem die Schiffe platziert sind, drücke den "Start Game!" Knopf, um das Spiel zu beginnen.
- Klicke auf die Felder des gegnerischen Spielbretts, um Angriffe durchzuführen.
- Das Spiel endet, wenn alle Schiffe eines Spielers versenkt wurden.

## Herausforderungen und Lösungen

- Die Spielzüge des Computers wurden intelligenter gestaltet, indem er bei Treffern angrenzende Felder angreift.

## Zukünftige Funktionen und Ideen

- **Implementierung von Drag-and-Drop** für die Platzierung der Schiffe.
- **Einführung eines 2-Spieler-Modus**, bei dem die Spieler das Gerät weiterreichen.
- **Weitere Verbesserung der KI des Computergegners**, sodass er bei Treffern noch systematischer angreift.
- **Bessere Visualisierung bei einem Sieg**, z.B. Konfetti-Regen oder andere Animationen.
- **Einbau von Sound oder weiteren Animationen** bei der Durchführung von Angriffen.
- **Unterschiedliche Darstellung der Schiffe**, je nach Größe.
- **Bessere Verwaltung der Event-Listener**, da diese nach Neustart des Spiels nicht vollständig entfernt werden.

## Technologien

- HTML
- CSS
- JavaScript

## Autor

[ScaxCodes](https://github.com/ScaxCodes)

## Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](https://opensource.org/licenses/MIT) lizenziert.
