const { fifaData } = require("./fifa.js");

/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

const final2014 = fifaData.filter((item) => {
  return item.Year === 2014 && item.Stage === "Final";
});

console.log(final2014);

//B.N. veya yukarıdakinin açılımı olarak aşağıdakini yaptım. Daha iyi anlamak için.

// const myFunction = (item) => {
// 	if (item.Stage === "Final" && item.Year === 2014){
// 		return true;
// 	}
// 	else {
// 		return false;
// 	}
// }
// console.log (fifaData.filter(myFunction))

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

console.log(final2014[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)

console.log(final2014[0]["Away Team Name"]);

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)

console.log(final2014[0]["Home Team Goals"]);

//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)

console.log(final2014[0]["Away Team Goals"]);

//(e) 2014 Dünya kupası finali kazananı*/

const winnerWorldCup2014 =
  final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"]
    ? final2014[0]["Home Team Name"]
    : final2014[0]["Away Team Name"];

console.log("The winner of World Cup 2014 is " + winnerWorldCup2014);

//B.N. aynı kodun ternary olmadan yazılmışı:
// if (final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"]) {
// 	console.log ("Kupanın sahibi: " + final2014[0]["Home Team Name"])
// }
// else {
// 	console.log("Kupanın sahibi: " + final2014[0]["Away Team Name"] )
// }

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(arr) {
  const finallerArrayi = arr.filter((item) => {
    return item.Stage === "Final";
  });
  return finallerArrayi;
}

console.log(Finaller(fifaData));

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(arr, callback) {
  const finals = callback(arr);
  const finalYears = finals.map((item) => item.Year);
  return finalYears;
}

console.log(Yillar(fifaData, Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */

function Kazananlar(arr, callback) {
  const kazananlar = [];
  const finals = callback(arr);

  for (let i = 0; i < finals.length; i++) {
    if (finals[i]["Home Team Goals"] > finals[i]["Away Team Goals"]) {
      kazananlar.push(finals[i]["Home Team Name"]);
    } else {
      kazananlar.push(finals[i]["Away Team Name"]);
    }
  }
  return kazananlar;
}

console.log(Kazananlar(fifaData, Finaller));

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(arr, cb1, cb2, cb3) {
  const result = [];
  let years = cb2(arr, cb1);
  let winners = cb3(arr, cb1);
  //(Ezgi Nin Defterden) bu yukarıdaki ikisine ihtiyacım var çünkü bana verilen metni yazdırmam için yılları içeren bir arrray'a
  // ve kazananları içeren bir array'a ihtiyacım var. Bu yüzden bu ikisini de tanımlayıp sakladık.
  for (let i = 0; i < years.length; i++) {
    //Bütün yıllarda bir for döngüsü yarattık
    const text = `${years[i]} yılında, ${winners[i]} dünya kupasını kazandı!`;
    result.push(text); //metni yukarıdaki result array'imize pushladık. Bizden array istemişti görevde.
  }
  return result;
}
console.table(YillaraGoreKazananlar(fifaData, Finaller, Yillar, Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(cb) {
  const totalGoal = cb.reduce((total, item) => {
    const matchGoal = item["Home Team Goals"] + item["Away Team Goals"];
    return total + matchGoal;
  }, 0);
  const average = totalGoal / cb.length;
  return average.toFixed(2);
}

console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
  /* kodlar buraya */
}

/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
  /* kodlar buraya */
}

/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */

/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa() {
  console.log("Kodlar çalışıyor");
  return "as";
}
sa();
module.exports = {
  sa,
  Finaller,
  Yillar,
  Kazananlar,
  YillaraGoreKazananlar,
  OrtalamaGolSayisi,
};
