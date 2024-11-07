const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

// Hesap makinesi için başlangıç değerleri tanımlanıyor.
let displayValue = '0'; // Ekranda görünen değer
let firstValue = null; // İlk girilen sayı
let operator = null; // Seçilen işlem operatörü (+, -, *, /)
let waitingForSecondValue = false; // İkinci sayı için beklenip beklenmediği

// Ekrandaki değeri güncelleyen fonksiyon çağrılıyor.
updateDisplay();

// Ekranda güncel değeri gösteren fonksiyon.
function updateDisplay() {
    display.value = displayValue; // displayValue, ekrana atanıyor.
}

// Tıklama olaylarını izlemek için tuşlara bir event listener ekleniyor.
keys.addEventListener('click', function(e) {
    const element = e.target; // Tıklanan öğe
    const value = element.value; // Tıklanan öğenin değeri (ör. '+', '-', '1', '=')

    // Eğer tıklanan öğe bir buton değilse, işlemi durduruyoruz.
    if (!element.matches('button')) return;

    // Tıklanan butona göre ilgili işlem gerçekleştiriliyor.
    switch(value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value); // Operatör işlemleri için handleOperator fonksiyonu çağrılıyor.
            break;
        case '.':
            inputDecimal(); // Ondalık sayı için inputDecimal fonksiyonu çağrılıyor.
            break;
        case 'clear':
            clear(); // Temizleme işlemi için clear fonksiyonu çağrılıyor.
            break;
        default:
            inputNumber(element.value); // Sayılar için inputNumber fonksiyonu çağrılıyor.
    }
    updateDisplay(); // Her işlem sonrası ekran güncelleniyor.
});

// Operatör işlemlerini yöneten fonksiyon.
function handleOperator(nextOperator) {
    const value = parseFloat(displayValue); // Ekrandaki değeri sayıya çeviriyoruz.

    // Eğer mevcut bir operatör varsa ve ikinci değeri bekliyorsak, sadece operatörü güncelliyoruz.
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    // Eğer firstValue daha önce atanmadıysa, ilk değer olarak value atanıyor.
    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        // Eğer bir operatör varsa ve bir işlem yapılacaksa hesapla ve sonucu ekrana yaz.
        const result = calculate(firstValue, value, operator);

        displayValue = `${parseFloat(result.toFixed(7))}`; // Sonucu 7 basamakla gösteriyoruz.
        firstValue = result; // Sonuç firstValue olarak güncelleniyor.
    }

    waitingForSecondValue = true; // İkinci değer için beklemeye geçiyoruz.
    operator = nextOperator; // Operatörü güncelliyoruz.

    console.log(displayValue, firstValue, operator, waitingForSecondValue); // Durum bilgilerini konsola yazıyoruz.
}

// Verilen operatöre göre hesaplama yapan fonksiyon.
function calculate(first, second, operator) {
    if (operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second; // Eşittir durumunda veya operatör olmadığında ikinci değeri döndürüyor.
}

// Sayı girişini yöneten fonksiyon.
function inputNumber(num) {
    // Eğer ikinci sayı bekleniyorsa, ekrandaki değeri yeni girilen num olarak güncelliyoruz.
    if (waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } else {
        // Eğer ikinci sayı beklenmiyorsa, sayıyı ekrandaki değere ekliyoruz.
        displayValue = displayValue === '0' ? num : displayValue + num;
    }

    console.log(displayValue, firstValue, operator, waitingForSecondValue); // Durum bilgilerini konsola yazıyoruz.
}

// Ondalık sayı girişini yöneten fonksiyon.
function inputDecimal() {
    // Eğer displayValue'da bir nokta yoksa, bir nokta ekliyoruz.
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

// Temizleme işlemi yapan fonksiyon.
function clear() {
    displayValue = '0'; // Ekrandaki değeri sıfırlıyoruz.
    firstValue = null; // İlk değeri sıfırlıyoruz.
    operator = null; // Operatörü sıfırlıyoruz.
    waitingForSecondValue = false; // İkinci değeri bekleme durumunu sıfırlıyoruz.
}
