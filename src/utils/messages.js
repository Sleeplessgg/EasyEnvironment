const { getCurrentSetIndex} = require("./seasonChoose");


const seasonList = [[
{
  title: "Nieselregen",
    description: "**Wetter:** Am Morgen ist Tau auf den Wiesen, über den Tag verteilt fällt leichter Nieselregen."
                  +"\n **Temperatur: **Der Nieselregen ist relativ erfrischend, die Luftfeutigkeit lässt die Luftfeuchtigkeit jedoch schwül wirken. "
                  + "\n **Nacht: **In der Nacht wird es trockener und etwas kühler"},
{
  title: "Leichter Sonnenschein mit Regenschauern",
  description: "**Wetter: **Am frühen Morgen liegt noch Tau auf dem Gras, gegen Mittag verschwibdet der Tau und es setzt leichter Sonnenschein ein, unterbrochen von kurzen Regenschauern."
                +"\n **Temperatur: **Kühl am Morgen, tagsüber mild"
                 + "\n **Nacht: **In der Nacht klart der Himmel auf, es wird jedoch deutlich kühler"},
{
title: "Nebel",
description: "**Wetter: **Dichter Morgennebel hängt in den Senken und lichtet sich nur langsam"
              +"\n **Temperatur: **Kühl "
              +"\n **Nacht: **Der Nebel bleibt bestehen, es wird noch feuchter"},
{
title: "Warmer Wind",
description: "**Wetter: **Ein warmer Wind weht durch die Territorien, es ist durchgehend trocken"
              +"\n **Temperatur: **Angenehm warm"
              +"\n **Nacht: **Es bleibt trocken, aber die Temperaturen sinken"},
{
title: "Regen",
description: "**Wetter: **Ein kräftiger Regenschauer zieht über das Territorium und hält den halben Tag an"
              +"\n **Temperatur: **Frisch, aber nicht kalt"
              +"\n **Nacht: **Der Regen lässt nach, feuchter Nebel bleibt zurück"},
{
title: "Bewölkt",
description: "**Wetter: **Wechselnd bewölkt mit kurzen Sonnenmomenten zwischen den Wolken"
              +"\n **Temperatur: **mild, warmer, wenn die Sonne sich zeigt"
              +"\n **Nacht: **Die Nacht bringt klaren Himmel und sinkende Temperaturen"},
{
title: "Frisch",
description: "**Wetter: **Frühmorgendlicher Tau glitzert auf den Halmen, tagsüber bleibt es trocken"
              +"\n **Temperatur: **Angenehm frisch mit leichtem Wind"
              +"\n **Nacht: **Die Temperaturen bleiben konstant, keine Veränderung"},
{
title: "Leichter Regen",
description: "**Wetter: **Ein leichter Frühlingsregen zieht durch das Territorium"
              +"\n **Temperatur: **Warm und feucht"
              +"\n **Nacht: **Der Regen hört auf, eine klare Nacht folgt"},
{
title: "Starker Wind",
description: "**Wetter: **Starker Wind weht durch die Bäume, gelegentlich fallen kleine Äste"
              +"\n **Temperatur: **Wechselhaft, mit kalten Böen"
              +"\n **Nacht: **Der Wind flaut ab, es bleibt kühl"},
{
title: "Sonnig",
description: "**Wetter: **Ein klarer, sonniger Tag mit nur wenigen Schleierwolken"
              +"\n **Temperatur: **Warm und angenehm"
              +"\n **Nacht: **Die Nacht bringt erste Kühle, bleibt aber ruhig"},
{
title: "Gewitter",
description: "**Wetter: **Starkes Gewitter zieht durch den Wald über den Nachmittag"
            +"\n **Temperatur: **Mild mit hoher Luftfeuchtigkeit"
            +"\n **Gerüche: **Der Duft von feuchtem Gras und Farn liegt überall"
            +"\n **Nacht: **Es klart auf, der Tau setzt früh ein"
}
]
, [
  {
  title: "Sehr heiß",
  description: "**Wetter: **Die Sonne scheint ununterbrochen vom wolkenlosen Himmel"
                +"\n **Temperatur: **Sehr heiß, kaum Wind"
                +"\n **Boden: **Hart und rissig - Pfoten könnten bei Jagden überhitzen"
                +"\n **Nacht: **Die Temperaturen bleiben ungewöhnlich hoch, kaum Abkühlung"
},
{
  title: "Gewitter",
  description: "**Wetter: **Ein Gewitter zieht am Nachmittag über das Territorium"
                +"\n **Temperatur: **Schwül und drückend vor dem Regen, danach angenehm frisch"
                +"\n **Boden: **Erst trocken, später aufgeweicht und schlammig"
                +"\n **Nacht: **Die Nacht bringt klare Luft und spürbare Abkühlung"
},
{
  title: "Warm",
  description: "**Wetter: **Ein warmer Sommertag mit wenigen Wolken"
                +"\n **Temperatur: **Heiß zur Mittagszeit, kühl am Morgen"
                +"\n **Boden: **Trocken und fest"
                +"\n **Nacht: **Eine milde, ruhige Sommernacht ohne Wind"
},
{
  title: "Sommerregen",
  description: "**Wetter: **Leichter Sommerregen fällt über mehrere Stunden"
                +"\n **Temperatur: **Angenehm warm trotz Regen"
                +"\n **Boden: **Aufgeweicht, aber nicht tief matschig"
                +"\n **Nacht: **Die Luft bleibt feucht, es bilden sich Pfützen"
},
{
  title: "Heiß",
  description: "**Wetter: **Ein heißer Tag mit flirrendem Licht in den Baumkronen"
                +"\n **Temperatur: **Sehr warm mit leichtem Wind"
                +"\n **Boden: **Trocken, mit feinem Staub bedeckt"
                +"\n **Nacht: **Die Temperatur sinkt leicht, aber es bleibt warm"
},
{
  title: "Nebel",
  description: "**Wetter: **Morgendlicher Nebel, der sich mittags vollständig auflöst"
                +"\n **Temperatur: **Warm und feucht"
                +"\n **Boden: **Weich durch vorherigen Regen, mit Tau bedeckt"
                +"\n **Nacht: **Klare Nacht mit angenehmer Kühle"
},
{
  title: "Windig",
  description: "**Wetter: **Windig mit starken Böen, einige Wolken ziehen vorbei"
                +"\n **Temperatur: **Heiß, aber durch den Wind erträglich"
                +"\n **Boden: **Trocken, Blätter und Zweige liegen verstreut"
                +"\n **Nacht: **Der Wind lässt nach, es bleibt warm"
},
{
  title: "Wechselnd Sonne/Regen",
  description: "**Wetter: **Wechsel zwischen Sonne und kurzen, kräftigen Regenschauern"
                +"\n **Temperatur: **Warm mit plötzlicher Abkühlung bei Regen"
                +"\n **Boden: **Stellenweise rutschig, stellenweise trocken"
                +"\n **Nacht: **Es bleibt wechselhaft, mit feuchten Böen"
},
{
  title: "Kühl",
  description: "**Wetter: **Ein ungewöhnlich kühler Sommertag mit bedecktem Himmel"
                +"\n **Temperatur: **Mild bis leicht kühl"
                +"\n **Boden: **Fest, mit leichtem Morgentau"
                +"\n **Nacht: **Es wird deutlich kühler, Tau setzt früh ein"
},
{
  title: "Glühend heiß",
  description: "**Wetter: **Die Sonne brennt auf das Territorium, kaum Schatten"
                +"\n **Temperatur: **Glühend heiß - gefährlich bei zu viel Bewegung"
                +"\n **Boden: **Ausgetrocknet und heiß, Steine speichern Hitze"
                +"\n **Nacht: **Die Hitze bleibt noch lange spürbar"
}
],
[{
  title: "Nebel",
  description: "**Wetter: **Dichter Nebel liegt bis in die Mittagsstunden über dem Territorium"
                +"\n **Temperatur: **Kalt und feucht"
                +"\n **Boden: **Rutschig durch nasses Laub, aber nicht matschig"
                +"\n **Nacht: **Der Nebel bleibt bestehen, es wird noch kälter"
},
{
  title: "Klar und sonnig",
  description: "**Wetter: **Ein klarer Himmel bringt den goldenen Schein der Herbstsonne"
                +"\n **Temperatur: **Kühl am Morgen, mild tagsüber"
                +"\n **Boden: **Trocken, von Laub bedeckt"
                +"\n **Nacht: **Kühle, klare Nacht mit sternenlosem Himmel"
},
{
  title: "Regen",
  description: "**Wetter: **Ein plötzlicher Regenguss durchweicht den Wald am frühen Nachmittag"
                +"\n **Temperatur: **Frisch, mit feuchtem Wind"
                +"\n **Boden: **Aufgeweicht und stellenweise rutschig"
                +"\n **Nacht: **Es bleibt feucht, einzelne Tropfen fallen weiter"
},
{
  title: "Wind",
  description: "**Wetter: **Wind zerrt an den Bäumen, Blätter wirbeln durch die Luft"
                +"\n **Temperatur: **Wechselhaft mit kalten Böen"
                +"\n **Boden: **Trocken, aber unruhig durch Laubbewegung"
                +"\n **Nacht: **Der Wind lässt nach, es bleibt kühl"
},
{
  title: "Ruhig",
  description: "**Wetter: **Ein ruhiger, bewölkter Tag ohne Regen"
                +"\n **Temperatur: **Mild, aber mit kaltem Unterton"
                +"\n **Boden: **Fest, mit dicker Laubschicht bedeckt"
                +"\n **Nacht: **In der Nacht sinkt die Temperatur deutlich"
},
{
  title: "Trockener",
  description: "**Wetter: **Kurz vor Sonnenaufgang fällt noch leichter Regen, danach bleibt es trocken"
                +"\n **Temperatur: **Kühler Start, tagsüber angenehm"
                +"\n **Boden: **Leicht feucht, aber begehbar"
                +"\n **Nacht: **Die Luft ist klar, aber kalt"
},
{
  title: "Warm",
  description: "**Wetter: **Ein warmer Herbsttag mit goldenem Licht durch das Blattwerk"
                +"\n **Temperatur: **Unerwartet mild"
                +"\n **Boden: **Trocken und raschelnd vor Laub"
                +"\n **Nacht: **Die Wärme verfliegt rasch, Tau setzt früh ein"
},
{
  title: "Regenschauer",
  description: "**Wetter: **Regenschauer wechseln sich mit windstillen Momenten ab"
                +"\n **Temperatur: **Frisch bis kühl"
                +"\n **Boden: **Aufgeweicht, aber tragfähig"
                +"\n **Nacht: **Die Böden trocknen langsam, es bleibt kühl"
},
{
  title: "Nieselregen und Windstille",
  description: "**Wetter: **Morgens fällt feiner Nieselregen, danach bleibt es grau und windstill"
                +"\n **Temperatur: **Kühl und konstant"
                +"\n **Boden: **Nasses Laub erschwert das Anschleichen"
                +"\n **Nacht: **Es bleibt wolkenverhangen, keine Sterne sichtbar"
},
{
  title: "Wolkenlos",
  description: "**Wetter: **Klare Sicht bei wolkenlosem Himmel, die Sonne wärmt kaum noch"
                +"\n **Temperatur: **Kühl mit kaltem Windhauch"
                +"\n **Boden: **Hart und trocken, Laub knistert unter den Pfoten"
                +"\n **Nacht: **Es wird frostig - erste Kälte kündigt den Winter an"
}
],
[
  {
  title: "Dichter Schneefall",
  description: "**Wetter: **Dichte Schneeflocken fallen den ganzen Vormittag über das Territorium"
                +"\n **Temperatur: **Deutlich unter dem Gefrierpunkt"
                +"\n **Boden: **Mit frischem Schnee bedeckt, darunter hart gefroren"
                +"\n **Nacht: **Eisige Temperaturen, der Schnee glitzert im Mondlicht"
},
{
  title: "Frost",
  description: "**Wetter: **Der Himmel ist grau und trüb, leichter Frost bedeckt das Territorium"
                +"\n **Temperatur: **Um den Gefrierpunkt"
                +"\n **Boden: **Gefroren, aber nicht verschneit"
                +"\n **Nacht: **Es bleibt trocken, aber die Kälte nimmt zu"
},
{
  title: "Wind",
  description: "**Wetter: **Eisiger Wind weht durch das Territorium, keine Schneefälle"
                +"\n **Temperatur: **Sehr kalt mit starkem Windchill"
                +"\n **Boden: **Hart, glatt und stellenweise vereist"
                +"\n **Nacht: **Der Wind flaut ab, aber es bleibt klirrend kalt"
},
{
  title: "Liegender Schnee",
  description: "**Wetter: **Schnee von der Nacht liegt noch unberührt auf dem Boden"
                +"\n **Temperatur: **Kalt, aber windstill"
                +"\n **Boden: **Mit frischem Schnee bedeckt, darunter fest"
                +"\n **Nacht: **Neue Schneefälle setzen langsam wieder ein"
},
{
  title: "Schneeregen",
  description: "**Wetter: **Plötzlicher Schneeregen macht das Territorium ungemütlich"
                +"\n **Temperatur: **Knapp über dem Gefrierpunkt"
                +"\n **Boden: **Matschig und glatt"
                +"\n **Nacht: **Der Regen friert teilweise, es wird rutschig"
},
{
  title: "Sonne",
  description: "**Wetter: **Die Sonne scheint schwach durch dünne Wolken"
                +"\n **Temperatur: **Kalt, aber angenehm ruhig"
                +"\n **Boden: **Hartgefroren, mit Eiskristallen auf Moos und Zweigen"
                +"\n **Nacht: **Sternenklare, eiskalte Nacht"
},
{
  title: "Raureif",
  description: "**Wetter: **Der Morgen beginnt mit Raureif auf jeder Oberfläche"
                +"\n **Temperatur: **Deutlich unter Null"
                +"\n **Boden: **Glatt und frostig, besonders auf Steinen und Wurzeln"
                +"\n **Nacht: **Noch kälter, Frost bleibt die ganze Nacht über bestehen"
},
{
  title: "Tauwetter",
  description: "**Wetter: **Ein ungewöhnlich milder Wintertag mit leichtem Tauwetter"
                +"\n **Temperatur: **Über dem Gefrierpunkt"
                +"\n **Boden: **Matschig, teilweise rutschig"
                +"\n **Nacht: **Es kühlt wieder ab, leichter Bodenfrost"
},
{
  title: "Feiner Schneefall",
  description: "**Wetter: **Ein ruhiger Schneetag - leise fällt feiner Schnee vom Himmel"
                +"\n **Temperatur: **Knapp unter dem Gefrierpunkt"
                +"\n **Boden: **Gleichmäßig mit Schnee bedeckt, weich"
                +"\n **Nacht: **Die Kälte nimmt zu, Schneedecke bleibt erhalten"
},
{
  title: "Trocken",
  description: "**Wetter: **Klare Sicht, kein Schnee - nur kalte, trockene Luft"
                +"\n **Temperatur: **Kalt mit leichtem Wind"
                +"\n **Boden: **Hart, trocken und vereist"
                +"\n **Nacht: **Eisiger Wind, kaum Schutz vor der Kälte"
}
]];

module.exports = {
  randomEmbed: () => seasonList[getCurrentSetIndex()][Math.floor(Math.random() * seasonList[getCurrentSetIndex()].length)]
};