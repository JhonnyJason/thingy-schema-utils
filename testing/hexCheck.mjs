const allHexChars = "0123456789abcdefABCDEF"
const hexMap = Object.create(null)
for(var i = 0; i < allHexChars.length; i++) {
    hexMap[allHexChars[i]] = true
}

const hexArray = new Array(128)
for(var i = 0; i < allHexChars.length; i++) {
    hexArray[allHexChars.charCodeAt(i)] = true
}


const isHexObjectMap = function (str) {
    for(var i = 0; i < str.length; i++) {
        if(hexMap[str[i]] !== true){ return false }
    }
    return true
}

const isHexArrayMap = function (str) { // wins against all ;-)
    var code;
    for(var i = 0; i < str.length; i++) {
        code = str.charCodeAt(i)
        if(hexArray[code] !== true) { return false }
    }
    return true
}

const isHexConditionals0 = function(str) { // wins against conditional1
    var code;
    for(var i = 0; i < str.length; i++) {
        code = str.charCodeAt(i)
        if ((code < 58 && code > 47) || (code < 71 && code > 64) || 
            (code < 103 && code > 96)) { continue } else { return false }
    }   
    return true
}


const isHexConditionals1 = function(str) {
    var code;
    for(var i = 0; i < str.length; i++) {
        code = str.charCodeAt(i)
        if(code > 102 || (code < 97 && code > 70) || (code < 65 && code > 57) || 
           code < 48) { return false }
    }   
    return true
}





const testObjectMap = function (count, str) {
    var c, start, timeMS

    // // warmup
    // c  = count
    // start = performance.now()
    // while(c--) {
    //     isHexObjectMap(str)
    // }
    // timeMS = performance.now() - start

    //real go
    c  = count
    start = performance.now()
    while(c--) {
        isHexObjectMap(str)
    }
    timeMS = performance.now() - start
    console.log("isHexObjectMap: "+timeMS)

}

const testArrayMap = function (count, str) {
    var c, start, timeMS

    // // warmup
    // c  = count
    // start = performance.now()
    // while(c--) {
    //     isHexArrayMap(str)
    // }
    // timeMS = performance.now() - start

    //real go
    c  = count
    start = performance.now()
    while(c--) {
        isHexArrayMap(str)
    }
    timeMS = performance.now() - start
    console.log("isHexArrayMap: "+timeMS)

}

const testConditionals0 = function (count, str) {
    var c, start, timeMS

    // // warmup
    // c  = count
    // start = performance.now()
    // while(c--) {
    //     isHexConditionals0(str)
    // }
    // timeMS = performance.now() - start

    //real go
    c  = count
    start = performance.now()
    while(c--) {
        isHexConditionals0(str)
    }
    timeMS = performance.now() - start
    console.log("isHexConditionals0: "+timeMS)

}

const testConditionals1 = function (count, str) {
    var c, start, timeMS

    // // warmup
    // c  = count
    // start = performance.now()
    // while(c--) {
    //     isHexConditionals1(str)
    // }
    // timeMS = performance.now() - start

    //real go
    c  = count
    start = performance.now()
    while(c--) {
        isHexConditionals1(str)
    }
    timeMS = performance.now() - start
    console.log("isHexConditionals1: "+timeMS)

}




const testAll = function() {
    const testString = allHexChars.repeat(2000)
    const count = 100000

    testArrayMap(count, testString)
    testObjectMap(count, testString)
    testConditionals0(count, testString)
    testConditionals1(count, testString)
    testArrayMap(count, testString)
    testObjectMap(count, testString)
    testConditionals0(count, testString)
    testConditionals1(count, testString)
    testArrayMap(count, testString)
    testObjectMap(count, testString)
    testConditionals0(count, testString)
    testConditionals1(count, testString)
}


testAll()