import { ECTAB, sECTAB } from "./escapeTable.mjs"
import { string0, string1, string2, string3, string4, string5 } from "./testStrings.mjs"

const jsonStringify = JSON.stringify

const stringifyV10 = function (str) {
    const len = str.length;
    var code = 0;

    if (len > 67) { return JSON.stringify(str) }

    for (var i = 0; i < len; i++) {
        code = str.charCodeAt(i);
        if (code < 93 && (code < 0x20 || code == 0x22 || code == 0x5c)) { 
            return JSON.stringify(str) 
        }
    }

    return '"' + str + '"';
}

const stringifyV20 = function (str) {
    const len = str.length
    const toEscape = []
    var code = 0

    for (var i = 0; i < len; i++) {
        code = str.charCodeAt(i)
        if (code < 93 && ECTAB[code] !== undefined) { toEscape.push(i) }
    }

    // Fast path: no escaping needed
    if (toEscape.length === 0) { return '"'+str+'"'; }

    // Build escaped string by slicing segments
    var escaped = '"';
    var start = 0;

    for (var i = 0; i < toEscape.length; i++) {
        var idx = toEscape[i];
        escaped += str.slice(start, idx);
        escaped += ECTAB[str.charCodeAt(idx)];
        start = idx + 1;
    }
    // Add remaining segment
    if (start < len) { escaped += (str.slice(start, len) + '"'); }
    return escaped;
}

const stringifyV21 = function (str) {
    const len = str.length
    const toEscape = []

    var code = 0

    for (var i = 0; i < len; i++) {
        code = str.charCodeAt(i)
        if (code < 93 && (code < 0x20 || code == 0x22 || code == 0x5c)) { 
            toEscape.push(i) 
        }
    }

    // Fast path: no escaping needed
    if (toEscape.length === 0) { return '"'+str+'"'; }

    // Build escaped string by slicing segments
    var escaped = '"'
    var start = 0

    for (var i = 0; i < toEscape.length; i++) {
        var idx = toEscape[i]
        escaped += str.slice(start, idx)
        escaped += ECTAB[str.charCodeAt(idx)]
        start = idx + 1
    }
    // Add remaining segment
    if (start < len) { escaped += (str.slice(start, len) + '"'); }
    return escaped;
}

const stringifyV30 = function (str) {
    const len = str.length;
    var escaped = '"'
    var start = 0
    var code = 0

    for (var i = 0; i < len; i++) {
        code = str.charCodeAt(i)
        if (code >= 93) { continue }
        if (code === 0x22) {
            escaped += str.slice(start, i)
            escaped += '\\"'
            start = i + 1
        } else if (code === 0x5c) {
            escaped += str.slice(start, i)
            escaped += '\\\\'
            start = i + 1
        } else if (code < 0x20) {
            escaped += str.slice(start, i)
            escaped += sECTAB[code]
            start = i + 1
        }
    }

    if (start === 0) { return escaped += str + '"' }
    if (start < len) { escaped += (str.slice(start, len) + '"') }
    return escaped 
}

const stringifyV31 = function (str) {
    const len = str.length;
    var escaped = '"';
    var start = 0;
    var code = 0;

    for (var i = 0; i < len; i++) {
        code = str.charCodeAt(i)
        if (code < 93 && (code < 0x20 || code == 0x22 || code == 0x5c)) {
            escaped += str.slice(start, i)
            escaped += ECTAB[code]
            start = i + 1
        } 
    }

    if (start === 0) { return '"'+str+'"'; }
    if (start < len) { escaped += str.slice(start, len) }
    escaped += '"'
    return escaped
}

const results = {}

function functionBenchSingle( testName, input, funcName, func ) {
    const iterations = 10000000;
    var start = performance.now();
    var resultString = ""

    for (let i = 0; i < iterations; i++) {
      if( i > 10000000) {return }
      resultString = func(input) 
    }
    var timeMS = performance.now() - start
    var isCorrect = resultString === JSON.stringify(input)

    results[funcName+':'+testName] = { timeMS, isCorrect }
}

function benchmark() {
  const testCases = [
    { name: 'none-small', str: string0 },
    // { name: 'few-small', str: string1 },
    // { name: 'many-small', str: string2 },
    { name: 'none-large', str: string3 },
    // { name: 'few-large', str: string4 },
    // { name: 'many-large', str: string5 }
    { name: 'none-small-2', str: string0 },
    { name: 'none-large-2', str: string3 }

    // { name: 'none-67', str: 'a'.repeat(67) },
    // { name: 'none-68', str: 'a'.repeat(68) },
    // { name: 'none-69', str: 'a'.repeat(69) },

    // { name: 'none-67a', str: 'a'.repeat(67) },
    // { name: 'none-68a', str: 'a'.repeat(68) },
    // { name: 'none-69a', str: 'a'.repeat(69) },

    // { name: 'none-67b', str: 'a'.repeat(67) },
    // { name: 'none-68b', str: 'a'.repeat(68) },
    // { name: 'none-69b', str: 'a'.repeat(69) }
    
    // { name: 'No escaping (short)', str: 'simple string without special chars' },
    // { name: 'No escaping (long)', str: 'a'.repeat(1000) },
    // { name: 'Few escapes (2%)', str: 'a'.repeat(50) + '\n' + 'b'.repeat(50) },
    // { name: 'Many escapes (20%)', str: ('abcde\n').repeat(100) },
    // { name: 'All escapes', str: '\n'.repeat(100) },
    // { name: 'Quotes and backslash', str: 'string with "quotes" and \\backslashes\\' },
  ];

  const testFunctions = [
    {name: "stringCombo0", func: stringCombo0},
    {name: "stringCombo1", func: stringCombo1},
    {name: "stringCombo2", func: stringCombo2},
    // {name: "jsonStringify", func: jsonStringify},
    // {name: "stringifyV10", func: stringifyV10},
    // {name: "stringifyV11", func: stringifyV11},
    // {name: "stringifyV12", func: stringifyV12}
    // {name: "stringifyV20", func: stringifyV20},
    // {name: "stringifyV21", func: stringifyV21},
    // {name: "stringifyV30", func: stringifyV30},
    // {name: "stringifyV31", func: stringifyV31},
    // {name: "stringifyV32", func: stringifyV32}
  ]
  
  console.log('Benchmarking started:\n');
  
  testCases.forEach(({ name, str }) => {
        // Warmup
        for(var j = 0; j < testFunctions.length; j++) {
            var tfObj = testFunctions[j]
            functionBenchSingle(name, str, tfObj.name, tfObj.func)            
        }

        // This execution counts
        for(j = 0; j < testFunctions.length; j++) {
            tfObj = testFunctions[j]
            functionBenchSingle(name, str, tfObj.name, tfObj.func)            
        }
    });

    const reportString = JSON.stringify(results, null, 4)
    console.log(reportString)
}

benchmark();