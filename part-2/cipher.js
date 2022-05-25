const encrypt = (string) => {
    let encrypted = '';
    for(let i = 0; i < string.length; ++i) {
        const indexMod = i % 4;
        switch(indexMod) {
            case 0:
                encrypted += string[i];
                break;
            case 1:
                encrypted += String.fromCharCode(string.charCodeAt(i) + 1);
                break;
            case 2:
                encrypted += string[i].toUpperCase();
                break;
            case 3:
                encrypted += String(string.charCodeAt(i));
                break;
        }
    }
    return encrypted;
}

const getStringTokens = string => {
    let stringArr = [];
    let acc = '';

    for(let i = 0; i < string.length; ++i) {
        if (isNaN(string[i]) || string[i] === ' ') {
            stringArr.push(string[i]);
        } else {
            while (!isNaN(string[i] + 1) && string[i] !== ' ' && string[i] !== '.') {
                acc += string[i];
                i++;
            }
            stringArr.push(acc);
            if(i <= string.length - 1) {
                stringArr.push(string[i]);
            }
            acc = '';
        }
    }
    return stringArr;
}

const decrypt = string => {
    let decrypted = '';
    let tokenString = getStringTokens(string);

    for(let i = 0; i < tokenString.length; ++i) {
        const indexMod = i % 4;
        switch(indexMod) {
            case 0:
                decrypted += tokenString[i];
                break;
            case 1:
                decrypted += String.fromCharCode(tokenString[i].charCodeAt(0) - 1);
                break;
            case 2: 
                decrypted += tokenString[i].toLowerCase();
                break;
            case 3:
                decrypted += String.fromCharCode(Number(tokenString[i]));
                break;
        }
    }

    return decrypted;
}

console.log(encrypt('I love cryptography!'));
console.log(decrypt('I!L111vf 99rzP116ohR97piY33'));
console.log(encrypt("My name is Keenan Faulkner."));
console.log(decrypt(encrypt("My name is Keenan Faulkner.")));
console.log(encrypt("Devmountain is a great place to learn how to program."));
console.log(decrypt(encrypt("Devmountain is a great place to learn how to program.")));
console.log(encrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZabccdefghijklmnopqrstuvwxyz1234567890'));
console.log(decrypt(encrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZabccdefghijklmnopqrstuvwxyz1234567890')));
console.log(encrypt("this cipher is really bad at sending numbers such as 12:00pm."));
console.log(decrypt(encrypt("this cipher is really bad at sending numbers such as 12:00pm. Don't trust it on such things. Send the numbers as letters instead.")));
console.log(decrypt(encrypt("twelve o'clock pm")));
//but I'm so over it haha